"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { RevealGroup, RevealItem } from "./reveal";
import type { Still, Stream } from "@/lib/youtube";

const CHANNEL_URL = "https://www.youtube.com/@dogostreaming";
const EASE = [0.16, 1, 0.3, 1] as const;

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L7.54 4.3A1 1 0 0 0 6 5.14Z" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

/**
 * Fotogramas reales del stream. Muestra la primera captura y, mientras el
 * cursor está sobre la tarjeta, rota por las demás — como la vista previa de
 * YouTube. Con "reducir movimiento" activado queda quieta.
 */
function VideoStills({
  stream,
  active,
}: {
  stream: Stream;
  active: boolean;
}) {
  const reduce = useReducedMotion();
  const stills: Still[] = stream.stills.length
    ? stream.stills
    : stream.thumbnail
      ? [{ src: stream.thumbnail }]
      : [];
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!active || reduce || stills.length < 2) return;
    const id = setInterval(
      () => setFrame((f) => (f + 1) % stills.length),
      900,
    );
    return () => clearInterval(id);
  }, [active, reduce, stills.length]);

  useEffect(() => {
    if (!active) setFrame(0);
  }, [active]);

  // Sin imagen todavía (video recién subido): el logo de Ya lo Sabía sobre
  // el tinte uva del programa, como en los paneles de Programas.
  if (!stills.length) {
    return (
      <span className="flex size-full items-center justify-center bg-grape/[0.06]">
        <Image
          src="/shows/ya-lo-sabia.png"
          alt={stream.title}
          width={420}
          height={420}
          className="h-[45%] w-auto object-contain drop-shadow-sm"
        />
      </span>
    );
  }

  return (
    <>
      {stills.map((still, i) => (
        <span
          key={`${still.src}-${i}`}
          className={`absolute inset-0 overflow-hidden transition-opacity duration-300 ${
            i === frame ? "opacity-100" : "opacity-0"
          }`}
        >
          {still.sprite ? (
            /* Lámina de storyboard: la imagen es una grilla de fotogramas;
               se escala a `cols` anchos del contenedor y se desplaza para
               dejar visible solo la celda (x, y). Cada celda es 16:9, igual
               que el contenedor, así que calza exacto. */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={still.src}
              alt=""
              loading="lazy"
              className="absolute h-auto max-w-none"
              style={{
                width: `${still.sprite.cols * 100}%`,
                left: `${-still.sprite.x * 100}%`,
                top: `${-still.sprite.y * 100}%`,
              }}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={still.src}
              alt={i === 0 ? stream.title : ""}
              loading={i === 0 ? undefined : "lazy"}
              className="absolute inset-0 size-full object-cover"
            />
          )}
        </span>
      ))}
    </>
  );
}

/** Chip de duración sobre la miniatura, como en YouTube. */
function DurationChip({ duration }: { duration: string }) {
  return (
    <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-semibold tabular-nums text-white backdrop-blur-sm">
      {duration}
    </span>
  );
}

function videoIdFrom(url: string): string | null {
  return url.match(/[?&]v=([\w-]{6,})/)?.[1] ?? null;
}

/**
 * El último stream como póster: la imagen ocupa toda la tarjeta y el título
 * va montado sobre un degradado oscuro, como la portada de un video.
 *
 * Al pasar el mouse arranca una vista previa REAL del stream: el player de
 * YouTube muteado y sin controles, unos minutos adentro del vivo. Mientras
 * carga (y en táctiles, donde no hay hover) quedan los fotogramas.
 */
function FeaturedPoster({ stream }: { stream: Stream }) {
  const [hovered, setHovered] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);
  const reduce = useReducedMotion();
  const videoId = videoIdFrom(stream.url);
  const preview = hovered && !reduce && videoId;

  return (
    <a
      href={stream.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setPlayerReady(false);
      }}
      className="group relative block h-full overflow-hidden rounded-3xl bg-neutral-900"
    >
      <div className="relative aspect-video h-full w-full overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-[1.03]">
          <VideoStills stream={stream} active={hovered && !playerReady} />
        </div>
        {preview && (
          <iframe
            // Los vivos arrancan con minutos de placa de espera: el preview
            // entra a los 10 minutos, ya con el programa andando.
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&start=600&playsinline=1&rel=0&iv_load_policy=3`}
            title=""
            aria-hidden
            tabIndex={-1}
            allow="autoplay; encrypted-media"
            onLoad={() => setPlayerReady(true)}
            // Más alto que la tarjeta y centrado: el video 16:9 llena justo
            // el área visible y el chrome del player (título, logo de
            // YouTube, "más videos") queda en las franjas recortadas.
            className={`pointer-events-none absolute left-0 top-[-20%] h-[140%] w-full border-0 transition-opacity duration-500 ${
              playerReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10"
        aria-hidden
      />

      <span className="absolute left-4 top-4 rounded-full bg-grape px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm sm:left-6 sm:top-6">
        Último stream
      </span>

      <span className="absolute inset-0 hidden items-center justify-center sm:flex">
        <span className="flex size-14 items-center justify-center rounded-full border border-white/40 bg-white/15 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:border-transparent group-hover:bg-red-600 sm:size-16">
          <PlayIcon className="size-[40%]" />
        </span>
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
        <h3 className="line-clamp-2 max-w-2xl font-display text-xl font-bold leading-tight text-white sm:text-3xl">
          {stream.title}
        </h3>
        <p className="mt-1.5 hidden max-w-xl text-sm leading-relaxed text-white/70 sm:line-clamp-1">
          {stream.summary}
        </p>
        <div className="mt-4 flex items-center gap-4 sm:mt-5">
          <span className="inline-flex h-9 items-center justify-center gap-2 rounded-full bg-gold px-5 text-sm font-semibold text-ink transition-all group-hover:bg-gold-deep group-active:scale-95">
            <PlayIcon className="size-3.5" />
            Verlo en YouTube
          </span>
          <span className="text-xs tabular-nums text-white/70">
            {stream.durationLabel}
          </span>
        </div>
      </div>
    </a>
  );
}

/** Fila abierta de la lista de anteriores: miniatura, título y flecha. */
function StreamRow({
  stream,
  className = "",
}: {
  stream: Stream;
  className?: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={stream.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group flex items-center gap-4 py-4 ${className}`}
    >
      <div className="relative aspect-video w-32 shrink-0 overflow-hidden rounded-xl bg-neutral-200 sm:w-44">
        <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
          <VideoStills stream={stream} active={hovered} />
        </div>
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex size-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600">
            <PlayIcon className="size-[40%]" />
          </span>
        </span>
        {stream.duration && <DurationChip duration={stream.duration} />}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-grape sm:text-lg">
          {stream.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-neutral-500 sm:text-sm">
          {stream.summary}
        </p>
        <span className="mt-1.5 block text-xs tabular-nums text-neutral-400">
          {stream.durationLabel}
        </span>
      </div>

      <ArrowIcon className="size-4 shrink-0 text-neutral-300 transition-all group-hover:translate-x-0.5 group-hover:text-gold-deep" />
    </a>
  );
}

/** Etiqueta con línea de la columna de anteriores. */
function RailLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
        {children}
      </span>
      <span className="h-px flex-1 bg-neutral-200" aria-hidden />
    </div>
  );
}

export function BlogsList({ streams }: { streams: Stream[] }) {
  const [expanded, setExpanded] = useState(false);

  const [latest, ...rest] = streams;
  const rail = rest.slice(0, 2);
  const extra = rest.slice(2);

  if (!latest) return null;

  return (
    <motion.div layout transition={{ duration: 0.45, ease: EASE }}>
      <RevealGroup className="mt-10 grid items-stretch gap-8 lg:grid-cols-3 lg:gap-10">
        <RevealItem className="lg:col-span-2" from="left">
          <FeaturedPoster stream={latest} />
        </RevealItem>

        <RevealItem from="right" className="h-full">
          <div className="flex h-full flex-col">
            <RailLabel>Streams anteriores</RailLabel>
            <div className="flex flex-1 flex-col divide-y divide-neutral-200">
              {rail.map((stream) => (
                <StreamRow
                  key={stream.url + stream.title}
                  stream={stream}
                  className="flex-1"
                />
              ))}
              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 py-4 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Ver todos los streams en YouTube
                <ArrowIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
              </a>
            </div>
          </div>
        </RevealItem>
      </RevealGroup>

      {extra.length > 0 && (
        <>
          <AnimatePresence initial={false}>
            {expanded && (
              <motion.div
                id="novedades-extra"
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <motion.div
                  className="grid gap-x-8 pt-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10"
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={{
                    hidden: {
                      transition: { staggerChildren: 0.04, staggerDirection: -1 },
                    },
                    show: { transition: { staggerChildren: 0.08 } },
                  }}
                >
                  {extra.map((stream) => (
                    <motion.div
                      key={stream.url + stream.title}
                      className="border-t border-neutral-200"
                      variants={{
                        hidden: { opacity: 0, y: 18 },
                        show: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.35, ease: EASE },
                        },
                      }}
                    >
                      <StreamRow stream={stream} />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div layout className="mt-6 flex justify-center">
            <button
              type="button"
              aria-expanded={expanded}
              aria-controls="novedades-extra"
              onClick={() => setExpanded((open) => !open)}
              className="group inline-flex flex-col items-center gap-1 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-4 active:scale-95"
            >
              <span>{expanded ? "Ver menos" : "Ver más streams"}</span>
              <motion.svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="size-5 text-neutral-400 transition-colors group-hover:text-neutral-600"
                aria-hidden
                animate={{
                  rotate: expanded ? 180 : 0,
                  y: expanded ? 0 : [0, 3, 0],
                }}
                transition={{
                  rotate: { duration: 0.25, ease: "easeOut" },
                  y: {
                    duration: 1.2,
                    repeat: expanded ? 0 : Infinity,
                    ease: "easeInOut",
                  },
                }}
              >
                <path d="m6 9 6 6 6-6" />
              </motion.svg>
            </button>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}
