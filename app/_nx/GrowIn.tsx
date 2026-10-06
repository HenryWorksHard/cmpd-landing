"use client";

import { useEffect, useRef } from "react";

/**
 * The inverse of the hero: starts drawn back and comes forward as you reach it.
 *
 * Scroll-linked rather than a one-shot reveal, so it tracks the wheel both ways
 * instead of firing once and stopping — which is what makes it read as the
 * counterpart to the hero receding rather than just another entrance.
 *
 * Progress runs from the moment the block's top enters the bottom of the
 * viewport to the moment its middle reaches the middle of the screen, so it is
 * at full size while you are actually looking at it rather than still growing.
 *
 * It only does any work while it is on screen: an observer switches the listener
 * on and off, and `will-change` with it, because a standing hint on a block this
 * large asks the compositor to hold a texture for it for the life of the page.
 * Writes are quantised too, so a slow scroll does not repaint on every frame for
 * a change of scale nobody can see. Respects reduced motion by doing nothing.
 */
export default function GrowIn({
  children,
  from = 0.9,
  className = "",
}: {
  children: React.ReactNode;
  /** Scale at the start. */
  from?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.transform = "none";
      return;
    }

    let frame = 0;
    let lastStep = -1;
    const apply = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 when the top is at the bottom edge, 1 when the middle is centred.
      const travel = vh * 0.5 + r.height * 0.5;
      const p = Math.min(1, Math.max(0, (vh - r.top) / travel));
      const step = Math.round(p * 100);
      if (step === lastStep) return;
      lastStep = step;
      const e = 1 - Math.pow(1 - step / 100, 3);
      el.style.transform = `scale(${(from + (1 - from) * e).toFixed(4)})`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    // Margin so it is already listening — and already promoted — by the time
    // any of it is visible, rather than starting to track a frame late.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.willChange = "transform";
          window.addEventListener("scroll", onScroll, { passive: true });
          apply();
        } else {
          window.removeEventListener("scroll", onScroll);
          el.style.willChange = "";
        }
      },
      { rootMargin: "25% 0px" },
    );
    io.observe(el);
    window.addEventListener("resize", onScroll, { passive: true });
    apply();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [from]);

  return (
    <div ref={ref} className={`nx-grow ${className}`}>
      {children}
    </div>
  );
}
