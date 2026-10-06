import { NextResponse } from "next/server";
import {
  INTAKE_SECTIONS,
  isVisible,
  missingFrom,
  redFlagsIn,
  formatValue,
  type Values,
} from "../../intake-form";

// Where an injury intake submission goes.
//
// Email is the real path and needs two environment variables in Vercel:
//   RESEND_API_KEY  — a key on the CMPD Resend account
//   INTAKE_TO       — the inbox that should receive them
//   INTAKE_FROM     — optional; defaults to a verified cmpdcollective.com sender
//
// Until those are set the submission is still written to the server log with a
// findable tag, so nothing a visitor types is silently dropped — but a log is
// not an inbox, and this one carries health information. Set the variables.

export const runtime = "nodejs";

const FROM = process.env.INTAKE_FROM || "CMPD <intake@cmpdcollective.com>";

/** Laid out the way the form asks it, so it reads top to bottom on a phone. */
function format(values: Values): string {
  const flags = redFlagsIn(values);
  const head = flags.length
    ? [`SCREENING — answered YES to:`, ...flags.map((f) => `  - ${f}`), ""].join("\n")
    : "";

  const body = INTAKE_SECTIONS.map((s) => {
    const lines = s.fields
      .filter((f) => isVisible(f, values))
      .map((f) => `${f.label}\n  ${formatValue(values[f.name]) || "—"}`)
      .join("\n\n");
    return `${s.n} — ${s.title.toUpperCase()}\n\n${lines}`;
  }).join("\n\n\n");

  return head + body;
}

export async function POST(req: Request) {
  let values: Values;
  try {
    values = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
  if (!values || typeof values !== "object") {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // The same visibility rules the page used, so a question that was hidden on
  // screen can never be demanded here.
  const missing = missingFrom(values);
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing: ${missing.map((f) => f.label).join(", ")}` },
      { status: 422 },
    );
  }

  const flags = redFlagsIn(values);
  const who = [values.first_name, values.last_name].map((v) => formatValue(v)).join(" ").trim();
  const subject = `Injury intake — ${who || "no name"}${flags.length ? " — SCREENING FLAG" : ""}`;

  const key = process.env.RESEND_API_KEY;
  const to = process.env.INTAKE_TO;

  if (!key || !to) {
    // Nothing is thrown away, but this is a fallback and not a destination:
    // health information does not belong in a log drain. Set the variables.
    console.error("[cmpd-intake] NOT EMAILED — RESEND_API_KEY/INTAKE_TO unset\n" + format(values));
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: formatValue(values.email) || undefined,
        subject,
        text: format(values),
      }),
    });
    if (!r.ok) {
      console.error("[cmpd-intake] resend failed", r.status, await r.text(), "\n" + format(values));
      return NextResponse.json({ ok: true, delivered: false });
    }
  } catch (e) {
    console.error("[cmpd-intake] resend threw", e, "\n" + format(values));
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
