import type { Metadata } from "next";
import Link from "next/link";

import { Container, Logo } from "@/components/site/primitives";

export const metadata: Metadata = {
  title: "Página no encontrada — DOGO Streaming",
};

/** 404 en clave radio: la frecuencia que buscás no existe. */
export default function NotFound() {
  return (
    <div className="relative flex min-h-svh flex-col overflow-hidden bg-neutral-100 font-sans text-neutral-900">
      <header className="relative z-10">
        <Container className="flex h-16 items-center">
          <Link href="/" aria-label="Ir al inicio de DOGO Streaming">
            <Logo />
          </Link>
        </Container>
      </header>

      {/* El 404 gigante de afiche detrás del contenido, como las palabras de
          fondo de los paneles de programas. */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-6 select-none whitespace-nowrap font-display text-[38vw] font-bold tracking-tight text-grape/[0.06] sm:text-[30vw]"
      >
        404
      </span>

      <main className="relative z-10 flex flex-1 items-center">
        <Container className="flex flex-col items-center pb-24 text-center">
          <span className="flex items-center gap-2 font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-grape">
            <span className="size-1.5 rounded-[1px] bg-gold" />
            Error 404
          </span>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.02] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
            Esta frecuencia <span className="text-grape">no existe</span>
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-neutral-500">
            La página que buscás no está al aire: puede que el link esté mal
            escrito o que la hayamos movido. Volvé al inicio y seguí
            sintonizando DOGO.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-full bg-grape px-7 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-grape-deep active:scale-[0.98]"
            >
              Volver al inicio
            </Link>
            <Link
              href="/#en-vivo"
              className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 bg-white px-7 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-[0.98]"
            >
              Escuchar en vivo
            </Link>
          </div>
        </Container>
      </main>
    </div>
  );
}
