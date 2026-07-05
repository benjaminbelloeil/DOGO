"use client";

import { useEffect, useState } from "react";

import StickerPeel from "@/components/ui/sticker-peel";

type Placement = {
  width: number;
  x: number;
  y: number;
};

type Sticker = {
  src: string;
  rotate: number;
  /** Posición y tamaño para la columna de escritorio (~560 px). */
  desktop: Placement;
  /** Posición y tamaño para la tarjeta angosta del teléfono (~340 px). */
  mobile: Placement;
  peelHover?: number;
  peelActive?: number;
};

const shows: Sticker[] = [
  // Columna central
  {
    src: "/brand/dogo-logo-color.png",
    rotate: -3,
    desktop: { width: 185, x: 203, y: 22 },
    mobile: { width: 132, x: 104, y: 18 },
  },
  {
    src: "/shows/instagram.png",
    rotate: 8,
    desktop: { width: 80, x: 295, y: 120 },
    mobile: { width: 58, x: 36, y: 120 },
  },
  {
    src: "/shows/youtube.png",
    rotate: -7,
    desktop: { width: 92, x: 291, y: 298 },
    mobile: { width: 72, x: 140, y: 315 },
  },
  // Columna izquierda
  {
    src: "/shows/ya-lo-sabia.png",
    rotate: -6,
    desktop: { width: 135, x: 79, y: 112 },
    mobile: { width: 108, x: 112, y: 140 },
  },
  {
    src: "/shows/argentina.png",
    rotate: -9,
    desktop: { width: 135, x: 79, y: 290 },
    mobile: { width: 100, x: 28, y: 275 },
  },
  // Columna derecha
  {
    src: "/shows/hoja-de-ruta.png",
    rotate: 6,
    desktop: { width: 108, x: 405, y: 70 },
    mobile: { width: 88, x: 238, y: 115 },
  },
  {
    src: "/shows/mate.png",
    rotate: 10,
    desktop: { width: 130, x: 403, y: 278 },
    mobile: { width: 92, x: 236, y: 268 },
    // The mate is a tall die-cut shape with a sparse top edge, so it needs a
    // larger peel than the rectangular posters for the effect to read.
    peelHover: 22,
    peelActive: 38,
  },
];

type ShowsStickersProps = {
  boundsSelector?: string;
};

/**
 * The DOGO shows and brand marks shown as draggable, peelable stickers (React
 * Bits StickerPeel). Las posiciones son en píxeles absolutos, así que cada
 * breakpoint tiene su propio arreglo: el de escritorio no entra en el ancho
 * del teléfono.
 */
export function ShowsStickers({ boundsSelector }: ShowsStickersProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div className="relative z-20 min-h-[28rem] overflow-visible sm:min-h-[30rem]">
      {/* Trama de puntos tipo corcho: ancla los stickers sin encerrarlos en
          una tarjeta. Se desvanece hacia los bordes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2 bg-[radial-gradient(#d4d4d4_1.2px,transparent_1.2px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_90%)]"
      />

      {shows.map((s) => {
        const placement = isMobile ? s.mobile : s.desktop;
        return (
          <StickerPeel
            // La posición inicial se aplica al montar: al cambiar de
            // breakpoint se remonta el sticker con el arreglo que toca.
            key={`${s.src}-${isMobile ? "m" : "d"}`}
            imageSrc={s.src}
            width={placement.width}
            rotate={s.rotate}
            initialPosition={{ x: placement.x, y: placement.y }}
            peelBackHoverPct={s.peelHover ?? 10}
            peelBackActivePct={s.peelActive ?? 18}
            shadowIntensity={0.2}
            lightingIntensity={0.12}
            dragBounds={boundsSelector}
          />
        );
      })}

      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-neutral-400">
        Arrastrá y despegá las stickers ✦
      </span>
    </div>
  );
}
