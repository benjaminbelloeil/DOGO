import Image from "next/image";
import { ArrowUpRight, Mic, Video, Wifi, Snowflake } from "lucide-react";
import { Container, SectionLabel } from "./primitives";
import { Reveal, RevealHeader, RevealItem } from "./reveal";
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
    <section id="estudio" className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Alquilá el estudio</SectionLabel>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              El estudio de DOGO, disponible para tu proyecto
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
              Grabá tu podcast, transmití en vivo o producí tu contenido en un
              estudio equipado en el corazón de San Nicolás de los Arroyos.
            </p>
          </RevealItem>
        </RevealHeader>

        {/* Panel de reserva unificado: las fotos mandan a la izquierda y la
            info + acción concreta (WhatsApp) acompañan a la derecha. */}
        <Reveal className="mt-10">
          <div className="grid overflow-hidden rounded-[2rem] border border-neutral-200 bg-white md:grid-cols-12">
            {/* Fotos del estudio, a sangre contra el borde del panel */}
            <div className="relative md:col-span-7">
              <StudioCarousel
                className="h-full"
                frameClassName="aspect-[16/10] rounded-none border-0 md:aspect-auto md:h-full"
              />
            </div>

            {/* Info + CTA */}
            <div className="flex flex-col p-7 sm:p-9 md:col-span-5">
              <div className="grid gap-3 sm:grid-cols-2">
                {features.map(({ icon: Icon, title, desc }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-neutral-200 p-4 transition-colors duration-300 hover:border-grape/40"
                  >
                    <Icon className="size-5 text-grape" strokeWidth={1.75} />
                    <h3 className="mt-3 text-sm font-semibold leading-tight text-neutral-900">
                      {title}
                    </h3>
                    <p className="mt-1 text-xs leading-snug text-neutral-500">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-neutral-100 pt-6 md:mt-auto">
                <p className="text-sm leading-relaxed text-neutral-500">
                  Contanos qué querés grabar y coordinamos día y horario.
                </p>
                <a
                  href={VISIT_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 flex h-14 items-center justify-between gap-3 rounded-full bg-grape px-6 text-base font-semibold text-white shadow-sm transition-all duration-300 hover:bg-grape-deep hover:shadow-lg hover:shadow-grape/30 active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2.5">
                    <Image
                      src="/icons/whatsapp.png"
                      alt=""
                      width={40}
                      height={40}
                      className="size-5"
                    />
                    Agendar por WhatsApp
                  </span>
                  <ArrowUpRight
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
