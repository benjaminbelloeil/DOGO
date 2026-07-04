"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Reproductor flotante de la radio en vivo (La POP FM 99.9, San Nicolás).
 * Stream SHOUTcast público del sitio oficial de la emisora (lapop.com.ar).
 * Con Media Session el audio sigue sonando con la pantalla bloqueada o la
 * pestaña en segundo plano, y se controla desde la pantalla de bloqueo.
 */
const STREAM_URL = "https://https.nvradios.com/radio/9302/radio.mp3";

type Status = "idle" | "loading" | "playing" | "error";

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M6 5.14v13.72a1 1 0 0 0 1.54.84l10.3-6.86a1 1 0 0 0 0-1.68L7.54 4.3A1 1 0 0 0 6 5.14Z" />
    </svg>
  );
}

function PauseIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <rect x="6" y="5" width="4" height="14" rx="1.2" />
      <rect x="14" y="5" width="4" height="14" rx="1.2" />
    </svg>
  );
}

export function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [status, setStatus] = useState<Status>("idle");

  useEffect(() => {
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    // Soltamos el stream para no seguir descargando audio en pausa.
    audio.removeAttribute("src");
    audio.load();
    setStatus("idle");
  };

  const play = async () => {
    setStatus("loading");
    let audio = audioRef.current;
    if (!audio) {
      audio = new Audio();
      audio.preload = "none";
      audio.addEventListener("playing", () => setStatus("playing"));
      audio.addEventListener("error", () => setStatus("error"));
      audioRef.current = audio;
    }
    // Siempre re-asignamos el src: en un stream en vivo, retomar el buffer
    // viejo reproduciría audio atrasado.
    audio.src = STREAM_URL;

    try {
      await audio.play();

      if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: "FM 99.9 MHz · San Nicolás",
          artist: "DOGO Streaming — en vivo por La POP",
          artwork: [
            { src: "/brand/dogo-logo-color.png", sizes: "512x512", type: "image/png" },
          ],
        });
        navigator.mediaSession.setActionHandler("play", () => void play());
        navigator.mediaSession.setActionHandler("pause", stop);
        navigator.mediaSession.setActionHandler("stop", stop);
      }
    } catch {
      setStatus("error");
    }
  };

  const playing = status === "playing";
  const label =
    status === "playing"
      ? "Sonando ahora"
      : status === "loading"
        ? "Conectando…"
        : status === "error"
          ? "No disponible ahora"
          : "Radio en vivo";

  return (
    <div className="fixed bottom-4 right-4 z-50 sm:bottom-5 sm:right-5">
      <button
        type="button"
        onClick={() => (playing || status === "loading" ? stop() : void play())}
        aria-label={
          playing
            ? "Pausar la radio en vivo"
            : "Escuchar FM 99.9 San Nicolás en vivo"
        }
        className="group flex items-center gap-3 rounded-full bg-neutral-900/95 py-2 pl-2 pr-5 text-left text-white shadow-xl shadow-black/25 ring-1 ring-white/15 backdrop-blur transition-all duration-300 hover:bg-neutral-900 active:scale-95"
      >
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gold text-ink transition-colors group-hover:bg-gold-deep">
          {status === "loading" ? (
            <span
              className="size-4 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
              aria-hidden
            />
          ) : playing ? (
            <PauseIcon className="size-4" />
          ) : (
            <PlayIcon className="size-4" />
          )}
        </span>

        <span className="flex flex-col leading-tight">
          <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/60">
            {label}
          </span>
          <span className="flex items-center gap-2 font-display text-sm font-semibold">
            FM 99.9 MHz · San Nicolás
            {playing && (
              <span aria-hidden className="inline-flex items-end gap-[2.5px]">
                {[10, 15, 7, 12].map((h, i) => (
                  <span
                    key={i}
                    className="w-[3px] origin-bottom rounded-full bg-gold motion-safe:animate-[eq_1.1s_ease-in-out_infinite]"
                    style={{ height: h, animationDelay: `${i * 0.16}s` }}
                  />
                ))}
              </span>
            )}
          </span>
        </span>
      </button>
    </div>
  );
}
