import { CtaButton, rv } from "./ui";

/** S7 Final CTA */
export function FinalCta() {
  return (
    <section aria-labelledby="final-title" className="mx-4 mt-16 flex flex-col items-center gap-9 text-center lg:mx-6 lg:mt-[50px] lg:h-[174px]">
      <h2 id="final-title" {...rv("up")} className="text-[24px] font-normal leading-[1.35] md:text-h3">
        Your hillside hideaway is waiting. Pick your dates
        <br className="hidden md:block" /> and come home to quiet.
      </h2>
      <CtaButton href="#stays" label="Book a stay" variant="earth" motion={rv("scale", 2)} />
    </section>
  );
}
