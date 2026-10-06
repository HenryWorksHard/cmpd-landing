// Single source of truth for the strengthening programs. Read by the landing
// grid, the quiz matcher, and (later) the Stripe products / app entitlements.
// When Stripe is wired, each program gets a `priceId` here, in one place.
//
// These are the GENERALISED side of what CMPD sells: ongoing strength work for
// an area, which is near enough the same work for most people. An actual
// injury is not generalisable and does not belong here. That path is the
// intake form at /custom.
//
// The `id` values are entitlement keys. Rename anything else you like; do not
// rename these.
//
// PLACEHOLDER prices/weeks. Swap for the real programs.

export type Program = {
  id: string;          // stable slug, also the quiz answer value + entitlement key
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
    blurb: 'Overhead strength and control, rebuilt in order, for shoulders that need to stay robust.',
  },
  {
    id: 'lower-back',
    area: 'Lower Back',
    name: 'Lower Back Strength',
    weeks: 8,
    price: 49,
    blurb: 'A back that handles load. Bracing, hinging and carrying, progressed week by week.',
  },
  {
    id: 'knee',
    area: 'Knee',
    name: 'Knee Strength',
    weeks: 10,
    price: 59,
    blurb: 'Strength through the full range. Quads, hamstrings, calves, and the control around the joint.',
  },
  {
    id: 'hip',
    area: 'Hip',
    name: 'Hip & Glute Strength',
    weeks: 8,
    price: 49,
    blurb: 'Strong, stable hips and glutes. The base under every lift you do standing up.',
  },
  {
    id: 'neck',
    area: 'Neck & Upper Back',
    name: 'Neck & Upper Back Strength',
    weeks: 6,
    price: 39,
    blurb: 'Build the neck and upper back up so holding a position all day stops costing you.',
  },
  {
    id: 'return',
    area: 'Full Body',
    name: 'Return to Training',
    weeks: 12,
    price: 69,
    blurb: 'A progressive full body rebuild for coming back after a longer layoff.',
  },
];

export const getProgram = (id: string) => programs.find((p) => p.id === id);

// Interim CTA target until per-program Stripe Checkout is wired.
export const SIGNUP_URL = 'https://app.cmpdcollective.com/signup';
