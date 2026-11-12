import Image, { getImageProps } from "next/image";
import { img, svg, video } from "@/lib/assets";
import { HeroVideo } from "./HeroVideo";
import { VideoPlayButton } from "./VideoPlayButton";
import { CtaButton, Lines, rv } from "./ui";

const orbitNodes = [
  { label: "Grounded", x: 125.1, y: 65 },
  { label: "Unhurried", x: 90, y: 165 },
  { label: "Restored", x: 125.1, y: 265 },
];

/** S2 Hero (contains S1 Nav). Desktop coordinates are card-relative, from the Figma frame. */
export function Hero() {
  const poster = getImageProps({ src: img.heroCircle, alt: "", width: 300, quality: 75 }).props.src;

  return (
    <section id="top" aria-label="Introduction" className="relative">
      {/* Full-bleed background, edge to edge at every width */}
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src={img.heroBg}
          alt="Grass-roofed Innosan home set into a hillside beneath a large oak tree at sunset"
          fill
          preload
          sizes="100vw"
          data-reveal="settle"
          className="object-cover"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(to_top_right,rgba(0,0,0,0.35),rgba(0,0,0,0))]" />
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.25),rgba(0,0,0,0))]" />
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-3/5 bg-[linear-gradient(to_top,rgba(0,0,0,0.45),rgba(0,0,0,0))] lg:hidden" />
      </div>

      <div className="desk relative">
      <div className="relative flex min-h-[860px] flex-col px-4 pb-16 pt-24 md:px-6 md:pt-28 lg:block lg:h-[904px] lg:min-h-0 lg:p-0">
      {/* Content box: same 1392x880 card coordinates as the Figma frame */}
      <div className="contents lg:absolute lg:left-6 lg:top-6 lg:block lg:h-[880px] lg:w-[1392px]">

        {/* Blurb (top-right) */}
        <p {...rv("fade", 5)} className="relative z-10 ml-auto mt-10 w-[260px] text-right text-caption text-white lg:absolute lg:left-[1092px] lg:top-[284px] lg:m-0">
          Slow mornings under a meadow roof.
          <br />
          Reserve your dates now and start
          <br />
          your own hillside story.
        </p>

        {/* Video circle with orbit labels */}
        {/* Mobile: the 385x330 composition is scaled to 0.85 (327px), or 0.72 (277px) on phones under 360px */}
        <div {...rv("scale", 3)} className="relative z-10 mx-auto mt-6 h-[238px] w-[277px] min-[360px]:h-[281px] min-[360px]:w-[327px] lg:absolute lg:left-[954px] lg:top-[381px] lg:m-0 lg:h-[330px] lg:w-[385px]">
          <div className="relative h-[330px] w-[385px] origin-top-left scale-[0.72] min-[360px]:scale-[0.85] lg:scale-100">
            <div className="absolute left-[117px] top-8 h-[266px] w-[266px] overflow-hidden rounded-full border-[1.5px] border-white/85">
              <HeroVideo src={video.heroCircle} poster={poster} label="Short looping film of an Innosan home" />
            </div>
            <VideoPlayButton
              src={video.heroDesktop}
              mobileSrc={video.heroMobile}
              poster={poster}
              title="Innosan hillside home"
              className="absolute left-[220px] top-[135px]"
            />
            <svg aria-hidden="true" className="pointer-events-none absolute left-[88px] top-[3px]" width="324" height="324" viewBox="0 0 324 324" fill="none">
              <path d="M112.56 314.17A160 160 0 0 1 112.56 9.83" stroke="#fff" strokeOpacity="0.85" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            {orbitNodes.map((n) => (
              <div key={n.label}>
                <span
                  aria-hidden="true"
                  className="absolute h-3 w-3 rounded-full border-[1.5px] border-white bg-white/35"
                  style={{ left: n.x - 6, top: n.y - 6 }}
                />
                <span aria-hidden="true" className="absolute h-1 w-1 rounded-full bg-white" style={{ left: n.x - 2, top: n.y - 2 }} />
                <span
                  className="absolute -translate-x-full -translate-y-1/2 whitespace-nowrap text-small font-medium text-white"
                  style={{ left: n.x - 14, top: n.y }}
                >
                  {n.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Headline + CTA */}
        <div className="relative z-10 mt-auto pt-8 lg:static lg:m-0 lg:p-0">
          <h1 {...rv("lines", 1)} className="text-[40px] font-normal leading-[1.1] text-white md:text-[52px] lg:absolute lg:left-11 lg:top-[548px] lg:text-hero">
            <Lines lines={["Wake Up Inside", "a Living Hillside", "This Season"]} />
          </h1>
          <CtaButton href="#stays" label="Book a stay" variant="light" motion={rv("up", 5)} className="mt-8 lg:absolute lg:left-11 lg:top-[790px] lg:m-0" />
        </div>

        {/* Tag chain */}
        <div {...rv("right", 6)} className="relative z-10 mt-8 h-[124px] w-[330px] self-end text-small font-medium text-white lg:absolute lg:left-[1022px] lg:top-[716px] lg:m-0">
          <Image src={svg("tag-chain")} alt="" aria-hidden="true" width={334} height={128} unoptimized className="pointer-events-none absolute -left-0.5 -top-0.5 max-w-none" />
          <ul aria-label="Retreat qualities">
            <li className="absolute left-[52px] top-[104px] -translate-x-1/2 -translate-y-1/2">hillside</li>
            <li className="absolute left-[164px] top-[54px] -translate-x-1/2 -translate-y-1/2 -rotate-45">cosy</li>
            <li className="absolute left-[262px] top-[104px] -translate-x-1/2 -translate-y-1/2">stillness</li>
          </ul>
        </div>

        {/* Scroll bite: sits on the hero's bottom edge */}
        <a
          href="#about"
          aria-label="Scroll to the next section"
          {...rv("scale", 7)}
          className="absolute bottom-[-56px] left-1/2 z-10 block h-[112px] w-[112px] -translate-x-1/2 rounded-full lg:bottom-auto lg:left-[934px] lg:top-[824px] lg:translate-x-0"
        >
          <Image src={svg("scroll-bite")} alt="" aria-hidden="true" width={112} height={112} unoptimized />
        </a>
      </div>
      </div>
      </div>
    </section>
  );
}
