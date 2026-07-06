"use client";

import Image from "next/image";
import { LiveBadge } from "./live-badge";
import { useVideoPreview } from "@/lib/use-video-preview";
import type { Still } from "@/lib/youtube";

function videoIdFrom(url: string): string | null {
  return url.match(/[?&]v=([\w-]{6,})/)?.[1] ?? null;
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
  latestUrl?: string;
  latestTitle?: string;
  latestStill?: Still;
  frameUrl: string;
};

/**
 * El "en vivo" de la portada. Si el canal está al aire, el embed real anda
 * solo. Si no, se ve el mejor fotograma del último stream — y al pasar el
 * mouse arranca la MISMA vista previa en vivo que el póster de Novedades:
 * el player de YouTube muteado, sin controles, entrando ya con el programa
 * andando (no la placa de espera del arranque).
 */
export function LiveFrame({
  liveVideoId,
  latestUrl,
  latestTitle,
  latestStill,
  frameUrl,
}: LiveFrameProps) {
  const previewVideoId = !liveVideoId && latestUrl ? videoIdFrom(latestUrl) : null;
  const { ready, src, onMouseEnter, onMouseLeave, onIframeLoad } =
    useVideoPreview(previewVideoId);

  return (
    <a
      href={frameUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="group relative block aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-xl shadow-neutral-900/10"
    >
      {liveVideoId ? (
        // Vista previa real del vivo: muteada y sin controles; el click
        // sigue llevando al canal (el iframe no captura clicks).
        <iframe
          src={`https://www.youtube.com/embed/${liveVideoId}?autoplay=1&mute=1&playsinline=1&controls=0&rel=0`}
          title="Transmisión en vivo de DOGO Streaming"
          allow="autoplay; encrypted-media; picture-in-picture"
          className="pointer-events-none absolute inset-0 size-full"
        />
      ) : (
        <>
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
          {src && (
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
        </>
      )}
      <div
        className={
          liveVideoId || ready
            ? "absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 to-transparent"
            : "absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30"
        }
      />

      {/* Badge de estado — En vivo / No en vivo según hora de Argentina */}
      <LiveBadge className="absolute left-4 top-4" />

      {/* Botón de play centrado; con el vivo (real o preview) andando no hace falta */}
      {!liveVideoId && !ready && (
        <span className="absolute inset-0 grid place-items-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-neutral-900">
            <PlayIcon className="size-6" />
          </span>
        </span>
      )}

      <span className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] truncate font-display text-sm font-semibold text-white drop-shadow">
        {liveVideoId || !latestTitle
          ? "Lun a Vie · 10–12 h (ARG)"
          : `Último programa · ${latestTitle}`}
      </span>
    </a>
  );
}
