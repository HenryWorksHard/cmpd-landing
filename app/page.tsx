'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { programs } from './programs';
import { NAV_LINKS, LOGIN_URL, CUSTOM_URL } from './site';
import Nav from './_components/Nav';
import Media from './_components/Media';
import Counter from './_components/Counter';
import { useMediaExists } from './_components/useMediaExists';

// ─────────────────────────────────────────────────────────────────────────
// Two paths, and the page exists to sort people into the right one.
//
//   • Ongoing strength for an area — generalisable, so it is a product.
//     Quiz → program → the app.
//   • An actual injury — not generalisable, so it is not a product. Intake
//     form → Eddy reads it → a call → a program written for that person.
//
// ARTWORK — four slots, and every one of them is silent until its file
// exists. Nothing is drawn, nothing is reserved, and the sections that change
// shape without their artwork lay themselves out the other way. Drop a file
// into public/media and it appears, with nothing to deploy beyond the commit:
//   /media/hero.mp4 + /media/hero.jpg   hero, wide
//   /media/app.mp4                      vertical screen recording of the app
//   /media/coach.jpg                    Eddy, 4:3 landscape
//   /media/training.jpg                 closing band, wide
// Once /media/hero.mp4 exists, add `priority` to the hero Media so it skips
// the existence check and starts loading immediately.
//
// Nothing on this page is placeholder copy. The one thing still to add is
// Eddy's qualification in "Why it works" — see the note there — and the
// prices and durations in ./programs.ts.
// ─────────────────────────────────────────────────────────────────────────

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

const steps = [
  {
    n: '01',
    title: 'Tell us about the area',
    body: 'Three questions: which area you want strong, how long it has been an issue, and whether you have been cleared to train.',
  },
  {
    n: '02',
    title: 'We construct a best-practice program for your presentation',
    body: 'No guesswork. The program matches the area and the point you are starting from, built on what the evidence actually supports.',
  },
  {
    n: '03',
    title: 'Train in the app',
    body: 'Your program lands in the CMPD app. Four sessions a week, every exercise demonstrated, every set you log saved against the week before.',
  },
];

// `n` counts up the first time the row is seen; the rest is plain type.
const proofPoints: { n?: number; value: string; label: string }[] = [
  { n: 6, value: 'programs', label: 'One per area' },
  { n: 4, value: 'days', label: 'a week, 30 to 45 minutes' },
  { value: 'Gym-based', label: 'Barbells, machines, cables' },
  { value: 'In the app', label: 'Every set logged as you train' },
];

const appPoints = [
  { v: 'One session', s: 'waiting for you each day', p: 'No programme to interpret and nothing to plan. The app opens on the session you are due to do.' },
  { v: 'Every set', s: 'logged as you go', p: 'Weights and reps save while you train, so next week knows exactly what you lifted this week.' },
  { v: 'Video', s: 'on every exercise', p: 'No guessing the movement. Each exercise is demonstrated before you put any load on it.' },
  { v: 'Week by week', s: 'progressive by design', p: 'Load and complexity step up on a schedule, not on how you happen to feel that morning.' },
];

const faq = [
  {
    q: 'Is this medical advice?',
    a: 'No. These are training programs, not treatment. If you have an injury or a medical condition, see a qualified healthcare professional and get cleared before you start.',
  },
  {
    q: 'What if I have an actual injury?',
    a: 'Then a program off the shelf is the wrong tool, however well it is written. Fill in the injury form and we will go through it on a call before anything gets programmed.',
  },
  {
    q: 'What equipment do I need?',
    a: 'A gym. These are gym programs — barbells, dumbbells, machines and cables — because loading an area properly is most of what makes it stronger, and that is hard to do in a living room.',
  },
  {
    q: 'How long do I have access?',
    a: 'For the length of the program. Access starts on the first Monday after you buy — the programs run in weeks, so they start at the start of one — and runs to the last training day of the final week.',
  },
  {
    q: 'Do I need the app?',
    a: 'Yes. The program runs in the CMPD app, which is where the videos, the week-by-week plan and your logged sets live. It works on a phone, a tablet or a laptop.',
  },
  {
    q: 'What if I pick the wrong program?',
    a: 'Get in touch and we will move you across. The quiz exists so this does not happen, but not everything sits neatly in one box.',
  },
];

export default function LandingPage() {
  // Read here rather than inside each slot, because these sections lay
  // themselves out differently with and without their artwork.
  const heroArt = useMediaExists('/media/hero.mp4');
  const appArt = useMediaExists('/media/app.mp4');
  const coachArt = useMediaExists('/media/coach.jpg');
  const closingArt = useMediaExists('/media/training.jpg');

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Nav />

      {/* Hero */}
      <section className="relative flex min-h-[88svh] items-center justify-center overflow-hidden pt-16 sm:min-h-screen">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(250,204,21,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:3rem_3rem] sm:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="mb-7 inline-flex items-center gap-2 rounded-full border border-neutral-700 bg-neutral-900/50 px-4 py-1.5 text-xs text-neutral-300 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
                Strength programs built around one area
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-[2.1rem] font-bold leading-[1.08] tracking-tight text-neutral-50 sm:text-5xl md:text-6xl lg:text-7xl"
            >
              Strength where you need it.{' '}
              <span className="gradient-text">Train the weak link.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-neutral-400 sm:text-lg md:text-xl"
            >
              Ongoing strength programs for the areas that give you trouble — shoulders,
              backs, knees, hips. Four gym sessions a week, run week by week in the CMPD app.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4"
            >
              <Link
                href="/quiz"
                className="rounded-md bg-accent px-8 py-3.5 text-center font-semibold text-neutral-950 transition-colors hover:bg-accent-light glow-sm"
              >
                Find your program
              </Link>
              {/* The individual path, deliberately at the top: someone carrying a
                  real injury should not read the whole page to find out this is
                  not what they need. */}
              <Link
                href={CUSTOM_URL}
                className="rounded-md border border-neutral-700 px-8 py-3.5 text-center font-medium text-neutral-50 transition-all hover:border-accent hover:bg-neutral-900"
              >
                Injured? Get a custom program
              </Link>
            </motion.div>
          </div>

          {/* Proof points */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 lg:mt-24"
          >
            <div className="grid grid-cols-2 gap-6 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-6 backdrop-blur-sm sm:gap-8 sm:p-8 lg:grid-cols-4 lg:gap-12">
              {proofPoints.map((p) => (
                <div key={p.value} className="text-center">
                  <p className="text-lg font-bold tabular-nums gradient-text sm:text-2xl">
                    {p.n !== undefined && <Counter to={p.n} />} {p.value}
                  </p>
                  <p className="mt-2 text-xs text-neutral-400 sm:text-sm">{p.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Hero artwork — renders nothing at all until /media/hero.mp4 exists */}
      {heroArt && (
        <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
            <Media
              src="/media/hero.mp4"
              kind="video"
              poster="/media/hero.jpg"
              label="Training at CMPD"
              ratio="aspect-[4/3] sm:aspect-[16/7]"
            />
          </motion.div>
        </section>
      )}

      {/* How it works */}
      <section id="how" className="bg-neutral-900 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">How it works</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
              From sore to strong in three steps
            </h2>
            <p className="mt-4 text-base leading-relaxed text-neutral-400 sm:text-lg">
              No more guessing what is worth doing. Answer three questions, get the program
              for the area, and follow it day by day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.n}
                {...fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 sm:p-8"
              >
                <p className="text-4xl font-bold gradient-text">{step.n}</p>
                <h3 className="mt-4 text-lg font-semibold text-neutral-50 sm:text-xl">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-neutral-400">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The two paths — the distinction the whole site turns on */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">Which one are you</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
                Staying strong can be generalised.{' '}
                <span className="gradient-text">An injury cannot.</span>
              </h2>
            </motion.div>
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <p className="text-base leading-relaxed text-neutral-300 sm:text-lg">
                Keeping a shoulder, a back or a knee strong is close enough to the same work
                for most people. That is what these programs are, and you can start one today.
              </p>
              <p className="mt-4 leading-relaxed text-neutral-400">
                An injury is a different question. What happened, what you can load now, what
                has to wait — none of that comes off a shelf. Those get a program written for
                the person, after a call, and they start with the form.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link
                  href={CUSTOM_URL}
                  className="rounded-md bg-accent px-7 py-3.5 text-center font-semibold text-neutral-950 transition-colors hover:bg-accent-light"
                >
                  Get a custom program
                </Link>
                <Link
                  href="/quiz"
                  className="rounded-md border border-neutral-700 px-7 py-3.5 text-center font-medium text-neutral-50 transition-all hover:border-accent hover:bg-neutral-900"
                >
                  Find your program
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What we cover — informational only. NO prices, NO buy buttons here:
          the quiz is the single path to a program, price and purchase. */}
      <section id="programs" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(250,204,21,0.08),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">What we cover</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
              A program for the area you want strong
            </h2>
            <p className="mt-4 text-base text-neutral-400 sm:text-lg">
              Six programs, one area each, for keeping it strong on an ongoing basis. The quiz
              picks yours — and that is also where the price and the start date are.
            </p>
          </motion.div>

          <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <motion.div key={program.id} {...fadeUp} transition={{ duration: 0.5, delay: index * 0.08 }}>
                <Link
                  href="/quiz"
                  className="flex h-full flex-col rounded-2xl border border-neutral-800 bg-neutral-900 p-6 transition-all hover:border-accent/60 hover:bg-neutral-900/60"
                >
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">{program.area}</span>
                  <h3 className="mt-2 text-lg font-semibold text-neutral-50 sm:text-xl">{program.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-neutral-400">{program.blurb}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Find your program <span aria-hidden>→</span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center sm:mt-14">
            <Link
              href="/quiz"
              className="inline-block rounded-md bg-accent px-8 py-3.5 font-semibold text-neutral-950 transition-colors hover:bg-accent-light glow-sm"
            >
              Find your program
            </Link>
            <p className="mt-4 text-sm text-neutral-500">Takes about a minute. Three questions.</p>
          </div>
        </div>
      </section>

      {/* In the app */}
      <section id="app" className="bg-neutral-900 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
            <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">In the app</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
              The program runs itself
            </h2>
            <p className="mt-4 text-base text-neutral-400 sm:text-lg">
              Open the app, do the session in front of you, log the sets. The week, the order
              and the progression are already decided.
            </p>
          </motion.div>

          <div
            className={`grid items-center gap-10 lg:gap-14 ${
              appArt ? "lg:grid-cols-[minmax(0,320px)_1fr]" : ""
            }`}
          >
            {appArt && (
              <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mx-auto w-full max-w-[280px] lg:max-w-none">
                <Media
                  src="/media/app.mp4"
                  kind="video"
                  ratio="aspect-[9/16]"
                  label="The CMPD app"
                  className="shadow-[0_0_60px_-20px_rgba(250,204,21,0.25)]"
                />
              </motion.div>
            )}

            <div className={`grid gap-5 sm:gap-6 ${appArt ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4"}`}>
              {appPoints.map((p, index) => (
                <motion.div
                  key={p.v}
                  {...fadeUp}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6"
                >
                  <p className="text-xl font-bold text-neutral-50 sm:text-2xl">{p.v}</p>
                  <p className="mt-1 text-sm text-accent">{p.s}</p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-400">{p.p}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why it works / credibility */}
      <section className="py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className={`grid items-center gap-10 lg:gap-16 ${coachArt ? "lg:grid-cols-2" : "mx-auto max-w-3xl text-center"}`}>
            {coachArt && (
              <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
                <Media src="/media/coach.jpg" ratio="aspect-[4/3]" label="Eddy, coaching" />
              </motion.div>
            )}
            <motion.div {...fadeUp} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">Why it works</span>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
                Built by a coach who trains through injuries
              </h2>
              <p className="mt-6 text-base leading-relaxed text-neutral-300 sm:text-lg">
                Each program is built around one area — what to load, how to progress it, and
                what to keep working while you do.
              </p>
              {/* TODO: Eddy's real qualification / credential goes here. Keep it
                  factual — this is the line people will check. */}
              <p className="mt-4 leading-relaxed text-neutral-400">
                The programs train the whole body and work around the area rather than ignoring
                it, so you keep making progress everywhere else while it builds.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section id="questions" className="bg-neutral-900 py-20 sm:py-24 lg:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} transition={{ duration: 0.6 }} className="mb-10 text-center sm:mb-14">
            <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">Questions</span>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
              Before you start
            </h2>
          </motion.div>

          <div className="divide-y divide-neutral-800 border-y border-neutral-800">
            {faq.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-base font-semibold text-neutral-50 sm:text-lg">
                  {f.q}
                  <span className="shrink-0 text-2xl font-light text-accent transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-neutral-400">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(250,204,21,0.15),transparent)]" />

        <div className="relative mx-auto max-w-5xl px-5 sm:px-6 lg:px-8">
          {closingArt && (
            <motion.div {...fadeUp} transition={{ duration: 0.6 }}>
              <Media src="/media/training.jpg" ratio="aspect-[4/3] sm:aspect-[16/7]" label="Training at CMPD" />
            </motion.div>
          )}

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.6, delay: 0.1 }}
            className={`text-center ${closingArt ? "mt-12" : ""}`}
          >
            <h2 className="text-3xl font-bold tracking-tight text-neutral-50 sm:text-4xl lg:text-5xl">
              Stop waiting for it to settle
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-base text-neutral-400 sm:text-lg">
              Find the program for your area, or send through the injury form and we will talk.
            </p>
            <div className="mt-9 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
              <Link
                href="/quiz"
                className="rounded-md bg-accent px-8 py-4 text-center text-lg font-bold text-neutral-950 transition-colors hover:bg-accent-light glow"
              >
                Find your program
              </Link>
              <Link
                href={CUSTOM_URL}
                className="rounded-md border border-neutral-700 px-8 py-4 text-center text-lg font-medium text-neutral-50 transition-all hover:border-accent hover:bg-neutral-900"
              >
                Injured? Get a custom program
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-between">
            <Link href="/" className="flex items-center" aria-label="CMPD, home">
              <Image src="/logo.png" alt="CMPD" width={1132} height={392} sizes="130px" className="h-7 w-auto" />
            </Link>
            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
              {NAV_LINKS.map((l) => (
                <Link key={l.href} href={l.href} className="text-neutral-400 transition-colors hover:text-neutral-50">
                  {l.label}
                </Link>
              ))}
              <a href={LOGIN_URL} className="text-neutral-400 transition-colors hover:text-neutral-50">
                Sign In
              </a>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-4 border-t border-neutral-800 pt-8 text-center md:flex-row md:justify-between md:text-left">
            <p className="max-w-xl text-xs leading-relaxed text-neutral-500">
              CMPD programs are for general fitness and are not medical advice. If you have an
              injury or medical condition, consult a qualified healthcare professional and get
              cleared before starting any program.
            </p>
            <p className="text-sm text-neutral-500">© {new Date().getFullYear()} CMPD. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
