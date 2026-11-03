'use client';

import { useState } from 'react';

// The only interactive part of the sales page, so it is the only part that
// ships as a client component. Everything else is static.

export default function BuyButton({ slug }: { slug: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function buy() {
    setError(null);
    setBusy(true);
    try {
      const r = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug }),
      });
      const d = await r.json().catch(() => null);
      if (!r.ok || !d?.url) throw new Error(d?.error ?? 'Could not start checkout.');
      window.location.href = d.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not start checkout.');
      setBusy(false);
    }
  }

  return (
    <>
      <button
        onClick={buy}
        disabled={busy}
        className="mt-6 block w-full rounded-md bg-accent py-4 text-center text-lg font-bold text-neutral-950 transition-colors hover:bg-accent-light disabled:opacity-60"
      >
        {busy ? 'Taking you to checkout' : 'Get this program'}
      </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </>
  );
}
