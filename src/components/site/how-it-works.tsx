import Image from "next/image";

import { Container, SectionIntro, SectionLabel, SectionTitle } from "./primitives";
import { RevealGroup, RevealHeader, RevealItem } from "./reveal";

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
          {team.map((member) => (
            <RevealItem
              key={member.name}
              className="group relative aspect-[3/4] overflow-hidden rounded-[1.75rem] bg-neutral-200"
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
      </Container>
    </section>
  );
}
