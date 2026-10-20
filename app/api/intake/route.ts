import { NextResponse } from "next/server";
import {
  INTAKE_SECTIONS,
  isVisible,
  missingFrom,
  redFlagsIn,
  formatValue,
  type Values,
} from "../../intake-form";

// Hands an injury intake form to the CMPD app, which stores it and tells Eddy.
//
// This site holds no database key and no mail key. It validates, shapes the
// answers, and posts them to app.cmpdcollective.com with a shared secret. The
// app owns the service role key and the Resend setup already, so there is one
// place that writes a row and one place that sends the notification.
//
// The important property: this route only reports success when the app has
// actually stored the submission. An earlier version accepted a form it could
// not store and told the person they were in the queue when they were not.

export const runtime = "nodejs";

const ENDPOINT =
  process.env.INTAKE_ENDPOINT || "https://app.cmpdcollective.com/api/intake";

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

  const secret = process.env.INTAKE_SECRET;
  if (!secret) {
    // Refusing is the honest answer. Accepting a form with nowhere to put it
    // is how the first enquiry was lost.
    console.error("[intake] INTAKE_SECRET is not set; refusing the submission");
    return NextResponse.json(
      { error: "The form is not accepting submissions right now." },
      { status: 503 },
    );
  }

  // Label with value, in the order the form asks, so the app can render and
  // email the whole thing without holding a copy of the questions.
  const fields = INTAKE_SECTIONS.flatMap((s) =>
    s.fields
      .filter((f) => isVisible(f, values))
      .map((f) => ({
        name: f.name,
        label: f.label,
        value: formatValue(values[f.name]),
      })),
  );

  const area = values.area;
  const payload = {
    first_name: formatValue(values.first_name),
    last_name: formatValue(values.last_name),
    email: formatValue(values.email),
    phone: formatValue(values.phone),
    areas: Array.isArray(area) ? area : area ? [String(area)] : [],
    red_flags: redFlagsIn(values),
    answers: { fields, values },
  };

  try {
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-intake-secret": secret },
      body: JSON.stringify(payload),
      // Manual, so an auth redirect is a failure rather than a success. Left
      // to follow, a 307 to a login page is a 200 by the time fetch returns
      // it, and this route would report a stored submission that never was.
      redirect: "manual",
      // A person is waiting on this button, and a hung request is worse than
      // a clear failure they can retry.
      signal: AbortSignal.timeout(15000),
    });

    // Only an explicit ok from the app counts. Anything else, including a
    // 2xx with the wrong body, is treated as not stored.
    const body = (await r.json().catch(() => null)) as { ok?: boolean; id?: string } | null;
    if (!r.ok || !body?.ok) {
      console.error("[intake] app did not store the submission", r.status, JSON.stringify(body));
      return NextResponse.json(
        { error: "We could not save that. Try again in a moment." },
        { status: 502 },
      );
    }
  } catch (e) {
    console.error("[intake] could not reach the app:", e);
    return NextResponse.json(
      { error: "We could not save that. Try again in a moment." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
