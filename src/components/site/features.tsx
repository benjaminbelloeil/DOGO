import { Container, ImagePlaceholder, SectionLabel } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const features = [1, 2, 3, 4];

export function Features() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <SectionLabel>Funciones clave</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl tracking-tight text-neutral-900">
            Herramientas potentes para transmitir, conectar y crecer
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
            Nuestras potentes herramientas te ayudan a transmitir sin problemas,
            conectar con tu audiencia y ampliar tu alcance con facilidad,
            convirtiendo a tus espectadores en seguidores fieles.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {features.map((n) => (
            <RevealItem
              key={n}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:bg-white hover:shadow-lg hover:shadow-neutral-200/60"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-neutral-200">
                <ImagePlaceholder className="size-4 text-neutral-500" />
              </div>
              <h3 className="mt-12 text-sm font-medium text-neutral-900">
                Transmisión multiplataforma
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Transmití en vivo en Facebook, YouTube, Twitch y más, llegando a
                todos al mismo tiempo.
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
