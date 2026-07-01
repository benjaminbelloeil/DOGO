import { Container, Pill, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";
import { ShowsStickers } from "./shows-stickers";

export function Cta() {
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <Reveal>
          <div
            data-sticker-bounds="cta"
            className="relative isolate grid items-stretch gap-6 overflow-hidden rounded-3xl bg-white p-6 md:grid-cols-2 md:p-8"
          >
            <div className="relative z-10 flex flex-col justify-center py-8 md:pl-6">
              <SectionLabel>Sumate</SectionLabel>
              <h2 className="mt-4 max-w-sm font-display text-3xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                Seguinos y sé parte de DOGO
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
                Seguinos en redes, enterate de los vivos y los invitados, y
                prendé la 99.9 de lunes a viernes.
              </p>
              <div className="mt-8">
                <Pill>Escuchar en vivo</Pill>
              </div>
            </div>

            <ShowsStickers boundsSelector='[data-sticker-bounds="cta"]' />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
