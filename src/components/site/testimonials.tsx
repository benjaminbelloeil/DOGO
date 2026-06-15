import { Container, Pill, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";

export function Testimonials() {
  return (
    <section className="py-16">
      <Container>
        <div className="grid items-start gap-10 md:grid-cols-2">
          <Reveal>
            <SectionLabel>Testimonials</SectionLabel>
            <h2 className="mt-4 max-w-sm font-serif text-3xl leading-tight tracking-tight text-neutral-900">
              Hear From Those Who Go Live With Us
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-500">
              Discover why streamers love our platform—reliable, easy, and
              designed to help you grow your audience.
            </p>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-sm font-medium text-neutral-900">
                Have any Question?
              </span>
              <Pill>Button</Pill>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="rounded-2xl bg-neutral-100 p-8">
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
                  Position @ company
                </div>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
