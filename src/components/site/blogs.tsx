import { Container, SectionLabel } from "./primitives";
import { RevealHeader, RevealItem } from "./reveal";
import { BlogsList } from "./blogs-list";
import { getRecentStreams } from "@/lib/youtube";

export async function Blogs() {
  const streams = await getRecentStreams(3);

  return (
    <section className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Novedades</SectionLabel>
          </RevealItem>
          <RevealItem>
            <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Lo último de DOGO: revíví los streams completos
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500">
              Mirá las transmisiones más recientes de nuestro canal de YouTube y
              ponete al día con todo lo que pasó al aire.
            </p>
          </RevealItem>
        </RevealHeader>

        <BlogsList streams={streams} />
      </Container>
    </section>
  );
}
