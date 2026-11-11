import Image from "next/image";
import { ArchMark, TriangleRightIcon } from "./Icons";
import { svg } from "@/lib/assets";

/** Connected-pill outline exported as SVG. Rendered at its exact design size; links sit on top. */
export function Outline({ src, w, h }: { src: string; w: number; h: number }) {
  return (
    <Image
      src={src}
      alt=""
      aria-hidden="true"
      width={w + 4}
      height={h + 4}
      unoptimized
      className="pointer-events-none absolute max-w-none select-none"
      style={{ left: -2, top: -2, width: w + 4, height: h + 4 }}
    />
  );
}

export function Logo({ tone = "white", className = "" }: { tone?: "white" | "ink"; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${tone === "white" ? "text-white" : "text-ink"} ${className}`}>
      <ArchMark size={22} />
      <span className="font-display text-wordmark font-medium">innosan</span>
    </span>
  );
}

/** Signature CTA: pill joined by a pinched neck to a circular arrow bubble. */
export function CtaButton({
  href,
  label,
  variant,
  className = "",
}: {
  href: string;
  label: string;
  variant: "light" | "earth";
  className?: string;
}) {
  const light = variant === "light";
  return (
    <a href={href} className={`group relative block h-[46px] w-[270px] shrink-0 rounded-pill ${className}`}>
      <Outline src={svg(light ? "cta-light" : "cta-earth")} w={270} h={46} />
      <span
        className={`absolute left-1 top-1 flex h-[38px] w-[196px] items-center justify-center rounded-pill text-label font-semibold uppercase transition-opacity group-hover:opacity-90 ${
          light ? "bg-white text-ink" : "bg-earth text-white"
        }`}
      >
        {label}
      </span>
      <TriangleRightIcon
        size={18}
        className={`absolute left-[239px] top-[14px] transition-transform group-hover:translate-x-0.5 ${light ? "text-white" : "text-earth"}`}
      />
    </a>
  );
}

/** Outline pill (Pill/Outline in Figma). */
export function OutlinePill({
  children,
  tone = "light",
  href,
  className = "",
}: {
  children: React.ReactNode;
  tone?: "light" | "dark";
  href?: string;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center rounded-pill border-[1.5px] ${
    tone === "light" ? "border-ink text-ink" : "border-white text-white"
  } ${className}`;
  return href ? (
    <a href={href} className={`${cls} transition-colors hover:bg-black/5`}>
      {children}
    </a>
  ) : (
    <span className={cls}>{children}</span>
  );
}

/** Large outlined arch used as a watermark. */
export function Watermark({ size, className = "", strokeWidth = 1.1 }: { size: number; className?: string; strokeWidth?: number }) {
  return <ArchMark size={size} strokeWidth={strokeWidth} className={`pointer-events-none absolute ${className}`} />;
}
