"use client";

import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { avatars, img } from "@/lib/assets";
import { ChevronLeftIcon, ChevronRightIcon, GlobeIcon, StarIcon } from "./Icons";
import { Logo, OutlinePill } from "./ui";

const cards = [
  { image: img.charms2, label: ["Golden", "morning light"], alt: "Curved glass front of an Innosan home glowing at golden hour" },
  { image: img.charms3, label: ["Meadows", "all around"], alt: "Innosan home under a meadow roof on a sunny day" },
  { image: img.charms4, label: ["A tree at", "the centre"], alt: "Living room arranged around an indoor oak beneath a round skylight" },
];
// The row loops, so the three cards are rendered twice to give Embla room to slide.
const slides = [...cards, ...cards].map((c, i) => ({ ...c, num: String((i % 3) + 1).padStart(2, "0") }));

/** S3 Charms: 3-card row (Embla) + heading on the left, brand & social proof on the right. */
export function Charms() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" });

  return (
    <section
      id="about"
      aria-labelledby="charms-title"
      className="mx-4 mt-24 flex scroll-mt-6 flex-col gap-12 lg:mx-6 lg:mt-16 lg:h-[488px] lg:flex-row lg:items-start lg:gap-[73px]"
    >
      <div className="min-w-0 lg:w-[919px] lg:shrink-0">
        <div ref={emblaRef} className="overflow-hidden" role="region" aria-roledescription="carousel" aria-label="Retreat highlights">
          <div className="-ml-5 flex">
            {slides.map((c, i) => (
              <div
                key={i}
                role="group"
                aria-roledescription="slide"
                aria-label={`${c.num} of 03`}
                className="min-w-0 flex-[0_0_85%] pl-5 sm:flex-[0_0_50%] lg:flex-[0_0_313px]"
              >
                <article className="relative h-[208px] overflow-hidden rounded-image">
                  <Image src={c.image} alt={c.alt} fill sizes="(min-width: 1024px) 293px, (min-width: 640px) 50vw, 85vw" className="object-cover" />
                  <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0),rgba(0,0,0,0.55))]" />
                  <span aria-hidden="true" className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border-[1.5px] border-white text-white">
                    <GlobeIcon size={13} />
                  </span>
                  <p className="absolute bottom-[14px] left-[14px] text-small font-medium text-white">
                    {c.label[0]}
                    <br />
                    {c.label[1]}
                  </p>
                  <span className="absolute bottom-[14px] right-[14px] text-small font-medium text-white">{c.num}</span>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[42px] flex items-start justify-between gap-6">
          <div className="flex flex-col gap-4">
            <h2 id="charms-title" className="text-[36px] font-normal leading-[1.15] md:text-h2">
              Explore What Makes
              <br />
              Every Stay Special
            </h2>
            <p className="text-caption">
              Every home is set into the land, so the views,
              <br />
              the light and the quiet come included.
            </p>
          </div>
          <div className="flex shrink-0 gap-7 pt-[14px]">
            <button type="button" aria-label="Previous highlight" onClick={() => embla?.scrollPrev()} className="text-ink transition-opacity hover:opacity-60">
              <ChevronLeftIcon size={24} />
            </button>
            <button type="button" aria-label="Next highlight" onClick={() => embla?.scrollNext()} className="text-ink transition-opacity hover:opacity-60">
              <ChevronRightIcon size={24} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[14px] lg:w-[400px] lg:shrink-0 lg:pt-[98px]">
        <Logo tone="ink" />
        <p className="text-caption">
          Innosan builds homes into the hillside: low-impact retreats with meadow roofs, timber ceilings and a living tree at the heart of every
          lounge.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <div className="flex">
            {avatars.slice(0, 5).map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={`Innosan guest ${i + 1}`}
                width={32}
                height={32}
                className={`h-8 w-8 rounded-full outline-2 outline-white ${i ? "-ml-2" : ""}`}
              />
            ))}
          </div>
          <p className="text-small font-medium">
            12k guests
            <br />
            hosted
          </p>
        </div>
        <p className="text-caption">Read real stories from guests who woke up under a living roof.</p>
        <div className="flex gap-2">
          <OutlinePill className="px-[18px] py-[7px] text-small font-medium">
            <span className="sr-only">Rated 4.8 out of 5</span>
            <span aria-hidden="true" className="flex items-center gap-1">
              4.8 <StarIcon size={12} />
            </span>
          </OutlinePill>
          <OutlinePill href="#contact" className="px-[18px] py-[7px] text-small font-medium">
            Guest stories
          </OutlinePill>
        </div>
      </div>
    </section>
  );
}
