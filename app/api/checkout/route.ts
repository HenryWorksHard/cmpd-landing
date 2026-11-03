import { NextResponse } from "next/server";
import { programs } from "../../programs";

// Starts a Stripe Checkout for a program.
//
// Forwards to the CMPD app, which owns the Stripe key and resolves the actual
// amount from Stripe by lookup key. Going through here rather than calling the
// app from the browser keeps it same-origin, so there is no CORS to configure
// and no key anywhere near this site.

export const runtime = "nodejs";

const ENDPOINT =
  process.env.CHECKOUT_ENDPOINT ||
  "https://app.cmpdcollective.com/api/checkout/program";

export async function POST(req: Request) {
  let body: { slug?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }

  // Only something we actually sell. The app checks again against the
  // database; this is just so a bad slug fails fast and locally.
  const program = programs.find((p) => p.id === body.slug);
  if (!program) {
    return NextResponse.json({ error: "Unknown program" }, { status: 422 });
  }

  try {
    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug: program.id }),
      // Manual, for the same reason as the intake route: an auth redirect
      // answered as a 307 would otherwise come back looking like a success.
      redirect: "manual",
      signal: AbortSignal.timeout(15000),
    });

    const data = (await r.json().catch(() => null)) as
      | { url?: string; error?: string }
      | null;

    if (!r.ok || !data?.url) {
      console.error("[checkout] app would not start a session", r.status, JSON.stringify(data));
      return NextResponse.json(
        { error: data?.error || "Could not start checkout. Try again in a moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ url: data.url });
  } catch (e) {
    console.error("[checkout] could not reach the app:", e);
    return NextResponse.json(
      { error: "Could not start checkout. Try again in a moment." },
      { status: 502 },
    );
  }
}
