"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

/** Debe calzar con la duración `transition-opacity` que usan los iframes. */
export const VIDEO_PREVIEW_FADE_MS = 500;
// El iframe dispara onLoad cuando carga el documento embebido, mucho antes
// de que YouTube empiece a pintar frames reales (de por medio hay negro,
// buffer, o el propio frame pausado del reproductor con su ícono de play
// nativo mientras busca el segundo de arranque). Medido con el `start`
// que usa este hook (~10 min adentro del video): recién pinta contenido
// real reproduciéndose entre 4 y 6 segundos después del load. Un colchón
// corto revela el iframe mientras todavía muestra ese cuadro pausado —
// exactamente el bug reportado ("el video pausado de YouTube" en vez del
// preview). Este valor le da margen de sobra antes de empezar el fundido.
export const REVEAL_BUFFER_MS = 4000;

/**
 * Maneja el timing de un preview de YouTube en hover: entra suave (con
 * colchón para que el video ya esté reproduciendo antes del fundido) y sale
 * suave (el iframe se queda montado hasta que termina de desvanecerse, en vez
 * de desaparecer de un corte).
 */
export function useVideoPreview(
  videoId: string | null | undefined,
  startSeconds = 600,
) {
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [ready, setReady] = useState(false);
  const unmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const revealTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (unmountTimer.current) clearTimeout(unmountTimer.current);
    if (revealTimer.current) clearTimeout(revealTimer.current);
  };

  useEffect(() => clearTimers, []);

  const onMouseEnter = () => {
    if (reduce || !videoId) return;
    clearTimers();
    setMounted(true);
  };

  const onMouseLeave = () => {
    clearTimers();
    setReady(false);
    // El iframe se desmonta recién cuando termina de desvanecerse: así la
    // salida es un fundido, no un corte instantáneo.
    unmountTimer.current = setTimeout(
      () => setMounted(false),
      VIDEO_PREVIEW_FADE_MS,
    );
  };

  const onIframeLoad = () => {
    revealTimer.current = setTimeout(() => setReady(true), REVEAL_BUFFER_MS);
  };

  const active = mounted && !!videoId;
  const src = active
    ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&mute=1&controls=0&start=${startSeconds}&playsinline=1&rel=0&iv_load_policy=3`
    : null;

  return { active, ready, src, onMouseEnter, onMouseLeave, onIframeLoad };
}
