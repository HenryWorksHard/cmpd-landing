"use client";

import { useEffect, useState } from "react";

/**
 * Whether a file we would serve ourselves is actually there.
 *
 * Asked with a HEAD, so a large video is not downloaded twice just to find out
 * it exists, and asked at all because a <video> pointing at a missing file does
 * not reliably fire onError — rendering it first leaves an invisible empty box
 * with no way to tell whether it is loading, broken or simply not supplied yet.
 *
 * A slot whose file is missing renders nothing: no frame, no label, no gap. The
 * moment the file lands in public/media it appears, with nothing to deploy
 * beyond the commit. Layouts that change shape without their artwork read this
 * directly so they can pick the right one.
 */
export function useMediaExists(src: string, assumePresent = false): boolean {
  // A cross-origin HEAD is refused by CORS, which would report every real CDN
  // file as missing, so anything not ours is taken on trust.
  const ours = src.startsWith("/");
  const [there, setThere] = useState(!ours || assumePresent);

  useEffect(() => {
    if (!ours || assumePresent) return;
    let live = true;
    fetch(src, { method: "HEAD" })
      .then((r) => {
        if (live && r.ok) setThere(true);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [src, ours, assumePresent]);

  return there;
}
