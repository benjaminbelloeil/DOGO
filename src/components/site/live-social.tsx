import { ArrowUpRight, Clock, Radio } from "lucide-react";

import { Container, SectionIntro, SectionTitle } from "./primitives";
import { LiveFrame } from "./live-frame";
import { Reveal } from "./reveal";
import { getLiveVideoId, getRecentStreams } from "@/lib/youtube";

// TODO: reemplazar por las URLs reales de DOGO.
const LIVE_URL = "https://www.youtube.com/@dogostreaming/live";

const socials = [
  {
    label: "YouTube",
    href: "https://www.youtube.com/@dogostreaming",
    path: "M23.5 6.5a3.02 3.02 0 0 0-2.12-2.14C19.5 3.86 12 3.86 12 3.86s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.5C0 8.38 0 12 0 12s0 3.62.5 5.5a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.62 24 12 24 12s0-3.62-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/dogostreaming",
    path: "M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.4218-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@dogo.streaming",
    path: "M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z",
  },
  {
    label: "Twitch",
    href: "https://www.twitch.tv/dogostreaming",
    path: "M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z",
  },
];

export async function LiveSocial() {
  // Si el canal está al aire, el frame muestra la transmisión real (muteada);
  // si no, la miniatura del último stream subido. Vivo revalidado cada 5
  // minutos; el último stream, cada hora.
  const [liveVideoId, [latest]] = await Promise.all([
    getLiveVideoId(),
    getRecentStreams(1),
  ]);

  const frameUrl = liveVideoId ? LIVE_URL : (latest?.url ?? LIVE_URL);

  return (
    <section id="en-vivo" className="py-20 sm:py-28">
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[1.5fr_1fr] lg:gap-16">
          {/* Ancla visual: el vivo como una pantalla enmarcada */}
          <Reveal from="left" className="order-2 lg:order-1">
            <LiveFrame
              liveVideoId={liveVideoId}
              latestUrl={latest?.url}
              latestTitle={latest?.title}
              latestStill={latest?.stills[0]}
              frameUrl={frameUrl}
            />
          </Reveal>

          {/* Texto compacto + tira de redes */}
          <Reveal from="right" delay={0.1} className="order-1 lg:order-2">
            <SectionTitle>
              Mirá la transmisión{" "}
              <span className="whitespace-nowrap">
                <span className="text-grape">en vivo</span>
                {/* Ecualizador decorativo: le pone sonido a la palabra */}
                <span
                  aria-hidden
                  className="ml-2.5 inline-flex items-end gap-[3px] sm:ml-3"
                >
                  {[14, 24, 10, 19].map((h, i) => (
                    <span
                      key={i}
                      className="w-[4px] origin-bottom rounded-full bg-gold motion-safe:animate-[eq_1.1s_ease-in-out_infinite]"
                      style={{ height: h, animationDelay: `${i * 0.16}s` }}
                    />
                  ))}
                </span>
              </span>
            </SectionTitle>
            <SectionIntro className="mt-4 max-w-md">
              Entrá al canal y sumate a la transmisión en directo desde San
              Nicolás de los Arroyos.
            </SectionIntro>

            {/* Datos de sintonía, escaneables de un vistazo */}
            <div className="mt-6 flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700">
                <Radio className="size-3.5 text-grape" strokeWidth={2} />
                FM 99.9
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-neutral-700">
                <Clock className="size-3.5 text-grape" strokeWidth={2} />
                Lun a Vie · 10–12 h (ARG)
              </span>
            </div>

            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-grape px-7 text-sm font-semibold text-white shadow-sm transition-all duration-300 hover:bg-grape-deep active:scale-[0.98]"
            >
              Ver el vivo ahora
              <ArrowUpRight
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2.5}
              />
            </a>

            {/* Tira de redes minimalista */}
            <div className="mt-8 flex items-center gap-3 border-t border-neutral-200 pt-6">
              <span className="text-xs font-medium uppercase tracking-wide text-neutral-400">
                Seguinos
              </span>
              <div className="flex items-center gap-2">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 transition-all duration-300 hover:-translate-y-0.5 hover:border-neutral-900 hover:bg-neutral-900 hover:text-white"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-[18px]">
                      <path d={s.path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
