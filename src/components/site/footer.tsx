"use client";

import Image from "next/image";
import { Container } from "./primitives";
import { Reveal } from "./reveal";

const columns = [
  {
    title: "Producto",
    links: ["Funciones", "Precios", "Integraciones", "Novedades"],
  },
  {
    title: "Empresa",
    links: ["Nosotros", "Empleos", "Blog", "Contacto"],
  },
  {
    title: "Recursos",
    links: ["Centro de ayuda", "Comunidad", "Guías", "Documentación de API"],
  },
];

function FooterLogo() {
  return (
    <div className="flex flex-col items-start gap-1.5">
      <Image
        src="/brand/dogo-wordmark-white.png"
        alt="DOGO Streaming"
        width={1136}
        height={244}
        className="h-8 w-auto"
      />
      <span className="pl-0.5 text-[11px] font-semibold tracking-[0.42em] text-neutral-500">
        STREAMING
      </span>
    </div>
  );
}

const socials = [
  {
    label: "X",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.65l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231 5.45-6.231Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z",
  },
  {
    label: "Instagram",
    path: "M12 2.2c3.2 0 3.6 0 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.21 15.58 2.2 15.2 2.2 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.21 8.8 2.2 12 2.2Zm0 1.8c-3.14 0-3.51.01-4.75.07-.9.04-1.39.19-1.71.32-.43.17-.74.37-1.06.69-.32.32-.52.63-.69 1.06-.13.32-.28.81-.32 1.71-.06 1.24-.07 1.61-.07 4.75s.01 3.51.07 4.75c.04.9.19 1.39.32 1.71.17.43.37.74.69 1.06.32.32.63.52 1.06.69.32.13.81.28 1.71.32 1.24.06 1.61.07 4.75.07s3.51-.01 4.75-.07c.9-.04 1.39-.19 1.71-.32.43-.17.74-.37 1.06-.69.32-.32.52-.63.69-1.06.13-.32.28-.81.32-1.71.06-1.24.07-1.61.07-4.75s-.01-3.51-.07-4.75c-.04-.9-.19-1.39-.32-1.71a2.85 2.85 0 0 0-.69-1.06 2.85 2.85 0 0 0-1.06-.69c-.32-.13-.81-.28-1.71-.32C15.51 4.01 15.14 4 12 4Zm0 3.06A4.94 4.94 0 1 1 12 16.94 4.94 4.94 0 0 1 12 7.06Zm0 1.8a3.14 3.14 0 1 0 0 6.28 3.14 3.14 0 0 0 0-6.28Zm5.14-.62a1.15 1.15 0 1 1-2.3 0 1.15 1.15 0 0 1 2.3 0Z",
  },
  {
    label: "YouTube",
    path: "M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.5C0 8.38 0 12 0 12s0 3.62.5 5.5a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.62 24 12 24 12s0-3.62-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z",
  },
];

export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <Container className="py-16">
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div className="max-w-xs">
              <FooterLogo />
              <p className="mt-4 text-sm leading-relaxed text-neutral-500">
                Transmití en todos lados a la vez. Conectá con tu audiencia en
                tiempo real y hacé crecer una comunidad que no deja de mirar.
              </p>

              <form
                className="mt-6 flex max-w-sm items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1 pl-4"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Ingresá tu email"
                  className="h-8 flex-1 bg-transparent text-sm text-white placeholder:text-neutral-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex h-8 items-center rounded-full bg-white px-4 text-sm font-medium text-neutral-900 transition-transform active:scale-95"
                >
                  Suscribirte
                </button>
              </form>
            </div>

            {columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-sm font-semibold text-white">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-3 text-sm">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-neutral-400 transition-colors hover:text-white"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} DOGO Streaming. Todos los derechos
              reservados.
            </p>

            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition-colors hover:bg-white hover:text-neutral-900"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                    <path d={s.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </footer>
  );
}
