// Single source of truth for the injury programs. Read by the landing
// grid, the quiz matcher, and (later) the Stripe products / app entitlements.
// When Stripe is wired, each program gets a `priceId` here — one place.
//
// PLACEHOLDER prices/weeks/blurbs — swap for the real programs.

export type Program = {
  id: string;          // stable slug — also the quiz answer value + future entitlement key
  area: string;        // injury area shown on the card + quiz option
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
    name: 'Shoulder Rebuild',
    weeks: 8,
    price: 49,
    blurb: 'Restore pain-free overhead strength after impingement, rotator-cuff strain, or instability.',
  },
  {
    id: 'lower-back',
    area: 'Lower Back',
    name: 'Lower Back Reset',
    weeks: 8,
    price: 49,
    blurb: 'Build a resilient spine and train around disc, SI-joint, and general lower-back pain.',
  },
  {
    id: 'knee',
    area: 'Knee',
    name: 'Knee Recovery',
    weeks: 10,
    price: 59,
    blurb: 'Rebuild strength and confidence after ligament, meniscus, or patellar issues.',
  },
  {
    id: 'hip',
    area: 'Hip',
    name: 'Hip & Glute Rehab',
    weeks: 8,
    price: 49,
    blurb: 'Address hip pain and imbalance, and rebuild strong, stable hips and glutes.',
  },
  {
    id: 'neck',
    area: 'Neck & Upper Back',
    name: 'Neck & Posture',
    weeks: 6,
    price: 39,
    blurb: 'Relieve neck and upper-back tension and build posture that holds up all day.',
  },
  {
    id: 'return',
    area: 'Full Body',
    name: 'Return to Training',
    weeks: 12,
    price: 69,
    blurb: 'A progressive rebuild for coming back to full training after a longer layoff.',
  },
];

export const getProgram = (id: string) => programs.find((p) => p.id === id);

// Interim CTA target until per-program Stripe Checkout is wired.
export const SIGNUP_URL = 'https://app.cmpdcollective.com/signup';
