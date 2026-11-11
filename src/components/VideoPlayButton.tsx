"use client";

import { useRef, useState } from "react";
import { CloseIcon, PlayIcon } from "./Icons";

/** Frosted play button that opens the video (with sound) in a simple modal. */
export function VideoPlayButton({
  src,
  mobileSrc,
  poster,
  title,
  className = "",
}: {
  src: string;
  mobileSrc?: string;
  poster?: string;
  title: string;
  className?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const show = () => {
    setOpen(true);
    dialogRef.current?.showModal();
  };
  const close = () => {
    dialogRef.current?.close();
  };

  return (
    <>
      <button
        type="button"
        onClick={show}
        aria-label={`Play video: ${title}`}
        className={`frost flex h-[60px] w-[60px] items-center justify-center rounded-full border border-white/60 pl-1 text-white transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white ${className}`}
      >
        <PlayIcon size={24} />
      </button>
      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === dialogRef.current) close();
        }}
        className="m-auto w-[min(92vw,1100px)] overflow-visible bg-transparent p-0"
      >
        <div className="relative">
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full border-[1.5px] border-white text-white"
          >
            <CloseIcon size={18} />
          </button>
          {open && (
            <video controls autoPlay playsInline poster={poster} className="aspect-video w-full rounded-image bg-black">
              {mobileSrc && <source src={mobileSrc} type="video/mp4" media="(max-width: 767px)" />}
              <source src={src} type="video/mp4" />
            </video>
          )}
        </div>
      </dialog>
    </>
  );
}
