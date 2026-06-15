import { Container, Pill, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";

export function Testimonials() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-2">
          <Reveal>
            <SectionLabel>Testimonios</SectionLabel>
            <h2 className="mt-4 max-w-sm font-serif text-3xl leading-tight tracking-tight text-neutral-900">
              Escuchá a quienes transmiten en vivo con nosotros
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              Descubrí por qué los streamers aman nuestra plataforma: confiable,
              fácil y diseñada para ayudarte a hacer crecer tu audiencia.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-900">
                ¿Tenés alguna pregunta?
              </span>
              <Pill>Botón</Pill>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8">
              <div className="mx-auto size-12 rounded-full bg-neutral-300" />
              <blockquote className="mt-6 text-center font-serif text-sm italic leading-relaxed text-neutral-500">
                “Horem ipsum dolor sit amet, consectetur adipiscing elit. Etiam
                eu turpis molestie, dictum est a, mattis tellus. Sed dignissim,
                metus nec fringilla accumsan. Horem ipsum dolor sit amet,
                consectetur adipiscing elit. Etiam eu turpis molestie, dictum
                est a, mattis tellus. Sed dignissim.”
              </blockquote>
              <figcaption className="mt-6 text-center">
                <div className="text-sm font-semibold text-neutral-900">
                  Jane Cooper
                </div>
                <div className="text-xs text-neutral-500">
                  Cargo @ empresa
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
