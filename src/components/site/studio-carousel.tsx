"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

const slides = [
  { src: "/studio/studio-1.png", alt: "Dos conductores al aire en el estudio DOGO" },
  { src: "/studio/studio-2.png", alt: "Micrófono con el logo de DOGO Streaming" },
  { src: "/studio/studio-3.png", alt: "Conductor sonriendo frente al micrófono en DOGO" },
  { src: "/studio/studio-4.png", alt: "Invitada riéndose durante una entrevista en DOGO" },
  { src: "/studio/studio-5.png", alt: "Conductora al aire en el programa Ya lo Sabía" },
  { src: "/studio/studio-6.png", alt: "Panel completo grabando en el estudio DOGO" },
  { src: "/studio/studio-7.png", alt: "Equipo de DOGO en plena transmisión" },
  { src: "/studio/studio-8.png", alt: "Logo y mascota de DOGO en la pared del estudio" },
];

type StudioCarouselProps = {
  className?: string;
  frameClassName?: string;
};

export function StudioCarousel({
  className,
  frameClassName,
}: StudioCarouselProps) {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback((next: number) => {
    setDirection(next > index ? 1 : -1);
    setIndex((next + slides.length) % slides.length);
  }, [index]);

  const next = useCallback(() => {
    setDirection(1);
    setIndex((i) => (i + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setIndex((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused || reduce) return;
    const id = setInterval(next, 5000);
    return () => clearInterval(id);
  }, [paused, reduce, next]);

  return (
    <div
      className={cn("group relative", className)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div
        className={cn(
          "relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100",
          frameClassName,
        )}
      >
        <AnimatePresence initial={false} custom={direction} mode="popLayout">
          <motion.div
            key={index}
            custom={direction}
            className="absolute inset-0"
            initial={reduce ? { opacity: 0 } : { opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={slides[index].src}
              alt={slides[index].alt}
              fill
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/30 to-transparent" />

        <button
          type="button"
          onClick={prev}
          aria-label="Imagen anterior"
          className="absolute left-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 opacity-0 backdrop-blur transition-all hover:bg-white focus-visible:opacity-100 active:scale-95 group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth={2}>
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <button
          type="button"
          onClick={next}
          aria-label="Imagen siguiente"
          className="absolute right-3 top-1/2 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/80 text-neutral-900 opacity-0 backdrop-blur transition-all hover:bg-white focus-visible:opacity-100 active:scale-95 group-hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-4" stroke="currentColor" strokeWidth={2}>
            <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <div className="absolute inset-x-0 bottom-4 z-10 flex items-center justify-center gap-2">
          {slides.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => go(i)}
              aria-label={`Ir a la imagen ${i + 1}`}
              aria-current={i === index}
              className={cn(
                "h-1.5 rounded-full transition-all",
                i === index
                  ? "w-6 bg-white"
                  : "w-1.5 bg-white/55 hover:bg-white/80",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
