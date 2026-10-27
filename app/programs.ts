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
// Prices are $19.99 AUD per week of programming, with the total rounded to a
// .99 ending so it reads as a price and not the output of a multiplication
// (8 x 19.99 is 159.92; we charge 159.99). Never more than 12c out. Change the rate in ONE place: edit the prices
// here to match. Four sessions a week means the per-session figure is the rate
// divided by four, which is the number worth putting in front of someone — a
// single physio appointment is $90 or more.

export type Program = {
  id: string;          // stable slug, also the quiz answer value + entitlement key
  area: string;        // area shown on the card + quiz option
  name: string;
  weeks: number;
  price: number;       // one-time, in AUD. roughly weeks * 19.99, ending .99.
  blurb: string;
  // priceId?: string;  // ← Stripe price id, added in the Stripe phase
};

export const programs: Program[] = [
  {
    id: 'shoulder',
    area: 'Shoulder',
    name: 'Shoulder Strength',
    weeks: 8,
    price: 159.99,
    blurb: 'Overhead strength and control, rebuilt in order, for shoulders that need to stay robust.',
  },
  {
    id: 'lower-back',
    area: 'Lower Back',
    name: 'Lower Back Strength',
    weeks: 8,
    price: 159.99,
    blurb: 'A back that handles load. Bracing, hinging and carrying, progressed week by week.',
  },
  {
    id: 'knee',
    area: 'Knee',
    name: 'Knee Strength',
    weeks: 10,
    price: 199.99,
    blurb: 'Strength through the full range. Quads, hamstrings, calves, and the control around the joint.',
  },
  {
    id: 'hip',
    area: 'Hip',
    name: 'Hip & Glute Strength',
    weeks: 8,
    price: 159.99,
    blurb: 'Strong, stable hips and glutes. The base under every lift you do standing up.',
  },
  {
    id: 'neck',
    area: 'Neck & Upper Back',
    name: 'Neck & Upper Back Strength',
    weeks: 6,
    price: 119.99,
    blurb: 'Build the neck and upper back up so holding a position all day stops costing you.',
  },
  {
    id: 'return',
    area: 'Full Body',
    name: 'Return to Training',
    weeks: 12,
    price: 239.99,
    blurb: 'A progressive full body rebuild for coming back after a longer layoff.',
  },
];

export const getProgram = (id: string) => programs.find((p) => p.id === id);

// ── how the price gets said out loud ──────────────────────────────────────
// $120 is a number people weigh up. $3.75 a session is a number they compare
// to a coffee, and it is the same fact. Both are shown: the total so nobody
// feels misled, the per-session line so the total lands in proportion.

/** Sessions in the whole program. Every program runs four a week. */
export const SESSIONS_PER_WEEK = 4;

export const sessionCount = (p: Program) => p.weeks * SESSIONS_PER_WEEK;

/** e.g. "3.75" — trailing zeros kept, because $3.8 reads like a mistake. */
export const perSession = (p: Program) =>
  (p.price / sessionCount(p)).toFixed(2);

/** e.g. "2.14" */
export const perDay = (p: Program) => (p.price / (p.weeks * 7)).toFixed(2);
