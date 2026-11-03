'use client';

import { useState } from 'react';

// One checkout call, shared by the button in the price card and the one in
// the sticky bar. Two copies of this drifted apart the moment one of them
// got an error message the other did not.

export function useCheckout(slug: string) {
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

  return { buy, busy, error };
}
