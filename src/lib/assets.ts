// Static imports give next/image the intrinsic size and a blur placeholder.
// Folder and file names are kept exactly as delivered.
import heroBg from "../../public/hero image and video/hero image 1.jpg";
import heroCircle from "../../public/hero image and video/hero image 2.jpg";
import charms2 from "../../public/charms/charms image 2.jpg";
import charms3 from "../../public/charms/charms image 3.jpg";
import charms4 from "../../public/charms/charms image 4.jpg";
import booking1 from "../../public/booking/booking image 1.jpg";
import booking2 from "../../public/booking/booking image 2.jpg";
import booking3 from "../../public/booking/booking image 3.jpg";
import booking4 from "../../public/booking/booking image 4.jpg";
import booking5 from "../../public/booking/booking image 5.jpg";
import booking6 from "../../public/booking/booking image 6.jpg";
import interior1 from "../../public/interior/interior image-1.jpg";
import interior2 from "../../public/interior/interior image 2.jpg";
import interior3 from "../../public/interior/interior image 3.jpg";
import interior4 from "../../public/interior/interior image 4.jpg";
import interior5 from "../../public/interior/interior image 5.jpg";
import gallery1 from "../../public/Gallery/gallery image 1.jpg";
import gallery2 from "../../public/Gallery/gallery image 2.jpg";
import gallery3 from "../../public/Gallery/gallery image 3.jpg";
import gallery4 from "../../public/Gallery/gallery image 4.jpg";

export const img = {
  heroBg,
  heroCircle,
  charms2,
  charms3,
  charms4,
  booking1,
  booking2,
  booking3,
  booking4,
  booking5,
  booking6,
  interior1,
  interior2,
  interior3,
  interior4,
  interior5,
  gallery1,
  gallery2,
  gallery3,
  gallery4,
};

/** Prefix for files in /public when the site is served from a sub-path (GitHub Pages). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const withBase = (p: string) => `${basePath}${p}`;

export const video = {
  heroCircle: withBase("/video/hero-circle.mp4"),
  heroDesktop: withBase(encodeURI("/hero image and video/hero video-desktop size.mp4")),
  heroMobile: withBase(encodeURI("/hero image and video/hero video-mobile size.mp4")),
  interiorDesktop: withBase(encodeURI("/interior/interior video-desktop.mp4")),
  interiorMobile: withBase(encodeURI("/interior/interior video-mobile.mp4")),
};

export const avatars = [1, 2, 3, 4, 5, 6].map((n) => withBase(`/avatars/guest-${n}.webp`));

export const svg = (name: string) => withBase(`/svg/${name}.svg`);
