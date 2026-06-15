import { Container, ImagePlaceholder, Pill, SectionLabel } from "./primitives";
import { Reveal } from "./reveal";

export function Cta() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <div className="grid items-stretch gap-6 overflow-hidden rounded-3xl bg-neutral-200 p-6 md:grid-cols-2 md:p-8">
            <div className="flex flex-col justify-center py-8 md:pl-6">
              <SectionLabel>Start streaming now</SectionLabel>
              <h2 className="mt-4 max-w-sm font-serif text-3xl leading-tight tracking-tight text-neutral-900">
                Ready to Go Live? Start Streaming Today
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-neutral-600">
                Get quick answers to common questions and start streaming
                without hassle.
              </p>
              <div className="mt-8">
                <Pill>Button</Pill>
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
