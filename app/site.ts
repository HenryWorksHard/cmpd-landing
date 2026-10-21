// The handful of facts the nav, the footer and the quiz all need to agree on.

export const NAV_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#programs", label: "Programs" },
  { href: "/custom", label: "Custom program" },
];

export const APP_URL = "https://app.cmpdcollective.com";
export const LOGIN_URL = `${APP_URL}/login`;

// The individualised path: an injury is not generalisable, so it goes through
// an intake form and a call rather than a checkout.
export const CUSTOM_URL = "/custom";

// The medical disclaimer, in one place so the footer and the intake form can
// never drift apart. Wording is Eddy's; do not paraphrase it.
export const MEDICAL_DISCLAIMER =
  "CMPD programs are written and are produced according to best practices for pre-diagnosed conditions or injuries. CMPD should not be used to diagnose injury or medical conditions; consult a medical professional and seek any required clearance to commence CMPD training.";
