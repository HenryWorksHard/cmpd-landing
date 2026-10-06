// The handful of facts the nav, the footer, the quiz and the intake form all
// need to agree on.

export const NAV_LINKS = [
  { href: "/#how", label: "How it works" },
  { href: "/#programs", label: "Programs" },
  { href: "/#app", label: "In the app" },
  { href: "/custom", label: "Custom program" },
  { href: "/#questions", label: "Questions" },
];

export const APP_URL = "https://app.cmpdcollective.com";
export const LOGIN_URL = `${APP_URL}/login`;

// The individualised path: an injury is not generalisable, so it goes through
// an intake form and a call rather than a checkout.
export const CUSTOM_URL = "/custom";
