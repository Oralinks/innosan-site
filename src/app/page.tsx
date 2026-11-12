import { Suspense } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Charms } from "@/components/Charms";
import { Booking } from "@/components/Booking";
import { Interior } from "@/components/Interior";
import { Gallery } from "@/components/Gallery";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

// Each section sits in its own Suspense boundary so React hydrates them in
// separate, shorter tasks (selective hydration) instead of one long one.
// The header and hero are full-bleed; their contents use their own .desk wrappers.
export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Suspense>
          <Hero />
        </Suspense>
        <div className="desk">
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
        </div>
      </main>
      <div className="desk">
        <Footer />
      </div>
    </>
  );
}
