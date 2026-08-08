"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/* El placeholder rota entre formatos: invita a imaginarse grabando. */
const EJEMPLOS = ["TU PODCAST", "TU PROGRAMA", "TU ENTREVISTA", "TU VIVO", "TU MARCA"];

/**
 * El mismo cartel que `brand-billboard.tsx`, calcado — misma estructura,
 * mismo blanco de base, mismos efectos — solo que en violeta en vez de
 * dorado, y pensado para el nombre de un programa en vez de una marca.
 */
export function StudioBillboard() {
  const [raw, setRaw] = useState("");
  const reduce = useReducedMotion();
  const name = raw.trim();

  const [ejemplo, setEjemplo] = useState(0);
  useEffect(() => {
    if (name) return;
    const id = setInterval(() => setEjemplo((e) => (e + 1) % EJEMPLOS.length), 2200);
    return () => clearInterval(id);
  }, [name]);

  return (
    <div className="h-full p-5 sm:p-6">
      <div
        className={`group relative flex h-full flex-col items-center justify-center rounded-[1.5rem] border-2 px-6 py-14 text-center transition-colors duration-500 sm:px-8 ${
          name
            ? "border-solid border-grape bg-white"
            : "border-dashed border-neutral-300 bg-neutral-50/80 hover:border-grape/60 focus-within:border-grape"
        }`}
      >
        {/* El empapelado: tu programa repetido, como pared de pósters */}
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
                className="whitespace-nowrap font-display text-4xl font-bold uppercase leading-[1.55] tracking-tight text-grape/[0.13]"
              >
                {name ? `${name} · `.repeat(14) : ""}
              </p>
            ))}
          </div>
        </div>

        {/* El sello: cae cuando el estudio "se ocupa" */}
        <AnimatePresence>
          {name && (
            <motion.span
              key="sello"
              initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 2.4, rotate: 14 }}
              animate={{ opacity: 1, scale: 1, rotate: -8 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={
                reduce ? { duration: 0.2 } : { type: "spring", stiffness: 320, damping: 19 }
              }
              className="absolute right-5 top-5 rounded-lg border-[3px] border-grape-deep px-3 py-1 font-display text-sm font-bold uppercase tracking-[0.18em] text-grape-deep"
            >
              Al aire
            </motion.span>
          )}
        </AnimatePresence>

        <span className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 -rotate-2 whitespace-nowrap rounded-full bg-grape px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-transform duration-300 group-focus-within:rotate-0 group-hover:rotate-0">
          Se alquila
        </span>

        <label htmlFor="programa" className="sr-only">
          Escribí el nombre de tu programa
        </label>
        <input
          id="programa"
          type="text"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          placeholder={EJEMPLOS[ejemplo]}
          maxLength={18}
          autoComplete="off"
          spellCheck={false}
          className="relative z-10 w-full bg-transparent text-center font-display text-4xl font-bold uppercase tracking-tight text-neutral-900 caret-grape-deep outline-none placeholder:text-neutral-300 sm:text-5xl lg:text-6xl"
        />

        {/* La lectura: tu programa ya suena — con ecualizador incluido */}
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
                    className="w-[3px] origin-bottom rounded-full bg-grape motion-safe:animate-[eq_1.1s_ease-in-out_infinite]"
                    style={{ height: h, animationDelay: `${i * 0.16}s` }}
                  />
                ))}
              </span>
              «{name}» ya está al aire.
            </>
          ) : (
            "Escribí el nombre de tu programa y mirátelo en el estudio."
          )}
        </p>
      </div>
    </div>
  );
}
