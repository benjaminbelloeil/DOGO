import { Container, ImagePlaceholder, SectionLabel } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const features = [1, 2, 3, 4];

export function Features() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <SectionLabel>Key Features</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl tracking-tight text-neutral-900">
            Powerful Tools to Stream, Engage &amp; Grow
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
            Our powerful tools help you stream smoothly, engage your audience,
            and grow your reach with ease, turning viewers into loyal followers.
          </p>
        </Reveal>

        <RevealGroup
          className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.08}
        >
          {features.map((n) => (
            <RevealItem
              key={n}
              className="rounded-2xl bg-neutral-100 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-neutral-50 hover:shadow-lg hover:shadow-neutral-200/60"
            >
              <div className="flex size-9 items-center justify-center rounded-full bg-neutral-200">
                <ImagePlaceholder className="size-4 text-neutral-500" />
              </div>
              <h3 className="mt-12 text-sm font-medium text-neutral-900">
                Multi-platform streaming
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Go live on Facebook, YouTube, Twitch, and more, reaching
                everyone at once.
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
