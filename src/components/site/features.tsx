import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Container, SectionLabel } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const shows = [
  {
    name: "Ya lo Sabía",
    tagline: "Magazine de actualidad y humor",
    description:
      "Entrevistas, panel y la mirada filosa sobre lo que pasa en San Nicolás. Buena onda e información para arrancar el día.",
    schedule: "Lun a Vie · 10–12 h",
    logo: "/shows/ya-lo-sabia.png",
    // Tinte de fondo del panel del logo, tomado del color del programa.
    panel: "from-grape/10 to-grape/0",
  },
  {
    name: "Hoja de Ruta",
    tagline: "Charlas y recorridos en primera persona",
    description:
      "Historias, personajes y los caminos que cruzan la ciudad. Una conversación cercana, sin libretos, de frente con la audiencia.",
    schedule: "Lun a Vie · 10–12 h",
    logo: "/shows/hoja-de-ruta.png",
    panel: "from-gold/15 to-gold/0",
  },
];

export function Features() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <SectionLabel>Programas</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Los programas que salen al aire
          </h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
            Dos producciones propias, en vivo por FM 99.9 y por streaming, de
            lunes a viernes de 10 a 12 h (Argentina).
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-2" stagger={0.1}>
          {shows.map((show) => (
            <RevealItem
              key={show.name}
              className="group flex flex-col overflow-hidden rounded-3xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/70"
            >
              {/* Panel con el logo grande */}
              <div
                className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-gradient-to-br ${show.panel}`}
              >
                <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-gold px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-ink shadow-sm">
                  <span className="size-1.5 rounded-full bg-ink" />
                  {show.schedule}
                </div>
                <Image
                  src={show.logo}
                  alt={`Logo de ${show.name}`}
                  width={420}
                  height={420}
                  className="h-36 w-auto object-contain drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-105 sm:h-44"
                />
              </div>

              {/* Contenido */}
              <div className="flex flex-1 flex-col border-t border-neutral-100 p-6 sm:p-7">
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-grape">
                  {show.tagline}
                </p>
                <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-neutral-900">
                  {show.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {show.description}
                </p>
                <a
                  href="#"
                  className="group/cta mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-grape"
                >
                  Ver en vivo
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
