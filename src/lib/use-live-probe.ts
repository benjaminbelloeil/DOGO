"use client";

import { useEffect, useState } from "react";

/**
 * Detección del vivo desde el navegador del visitante, para cuando el
 * servidor no pudo confirmarlo (YouTube suele servir paredes anti-bot a las
 * IPs de datacenter de Vercel, así que el scraping de `/live` falla en
 * producción aunque ande perfecto en local).
 *
 * Cómo funciona: se monta oculto el embed `live_stream` del canal — el player
 * de YouTube resuelve solo cuál es la transmisión al aire — con `enablejsapi`
 * y se escuchan sus mensajes (`infoDelivery`). Recién cuando el player REALIZA
 * la reproducción (playerState 1/3 o `isLive: true`) damos el vivo por
 * confirmado: un stream programado que todavía no empezó nunca llega a
 * reproducir, así que no hay falsos positivos con premieres/programados.
 *
 * Si en ~15 s no hay veredicto (no hay vivo, o el navegador bloqueó el
 * autoplay muteado), el probe se desmonta y la página queda como estaba.
 */
export function useLiveProbe(channelId: string | null) {
  const [liveVideoId, setLiveVideoId] = useState<string | null>(null);

  useEffect(() => {
    if (!channelId) return;

    // El id que reporta el player antes de resolver es el literal
    // "live_stream" (que también tiene 11 caracteres — no alcanza el regex).
    let videoId: string | null = null;
    const iframe = document.createElement("iframe");

    const finish = () => {
      // `timer` ya está inicializado: el primer mensaje puede llegar recién
      // después de que el cuerpo del efecto corrió entero.
      clearTimeout(timer);
      window.removeEventListener("message", onMessage);
      iframe.remove();
    };

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== "https://www.youtube.com") return;
      if (event.source !== iframe.contentWindow) return;
      if (typeof event.data !== "string") return;

      let info:
        | {
            playerState?: number;
            videoData?: {
              video_id?: string;
              errorCode?: string | null;
              isLive?: boolean;
            };
          }
        | undefined;
      try {
        info = JSON.parse(event.data)?.info;
      } catch {
        return;
      }
      if (!info) return;

      const data = info.videoData;
      if (
        data?.video_id &&
        data.video_id !== "live_stream" &&
        /^[\w-]{11}$/.test(data.video_id) &&
        data.errorCode == null
      ) {
        videoId = data.video_id;
      }

      // 1 = reproduciendo, 3 = buffereando: el vivo arrancó de verdad.
      const playing =
        info.playerState === 1 ||
        info.playerState === 3 ||
        data?.isLive === true;

      if (playing && videoId) {
        setLiveVideoId(videoId);
        finish();
      }
    };

    window.addEventListener("message", onMessage);

    iframe.src = `https://www.youtube.com/embed/live_stream?channel=${channelId}&enablejsapi=1&autoplay=1&mute=1&playsinline=1&origin=${encodeURIComponent(window.location.origin)}`;
    iframe.title = "";
    iframe.setAttribute("aria-hidden", "true");
    iframe.tabIndex = -1;
    iframe.allow = "autoplay; encrypted-media";
    // Fuera de pantalla (no display:none, que puede frenar la reproducción).
    iframe.style.cssText =
      "position:fixed;left:-9999px;width:2px;height:2px;opacity:0;pointer-events:none";
    iframe.onload = () => {
      // Handshake del IFrame API: sin esto el player no manda infoDelivery.
      iframe.contentWindow?.postMessage(
        JSON.stringify({ event: "listening", id: "dogo-live-probe", channel: "widget" }),
        "*",
      );
    };
    document.body.appendChild(iframe);

    const timer = setTimeout(finish, 15_000);
    return finish;
  }, [channelId]);

  return liveVideoId;
}
