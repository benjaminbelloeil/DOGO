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
            Your stream. Your stage. The world is watching
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-md text-sm leading-relaxed text-neutral-500"
          >
            Go live on all major platforms at once, engage with viewers in real
            time, and build authentic connections that grow your community.
          </motion.p>

          <motion.div variants={item} className="mt-7 flex items-center gap-3">
            <Pill>Button</Pill>
            <Pill variant="outline">Button</Pill>
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
