"use client";

import StickerPeel from "@/components/ui/sticker-peel";

type Sticker = {
  src: string;
  width: number;
  rotate: number;
  initialPosition: { x: number; y: number };
  peelHover?: number;
  peelActive?: number;
};

const shows: Sticker[] = [
  // Center column
  {
    src: "/brand/dogo-logo-color.png",
    width: 185,
    rotate: -3,
    initialPosition: { x: 158, y: 22 },
  },
  {
    src: "/shows/instagram.png",
    width: 80,
    rotate: 8,
    initialPosition: { x: 250, y: 120 },
  },
  {
    src: "/shows/youtube.png",
    width: 92,
    rotate: -7,
    initialPosition: { x: 246, y: 298 },
  },
  // Left column
  {
    src: "/shows/ya-lo-sabia.png",
    width: 135,
    rotate: -6,
    initialPosition: { x: 34, y: 112 },
  },
  {
    src: "/shows/argentina.png",
    width: 135,
    rotate: -9,
    initialPosition: { x: 34, y: 290 },
  },
  // Right column
  {
    src: "/shows/hoja-de-ruta.png",
    width: 108,
    rotate: 6,
    initialPosition: { x: 360, y: 70 },
  },
  {
    src: "/shows/mate.png",
    width: 130,
    rotate: 10,
    initialPosition: { x: 358, y: 278 },
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
 * Bits StickerPeel).
 */
export function ShowsStickers({ boundsSelector }: ShowsStickersProps) {
  return (
    <div className="relative z-20 min-h-[30rem] overflow-visible">
      {/* Trama de puntos tipo corcho: ancla los stickers sin encerrarlos en
          una tarjeta. Se desvanece hacia los bordes. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-2 bg-[radial-gradient(#d4d4d4_1.2px,transparent_1.2px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_90%)]"
      />

      {shows.map((s) => (
        <StickerPeel
          key={s.src}
          imageSrc={s.src}
          width={s.width}
          rotate={s.rotate}
          initialPosition={s.initialPosition}
          peelBackHoverPct={s.peelHover ?? 10}
          peelBackActivePct={s.peelActive ?? 18}
          shadowIntensity={0.2}
          lightingIntensity={0.12}
          dragBounds={boundsSelector}
        />
      ))}

      <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-neutral-400">
        Arrastrá y despegá las stickers ✦
      </span>
    </div>
  );
}
