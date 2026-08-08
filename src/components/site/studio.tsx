import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clapperboard, Mic, Radio, RadioTower, Share2 } from "lucide-react";
import { Container, SectionIntro, SectionLabel, SectionTitle } from "./primitives";
import { Reveal, RevealHeader, RevealItem } from "./reveal";

const BOOK_URL = `https://wa.me/5493364403310?text=${encodeURIComponent(
  "¡Hola DOGO! 👋 Quiero reservar el estudio para grabar. ¿Coordinamos una visita?",
)}`;
const ADS_URL = `https://wa.me/5493364403310?text=${encodeURIComponent(
  "¡Hola DOGO! 👋 Quiero info para anunciar mi marca en sus programas.",
)}`;

/* Para qué lo usan, en versión corta — el mismo trío que /estudio. */
const features = [
  { icon: Mic, title: "Tu podcast" },
  { icon: RadioTower, title: "Programa en vivo" },
  { icon: Clapperboard, title: "Contenido de marca" },
];

const adPerks = [
  { icon: Radio, label: "FM 99.9 + streaming" },
  { icon: Mic, label: "Menciones en vivo" },
  { icon: Share2, label: "Contenido en redes" },
];

/** El fondo empapelado: la palabra repetida en filas, como en los billboards de /estudio y /anuncia.
 *  El bloque rotado tiene que sobrar por mucho más que el ángulo de rotación
 *  para no dejar cuñas sin cubrir en las esquinas — por eso el inset es tan
 *  grande y las filas van pegadas. */
function DuoWallpaper({ word }: { word: string }) {
  return (
    <div aria-hidden className="duo-wallpaper pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -inset-32 flex -rotate-6 flex-col items-center justify-center gap-1.5">
        {Array.from({ length: 14 }, (_, row) => (
          <p
            key={row}
            className="whitespace-nowrap font-display text-4xl font-bold uppercase leading-none tracking-tight text-white/[0.08]"
          >
            {`${word} · `.repeat(14)}
          </p>
        ))}
      </div>
    </div>
  );
}

/** Ícono grande, en reposo y en el estado angosto (`duo-mini`) comparten el mismo tratamiento. */
function DuoBadge({
  icon: Icon,
  size = "size-14",
  iconSize = "size-6",
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  size?: string;
  iconSize?: string;
}) {
  return (
    <span
      className={`flex ${size} shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25 backdrop-blur-sm`}
    >
      <Icon className={`${iconSize} text-white`} strokeWidth={1.75} />
    </span>
  );
}

export function Studio() {
  return (
    <section id="estudio" className="py-20 sm:py-28">
      <Container>
        <RevealHeader>
          <RevealItem>
            <SectionLabel>Alquilá tu espacio o anunciá tu marca</SectionLabel>
          </RevealItem>
          <RevealItem>
            <SectionTitle className="mt-4 max-w-2xl">
              El estudio y el aire de DOGO, para tu proyecto o tu marca
            </SectionTitle>
          </RevealItem>
          <RevealItem>
            <SectionIntro className="mt-4 max-w-xl">
              Grabá tu podcast, transmití en vivo o producí tu contenido — o
              poné tu marca a sonar en la radio de San Nicolás.
            </SectionIntro>
          </RevealItem>
        </RevealHeader>

        {/* Dos tarjetas, no un panel dividido: cada una es su propia oferta y
            su propio link. En mouse, la que está bajo el cursor se expande y
            empuja a la otra a un carril angosto con solo su ícono (CSS puro,
            sin JS); en touch no hay hover, así que el contenido completo
            queda siempre visible y las tarjetas se apilan. */}
        <Reveal className="mt-10">
          <div className="duo-row flex flex-col gap-5 md:h-[420px] md:flex-row">
            <div className="duo-card duo-card--grape relative flex flex-col justify-end overflow-hidden rounded-[1.75rem] p-7 sm:p-8">
              <Link
                href="/estudio"
                aria-label="Ver el estudio de DOGO"
                className="absolute inset-0 rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
              />
              <DuoWallpaper word="AL AIRE" />

              <div className="duo-content pointer-events-none relative z-[3]">
                <DuoBadge icon={Mic} />
                <p className="mt-4 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  El estudio de DOGO
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-bold leading-[1.05] tracking-tight text-white sm:text-[1.75rem]">
                  Alquilá tu espacio
                </h3>
                <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-white/80">
                  Grabá tu podcast, transmití en vivo o producí tu contenido.
                </p>

                <div className="duo-perks mt-5 flex flex-wrap gap-2">
                  {features.map(({ icon: Icon, title }) => (
                    <span
                      key={title}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      <Icon className="size-3.5" strokeWidth={2} />
                      {title}
                    </span>
                  ))}
                </div>

                <div className="duo-cta mt-5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Agendar el estudio
                    <ArrowUpRight className="size-4" strokeWidth={2.5} />
                  </span>
                  <a
                    href={BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribinos por WhatsApp para agendar el estudio"
                    className="pointer-events-auto relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <Image src="/icons/whatsapp.png" alt="" width={40} height={40} className="size-6" />
                  </a>
                </div>
              </div>

              <span aria-hidden className="duo-mini">
                <DuoBadge icon={Mic} size="size-16" iconSize="size-7" />
              </span>
            </div>

            <div className="duo-card duo-card--gold relative flex flex-col justify-end overflow-hidden rounded-[1.75rem] p-7 sm:p-8">
              <Link
                href="/anuncia"
                aria-label="Ver cómo anunciar con DOGO"
                className="absolute inset-0 rounded-[1.75rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-white/70"
              />
              <span aria-hidden className="duo-scrim" />
              <DuoWallpaper word="TU MARCA" />

              <div className="duo-content pointer-events-none relative z-[3]">
                <DuoBadge icon={Radio} />
                <p className="mt-4 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-gold">
                  Espacio publicitario
                </p>
                <h3 className="mt-1.5 font-display text-2xl font-bold leading-[1.05] tracking-tight text-white sm:text-[1.75rem]">
                  Anunciá tu marca
                </h3>
                <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-white/80">
                  Poné tu marca a sonar en la radio de San Nicolás.
                </p>

                <div className="duo-perks mt-5 flex flex-wrap gap-2">
                  {adPerks.map(({ icon: Icon, label }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-1.5 rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-xs font-semibold text-white"
                    >
                      <Icon className="size-3.5" strokeWidth={2} />
                      {label}
                    </span>
                  ))}
                </div>

                <div className="duo-cta mt-5 flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                    Anunciá con DOGO
                    <ArrowUpRight className="size-4" strokeWidth={2.5} />
                  </span>
                  <a
                    href={ADS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Escribinos por WhatsApp para anunciar con DOGO"
                    className="pointer-events-auto relative z-[1] flex size-12 shrink-0 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/25 backdrop-blur-sm transition-all duration-300 hover:bg-white/25 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  >
                    <Image src="/icons/whatsapp.png" alt="" width={40} height={40} className="size-6" />
                  </a>
                </div>
              </div>

              <span aria-hidden className="duo-mini">
                <DuoBadge icon={Radio} size="size-16" iconSize="size-7" />
              </span>
            </div>
          </div>

          {/* El empuje horizontal (:has() de un hermano en :hover) no tiene
              equivalente en utilidades de Tailwind — vive acá, aislado, y solo
              corre en dispositivos con mouse real. */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
                .duo-card--grape { background: linear-gradient(160deg, #501f80 0%, #3a1660 100%); }
                .duo-card--gold { background: linear-gradient(160deg, #fcb034 0%, #e0951a 100%); }

                .duo-scrim {
                  position: absolute;
                  inset: 0;
                  z-index: 1;
                  pointer-events: none;
                  background: linear-gradient(180deg, rgba(36,16,67,0) 30%, rgba(36,16,67,0.55) 70%, rgba(36,16,67,0.85) 100%);
                }

                .duo-wallpaper { z-index: 1; }

                .duo-mini {
                  position: absolute;
                  inset: 0;
                  z-index: 4;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  opacity: 0;
                  pointer-events: none;
                  transition: opacity 0.3s ease;
                }

                @media (hover: hover) and (pointer: fine) {
                  .duo-card {
                    flex: 1 1 0%;
                    min-width: 0;
                    transition: flex 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                  }
                  .duo-card:hover { flex: 1.7 1 0%; z-index: 2; }
                  .duo-card--grape:hover { box-shadow: 0 28px 56px -18px rgba(80, 31, 128, 0.45); }
                  .duo-card--gold:hover { box-shadow: 0 28px 56px -18px rgba(224, 149, 26, 0.5); }

                  .duo-row .duo-card:hover ~ .duo-card,
                  .duo-row .duo-card:has(~ .duo-card:hover) { flex: 0.62 1 0%; }

                  .duo-perks {
                    max-height: 0;
                    opacity: 0;
                    overflow: hidden;
                    transition: max-height 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.05s, opacity 0.35s ease 0.12s;
                  }
                  .duo-card:hover .duo-perks { max-height: 5rem; opacity: 1; }

                  .duo-content {
                    transition: opacity 0.25s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
                  }
                  .duo-row .duo-card:hover ~ .duo-card .duo-content,
                  .duo-row .duo-card:has(~ .duo-card:hover) .duo-content {
                    opacity: 0;
                    transform: translateY(6px) scale(0.97);
                    pointer-events: none;
                  }
                  .duo-row .duo-card:hover ~ .duo-card .duo-mini,
                  .duo-row .duo-card:has(~ .duo-card:hover) .duo-mini {
                    opacity: 1;
                  }
                }
              `,
            }}
          />
        </Reveal>
      </Container>
    </section>
  );
}
