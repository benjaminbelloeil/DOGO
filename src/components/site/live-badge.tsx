"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Whether DOGO is on air right now: 10:00–11:59, Argentina time.
 * Computed against `America/Argentina/Buenos_Aires` so it's correct regardless
 * of the visitor's own timezone.
 *
 * Phase 2 (TODO): replace this clock-based check with real YouTube live
 * detection (the channel goes live → pill turns on automatically). If we also
 * want to limit it to weekdays, gate this on the `weekday` part as well.
 */
function isLiveNow(date = new Date()): boolean {
  const hourPart = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Argentina/Buenos_Aires",
    hour: "2-digit",
    hour12: false,
  })
    .formatToParts(date)
    .find((p) => p.type === "hour")?.value;

  let hour = Number(hourPart);
  if (Number.isNaN(hour)) return false;
  if (hour === 24) hour = 0; // some runtimes report midnight as "24"

  return hour >= 10 && hour < 12;
}

export function LiveBadge({ className }: { className?: string }) {
  // Pre-mount we render the off state, so the server-rendered (static) HTML and
  // the first client render match. After mount we compute the real status and
  // re-check every 30s so the pill flips on/off as the window opens and closes.
  const [live, setLive] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const update = () => setLive(isLiveNow());
    update();
    setReady(true);
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  const isLive = ready && live;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] backdrop-blur",
        isLive ? "text-neutral-900" : "text-neutral-500",
        className,
      )}
    >
      <span className="relative flex size-2">
        {isLive && (
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-grape/60" />
        )}
        <span
          className={cn(
            "relative inline-flex size-2 rounded-full",
            isLive ? "bg-grape" : "bg-neutral-400",
          )}
        />
      </span>
      {isLive ? "En vivo" : "No en vivo"}
    </span>
  );
}
