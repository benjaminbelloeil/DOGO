import { Container, ImagePlaceholder, Pill, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";

export function Cta() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <div className="grid items-stretch gap-6 overflow-hidden rounded-3xl bg-neutral-200 p-6 md:grid-cols-2 md:p-8">
            <div className="flex flex-col justify-center py-8 md:pl-6">
              <SectionLabel>Empezá a transmitir ahora</SectionLabel>
              <h2 className="mt-4 max-w-sm font-serif text-3xl leading-tight tracking-tight text-neutral-900">
                ¿Listo para salir en vivo? Empezá a transmitir hoy
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
                Obtené respuestas rápidas a las preguntas más comunes y empezá a
                transmitir sin complicaciones.
              </p>
              <div className="mt-8">
                <Pill>Botón</Pill>
              </div>
            </div>

            <div className="group flex min-h-64 items-center justify-center overflow-hidden rounded-2xl bg-neutral-400">
              <ImagePlaceholder className="size-20 text-white transition-transform duration-500 group-hover:scale-110" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
