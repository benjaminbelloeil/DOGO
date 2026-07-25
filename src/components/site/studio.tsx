import Link from "next/link";
import { ArrowUpRight, Mic, Radio, Share2, Snowflake, Video, Wifi } from "lucide-react";
import { Container, SectionIntro, SectionLabel, SectionTitle } from "./primitives";
import { Reveal, RevealHeader, RevealItem } from "./reveal";

const features = [
  {
    icon: Mic,
    title: "Audio profesional",
    desc: "Micrófonos y consola listos para grabar.",
  },
  {
    icon: Video,
    title: "Listo para streaming",
    desc: "Cámaras y luces para transmitir en vivo.",
  },
  {
    icon: Wifi,
    title: "Internet veloz",
    desc: "Conexión estable para vivos sin cortes.",
  },
  {
    icon: Snowflake,
    title: "Espacio cómodo",
    desc: "Estudio climatizado y silencioso.",
  },
];

const adPerks = [
  { icon: Radio, label: "FM 99.9 + streaming" },
  { icon: Mic, label: "Menciones en vivo" },
  { icon: Share2, label: "Contenido en redes" },
];

/** Los dos botones de acción comparten exactamente el mismo estilo. */
const ctaClass =
  "group inline-flex h-13 items-center justify-center gap-2.5 whitespace-nowrap rounded-full px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 active:scale-[0.98] sm:h-14 sm:px-7 sm:text-base";

export function Studio() {
  return (
    <section id="estudio" className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Trabajá con DOGO</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionTitle className="mt-4 max-w-2xl">
              El estudio y el aire de DOGO, para tu proyecto o tu marca
            </SectionTitle>
          </RevealItem>
          <RevealItem>
            <SectionIntro className="mt-4 max-w-xl">
              Grabá tu podcast, transmití en vivo o producí tu contenido — o
              poné tu marca a sonar en la radio de San Nicolás.
            </SectionIntro>
          </RevealItem>
        </RevealHeader>

        {/* Díptico "trabajá con DOGO": a la izquierda el estudio como lista
            editorial; a la derecha la pauta, donde la columna entera ES el
            aviso vacío. Las dos acciones van juntas en la fila de abajo. */}
        <Reveal className="mt-10">
          <div className="rounded-[2rem] border border-neutral-200 bg-white p-7 sm:p-10 md:p-12">
            <div className="grid gap-10 md:grid-cols-2 lg:gap-14">
              {/* Columna 1 · Reservá el estudio */}
              <div className="divide-y divide-neutral-200">
                {features.map(({ icon: Icon, title, desc }, i) => (
                  <div
                    key={title}
                    className={`group/row flex items-center gap-4 py-4 ${i === 0 ? "pt-0" : ""}`}
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-grape/[0.07] text-grape transition-colors duration-300 group-hover/row:bg-grape group-hover/row:text-white">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold leading-tight text-neutral-900">
                        {title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-snug text-neutral-500">
                        {desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Columna 2 · Anunciantes: la columna entera es el aviso vacío */}
              <div
                id="anunciantes"
                className="group relative flex flex-col items-center justify-center rounded-[1.5rem] border-2 border-dashed border-neutral-300 bg-neutral-50/80 px-7 py-10 text-center transition-colors duration-300 hover:border-grape/40 sm:px-10"
              >
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm transition-transform duration-300 group-hover:rotate-0">
                  Espacio publicitario
                </span>

                <p className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-300 sm:text-4xl">
                  Este espacio
                  <br />
                  puede ser <span className="text-grape">tuyo</span>
                </p>
                <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
                  De lunes a viernes la ciudad escucha DOGO por FM 99.9 y por
                  streaming. Tu logo, tu mensaje y tu marca sonando todas las
                  mañanas.
                </p>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5">
                  {adPerks.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700"
                    >
                      <Icon className="size-3.5 text-grape" strokeWidth={2} />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Fila de acciones: cada botón lleva a su propia página. */}
            <div className="mt-8 flex flex-col gap-4 border-t border-neutral-200 pt-7 sm:mt-10 lg:flex-row lg:items-center lg:justify-between">
              <p className="max-w-sm text-sm leading-relaxed text-neutral-500">
                Conocé el estudio por dentro o mirá cómo funciona la pauta —
                cada uno tiene su página.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/estudio"
                  className={`${ctaClass} bg-grape hover:bg-grape-deep hover:shadow-lg hover:shadow-grape/30`}
                >
                  Agendar el estudio
                  <ArrowUpRight
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </Link>
                <Link
                  href="/anuncia"
                  className={`${ctaClass} bg-gold hover:bg-gold-deep hover:shadow-lg hover:shadow-gold/30`}
                >
                  Anunciá con DOGO
                  <ArrowUpRight
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
