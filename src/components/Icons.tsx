import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Stroke({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

function Fill({ size = 24, children, ...rest }: IconProps & { children: React.ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" {...rest}>
      {children}
    </svg>
  );
}

export const GlobeIcon = (p: IconProps) => (
  <Stroke {...p}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </Stroke>
);
export const ChevronLeftIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m15 18-6-6 6-6" />
  </Stroke>
);
export const ChevronRightIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m9 18 6-6-6-6" />
  </Stroke>
);
export const ChevronsRightIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="m6 17 5-5-5-5" />
    <path d="m13 17 5-5-5-5" />
  </Stroke>
);
export const ArrowRightIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </Stroke>
);
export const BadgeCheckIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
    <path d="m9 12 2 2 4-4" />
  </Stroke>
);
export const TelegramIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
    <path d="m21.854 2.147-10.94 10.939" />
  </Stroke>
);
export const InstagramIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <path d="M17.5 6.5h.01" />
  </Stroke>
);
export const DiscordIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M8.5 7.5c2.3-.6 4.7-.6 7 0M8 7c-2 .5-3.5 1.2-4 2-1 2-1.5 5-1 8 1.2 1.3 3 2 4.5 2.3l1-2M16 7c2 .5 3.5 1.2 4 2 1 2 1.5 5 1 8-1.2 1.3-3 2-4.5 2.3l-1-2M7 16.5c3 1.4 7 1.4 10 0" />
    <circle cx="9" cy="12.5" r="1" />
    <circle cx="15" cy="12.5" r="1" />
  </Stroke>
);
export const ExpandIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M15 3h6v6" />
    <path d="m21 3-7 7" />
    <path d="m3 21 7-7" />
    <path d="M9 21H3v-6" />
  </Stroke>
);
export const CalendarIcon = (p: IconProps) => (
  <Stroke {...p}>
    <rect width="18" height="18" x="3" y="4" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Stroke>
);
export const MenuIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M4 8h16M4 16h16" />
  </Stroke>
);
export const CloseIcon = (p: IconProps) => (
  <Stroke {...p}>
    <path d="M18 6 6 18M6 6l12 12" />
  </Stroke>
);
export const HeartIcon = (p: IconProps) => (
  <Fill {...p}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </Fill>
);
export const PlayIcon = (p: IconProps) => (
  <Fill {...p}>
    <path d="M8 5.5v13a.8.8 0 0 0 1.2.7l10.4-6.5a.8.8 0 0 0 0-1.4L9.2 4.8A.8.8 0 0 0 8 5.5z" />
  </Fill>
);
export const TriangleRightIcon = (p: IconProps) => (
  <Fill {...p}>
    <path d="M8 6.2v11.6a.8.8 0 0 0 1.2.7l9.3-5.8a.8.8 0 0 0 0-1.4L9.2 5.5a.8.8 0 0 0-1.2.7z" />
  </Fill>
);
export const AppleIcon = (p: IconProps) => (
  <Fill {...p}>
    <path d="M15.2 3c.1 1.3-.4 2.5-1.2 3.4-.8.9-2 1.5-3.1 1.4-.1-1.2.5-2.5 1.2-3.3.8-.9 2.1-1.5 3.1-1.5zM18.9 16.6c-.5 1.1-.8 1.6-1.4 2.6-.9 1.4-2.1 3.1-3.6 3.1-1.3 0-1.7-.9-3.5-.9s-2.2.9-3.5.9c-1.5 0-2.7-1.6-3.5-3C1.9 15.3 1.7 10.9 3.2 8.6c1.1-1.6 2.7-2.6 4.3-2.6 1.6 0 2.6.9 3.9.9 1.3 0 2.1-.9 3.9-.9 1.4 0 2.9.8 4 2.1-3.5 1.9-2.9 6.9-.4 8.5z" />
  </Fill>
);
export const StarIcon = (p: IconProps) => (
  <Fill {...p}>
    <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
  </Fill>
);
export const GoogleGlyph =({ size = 16 }: { size?: number }) => (
  <span aria-hidden="true" className="font-semibold leading-none" style={{ fontSize: size * 1.05 }}>
    G
  </span>
);

/** Innosan arch mark (original logo mark) */
export function ArchMark({ size = 22, strokeWidth = 1.6, className, style }: { size?: number; strokeWidth?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 22 22" fill="none" aria-hidden="true" focusable="false" className={className} style={style}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round">
        <path d="M4.5 19.5V10.5a6.5 6.5 0 0 1 13 0v9" />
        <path d="M8.5 19.5v-7.5a2.5 2.5 0 0 1 5 0v7.5" />
        <path d="M2 19.5h18" />
      </g>
      <circle cx="11" cy="4.6" r="1.3" fill="currentColor" />
    </svg>
  );
}
