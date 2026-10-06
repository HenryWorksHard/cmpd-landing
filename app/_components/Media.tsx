"use client";

import { useState } from "react";
import { useMediaExists } from "./useMediaExists";

/**
 * A piece of artwork, or nothing at all.
 *
 * Until the file exists in public/media this renders null — no placeholder
 * frame and no reserved space. Drop the file in and it appears.
 */
export default function Media({
  src,
  kind = "image",
  ratio = "aspect-video",
  label,
  className = "",
  poster,
  priority = false,
}: {
  /** Where the file goes, e.g. /media/hero.mp4 */
  src: string;
  kind?: "image" | "video";
  /** A Tailwind aspect class, or "" when a parent sets the height. */
  ratio?: string;
  /** Alt text for an image. */
  label: string;
  className?: string;
  poster?: string;
  /** Above the fold: skip the existence check and load at once. */
  priority?: boolean;
}) {
  const exists = useMediaExists(src, priority);
  // An image that 404s or decodes badly after the check still has to disappear.
  const [broken, setBroken] = useState(false);
  if (!exists || broken) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 ${ratio} ${className}`}
    >
      {kind === "video" ? (
        <video
          src={src}
          poster={poster}
          autoPlay
          muted
          loop
          playsInline
          // Anything below the fold preloading in full is what makes a page of
          // autoplaying video crawl on a phone.
          preload={priority ? "auto" : "metadata"}
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setBroken(true)}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
    </div>
  );
}
