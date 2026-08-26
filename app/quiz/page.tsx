'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { programs, getProgram, SIGNUP_URL } from '../programs';

// Injury-matching quiz. Q1 (area) determines the recommended program; the
// rest personalise the result copy + capture context. Price-independent —
// the "Get this program" CTA is interim (signup) until Stripe Checkout.

type Option = { label: string; value: string };
type Question = { id: string; question: string; help?: string; options: Option[] };

const questions: Question[] = [
  {
    id: 'area',
    question: "Where's your injury?",
    help: 'We’ll match you to the program built for it.',
    // values map to program ids in programs.ts
    options: [
      { label: 'Shoulder', value: 'shoulder' },
      { label: 'Lower back', value: 'lower-back' },
      { label: 'Knee', value: 'knee' },
      { label: 'Hip', value: 'hip' },
      { label: 'Neck / upper back', value: 'neck' },
      { label: "Coming back from a longer break", value: 'return' },
    ],
  },
  {
    id: 'duration',
    question: 'How long have you been dealing with it?',
    options: [
      { label: 'Just recently (last few weeks)', value: 'acute' },
      { label: 'A while (months or more)', value: 'chronic' },
      { label: 'It comes and goes', value: 'recurring' },
      { label: "After surgery / a procedure", value: 'post-op' },
    ],
  },
  {
    id: 'location',
    question: 'Where will you train?',
    options: [
      { label: 'At home', value: 'home' },
      { label: 'At a gym', value: 'gym' },
      { label: 'Both', value: 'both' },
    ],
  },
  {
    id: 'cleared',
    question: 'Have you been cleared to exercise?',
    help: 'If you’re unsure, we’ll still show your match — just check with a professional first.',
    options: [
      { label: 'Yes', value: 'yes' },
      { label: "Not sure", value: 'unsure' },
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
  const notCleared = answers.cleared === 'no' || answers.cleared === 'unsure';

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 flex flex-col">
      {/* Nav */}
      <nav className="border-b border-neutral-800">
        <div className="max-w-3xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="CMPD" width={110} height={36} className="h-9 w-auto" priority />
          </Link>
          <Link href="/#programs" className="text-sm text-neutral-400 hover:text-neutral-50 transition-colors">
            Browse all programs
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

      <main className="flex-1 flex items-center justify-center px-6 py-12">
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
                <p className="text-sm text-neutral-500 mb-3">
                  Question {step + 1} of {questions.length}
                </p>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{current.question}</h1>
                {current.help && <p className="mt-3 text-neutral-400">{current.help}</p>}

                <div className="mt-8 space-y-3">
                  {current.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => choose(opt.value)}
                      className="w-full text-left px-5 py-4 rounded-xl border border-neutral-800 bg-neutral-900 hover:border-accent hover:bg-neutral-900/60 transition-all font-medium"
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {step > 0 && (
                  <button onClick={back} className="mt-8 text-sm text-neutral-500 hover:text-neutral-300 transition-colors">
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
                <span className="text-sm font-medium text-accent uppercase tracking-wider">Your match</span>
                <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                  {recommended.name}
                </h1>
                <p className="mt-3 text-neutral-400">
                  Based on your answers, this is the program built for you.
                </p>

                <div className="mt-8 text-left bg-neutral-900 border-2 border-accent rounded-2xl p-6 glow-sm">
                  <span className="text-xs font-medium text-accent uppercase tracking-wider">{recommended.area}</span>
                  <h2 className="mt-2 text-xl font-semibold">{recommended.name}</h2>
                  <p className="mt-2 text-neutral-400 text-sm">{recommended.blurb}</p>
                  <div className="mt-6 pt-6 border-t border-neutral-800 flex items-end justify-between">
                    <div>
                      <span className="text-3xl font-bold">${recommended.price}</span>
                      <span className="text-neutral-500 text-sm"> one-time</span>
                      <p className="text-sm text-neutral-500 mt-1">{recommended.weeks}-week program</p>
                    </div>
                  </div>
                  <a
                    href={SIGNUP_URL}
                    className="mt-6 block w-full py-3 text-center font-semibold rounded-md bg-accent text-neutral-950 hover:bg-accent-light transition-colors"
                  >
                    Get this program
                  </a>
                </div>

                {notCleared && (
                  <p className="mt-4 text-xs text-neutral-500 leading-relaxed max-w-md mx-auto">
                    Please check with a qualified healthcare professional and get cleared before starting, especially if
                    you&apos;re recovering from surgery or unsure about your injury.
                  </p>
                )}

                <div className="mt-8 flex items-center justify-center gap-6 text-sm">
                  <button onClick={restart} className="text-neutral-400 hover:text-neutral-50 transition-colors">
                    Retake quiz
                  </button>
                  <Link href="/#programs" className="text-neutral-400 hover:text-neutral-50 transition-colors">
                    See all programs
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
