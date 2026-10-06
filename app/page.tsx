import Link from "next/link";
import Image from "next/image";
import Nav from "./_nx/Nav";
import HeroCard from "./_nx/HeroCard";
import Media from "./_nx/Media";
import Reveal from "./_nx/Reveal";
import { programs } from "./programs";
import { NAV_LINKS, LOGIN_URL, CUSTOM_URL } from "./site";

// ─────────────────────────────────────────────────────────────────────────────
// Two paths, and the page exists to sort people into the right one.
//
//   • Ongoing strength for an area — generalisable, so it is a product. Quiz →
//     program → the app.
//   • An actual injury — not generalisable, so it is not a product. Intake form
//     → Eddy reads it → a call → a program written for that person.
//
// ARTWORK — four slots, and that is on purpose. The four things a visitor has
// to see are the training, the app, the coach, and one closing image.
// Everything else here is type. Drop files into public/media and they appear:
//   /media/hero.mp4     + /media/hero.jpg   full-bleed hero, 16:9 or wider
//   /media/app.mp4                          vertical screen recording of the app
//   /media/coach.jpg                        Eddy, 4:3 landscape
//   /media/training.jpg                     closing band, wide
// Each empty frame prints its own path on screen. Once /media/hero.mp4 exists,
// add `priority` to the hero Media so it skips the existence check.
//
// STILL PLACEHOLDER COPY — swap before promoting:
//   • the three testimonials below (real stories)
//   • the credential line in "Why it works" (Eddy's actual qualification —
//     do not overstate it)
//   • prices and durations live in ./programs.ts
// ─────────────────────────────────────────────────────────────────────────────

const FACTS = [
  { v: "6 programs", s: "One per area" },
  { v: "4 days", s: "a week, 30 to 45 minutes" },
  { v: "Gym-based", s: "Barbells, machines, cables" },
  { v: "In the app", s: "Every set logged as you train" },
];

const STEPS = [
  {
    n: "01",
    title: "Tell us about the area",
    body:
      "Three questions: which area you want strong, how long it has been an issue, and whether you have been cleared to train.",
  },
  {
    n: "02",
    title: "We construct a best-practice program for your presentation",
    body:
      "No guesswork. The program matches the area and the point you are starting from, built on what the evidence actually supports.",
  },
  {
    n: "03",
    title: "Train in the app",
    body:
      "Your program lands in the CMPD app. Four sessions a week, every exercise demonstrated, every set you log saved against the week before.",
  },
];

const PANELS = [
  {
    v: "4 days",
    s: "a week",
    p: "Thirty to forty-five minutes a session, built to fit around a working week rather than replace it.",
  },
  {
    v: "Every set",
    s: "logged as you go",
    p: "Weights and reps save while you train, so next week knows exactly what you lifted this week.",
  },
  {
    v: "Video",
    s: "on every exercise",
    p: "No guessing the movement. Each exercise is demonstrated before you put any load on it.",
  },
  {
    v: "Week by week",
    s: "progressive by design",
    p: "Load and complexity step up on a schedule, not on how you happen to feel that morning.",
  },
];

const STORIES = [
  {
    text:
      "Six months of a nagging shoulder and nothing helped. Eight weeks in and I am back pressing overhead without thinking about it.",
    name: "Placeholder — real story to add",
    role: "Shoulder Strength",
  },
  {
    text:
      "I was scared to deadlift again. This eased me back into it and my back feels stronger now than it did before.",
    name: "Placeholder — real story to add",
    role: "Lower Back Strength",
  },
  {
    text:
      "Post-op and completely lost. Having a clear session to do every day is what actually got me back training.",
    name: "Placeholder — real story to add",
    role: "Knee Strength",
  },
];

const FAQ = [
  {
    q: "Is this medical advice?",
    a:
      "No. These are training programs, not treatment. If you have an injury or a medical condition, see a qualified healthcare professional and get cleared before you start.",
  },
  {
    q: "What if I have an actual injury?",
    a:
      "Then a program off the shelf is the wrong tool, however well it is written. Fill in the injury form and we will go through it on a call before anything gets programmed.",
  },
  {
    q: "What equipment do I need?",
    a:
      "A gym. These are gym programs — barbells, dumbbells, machines and cables — because loading an area properly is most of what makes it stronger, and that is hard to do in a living room.",
  },
  {
    q: "How long do I have access?",
    a:
      "For the length of the program. Access starts on the first Monday after you buy — the programs run in weeks, so they start at the start of one — and runs to the last training day of the final week.",
  },
  {
    q: "Do I need the app?",
    a:
      "Yes. The program runs in the CMPD app, which is where the videos, the week-by-week plan and your logged sets live. It works on a phone, a tablet or a laptop.",
  },
  {
    q: "What if I pick the wrong program?",
    a:
      "Get in touch and we will move you across. The quiz exists so this does not happen, but not everything sits neatly in one box.",
  },
];

export default function LandingPage() {
  return (
    <div className="nx">
      <Nav overHero />

      {/* ------------------------------------------------------------- hero */}
      {/* Sticky, and the section below rises over it as you scroll. */}
      <section className="nx-hero">
        <HeroCard>
          <Media
            src="/media/hero.mp4"
            kind="video"
            poster="/media/hero.jpg"
            label="Hero footage"
            hint="Wide, 10–20s silent loop. Training, not a stock gym shot."
          />
          <div className="nx-hero-scrim" />

          <div className="nx-hero-inner">
            <h1 className="nx-display">
              Strength where
              <br />
              you need it.
            </h1>

            <div className="nx-hero-row">
              <p>
                Ongoing strength programs for the areas that give you trouble — shoulders,
                backs, knees, hips. Four gym sessions a week, run week by week in the CMPD
                app.
              </p>
              <div className="nx-hero-cta">
                <Link href="/quiz" className="nx-btn">
                  Find your program
                </Link>
                {/* The individualised path, deliberately at the top: someone
                    carrying a real injury should not have to read the whole
                    page to find out this is not what they need. */}
                <Link href={CUSTOM_URL} className="nx-btn nx-btn-ghost">
                  Injured? Get a custom program
                </Link>
              </div>
            </div>

            <div className="nx-facts">
              {FACTS.map((f) => (
                <div key={f.v}>
                  <b>{f.v}</b>
                  <span>{f.s}</span>
                </div>
              ))}
            </div>
          </div>
        </HeroCard>
      </section>

      <div className="nx-over">
        {/* --------------------------------------------------- how it works */}
        <section id="how" className="nx-section nx-wrap">
          <div className="nx-split nx-split-head" style={{ marginBottom: "clamp(20px, 2.4vw, 32px)" }}>
            <Reveal from="left">
              <span className="nx-eyebrow">How it works</span>
              <h2 className="nx-h2 nx-head">
                Three steps,
                <br />
                then you train.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="nx-lead">
                No more guessing what is worth doing. Answer three questions, get the
                program for the area, and follow it day by day.
              </p>
            </Reveal>
          </div>

          <ol className="nx-steps">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} as="li" from="left" delay={i * 110} className="nx-step">
                <div className="nx-step-head">
                  <span className="nx-step-n">{s.n}</span>
                  <h3 className="nx-step-title">{s.title}</h3>
                  <p className="nx-step-body">{s.body}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </section>

        {/* --------------------------------------------------- the two paths */}
        {/* The distinction the whole site turns on, said plainly and early. */}
        <section className="nx-section nx-wrap">
          <div className="nx-split">
            <Reveal from="left">
              <span className="nx-eyebrow">Which one are you</span>
              <h2 className="nx-h2 nx-head">
                Staying strong can be
                <br />
                generalised. An injury
                <br />
                cannot.
              </h2>
            </Reveal>
            <Reveal from="right" delay={100}>
              <p className="nx-lead">
                Keeping a shoulder, a back or a knee strong is close enough to the same
                work for most people. That is what these programs are, and you can start
                one today.
              </p>
              <p className="nx-note" style={{ marginTop: "clamp(14px, 1.6vw, 20px)" }}>
                An injury is a different question. What happened, what you can load now,
                what has to wait — none of that comes off a shelf. Those get a program
                written for the person, after a call, and they start with the form.
              </p>
              <div className="nx-cta-row">
                <Link href={CUSTOM_URL} className="nx-btn">
                  Get a custom program
                </Link>
                <Link href="/quiz" className="nx-btn nx-btn-ghost">
                  Find your program
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ----------------------------------------------------- programs */}
        {/* Informational only. No prices and no buy buttons here: the quiz is
            the single path to a program, a price and a purchase. */}
        <section id="programs" className="nx-section nx-wrap">
          <div className="nx-split nx-split-head" style={{ marginBottom: "clamp(20px, 2.4vw, 32px)" }}>
            <Reveal from="left">
              <span className="nx-eyebrow">What we cover</span>
              <h2 className="nx-h2 nx-head">A program for the area you want strong.</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="nx-lead">
                Six programs, one area each, for keeping it strong on an ongoing basis. The
                quiz picks yours — and that is also where the price and the start date are.
              </p>
            </Reveal>
          </div>

          <div className="nx-cards">
            {programs.map((p, i) => (
              <Reveal key={p.id} delay={i * 70}>
                <Link href="/quiz" className="nx-card">
                  <span className="nx-card-k">{p.area}</span>
                  <h3>{p.name}</h3>
                  <p>{p.blurb}</p>
                  <span className="nx-card-go">Find your program</span>
                </Link>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="nx-cta-row">
              <Link href="/quiz" className="nx-btn">
                Find your program
              </Link>
              <span className="nx-note">Takes about a minute. Three questions.</span>
            </div>
          </Reveal>
        </section>

        {/* ------------------------------------------------------ in the app */}
        <section id="app" className="nx-section nx-dark">
          <div className="nx-wrap">
            <div className="nx-split nx-split-head" style={{ marginBottom: "clamp(20px, 2.4vw, 32px)" }}>
              <Reveal from="left">
                <span className="nx-eyebrow">In the app</span>
                <h2 className="nx-h2 nx-head">The program runs itself.</h2>
              </Reveal>
              <Reveal delay={120}>
                <p className="nx-lead">
                  Open the app, do the session in front of you, log the sets. The week, the
                  order and the progression are already decided.
                </p>
              </Reveal>
            </div>

            <div className="nx-showcase">
              <Reveal from="scale">
                <div className="nx-phone">
                  <div className="nx-phone-stage">
                    <div className="nx-phone-screen">
                      <Media
                        src="/media/app.mp4"
                        kind="video"
                        ratio="nx-9x16"
                        label="App screen recording"
                        hint="Vertical 9:16. A session being logged, 10–15s."
                      />
                    </div>
                  </div>
                </div>
              </Reveal>

              <div className="nx-showcase-right">
                <Reveal delay={80}>
                  <div className="nx-panel nx-lift">
                    <b>One session</b>
                    <span>waiting for you each day</span>
                    <p>
                      No programme to interpret and nothing to plan. The app opens on the
                      session you are due to do.
                    </p>
                  </div>
                </Reveal>
                <div className="nx-panels">
                  {PANELS.map((p, i) => (
                    <Reveal key={p.v} delay={140 + i * 70}>
                      <div className="nx-panel nx-lift">
                        <b>{p.v}</b>
                        <span>{p.s}</span>
                        <p>{p.p}</p>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ----------------------------------------------------- why it works */}
        <section className="nx-section nx-wrap">
          <div className="nx-split">
            <Reveal from="left">
              <Media
                src="/media/coach.jpg"
                ratio="nx-4x3"
                label="Coach portrait"
                hint="Eddy, coaching. 4:3 landscape."
              />
            </Reveal>
            <Reveal from="right" delay={100}>
              <span className="nx-eyebrow">Why it works</span>
              <h2 className="nx-h2 nx-head">
                Built by a coach who trains through injuries.
              </h2>
              <p className="nx-lead" style={{ marginTop: "clamp(18px, 2vw, 26px)" }}>
                Each program is built around one area — what to load, how to progress it,
                and what to keep working while you do.
              </p>
              {/* TODO: Eddy's real qualification / credential goes here. Keep it
                  factual — this is the line people will check. */}
              <p className="nx-note" style={{ marginTop: "clamp(14px, 1.6vw, 20px)" }}>
                The programs train the whole body and work around the area rather than
                ignoring it, so you keep making progress everywhere else while it builds.
              </p>
            </Reveal>
          </div>
        </section>

        {/* --------------------------------------------------------- stories */}
        <section id="stories" className="nx-section nx-wrap">
          <Reveal>
            <span className="nx-eyebrow">Stories</span>
            <h2 className="nx-h2 nx-head" style={{ marginBottom: "clamp(20px, 2.4vw, 32px)" }}>
              Back to training.
            </h2>
          </Reveal>

          <div className="nx-cards">
            {STORIES.map((s, i) => (
              <Reveal key={s.role} delay={i * 90}>
                <div className="nx-card nx-card-quote">
                  <p>{s.text}</p>
                  <div className="nx-card-by">
                    <b>{s.name}</b>
                    <span>{s.role}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------------- questions */}
        <section id="questions" className="nx-section nx-wrap">
          <div className="nx-split nx-split-head" style={{ marginBottom: "clamp(20px, 2.4vw, 32px)" }}>
            <Reveal from="left">
              <span className="nx-eyebrow">Questions</span>
              <h2 className="nx-h2 nx-head">Before you start.</h2>
            </Reveal>
          </div>

          <div className="nx-faq">
            {FAQ.map((f, i) => (
              <Reveal key={f.q} delay={i * 60}>
                <details>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ------------------------------------------------- closing + footer */}
        <section className="nx-dark">
          <div className="nx-wrap nx-section" style={{ paddingBottom: 0 }}>
            <Reveal from="scale">
              <Media
                src="/media/training.jpg"
                ratio="nx-5x3"
                className="nx-media-cap"
                label="Closing image"
                hint="Wide. Someone mid-session, shot dark."
              />
            </Reveal>
            <Reveal>
              <h2 className="nx-display" style={{ margin: "clamp(26px, 3vw, 44px) 0 26px" }}>
                Start the work.
              </h2>
              <div className="nx-hero-cta">
                <Link href="/quiz" className="nx-btn">
                  Find your program
                </Link>
                <Link href={CUSTOM_URL} className="nx-btn nx-btn-ghost">
                  Injured? Get a custom program
                </Link>
              </div>
            </Reveal>
          </div>

          <footer className="nx-wrap nx-foot">
            <div className="nx-foot-top">
              <Link href="/" className="nx-brand" aria-label="CMPD, home" style={{ flex: "0 0 auto" }}>
                <Image src="/logo.png" alt="CMPD" width={1132} height={392} sizes="130px" />
              </Link>
              <div className="nx-foot-links">
                {NAV_LINKS.map((l) => (
                  <Link key={l.href} href={l.href}>
                    {l.label}
                  </Link>
                ))}
                <Link href="/quiz">Find your program</Link>
                <a href={LOGIN_URL}>Sign in</a>
              </div>
            </div>
            <div className="nx-foot-bottom">
              <p>
                CMPD programs are for general fitness and are not medical advice. If you
                have an injury or a medical condition, consult a qualified healthcare
                professional and get cleared before starting any program.
              </p>
              <span style={{ marginLeft: "auto" }}>© {new Date().getFullYear()} CMPD</span>
            </div>
          </footer>
        </section>
      </div>
    </div>
  );
}
