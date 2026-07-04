import { Container, SectionIntro, SectionLabel, SectionTitle } from "./primitives";
import { RevealHeader, RevealItem } from "./reveal";
import { BlogsList } from "./blogs-list";
import { getRecentStreams } from "@/lib/youtube";

export async function Blogs() {
  const streams = await getRecentStreams(6);

  return (
    <section id="novedades" className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Novedades</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionTitle className="mt-4 max-w-2xl">
              Lo último de DOGO: revíví los streams completos
            </SectionTitle>
          </RevealItem>
          <RevealItem>
            <SectionIntro className="mt-4 max-w-2xl">
              Mirá las transmisiones más recientes de nuestro canal de YouTube y
              ponete al día con todo lo que pasó al aire.
            </SectionIntro>
          </RevealItem>
        </RevealHeader>

        <BlogsList streams={streams} />
      </Container>
    </section>
  );
}
