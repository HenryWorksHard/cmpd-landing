"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A number that counts up the first time it is scrolled into view.
 *
 * Once only, and never while it is off screen — a counter that animates where
 * nobody is looking is just work. Renders inline so it can sit inside a line of
 * type. Respects reduced motion by showing the final value immediately.
 */
export default function Counter({
  to,
  duration = 1200,
}: {
  to: number;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(0);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setN(to);

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || done.current) return;
        done.current = true;
        io.disconnect();
        const start = performance.now();
        const step = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          // Ease out, so it decelerates into the final number rather than
          // stopping dead on it.
          setN(Math.round(to * (1 - Math.pow(1 - t, 3))));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [to, duration]);

  return <span ref={ref}>{n}</span>;
}
