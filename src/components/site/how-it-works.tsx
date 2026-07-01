import Image from "next/image";

import { cn } from "@/lib/utils";
import { Container, SectionLabel } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

// Roles del equipo detrás de cámara, repartidos como stickers por toda la
// tarjeta. `pos` ubica cada uno; `tilt` da el zig-zag.
const crew = [
  { label: "Sonido", pos: "left-[7%] top-7", tilt: "-rotate-6" },
  { label: "Streaming", pos: "left-[34%] top-5", tilt: "rotate-3" },
  { label: "Cámaras", pos: "right-[33%] top-6", tilt: "-rotate-3" },
  { label: "Iluminación", pos: "right-[7%] top-8", tilt: "rotate-5" },
  { label: "Producción", pos: "left-[3%] top-[30%]", tilt: "rotate-4" },
  { label: "Switcher", pos: "right-[3%] top-[28%]", tilt: "-rotate-4" },
  { label: "Redes", pos: "left-[6%] top-1/2 -translate-y-1/2", tilt: "-rotate-3" },
  { label: "Guion", pos: "right-[5%] top-1/2 -translate-y-1/2", tilt: "rotate-3" },
  { label: "Realización", pos: "left-[3%] bottom-[30%]", tilt: "rotate-5" },
  { label: "Montaje", pos: "right-[3%] bottom-[28%]", tilt: "-rotate-5" },
  { label: "Maquillaje", pos: "left-[8%] bottom-7", tilt: "rotate-3" },
  { label: "Operadores", pos: "left-[35%] bottom-5", tilt: "-rotate-4" },
  { label: "Prensa", pos: "right-[34%] bottom-6", tilt: "rotate-4" },
  { label: "Edición", pos: "right-[8%] bottom-8", tilt: "-rotate-3" },
  { label: "Logística", pos: "left-[46%] top-[12%]", tilt: "rotate-2" },
];

const team = [
  {
    name: "Luca",
    description:
      "No vino a mirar, vino a decirlo. Pone el cuerpo y la palabra al frente de cada programa.",
    image: "/team/luca.png",
    position: "center top",
  },
  {
    name: "Dolores",
    description:
      "Cuando habla, pasan cosas. Trae la mirada que incomoda y enciende el debate.",
    image: "/team/dolores.png",
    position: "center top",
  },
  {
    name: "Karina",
    description:
      "Pregunta lo que otros callan. Va al fondo de cada tema, sin rodeos ni filtros.",
    image: "/team/karina.png",
    position: "center top",
  },
  {
    name: "Diego «El Indio»",
    description:
      "Sin vueltas, sin libretos. Directo, filoso y siempre de frente con la audiencia.",
    image: "/team/diego.png",
    position: "center top",
  },
];

export function HowItWorks() {
  return (
    <section className="py-12 sm:py-16">
      <Container className="max-w-7xl">
        <Reveal>
          <SectionLabel>Conocé al equipo</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
            Conocé al equipo de DOGO Streaming
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
            Las voces, miradas y manos que hacen que cada programa salga al
            aire desde San Nicolás.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <RevealItem
              key={member.name}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/60"
            >
              <div className="relative aspect-square shrink-0 overflow-hidden bg-neutral-100">
                <Image
                  src={member.image}
                  alt={`${member.name}, integrante del equipo de DOGO Streaming`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                  style={{ objectPosition: member.position }}
                />
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-display text-base font-semibold leading-tight text-neutral-900">
                  {member.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                  {member.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white px-6 py-12 text-center sm:px-10 md:flex md:min-h-[30rem] md:flex-col md:justify-center">
            {/* Pills repartidos por toda la tarjeta — md+ */}
            {crew.map((role) => (
              <span
                key={role.label}
                className={cn(
                  "absolute z-0 hidden cursor-default select-none rounded-full border border-neutral-300 bg-white px-5 py-2 font-display text-sm font-medium tracking-tight text-neutral-700 shadow-sm transition-transform duration-300 hover:rotate-0 hover:scale-105 md:inline-block",
                  role.pos,
                  role.tilt,
                )}
              >
                {role.label}
              </span>
            ))}

            <div className="relative z-10 mx-auto max-w-xl">
              <span className="inline-flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-grape">
                <span className="size-1.5 rounded-[1px] bg-gold" />
                Detrás de cámara
              </span>
              <h3 className="mx-auto mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                Gracias a todo el <span className="text-grape">equipo</span> que
                hace posible cada transmisión
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
                Las manos que no se ven en pantalla pero sostienen cada programa
                de DOGO desde San Nicolás.
              </p>
            </div>

            {/* Cluster centrado — solo mobile */}
            <div className="mt-8 flex flex-wrap justify-center gap-2.5 md:hidden">
              {crew.map((role) => (
                <span
                  key={role.label}
                  className="rounded-full border border-neutral-300 bg-white px-4 py-1.5 font-display text-sm font-medium tracking-tight text-neutral-700 shadow-sm"
                >
                  {role.label}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
