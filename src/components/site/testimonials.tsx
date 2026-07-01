import Image from "next/image";

import { Container, Pill, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";

export function Testimonials() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div className="grid items-stretch gap-10 md:grid-cols-2">
          <Reveal>
            <SectionLabel>Testimonios</SectionLabel>
            <h2 className="mt-4 max-w-sm font-display text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              La radio que San Nicolás siente propia
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              Escuchá por qué la gente de la ciudad elige DOGO todos los días
              para informarse, reírse y sentirse parte.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-900">
                ¿Querés salir al aire?
              </span>
              <Pill>Sumate</Pill>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="flex">
            <figure className="flex h-full w-full flex-col justify-center rounded-2xl border border-neutral-200 bg-neutral-50 p-8 sm:p-10">
              <div className="mx-auto size-16 overflow-hidden rounded-full ring-2 ring-white">
                <Image
                  src="/studio/studio-4.png"
                  alt="Oyente de DOGO Streaming"
                  width={160}
                  height={160}
                  className="size-full object-cover"
                />
              </div>
              <blockquote className="mt-6 text-center font-display text-lg font-medium leading-relaxed text-neutral-700 sm:text-xl">
                “DOGO es la radio que pongo todas las mañanas. Te hacen sentir
                parte de la ciudad y siempre te enterás de lo que pasa primero.”
              </blockquote>
              <figcaption className="mt-6 text-center">
                <div className="text-sm font-semibold text-neutral-900">
                  Oyente de DOGO
                </div>
                <div className="text-xs text-neutral-500">
                  San Nicolás de los Arroyos
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
