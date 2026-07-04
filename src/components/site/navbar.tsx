"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
  type MotionValue,
} from "motion/react";
import { Megaphone, Radio } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { label: "En vivo", href: "#en-vivo" },
  { label: "Programas", href: "#programas" },
  { label: "Novedades", href: "#novedades" },
  { label: "Estudio", href: "#estudio" },
  { label: "FAQ", href: "#faq" },
];

// WhatsApp para pauta publicitaria (anunciar en los programas de DOGO).
const ADS_URL = `https://wa.me/5493364403310?text=${encodeURIComponent(
  "¡Hola DOGO! 👋 Quiero info para anunciar mi marca en sus programas.",
)}`;

const EASE = [0.16, 1, 0.3, 1] as const;

// Where the light→dark content theme crosses over as you scroll. By the time
// it flips to dark, the bar fill is already mostly opaque white, so neither
// state ever shows low-contrast text.
const THEME: [number, number] = [0.45, 0.82];

export function Navbar() {
  const { scrollY } = useScroll();
  const [open, setOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  // Starts at 0 on both server and client so the first render matches (no
  // hydration mismatch). While 0, `maxWidth` resolves to full-bleed — the exact
  // top state — so measuring it post-mount causes no visible jump either.
  const [vw, setVw] = useState(0);

  // Track viewport width so the bar can interpolate between full-bleed (top)
  // and the fixed hero width (pill).
  useEffect(() => {
    const update = () => setVw(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Auto-close the menu when scrolling or clicking anywhere outside the nav.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onPointerDown = (e: PointerEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("scroll", close);
    };
  }, [open]);

  // p: 0 at the very top → 1 once scrolled ~120px. Drives the whole morph.
  const p = useTransform(scrollY, [0, 120], [0, 1], { clamp: true });

  // Width collapse: a discrete switch, not a fade. The CTAs show full labels
  // while there's room (≥1200px) and snap to icon-only once the window narrows
  // toward the lg breakpoint — below which the whole bar drops to the burger.
  // We drive a step target (0 or 1) through a spring so the switch animates
  // cleanly (label slides + fades together) instead of resting half-transparent.
  const widthTarget = useMotionValue(0);
  const widthCollapse = useSpring(widthTarget, { stiffness: 320, damping: 34 });
  useEffect(() => {
    const update = () => widthTarget.set(window.innerWidth < 1200 ? 1 : 0);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [widthTarget]);

  // CTAs collapse to icons when EITHER the page is scrolled or the window is
  // narrow — whichever is further along.
  const ctaCollapse = useTransform(
    [p, widthCollapse] as MotionValue<number>[],
    ([a, b]: number[]) => Math.max(a, b),
  );

  // At the top the bar is a full-bleed header spanning the whole viewport.
  // As it scrolls it collapses to the page content width (≈93rem — the
  // max-w-[1600px] Container minus its lg:px-14 gutters) and floats as a pill,
  // its centred edges lining up with the content below.
  const HERO_PX = 93 * 16; // ≈ 1488px, the content container's inner width
  const maxWidth = useTransform(p, (v) => {
    // Until the viewport is measured, leave maxWidth unset → full-bleed, which
    // is exactly the top (p=0) state, so there's no shrink-then-grow on load.
    if (!vw) return undefined;
    const pill = Math.min(vw, HERO_PX);
    return vw - v * (vw - pill);
  });
  // Side gutter: 0 at the top (true edge-to-edge), easing in so the pill floats
  // off the screen edges on narrow viewports where it can't centre.
  const paddingX = useTransform(p, [0, 1], [0, 16]);

  const marginTop = useTransform(p, (v) => v * 14);
  const radius = useTransform(p, (v) => v * 28); // sharp header → fully-rounded pill
  const barHeight = useTransform(p, (v) => 76 - v * 20); // 76 → 56

  // Chrome (border / shadow / blur / fill) fades in as it becomes a pill. The
  // fill now starts fully transparent so the bar is invisible over the hero
  // video at the top, then fills to a near-solid white pill on scroll.
  const borderAlpha = useTransform(p, (v) => v * 0.12);
  const shadowAlpha = useTransform(p, (v) => v * 0.12);
  const fillAlpha = useTransform(p, [0, 1], [0, 0.97]);
  const blur = useTransform(p, (v) => v * 14);

  const border = useMotionTemplate`1px solid rgba(0,0,0,${borderAlpha})`;
  const boxShadow = useMotionTemplate`0 14px 34px -10px rgba(0,0,0,${shadowAlpha})`;
  const background = useMotionTemplate`rgba(255,255,255,${fillAlpha})`;
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;

  // Content theme: white over the dark hero at the top → neutral on the pill.
  const linkColor = useTransform(p, THEME, [
    "rgba(255,255,255,0.92)",
    "rgba(82,82,82,1)",
  ]);
  const textShadowAlpha = useTransform(p, [0, 0.55], [0.45, 0]);
  const linkShadow = useMotionTemplate`0 1px 3px rgba(0,0,0,${textShadowAlpha})`;
  const toggleColor = useTransform(p, THEME, [
    "rgba(255,255,255,1)",
    "rgba(23,23,23,1)",
  ]);

  return (
    <motion.div
      style={{ paddingLeft: paddingX, paddingRight: paddingX }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.nav
        ref={navRef}
        style={{
          maxWidth,
          marginTop,
          borderRadius: radius,
          border,
          boxShadow,
          // When the menu is open, force an opaque card so it never shows
          // through (at the top the fill is transparent with no blur).
          background: open ? "rgb(255, 255, 255)" : background,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
        }}
        className="mx-auto flex w-full flex-col overflow-hidden"
      >
        {/* Top bar */}
        <motion.div
          style={{ height: barHeight }}
          className="grid w-full shrink-0 grid-cols-[1fr_auto_1fr] items-center px-5"
        >
          <div className="justify-self-start">
            <MorphLogo p={p} open={open} />
          </div>

          <motion.ul
            style={{ color: linkColor, textShadow: linkShadow }}
            className="col-start-2 hidden items-center gap-7 justify-self-center text-sm lg:flex"
          >
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition-opacity hover:opacity-70"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </motion.ul>

          <div className="col-start-3 flex items-center gap-2 justify-self-end">
            <MorphButton
              collapse={ctaCollapse}
              scrollP={p}
              href={ADS_URL}
              label="Anunciá acá"
              icon={Megaphone}
              variant="outline"
            />
            <MorphButton
              collapse={ctaCollapse}
              scrollP={p}
              href="#en-vivo"
              label="Escuchar vivo"
              icon={Radio}
              variant="solid"
            />

            <MenuToggle
              open={open}
              color={open ? "rgb(23,23,23)" : toggleColor}
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
            />
          </div>
        </motion.div>

        {/* The navbar itself grows down to reveal the menu */}
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.38, ease: EASE }}
              className="shrink-0 overflow-hidden lg:hidden"
            >
              <div className="px-3 pb-3 pt-1">
                <div className="mx-2 mb-2 h-px bg-black/5" />
                <ul className="flex flex-col">
                  {links.map((link, i) => (
                    <motion.li
                      key={link.label}
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.06 + i * 0.04, duration: 0.25, ease: EASE }}
                    >
                      <a
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm text-neutral-700 transition-colors hover:bg-black/5 hover:text-neutral-900"
                      >
                        {link.label}
                      </a>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-2 flex gap-2 px-1">
                  <a
                    href={ADS_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 flex-1 items-center justify-center rounded-full border border-neutral-300 bg-white px-5 text-sm font-semibold text-neutral-900 transition-all hover:bg-neutral-50 active:scale-95"
                  >
                    Anunciá acá
                  </a>
                  <a
                    href="#en-vivo"
                    onClick={() => setOpen(false)}
                    className="inline-flex h-9 flex-1 items-center justify-center rounded-full bg-grape px-5 text-sm font-semibold text-white transition-all hover:bg-grape-deep active:scale-95"
                  >
                    Escuchar vivo
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </motion.div>
  );
}

/**
 * The DOGO logo, rendered white over the hero video at the top and crossfading
 * to full colour as the bar morphs into the solid pill. Both layers are the
 * same source image so the mascot shape stays identical; the white layer just
 * uses a brightness/invert filter. Its height eases down slightly on scroll.
 */
function MorphLogo({ p, open }: { p: MotionValue<number>; open: boolean }) {
  const whiteOpacity = useTransform(p, [0, 0.5], [1, 0]);
  const colorOpacity = useTransform(p, [0.4, 0.82], [0, 1]);
  const drop = useTransform(p, [0, 0.55], [0.35, 0]);
  const dropShadow = useMotionTemplate`drop-shadow(0 1px 3px rgba(0,0,0,${drop}))`;

  return (
    <motion.div className="relative flex h-10 items-center">
      {/* Full-colour logo */}
      <motion.div
        style={{ opacity: open ? 1 : colorOpacity }}
        className="h-full"
      >
        <Image
          src="/brand/dogo-logo-color.png"
          alt="DOGO Streaming"
          width={1060}
          height={385}
          priority
          className="h-full w-auto"
        />
      </motion.div>
      {/* White silhouette logo (for the transparent top state) */}
      <motion.div
        style={{ opacity: open ? 0 : whiteOpacity, filter: dropShadow }}
        className="absolute inset-0 h-full"
        aria-hidden
      >
        <Image
          src="/brand/dogo-logo-dark.png"
          alt=""
          width={1060}
          height={385}
          className="h-full w-auto"
        />
      </motion.div>
    </motion.div>
  );
}

/**
 * Desktop CTA that morphs from a labelled pill into an icon-only button as the
 * navbar contracts (`collapse`), while its colours theme from a light treatment
 * over the hero video to the solid look on the pill (`scrollP`).
 */
function MorphButton({
  collapse,
  scrollP,
  href,
  label,
  icon: Icon,
  variant = "solid",
}: {
  collapse: MotionValue<number>;
  scrollP: MotionValue<number>;
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  variant?: "solid" | "outline";
}) {
  const labelOpacity = useTransform(collapse, [0, 0.55], [1, 0]);
  const labelMaxWidth = useTransform(collapse, [0, 1], [200, 0]);
  const labelMargin = useTransform(collapse, [0, 1], [10, 0]);
  // Collapsed state stays a wide pill rather than shrinking to a circle, so the
  // morph is subtle — the label slides away but the button keeps its length.
  const padX = useTransform(collapse, [0, 1], [22, 32]);

  const solid = variant === "solid";
  // Top (over video) → scrolled (on the white pill).
  const bg = useTransform(
    scrollP,
    THEME,
    solid
      ? ["rgba(255,255,255,1)", "rgba(23,23,23,1)"]
      : ["rgba(255,255,255,0.12)", "rgba(255,255,255,1)"],
  );
  const color = useTransform(
    scrollP,
    THEME,
    solid
      ? ["rgba(23,23,23,1)", "rgba(255,255,255,1)"]
      : ["rgba(255,255,255,1)", "rgba(23,23,23,1)"],
  );
  const borderColor = useTransform(scrollP, THEME, [
    "rgba(255,255,255,0.45)",
    "rgba(212,212,212,1)",
  ]);

  return (
    <motion.a
      href={href}
      {...(href.startsWith("http")
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      style={{
        paddingLeft: padX,
        paddingRight: padX,
        backgroundColor: bg,
        color,
        ...(solid ? {} : { borderColor }),
      }}
      className={cn(
        "hidden h-9 items-center justify-center rounded-full text-sm font-medium transition-opacity hover:opacity-90 active:scale-95 lg:inline-flex",
        !solid && "border backdrop-blur-sm",
      )}
    >
      <Icon className="size-[18px] shrink-0" strokeWidth={1.75} />
      <motion.span
        style={{
          maxWidth: labelMaxWidth,
          opacity: labelOpacity,
          marginLeft: labelMargin,
        }}
        className="overflow-hidden whitespace-nowrap"
      >
        {label}
      </motion.span>
    </motion.a>
  );
}

/** Borderless hamburger ↔ close toggle, only shown below lg. */
function MenuToggle({
  open,
  color,
  ...props
}: Omit<React.ComponentProps<"button">, "color"> & {
  open: boolean;
  color: MotionValue<string> | string;
}) {
  return (
    <motion.button
      {...(props as React.ComponentProps<typeof motion.button>)}
      style={{ color } as MotionStyle}
      aria-label={open ? "Cerrar menú" : "Abrir menú"}
      className="relative -mr-1 flex size-9 items-center justify-center lg:hidden"
    >
      <motion.span
        className="absolute h-[2px] w-5 rounded-full bg-current"
        animate={open ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
        transition={{ duration: 0.25, ease: EASE }}
      />
      <motion.span
        className="absolute h-[2px] w-5 rounded-full bg-current"
        animate={open ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
        transition={{ duration: 0.25, ease: EASE }}
      />
    </motion.button>
  );
}
