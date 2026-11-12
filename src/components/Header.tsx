"use client";

import { useEffect, useState } from "react";
import { Nav } from "./Nav";

/** Fixed site header. Transparent over the hero; gains a dark frosted backdrop once the page scrolls. */
export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        scrolled ? "bg-deepest/70 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div
        data-reveal="down"
        className={`desk px-4 transition-[padding] duration-300 md:px-6 lg:px-12 ${
          scrolled ? "py-3" : "py-4 lg:py-6"
        }`}
      >
        <div className="relative h-10">
          <Nav />
        </div>
      </div>
    </header>
  );
}
