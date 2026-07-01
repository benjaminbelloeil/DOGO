"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

type Direction = "up" | "down" | "left" | "right";

function initialOffset(from: Direction, distance: number) {
  switch (from) {
    case "up":
      return { y: distance };
    case "down":
      return { y: -distance };
    case "left":
      return { x: -distance };
    case "right":
      return { x: distance };
  }
}

/** Fade-and-slide the children in from a direction once they scroll into view. */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  distance = 24,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  from?: Direction;
  distance?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, ...initialOffset(from, distance) }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Staggered grid/list: children reveal one after another. */
export function RevealGroup({
  children,
  className,
  stagger = 0.1,
  delayChildren = 0,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
  delayChildren?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
    >
      {children}
    </motion.div>
  );
}

/** A single item inside a RevealGroup. Optional direction for the entrance. */
export function RevealItem({
  children,
  className,
  from = "up",
  distance = 24,
}: {
  children: React.ReactNode;
  className?: string;
  from?: Direction;
  distance?: number;
}) {
  const variants = {
    hidden: { opacity: 0, ...initialOffset(from, distance) },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.6, ease: EASE },
    },
  };

  return (
    <motion.div className={cn(className)} variants={variants}>
      {children}
    </motion.div>
  );
}

/**
 * Staggered section header: eyebrow, title and subtitle slide up one after the
 * other. Pass the header elements as children wrapped in <RevealItem>.
 */
export function RevealHeader({
  children,
  className,
  stagger = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <RevealGroup className={className} stagger={stagger}>
      {children}
    </RevealGroup>
  );
}

/**
 * Subtle scroll parallax: translates its children on the Y axis as the element
 * travels through the viewport. Keep the parent `overflow-hidden` so the moved
 * media never peeks outside its frame.
 */
export function Parallax({
  children,
  className,
  distance = 40,
}: {
  children: React.ReactNode;
  className?: string;
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  if (reduce) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
