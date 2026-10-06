"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { programs, getProgram, SIGNUP_URL } from "../programs";
import { CUSTOM_URL } from "../site";

// The matcher for the generalised programs, and the only path to a program, a
// price and a purchase. Q1 (area) decides the match; the rest set the context
// and decide whether this person should be on an off-the-shelf program at all.
//
// There is no "where will you train" question: these are gym programs. Loading
// an area properly is most of what makes it stronger, and that is hard to do in
// a living room — so the answer would never change the program.
//
// The "Get this program" button is interim — it goes to app signup until
// per-program Stripe Checkout is wired in programs.ts.

type Option = { label: string; value: string };
type Question = { id: string; question: string; help?: string; options: Option[] };

const questions: Question[] = [
  {
    id: "area",
    question: "Which area do you want strong?",
    help: "This is the one that decides your program.",
    // values map to program ids in programs.ts
    options: [
      { label: "Shoulder", value: "shoulder" },
      { label: "Lower back", value: "lower-back" },
      { label: "Knee", value: "knee" },
      { label: "Hip", value: "hip" },
      { label: "Neck or upper back", value: "neck" },
      { label: "Coming back from a longer break", value: "return" },
    ],
  },
  {
    id: "duration",
    question: "How long has it been an issue?",
    options: [
      { label: "It is not — I just want it strong", value: "none" },
      { label: "It niggles now and then", value: "recurring" },
      { label: "A while — months or more", value: "chronic" },
      { label: "Since an injury, surgery or a procedure", value: "injury" },
    ],
  },
  {
    id: "cleared",
    question: "Have you been cleared to train?",
    help: "If you are not sure we will still show your match — just check with a professional first.",
    options: [
      { label: "Yes", value: "yes" },
      { label: "Not sure", value: "unsure" },
      { label: "No, not yet", value: "no" },
    ],
  },
];

export default function QuizPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const isResult = step >= questions.length;
  const current = questions[step];
  const progress = Math.round((step / questions.length) * 100);

  const choose = (value: string) => {
    const q = questions[step];
    setAnswers((prev) => ({ ...prev, [q.id]: value }));
    setStep((s) => s + 1);
  };

  const back = () => setStep((s) => Math.max(0, s - 1));
  const restart = () => {
    setAnswers({});
    setStep(0);
  };

  const recommended = getProgram(answers.area) ?? programs[0];
  // An actual injury, or nobody has looked at it yet. Either way an off-the-
  // shelf program is the wrong first answer, so the individual path is offered
  // ahead of the checkout rather than in a footnote under it.
  const needsIndividual = answers.duration === "injury" || answers.cleared !== "yes";

  return (
    <div className="nx">
      <div className="nx-top">
        <Link href="/" className="nx-brand" aria-label="CMPD, home">
          <span className="nx-brand-pill nx-brand-pill-ink">
            <Image src="/logo.png" alt="CMPD" width={1132} height={392} sizes="110px" priority />
          </span>
        </Link>
        <Link href="/#programs" className="nx-top-right">
          See all programs
        </Link>
      </div>

      <div className="nx-progress" aria-hidden>
        <div style={{ width: `${isResult ? 100 : progress}%` }} />
      </div>

      <main className="nx-quiz">
        {!isResult ? (
          <div key={current.id} className="nx-in-x">
            <p className="nx-quiz-step">
              Question {step + 1} of {questions.length}
            </p>
            <h1>{current.question}</h1>
            {current.help && <p className="nx-quiz-help">{current.help}</p>}

            <div className="nx-opts">
              {current.options.map((opt) => (
                <button key={opt.value} className="nx-opt" onClick={() => choose(opt.value)}>
                  {opt.label}
                </button>
              ))}
            </div>

            {step > 0 && (
              <button className="nx-quiz-back" onClick={back}>
                Back
              </button>
            )}
          </div>
        ) : (
          <div className="nx-in-y">
            <span className="nx-eyebrow">Your match</span>
            <h1 style={{ marginTop: 12 }}>{recommended.name}</h1>
            <p className="nx-quiz-help">
              Based on your answers, this is the program for that area.
            </p>

            <div className="nx-result">
              <span className="nx-result-k">{recommended.area}</span>
              <p style={{ marginTop: 14 }}>{recommended.blurb}</p>

              <div className="nx-result-row">
                <div>
                  <div className="nx-result-price">
                    ${recommended.price} <span>one-time</span>
                  </div>
                  <p className="nx-result-meta" style={{ marginTop: 8 }}>
                    {recommended.weeks}-week program, 4 sessions a week
                  </p>
                </div>
                <a href={SIGNUP_URL} className="nx-btn">
                  Get this program
                </a>
              </div>
            </div>

            {needsIndividual && (
              <div className="nx-flag">
                <b>This one might need to be written for you.</b>
                <p>
                  {answers.duration === "injury"
                    ? "You have put an injury, surgery or a procedure behind it. A program off the shelf cannot know what you can load yet."
                    : "Nobody has cleared you to train yet. Get that first — and if there is an injury behind it, we should talk before you start anything."}
                </p>
                <Link href={CUSTOM_URL} className="nx-btn">
                  Get a custom program
                </Link>
              </div>
            )}

            <div className="nx-quiz-after">
              <button onClick={restart}>Retake the quiz</button>
              <Link href="/#programs">See all programs</Link>
              <Link href="/#questions">Questions</Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
