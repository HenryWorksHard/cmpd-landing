'use client';

import { useCheckout } from './useCheckout';

// The only interactive part of the price card, so it is the only part of it
// that ships as a client component. Everything around it is static.

export default function BuyButton({ slug }: { slug: string }) {
  const { buy, busy, error } = useCheckout(slug);

  return (
    <>
      <button
        onClick={buy}
        disabled={busy}
        className="mt-6 block w-full rounded-md bg-accent py-4 text-center text-lg font-bold text-neutral-950 transition-colors hover:bg-accent-light disabled:opacity-60"
      >
        {busy ? 'Taking you to checkout' : 'Start this program'}
      </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </>
  );
}
