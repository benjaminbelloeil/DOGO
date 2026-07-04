import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ChevronRight, Radio } from "lucide-react";

import { cn } from "@/lib/utils";
import { getShow, shows, type Show } from "@/lib/shows";
import { Container, Logo, SectionTitle } from "@/components/site/primitives";
import { Parallax, Reveal, RevealGroup, RevealHeader, RevealItem } from "@/components/site/reveal";
import { Footer } from "@/components/site/footer";

export function generateStaticParams() {
  return shows.map((show) => ({ slug: show.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const show = getShow((await params).slug);
  if (!show) return {};
  const canonical = `/programas/${show.slug}`;
  return {
    title: `${show.name} — DOGO Streaming`,
    description: `${show.tagline}. ${show.description}`,
    alternates: { canonical },
    openGraph: {
      type: "website",
      url: canonical,
      siteName: "DOGO Streaming",
      locale: "es_AR",
      title: `${show.name} — DOGO Streaming`,
      description: `${show.tagline}. ${show.description}`,
      images: [{ url: show.logo }],
    },
  };
}

/* lucide ya no trae iconos de marcas: mismos paths que usa cta.tsx. */
function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.5C0 8.38 0 12 0 12s0 3.62.5 5.5a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.62 24 12 24 12s0-3.62-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51.01-4.75.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32C15.51 4.01 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.62a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function whereToWatch(show: Show) {
  return [
    {
      icon: Radio,
      title: "FM 99.9",
      desc: "En la radio, en San Nicolás y alrededores.",
      cta: "Sintonizá la 99.9",
      href: "/#en-vivo",
      external: false,
    },
    {
      icon: YoutubeIcon,
      title: "YouTube",
      desc: `Los programas completos de ${show.name}, cuando quieras.`,
      cta: "Ir al canal",
      href: show.youtube,
      external: true,
    },
    {
      icon: InstagramIcon,
      title: "Instagram",
      desc: `Clips, avisos y el detrás de escena de ${show.name}.`,
      cta: "Seguir al programa",
      href: show.instagram,
      external: true,
    },
    ...(show.whatsapp
      ? [
          {
            icon: WhatsAppIcon,
            title: "WhatsApp",
            desc: "Escribile directo al programa: temas, propuestas y mensajes al aire.",
            cta: "Enviar mensaje",
            href: show.whatsapp,
            external: true,
          },
        ]
      : []),
  ];
}

/** Etiqueta de sección local: mismo lenguaje que la portada, con el acento del programa. */
function ShowLabel({ show, children }: { show: Show; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em]",
        show.accentClass,
      )}
    >
      <span className="size-1.5 rounded-[1px] bg-gold" />
      {children}
    </span>
  );
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const show = getShow((await params).slug);
  if (!show) notFound();

  const other = shows.find((s) => s.slug !== show.slug);
  const ficha = [
    { label: "Días", value: show.days },
    { label: "Horario", value: show.hours },
    { label: "Frecuencia", value: "FM 99.9" },
    { label: "Formato", value: show.format },
  ];

  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900">
      {/* Barra superior liviana: logo a casa + acceso directo al vivo. */}
      <header className="border-b border-neutral-200/80 bg-neutral-100/90 backdrop-blur">
        <Container className="flex h-16 items-center">
          <Link href="/" aria-label="Ir al inicio de DOGO Streaming">
            <Logo />
          </Link>
        </Container>
      </header>

      <main className="pb-24">
        <Container>
          {/* Miga de pan: Inicio / Programa */}
          <Reveal distance={12}>
            <nav aria-label="Miga de pan" className="mt-8 flex items-center gap-1.5 text-sm">
              <Link
                href="/"
                className="font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Inicio
              </Link>
              <ChevronRight className="size-3.5 text-neutral-400" strokeWidth={2} />
              <span className={cn("font-semibold", show.accentClass)}>
                {show.name}
              </span>
            </nav>
          </Reveal>

          {/* Afiche del programa: el panel con la palabra gigante de la portada,
              a escala póster, junto a la presentación completa. */}
          <Reveal className="mt-6">
            <div className="grid overflow-hidden rounded-[2rem] border border-neutral-200 bg-white md:grid-cols-2">
              <div
                className={cn(
                  "relative flex aspect-[16/11] items-center justify-center overflow-hidden md:aspect-auto md:min-h-[30rem]",
                  show.panelClass,
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 select-none whitespace-nowrap font-display font-bold tracking-tight",
                    show.posterWordSizeClass,
                    show.wordClass,
                  )}
                >
                  {show.bgWord}
                </span>

                <span className="absolute left-6 top-6 z-10 -rotate-2 rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                  {show.schedule}
                </span>
                <span className="absolute bottom-6 right-6 z-10 rotate-2 rounded-full border border-neutral-200 bg-white px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-900 shadow-sm">
                  FM 99.9 · En vivo
                </span>

                <Parallax distance={24} className="relative z-10">
                  <Image
                    src={show.logo}
                    alt={`Logo de ${show.name}`}
                    width={560}
                    height={560}
                    priority
                    className="h-44 w-auto object-contain drop-shadow-sm sm:h-56 lg:h-72"
                  />
                </Parallax>
              </div>

              <div className="relative flex flex-col justify-center p-7 sm:p-10 md:pl-16 lg:p-14 lg:pl-20">
                {/* La ola de la portada: el color del panel se mete unos
                    píxeles acá en vez de cortarse en una línea recta. */}
                <svg
                  aria-hidden
                  viewBox="0 0 56 480"
                  preserveAspectRatio="none"
                  className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-14 md:block"
                >
                  <path
                    d="M18 0 Q52 40 18 80 T18 160 T18 240 T18 320 T18 400 T18 480 L0 480 L0 0 Z"
                    fill={show.waveFill}
                  />
                </svg>
                <p
                  className={cn(
                    "font-display text-[11px] font-bold uppercase tracking-[0.18em]",
                    show.accentClass,
                  )}
                >
                  {show.tagline}
                </p>
                <h1 className="mt-3 font-display text-4xl font-bold leading-[0.98] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                  {show.name}
                </h1>
                <div className="mt-5 space-y-4 text-sm leading-relaxed text-neutral-500 sm:text-base">
                  {show.about.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-2">
                  {show.chips.map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold text-neutral-700"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Link
                    href="/#en-vivo"
                    className={cn(
                      "group inline-flex h-12 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 active:scale-[0.98]",
                      show.accentButtonClass,
                    )}
                  >
                    Ver en vivo
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </Link>
                  <a
                    href={show.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-[0.98]"
                  >
                    Programas anteriores
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* La ficha: los datos duros del programa en una sola línea. */}
          <Reveal className="mt-6">
            <dl className="grid grid-cols-2 divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white max-md:divide-y md:grid-cols-4 md:divide-x">
              {ficha.map((item) => (
                <div key={item.label} className="px-6 py-5 sm:px-8">
                  <dt className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                    {item.label}
                  </dt>
                  <dd className="mt-1 font-display text-lg font-semibold text-neutral-900">
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>

          {/* Dónde verlo */}
          <section className="mt-20">
            <RevealHeader>
              <RevealItem>
                <ShowLabel show={show}>Dónde verlo</ShowLabel>
              </RevealItem>
              <RevealItem>
                <SectionTitle className="mt-4 max-w-xl">
                  Elegí cómo seguir el programa
                </SectionTitle>
              </RevealItem>
            </RevealHeader>

            <RevealGroup
              className={cn(
                "mt-10 grid gap-5",
                whereToWatch(show).length === 4
                  ? "sm:grid-cols-2 lg:grid-cols-4"
                  : "md:grid-cols-3",
              )}
              stagger={0.1}
            >
              {whereToWatch(show).map(({ icon: Icon, ...place }) => (
                <RevealItem key={place.title}>
                  <a
                    href={place.href}
                    {...(place.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex h-full flex-col rounded-[1.5rem] border border-neutral-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/70"
                  >
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl bg-neutral-100 transition-colors duration-300 group-hover:text-white",
                        show.accentClass,
                        show.slug === "ya-lo-sabia"
                          ? "group-hover:bg-grape"
                          : "group-hover:bg-orange-600",
                      )}
                    >
                      <Icon className="size-5" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-neutral-900">
                      {place.title}
                    </h3>
                    <p className="mt-1.5 flex-1 text-sm leading-relaxed text-neutral-500">
                      {place.desc}
                    </p>
                    <span
                      className={cn(
                        "mt-5 inline-flex items-center gap-1.5 text-sm font-semibold",
                        show.accentClass,
                      )}
                    >
                      {place.cta}
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2.5}
                      />
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>

          {/* Las voces del programa (solo si tenemos las fotos del equipo). */}
          {show.voices.length > 0 && (
          <section className="mt-20">
            <RevealHeader>
              <RevealItem>
                <ShowLabel show={show}>Al aire</ShowLabel>
              </RevealItem>
              <RevealItem>
                <SectionTitle className="mt-4 max-w-xl">
                  Las voces de {show.name}
                </SectionTitle>
              </RevealItem>
            </RevealHeader>

            <RevealGroup
              className={cn(
                "mt-10 grid gap-4 sm:gap-6",
                // Sin columnas vacías: la grilla se ajusta a la cantidad de voces.
                show.voices.length === 2 ? "grid-cols-2" : "grid-cols-3",
              )}
              stagger={0.1}
            >
              {show.voices.map((voice) => (
                <RevealItem
                  key={voice.name}
                  className={cn(
                    "group relative overflow-hidden rounded-[1.25rem] bg-neutral-200 sm:rounded-[1.75rem]",
                    // Con 2 voces las tarjetas son más anchas: el recorte 8/7
                    // les deja la misma altura que las 3/4 de la grilla de tres.
                    show.voices.length === 2 ? "aspect-[8/7]" : "aspect-[3/4]",
                  )}
                >
                  <Image
                    src={voice.image}
                    alt={`${voice.name}, al aire en DOGO Streaming`}
                    fill
                    sizes="(max-width: 640px) 33vw, 30vw"
                    className="object-cover object-top grayscale transition-all duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 to-transparent" />
                  <span className="absolute inset-x-0 bottom-0 p-3 font-display text-sm font-semibold leading-tight text-white sm:p-5 sm:text-lg">
                    {voice.name}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </section>
          )}

          {/* El otro programa */}
          {other && (
            <section className="mt-20">
              <Reveal>
                <Link
                  href={`/programas/${other.slug}`}
                  className="group grid overflow-hidden rounded-[1.75rem] border border-neutral-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/70 sm:grid-cols-[18rem_1fr] sm:items-stretch"
                >
                  <div
                    className={cn(
                      "relative flex aspect-[16/9] items-center justify-center overflow-hidden sm:aspect-auto",
                      other.panelClass,
                    )}
                  >
                    <span
                      aria-hidden
                      className={cn(
                        "pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 select-none whitespace-nowrap font-display text-5xl font-bold tracking-tight",
                        other.wordClass,
                      )}
                    >
                      {other.bgWord}
                    </span>
                    <Image
                      src={other.logo}
                      alt={`Logo de ${other.name}`}
                      width={320}
                      height={320}
                      className="relative z-10 h-24 w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="relative flex flex-col justify-center p-6 sm:p-8 sm:pl-16">
                    <svg
                      aria-hidden
                      viewBox="0 0 56 480"
                      preserveAspectRatio="none"
                      className="pointer-events-none absolute inset-y-0 left-0 hidden h-full w-14 sm:block"
                    >
                      <path
                        d="M18 0 Q52 40 18 80 T18 160 T18 240 T18 320 T18 400 T18 480 L0 480 L0 0 Z"
                        fill={other.waveFill}
                      />
                    </svg>
                    <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                      También al aire
                    </span>
                    <span className="mt-2 font-display text-xl font-bold tracking-tight text-neutral-900 sm:text-2xl">
                      {other.name}
                    </span>
                    <span className="mt-1 text-sm text-neutral-500">
                      {other.tagline} · {other.schedule}
                    </span>
                    <span
                      className={cn(
                        "mt-4 inline-flex items-center gap-1.5 text-sm font-semibold",
                        other.accentClass,
                      )}
                    >
                      Conocé el programa
                      <ArrowUpRight
                        className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2.5}
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            </section>
          )}
        </Container>
      </main>

      <Footer />
    </div>
  );
}
