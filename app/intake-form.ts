// The injury intake form.
//
// This is the clinical intake, taken verbatim from the practice's own form: it
// is read before the call, so it is worth more than a contact form would be.
// Five sections, and the questions are the questions — do not trim them to make
// the page shorter.
//
// Everything downstream is driven from this file. The page renders it, the API
// route validates against it and formats the email from it, so adding or moving
// a question means editing here and nowhere else.

export type Visibility = {
  /** Shown only when this other field's value is (or, for a multi, contains) one of these. */
  field: string;
  equals: string[];
};

type Base = {
  name: string;
  label: string;
  required?: boolean;
  help?: string;
  showIf?: Visibility;
};

export type Field =
  | (Base & { type: "text" | "email" | "tel" | "date"; placeholder?: string })
  | (Base & { type: "textarea"; placeholder?: string })
  /** One answer. */
  | (Base & { type: "choice"; options: string[] })
  /** Any number of answers. */
  | (Base & { type: "multi"; options: string[] })
  /** A row of numbers, e.g. a 0–10 pain scale or 0–7 days a week. */
  | (Base & { type: "scale"; min: number; max: number; minLabel?: string; maxLabel?: string });

export type Section = { n: string; title: string; note?: string; fields: Field[] };

export const INTAKE_SECTIONS: Section[] = [
  {
    n: "01",
    title: "Patient and contact information",
    fields: [
      { name: "first_name", label: "First name", type: "text", required: true },
      { name: "last_name", label: "Last name", type: "text", required: true },
      { name: "dob", label: "Date of birth", type: "date", required: true },
      {
        name: "gender",
        label: "Gender identity",
        type: "choice",
        options: ["Male", "Female", "Non-binary", "Prefer not to say"],
      },
      { name: "phone", label: "Phone number", type: "tel", required: true },
      { name: "email", label: "Email address", type: "email", required: true },
      {
        name: "address",
        label: "Residential address",
        type: "text",
        required: true,
        placeholder: "Street, suburb, postcode",
      },
      {
        name: "emergency_contact",
        label: "Emergency contact",
        type: "text",
        required: true,
        placeholder: "Name and relationship",
      },
      { name: "emergency_phone", label: "Emergency contact phone", type: "tel", required: true },
    ],
  },

  {
    n: "02",
    title: "Primary complaint and symptom history",
    fields: [
      {
        name: "area",
        label: "What is your primary musculoskeletal concern, or area of pain or discomfort?",
        type: "multi",
        required: true,
        help: "Pick the side where it applies.",
        options: [
          "Lower back",
          "Neck / cervical",
          "Shoulder — left",
          "Shoulder — right",
          "Shoulder — both",
          "Knee — left",
          "Knee — right",
          "Knee — both",
          "Hip or groin — left",
          "Hip or groin — right",
          "Hip or groin — both",
          "Ankle / foot",
          "Other",
        ],
      },
      {
        name: "area_other",
        label: "Please specify",
        type: "text",
        required: true,
        showIf: { field: "area", equals: ["Other"] },
      },
      {
        name: "duration",
        label: "How long have you had it?",
        type: "choice",
        required: true,
        options: ["Acute — less than 6 weeks", "Sub-acute — 6 to 12 weeks", "Chronic — more than 3 months"],
      },
      {
        name: "onset",
        label: "How did the issue begin?",
        type: "choice",
        required: true,
        options: [
          "Sudden onset, a specific incident or injury",
          "Gradual onset over time",
          "Post-surgical recovery",
          "Unsure",
        ],
      },
      { name: "pain_rest", label: "Pain at rest", type: "scale", min: 0, max: 10, required: true, minLabel: "None", maxLabel: "Worst imaginable" },
      { name: "pain_movement", label: "Pain with movement or activity", type: "scale", min: 0, max: 10, required: true, minLabel: "None", maxLabel: "Worst imaginable" },
      { name: "pain_best", label: "Best it has been in the last 24 hours", type: "scale", min: 0, max: 10, required: true },
      { name: "pain_worst", label: "Worst it has been in the last 24 hours", type: "scale", min: 0, max: 10, required: true },
      {
        name: "aggravators",
        label: "What activities or movements make it worse?",
        type: "textarea",
        required: true,
        help: "For example sitting, squatting, reaching overhead, walking.",
      },
      {
        name: "relievers",
        label: "What makes it better?",
        type: "textarea",
        required: true,
        help: "For example rest, heat, movement, medication.",
      },
      {
        name: "pain_pattern",
        label: "Is the pain constant or intermittent?",
        type: "choice",
        required: true,
        options: ["Constant", "Intermittent"],
      },
      {
        name: "pain_when",
        label: "When is it worst?",
        type: "choice",
        required: true,
        options: ["Morning", "During activity", "Evening", "Night", "Variable"],
      },
    ],
  },

  {
    n: "03",
    title: "Prior diagnosis and practitioner care",
    fields: [
      {
        name: "seen_practitioner",
        label:
          "Have you seen a doctor, specialist or allied health practitioner for a formal diagnosis of this condition?",
        type: "choice",
        required: true,
        options: ["Yes", "No"],
      },
      {
        name: "practitioner_type",
        label: "Which practitioner did you see?",
        type: "multi",
        required: true,
        showIf: { field: "seen_practitioner", equals: ["Yes"] },
        options: [
          "General practitioner",
          "Sports physician or specialist medical doctor",
          "Physiotherapist",
          "Chiropractor or osteopath",
          "Other",
        ],
      },
      {
        name: "practitioner_other",
        label: "Please specify",
        type: "text",
        required: true,
        showIf: { field: "practitioner_type", equals: ["Other"] },
      },
      {
        name: "diagnosis",
        label: "What diagnosis or explanation were you given?",
        type: "textarea",
        required: true,
        showIf: { field: "seen_practitioner", equals: ["Yes"] },
      },
      {
        name: "imaging",
        label: "Have you had any imaging or diagnostic scans for this condition?",
        type: "multi",
        required: true,
        options: ["X-ray", "MRI", "Ultrasound", "CT scan", "None"],
      },
      {
        name: "imaging_findings",
        label: "What did they find?",
        type: "textarea",
        help: "If you know. Leave it blank if not.",
        showIf: { field: "imaging", equals: ["X-ray", "MRI", "Ultrasound", "CT scan"] },
      },
      {
        name: "prior_surgery",
        label: "Any previous surgery, fracture or major injury to this area?",
        type: "choice",
        required: true,
        options: ["Yes", "No"],
      },
      {
        name: "prior_surgery_detail",
        label: "Which region, and roughly what year?",
        type: "textarea",
        required: true,
        showIf: { field: "prior_surgery", equals: ["Yes"] },
      },
      {
        name: "comorbidities",
        label: "Do any of these apply to you?",
        type: "multi",
        required: true,
        help: "Check everything that applies.",
        options: [
          "High blood pressure or cardiovascular disease",
          "Diabetes or a metabolic condition",
          "Osteoarthritis or rheumatoid arthritis",
          "Osteoporosis or osteopenia",
          "Currently or recently pregnant",
          "None of the above",
        ],
      },
    ],
  },

  {
    n: "04",
    title: "Baseline activity and goals",
    fields: [
      {
        name: "days_light",
        label: "Days a week of light to moderate activity",
        type: "scale",
        min: 0,
        max: 7,
        required: true,
        help: "Walking, light exercise.",
      },
      { name: "days_strength", label: "Days a week of structured resistance or strength training", type: "scale", min: 0, max: 7, required: true },
      { name: "days_cardio", label: "Days a week of aerobic or cardio training", type: "scale", min: 0, max: 7, required: true },
      {
        name: "where",
        label: "Where do you exercise, or plan to?",
        type: "multi",
        required: true,
        options: ["Home", "Commercial gym", "Outdoors", "EP clinic"],
      },
      {
        name: "equipment",
        label: "What equipment do you have access to?",
        type: "multi",
        required: true,
        options: ["Dumbbells", "Barbells", "Bands", "Cardio machines", "Bodyweight only"],
      },
      {
        name: "goals",
        label: "What are you after?",
        type: "multi",
        required: true,
        options: [
          "Pain relief and symptom reduction",
          "Better joint mobility and movement quality",
          "More muscle strength and joint support",
          "General health, aerobic fitness and longevity",
          "Return to sport or a specific activity",
          "Body composition",
        ],
      },
    ],
  },

  {
    n: "05",
    title: "Screening",
    note: "Three questions that decide whether this is a training problem at all. Answer them honestly.",
    fields: [
      {
        name: "rf_neuro",
        label:
          "Are you getting any unexplained numbness, tingling or weakness in your arms or legs?",
        type: "choice",
        required: true,
        options: ["Yes", "No"],
      },
      {
        name: "rf_systemic",
        label:
          "Any recent unexplained weight change, or change in bowel or bladder function?",
        type: "choice",
        required: true,
        options: ["Yes", "No"],
      },
      {
        name: "rf_night",
        label:
          "Any night pain that wakes you from sleep and does not ease when you move?",
        type: "choice",
        required: true,
        options: ["Yes", "No"],
      },
    ],
  },
];

/** Flat, in order — what the API route validates and formats against. */
export const INTAKE_FIELDS: Field[] = INTAKE_SECTIONS.flatMap((s) => s.fields);

export type Values = Record<string, string | string[]>;

const asArray = (v: string | string[] | undefined): string[] =>
  v === undefined ? [] : Array.isArray(v) ? v : [v];

/**
 * A conditional field is only asked, and only required, when its condition
 * holds. Both the page and the route go through this, so a question hidden on
 * screen can never be demanded by the server.
 */
export function isVisible(field: Field, values: Values): boolean {
  if (!field.showIf) return true;
  const got = asArray(values[field.showIf.field]);
  return field.showIf.equals.some((want) => got.includes(want));
}

export function missingFrom(values: Values): Field[] {
  return INTAKE_FIELDS.filter((f) => {
    if (!f.required || !isVisible(f, values)) return false;
    const v = values[f.name];
    return Array.isArray(v) ? v.length === 0 : !String(v ?? "").trim();
  });
}

/** The three screening questions, and which of them came back Yes. */
export const RED_FLAGS = ["rf_neuro", "rf_systemic", "rf_night"] as const;

export function redFlagsIn(values: Values): string[] {
  return RED_FLAGS.filter((n) => values[n] === "Yes").map(
    (n) => INTAKE_FIELDS.find((f) => f.name === n)?.label ?? n,
  );
}

export const formatValue = (v: string | string[] | undefined): string =>
  Array.isArray(v) ? v.join(", ") : String(v ?? "").trim();
