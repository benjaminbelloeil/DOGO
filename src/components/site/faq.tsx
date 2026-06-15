"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronDown, Container, Pill, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";

const faqs = [
  { q: "How do I start my first live stream?", a: null },
  {
    q: "Can I stream on multiple platforms at once?",
    a: "Yes, you can go live on Facebook, YouTube, TikTok, and more—all at the same time.",
  },
  { q: "How do I start my first live stream?", a: null },
  { q: "How do I start my first live stream?", a: null },
  { q: "How do I start my first live stream?", a: null },
];

export function Faq() {
  const [open, setOpen] = useState(1);

  return (
    <section className="py-16">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-2">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-4 max-w-xs font-serif text-3xl leading-tight tracking-tight text-neutral-900">
              Answers to Your Streaming Questions
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              Get quick answers to common questions and start streaming without
              hassle.
            </p>
            <div className="mt-8">
              <Pill>Button</Pill>
            </div>
          </Reveal>

          <Reveal delay={0.12} className="flex flex-col gap-3">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div
                  key={i}
                  className={`rounded-xl px-5 py-4 transition-colors duration-300 ${
                    isOpen ? "bg-neutral-200/70" : "bg-neutral-100 hover:bg-neutral-200/50"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-4 text-left text-sm font-medium text-neutral-800"
                  >
                    {item.q}
                    <ChevronDown
                      className={`size-4 shrink-0 text-neutral-500 transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && item.a && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 max-w-md text-sm leading-relaxed text-neutral-500">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
