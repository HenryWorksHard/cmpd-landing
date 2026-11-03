'use client';

import { useEffect, useState } from 'react';
import { useCheckout } from './useCheckout';

// The phone version of the price card.
//
// On a laptop the card is sticky in the right-hand column and never leaves
// the screen. A phone has no room for that, so the card scrolls away with
// everything else and this takes over once it does: the price and the button
// stay one thumb-reach away for the rest of the page.
//
// It is tied to the card actually leaving the viewport rather than to a
// scroll distance, so there is never a moment with two prices on screen.
// Hidden from `lg` up, where the real card is still there.

export default function StickyBuy({
  slug, perSession, total,
}: {
  slug: string;
  perSession: string;
  total: number;
}) {
  const { buy, busy, error } = useCheckout(slug);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const card = document.getElementById('buy-card');
    if (!card) return;
    const io = new IntersectionObserver(
      ([e]) => setShow(!e.isIntersecting),
      { rootMargin: '-8px 0px 0px 0px' },
    );
    io.observe(card);
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-neutral-800 bg-neutral-950/95 backdrop-blur-xl transition-transform duration-300 lg:hidden ${
        show ? 'translate-y-0' : 'pointer-events-none translate-y-full'
      }`}
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center gap-3 px-5 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="text-lg font-bold leading-tight">${perSession}</p>
          <p className="truncate text-xs text-neutral-400">a session, ${total} once</p>
        </div>
        <button
          onClick={buy}
          disabled={busy || !show}
          className="ml-auto shrink-0 rounded-md bg-accent px-6 py-3 text-base font-bold text-neutral-950 transition-colors hover:bg-accent-light disabled:opacity-60"
        >
          {busy ? 'One moment' : 'Start'}
        </button>
      </div>
      {error && <p className="px-5 pb-3 text-sm text-red-400 sm:px-6">{error}</p>}
    </div>
  );
}
