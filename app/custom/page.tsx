"use client";

import { useState } from "react";
import Link from "next/link";
import Nav from "../_nx/Nav";
import Reveal from "../_nx/Reveal";
import { INTAKE_FIELDS } from "../intake-form";

// The individualised path.
//
// A generalised strengthening program is the right answer for keeping an area
// strong and the wrong answer for an actual injury, so the two are separated at
// the top of the site: the quiz sells a program, this collects enough detail to
// talk about one. Nothing is charged here — it ends in a call.
//
// The questions live in ../intake-form.ts and the submission goes to
// /api/intake. Swap the questions there; nothing on this page needs touching.

const STEPS = [
  { n: "01", t: "Fill this in", b: "The more specific you are about what happened and what hurts, the less of the call is spent on it." },
  { n: "02", t: "Eddy reads it", b: "Before you speak, not during. If it is not something that should be trained around yet, you will be told that." },
  { n: "03", t: "We book a call", b: "Fifteen minutes to go through it, and then a program written for your presentation." },
];

export default function CustomPage() {
  const [values, setValues] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (name: string, v: string) => setValues((p) => ({ ...p, [name]: v }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const missing = INTAKE_FIELDS.filter((f) => f.required && !(values[f.name] ?? "").trim());
    if (missing.length) {
      setError(`Still needed: ${missing.map((f) => f.label).join(", ")}`);
      return;
    }

    setSending(true);
    try {
      const r = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error ?? "Something went wrong");
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Try again in a moment.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="nx">
      <Nav />

      <main className="nx-section nx-wrap nx-page">
        <div className="nx-narrow">
          <Reveal>
            <span className="nx-eyebrow">Custom program</span>
            <h1 className="nx-h2 nx-head">
              An injury is not
              <br />
              a generalisable problem.
            </h1>
            <p className="nx-lead" style={{ marginTop: "clamp(18px, 2vw, 26px)", maxWidth: "52ch" }}>
              Keeping a shoulder or a knee strong is close enough to the same work for most
              people — that is what the programs on the site are. An injury is not: it
              depends on what happened, what you can load today, and what you cannot. That
              one gets written for you.
            </p>
          </Reveal>

          <Reveal delay={100}>
            <ol className="nx-steps" style={{ marginTop: "clamp(28px, 4vw, 48px)" }}>
              {STEPS.map((s) => (
                <li key={s.n} className="nx-step">
                  <div className="nx-step-head">
                    <span className="nx-step-n">{s.n}</span>
                    <h3 className="nx-step-title">{s.t}</h3>
                    <p className="nx-step-body">{s.b}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          {sent ? (
            <div className="nx-done">
              <h2>Sent.</h2>
              <p>
                Eddy reads these himself, so it will not be instant — expect to hear back
                within a couple of days to put a time in.
              </p>
              <p>
                In the meantime, do not start loading anything that hurts because a website
                told you to. If you have not been cleared, get cleared.
              </p>
              <Link href="/" className="nx-btn">
                Back to the site
              </Link>
            </div>
          ) : (
            <form className="nx-form" onSubmit={submit} noValidate>
              {INTAKE_FIELDS.map((f) => (
                <div key={f.name} className="nx-field">
                  <label htmlFor={f.name}>
                    {f.label} {!f.required && <span>(optional)</span>}
                  </label>
                  {f.help && <span className="nx-field-help">{f.help}</span>}

                  {f.type === "textarea" ? (
                    <textarea
                      id={f.name}
                      value={values[f.name] ?? ""}
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  ) : f.type === "choice" ? (
                    <div className="nx-choices" id={f.name}>
                      {f.options.map((o) => (
                        <button
                          key={o}
                          type="button"
                          className={`nx-choice${values[f.name] === o ? " on" : ""}`}
                          aria-pressed={values[f.name] === o}
                          onClick={() => set(f.name, o)}
                        >
                          {o}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <input
                      id={f.name}
                      type={f.type}
                      value={values[f.name] ?? ""}
                      placeholder={f.placeholder}
                      onChange={(e) => set(f.name, e.target.value)}
                    />
                  )}
                </div>
              ))}

              <div className="nx-form-foot">
                <button type="submit" className="nx-btn" disabled={sending}>
                  {sending ? "Sending" : "Send it"}
                </button>
                {error && <span className="nx-form-err">{error}</span>}
              </div>

              <p className="nx-note">
                This is not medical advice and nothing here is a diagnosis. If you have not
                been cleared to train, see a qualified healthcare professional first.
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
