"use client";

import { useEffect, useRef } from "react";

/**
 * The hero card, which draws back slightly as the page rises over it.
 *
 * The card is sticky, so without this it sits perfectly still while the next
 * section slides across — which reads as the page covering a photograph.
 * Scaling it down a few percent as it goes makes it read as depth instead: the
 * card recedes and the content comes forward over it.
 *
 * Driven by a scroll listener rather than a scroll-linked CSS animation,
 * because animation-timeline is still missing from Safari and this is the first
 * thing anybody sees.
 *
 * Two things keep it cheap. The darkening is a black overlay's opacity rather
 * than a CSS filter: the same arithmetic, but the filter makes the compositor
 * re-filter a full-screen video layer on every frame while opacity is a
 * property it can change for free. And every write is quantised — the radius to
 * whole pixels, the rest to a step the eye cannot resolve — so a long scroll
 * touches the DOM a few dozen times instead of a few hundred. Border-radius in
 * particular is not a compositor property: each distinct value repaints the card.
 */
export default function HeroCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const dimRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const dim = dimRef.current;
    if (!el || !dim) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let lastStep = -1;
    const apply = () => {
      frame = 0;
      // 0 at the top, 1 by the time a full viewport has been scrolled.
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      // 100 steps over the whole travel: 0.07% of scale and 0.15px of radius
      // apart, which is below what a screen can show.
      const step = Math.round(p * 100);
      if (step === lastStep) return;
      lastStep = step;
      // Eased, so most of the movement happens early and it settles rather
      // than sliding linearly all the way down.
      const e = 1 - Math.pow(1 - step / 100, 2);
      el.style.transform = `scale(${(1 - e * 0.07).toFixed(4)})`;
      el.style.borderRadius = `${Math.round(25 + e * 15)}px`;
      dim.style.opacity = (e * 0.22).toFixed(3);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="nx-hero-card" ref={ref}>
      {children}
      <div className="nx-hero-dim" ref={dimRef} aria-hidden />
    </div>
  );
}
