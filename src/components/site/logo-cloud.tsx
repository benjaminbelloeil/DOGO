import { Container } from "./primitives";
import { RevealGroup, RevealItem } from "./reveal";

const logos = [
  "✷ Gladia",
  "lemlist",
  "♫ Default",
  "veesion",
  "✿ Formance",
  "Truvi",
  "⇄ Connectd",
  "POSITIVE",
  "◈ INFINIT",
  "ECUS",
  "Pinpoint",
  "ScorePlay",
];

export function LogoCloud() {
  return (
    <section className="py-12">
      <Container>
        <RevealGroup
          className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 md:grid-cols-6"
          stagger={0.05}
        >
          {logos.map((logo) => (
            <RevealItem
              key={logo}
              className="flex items-center justify-center text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-600"
            >
              {logo}
            </RevealItem>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
