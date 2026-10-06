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
 * The frame names the exact path to drop the file at and the shape it should
 * be, so filling the page in is a matter of copying files into public/media
 * with no code to touch.
 */
export default function Media({
  src,
  kind = "image",
  ratio = "nx-16x9",
  label,
  hint,
  poster,
  className = "",
  priority = false,
}: {
  /** Where the file goes, e.g. /media/hero.mp4 */
  src: string;
  kind?: "image" | "video";
  ratio?: "nx-16x9" | "nx-4x3" | "nx-1x1" | "nx-5x3" | "nx-9x16";
  /** What the slot is for — shown on the placeholder. */
  label: string;
  /** What the file should look like, e.g. "9:16 vertical, 10-20s silent loop". */
  hint?: string;
  poster?: string;
  className?: string;
  /** Above the fold: skip the existence probe and load at once. */
  priority?: boolean;
}) {
  // Only our own files are probed. A cross-origin HEAD is refused by CORS,
  // which would report every real CDN image as missing.
  const ours = src.startsWith("/");
  // A priority slot is one we know is filled, so it renders immediately rather
  // than waiting a round trip to ask — that probe sits in front of the hero.
  const [there, setThere] = useState(!ours || priority);

  useEffect(() => {
    if (!ours || priority) return;
    let live = true;
    // HEAD, so a large video is not downloaded twice just to find out it exists.
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
    <div className={`nx-media ${ratio} ${className}`}>
      {there &&
        (kind === "video" ? (
          <video
            src={src}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            // The hero is worth fetching eagerly; anything below the fold is
            // not, and a page of autoplaying videos all preloading is what
            // makes a site crawl on a phone.
            preload={priority ? "auto" : "metadata"}
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
          />
        ))}
      {!there && (
        <div className="nx-ph">
          <span>
            <b>{label}</b>
            <code>{src}</code>
            {hint && <small>{hint}</small>}
          </span>
        </div>
      )}
    </div>
  );
}
