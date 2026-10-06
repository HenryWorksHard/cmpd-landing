import { NextResponse } from "next/server";
import { INTAKE_FIELDS } from "../../intake-form";

// Where an injury intake submission goes.
//
// Email is the real path and needs two environment variables in Vercel:
//   RESEND_API_KEY  — a key on the CMPD Resend account
//   INTAKE_TO       — the inbox that should receive them
//   INTAKE_FROM     — optional; defaults to a verified cmpdcollective.com sender
//
// Until those are set the submission is still written to the server log with a
// findable tag, so nothing a visitor types is silently dropped — but a log is
// not an inbox. Set the variables before this is promoted anywhere public.

export const runtime = "nodejs";

const FROM = process.env.INTAKE_FROM || "CMPD <intake@cmpdcollective.com>";

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Validated against the form definition rather than a second copy of it.
  const missing = INTAKE_FIELDS.filter(
    (f) => f.required && !String(body[f.name] ?? "").trim(),
  ).map((f) => f.label);
  if (missing.length) {
    return NextResponse.json({ error: `Missing: ${missing.join(", ")}` }, { status: 422 });
  }

  const text = INTAKE_FIELDS.map(
    (f) => `${f.label}\n${String(body[f.name] ?? "").trim() || "—"}`,
  ).join("\n\n");
  const who = String(body.name ?? "someone").trim();

  // Always, so a failed or unconfigured send is still recoverable.
  console.log("[cmpd-intake]", JSON.stringify(body));

  const key = process.env.RESEND_API_KEY;
  const to = process.env.INTAKE_TO;
  if (!key || !to) {
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM,
        to: [to],
        reply_to: String(body.email ?? "").trim() || undefined,
        subject: `Injury intake — ${who}`,
        text,
      }),
    });
    if (!r.ok) {
      console.error("[cmpd-intake] resend failed", r.status, await r.text());
      return NextResponse.json({ ok: true, delivered: false });
    }
  } catch (e) {
    console.error("[cmpd-intake] resend threw", e);
    return NextResponse.json({ ok: true, delivered: false });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
