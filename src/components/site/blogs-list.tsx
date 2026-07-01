"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ImagePlaceholder } from "./primitives";
import { RevealGroup, RevealItem } from "./reveal";
import type { Stream } from "@/lib/youtube";

const comingSoonCards = [0, 1, 2];
const EASE = [0.16, 1, 0.3, 1] as const;

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L7.54 4.3A1 1 0 0 0 6 5.14Z" />
    </svg>
  );
}

/** Chip de duración sobre la miniatura, como en YouTube. */
function DurationChip({ duration }: { duration: string }) {
  return (
    <span className="absolute bottom-2.5 right-2.5 rounded-md bg-black/75 px-2 py-0.5 text-xs font-semibold tabular-nums text-white backdrop-blur-sm">
      {duration}
    </span>
  );
}

function Thumb({
  stream,
  playSize = "size-12",
}: {
  stream: Stream;
  playSize?: string;
}) {
  return (
    <>
      {stream.thumbnail ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={stream.thumbnail}
          alt={stream.title}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <span className="flex size-full items-center justify-center bg-neutral-200">
          <ImagePlaceholder className="size-12 text-white" />
        </span>
      )}

      <span className="absolute inset-0 flex items-center justify-center">
        <span
          className={`flex items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600 ${playSize}`}
        >
          <PlayIcon className="size-[40%]" />
        </span>
      </span>

      <DurationChip duration={stream.duration} />
    </>
  );
}

function StreamCard({
  stream,
  latest,
}: {
  stream: Stream;
  latest?: boolean;
}) {
  return (
    <a
      href={stream.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/60"
    >
      <div className="relative aspect-video shrink-0 overflow-hidden bg-neutral-200">
        <Thumb stream={stream} />
        {latest && (
          <span className="absolute left-3 top-3 rounded-full bg-grape px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white shadow-sm">
            Último stream
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="line-clamp-2 font-display text-base font-semibold leading-snug text-neutral-900">
          {stream.title}
        </h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-neutral-500">
          {stream.summary}
        </p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="inline-flex h-8 items-center justify-center gap-1.5 rounded-full border border-neutral-300 bg-white px-4 text-xs font-medium text-neutral-900 transition-all group-hover:bg-neutral-50 group-active:scale-95">
            <PlayIcon className="size-3" />
            Verlo
          </span>
          <span className="text-xs tabular-nums text-neutral-400">
            {stream.durationLabel}
          </span>
        </div>
      </div>
    </a>
  );
}

function ComingSoonCard({ index }: { index: number }) {
  return (
    <article className="flex h-full min-h-[16rem] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-neutral-300 p-5 text-center">
      <span className="flex size-12 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-400">
        <PlayIcon className="size-4" />
      </span>
      <h3 className="font-display text-base font-semibold text-neutral-500">
        Próximamente
      </h3>
      <p className="max-w-[16rem] text-sm leading-relaxed text-neutral-400">
        El siguiente stream aparece acá apenas termina de salir al aire.
      </p>
      <span className="sr-only">Novedad próxima {index + 1}</span>
    </article>
  );
}

export function BlogsList({ streams }: { streams: Stream[] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout transition={{ duration: 0.45, ease: EASE }}>
      <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
        {streams.map((stream, i) => (
          <RevealItem key={stream.url + stream.title} className="h-full">
            <StreamCard stream={stream} latest={i === 0} />
          </RevealItem>
        ))}
      </RevealGroup>

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
              className="grid gap-5 pt-6 md:grid-cols-3"
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                show: { transition: { staggerChildren: 0.08 } },
              }}
            >
              {comingSoonCards.map((item) => (
                <motion.div
                  key={item}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.35, ease: EASE },
                    },
                  }}
                >
                  <ComingSoonCard index={item} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="mt-8 flex justify-center">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls="novedades-extra"
          onClick={() => setExpanded((open) => !open)}
          className="group inline-flex flex-col items-center gap-1 text-sm font-medium text-neutral-500 transition-colors hover:text-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400 focus-visible:ring-offset-4 active:scale-95"
        >
          <span>{expanded ? "Ver menos" : "Ver más"}</span>
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
              y: { duration: 1.2, repeat: expanded ? 0 : Infinity, ease: "easeInOut" },
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </motion.svg>
        </button>
      </motion.div>
    </motion.div>
  );
}
