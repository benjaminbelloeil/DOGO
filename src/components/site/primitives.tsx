import Image from "next/image";
import { cn } from "@/lib/utils";

/* Shared low-fidelity wireframe primitives. */

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-6", className)}>
      {children}
    </div>
  );
}

/** The classic "image" placeholder glyph used across the mockup. */
export function ImagePlaceholder({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="3" y="3" width="18" height="18" rx="4" />
      <circle cx="8.5" cy="8.5" r="1.4" />
      <path d="m4 16.5 4.2-4.2a2 2 0 0 1 2.8 0l4.5 4.5" />
      <path d="m14 14.5 1.3-1.3a2 2 0 0 1 2.8 0L21 15.5" />
    </svg>
  );
}

type PillProps = React.ComponentProps<"button"> & {
  variant?: "solid" | "outline";
};

export function Pill({
  variant = "solid",
  className,
  children,
  ...props
}: PillProps) {
  return (
    <button
      className={cn(
        "inline-flex h-9 items-center justify-center rounded-full px-5 text-sm font-medium transition-all active:scale-95",
        variant === "solid"
          ? "bg-neutral-900 text-white hover:bg-neutral-800"
          : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/** Tiny square-bullet eyebrow label (e.g. "▪ How It Works"). */
export function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-2 text-xs font-medium text-neutral-500">
      <span className="size-1.5 rounded-[1px] bg-neutral-800" />
      {children}
    </span>
  );
}

export function Logo() {
  return (
    <Image
      src="/brand/dogo-horizontal.png"
      alt="DOGO Streaming"
      width={1060}
      height={385}
      priority
      className="h-8 w-auto"
    />
  );
}

export function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
