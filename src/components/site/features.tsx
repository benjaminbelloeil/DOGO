import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Container, SectionLabel } from "./primitives";
import { Parallax, RevealGroup, RevealHeader, RevealItem } from "./reveal";

// Cada programa trae su propia identidad al panel: un tinte de su color de
// marca, una palabra gigante rotada al estilo afiche del hero y acentos a tono.
const shows = [
  {
    name: "Ya lo Sabía",
    tagline: "Magazine de actualidad y humor",
    description:
      "Entrevistas, panel y la mirada filosa sobre lo que pasa en San Nicolás. Buena onda e información para arrancar el día.",
    schedule: "Lun a Vie · 10–12 h",
    logo: "/shows/ya-lo-sabia.png",
    bgWord: "¡Ya lo Sabía!",
    panelClass: "bg-grape/[0.05]",
    wordClass: "text-grape/[0.08]",
    accentClass: "text-grape",
  },
  {
    name: "Hoja de Ruta",
    tagline: "Charlas y recorridos en primera persona",
    description:
      "Historias, personajes y los caminos que cruzan la ciudad. Una conversación cercana, sin libretos, de frente con la audiencia.",
    schedule: "Lun a Vie · 10–12 h",
    logo: "/shows/hoja-de-ruta.png",
    bgWord: "Hoja de Ruta",
    panelClass: "bg-orange-600/[0.05]",
    wordClass: "text-orange-600/[0.07]",
    accentClass: "text-orange-600",
  },
];

export function Features() {
  return (
    <section id="programas" className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Programas</SectionLabel>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Los programas que salen al aire
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
              Dos producciones propias, en vivo por FM 99.9 y por streaming, de
              lunes a viernes de 10 a 12 h (Argentina).
            </p>
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
                      "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none whitespace-nowrap font-display text-[5.5rem] font-bold tracking-tight sm:text-[7rem] lg:text-[8rem]",
                      flip ? "rotate-6" : "-rotate-6",
                      show.wordClass,
                    )}
                  >
                    {show.bgWord}
                  </span>

                  <span className="absolute left-5 top-5 z-10 inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-neutral-900 shadow-sm">
                    <span className="size-1.5 rounded-full bg-neutral-900" />
                    {show.schedule}
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

                {/* Contenido */}
                <div
                  className={cn(
                    "flex flex-1 flex-col justify-center border-neutral-100 p-7 sm:p-10",
                    flip ? "md:border-r" : "md:border-l",
                  )}
                >
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
                  <a
                    href="#en-vivo"
                    className={cn(
                      "group/cta mt-6 inline-flex items-center gap-1.5 text-sm font-bold",
                      show.accentClass,
                    )}
                  >
                    Ver en vivo
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </a>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </Container>
    </section>
  );
}
