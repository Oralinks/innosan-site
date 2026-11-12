import Image from "next/image";
import { img } from "@/lib/assets";
import { ArchMark, DiscordIcon, InstagramIcon, TelegramIcon } from "./Icons";
import { OutlinePill, rv, Watermark } from "./ui";

const socials = [
  { label: "Innosan on Telegram", Icon: TelegramIcon },
  { label: "Innosan on Instagram", Icon: InstagramIcon },
  { label: "Innosan on Discord", Icon: DiscordIcon },
];

const photos = [
  { image: img.gallery4, alt: "Indoor oak tree rising through a round glass skylight", pos: "lg:left-[416px] lg:top-[236px] lg:h-[294px] lg:w-[476px]", sizes: "476px" },
  { image: img.gallery3, alt: "Aerial view of the round glass roof around an oak tree", pos: "lg:left-[830px] lg:top-[120px] lg:h-[162px] lg:w-[272px]", sizes: "272px" },
  { image: img.gallery2, alt: "Grass-roofed home with a curved glass facade at golden hour", pos: "lg:left-[170px] lg:top-[438px] lg:h-[180px] lg:w-[304px]", sizes: "304px" },
  { image: img.gallery1, alt: "Dining room under arched timber beams facing the forest", pos: "lg:left-[848px] lg:top-[424px] lg:h-[252px] lg:w-[332px]", sizes: "332px" },
];

/** S6 Gallery — mint card with an overlapping collage (2-column grid below 768px). */
export function Gallery() {
  return (
    <section
      id="journal"
      aria-labelledby="gallery-title"
      {...rv("up")}
      className="relative mx-4 mt-16 scroll-mt-6 overflow-hidden rounded-section bg-mint px-4 py-8 md:px-8 lg:mx-6 lg:mt-[50px] lg:h-[818px] lg:p-0"
    >
      <Watermark size={300} className="-top-[70px] left-[1180px] hidden text-mint-watermark opacity-50 lg:block" />
      <Watermark size={320} className="-left-20 top-[560px] text-mint-watermark opacity-50 max-lg:-bottom-20 max-lg:top-auto" />
      <Watermark size={200} className="left-10 top-[250px] hidden text-mint-watermark opacity-50 lg:block" />

      <h2 id="gallery-title" {...rv("up", 2)} className="relative flex items-center justify-center gap-3 text-[36px] font-normal leading-[1.15] md:text-gallery lg:absolute lg:inset-x-0 lg:top-[30px]">
        <ArchMark size={40} strokeWidth={1.4} />
        Gallery
      </h2>

      <div {...rv("left", 3)} className="relative mt-6 flex justify-center md:justify-start lg:absolute lg:left-[234px] lg:top-[150px] lg:m-0">
        <OutlinePill className="gap-2 py-1.5 pl-[18px] pr-1.5 text-caption">
          follow us
          {socials.map(({ label, Icon }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-[1.5px] border-ink transition-colors hover:bg-ink hover:text-mint"
            >
              <Icon size={14} />
            </a>
          ))}
        </OutlinePill>
      </div>

      <div className="relative mt-8 grid grid-cols-2 gap-3 lg:static lg:m-0 lg:block">
        {photos.map((p, i) => (
          <div key={p.alt} {...rv("clip", 3 + i)} className={`relative aspect-[4/3] overflow-hidden rounded-image lg:absolute lg:aspect-auto ${p.pos}`}>
            <Image src={p.image} alt={p.alt} fill sizes={`(min-width: 1024px) ${p.sizes}, 50vw`} className="object-cover" />
          </div>
        ))}
      </div>

      <div className="relative mt-6 flex flex-col gap-4 text-caption sm:flex-row sm:justify-between lg:static lg:m-0">
        <p {...rv("fade", 6)} className="lg:absolute lg:left-[1124px] lg:top-[360px]">
          Light pours in through
          <br />
          the treetop skylight.
        </p>
        <p {...rv("fade", 7)} className="lg:absolute lg:left-[574px] lg:top-[584px] lg:text-center">
          Every corner is made
          <br />
          for slowing down.
        </p>
      </div>

      <OutlinePill
        href="#stays"
        motion={rv("up", 8)}
        className="relative mt-8 h-11 w-full px-5 text-center text-label font-semibold uppercase lg:absolute lg:left-[493px] lg:top-[734px] lg:m-0 lg:w-[406px]"
      >
        See every home in the collection
      </OutlinePill>
    </section>
  );
}
