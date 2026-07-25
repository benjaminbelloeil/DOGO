"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

/* Las fotos del estudio, enteras: cada slide respeta el 3:2 original. */
const fotos = [
  {
    src: "/studio/studio-1.png",
    alt: "Dos conductores en la mesa del estudio de DOGO",
  },
  {
    src: "/studio/studio-5.png",
    alt: "Una invitada al micrófono frente al logo de DOGO Streaming",
  },
  {
    src: "/studio/studio-2.png",
    alt: "Micrófono de mano de DOGO Streaming en primer plano",
  },
  {
    src: "/studio/studio-3.png",
    alt: "Un invitado sonriendo al micrófono Shure del estudio",
  },
];

const TOTAL = fotos.length + 1; // + la tarjeta "Se alquila"

/**
 * La galería del estudio como carrusel editorial: fotos SIN recortar (cada
 * slide es 3:2, la proporción original), con snap al centro y la siguiente
 * asomando al costado. Cierra con el cartel de vidriera "Se alquila".
 *
 * Navegación: flechas, puntos (salto directo), arrastre con el mouse en
 * desktop (además del swipe táctil nativo) y flechas del teclado.
 */
export function StudioGallery({ bookUrl }: { bookUrl: string }) {
  const scroller = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  // El destino de las flechas/puntos se acumula acá: así los clicks rápidos
  // avanzan varios slides aunque la animación todavía esté en camino. Se
  // resincroniza con la posición real al empezar a arrastrar y cuando el
  // scroll se asienta, para que nunca quede desalineado de lo que se ve.
  const target = useRef(0);
  const raf = useRef(0);
  const settleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const drag = useRef<{ startX: number; startScroll: number; moved: boolean } | null>(null);

  useEffect(
    () => () => {
      cancelAnimationFrame(raf.current);
      clearTimeout(settleTimer.current);
    },
    [],
  );

  /**
   * El slide realmente centrado en el visor ahora mismo, midiendo posiciones
   * reales (no asumiendo un ancho uniforme) — así nunca se desalinea del
   * número o el punto activo, sea cual sea el breakpoint o cómo se llegó ahí
   * (flecha, arrastre, swipe o momentum del scroll nativo).
   */
  const closestIndex = (el: HTMLDivElement) => {
    const mid = el.getBoundingClientRect().left + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const r = (child as HTMLElement).getBoundingClientRect();
      const dist = Math.abs(r.left + r.width / 2 - mid);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    return best;
  };

  /**
   * Scroll animado a mano (rAF): con `snap-mandatory`, Chrome cancela los
   * scrollTo/scrollIntoView suaves — así que la animación la manejamos
   * nosotros, suspendiendo el snap mientras dura.
   */
  const animateTo = (i: number) => {
    const el = scroller.current;
    const slide = el?.children[i] as HTMLElement | undefined;
    if (!el || !slide) return;
    const left = slide.offsetLeft - (el.clientWidth - slide.clientWidth) / 2;
    cancelAnimationFrame(raf.current);
    const max = el.scrollWidth - el.clientWidth;
    const to = Math.max(0, Math.min(max, left));
    if (reduce) {
      el.scrollLeft = to;
      setIndex(i);
      return;
    }
    el.style.scrollSnapType = "none";
    const from = el.scrollLeft;
    const t0 = performance.now();
    const D = 420;
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / D);
      el.scrollLeft = from + (to - from) * easeOut(p);
      setIndex(closestIndex(el));
      if (p < 1) {
        raf.current = requestAnimationFrame(step);
      } else {
        el.style.scrollSnapType = "";
      }
    };
    raf.current = requestAnimationFrame(step);
  };

  const goToIndex = (i: number) => {
    target.current = Math.max(0, Math.min(TOTAL - 1, i));
    animateTo(target.current);
  };

  const goBy = (dir: 1 | -1) => goToIndex(target.current + dir);

  // Al soltar (drag, swipe o inercia) el destino de las flechas se
  // realinea con lo que quedó realmente centrado.
  const settle = () => {
    const el = scroller.current;
    if (!el) return;
    const i = closestIndex(el);
    target.current = i;
    setIndex(i);
  };

  const onScroll = () => {
    const el = scroller.current;
    if (!el) return;
    setIndex(closestIndex(el));
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(settle, 120);
  };

  // Arrastre con mouse en desktop (el swipe táctil ya anda nativo).
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = scroller.current;
    if (!el) return;
    cancelAnimationFrame(raf.current);
    el.style.scrollSnapType = "none";
    drag.current = { startX: e.clientX, startScroll: el.scrollLeft, moved: false };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    const el = scroller.current;
    if (!el) return;
    const dx = e.clientX - drag.current.startX;
    // Umbral chico: distingue un clic quieto de un arrastre real.
    if (Math.abs(dx) > 3) drag.current.moved = true;
    el.scrollLeft = drag.current.startScroll - dx;
  };

  const endDrag = () => {
    if (!drag.current) return;
    const { moved } = drag.current;
    drag.current = null;
    const el = scroller.current;
    if (!el) return;
    el.style.scrollSnapType = "";
    // Un clic quieto (sin arrastre) no movió nada: no hay nada que reencajar,
    // y forzarlo podría pisar una navegación por flecha/teclado hecha en el
    // mismo instante.
    if (!moved) return;
    requestAnimationFrame(() => goToIndex(closestIndex(el)));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goBy(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goBy(-1);
    }
  };

  return (
    <div>
      {/* Controles: flechas + contador, en la esquina editorial */}
      <div className="mb-5 flex items-center justify-between">
        <p className="font-mono text-sm text-neutral-400">
          {String(index + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => goBy(-1)}
            disabled={index === 0}
            aria-label="Foto anterior"
            className="flex size-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowLeft className="size-4.5" strokeWidth={2} />
          </button>
          <button
            type="button"
            onClick={() => goBy(1)}
            disabled={index === TOTAL - 1}
            aria-label="Foto siguiente"
            className="flex size-11 items-center justify-center rounded-full border border-neutral-300 bg-white text-neutral-900 transition-all duration-300 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white disabled:pointer-events-none disabled:opacity-30"
          >
            <ArrowRight className="size-4.5" strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* El carrusel: scroll nativo con snap, la próxima foto asoma. Se
          arrastra con el mouse (cursor de mano) además del swipe táctil. */}
      <div
        ref={scroller}
        onScroll={onScroll}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onTouchStart={settle}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-label="Fotos del estudio de DOGO"
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-grape/50 [&::-webkit-scrollbar]:hidden active:cursor-grabbing sm:cursor-grab"
      >
        {fotos.map((foto) => (
          <div
            key={foto.src}
            className="relative aspect-[3/2] w-[86%] shrink-0 snap-center overflow-hidden rounded-[1.75rem] bg-neutral-200 sm:w-[70%] lg:w-[58%]"
          >
            <Image
              src={foto.src}
              alt={foto.alt}
              fill
              draggable={false}
              sizes="(max-width: 640px) 86vw, (max-width: 1024px) 70vw, 58vw"
              className="pointer-events-none object-cover"
            />
          </div>
        ))}

        {/* El cierre de la vidriera: el cartel, como última foto */}
        <div className="relative aspect-[3/2] w-[86%] shrink-0 snap-center overflow-hidden rounded-[1.75rem] sm:w-[70%] lg:w-[58%]">
          <a
            href={bookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex size-full flex-col items-center justify-center gap-3 bg-gold text-center transition-colors duration-300 hover:bg-gold-deep"
          >
            <span className="-rotate-3 font-display text-5xl font-bold uppercase tracking-tight text-ink transition-transform duration-300 group-hover:rotate-0 sm:text-6xl">
              Se alquila
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-[0.14em] text-ink/70">
              Consultar por WhatsApp
              <ArrowUpRight className="size-4" strokeWidth={2.5} />
            </span>
          </a>
        </div>
      </div>

      {/* Puntos: salto directo a cualquier foto, de un vistazo */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {Array.from({ length: TOTAL }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToIndex(i)}
            aria-label={`Ir a la foto ${i + 1} de ${TOTAL}`}
            aria-current={i === index}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-6 bg-neutral-900" : "w-1.5 bg-neutral-300 hover:bg-neutral-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
