import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ChevronRight,
  Handshake,
  Mic,
  MonitorPlay,
  Radio,
  Share2,
  Sparkles,
  Volume2,
} from "lucide-react";

import { SITE_URL } from "@/lib/site";
import { Container } from "@/components/site/primitives";
import { Reveal, RevealHeader, RevealItem } from "@/components/site/reveal";
import { BrandBillboard } from "@/components/site/brand-billboard";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const ADS_URL = `https://wa.me/5493364403310?text=${encodeURIComponent(
  "¡Hola DOGO! 👋 Quiero info para anunciar mi marca en sus programas.",
)}`;

export const metadata: Metadata = {
  title: "Anunciá con DOGO — tu marca al aire en San Nicolás",
  description:
    "Poné tu marca a sonar en DOGO: menciones en vivo por FM 99.9, streaming en YouTube y Twitch, y contenido en redes. Pedí tu propuesta por WhatsApp.",
  alternates: { canonical: "/anuncia" },
  openGraph: {
    type: "website",
    url: "/anuncia",
    siteName: "DOGO Streaming",
    locale: "es_AR",
    title: "Anunciá con DOGO — tu marca al aire en San Nicolás",
    description:
      "Menciones en vivo, spots, logo en pantalla y contenido en redes. La radio y el streaming de San Nicolás, con tu marca sonando.",
    images: [{ url: `${SITE_URL}/brand/dogo-mascot.png` }],
  },
};

/* La ficha de la pauta: los datos duros, como en la página del estudio. */
const ficha = [
  { label: "Alcance", value: "San Nicolás y alrededores" },
  { label: "Frecuencia", value: "FM 99.9" },
  { label: "Formatos", value: "Voz, pantalla y redes" },
  { label: "Contratación", value: "Por WhatsApp" },
];

/* Dónde suena tu marca: los tres frentes de DOGO. */
const alcance = [
  {
    icon: Radio,
    title: "FM 99.9",
    desc: "La radio que San Nicolás escucha todas las mañanas, de lunes a viernes de 10 a 12.",
  },
  {
    icon: MonitorPlay,
    title: "Streaming en vivo",
    desc: "Cada programa sale en video por YouTube y Twitch: tu marca se escucha y se ve.",
  },
  {
    icon: Share2,
    title: "Redes sociales",
    desc: "Los mejores momentos quedan en Instagram y TikTok, y tu marca viaja con ellos.",
  },
];

/* Los formatos de pauta. */
const formatos = [
  {
    icon: Mic,
    title: "Mención en vivo",
    desc: "Los conductores presentan tu marca en su voz, dentro de la charla del programa.",
  },
  {
    icon: Sparkles,
    title: "Segmento presentado",
    desc: "Un bloque del programa lleva tu nombre: “el deporte llega con tu marca”.",
  },
  {
    icon: Volume2,
    title: "Spot en la tanda",
    desc: "Tu aviso grabado suena en los cortes, en la radio y en el streaming a la vez.",
  },
  {
    icon: MonitorPlay,
    title: "Logo en pantalla",
    desc: "Tu marca visible en la transmisión de YouTube y Twitch mientras el programa está al aire.",
  },
  {
    icon: Share2,
    title: "Contenido en redes",
    desc: "Clips y publicaciones con tu marca en las cuentas de DOGO y de los programas.",
  },
  {
    icon: Handshake,
    title: "Acciones a medida",
    desc: "Sorteos, entrevistas de marca o activaciones: lo armamos juntos según tu objetivo.",
  },
];

/* Contratar pauta es una secuencia real: por eso va numerada. */
const pasos = [
  {
    step: "1",
    title: "Contanos tu marca",
    desc: "Un WhatsApp alcanza: qué vendés, a quién le hablás y qué querés lograr.",
  },
  {
    step: "2",
    title: "Recibí tu propuesta",
    desc: "Armamos una pauta a tu medida, combinando radio, streaming y redes según tu presupuesto.",
  },
  {
    step: "3",
    title: "Salí al aire",
    desc: "Tu marca empieza a sonar en las mañanas de San Nicolás — y te mostramos cómo rinde.",
  },
];

/** Etiqueta de sección local, con el acento dorado de la página. */
function AdLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-gold-deep">
      <span className="size-1.5 rounded-[1px] bg-gold" />
      {children}
    </span>
  );
}

export default function AnunciaPage() {
  return (
    <div className="min-h-screen bg-neutral-100 font-sans text-neutral-900">
      <Navbar solid />

      <main className="pb-24 pt-24">
        <Container>
          {/* Miga de pan, como en las páginas de programas */}
          <Reveal distance={12}>
            <nav aria-label="Miga de pan" className="mt-8 flex items-center gap-1.5 text-sm">
              <Link
                href="/"
                className="font-medium text-neutral-500 transition-colors hover:text-neutral-900"
              >
                Inicio
              </Link>
              <ChevronRight className="size-3.5 text-neutral-400" strokeWidth={2} />
              <span className="font-semibold text-gold-deep">Anunciá con DOGO</span>
            </nav>
          </Reveal>

          {/* ── Afiche interactivo: el espacio publicitario + la presentación ── */}
          <Reveal className="mt-6">
            <BrandBillboard ctaHref={ADS_URL} />
          </Reveal>

          {/* La ficha de la pauta */}
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

          {/* ── Dónde suena: un solo panel partido en tres, no tarjetas ────── */}
          <section className="mt-20">
            <RevealHeader>
              <RevealItem>
                <AdLabel>Dónde suena</AdLabel>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl">
                  Una pauta, tres lugares a la vez
                </h2>
              </RevealItem>
            </RevealHeader>

            <Reveal className="mt-10">
              <div className="grid divide-neutral-200 rounded-[2rem] border border-neutral-200 bg-white max-md:divide-y md:grid-cols-3 md:divide-x">
                {alcance.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="group p-7 sm:p-9">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-gold/15 text-gold-deep transition-colors duration-300 group-hover:bg-gold group-hover:text-white">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-semibold text-neutral-900">
                      {title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          </section>

          {/* ── Formatos: la hoja de pauta, en filas editoriales ───────────── */}
          <section id="formatos" className="mt-20 scroll-mt-28">
            <RevealHeader>
              <RevealItem>
                <AdLabel>Formatos</AdLabel>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl">
                  Elegí cómo quiere sonar tu marca
                </h2>
              </RevealItem>
              <RevealItem>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
                  Los formatos se combinan: una buena pauta suele mezclar
                  voz, pantalla y redes. Todos entran en la propuesta que
                  armamos juntos.
                </p>
              </RevealItem>
            </RevealHeader>

            <Reveal className="mt-10" delay={0.1}>
              <ul className="grid grid-cols-1 gap-x-10 rounded-[1.5rem] border border-neutral-200 bg-white px-6 sm:grid-cols-2 sm:px-8">
                {formatos.map(({ icon: Icon, title, desc }) => (
                  <li
                    key={title}
                    className="group/row flex items-center gap-4 border-neutral-200 py-4 [&:not(:first-child)]:border-t sm:gap-5 sm:[&:nth-child(-n+2)]:border-t-0 sm:[&:nth-child(even)]:border-l sm:[&:nth-child(even)]:pl-6 sm:[&:nth-child(odd)]:pr-6"
                  >
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-deep transition-colors duration-300 group-hover/row:bg-gold group-hover/row:text-white">
                      <Icon className="size-5" strokeWidth={1.75} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-base font-semibold leading-tight text-neutral-900">
                        {title}
                      </h3>
                      <p className="mt-0.5 text-sm leading-snug text-neutral-500">{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>

          {/* ── Cómo es anunciar: línea de tiempo punteada, no tarjetas ────── */}
          <section className="mt-20">
            <RevealHeader>
              <RevealItem>
                <AdLabel>Cómo es anunciar</AdLabel>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl">
                  De un WhatsApp a estar al aire
                </h2>
              </RevealItem>
            </RevealHeader>

            <Reveal className="mt-10">
              <ol className="ml-4 max-w-2xl space-y-10 border-l-2 border-dashed border-neutral-300 pl-9 sm:ml-5 sm:pl-11">
                {pasos.map((paso) => (
                  <li key={paso.step} className="relative">
                    <span className="absolute -left-[3.4rem] top-0 flex size-9 items-center justify-center rounded-full bg-gold-deep font-display text-sm font-bold text-white shadow-sm sm:-left-[3.9rem]">
                      {paso.step}
                    </span>
                    <h3 className="pt-1.5 font-display text-lg font-semibold text-neutral-900">
                      {paso.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-neutral-500 sm:text-base">
                      {paso.desc}
                    </p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </section>

          {/* ── CTA final: el aviso que falta vender, sin fondos oscuros ───── */}
          <section className="mt-20">
            <Reveal>
              <div className="relative">
                <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Espacio publicitario
                </span>
                <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-gold/60 bg-white px-7 py-12 text-center sm:px-12 sm:py-16">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 select-none whitespace-nowrap font-display text-[8rem] font-bold tracking-tight text-gold/[0.08] sm:text-[13rem]"
                >
                  TU MARCA
                </span>
                <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.02] tracking-tight text-neutral-900 sm:text-5xl">
                  Mañana a la mañana,{" "}
                  <span className="text-gold-deep">tu marca</span> ya puede
                  estar sonando
                </h2>
                <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
                  Escribinos y te armamos una propuesta a medida, sin vueltas y
                  sin compromiso.
                </p>
                <a
                  href={ADS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative mt-8 inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-gold px-8 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-gold-deep hover:shadow-lg hover:shadow-gold/30 active:scale-[0.98] sm:h-14 sm:text-base"
                >
                  <Image
                    src="/icons/whatsapp.png"
                    alt=""
                    width={40}
                    height={40}
                    className="size-5"
                  />
                  Anunciá con DOGO
                  <ArrowUpRight
                    className="size-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2}
                  />
                </a>
                </div>
              </div>
            </Reveal>

            <Reveal className="mt-5" delay={0.1}>
              <Link
                href="/estudio"
                className="group flex flex-col gap-4 rounded-[1.5rem] bg-gradient-to-br from-grape to-grape-deep p-6 shadow-[0_6px_0_0_#2d1150] transition-all duration-150 hover:translate-y-[2px] hover:shadow-[0_4px_0_0_#2d1150] active:translate-y-[6px] active:shadow-none sm:flex-row sm:items-center sm:justify-between sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/25">
                    <Mic className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-white">
                      ¿Preferís crear tu propio contenido?
                    </p>
                    <p className="mt-0.5 text-sm text-white/75">
                      El estudio de DOGO se alquila con todo el equipamiento listo.
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-white">
                  Conocé el estudio
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={2.5}
                  />
                </span>
              </Link>
            </Reveal>
          </section>
        </Container>
      </main>

      <Footer />
    </div>
  );
}
