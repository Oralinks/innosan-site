"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { avatars, img } from "@/lib/assets";
import { AppleIcon, BadgeCheckIcon, CalendarIcon, ChevronsRightIcon, GlobeIcon, GoogleGlyph } from "./Icons";

const slides = [
  { image: img.booking6, alt: "Curved leather sofa in a dark timber-panelled lounge" },
  { image: img.booking5, alt: "Sunken lounge with a fireplace in a clay-walled room" },
  { image: img.booking3, alt: "Candle-lit dining table under curved timber beams" },
  { image: img.booking4, alt: "Stone bathtub in a warmly lit clay-walled bathroom" },
];

/** S4 Booking — dark card with a 4-image background slider (auto-advance 6s). */
export function Booking() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % slides.length), 6000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="stays"
      aria-labelledby="booking-title"
      aria-roledescription="carousel"
      className="relative mx-4 mt-16 scroll-mt-6 overflow-hidden rounded-section p-4 md:p-6 lg:mx-6 lg:mt-0 lg:h-[670px] lg:p-0"
    >
      {/* Background slider */}
      {slides.map((s, i) => (
        <Image
          key={i}
          src={s.image}
          alt={s.alt}
          fill
          sizes="(min-width: 1024px) 1392px, 100vw"
          aria-hidden={i !== active}
          className={`object-cover transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
        />
      ))}
      <div aria-hidden="true" className="absolute inset-0 bg-deepest/40" />
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[340px] bg-[linear-gradient(to_bottom,rgba(32,21,15,0.75),rgba(32,21,15,0))]" />

      <div className="relative flex flex-col gap-6 lg:static lg:block">
        {/* Right column content */}
        <h2 id="booking-title" className="pr-14 text-[32px] font-normal leading-[1.15] text-white md:text-h2-dark lg:absolute lg:left-[594px] lg:top-[34px] lg:p-0">
          Reserve Your Hillside
          <br />
          Escape Today
        </h2>
        <span aria-hidden="true" className="absolute right-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-white text-white lg:left-[1296px] lg:top-[42px]">
          <GlobeIcon size={18} />
        </span>
        <p className="text-sublead text-white lg:absolute lg:left-[594px] lg:top-[176px]">
          Meet fellow travellers
          <br />
          and share the trail
        </p>
        <div className="flex flex-wrap items-center gap-x-[26px] gap-y-4 lg:absolute lg:left-[594px] lg:top-[262px] lg:flex-nowrap">
          <div className="flex items-center">
            <span className="relative block h-[58px] w-[58px] shrink-0">
              <svg aria-hidden="true" className="absolute inset-0" width="58" height="58" viewBox="0 0 58 58" fill="none">
                <circle cx="29" cy="29" r="28.25" stroke="#fff" strokeWidth="1.5" strokeDasharray="3 3" />
              </svg>
              <Image src={avatars[5]} alt="Innosan community host" width={46} height={46} className="absolute left-1.5 top-1.5 h-[46px] w-[46px] rounded-full" />
            </span>
            <a href="#contact" className="-ml-1 flex items-center gap-3 rounded-pill bg-earth py-1 pl-[18px] pr-1 text-caption text-white transition-opacity hover:opacity-90">
              Join the circle
              <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full bg-white text-earth">
                <ChevronsRightIcon size={16} />
              </span>
            </a>
          </div>
          <p className="text-[18px] leading-[1.4] text-white md:text-sublead">
            and swap routes, recipes and tips
            <br />
            with guests who love the outdoors.
          </p>
        </div>

        {/* Left column: booking card */}
        <div className="flex flex-col gap-4 rounded-image bg-white p-[18px] md:max-w-[406px] lg:absolute lg:left-[42px] lg:top-10 lg:h-[416px] lg:w-[406px]">
          <div className="flex justify-between">
            <div className="flex flex-col gap-[26px]">
              <BadgeCheckIcon size={24} />
              <p className="text-sublead">
                Your stay is
                <br />
                reserved!
              </p>
            </div>
            <div className="relative h-[110px] w-[132px] shrink-0 overflow-hidden rounded-xl">
              <Image src={img.booking2} alt="Innosan home under a meadow roof" fill sizes="132px" className="object-cover" />
              <span className="frost absolute bottom-2 right-2 rounded-pill border border-white/70 px-3 py-[5px] text-caption text-white">Details</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-[14px] rounded-xl bg-soft-grey p-4">
            <dl className="contents">
              {[
                ["Check in", "14.03.2026"],
                ["Check out", "18.03.2026"],
                ["Guests", "4 people"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white pb-2 text-caption">
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <p className="text-caption text-muted">Save to calendar</p>
            <ul className="flex gap-[10px]" aria-label="Calendar options">
              <li className="flex flex-1 items-center justify-center rounded-pill border-[1.5px] border-ink py-[5px]" aria-label="Apple Calendar">
                <AppleIcon size={16} />
              </li>
              <li className="flex h-[29px] flex-1 items-center justify-center rounded-pill border-[1.5px] border-ink" aria-label="Google Calendar">
                <GoogleGlyph size={16} />
              </li>
              <li className="flex flex-1 items-center justify-center rounded-pill border-[1.5px] border-ink py-[5px]" aria-label="Other calendar">
                <CalendarIcon size={16} />
              </li>
            </ul>
          </div>
        </div>

        {/* Your stay */}
        <div className="flex h-16 items-center gap-3 rounded-xl bg-white pl-2 pr-4 md:max-w-[406px] lg:absolute lg:left-[42px] lg:top-[470px] lg:w-[406px]">
          <div className="relative h-[46px] w-[66px] shrink-0 overflow-hidden rounded-lg">
            <Image src={img.booking1} alt="Hillside home beneath an oak at sunset" fill sizes="66px" className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col gap-1.5 text-caption text-muted">
            <span>Your home:</span>
            <span>Open map</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-small font-medium">Hillside Valley</span>
            <span className="text-caption text-muted">Cabin 07</span>
          </div>
        </div>

        <a
          href="#stays"
          className="flex h-[62px] items-center justify-center rounded-pill border-[1.5px] border-white text-small font-medium text-white transition-colors hover:bg-white/10 md:max-w-[406px] lg:absolute lg:left-[42px] lg:top-[552px] lg:w-[406px]"
        >
          View reservation
        </a>

        {/* Counter + progress */}
        <div className="lg:absolute lg:left-[594px] lg:top-[560px]" aria-live="polite">
          <p className="text-counter text-white">
            <span className="sr-only">Slide </span>
            {String(active + 1).padStart(2, "0")}
            <span className="sr-only"> of 04</span>
          </p>
          <div aria-hidden="true" className="mt-[18px] flex gap-1.5">
            {slides.map((_, i) => (
              <span key={i} className={`h-[3px] w-16 rounded-sm bg-white transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-40"}`} />
            ))}
          </div>
        </div>

        <a
          href="#stays"
          className="flex h-11 items-center justify-center rounded-pill border-[1.5px] border-white px-5 text-center text-label font-semibold uppercase text-white transition-colors hover:bg-white/10 md:max-w-[406px] lg:absolute lg:left-[948px] lg:top-[586px] lg:w-[406px]"
        >
          Plan your next stay with us
        </a>
      </div>
    </section>
  );
}
