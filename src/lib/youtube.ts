/**
 * Phase 1 of the Novedades feature: pull DOGO Streaming's most recent uploads
 * from the YouTube Data API v3 (title, thumbnail, duration, link).
 *
 * Configure with env vars (in `.env.local`):
 *   YOUTUBE_API_KEY        — a YouTube Data API v3 key
 *   YOUTUBE_CHANNEL_ID     — the channel id (starts with "UC…"), OR
 *   YOUTUBE_CHANNEL_HANDLE — the @handle (e.g. "dogostreaming")
 *
 * If the key/channel aren't set (or the API fails), we fall back to placeholder
 * data so the page always renders. Phase 2 (AI summaries) can later enrich the
 * `summary` field per video.
 */

/**
 * Un fotograma del video. Puede ser una imagen suelta (miniatura o captura
 * fija) o un recorte dentro de una lámina de storyboard de YouTube: en ese
 * caso `sprite` indica la grilla y la celda a mostrar.
 */
export type Still = {
  src: string;
  sprite?: { cols: number; x: number; y: number };
};

export type Stream = {
  title: string;
  summary: string;
  /** Badge on the thumbnail, e.g. "2:14:30". Empty when unknown (RSS path). */
  duration: string;
  /**
   * Human label shown in the footer, e.g. "2 h 14 min" — or the publish date
   * ("2 jul 2026") when the duration isn't available.
   */
  durationLabel: string;
  url: string;
  thumbnail?: string;
  /**
   * Fotogramas reales del video: la primera captura fija (nítida) seguida de
   * fotogramas del storyboard repartidos a lo largo de TODA la duración. Se
   * muestran en lugar de la miniatura promocional y rotan al pasar el mouse.
   */
  stills: Still[];
};

const FALLBACK_META = [
  {
    title: "Inauguración de DOGO Streaming",
    summary:
      "El día que arrancó todo: la primera transmisión en vivo de DOGO.",
    duration: "1:47:14",
    durationLabel: "1 h 47 min",
    videoId: "2umURMnndKE",
  },
  {
    title: "Ya lo Sabía! — Primer programa",
    summary:
      "El estreno de Ya lo Sabía!, nuestro programa de las mañanas.",
    duration: "2:01:14",
    durationLabel: "2 h 1 min",
    videoId: "6cPC4-2W3zo",
  },
  {
    title: "Ya lo Sabía! — Segundo stream",
    summary:
      "La segunda transmisión de Ya lo Sabía!, con más charla y entrevistas.",
    duration: "2:01:26",
    durationLabel: "2 h 1 min",
    videoId: "AQTyHrPs8vQ",
  },
];

async function fallbackStreams(): Promise<Stream[]> {
  return Promise.all(
    FALLBACK_META.map(async ({ videoId, ...meta }) => ({
      ...meta,
      url: `https://www.youtube.com/watch?v=${videoId}`,
      thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
      stills: await getStills(videoId),
    })),
  );
}

const API = "https://www.googleapis.com/youtube/v3";
// Revalidate the YouTube data hourly (ISR) so we don't hit the API per request.
const REVALIDATE_SECONDS = 60 * 60;

// Id del canal @dogostreaming (resuelto desde la página del canal, 2026-07).
// Permite usar el feed RSS público sin configurar ninguna API key.
const DEFAULT_CHANNEL_ID = "UCOtrGrSqgFqYP8XgVnq2suQ";

/** El id de canal a usar en todos los caminos sin API key. */
export function getChannelId(): string {
  return process.env.YOUTUBE_CHANNEL_ID || DEFAULT_CHANNEL_ID;
}

type YtThumbnails = Record<string, { url: string; width: number } | undefined>;

async function ytFetch<T>(path: string): Promise<T | null> {
  const res = await fetch(`${API}/${path}`, {
    next: { revalidate: REVALIDATE_SECONDS },
  });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

/** Resolve the channel's "uploads" playlist id from an id or @handle. */
async function getUploadsPlaylistId(
  key: string,
  channelId?: string,
  handle?: string,
): Promise<string | null> {
  const selector = channelId
    ? `id=${encodeURIComponent(channelId)}`
    : `forHandle=${encodeURIComponent((handle ?? "").replace(/^@/, ""))}`;

  const data = await ytFetch<{
    items?: { contentDetails?: { relatedPlaylists?: { uploads?: string } } }[];
  }>(`channels?part=contentDetails&${selector}&key=${key}`);

  return data?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
}

/** Convert an ISO-8601 duration ("PT2H14M30S") into badge + label strings. */
function parseDuration(iso: string): { badge: string; label: string } {
  const m = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  const h = Number(m?.[1] ?? 0);
  const min = Number(m?.[2] ?? 0);
  const s = Number(m?.[3] ?? 0);

  const pad = (n: number) => String(n).padStart(2, "0");
  const badge = h > 0 ? `${h}:${pad(min)}:${pad(s)}` : `${min}:${pad(s)}`;

  let label: string;
  if (h > 0) label = `${h} h ${min} min`;
  else if (min > 0) label = `${min} min`;
  else label = `${s} s`;

  return { badge, label };
}

async function imageExists(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, {
      method: "HEAD",
      next: { revalidate: REVALIDATE_SECONDS },
    });
    return res.ok;
  } catch {
    return false;
  }
}

/**
 * Capturas puntuales que no queremos mostrar (aparece Karina, que ya no está
 * en el programa). Números de captura (1..3) a excluir por videoId — revisadas
 * a mano el 2026-07-03.
 */
const EXCLUDED_FRAMES: Record<string, number[]> = {
  WgQ7AeTinz8: [1],
  fV_qPXEQaf4: [2],
  oDPFhqHnAuc: [1, 3],
  ZFane0MzaNg: [1, 2, 3],
};

/**
 * YouTube genera capturas automáticas de cada video al 25/50/75% de su
 * duración: `maxres1..3.jpg` (1280×720) y `hq1..3.jpg` (480×360). Para videos
 * muy recientes todavía no existen (404 con una imagen gris de relleno que el
 * navegador mostraría igual), así que verificamos antes de usarlas y
 * devolvemos [] si aún no hay capturas reales.
 */
async function getFixedStills(videoId: string): Promise<string[]> {
  const base = `https://i.ytimg.com/vi/${videoId}`;
  const excluded = EXCLUDED_FRAMES[videoId] ?? [];
  const frames = [1, 2, 3].filter((n) => !excluded.includes(n));
  if (!frames.length) return [];

  if (await imageExists(`${base}/maxres1.jpg`)) {
    return frames.map((n) => `${base}/maxres${n}.jpg`);
  }
  if (await imageExists(`${base}/hq1.jpg`)) {
    return frames.map((n) => `${base}/hq${n}.jpg`);
  }
  return [];
}

/** Cuántos fotogramas del storyboard mostramos por video. */
const STORYBOARD_FRAMES = 7;

const WATCH_HEADERS = {
  "user-agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36",
  "accept-language": "es",
};

/**
 * Fotogramas del storyboard: las láminas que YouTube genera cada ~10 s a lo
 * largo de TODA la duración (las mismas de la vista previa al arrastrar la
 * barra de progreso). Tomamos el nivel de mayor resolución (320×180) y
 * elegimos capturas repartidas entre el 10% y el 90% del video.
 *
 * El spec viene en el HTML del watch como
 *   `baseUrl|ancho#alto#total#cols#filas#intervalo#nombre#firma|…`
 * donde cada nivel L trae láminas en grilla de cols×filas.
 */
async function getStoryboardStills(videoId: string): Promise<Still[]> {
  try {
    const res = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: WATCH_HEADERS,
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return [];
    const html = await res.text();

    const raw = html.match(
      /"playerStoryboardSpecRenderer":\{"spec":"([^"]+)"/,
    )?.[1];
    if (!raw) return [];

    const spec = raw.replace(/\\u0026/g, "&").replace(/\\\//g, "/");
    const [template, ...levels] = spec.split("|");
    const levelIndex = levels.length - 1;
    const fields = levels[levelIndex]?.split("#");
    if (!fields || fields.length !== 8) return [];

    const total = Number(fields[2]);
    const cols = Number(fields[3]);
    const rows = Number(fields[4]);
    const name = fields[6];
    const sigh = fields[7];
    if (!total || !cols || !rows || total < STORYBOARD_FRAMES) return [];

    const perPage = cols * rows;
    return Array.from({ length: STORYBOARD_FRAMES }, (_, i) => {
      const fraction = 0.1 + (0.8 * i) / (STORYBOARD_FRAMES - 1);
      const frame = Math.min(total - 1, Math.floor(fraction * total));
      const page = Math.floor(frame / perPage);
      const inPage = frame % perPage;
      const src = `${template
        .replace("$L", String(levelIndex))
        .replace("$N", name.replace("$M", String(page)))}&sigh=${encodeURIComponent(sigh)}`;
      return {
        src,
        sprite: { cols, x: inPage % cols, y: Math.floor(inPage / cols) },
      };
    });
  } catch {
    return [];
  }
}

/**
 * Fotogramas a mostrar por video. El PRIMERO es la imagen de reposo de las
 * tarjetas, y tiene que ser un momento real del stream (nunca el logo ni la
 * placa negra del arranque):
 *
 *   1. la primera captura fija en HD (1280×720) si YouTube ya la generó;
 *   2. si todavía no existe (video recién subido), el fotograma del MEDIO del
 *      storyboard — a mitad de programa siempre hay estudio andando;
 *   3. sin nada de eso, la UI cae a la miniatura del canal.
 *
 * Después del primero va el recorrido del storyboard por todo el stream para
 * la rotación en hover. Los videos con capturas vetadas a mano (época con
 * Karina) quedan solo con sus fotogramas revisados — el storyboard podría
 * mostrarla de nuevo.
 */
async function getStills(videoId: string): Promise<Still[]> {
  const reviewed = videoId in EXCLUDED_FRAMES;
  const fixed = (await getFixedStills(videoId)).map((src) => ({ src }));
  if (reviewed) return fixed;

  const storyboard = await getStoryboardStills(videoId);
  if (!storyboard.length) return fixed;
  if (fixed.length) return [fixed[0], ...storyboard];

  const mid = storyboard[Math.floor(storyboard.length / 2)];
  return [mid, ...storyboard.filter((s) => s !== mid)];
}

function pickThumbnail(thumbs?: YtThumbnails): string | undefined {
  if (!thumbs) return undefined;
  return (
    thumbs.maxres?.url ??
    thumbs.standard?.url ??
    thumbs.high?.url ??
    thumbs.medium?.url ??
    thumbs.default?.url
  );
}

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'");
}

function formatPublished(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}

/**
 * Camino sin API key: el feed RSS público del canal trae los últimos ~15
 * uploads reales (título, descripción y fecha; sin duración — mostramos la
 * fecha de publicación en su lugar).
 */
async function rssStreams(limit: number): Promise<Stream[] | null> {
  const channelId = getChannelId();

  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`,
      { next: { revalidate: REVALIDATE_SECONDS } },
    );
    if (!res.ok) return null;
    const xml = await res.text();

    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)]
      .map(([, entry]) => ({
        videoId: entry.match(/<yt:videoId>([^<]+)/)?.[1],
        title: decodeXml(entry.match(/<title>([^<]*)/)?.[1] ?? ""),
        description: decodeXml(
          entry.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] ??
            "",
        ),
        published: entry.match(/<published>([^<]+)/)?.[1] ?? "",
      }))
      .filter((e): e is typeof e & { videoId: string } => Boolean(e.videoId))
      .slice(0, limit);

    if (!entries.length) return null;

    return Promise.all(
      entries.map(async (entry) => {
        const stills = await getStills(entry.videoId);
        // La miniatura del video (la tarjeta que sube el canal): en HD si ya
        // existe. Sin capturas reales todavía (video recién subido), la
        // estándar es la imagen gris de relleno: mejor nuestro placeholder.
        const thumbnail = (await imageExists(
          `https://i.ytimg.com/vi/${entry.videoId}/maxresdefault.jpg`,
        ))
          ? `https://i.ytimg.com/vi/${entry.videoId}/maxresdefault.jpg`
          : stills.length
            ? `https://i.ytimg.com/vi/${entry.videoId}/hqdefault.jpg`
            : undefined;
        return {
          title: entry.title || "Stream de DOGO",
          summary: summarize(entry.description),
          duration: "",
          durationLabel: formatPublished(entry.published),
          url: `https://www.youtube.com/watch?v=${entry.videoId}`,
          thumbnail,
          stills,
        };
      }),
    );
  } catch {
    return null;
  }
}

function summarize(description: string): string {
  const firstLine = description.split("\n").find((l) => l.trim().length > 0) ?? "";
  // Las descripciones del canal arrancan con el emoji de micrófono: fuera.
  const clean = firstLine.replace(/\u{1F399}️?/gu, "").trim();
  if (clean.length <= 140) return clean;
  return `${clean.slice(0, 137).trimEnd()}…`;
}

async function apiStreams(
  limit: number,
  key: string,
  channelId?: string,
  handle?: string,
): Promise<Stream[] | null> {
  try {
    const uploads = await getUploadsPlaylistId(key, channelId, handle);
    if (!uploads) return null;

    const playlist = await ytFetch<{
      items?: {
        snippet?: { title?: string; description?: string; thumbnails?: YtThumbnails };
        contentDetails?: { videoId?: string };
      }[];
    }>(
      `playlistItems?part=snippet,contentDetails&maxResults=${limit}&playlistId=${uploads}&key=${key}`,
    );

    const items = playlist?.items?.filter((i) => i.contentDetails?.videoId) ?? [];
    if (items.length === 0) return null;

    const ids = items.map((i) => i.contentDetails!.videoId!).join(",");
    const details = await ytFetch<{
      items?: { id: string; contentDetails?: { duration?: string } }[];
    }>(`videos?part=contentDetails&id=${ids}&key=${key}`);

    const durationById = new Map(
      (details?.items ?? []).map((v) => [v.id, v.contentDetails?.duration ?? "PT0S"]),
    );

    const streams: Stream[] = await Promise.all(
      items.map(async (item) => {
        const videoId = item.contentDetails!.videoId!;
        const { badge, label } = parseDuration(durationById.get(videoId) ?? "PT0S");
        return {
          title: item.snippet?.title ?? "Stream de DOGO",
          summary: summarize(item.snippet?.description ?? ""),
          duration: badge,
          durationLabel: label,
          url: `https://www.youtube.com/watch?v=${videoId}`,
          thumbnail: pickThumbnail(item.snippet?.thumbnails),
          stills: await getStills(videoId),
        };
      }),
    );

    return streams.length ? streams : null;
  } catch {
    return null;
  }
}

/**
 * ¿Este HTML de YouTube corresponde a una transmisión al aire AHORA? Los
 * programados/premieres traen "isUpcoming":true; los vivos reales marcan
 * "isLiveNow":true (player) o "isLive":true (microformat) — según la variante
 * de página que sirva YouTube aparece uno u otro, así que aceptamos ambos.
 */
function looksLiveNow(html: string): boolean {
  if (html.includes('"isUpcoming":true')) return false;
  return html.includes('"isLiveNow":true') || html.includes('"isLive":true');
}

/**
 * Detecta si el canal está transmitiendo en vivo AHORA, sin API key: la ruta
 * pública /live del canal apunta su canonical al watch del vivo solo mientras
 * hay transmisión (o una programada). Cache de 2 minutos.
 */
export async function getLiveVideoId(): Promise<string | null> {
  const channelId = getChannelId();

  try {
    const res = await fetch(
      `https://www.youtube.com/channel/${channelId}/live`,
      {
        headers: WATCH_HEADERS,
        next: { revalidate: 120 },
      },
    );
    if (!res.ok) return null;
    const html = await res.text();

    const videoId = html.match(
      /rel="canonical" href="https:\/\/www\.youtube\.com\/watch\?v=([\w-]{6,})"/,
    )?.[1];
    if (!videoId) return null;

    if (looksLiveNow(html)) return videoId;

    // La página del canal a veces no trae los marcadores del player: segundo
    // intento contra la página del video en sí antes de darlo por no-vivo.
    const watch = await fetch(`https://www.youtube.com/watch?v=${videoId}`, {
      headers: WATCH_HEADERS,
      next: { revalidate: 120 },
    });
    if (!watch.ok) return null;
    return looksLiveNow(await watch.text()) ? videoId : null;
  } catch {
    return null;
  }
}

export async function getRecentStreams(limit = 3): Promise<Stream[]> {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE;

  // 1) Data API si hay key (trae duraciones exactas)…
  if (key && (channelId || handle)) {
    const api = await apiStreams(limit, key, channelId, handle);
    if (api) return api;
  }

  // 2) …si no, el feed RSS público del canal (últimos uploads reales, con
  //    fecha en lugar de duración)…
  const rss = await rssStreams(limit);
  if (rss?.length) return rss;

  // 3) …y como último recurso, los streams estáticos de referencia.
  return fallbackStreams();
}
