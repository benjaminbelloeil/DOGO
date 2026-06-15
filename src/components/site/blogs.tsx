import { Container, ImagePlaceholder, Pill, SectionLabel } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const posts = [1, 2, 3];

export function Blogs() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <SectionLabel>Blogs</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl leading-tight tracking-tight text-neutral-900">
            Descubrí consejos, historias y tendencias del mundo del streaming en
            vivo
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-neutral-500">
            Descubrí consejos de expertos, historias inspiradoras y las últimas
            tendencias pensadas para ayudarte a transmitir de forma más
            inteligente, conectar con tu audiencia y crecer como creador.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {posts.map((n) => (
            <RevealItem key={n}>
              <article className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-neutral-200/60">
                <div className="flex aspect-[16/10] items-center justify-center overflow-hidden bg-neutral-200">
                  <ImagePlaceholder className="size-12 text-white transition-transform duration-500 group-hover:scale-110" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-base font-medium leading-snug text-neutral-900">
                    Cómo hacer crecer tu audiencia de streaming rápido
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                    Consejos para atraer espectadores y convertirlos en fans
                    fieles.
                  </p>
                  <div className="mt-5 flex items-center justify-between">
                    <Pill variant="outline" className="h-8 px-4 text-xs">
                      Leer más
                    </Pill>
                    <span className="text-xs text-neutral-400">
                      8 min de lectura
                    </span>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
