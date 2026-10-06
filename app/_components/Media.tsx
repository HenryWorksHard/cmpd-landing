"use client";

import { useEffect, useState } from "react";

/**
 * A slot waiting for artwork.
 *
 * The placeholder is the DEFAULT, and real media replaces it once the file is
 * confirmed to exist. That is the opposite of the obvious way round, and it is
 * deliberate: a <video> pointing at a missing file does not reliably fire
 * onError, so rendering the media first leaves an invisible empty box with no
 * way to tell whether it is loading, broken, or simply not supplied yet.
 *
 * The frame names the exact path to drop the file at, so filling the page in is
 * a matter of copying files into public/media with no code to touch.
 */
export default function Media({
  src,
  kind = "image",
  ratio = "aspect-video",
  label,
  hint,
  poster,
  className = "",
  priority = false,
}: {
  /** Where the file goes, e.g. /media/hero.mp4 */
  src: string;
  kind?: "image" | "video";
  /** A Tailwind aspect class, or "" when a parent sets the height. */
  ratio?: string;
  label: string;
  hint?: string;
  poster?: string;
  className?: string;
  /** Above the fold: skip the existence probe and load at once. */
  priority?: boolean;
}) {
  // Only our own files are probed. A cross-origin HEAD is refused by CORS,
  // which would report every real CDN image as missing.
  const ours = src.startsWith("/");
  const [there, setThere] = useState(!ours || priority);

  useEffect(() => {
    if (!ours || priority) return;
    let live = true;
    // HEAD, so a large video is not downloaded twice to find out it exists.
    fetch(src, { method: "HEAD" })
      .then((r) => {
        if (live && r.ok) setThere(true);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [src, ours, priority]);

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900 ${ratio} ${className}`}
    >
      {there ? (
        kind === "video" ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            // Anything below the fold preloading in full is what makes a page
            // of autoplaying video crawl on a phone.
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
            onError={() => setThere(false)}
            className="absolute inset-0 h-full w-full object-cover"
          />
        )
      ) : (
        <div className="media-ph absolute inset-0 grid place-items-center p-4 text-center">
          <span>
            <span className="block text-sm font-semibold text-neutral-300">{label}</span>
            <code className="mt-1 block text-[11px] text-accent/70">{src}</code>
            {hint && <span className="mt-1 block text-[11px] text-neutral-500">{hint}</span>}
          </span>
        </div>
      )}
    </div>
  );
}
