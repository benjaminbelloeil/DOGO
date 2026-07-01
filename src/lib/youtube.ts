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

export type Stream = {
  title: string;
  summary: string;
  /** Badge on the thumbnail, e.g. "2:14:30". */
  duration: string;
  /** Human label shown in the footer, e.g. "2 h 14 min". */
  durationLabel: string;
  url: string;
  thumbnail?: string;
};

const FALLBACK_STREAMS: Stream[] = [
  {
    title: "Inauguración de DOGO Streaming",
    summary:
      "El día que arrancó todo: la primera transmisión en vivo de DOGO.",
    duration: "1:47:14",
    durationLabel: "1 h 47 min",
    url: "https://www.youtube.com/watch?v=2umURMnndKE",
    thumbnail: "https://i.ytimg.com/vi/2umURMnndKE/hqdefault.jpg",
  },
  {
    title: "Ya lo Sabía! — Primer programa",
    summary:
      "El estreno de Ya lo Sabía!, nuestro programa de las mañanas.",
    duration: "2:01:14",
    durationLabel: "2 h 1 min",
    url: "https://www.youtube.com/watch?v=6cPC4-2W3zo",
    thumbnail: "https://i.ytimg.com/vi/6cPC4-2W3zo/hqdefault.jpg",
  },
  {
    title: "Ya lo Sabía! — Segundo stream",
    summary:
      "La segunda transmisión de Ya lo Sabía!, con más charla y entrevistas.",
    duration: "2:01:26",
    durationLabel: "2 h 1 min",
    url: "https://www.youtube.com/watch?v=AQTyHrPs8vQ",
    thumbnail: "https://i.ytimg.com/vi/AQTyHrPs8vQ/hqdefault.jpg",
  },
];

const API = "https://www.googleapis.com/youtube/v3";
// Revalidate the YouTube data hourly (ISR) so we don't hit the API per request.
const REVALIDATE_SECONDS = 60 * 60;

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

function summarize(description: string): string {
  const firstLine = description.split("\n").find((l) => l.trim().length > 0) ?? "";
  const clean = firstLine.trim();
  if (clean.length <= 140) return clean;
  return `${clean.slice(0, 137).trimEnd()}…`;
}

export async function getRecentStreams(limit = 3): Promise<Stream[]> {
  const key = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;
  const handle = process.env.YOUTUBE_CHANNEL_HANDLE;

  if (!key || (!channelId && !handle)) return FALLBACK_STREAMS;

  try {
    const uploads = await getUploadsPlaylistId(key, channelId, handle);
    if (!uploads) return FALLBACK_STREAMS;

    const playlist = await ytFetch<{
      items?: {
        snippet?: { title?: string; description?: string; thumbnails?: YtThumbnails };
        contentDetails?: { videoId?: string };
      }[];
    }>(
      `playlistItems?part=snippet,contentDetails&maxResults=${limit}&playlistId=${uploads}&key=${key}`,
    );

    const items = playlist?.items?.filter((i) => i.contentDetails?.videoId) ?? [];
    if (items.length === 0) return FALLBACK_STREAMS;

    const ids = items.map((i) => i.contentDetails!.videoId!).join(",");
    const details = await ytFetch<{
      items?: { id: string; contentDetails?: { duration?: string } }[];
    }>(`videos?part=contentDetails&id=${ids}&key=${key}`);

    const durationById = new Map(
      (details?.items ?? []).map((v) => [v.id, v.contentDetails?.duration ?? "PT0S"]),
    );

    const streams: Stream[] = items.map((item) => {
      const videoId = item.contentDetails!.videoId!;
      const { badge, label } = parseDuration(durationById.get(videoId) ?? "PT0S");
      return {
        title: item.snippet?.title ?? "Stream de DOGO",
        summary: summarize(item.snippet?.description ?? ""),
        duration: badge,
        durationLabel: label,
        url: `https://www.youtube.com/watch?v=${videoId}`,
        thumbnail: pickThumbnail(item.snippet?.thumbnails),
      };
    });

    return streams.length ? streams : FALLBACK_STREAMS;
  } catch {
    return FALLBACK_STREAMS;
  }
}
