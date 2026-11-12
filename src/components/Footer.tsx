import { DiscordIcon, InstagramIcon, TelegramIcon } from "./Icons";
import { rv } from "./ui";

const socials = [
  { label: "Innosan on Telegram", Icon: TelegramIcon },
  { label: "Innosan on Instagram", Icon: InstagramIcon },
  { label: "Innosan on Discord", Icon: DiscordIcon },
];

/** S8 Footer */
export function Footer() {
  return (
    <footer id="contact" className="scroll-mt-6">
      <div {...rv("line")} className="mx-4 mt-16 h-px bg-divider lg:mx-6 lg:mt-[58px]" />
      <div {...rv("stagger", 2)} className="relative mx-4 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-8 text-caption lg:mx-6 lg:mb-[46px] lg:mt-[49px] lg:block lg:h-[34px] lg:py-0">
        <p className="lg:absolute lg:left-0 lg:top-[9px]">© 2026</p>
        <a href="#" className="underline lg:absolute lg:left-[236px] lg:top-[9px]">
          privacy policy
        </a>
        <a href="#" className="underline lg:absolute lg:left-[945px] lg:top-[9px]">
          terms of stay
        </a>
        <ul className="flex gap-2 lg:absolute lg:right-0 lg:top-px">
          {socials.map(({ label, Icon }) => (
            <li key={label}>
              <a
                href="#"
                aria-label={label}
                className="flex h-8 w-8 items-center justify-center rounded-full border-[1.5px] border-ink transition-colors hover:bg-ink hover:text-white"
              >
                <Icon size={15} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
