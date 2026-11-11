/** Muted looping circle video. Uses a 540px silent loop made from the hero video
 *  (public/video/hero-circle.mp4); the full video with sound plays in the modal. */
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  return (
    <video muted loop playsInline autoPlay preload="none" poster={poster} aria-label={label} className="h-full w-full object-cover">
      <source src={src} type="video/mp4" />
    </video>
  );
}
