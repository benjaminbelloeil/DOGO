import Image from "next/image";

import { cn } from "@/lib/utils";
import { Container, SectionIntro, SectionLabel, SectionTitle } from "./primitives";
import { Reveal, RevealGroup, RevealHeader, RevealItem } from "./reveal";

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

// Los pills del equipo técnico alternan los tres tonos de la marca para que se
// lean como stickers pegados y no como una lista repetida.
const pillTints = [
  "border-neutral-300 bg-white text-neutral-700",
  "border-grape/25 bg-grape/[0.04] text-grape",
  "border-gold/50 bg-gold/10 text-ink",
];

const team = [
  {
    name: "Luca",
    description:
      "No vino a mirar, vino a decirlo. Pone el cuerpo y la palabra al frente de cada programa.",
    // Afiches re-exportados por el cliente con márgenes correctos (el sufijo
    // -v5 invalida la caché del optimizador de imágenes).
    image: "/team/luca-v5.png",
    position: "center top",
  },
  {
    name: "Diego «El Indio»",
    description:
      "Sin vueltas, sin libretos. Directo, filoso y siempre de frente con la audiencia.",
    image: "/team/diego-v5.png",
    position: "center top",
  },
  {
    name: "Dolores",
    description:
      "Cuando habla, pasan cosas. Trae la mirada que incomoda y enciende el debate.",
    image: "/team/dolores.png",
    position: "center top",
  },
];

export function HowItWorks() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Conocé al equipo</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionTitle className="mt-4 max-w-2xl">
              Los que ponen el cuerpo al aire
            </SectionTitle>
          </RevealItem>
          <RevealItem>
            <SectionIntro className="mt-4 max-w-xl">
              Las voces, miradas y manos que hacen que cada programa salga al
              aire desde San Nicolás.
            </SectionIntro>
          </RevealItem>
        </RevealHeader>

        <RevealGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {team.map((member, i) => (
            <RevealItem
              key={member.name}
              className={cn(
                "group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-neutral-200",
                // Zig-zag editorial: las pares bajan un poco en desktop.
                i % 2 === 1 && "lg:translate-y-8",
              )}
            >
              <Image
                src={member.image}
                alt={`${member.name}, integrante del equipo de DOGO Streaming`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                style={{ objectPosition: member.position }}
              />
              <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-lg font-semibold leading-tight text-white">
                  {member.name}
                </h3>
                {/* En pantallas táctiles la bio se ve siempre; con mouse se
                    revela al pasar por encima. */}
                <p className="mt-2 max-h-28 overflow-hidden text-xs leading-relaxed text-white/80 transition-all duration-500 pointer-fine:mt-1 pointer-fine:max-h-0 pointer-fine:opacity-0 pointer-fine:group-hover:mt-2 pointer-fine:group-hover:max-h-28 pointer-fine:group-hover:opacity-100">
                  {member.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal className="mt-6 lg:mt-16">
          <div className="relative overflow-hidden rounded-[2rem] border border-neutral-200 bg-white px-6 py-12 text-center sm:px-10 md:flex md:min-h-[30rem] md:flex-col md:justify-center">
            {/* Pills repartidos por toda la tarjeta — md+ */}
            {crew.map((role, i) => (
              <span
                key={role.label}
                className={cn(
                  "absolute z-0 hidden cursor-default select-none rounded-full border px-5 py-2 font-display text-sm font-medium tracking-tight shadow-sm transition-all duration-300 hover:rotate-0 hover:scale-105 md:inline-block",
                  pillTints[i % pillTints.length],
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
              <SectionIntro className="mx-auto mt-4 max-w-md">
                Las manos que no se ven en pantalla pero sostienen cada programa
                de DOGO desde San Nicolás.
              </SectionIntro>
            </div>

            {/* Cluster centrado — solo mobile */}
            <div className="mt-8 flex flex-wrap justify-center gap-2.5 md:hidden">
              {crew.map((role, i) => (
                <span
                  key={role.label}
                  className={cn(
                    "rounded-full border px-4 py-1.5 font-display text-sm font-medium tracking-tight shadow-sm",
                    pillTints[i % pillTints.length],
                  )}
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
