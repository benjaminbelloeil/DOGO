"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container, ImagePlaceholder, Pill } from "./primitives";

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

  return (
    <section className="pt-28 pb-10">
      <Container className="flex flex-col items-center text-center">
        <motion.div
          className="flex flex-col items-center"
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
        >
          <motion.h1
            variants={item}
            className="max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight text-neutral-900 sm:text-5xl"
          >
            Tu transmisión. Tu escenario. El mundo está mirando
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-sm leading-relaxed text-neutral-500"
          >
            Transmití en vivo en todas las plataformas principales a la vez,
            conectá con tus espectadores en tiempo real y generá vínculos
            auténticos que hacen crecer tu comunidad.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex items-center gap-3">
            <Pill>Botón</Pill>
            <Pill variant="outline">Botón</Pill>
          </motion.div>
        </motion.div>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: EASE }}
          className="mt-14 flex aspect-[16/10] w-full items-center justify-center rounded-3xl bg-neutral-200"
        >
          <ImagePlaceholder className="size-24 text-neutral-400" />
        </motion.div>
      </Container>
    </section>
  );
}
