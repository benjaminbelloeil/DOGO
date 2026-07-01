import { ArrowUpRight, Mic, Video, Wifi, Snowflake } from "lucide-react";
import { Container, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";
import { StudioCarousel } from "./studio-carousel";

// Reemplazá el número por el WhatsApp real de DOGO (formato internacional, sin +).
const VISIT_URL =
  "https://wa.me/549XXXXXXXXXX?text=Hola%20DOGO,%20quiero%20agendar%20una%20visita%20al%20estudio";

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

export function Studio() {
  return (
    <section id="estudio" className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <SectionLabel>Alquilá el estudio</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            El estudio de DOGO, disponible para tu proyecto
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
            Grabá tu podcast, transmití en vivo o producí tu contenido en un
            estudio equipado en el corazón de San Nicolás de los Arroyos.
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10">
          <div className="grid items-stretch gap-10 md:grid-cols-12 md:gap-12">
            {/* Izquierda: beneficios como lista editorial + CTA */}
            <div className="flex flex-col md:col-span-5">
              <ul className="divide-y divide-neutral-200 border-t border-neutral-200">
                {features.map(({ icon: Icon, title, desc }, i) => (
                  <li
                    key={title}
                    className="group flex items-center gap-5 py-5"
                  >
                    <span className="w-6 shrink-0 font-display text-xs font-bold tabular-nums text-neutral-300 transition-colors group-hover:text-neutral-900">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Icon
                      className="size-5 shrink-0 text-neutral-900"
                      strokeWidth={1.5}
                    />
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold leading-tight text-neutral-900">
                        {title}
                      </h3>
                      <p className="mt-1 text-xs leading-snug text-neutral-500">
                        {desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={VISIT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-auto flex h-14 items-center justify-between gap-3 rounded-full bg-grape px-7 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-grape-deep hover:shadow-lg hover:shadow-grape/30 active:scale-[0.98]"
              >
                <span>Agendar una visita</span>
                <ArrowUpRight
                  className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={2}
                />
              </a>
            </div>

            {/* Derecha: image plate dominante */}
            <div className="flex flex-col md:col-span-7">
              <StudioCarousel
                className="flex flex-1 flex-col"
                frameClassName="md:min-h-0 md:flex-1 md:aspect-auto border-transparent shadow-xl shadow-neutral-900/10 ring-1 ring-black/5"
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
