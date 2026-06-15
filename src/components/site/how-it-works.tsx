import { Container, ImagePlaceholder, SectionLabel } from "./primitives";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const steps = [1, 2, 3];

export function HowItWorks() {
  return (
    <section className="py-16">
      <Container>
        <Reveal>
          <SectionLabel>Cómo funciona</SectionLabel>
          <h2 className="mt-4 max-w-2xl font-serif text-3xl tracking-tight text-neutral-900">
            Cómo funciona nuestra plataforma para ayudarte a transmitir de forma
            más inteligente
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-500">
            Empezar es fácil. Conectá tus cuentas, transmití en vivo en varias
            plataformas y enfocate en interactuar con tu audiencia y hacerla
            crecer, mientras nosotros nos encargamos del resto.
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
                0{n}. Conectá las plataformas
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-500">
                Vinculá fácilmente todas tus plataformas favoritas en un solo
                lugar para gestionarlas sin complicaciones.
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
