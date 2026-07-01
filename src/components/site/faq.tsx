"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";

const faqs = [
  {
    q: "¿Dónde escucho DOGO?",
    a: "En el 99.9 de tu dial FM en San Nicolás de los Arroyos, y en vivo a través de nuestras redes.",
  },
  {
    q: "¿En qué horario transmiten?",
    a: "Estamos en vivo de lunes a viernes. Revisá nuestros programas para conocer cada propuesta.",
  },
  {
    q: "¿Puedo verlos por internet?",
    a: "Sí, transmitimos en vivo y compartimos los mejores momentos en nuestras redes sociales.",
  },
  {
    q: "¿Cómo participo o propongo un tema?",
    a: "Escribinos por nuestras redes o mandanos tu mensaje al aire. Siempre hay lugar para la gente de la ciudad.",
  },
  {
    q: "¿Cómo sumo mi marca a DOGO?",
    a: "Contactanos y te contamos las opciones de pauta y auspicio en nuestros programas.",
  },
];

function PlusIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      className={className}
      aria-hidden
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export function Faq() {
  const [open, setOpen] = useState(1);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="grid items-start gap-12 md:grid-cols-[2fr_3fr] lg:gap-20">
          <Reveal from="left">
            <SectionLabel>Preguntas frecuentes</SectionLabel>
            <h2 className="mt-4 max-w-sm font-display text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Todo lo que necesitás saber
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              Las respuestas a las preguntas más comunes sobre DOGO y cómo
              sintonizarnos.
            </p>
            <a
              href="#"
              className="group mt-8 inline-flex h-14 items-center gap-2 self-start rounded-full bg-grape px-7 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-grape-deep hover:shadow-lg hover:shadow-grape/30 active:scale-[0.98]"
            >
              Escribinos
              <ArrowUpRight
                className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </a>
          </Reveal>

          {/* Lista editorial dividida: la pregunta manda, el círculo con el
              "+" gira a "×" y se pinta de uva al abrir. */}
          <Reveal from="right" delay={0.1} className="border-t border-neutral-200">
            {faqs.map((item, i) => {
              const isOpen = open === i;
              return (
                <div key={i} className="border-b border-neutral-200">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span
                      className={cn(
                        "font-display text-base font-semibold tracking-tight transition-colors duration-300 sm:text-lg",
                        isOpen
                          ? "text-grape"
                          : "text-neutral-900 group-hover:text-grape",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                        isOpen
                          ? "rotate-45 border-grape bg-grape text-white"
                          : "border-neutral-300 text-neutral-500 group-hover:border-grape group-hover:text-grape",
                      )}
                    >
                      <PlusIcon className="size-4" />
                    </span>
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
                        <p className="max-w-md pb-6 text-sm leading-relaxed text-neutral-500">
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
