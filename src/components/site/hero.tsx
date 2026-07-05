"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Container } from "./primitives";

const EASE = [0.16, 1, 0.3, 1] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    // React doesn't reliably set the `muted` DOM property from the attribute,
    // so browsers treat the video as having sound and block autoplay. Force it
    // muted, then start playback (Safari/iOS/low-power need the explicit play).
    video.muted = true;

    const tryPlay = () => video.play().catch(() => {});

    // Some browsers (Brave with Shields, Arc, strict autoplay policies) block
    // muted autoplay outright. Try immediately, and also fall back to the first
    // user gesture, which always grants playback permission.
    const resumeOnGesture = () => {
      tryPlay();
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
      window.removeEventListener("scroll", resumeOnGesture);
    };

    tryPlay();
    window.addEventListener("pointerdown", resumeOnGesture, { once: true });
    window.addEventListener("keydown", resumeOnGesture, { once: true });
    window.addEventListener("scroll", resumeOnGesture, { once: true });

    return () => {
      window.removeEventListener("pointerdown", resumeOnGesture);
      window.removeEventListener("keydown", resumeOnGesture);
      window.removeEventListener("scroll", resumeOnGesture);
    };
  }, []);

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden">
      {/* Full-bleed video background */}
      <video
        ref={videoRef}
        className="absolute inset-0 size-full object-cover"
        src="/hero/hero.mp4"
        poster="/hero/hero-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* Dark overlay so the white text stays readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75"
      />

      <Container className="relative z-10 flex max-w-6xl flex-col items-center pb-16 pt-28 text-center">
        <motion.div
          className="flex flex-col items-center"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          {/* En base va un paso más chico para que "El streaming de" entre en
              una sola línea en un teléfono de 390px. */}
          <h1 className="max-w-4xl font-display text-[2.75rem] font-bold leading-[0.95] tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0,0,0,0.35)] sm:text-7xl lg:text-8xl">
            {"El streaming de".split(" ").map((word, i) => (
              <motion.span
                key={`${word}-${i}`}
                variants={item}
                className="mr-[0.25em] inline-block"
              >
                {word}
              </motion.span>
            ))}
            <motion.span variants={item} className="mt-1 block text-gold">
              San Nicolás
            </motion.span>
          </h1>

          <motion.p
            variants={item}
            className="mt-7 max-w-lg text-base leading-relaxed text-white/80"
          >
            DOGO es la señal de San Nicolás de los Arroyos. De lunes a viernes
            te acompañamos en vivo por FM 99.9 con la mejor charla, la
            información que importa y mucha buena onda.
          </motion.p>

          {/* En el teléfono los botones van apilados a lo ancho (y más altos,
              para el pulgar); de sm en adelante, lado a lado como siempre. */}
          <motion.div
            variants={item}
            className="mt-7 flex w-full max-w-[17rem] flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center"
          >
            <a
              href="#en-vivo"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full bg-white px-6 text-sm font-semibold text-neutral-900 transition-all hover:bg-white/90 active:scale-95 sm:h-9 sm:px-5"
            >
              Escuchar en vivo
            </a>
            <a
              href="#programas"
              className="inline-flex h-11 items-center justify-center whitespace-nowrap rounded-full border border-white/40 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-white/20 active:scale-95 sm:h-9 sm:px-5"
            >
              Nuestros programas
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
