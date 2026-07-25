import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarCheck,
  ChevronRight,
  Clapperboard,
  Headphones,
  Lightbulb,
  Megaphone,
  Mic,
  MonitorPlay,
  Podcast,
  RadioTower,
  Snowflake,
  Video,
  Wifi,
} from "lucide-react";

import { SITE_URL } from "@/lib/site";
import { Container } from "@/components/site/primitives";
import { Reveal, RevealHeader, RevealItem } from "@/components/site/reveal";
import { StudioGallery } from "@/components/site/studio-gallery";
import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";

const BOOK_URL = `https://wa.me/5493364403310?text=${encodeURIComponent(
  "¡Hola DOGO! 👋 Quiero reservar el estudio para grabar. ¿Coordinamos una visita?",
)}`;

export const metadata: Metadata = {
  title: "El estudio — DOGO Streaming",
  description:
    "Alquilá el estudio de DOGO en San Nicolás: micrófonos, cámaras, luces y streaming listos para tu podcast, tu vivo o el contenido de tu marca.",
  alternates: { canonical: "/estudio" },
  openGraph: {
    type: "website",
    url: "/estudio",
    siteName: "DOGO Streaming",
    locale: "es_AR",
    title: "El estudio de DOGO — grabá tu contenido en San Nicolás",
    description:
      "Micrófonos, cámaras, luces y streaming listos. Reservá por WhatsApp y grabá tu podcast, tu vivo o el contenido de tu marca.",
    images: [{ url: `${SITE_URL}/studio/studio-1.png` }],
  },
};

/* La ficha del espacio: los datos duros, como en las páginas de programas. */
const ficha = [
  { label: "Ubicación", value: "San Nicolás de los Arroyos" },
  { label: "Puestos", value: "4 con micrófono" },
  { label: "Formato", value: "Audio + video" },
  { label: "Reservas", value: "Por WhatsApp" },
];

/* El rider técnico: lo que hay conectado y listo cuando llegás. */
const rider = [
  { icon: Mic, title: "Micrófonos Shure MV7+", desc: "Con brazo y antipop." },
  { icon: Headphones, title: "Auriculares de retorno", desc: "Monitoreo en vivo." },
  {
    icon: Video,
    title: "Cámaras multiángulo",
    desc: "Plano general y primeros planos.",
  },
  {
    icon: MonitorPlay,
    title: "Pantalla de estudio",
    desc: "Gráficas, tanteador o videollamada.",
  },
  { icon: Lightbulb, title: "Iluminación de estudio", desc: "Lista para cámara." },
  { icon: Wifi, title: "Internet por fibra", desc: "Vivos sin cortes." },
  { icon: RadioTower, title: "Streaming directo", desc: "YouTube y Twitch." },
  { icon: Snowflake, title: "Espacio climatizado", desc: "Silencioso y cómodo." },
];

/* Para qué lo alquilan. */
const usos = [
  {
    icon: Podcast,
    title: "Tu podcast",
    desc: "Sentate y grabá: los micrófonos, el retorno y la mesa ya están armados para conversar.",
  },
  {
    icon: RadioTower,
    title: "Tu programa en vivo",
    desc: "Salí al aire por YouTube o Twitch desde un estudio pensado para transmitir sin cortes.",
  },
  {
    icon: Clapperboard,
    title: "El contenido de tu marca",
    desc: "Entrevistas, lanzamientos o clips para redes, con la estética de un estudio de verdad.",
  },
];

/* El proceso es una secuencia real: por eso va numerado. */
const pasos = [
  {
    step: "1",
    title: "Coordiná tu visita",
    desc: "Escribinos por WhatsApp y elegí día y horario. Vení a conocer el estudio antes de grabar, sin compromiso.",
  },
  {
    step: "2",
    title: "Grabá con todo listo",
    desc: "Llegás y el estudio ya está armado: micrófonos, cámaras, luces y retorno funcionando.",
  },
  {
    step: "3",
    title: "Llevate el material",
    desc: "Te vas con tu contenido grabado — o lo emitimos en vivo directo a tu canal.",
  },
];

export default function EstudioPage() {
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
              <span className="font-semibold text-grape">El estudio</span>
            </nav>
          </Reveal>

          {/* ── Afiche del estudio: foto real + presentación, como programas ── */}
          <Reveal className="mt-6">
            <div className="grid overflow-hidden rounded-[2rem] border border-neutral-200 bg-white md:grid-cols-2">
              <div className="relative aspect-[16/11] overflow-hidden md:aspect-auto md:min-h-[30rem]">
                <Image
                  src="/studio/studio-1.png"
                  alt="Dos conductores al aire en la mesa del estudio de DOGO"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Tally de cámara: el punto rojo de "estamos grabando". */}
                <span className="absolute left-6 top-6 z-10 inline-flex -rotate-2 items-center gap-2 rounded-full bg-white/95 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-900 shadow-sm backdrop-blur">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full rounded-full bg-red-500/70 motion-safe:animate-ping" />
                    <span className="relative inline-flex size-2 rounded-full bg-red-500" />
                  </span>
                  Se alquila
                </span>
                <span className="absolute bottom-6 right-6 z-10 rotate-2 rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-ink shadow-sm">
                  San Nicolás · FM 99.9
                </span>
              </div>

              <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-grape">
                  El estudio de DOGO
                </p>
                <h1 className="mt-3 font-display text-4xl font-bold leading-[0.98] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
                  Grabá donde graba la radio
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-neutral-500 sm:text-base">
                  El estudio se alquila con todo conectado: micrófonos, cámaras,
                  luces y streaming listos para tu podcast, tu vivo o el
                  contenido de tu marca. Vos traés las ideas.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {["Podcast", "Streaming en vivo", "Contenido de marca"].map((chip) => (
                    <span
                      key={chip}
                      className="rounded-full border border-neutral-200 bg-neutral-50 px-3.5 py-1.5 text-xs font-semibold text-neutral-700"
                    >
                      {chip}
                    </span>
                  ))}
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                  <a
                    href={BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-grape px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-grape-deep active:scale-[0.98]"
                  >
                    <CalendarCheck className="size-4" strokeWidth={2} />
                    Reservar el estudio
                    <ArrowUpRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      strokeWidth={2.5}
                    />
                  </a>
                  <a
                    href="#espacio"
                    className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-[0.98]"
                  >
                    Conocer el espacio
                  </a>
                </div>
              </div>
            </div>
          </Reveal>

          {/* La ficha del espacio */}
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

          {/* ── El espacio: la galería bento con las fotos reales ─────────── */}
          <section id="espacio" className="mt-20 scroll-mt-28">
            <RevealHeader>
              <RevealItem>
                <span className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-grape">
                  <span className="size-1.5 rounded-[1px] bg-gold" />
                  El espacio
                </span>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
                  Así se ve un programa desde adentro
                </h2>
              </RevealItem>
            </RevealHeader>

            <Reveal className="mt-8">
              <StudioGallery bookUrl={BOOK_URL} />
            </Reveal>
          </section>

          {/* ── Rider técnico: lo que está conectado cuando llegás ────────── */}
          <section className="mt-20">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
              <RevealHeader>
                <RevealItem>
                  <span className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-grape">
                    <span className="size-1.5 rounded-[1px] bg-gold" />
                    Rider técnico
                  </span>
                </RevealItem>
                <RevealItem>
                  <h2 className="mt-4 font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl">
                    Llegás, te sentás y ya está sonando
                  </h2>
                </RevealItem>
                <RevealItem>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
                    Nada de armar ni configurar: el equipamiento del estudio
                    queda montado y probado antes de cada reserva.
                  </p>
                </RevealItem>
              </RevealHeader>

              <Reveal delay={0.1}>
                <ul className="divide-y divide-neutral-200 rounded-[1.5rem] border border-neutral-200 bg-white px-6 sm:px-8">
                  {rider.map(({ icon: Icon, title, desc }) => (
                    <li key={title} className="group/row flex items-center gap-4 py-4 sm:gap-5">
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-grape/[0.07] text-grape transition-colors duration-300 group-hover/row:bg-grape group-hover/row:text-white">
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
            </div>
          </section>

          {/* ── Para qué lo usan ──────────────────────────────────────────── */}
          <section className="mt-20">
            <RevealHeader>
              <RevealItem>
                <span className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-grape">
                  <span className="size-1.5 rounded-[1px] bg-gold" />
                  Para qué lo usan
                </span>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl">
                  Un estudio, todos tus formatos
                </h2>
              </RevealItem>
            </RevealHeader>

            <Reveal className="mt-10">
              <div className="grid divide-neutral-200 rounded-[2rem] border border-neutral-200 bg-white max-md:divide-y md:grid-cols-3 md:divide-x">
                {usos.map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="group p-7 sm:p-9">
                    <span className="flex size-11 items-center justify-center rounded-xl bg-grape/[0.07] text-grape transition-colors duration-300 group-hover:bg-grape group-hover:text-white">
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

          {/* ── Cómo funciona: una secuencia de verdad, por eso numerada ──── */}
          <section className="mt-20">
            <RevealHeader>
              <RevealItem>
                <span className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-grape">
                  <span className="size-1.5 rounded-[1px] bg-gold" />
                  Cómo funciona
                </span>
              </RevealItem>
              <RevealItem>
                <h2 className="mt-4 max-w-2xl font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl">
                  De tu mensaje al aire, en tres pasos
                </h2>
              </RevealItem>
            </RevealHeader>

            <Reveal className="mt-10">
              <ol className="ml-4 max-w-2xl space-y-10 border-l-2 border-dashed border-neutral-300 pl-9 sm:ml-5 sm:pl-11">
                {pasos.map((paso) => (
                  <li key={paso.step} className="relative">
                    <span className="absolute -left-[3.4rem] top-0 flex size-9 items-center justify-center rounded-full bg-grape font-display text-sm font-bold text-white shadow-sm sm:-left-[3.9rem]">
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

          {/* ── CTA final + cruce a la pauta ──────────────────────────────── */}
          <section className="mt-20">
            <Reveal>
              <div className="relative">
                {/* El sticker pisa el borde desde afuera, así no se recorta */}
                <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-grape px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm">
                  Estudio en alquiler
                </span>
                <div className="relative overflow-hidden rounded-[2rem] border-2 border-dashed border-grape/40 bg-white px-7 py-12 text-center sm:px-12 sm:py-16">
                  {/* Marca de agua: la palabra del oficio, en el violeta de la casa */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 select-none whitespace-nowrap font-display text-[9rem] font-bold tracking-tight text-grape/[0.06] sm:text-[13rem]"
                  >
                    AL AIRE
                  </span>
                  <h2 className="relative mx-auto max-w-2xl font-display text-3xl font-bold leading-[1.02] tracking-tight text-neutral-900 sm:text-5xl">
                    El estudio está listo.{" "}
                    <span className="whitespace-nowrap text-grape">Solo faltás vos.</span>
                  </h2>
                  <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-neutral-500 sm:text-base">
                    Contanos qué querés grabar y coordinamos día, horario y
                    presupuesto por WhatsApp.
                  </p>
                  <a
                    href={BOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-8 inline-flex h-13 items-center justify-center gap-2.5 rounded-full bg-grape px-8 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-grape-deep hover:shadow-lg hover:shadow-grape/30 active:scale-[0.98] sm:h-14 sm:text-base"
                  >
                    <Image
                      src="/icons/whatsapp.png"
                      alt=""
                      width={40}
                      height={40}
                      className="size-5"
                    />
                    Escribinos y reservá
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
                href="/anuncia"
                className="group flex flex-col gap-4 rounded-[1.5rem] border border-neutral-200 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-xl hover:shadow-neutral-200/70 sm:flex-row sm:items-center sm:justify-between sm:p-7"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-gold/15 text-gold-deep">
                    <Megaphone className="size-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold text-neutral-900">
                      ¿Buscás que tu marca suene en DOGO?
                    </p>
                    <p className="mt-0.5 text-sm text-neutral-500">
                      Menciones en vivo, spots y contenido en redes: conocé la pauta.
                    </p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-deep">
                  Anunciá con DOGO
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
