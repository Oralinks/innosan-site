import type { Metadata, Viewport } from "next";
import { Fredoka, Urbanist } from "next/font/google";
import "./globals.css";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Innosan — Hillside Retreat Stays",
  description:
    "Book an Innosan earth-sheltered retreat: meadow roofs, timber ceilings and a living tree at the heart of every home. Slow mornings, quiet nights, real nature.",
  openGraph: {
    title: "Innosan — Hillside Retreat Stays",
    description:
      "Earth-sheltered homes under living meadow roofs. Reserve your dates and start your own hillside story.",
    type: "website",
    siteName: "Innosan",
    images: [
      {
        url: "/hero%20image%20and%20video/hero%20image%201.jpg",
        width: 1280,
        height: 853,
        alt: "An Innosan home built into a grassy hill beneath a large oak tree at sunset",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

// Sets the desktop zoom factor before first paint (no layout shift between 1024 and 1439px).
const zoomScript = `(function(){function s(){var w=document.documentElement.clientWidth;document.documentElement.style.setProperty('--desk-zoom',w>=1024&&w<1440?String(w/1440):'1')}s();addEventListener('resize',s)})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${urbanist.variable} ${fredoka.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: zoomScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
