'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// ─────────────────────────────────────────────────────────────────────────
// PLACEHOLDER CONTENT — swap for real details before promoting:
//   • programs: real injury programs, durations, prices, what's included
//   • the credential line in the "Why it works" section (Eddy's actual
//     qualification — do not overstate)
//   • testimonials (real recovery stories once you have them)
// The purchase buttons currently point at the app signup as an interim
// target; they become per-program Stripe Checkout links in the Stripe phase.
// ─────────────────────────────────────────────────────────────────────────

const programs = [
  {
    area: 'Shoulder',
    name: 'Shoulder Rebuild',
    weeks: 8,
    price: 49,
    blurb: 'Restore pain-free overhead strength after impingement, rotator-cuff strain, or instability.',
  },
  {
    area: 'Lower Back',
    name: 'Lower Back Reset',
    weeks: 8,
    price: 49,
    blurb: 'Build a resilient spine and train around disc, SI-joint, and general lower-back pain.',
  },
  {
    area: 'Knee',
    name: 'Knee Recovery',
    weeks: 10,
    price: 59,
    blurb: 'Rebuild strength and confidence after ligament, meniscus, or patellar issues.',
  },
  {
    area: 'Hip',
    name: 'Hip & Glute Rehab',
    weeks: 8,
    price: 49,
    blurb: 'Address hip pain and imbalance, and rebuild strong, stable hips and glutes.',
  },
  {
    area: 'Neck & Upper Back',
    name: 'Neck & Posture',
    weeks: 6,
    price: 39,
    blurb: 'Relieve neck and upper-back tension and build posture that holds up all day.',
  },
  {
    area: 'Full Body',
    name: 'Return to Training',
    weeks: 12,
    price: 69,
    blurb: 'A progressive rebuild for coming back to full training after a longer layoff.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Tell us about your injury',
    body: 'Answer a few quick questions about your injury, your history, and your goals.',
  },
  {
    n: '02',
    title: 'Get matched to your program',
    body: 'We match you to the program built for your injury and starting point — no guesswork.',
  },
  {
    n: '03',
    title: 'Train in the app',
    body: 'Follow your program week by week with video guidance and progress tracking in the CMPD app.',
  },
];

const proofPoints = [
  { value: 'Injury-specific', label: 'Programs built for one goal, not generic plans' },
  { value: 'Video-guided', label: 'Every exercise demonstrated, step by step' },
  { value: 'Home or gym', label: 'Adapts to the equipment you have' },
  { value: 'Progress tracked', label: 'Log every session, see the improvement' },
];

const testimonials = [
  {
    name: 'Placeholder — real story to add',
    role: 'Shoulder Rebuild',
    text: 'Six months of nagging shoulder pain and nothing helped. Eight weeks in and I am back pressing overhead pain-free.',
  },
  {
    name: 'Placeholder — real story to add',
    role: 'Lower Back Reset',
    text: 'I was scared to deadlift again. This eased me back in and my back feels stronger than before the injury.',
  },
  {
    name: 'Placeholder — real story to add',
    role: 'Knee Recovery',
    text: 'Post-op and lost. Having a clear program to follow every day made all the difference to getting back.',
  },
];

const SIGNUP_URL = 'https://app.cmpdcollective.com/signup';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="CMPD" width={120} height={40} className="h-10 w-auto" priority />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how" className="text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors">How it works</a>
              <a href="#programs" className="text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors">Programs</a>
              <a href="#stories" className="text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors">Stories</a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://app.cmpdcollective.com/login"
                className="text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors"
              >
                Sign In
              </a>
              <a
                href="#programs"
                className="px-5 py-2 text-sm font-medium rounded-md bg-accent text-neutral-950 hover:bg-accent-light transition-colors"
              >
                Find your program
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(250,204,21,0.12),transparent)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/50 text-sm text-neutral-300 mb-8">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                Training programs built around your injury
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-50 leading-[1.1]"
            >
              Injured? Don&apos;t stop training.{' '}
              <span className="gradient-text">Train around it.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Structured programs to rebuild strength and confidence around your injury — designed by a coach who specialises in training through them. Buy the program for your injury, follow it in the app.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="#programs"
                className="px-8 py-3 bg-accent hover:bg-accent-light text-neutral-950 font-semibold rounded-md transition-colors glow-sm"
              >
                Find your program
              </a>
              <a
                href="#how"
                className="px-8 py-3 border border-neutral-700 text-neutral-50 hover:border-accent hover:bg-neutral-900 font-medium rounded-md transition-all"
              >
                How it works
              </a>
            </motion.div>
          </div>

          {/* Proof points */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 lg:mt-28"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 p-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
              {proofPoints.map((p) => (
                <div key={p.value} className="text-center">
                  <p className="text-xl sm:text-2xl font-bold gradient-text">{p.value}</p>
                  <p className="mt-2 text-sm text-neutral-400">{p.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-24 lg:py-32 bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">How it works</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50">
              From injured to training in three steps
            </h2>
            <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
              No more guessing what&apos;s safe. Get matched to the right program and follow it day by day.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-8 rounded-2xl border border-neutral-800 bg-neutral-950"
              >
                <p className="text-4xl font-bold gradient-text">{step.n}</p>
                <h3 className="mt-4 text-xl font-semibold text-neutral-50">{step.title}</h3>
                <p className="mt-2 text-neutral-400 leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section id="programs" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(250,204,21,0.08),transparent)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Programs</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50">
              Find the program for your injury
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              One payment. Yours to keep. Follow it in the app for as long as you need.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, index) => (
              <motion.div
                key={program.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group flex flex-col bg-neutral-900 rounded-2xl p-6 border-2 border-neutral-800 hover:border-accent transition-all duration-300"
              >
                <span className="text-xs font-medium text-accent uppercase tracking-wider">{program.area}</span>
                <h3 className="mt-2 text-xl font-semibold text-neutral-50">{program.name}</h3>
                <p className="mt-2 text-neutral-400 leading-relaxed text-sm flex-1">{program.blurb}</p>

                <div className="mt-6 pt-6 border-t border-neutral-800 flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-bold text-neutral-50">${program.price}</span>
                    <span className="text-neutral-500 text-sm"> one-time</span>
                    <p className="text-sm text-neutral-500 mt-1">{program.weeks}-week program</p>
                  </div>
                </div>

                <a
                  href={SIGNUP_URL}
                  className="mt-6 block w-full py-2.5 text-center text-sm font-medium rounded-md bg-accent text-neutral-950 hover:bg-accent-light transition-colors"
                >
                  Get this program
                </a>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-neutral-500 text-sm mt-12">
            Not sure which one? <a href="#how" className="text-accent hover:underline">Answer a few questions</a> and we&apos;ll match you.
          </p>
        </div>
      </section>

      {/* Why it works / credibility */}
      <section className="py-24 lg:py-32 bg-neutral-900">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Why it works</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50">
              Built by a coach who trains through injury, not around a desk
            </h2>
            <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
              These aren&apos;t generic plans with a warning label. Each program is built specifically for its injury &mdash;
              progressive, safe, and designed to get you back to training with confidence. {/* TODO: add Eddy's real qualification / credential here. */}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stories / testimonials */}
      <section id="stories" className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">Stories</span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50">
              Back to training, stronger
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-colors"
              >
                <p className="text-neutral-300 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 pt-6 border-t border-neutral-800">
                  <p className="font-semibold text-neutral-50">{t.name}</p>
                  <p className="text-neutral-500 text-sm">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(250,204,21,0.15),transparent)]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50">
              Stop waiting for it to heal on its own
            </h2>
            <p className="mt-6 text-lg text-neutral-400">
              Find the program for your injury and start rebuilding today.
            </p>
            <a
              href="#programs"
              className="mt-10 inline-block px-8 py-4 bg-accent hover:bg-accent-light text-neutral-950 font-bold text-lg rounded-md transition-colors glow"
            >
              Find your program
            </a>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="CMPD" width={100} height={32} className="h-8 w-auto" />
            </Link>
            <p className="text-neutral-500 text-xs max-w-md text-center leading-relaxed">
              CMPD programs are for general fitness and are not medical advice. If you have an injury or medical
              condition, consult a qualified healthcare professional and get cleared before starting any program.
            </p>
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} CMPD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
