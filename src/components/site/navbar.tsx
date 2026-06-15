"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "motion/react";
import { Logo, Pill } from "./primitives";

const links = ["About", "Features", "How It Works", "Pricing", "FAQ"];

export function Navbar() {
  const { scrollY } = useScroll();

  // p: 0 at the very top → 1 once scrolled ~120px. Drives the whole morph.
  const p = useTransform(scrollY, [0, 120], [0, 1], { clamp: true });

  // Bar contracts from full-bleed (100%) to a centered 64rem pill.
  const maxWidth = useMotionTemplate`calc(100% - (100% - 64rem) * ${p})`;
  const gutter = useTransform(p, (v) => v * 18); // wrapper side padding
  const marginTop = useTransform(p, (v) => v * 14);
  const radius = useTransform(p, (v) => 2 + v * 998); // square → pill
  const height = useTransform(p, (v) => 68 - v * 12); // 68 → 56

  // Chrome (border / shadow / blur / fill) fades in as it becomes a pill.
  const borderAlpha = useTransform(p, (v) => 0.05 + v * 0.07);
  const shadowAlpha = useTransform(p, (v) => v * 0.12);
  const fillAlpha = useTransform(p, (v) => 0.7 + v * 0.25);
  const blur = useTransform(p, (v) => v * 14);

  const border = useMotionTemplate`1px solid rgba(0,0,0,${borderAlpha})`;
  const boxShadow = useMotionTemplate`0 14px 34px -10px rgba(0,0,0,${shadowAlpha})`;
  const background = useMotionTemplate`rgba(255,255,255,${fillAlpha})`;
  const backdropFilter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{ paddingLeft: gutter, paddingRight: gutter }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <motion.nav
        style={{
          maxWidth,
          marginTop,
          height,
          borderRadius: radius,
          border,
          boxShadow,
          background,
          backdropFilter,
          WebkitBackdropFilter: backdropFilter,
        }}
        className="mx-auto grid w-full grid-cols-[1fr_auto_1fr] items-center px-5"
      >
        <div className="justify-self-start">
          <Logo />
        </div>

        <ul className="hidden items-center gap-7 justify-self-center text-sm text-neutral-600 md:flex">
          {links.map((link) => (
            <li key={link}>
              <a href="#" className="transition-colors hover:text-neutral-900">
                {link}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 justify-self-end">
          <Pill variant="outline" className="hidden sm:inline-flex">
            Button
          </Pill>
          <Pill>Button</Pill>
        </div>
      </motion.nav>
    </motion.div>
  );
}
