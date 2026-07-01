import Image from "next/image";
import { ArrowUpRight, Clock, Radio } from "lucide-react";

import { Container } from "./primitives";
import { LiveBadge } from "./live-badge";
import { Reveal } from "./reveal";

// TODO: reemplazar por las URLs reales de DOGO.
const LIVE_URL = "https://www.youtube.com/@dogostreaming/live";

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@dogostreaming",
    path: "M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.5C0 8.38 0 12 0 12s0 3.62.5 5.5a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.62 24 12 24 12s0-3.62-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dogostreaming",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51.01-4.75.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32C15.51 4.01 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.62a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/dogostreaming",
    path: "M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.95.93-1.95 1.88v2.26h3.32l-.53 3.49h-2.79v8.44C19.61 23.08 24 18.09 24 12.07Z",
  },
];

export function LiveSocial() {
  return (
    <section id="en-vivo" className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Ancla visual: el vivo como una pantalla enmarcada */}
          <Reveal from="left" className="order-2 lg:order-1">
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block aspect-video overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-900 shadow-xl shadow-neutral-900/10"
            >
              <Image
                src="/studio/studio-6.png"
                alt="El panel de DOGO transmitiendo en vivo desde el estudio"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-500 group-hover:scale-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-black/30" />

              {/* Badge de estado — En vivo / No en vivo según hora de Argentina */}
              <LiveBadge className="absolute left-4 top-4" />

              {/* Botón de play perfectamente centrado en el frame */}
              <span className="absolute inset-0 grid place-items-center">
                <span className="flex size-16 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/40 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:text-neutral-900">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-6" aria-hidden>
                    <path d="M6 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L7.54 4.3A1 1 0 0 0 6 5.14Z" />
                  </svg>
                </span>
              </span>

              <span className="absolute bottom-4 left-4 font-display text-sm font-semibold text-white drop-shadow">
                Lun a Vie · 10–12 h (ARG)
              </span>
            </a>
          </Reveal>

          {/* Texto compacto + tira de redes */}
          <Reveal from="right" delay={0.1} className="order-1 lg:order-2">
            <h2 className="font-display text-3xl font-bold leading-[1.05] tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Mirá la transmisión{" "}
              <span className="whitespace-nowrap">
                <span className="text-grape">en vivo</span>
                {/* Ecualizador decorativo: le pone sonido a la palabra */}
                <span
                  aria-hidden
                  className="ml-2.5 inline-flex items-end gap-[3px] sm:ml-3"
                >
                  {[14, 24, 10, 19].map((h, i) => (
                    <span
                      key={i}
                      className="w-[4px] origin-bottom rounded-full bg-gold motion-safe:animate-[eq_1.1s_ease-in-out_infinite]"
                      style={{ height: h, animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </span>
              </span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-500">
              Entrá al canal y sumate a la transmisión en directo desde San
              Nicolás de los Arroyos.
            </p>

            {/* Datos de sintonía, escaneables de un vistazo */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700">
                <Radio className="size-3.5 text-grape" strokeWidth={2} />
                FM 99.9
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700">
                <Clock className="size-3.5 text-grape" strokeWidth={2} />
                Lun a Vie · 10–12 h (ARG)
              </span>
            </div>

            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-grape px-7 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-grape-deep active:scale-[0.98]"
            >
              Ver el vivo ahora
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </a>

            {/* Tira de redes minimalista */}
            <div className="mt-8 flex items-center gap-3 border-t border-neutral-200 pt-6">
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                Seguinos
              </span>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
