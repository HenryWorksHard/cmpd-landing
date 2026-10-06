"use client";

import { useEffect, useRef, useState } from "react";

type From = "up" | "left" | "right" | "scale";

/**
 * Reveals its children when they are scrolled into view.
 *
 * It fires once and stays: for text and images, animating out and back in as
 * you scroll past twice reads as a glitch.
 *
 * The trigger deliberately waits until the element is properly inside the
 * viewport rather than the moment its top edge appears — otherwise a tall card
 * finishes animating while it is still below the fold and you never see it move.
 *
 * Everything is rendered from the start and only opacity and transform change,
 * so nothing here affects what a reader without JavaScript sees.
 * prefers-reduced-motion skips it entirely.
 */
export default function Reveal({
  children,
  from = "up",
  delay = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  from?: From;
  /** Milliseconds, for staggering a row of siblings. */
  delay?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return setShown(true);

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setShown(true);
        io.disconnect();
      },
      // Pulled well inside the viewport: the element has to be visibly on
      // screen before it starts, or the movement happens off the bottom edge.
      { threshold: 0, rootMargin: "-10% 0px -16% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      // One ref across four possible tags; the observer only reads bounds.
      ref={ref as React.Ref<never>}
      className={`nx-reveal nx-from-${from}${shown ? " nx-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
