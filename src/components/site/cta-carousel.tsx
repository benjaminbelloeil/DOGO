"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const shows = [
  {
    src: "/shows/ya-lo-sabia.png",
    alt: "Ya lo Sabía!, programa de DOGO Streaming",
    width: 1037,
    height: 829,
  },
  {
    src: "/shows/hoja-de-ruta.png",
    alt: "Hoja de Ruta, programa de DOGO Streaming",
    width: 1028,
    height: 1189,
  },
];

export function ShowsCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setIndex((i) => (i + 1) % shows.length), []);
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + shows.length) % shows.length),
    [],
  );

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [paused, reduce, next]);

  return (
    <div
      className="flex min-h-64 flex-col"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative flex-1 overflow-hidden rounded-2xl bg-white">
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={index}
            className="absolute inset-0 flex items-center justify-center p-6"
            initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <Image
              src={shows[index].src}
              alt={shows[index].alt}
              width={shows[index].width}
              height={shows[index].height}
              priority={index === 0}
              className="h-auto max-h-56 w-auto object-contain"
            />
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Programa anterior"
          className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Programa siguiente"
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:bg-neutral-50 hover:text-neutral-900 active:scale-95"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth={2}>
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      <div className="mt-4 flex items-center justify-center gap-2">
        {shows.map((s, i) => (
          <button
            key={s.src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Ver ${s.alt}`}
            aria-current={i === index}
            className={cn(
              "h-1.5 rounded-full transition-all",
              i === index
                ? "w-6 bg-neutral-900"
                : "w-1.5 bg-neutral-300 hover:bg-neutral-400",
            )}
          />
        ))}
      </div>
    </div>
  );
}
