"use client";

import { useState } from "react";
import { Logo, Outline } from "./ui";
import { CloseIcon, MenuIcon } from "./Icons";

const mainLinks = [
  { label: "Stays", href: "#stays" },
  { label: "Journal", href: "#journal" },
  { label: "Contact", href: "#contact" },
];

/** S1 Nav — connected-pill clusters on desktop; logo + menu button below 768px. */
export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <nav aria-label="Main" className="relative z-20">
      {/* ---- Desktop & tablet: connected pills ---- */}
      <div className="hidden md:block">
        <div className="absolute left-0 top-0 h-10 w-[752px] origin-top-left max-lg:scale-[0.7]">
          <Outline src="/svg/nav-main.svg" w={752} h={40} />
          <a href="#top" aria-label="Innosan home" className="absolute left-[22px] top-[9px]">
            <Logo />
          </a>
          <a
            href="#about"
            className="absolute left-[376px] top-1 flex h-8 w-[84px] items-center justify-center rounded-pill bg-white text-nav font-medium text-ink"
          >
            About
          </a>
          <div className="absolute left-[488px] top-0 flex h-10 w-[264px] items-center justify-between px-[30px]">
            {mainLinks.map((l) => (
              <a key={l.label} href={l.href} className="text-nav font-medium text-white hover:underline">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="absolute right-0 top-0 h-10 w-[214px] origin-top-right max-lg:scale-[0.7]">
          <Outline src="/svg/nav-right.svg" w={214} h={40} />
          <a href="#faqs" className="absolute left-0 top-0 flex h-10 w-[90px] items-center justify-center text-nav font-medium text-white hover:underline">
            FAQs
          </a>
          <a
            href="#stays"
            className="absolute left-[118px] top-1 flex h-8 w-[92px] items-center justify-center rounded-pill bg-white text-nav font-medium text-ink"
          >
            Book now
          </a>
        </div>
      </div>

      {/* ---- Mobile: logo + menu button ---- */}
      <div className="flex items-center justify-between md:hidden">
        <a href="#top" aria-label="Innosan home" className="flex h-10 items-center rounded-pill border-[1.5px] border-white px-4">
          <Logo />
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
          className="flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-white text-white"
        >
          {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
        </button>
        <div
          id="mobile-menu"
          hidden={!open}
          className="absolute left-0 right-0 top-12 rounded-image bg-white p-2 text-small font-medium text-ink"
        >
          {[{ label: "About", href: "#about" }, ...mainLinks, { label: "FAQs", href: "#faqs" }, { label: "Book now", href: "#stays" }].map((l) => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 hover:bg-soft-grey">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
