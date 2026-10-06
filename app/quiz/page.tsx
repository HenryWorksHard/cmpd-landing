'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { programs, getProgram, SIGNUP_URL } from '../programs';
import { CUSTOM_URL } from '../site';

// The matcher for the generalised programs, and the only path to a program, a
// price and a purchase. Q1 (area) decides the match; the rest set the context
// and decide whether this person should be on an off-the-shelf program at all.
//
// There is no "where will you train" question: these are gym programs, so the
// answer would never change the program.
//
// The "Get this program" CTA is interim (signup) until Stripe Checkout.

type Option = { label: string; value: string };
type Question = { id: string; question: string; help?: string; options: Option[] };

const questions: Question[] = [
  {
    id: 'area',
    question: 'Which area do you want strong?',
    help: 'This is the one that decides your program.',
    // values map to program ids in programs.ts
    options: [
      { label: 'Shoulder', value: 'shoulder' },
      { label: 'Lower back', value: 'lower-back' },
      { label: 'Knee', value: 'knee' },
      { label: 'Hip', value: 'hip' },
      { label: 'Neck / upper back', value: 'neck' },
      { label: 'Coming back from a longer break', value: 'return' },
    ],
  },
  {
    id: 'duration',
    question: 'How long has it been an issue?',
    options: [
      { label: 'It is not — I just want it strong', value: 'none' },
      { label: 'It niggles now and then', value: 'recurring' },
      { label: 'A while — months or more', value: 'chronic' },
      { label: 'Since an injury, surgery or a procedure', value: 'injury' },
    ],
  },
  {
    id: 'cleared',
    question: 'Have you been cleared to train?',
    help: 'If you’re unsure, we’ll still show your match — just check with a professional first.',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: 'Not sure', value: 'unsure' },
      { label: 'No / not yet', value: 'no' },
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
  // An actual injury, or nobody has looked at it yet. Either way an
  // off-the-shelf program is the wrong first answer, so the individual path is
  // offered next to the checkout rather than in a footnote under it.
  const needsIndividual = answers.duration === 'injury' || answers.cleared !== 'yes';

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      {/* Nav */}
      <nav className="border-b border-neutral-800">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-5 sm:px-6">
          <Link href="/" className="flex h-11 items-center" aria-label="CMPD, home">
            <Image src="/logo.png" alt="CMPD" width={1132} height={392} sizes="110px" className="h-7 w-auto sm:h-8" priority />
          </Link>
          <Link href="/#programs" className="inline-flex h-11 items-center text-sm text-neutral-400 transition-colors hover:text-neutral-50">
            All programs
          </Link>
        </div>
      </nav>

      {/* Progress bar */}
      {!isResult && (
        <div className="h-1 bg-neutral-800">
          <motion.div
            className="h-full bg-accent"
            initial={false}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      <main className="flex flex-1 items-center justify-center px-5 py-10 sm:px-6 sm:py-12">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait">
            {!isResult ? (
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25 }}
              >
                <p className="mb-3 text-sm text-neutral-500">
                  Question {step + 1} of {questions.length}
                </p>
                <h1 className="text-[1.75rem] font-bold leading-tight tracking-tight sm:text-4xl">
                  {current.question}
                </h1>
                {current.help && <p className="mt-3 text-neutral-400">{current.help}</p>}

                <div className="mt-8 space-y-3">
                  {current.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => choose(opt.value)}
                      className="w-full rounded-xl border border-neutral-800 bg-neutral-900 px-5 py-4 text-left font-medium transition-all hover:border-accent hover:bg-neutral-900/60 active:scale-[0.99]"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button onClick={back} className="mt-8 text-sm text-neutral-500 transition-colors hover:text-neutral-300">
                    ← Back
                  </button>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <span className="text-sm font-medium uppercase tracking-wider text-accent">Your match</span>
                <h1 className="mt-3 text-[1.75rem] font-bold tracking-tight sm:text-4xl">{recommended.name}</h1>
                <p className="mt-3 text-neutral-400">
                  Based on your answers, this is the program for that area.
                </p>

                <div className="mt-8 rounded-2xl border-2 border-accent bg-neutral-900 p-6 text-left glow-sm">
                  <span className="text-xs font-medium uppercase tracking-wider text-accent">{recommended.area}</span>
                  <h2 className="mt-2 text-xl font-semibold">{recommended.name}</h2>
                  <p className="mt-2 text-sm text-neutral-400">{recommended.blurb}</p>
                  <div className="mt-6 border-t border-neutral-800 pt-6">
                    <span className="text-3xl font-bold">${recommended.price}</span>
                    <span className="text-sm text-neutral-500"> one-time</span>
                    <p className="mt-1 text-sm text-neutral-500">
                      {recommended.weeks}-week program, 4 sessions a week
                    </p>
                  </div>
                  <a
                    href={SIGNUP_URL}
                    className="mt-6 block w-full rounded-md bg-accent py-3.5 text-center font-semibold text-neutral-950 transition-colors hover:bg-accent-light"
                  >
                    Get this program
                  </a>
                </div>

                {needsIndividual && (
                  <div className="mt-5 rounded-2xl border border-neutral-700 bg-neutral-900/60 p-6 text-left">
                    <p className="font-semibold text-neutral-50">This one might need to be written for you.</p>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">
                      {answers.duration === 'injury'
                        ? 'You have put an injury, surgery or a procedure behind it. A program off the shelf cannot know what you can load yet.'
                        : 'Nobody has cleared you to train yet. Get that first — and if there is an injury behind it, we should talk before you start anything.'}
                    </p>
                    <Link
                      href={CUSTOM_URL}
                      className="mt-5 block w-full rounded-md border border-accent py-3.5 text-center font-semibold text-accent transition-colors hover:bg-accent hover:text-neutral-950"
                    >
                      Get a custom program
                    </Link>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm">
                  <button onClick={restart} className="text-neutral-400 transition-colors hover:text-neutral-50">
                    Retake quiz
                  </button>
                  <Link href="/#programs" className="text-neutral-400 transition-colors hover:text-neutral-50">
                    See all programs
                  </Link>
                  <Link href="/#questions" className="text-neutral-400 transition-colors hover:text-neutral-50">
                    Questions
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
