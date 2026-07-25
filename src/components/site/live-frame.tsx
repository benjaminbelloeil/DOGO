"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Volume2, VolumeX } from "lucide-react";
import { LiveBadge } from "./live-badge";
import { useLiveProbe } from "@/lib/use-live-probe";
import { REVEAL_BUFFER_MS, useVideoPreview } from "@/lib/use-video-preview";
import type { Still } from "@/lib/youtube";

function videoIdFrom(url: string): string | null {
  return url.match(/[?&]v=([\w-]{6,})/)?.[1] ?? null;
}

/** El origin de la página no cambia nunca: no hay nada que suscribir. */
function subscribeNoop() {
  return () => {};
}

/** Corrimiento óptico: el triángulo centrado a ojo, no a regla. */
function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path
        d="M6 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L7.54 4.3A1 1 0 0 0 6 5.14Z"
        transform="translate(1.2 0)"
      />
    </svg>
  );
}

type LiveFrameProps = {
  liveVideoId: string | null;
  channelId: string;
  latestUrl?: string;
  latestTitle?: string;
  latestStill?: Still;
  frameUrl: string;
};

/**
 * El "en vivo" de la portada. Si el canal está al aire, el embed real anda
 * solo (muteado, con un botón para activar el sonido sin salir de la página).
 * Si no, se ve el mejor fotograma del último stream — y al pasar el mouse
 * arranca la MISMA vista previa en vivo que el póster de Novedades: el player
 * de YouTube muteado, sin controles, entrando ya con el programa andando (no
 * la placa de espera del arranque).
 *
 * La liveness llega por dos caminos: el servidor (scraping de `/live` — falla
 * desde Vercel por las paredes anti-bot de YouTube) y, si vino null, un probe
 * en el navegador del visitante ([useLiveProbe]) que resuelve el vivo real.
 */
export function LiveFrame({
  liveVideoId,
  channelId,
  latestUrl,
  latestTitle,
  latestStill,
  frameUrl,
}: LiveFrameProps) {
  // Si el servidor no detectó vivo, lo intenta el navegador del visitante.
  const probedLiveId = useLiveProbe(liveVideoId ? null : channelId);
  const activeLiveId = liveVideoId ?? probedLiveId;

  const previewVideoId = !activeLiveId && latestUrl ? videoIdFrom(latestUrl) : null;
  const { ready, src, onMouseEnter, onMouseLeave, onIframeLoad } =
    useVideoPreview(previewVideoId);

  // El embed del vivo también tarda un momento en empezar a pintar video de
  // verdad: recién montado, YouTube alcanza a mostrar de refilón su propio
  // título/controles antes de que el autoplay arranque. El fotograma de
  // reposo (más abajo) tapa ese instante y el embed recién se revela — con
  // el mismo colchón que usa el preview en hover — una vez que ya está
  // reproduciendo, así ese destello nunca llega a verse.
  const [liveReady, setLiveReady] = useState(false);
  const liveReadyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    return () => {
      if (liveReadyTimer.current) clearTimeout(liveReadyTimer.current);
    };
  }, []);
  const onLiveIframeLoad = () => {
    liveReadyTimer.current = setTimeout(() => setLiveReady(true), REVEAL_BUFFER_MS);
  };

  // Sonido del vivo: arranca muteado (los navegadores no permiten autoplay
  // con audio) y se activa/silencia por postMessage, sin recargar el player.
  const [muted, setMuted] = useState(true);
  const liveIframe = useRef<HTMLIFrameElement>(null);

  // Con enablejsapi=1 YouTube exige el `origin` de la página embebedora (si
  // falta, el player muere con "Error 153"). Solo existe en el cliente, así
  // que el iframe del vivo se monta recién después de la hidratación.
  const origin = useSyncExternalStore(
    subscribeNoop,
    () => window.location.origin,
    () => null,
  );

  const toggleMute = () => {
    const next = !muted;
    for (const func of next ? ["mute"] : ["unMute", "playVideo"]) {
      liveIframe.current?.contentWindow?.postMessage(
        JSON.stringify({ event: "command", func, args: [] }),
        "*",
      );
    }
    setMuted(next);
  };

  // Con el vivo detectado en el cliente el link va directo al watch; con el
  // del servidor, a la URL que ya calculó la página (el /live del canal).
  const href =
    activeLiveId && !liveVideoId
      ? `https://www.youtube.com/watch?v=${activeLiveId}`
      : frameUrl;

  // Si hay video de verdad pintando la tarjeta ahora mismo (vivo real ya
  // revelado, o preview en hover ya revelado) — de lo contrario se ve el
  // fotograma de reposo (fijo o logo), tape lo que tape por debajo.
  const videoVisible = (activeLiveId && liveReady) || (!activeLiveId && ready);

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative block aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-xl shadow-neutral-900/10"
    >
      {/* El reposo del último stream: SIEMPRE montado por debajo — tapa el
          arranque del embed (vivo real o preview en hover) hasta que el
          video empieza a pintar de verdad, para que nunca se vea el destello
          de controles/título de YouTube al cargar. */}
      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-[1.03]">
        {latestStill ? (
          // Un fotograma real del último stream. Si es una lámina de
          // storyboard, se recorta a la celda (x, y) — igual que en
          // Novedades — para no mostrar la grilla entera.
          <span className="absolute inset-0 overflow-hidden">
            {latestStill.sprite ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={latestStill.src}
                alt={`Último stream de DOGO: ${latestTitle}`}
                className="absolute h-auto max-w-none"
                style={{
                  width: `${latestStill.sprite.cols * 100}%`,
                  left: `${-latestStill.sprite.x * 100}%`,
                  top: `${-latestStill.sprite.y * 100}%`,
                }}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={latestStill.src}
                alt={`Último stream de DOGO: ${latestTitle}`}
                className="absolute inset-0 size-full object-cover"
              />
            )}
          </span>
        ) : (
          // Sin fotograma real todavía (video recién subido): el logo
          // sobre blanco, como en Novedades y en los paneles de
          // Programas.
          <span className="absolute inset-0 flex items-center justify-center bg-white">
            <Image
              src="/shows/ya-lo-sabia.png"
              alt=""
              width={420}
              height={420}
              className="h-[35%] w-auto object-contain drop-shadow-sm"
            />
          </span>
        )}
      </div>

      {src && !activeLiveId && (
        <iframe
          src={src}
          title=""
          aria-hidden
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          onLoad={onIframeLoad}
          // Más alto que el frame y centrado: el video 16:9 llena justo
          // el área visible y el chrome del player (título, logo de
          // YouTube, "más videos") queda en las franjas recortadas.
          className={`pointer-events-none absolute left-0 top-[-20%] h-[140%] w-full border-0 transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {activeLiveId && origin && (
        // Vista previa real del vivo: sin controles; el click en la tarjeta
        // sigue llevando al canal (el iframe no captura clicks). Queda
        // invisible (el reposo de arriba lo tapa) hasta que ya está andando.
        <iframe
          ref={liveIframe}
          src={`https://www.youtube.com/embed/${activeLiveId}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`}
          title="Transmisión en vivo de DOGO Streaming"
          allow="autoplay; encrypted-media; picture-in-picture"
          onLoad={onLiveIframeLoad}
          className={`pointer-events-none absolute inset-0 size-full transition-opacity duration-500 ${
            liveReady ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      <div
        className={
          videoVisible
            ? "pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent"
            : "pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30"
        }
      />

      {/* Link estirado: toda la tarjeta lleva al canal, salvo el botón de sonido */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={
          activeLiveId
            ? "Ver la transmisión en vivo en YouTube"
            : `Ver el último stream de DOGO en YouTube${latestTitle ? `: ${latestTitle}` : ""}`
        }
        className="absolute inset-0"
      />

      {/* Badge de estado — detección real cuando hay vivo confirmado; si no,
          la estimación por hora de Argentina */}
      <LiveBadge
        live={activeLiveId ? true : undefined}
        className="pointer-events-none absolute left-4 top-4"
      />

      {/* Botón de play centrado; con el vivo (real o preview) andando no hace falta */}
      {!activeLiveId && !ready && (
        <span className="pointer-events-none absolute inset-0 grid place-items-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-neutral-900">
            <PlayIcon className="size-6" />
          </span>
        </span>
      )}

      <span className="pointer-events-none absolute bottom-4 left-4 max-w-[calc(100%-2rem)] truncate font-display text-sm font-semibold text-white drop-shadow">
        {activeLiveId || !latestTitle
          ? "Lun a Vie · 10–12 h (ARG)"
          : `Último programa · ${latestTitle}`}
      </span>

      {/* Sonido del vivo: mute/unmute sin salir de la página */}
      {activeLiveId && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Activar sonido" : "Silenciar"}
          className="absolute bottom-4 right-4 flex size-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur transition-all duration-300 hover:scale-110 hover:bg-white hover:text-neutral-900 active:scale-95"
        >
          {muted ? (
            <VolumeX className="size-5" strokeWidth={2} />
          ) : (
            <Volume2 className="size-5" strokeWidth={2} />
          )}
        </button>
      )}
    </div>
  );
}
