// The injury intake form.
//
// ─────────────────────────────────────────────────────────────────────────
// INTERIM QUESTIONS. Swap this array for the real onboarding form — it is the
// only file that needs to change. Keep `name` values short and stable; they
// become the labels in the email that lands in the inbox.
// ─────────────────────────────────────────────────────────────────────────

export type Field =
  | { name: string; label: string; type: "text" | "email" | "tel"; required?: boolean; help?: string; placeholder?: string }
  | { name: string; label: string; type: "textarea"; required?: boolean; help?: string; placeholder?: string }
  | { name: string; label: string; type: "choice"; required?: boolean; help?: string; options: string[] };

export const INTAKE_FIELDS: Field[] = [
  { name: "name", label: "Your name", type: "text", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone", type: "tel", required: true, help: "So we can call you about a time." },
  {
    name: "area",
    label: "Where is the injury?",
    type: "choice",
    required: true,
    options: ["Shoulder", "Lower back", "Knee", "Hip", "Neck or upper back", "Ankle or foot", "Elbow or wrist", "More than one", "Other"],
  },
  {
    name: "history",
    label: "What happened, and when?",
    type: "textarea",
    required: true,
    help: "How it started, how long ago, and whether it has happened before.",
  },
  {
    name: "diagnosis",
    label: "Have you had a diagnosis, a scan or surgery?",
    type: "textarea",
    help: "What you were told, and by whom. Leave it blank if not.",
  },
  {
    name: "cleared",
    label: "Have you been cleared to train?",
    type: "choice",
    required: true,
    options: ["Yes", "Not yet", "Not sure"],
  },
  {
    name: "limits",
    label: "What hurts, and what feels fine?",
    type: "textarea",
    required: true,
    help: "Specific movements are more useful than a pain score.",
  },
  {
    name: "training",
    label: "What does your training look like now?",
    type: "textarea",
    help: "How often you get to the gym, and what you are still able to do.",
  },
  {
    name: "goal",
    label: "What do you want to get back to?",
    type: "textarea",
    required: true,
  },
];
