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

export const video = {
  heroCircle: "/video/hero-circle.mp4",
  heroDesktop: encodeURI("/hero image and video/hero video-desktop size.mp4"),
  heroMobile: encodeURI("/hero image and video/hero video-mobile size.mp4"),
  interiorDesktop: encodeURI("/interior/interior video-desktop.mp4"),
  interiorMobile: encodeURI("/interior/interior video-mobile.mp4"),
};

export const avatars = [1, 2, 3, 4, 5, 6].map((n) => `/avatars/guest-${n}.webp`);
