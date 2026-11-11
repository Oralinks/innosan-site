"use client";

import Image, { getImageProps } from "next/image";
import { useState } from "react";
import { img, video } from "@/lib/assets";
import { ArrowRightIcon, ChevronRightIcon, ExpandIcon, HeartIcon } from "./Icons";
import { OutlinePill, Watermark } from "./ui";
import { VideoPlayButton } from "./VideoPlayButton";

const rows = [
  { q: "Gather in a sunlit living and dining hall.", image: img.interior5, alt: "Open living and dining hall with tall windows onto the garden" },
  { q: "What's cooking in the kitchen?", image: img.interior4, alt: "Kitchen island with copper pendant lights and leather stools" },
  { q: "How restful is the bedroom?", image: img.interior3, alt: "Bedroom with a curved window looking out over green hills" },
  { q: "Where does all the daylight come from?", image: img.interior2, alt: "Sunlit corridor with a round skylight and garden windows" },
];

/** S5 Interior Q&A — accordion (one row open at a time) and a video card. */
export function Interior() {
  const [open, setOpen] = useState(0);
  const poster = getImageProps({ src: img.interior1, alt: "", width: 1100, quality: 75 }).props.src;

  return (
    <section id="faqs" aria-labelledby="interior-title" className="relative mx-4 mt-16 flex scroll-mt-6 flex-col gap-10 lg:mx-6 lg:mt-16 lg:block lg:h-[560px]">
      <Watermark size={340} strokeWidth={0.45} className="left-[300px] top-[120px] hidden text-ink opacity-5 lg:block" />

      <h2 id="interior-title" className="text-[26px] font-normal leading-[1.35] md:text-h3 lg:absolute lg:left-0 lg:top-0 lg:w-[620px]">
        A calm, earthy home made for long dinners, deep sleep and slow mornings together
      </h2>

      {/* Q&A list */}
      <div className="lg:absolute lg:left-[707px] lg:top-0 lg:w-[685px]">
        {rows.map((r, i) => {
          const num = String(i + 1).padStart(2, "0");
          const isOpen = open === i;
          return (
            <div key={num} className="border-t border-divider">
              {isOpen ? (
                <div className="flex flex-col gap-6 pb-6 pt-5 md:h-[196px] md:flex-row lg:pr-6">
                  <div className="flex flex-1 flex-col gap-[18px]">
                    <h3 className="flex gap-2 text-small font-medium" id={`q-${num}`}>
                      <span className="text-caption font-normal text-muted">{num}</span>
                      <span className="max-w-[230px]">{r.q}</span>
                    </h3>
                    <OutlinePill href="#journal" className="self-start px-4 py-[7px] text-small font-medium">
                      learn more
                    </OutlinePill>
                  </div>
                  <div className="relative h-[152px] w-full overflow-hidden rounded-image md:w-[283px] md:shrink-0">
                    <Image src={r.image} alt={r.alt} fill sizes="(min-width: 768px) 283px, 100vw" className="object-cover" />
                  </div>
                </div>
              ) : (
                <h3>
                  <button
                    type="button"
                    aria-expanded="false"
                    onClick={() => setOpen(i)}
                    className="flex h-24 w-full items-center gap-[10px] text-left lg:pr-6"
                  >
                    <span className="text-caption text-muted">{num}</span>
                    <span className="flex-1 text-small font-medium">{r.q}</span>
                    <span aria-hidden="true" className="flex h-[26px] w-[26px] items-center justify-center rounded-full border-[1.5px] border-icon-grey text-muted">
                      <ChevronRightIcon size={14} />
                    </span>
                  </button>
                </h3>
              )}
            </div>
          );
        })}
        <div className="h-px bg-divider" />
      </div>

      {/* Video card */}
      <div className="lg:absolute lg:left-0 lg:top-[281px]">
        <div className="relative pt-[15px]">
          <div className="relative h-[206px] w-full overflow-hidden rounded-image md:w-[330px]">
            <Image src={img.interior1} alt="Library hallway with clay columns and built-in shelves" fill sizes="(min-width: 768px) 330px, 100vw" className="object-cover" />
            <VideoPlayButton
              src={video.interiorDesktop}
              mobileSrc={video.interiorMobile}
              poster={poster}
              title="Walk through an Innosan home"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-100"
            />
          </div>
          <span aria-hidden="true" className="absolute left-[22px] top-0 flex items-center gap-3 rounded-pill bg-ink px-[14px] py-2 text-white">
            <ExpandIcon size={15} />
            <HeartIcon size={15} />
          </span>
        </div>
        <p className="mt-[18px] text-caption">
          Walk the library hall: warm clay walls
          <br />
          and golden evening light.
        </p>
      </div>

      <a
        href="#journal"
        className="flex items-center gap-[14px] self-end rounded-pill bg-ink py-[5px] pl-[18px] pr-[5px] text-small font-medium text-white transition-opacity hover:opacity-85 lg:absolute lg:right-6 lg:top-[516px]"
      >
        explore homes
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-ink">
          <ArrowRightIcon size={14} />
        </span>
      </a>
    </section>
  );
}
