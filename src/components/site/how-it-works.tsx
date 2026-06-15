import { Container, ImagePlaceholder, SectionLabel } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const steps = [1, 2, 3];

export function HowItWorks() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl tracking-tight text-neutral-900">
            How Our Platform Works to Help You Stream Smarter
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
            Getting started is easy. Connect your accounts, go live on multiple
            platforms, and focus on engaging and growing your audience—while we
            handle the rest.
          </p>
        </Reveal>

        <RevealGroup className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((n) => (
            <RevealItem
              key={n}
              className="rounded-2xl border border-neutral-200 bg-neutral-50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-lg hover:shadow-neutral-200/60"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-neutral-200">
                <ImagePlaceholder className="size-4 text-neutral-500" />
              </div>
              <h3 className="mt-12 text-sm font-medium text-neutral-900">
                0{n}. Connect Platforms
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Easily link all your favorite platforms in one place to manage,
                seamlessly.
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
