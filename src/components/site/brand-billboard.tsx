"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";

/* El placeholder rota entre rubros de la ciudad: invita a imaginarse. */
const EJEMPLOS = [
  "TU MARCA",
  "TU PIZZERÍA",
  "TU GIMNASIO",
  "TU CAFETERÍA",
  "TU CONCESIONARIA",
  "TU FERRETERÍA",
];

/**
 * El afiche de la pauta, con la misma estructura que el hero de /estudio
 * ("Grabá donde graba la radio"): panel blanco partido. A la izquierda, en
 * lugar de una foto, el espacio publicitario gigante — y cuando escribís tu
 * marca, el cartel se vende: el nombre empapela el fondo como pared de
 * pósters, el borde punteado pasa a dorado y cae el sello "AL AIRE".
 */
export function BrandBillboard({ ctaHref }: { ctaHref: string }) {
  const [brand, setBrand] = useState("");
  const reduce = useReducedMotion();
  const name = brand.trim();

  // El placeholder cambia de rubro cada un par de segundos, solo mientras
  // el cartel sigue vacío.
  const [ejemplo, setEjemplo] = useState(0);
  useEffect(() => {
    if (name) return;
    const id = setInterval(() => setEjemplo((e) => (e + 1) % EJEMPLOS.length), 2200);
    return () => clearInterval(id);
  }, [name]);

  return (
    <div className="grid overflow-hidden rounded-[2rem] border border-neutral-200 bg-white md:grid-cols-2">
      {/* ── El espacio publicitario, a escala póster ──────────────────────── */}
      <div className="p-5 sm:p-6 md:min-h-[28rem]">
        <div
          className={`group relative flex h-full flex-col items-center justify-center rounded-[1.5rem] border-2 px-6 py-14 text-center transition-colors duration-500 sm:px-8 ${
            name
              ? "border-solid border-gold bg-white"
              : "border-dashed border-neutral-300 bg-neutral-50/80 focus-within:border-gold hover:border-gold/60"
          }`}
        >
          {/* El empapelado: tu marca repetida, como pared de pósters */}
          <div
            aria-hidden
            className={`pointer-events-none absolute inset-0 overflow-hidden rounded-[1.4rem] transition-opacity duration-700 ${
              name ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute -inset-12 flex -rotate-6 flex-col items-center justify-center">
              {Array.from({ length: 7 }, (_, row) => (
                <p
                  key={row}
                  className="whitespace-nowrap font-display text-4xl font-bold uppercase leading-[1.55] tracking-tight text-gold/[0.13]"
                >
                  {name ? `${name} · `.repeat(14) : ""}
                </p>
              ))}
            </div>
          </div>

          {/* El sello: cae cuando el espacio se vendió */}
          <AnimatePresence>
            {name && (
              <motion.span
                key="sello"
                initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 2.4, rotate: 14 }}
                animate={{ opacity: 1, scale: 1, rotate: -8 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={
                  reduce
                    ? { duration: 0.2 }
                    : { type: "spring", stiffness: 320, damping: 19 }
                }
                className="absolute right-5 top-5 rounded-lg border-[3px] border-gold-deep px-3 py-1 font-display text-sm font-bold uppercase tracking-[0.18em] text-gold-deep"
              >
                Al aire
              </motion.span>
            )}
          </AnimatePresence>

          <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-gold px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-transform duration-300 group-focus-within:rotate-0 group-hover:rotate-0">
            Espacio publicitario
          </span>

          <label htmlFor="marca" className="sr-only">
            Escribí el nombre de tu marca
          </label>
          <input
            id="marca"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            placeholder={EJEMPLOS[ejemplo]}
            maxLength={18}
            autoComplete="off"
            spellCheck={false}
            className="relative z-10 w-full bg-transparent text-center font-display text-4xl font-bold uppercase tracking-tight text-neutral-900 caret-gold-deep outline-none placeholder:text-neutral-300 sm:text-5xl lg:text-6xl"
          />

          {/* La lectura: tu marca ya suena — con ecualizador incluido */}
          <p
            className="relative z-10 mt-5 flex items-center justify-center gap-2.5 text-sm text-neutral-500"
            aria-live="polite"
          >
            {name ? (
              <>
                <span aria-hidden className="inline-flex items-end gap-[3px]">
                  {[10, 16, 7, 13].map((h, i) => (
                    <span
                      key={i}
                      className="w-[3px] origin-bottom rounded-full bg-gold motion-safe:animate-[eq_1.1s_ease-in-out_infinite]"
                      style={{ height: h, animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </span>
                «{name}» suena bien en la 99.9.
              </>
            ) : (
              "Escribí el nombre de tu marca y mirala en su espacio."
            )}
          </p>
        </div>
      </div>

      {/* ── La presentación ───────────────────────────────────────────────── */}
      <div className="flex flex-col justify-center p-7 pt-2 sm:p-10 md:pt-10 lg:p-14">
        <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-gold-deep">
          Anunciá con DOGO
        </p>
        <h1 className="mt-3 font-display text-4xl font-bold leading-[0.98] tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl">
          Poné tu marca a sonar en San Nicolás
        </h1>
        <p className="mt-5 text-sm leading-relaxed text-neutral-500 sm:text-base">
          Todas las mañanas la ciudad prende DOGO: FM 99.9, streaming en vivo
          y redes. En el medio de todo eso hay un espacio que puede ser tuyo.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {["Menciones en vivo", "Spots en la tanda", "Contenido en redes"].map((chip) => (
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
            href={ctaHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-gold px-6 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-gold-deep hover:shadow-lg hover:shadow-gold/30 active:scale-[0.98]"
          >
            <Image
              src="/icons/whatsapp.png"
              alt=""
              width={40}
              height={40}
              className="size-4.5"
            />
            Pedir propuesta
            <ArrowUpRight
              className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={2.5}
            />
          </a>
          <a
            href="#formatos"
            className="inline-flex h-12 items-center justify-center rounded-full border border-neutral-300 bg-white px-6 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-[0.98]"
          >
            Ver los formatos
          </a>
        </div>
      </div>
    </div>
  );
}
