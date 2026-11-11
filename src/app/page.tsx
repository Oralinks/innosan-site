import { Suspense } from "react";
import { Hero } from "@/components/Hero";
import { Charms } from "@/components/Charms";
import { Booking } from "@/components/Booking";
import { Interior } from "@/components/Interior";
import { Gallery } from "@/components/Gallery";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

// Each section sits in its own Suspense boundary so React hydrates them in
// separate, shorter tasks (selective hydration) instead of one long one.
export default function Home() {
  return (
    <div className="desk">
      <main>
        <Suspense>
          <Hero />
        </Suspense>
        <Suspense>
          <Charms />
        </Suspense>
        <Suspense>
          <Booking />
        </Suspense>
        <Suspense>
          <Interior />
        </Suspense>
        <Gallery />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
}
