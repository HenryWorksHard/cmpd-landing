// Single source of truth for the strengthening programs. Read by the landing
// grid, the quiz matcher, and (later) the Stripe products / app entitlements.
// When Stripe is wired, each program gets a `priceId` here — one place.
//
// These are the GENERALISED side of what CMPD sells: ongoing strength work for
// an area, which is near enough the same work for most people. An actual
// injury is not generalisable and does not belong here — that path is the
// intake form at /custom.
//
// The `id` values are entitlement keys. Rename anything else you like; do not
// rename these.
//
// PLACEHOLDER prices/weeks — swap for the real programs.

export type Program = {
  id: string;          // stable slug — also the quiz answer value + entitlement key
  area: string;        // area shown on the card + quiz option
  name: string;
  weeks: number;
  price: number;       // one-time, in whole dollars (placeholder)
  blurb: string;
  // priceId?: string;  // ← Stripe price id, added in the Stripe phase
};

export const programs: Program[] = [
  {
    id: 'shoulder',
    area: 'Shoulder',
    name: 'Shoulder Strength',
    weeks: 8,
    price: 49,
    blurb:
      'Overhead strength and control, built back up in order — for shoulders that have been through something and need to stay robust.',
  },
  {
    id: 'lower-back',
    area: 'Lower Back',
    name: 'Lower Back Strength',
    weeks: 8,
    price: 49,
    blurb:
      'A back that handles load: bracing, hinging and carrying, progressed week by week instead of avoided.',
  },
  {
    id: 'knee',
    area: 'Knee',
    name: 'Knee Strength',
    weeks: 10,
    price: 59,
    blurb:
      'Strength through the full range — quads, hamstrings, calves, and the control around the joint that holds it together.',
  },
  {
    id: 'hip',
    area: 'Hip',
    name: 'Hip & Glute Strength',
    weeks: 8,
    price: 49,
    blurb:
      'Strong, stable hips and glutes. The base under every lift you do standing up, and the first thing to go quiet when it is sore.',
  },
  {
    id: 'neck',
    area: 'Neck & Upper Back',
    name: 'Neck & Upper Back Strength',
    weeks: 6,
    price: 39,
    blurb:
      'Build the neck and upper back up so holding a position all day stops costing you something.',
  },
  {
    id: 'return',
    area: 'Full Body',
    name: 'Return to Training',
    weeks: 12,
    price: 69,
    blurb:
      'A progressive full-body rebuild for coming back after a longer layoff, at a rate you can actually hold.',
  },
];

export const getProgram = (id: string) => programs.find((p) => p.id === id);

// Interim CTA target until per-program Stripe Checkout is wired.
export const SIGNUP_URL = 'https://app.cmpdcollective.com/signup';
