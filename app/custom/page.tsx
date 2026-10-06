'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Nav from '../_components/Nav';
import {
  INTAKE_SECTIONS,
  isVisible,
  missingFrom,
  redFlagsIn,
  type Field,
  type Values,
} from '../intake-form';

// The individualised path.
//
// A generalised strengthening program is the right answer for keeping an area
// strong and the wrong answer for an actual injury, so the two are separated at
// the top of the site: the quiz sells a program, this collects enough to talk
// about one. Nothing is charged here; it ends in a call.
//
// The questions all live in ../intake-form.ts. This page only knows how to
// render the field types and how to hide a question whose condition does not
// hold; it does not know what any individual question is.

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const steps = [
  { n: '01', t: 'Fill this in', b: 'It is a clinical intake, not a contact form. The detail here is what makes the call useful.' },
  { n: '02', t: 'Eddy reads it', b: 'Before you speak, not during. If it is not something that should be trained around yet, you will be told that.' },
  { n: '03', t: 'We book a call', b: 'Fifteen minutes to go through it, then a program written for your presentation.' },
];

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  'w-full rounded-xl border border-neutral-800 bg-neutral-900 px-4 py-3.5 text-base text-neutral-50 placeholder:text-neutral-600 transition-colors focus:border-accent focus:outline-none';

export default function CustomPage() {
  const [values, setValues] = useState<Values>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (name: string, v: string | string[]) => setValues((p) => ({ ...p, [name]: v }));

  const toggle = (name: string, option: string) =>
    setValues((p) => {
      const had = Array.isArray(p[name]) ? (p[name] as string[]) : [];
      return {
        ...p,
        [name]: had.includes(option) ? had.filter((o) => o !== option) : [...had, option],
      };
    });

  // Said back to them before they send it: somebody answering yes to one of
  // these should be seeing a doctor, not waiting on a training program.
  const flags = useMemo(() => redFlagsIn(values), [values]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    const missing = missingFrom(values);
    if (missing.length) {
      setError(`Still needed: ${missing.map((f) => f.label).join(' · ')}`);
      document.getElementById(`f-${missing[0].name}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' });
      return;
    }
    if (!EMAIL.test(String(values.email ?? ''))) {
      setError('That email address does not look right.');
      return;
    }

    setSending(true);
    try {
      const r = await fetch('/api/intake', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error ?? 'Something went wrong');
      setSent(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again in a moment.');
    } finally {
      setSending(false);
    }
  }

  function pill(on: boolean) {
    return `min-h-[48px] rounded-xl border px-5 py-3 text-sm text-left transition-all active:scale-[0.97] ${
      on
        ? 'border-accent bg-accent text-neutral-950 font-semibold'
        : 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-accent/60'
    }`;
  }

  function renderField(f: Field) {
    if (!isVisible(f, values)) return null;
    const v = values[f.name];
    const label = (
      <>
        {f.label} {!f.required && <span className="font-normal text-neutral-500">(optional)</span>}
      </>
    );

    return (
      <div key={f.name} id={`f-${f.name}`}>
        {f.type === 'choice' || f.type === 'multi' || f.type === 'scale' ? (
          <span className="block text-sm font-semibold text-neutral-200">{label}</span>
        ) : (
          <label htmlFor={f.name} className="block text-sm font-semibold text-neutral-200">
            {label}
          </label>
        )}
        {f.help && <span className="mt-1 block text-xs text-neutral-500">{f.help}</span>}

        <div className="mt-3">
          {f.type === 'textarea' ? (
            <textarea
              id={f.name}
              rows={4}
              value={(v as string) ?? ''}
              placeholder={f.placeholder}
              onChange={(e) => set(f.name, e.target.value)}
              className={`${inputClass} resize-y leading-relaxed`}
            />
          ) : f.type === 'choice' ? (
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={f.label}>
              {f.options.map((o) => (
                <button
                  key={o}
                  type="button"
                  role="radio"
                  aria-checked={v === o}
                  onClick={() => set(f.name, o)}
                  className={pill(v === o)}
                >
                  {o}
                </button>
              ))}
            </div>
          ) : f.type === 'multi' ? (
            <div className="flex flex-wrap gap-2" role="group" aria-label={f.label}>
              {f.options.map((o) => {
                const on = Array.isArray(v) && v.includes(o);
                return (
                  <button key={o} type="button" aria-pressed={on} onClick={() => toggle(f.name, o)} className={pill(on)}>
                    {o}
                  </button>
                );
              })}
            </div>
          ) : f.type === 'scale' ? (
            <div role="radiogroup" aria-label={f.label}>
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: f.max - f.min + 1 }, (_, i) => String(f.min + i)).map((n) => (
                  <button
                    key={n}
                    type="button"
                    role="radio"
                    aria-checked={v === n}
                    onClick={() => set(f.name, n)}
                    className={`h-12 min-w-[48px] rounded-xl border text-base tabular-nums transition-all active:scale-[0.94] ${
                      v === n
                        ? 'border-accent bg-accent font-semibold text-neutral-950'
                        : 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-accent/60'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              {(f.minLabel || f.maxLabel) && (
                <div className="mt-2 flex justify-between text-xs text-neutral-600">
                  <span>{f.minLabel}</span>
                  <span>{f.maxLabel}</span>
                </div>
              )}
            </div>
          ) : (
            <input
              id={f.name}
              type={f.type}
              value={(v as string) ?? ''}
              placeholder={f.placeholder}
              autoComplete={
                f.name === 'first_name'
                  ? 'given-name'
                  : f.name === 'last_name'
                    ? 'family-name'
                    : f.name === 'email'
                      ? 'email'
                      : f.name === 'phone'
                        ? 'tel'
                        : f.name === 'dob'
                          ? 'bday'
                          : 'off'
              }
              onChange={(e) => set(f.name, e.target.value)}
              className={`${inputClass} ${f.type === 'date' ? 'max-w-[16rem] [color-scheme:dark]' : ''}`}
            />
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Nav />

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-6 sm:pt-32">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">Custom program</span>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            An injury is not a{' '}
            <span className="gradient-text">generalisable problem.</span>
          </h1>
          <p className="mt-5 text-base leading-relaxed text-neutral-400 sm:text-lg">
            Keeping a shoulder or a knee strong is close enough to the same work for most
            people. That is what the programs on the site are. An injury is not. It depends on
            what happened, what you can load today, and what you cannot. That one gets written
            for you.
          </p>
        </motion.div>

        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="mt-10 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div key={s.n} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
              <p className="text-2xl font-bold gradient-text">{s.n}</p>
              <h2 className="mt-2 font-semibold text-neutral-50">{s.t}</h2>
              <p className="mt-2 text-sm leading-relaxed text-neutral-400">{s.b}</p>
            </div>
          ))}
        </motion.div>

        {sent ? (
          <div className="mt-12 rounded-2xl border-2 border-accent bg-neutral-900 p-7 glow-sm sm:p-9">
            <h2 className="text-2xl font-bold sm:text-3xl">Sent.</h2>
            <p className="mt-4 leading-relaxed text-neutral-300">
              Eddy reads these himself, so it will not be instant. Expect to hear back within
              a couple of days to put a time in.
            </p>
            <p className="mt-3 leading-relaxed text-neutral-400">
              In the meantime, do not start loading anything that hurts because a website told
              you to. If you have not been cleared, get cleared.
            </p>
            <Link
              href="/"
              className="mt-7 inline-block rounded-md bg-accent px-7 py-3.5 font-semibold text-neutral-950 transition-colors hover:bg-accent-light"
            >
              Back to the site
            </Link>
          </div>
        ) : (
          <form onSubmit={submit} noValidate className="mt-14">
            {INTAKE_SECTIONS.map((section) => (
              <fieldset key={section.n} className="mb-12 border-0 p-0 last:mb-0">
                <legend className="mb-6 flex w-full items-baseline gap-4 border-b border-neutral-800 pb-4">
                  <span className="text-sm tabular-nums text-accent">{section.n}</span>
                  <span className="text-lg font-semibold text-neutral-50 sm:text-xl">{section.title}</span>
                </legend>
                {section.note && <p className="-mt-2 mb-6 text-sm text-neutral-400">{section.note}</p>}
                <div className="grid gap-7">{section.fields.map(renderField)}</div>
              </fieldset>
            ))}

            {flags.length > 0 && (
              <div className="mb-8 rounded-2xl border-2 border-accent bg-neutral-900 p-6">
                <p className="font-semibold text-neutral-50">See a doctor before you do anything else.</p>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                  You have answered yes to{' '}
                  {flags.length === 1 ? 'a screening question' : `${flags.length} screening questions`}. Those are
                  the ones that point at something a training program cannot fix and should not
                  be worked around. Send this through by all means, but get it looked at
                  medically first and we will talk after that.
                </p>
              </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="submit"
                disabled={sending}
                className="rounded-md bg-accent px-8 py-4 font-semibold text-neutral-950 transition-colors hover:bg-accent-light disabled:opacity-60"
              >
                {sending ? 'Sending' : 'Submit intake form'}
              </button>
              {error && <span className="text-sm text-red-400">{error}</span>}
            </div>

            <p className="mt-8 text-xs leading-relaxed text-neutral-500">
              This is not medical advice and nothing here is a diagnosis. If you have not been
              cleared to train, see a qualified healthcare professional first. What you send is
              used to prepare for your call and nothing else.
            </p>
          </form>
        )}
      </main>
    </div>
  );
}
