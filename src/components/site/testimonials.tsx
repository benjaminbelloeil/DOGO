import Image from "next/image";

import { cn } from "@/lib/utils";
import { Container, Pill, SectionLabel } from "./primitives";
import { RevealGroup, RevealHeader, RevealItem } from "./reveal";

type Testimonial = {
  quote: string;
  name: string;
  place?: string;
  image?: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "DOGO es la radio que pongo todas las mañanas. Te hacen sentir parte de la ciudad y siempre te enterás de lo que pasa primero.",
    name: "Oyente de DOGO",
    place: "San Nicolás de los Arroyos",
  },
  {
    quote:
      "La escucho en el auto camino al trabajo. Es la compañía de todas mis mañanas.",
    name: "Vecina del centro",
    place: "San Nicolás de los Arroyos",
  },
  {
    quote:
      "Me entero de todo lo que pasa en la ciudad antes que en cualquier otro lado.",
    name: "Comerciante local",
    place: "San Nicolás de los Arroyos",
  },
];

// Inclinación alternada para que las tarjetas se lean como notas pegadas en la
// pared del estudio; la del medio va en uva y baja un paso en desktop.
const tilts = ["-rotate-2", "rotate-1 md:translate-y-6", "-rotate-1"];

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden>
      <path d="M0 18.7C0 11.3 4.6 4.9 12.5 1.3l2 3.5C9.8 7.2 7 10.6 6.6 14.3c.6-.3 1.4-.4 2.3-.4 3.6 0 6.4 2.8 6.4 6.6 0 3.8-3 6.8-6.9 6.8C3.6 27.3 0 23.6 0 18.7Zm17 0C17 11.3 21.6 4.9 29.5 1.3l2 3.5c-4.7 2.4-7.5 5.8-7.9 9.5.6-.3 1.4-.4 2.3-.4 3.6 0 6.4 2.8 6.4 6.6 0 3.8-3 6.8-6.9 6.8-4.8 0-8.4-3.7-8.4-8.6Z" />
    </svg>
  );
}

function TestimonialCard({
  testimonial: t,
  grape,
  className,
}: {
  testimonial: Testimonial;
  grape?: boolean;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-[1.75rem] p-7 transition-all duration-300 hover:rotate-0 hover:shadow-xl sm:p-8",
        grape
          ? "bg-grape text-white shadow-lg shadow-grape/25 hover:shadow-grape/35"
          : "border border-neutral-200 bg-white shadow-sm hover:shadow-neutral-200/80",
        className,
      )}
    >
      <QuoteMark className="size-7 text-gold" />
      <blockquote
        className={cn(
          "mt-4 flex-1 font-display text-lg font-medium leading-snug sm:text-xl",
          grape ? "text-white" : "text-neutral-800",
        )}
      >
        {t.quote}
      </blockquote>
      <figcaption className="mt-7 flex items-center gap-3">
        {t.image ? (
          <span
            className={cn(
              "size-11 shrink-0 overflow-hidden rounded-full ring-2",
              grape ? "ring-white/25" : "ring-neutral-100",
            )}
          >
            <Image
              src={t.image}
              alt={t.name}
              width={120}
              height={120}
              className="size-full object-cover grayscale"
            />
          </span>
        ) : (
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-bold",
              grape ? "bg-gold text-ink" : "bg-neutral-900 text-white",
            )}
          >
            {t.name.charAt(0)}
          </span>
        )}
        <span>
          <span
            className={cn(
              "block text-sm font-semibold",
              grape ? "text-white" : "text-neutral-900",
            )}
          >
            {t.name}
          </span>
          {t.place && (
            <span
              className={cn(
                "block text-xs",
                grape ? "text-white/60" : "text-neutral-500",
              )}
            >
              {t.place}
            </span>
          )}
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Testimonios</SectionLabel>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              La radio que San Nicolás siente propia
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
              Escuchá por qué la gente de la ciudad elige DOGO todos los días
              para informarse, reírse y sentirse parte.
            </p>
          </RevealItem>
          <RevealItem>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-900">
                ¿Querés salir al aire?
              </span>
              <Pill>Sumate</Pill>
            </div>
          </RevealItem>
        </RevealHeader>

        <RevealGroup
          className="mt-14 grid gap-6 md:grid-cols-3 lg:gap-8"
          stagger={0.12}
        >
          {testimonials.map((t, i) => (
            <RevealItem key={t.name} className="h-full">
              <TestimonialCard
                testimonial={t}
                grape={i === 1}
                className={tilts[i]}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
