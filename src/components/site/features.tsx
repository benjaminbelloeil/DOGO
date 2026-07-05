import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { shows } from "@/lib/shows";
import { Container, SectionIntro, SectionLabel, SectionTitle } from "./primitives";
import { Parallax, RevealGroup, RevealHeader, RevealItem } from "./reveal";

export function Features() {
  return (
    <section id="programas" className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Programas</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionTitle className="mt-4 max-w-2xl">
              Los programas que salen al aire
            </SectionTitle>
          </RevealItem>
          <RevealItem>
            <SectionIntro className="mt-4 max-w-md">
              Dos producciones propias por FM 99.9 y streaming: Ya lo Sabía en
              vivo de lunes a viernes de 10 a 12 h, y muy pronto Hoja de Ruta
              los sábados.
            </SectionIntro>
          </RevealItem>
        </RevealHeader>

        {/* Editorial split: cada show es una pieza horizontal grande, con el
            panel del logo alternando de lado para romper la simetría. */}
        <RevealGroup className="mt-12 flex flex-col gap-6" stagger={0.14}>
          {shows.map((show, i) => {
            const flip = i % 2 === 1;
            return (
              <RevealItem
                key={show.name}
                from={flip ? "right" : "left"}
                distance={48}
                className="group grid overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/70 md:grid-cols-2 md:items-stretch"
              >
                {/* Panel con el logo grande */}
                <div
                  className={cn(
                    "relative flex aspect-[16/10] items-center justify-center overflow-hidden md:aspect-auto md:min-h-[20rem]",
                    show.panelClass,
                    flip && "md:order-2",
                  )}
                >
                  {/* Palabra gigante de afiche detrás del logo */}
                  <span
                    aria-hidden
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display font-bold tracking-tight",
                      show.wordSizeClass,
                      flip ? "rotate-6" : "-rotate-6",
                      show.wordClass,
                    )}
                  >
                    {show.bgWord}
                  </span>

                  <span
                    className={cn(
                      "absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wide shadow-sm",
                      show.comingSoon
                        ? "-rotate-2 bg-gold tracking-[0.14em] text-ink"
                        : "border border-neutral-200 bg-white text-neutral-900",
                    )}
                  >
                    {!show.comingSoon && (
                      <span className="size-1.5 rounded-full bg-neutral-900" />
                    )}
                    {show.comingSoon ? "Próximamente" : show.schedule}
                  </span>
                  <Parallax distance={20} className="relative z-10">
                    <Image
                      src={show.logo}
                      alt={`Logo de ${show.name}`}
                      width={420}
                      height={420}
                      className="h-32 w-auto object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105 sm:h-40 lg:h-48"
                    />
                  </Parallax>
                </div>

                {/* Contenido. El color del panel se mete unos píxeles acá con
                    un borde ondulado, en vez de cortarse en una línea recta. */}
                <div
                  className={cn(
                    "relative flex flex-1 flex-col justify-center p-7 sm:p-10",
                    // Aire extra del lado de la ola para que el texto no la pise.
                    flip ? "md:pr-16" : "md:pl-16",
                  )}
                >
                  <svg
                    aria-hidden
                    viewBox="0 0 56 480"
                    preserveAspectRatio="none"
                    className={cn(
                      "pointer-events-none absolute inset-y-0 hidden h-full w-14 md:block",
                      flip ? "right-0 -scale-x-100" : "left-0",
                    )}
                  >
                    <path
                      d="M18 0 Q52 40 18 80 T18 160 T18 240 T18 320 T18 400 T18 480 L0 480 L0 0 Z"
                      fill={show.waveFill}
                    />
                  </svg>
                  <p
                    className={cn(
                      "font-display text-[11px] font-bold uppercase tracking-[0.18em]",
                      show.accentClass,
                    )}
                  >
                    {show.tagline}
                  </p>
                  <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl">
                    {show.name}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
                    {show.description}
                  </p>
                  <Link
                    href={`/programas/${show.slug}`}
                    className={cn(
                      "group/cta mt-6 inline-flex items-center gap-1.5 text-sm font-semibold",
                      show.accentClass,
                    )}
                  >
                    Conocé el programa
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </Link>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
