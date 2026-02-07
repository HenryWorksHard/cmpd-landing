'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const features = [
  {
    title: 'Program Builder',
    description: 'Create custom strength, cardio, HYROX, and hybrid programs with our drag-and-drop builder.',
    stat: '12-week',
    statLabel: 'Programs in under an hour',
  },
  {
    title: 'Client Management',
    description: 'Manage unlimited clients, track their progress, and assign personalized programs.',
    stat: 'Unlimited',
    statLabel: 'Clients on higher tiers',
  },
  {
    title: 'Nutrition Plans',
    description: 'Create and assign meal plans with macro tracking. Available on Pro and above.',
    stat: '100+',
    statLabel: 'Meal templates included',
  },
  {
    title: 'Progress Tracking',
    description: 'Clients log workouts, track 1RMs, and upload progress photos automatically.',
    stat: 'Real-time',
    statLabel: 'Progress updates',
  },
];

const stats = [
  { value: '500+', label: 'Active Trainers' },
  { value: '15K+', label: 'Clients Trained' },
  { value: '98%', label: 'Retention Rate' },
  { value: '4.9★', label: 'User Rating' },
];

const tiers = [
  {
    name: 'Starter',
    price: 39,
    clients: 'Up to 10 clients',
    features: ['Program builder', 'Client management', 'Progress tracking', 'Mobile app access'],
    popular: false,
  },
  {
    name: 'Pro',
    price: 79,
    clients: 'Up to 30 clients',
    features: ['Everything in Starter', 'Nutrition plans', 'Priority support', 'Client messaging'],
    popular: true,
  },
  {
    name: 'Studio',
    price: 149,
    clients: 'Up to 75 clients',
    features: ['Everything in Pro', 'Custom branding', 'Team accounts', 'API access'],
    popular: false,
  },
  {
    name: 'Gym',
    price: 299,
    clients: 'Unlimited clients',
    features: ['Everything in Studio', 'White-label option', 'Dedicated support', 'Custom integrations'],
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Sarah K.',
    role: 'Online Coach',
    text: "Finally a platform that doesn't charge per client. I've grown from 5 to 50 clients and my costs stayed the same.",
  },
  {
    name: 'Mike T.',
    role: 'Gym Owner',
    text: 'The program builder is insane. I can create a full 12-week program in under an hour.',
  },
  {
    name: 'Jessica R.',
    role: 'Personal Trainer',
    text: 'My clients love the app. They actually do their workouts now because everything is so easy to follow.',
  },
];

export default function LandingPage() {
  const [annualBilling, setAnnualBilling] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-xl border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center">
              <Image src="/logo.png" alt="CMPD" width={120} height={40} className="h-10 w-auto" />
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors">Pricing</a>
              <a href="#testimonials" className="text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors">Reviews</a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href="https://eddytrains-admin.vercel.app/login"
                className="text-sm font-medium text-neutral-400 hover:text-neutral-50 transition-colors"
              >
                Sign In
              </a>
              <a
                href="https://eddytrains-admin.vercel.app/signup"
                className="px-5 py-2 text-sm font-medium rounded-md bg-accent text-neutral-950 hover:bg-accent-light transition-colors"
              >
                Start Free Trial
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(250,204,21,0.12),transparent)]" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#18181b_1px,transparent_1px),linear-gradient(to_bottom,#18181b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-700 bg-neutral-900/50 text-sm text-neutral-300 mb-8">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                14-day free trial — No credit card required
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-50 leading-[1.1]"
            >
              The platform built for{' '}
              <span className="gradient-text">fitness professionals</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed"
            >
              Stop paying per client. Build programs, manage clients, and grow your business with one simple monthly subscription.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="https://eddytrains-admin.vercel.app/signup"
                className="px-8 py-3 bg-accent hover:bg-accent-light text-neutral-950 font-semibold rounded-md transition-colors glow-sm"
              >
                Start Your Free Trial
              </a>
              <a
                href="#pricing"
                className="px-8 py-3 border border-neutral-700 text-neutral-50 hover:border-accent hover:bg-neutral-900 font-medium rounded-md transition-all"
              >
                View Pricing
              </a>
            </motion.div>
          </div>

          {/* Stats bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-20 lg:mt-28"
          >
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 p-8 rounded-2xl border border-neutral-800 bg-neutral-900/50 backdrop-blur-sm">
              {stats.map((stat, index) => (
                <div key={stat.label} className="text-center">
                  <motion.p
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text"
                  >
                    {stat.value}
                  </motion.p>
                  <p className="mt-2 text-sm text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 lg:py-32 bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              What You Get
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50">
              Everything you need to run your fitness business
            </h2>
            <p className="mt-4 text-lg text-neutral-400 leading-relaxed">
              From program creation to client management, we&apos;ve got you covered.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group p-8 rounded-2xl border border-neutral-800 bg-neutral-950 hover:border-neutral-700 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-neutral-50 group-hover:text-accent transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="mt-2 text-neutral-400 leading-relaxed">
                  {feature.description}
                </p>
                <div className="pt-6 mt-6 border-t border-neutral-800">
                  <p className="text-3xl font-bold gradient-text">{feature.stat}</p>
                  <p className="text-sm text-neutral-500 mt-1">{feature.statLabel}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,rgba(250,204,21,0.08),transparent)]" />
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Pricing
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              No per-client fees. No hidden charges. Just one monthly subscription.
            </p>
            
            {/* Billing toggle */}
            <div className="mt-8 flex items-center justify-center gap-4">
              <span className={annualBilling ? 'text-neutral-500' : 'text-neutral-50'}>Monthly</span>
              <button
                onClick={() => setAnnualBilling(!annualBilling)}
                className={`w-14 h-7 rounded-full p-1 transition-colors ${
                  annualBilling ? 'bg-accent' : 'bg-neutral-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-neutral-950 transition-transform ${
                    annualBilling ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={annualBilling ? 'text-neutral-50' : 'text-neutral-500'}>
                Annual <span className="text-green-500 text-sm">(Save 20%)</span>
              </span>
            </div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative bg-neutral-900 rounded-2xl p-6 border-2 transition-all duration-300 hover:border-neutral-600 ${
                  tier.popular ? 'border-accent glow-sm' : 'border-neutral-800'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-neutral-950 text-xs font-semibold rounded-full">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-semibold text-neutral-50">{tier.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-neutral-50">
                    ${annualBilling ? Math.round(tier.price * 0.8) : tier.price}
                  </span>
                  <span className="text-neutral-500">/mo</span>
                </div>
                <p className="text-neutral-400 text-sm mt-1">{tier.clients}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-neutral-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://eddytrains-admin.vercel.app/signup"
                  className={`mt-6 block w-full py-2.5 text-center text-sm font-medium rounded-md transition-all ${
                    tier.popular
                      ? 'bg-accent text-neutral-950 hover:bg-accent-light'
                      : 'border border-neutral-700 text-neutral-50 hover:border-accent'
                  }`}
                >
                  Start Free Trial
                </a>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-neutral-500 text-sm">
            Full access to all features. No credit card required for trial.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-24 lg:py-32 bg-neutral-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="text-sm font-medium text-accent uppercase tracking-wider">
              Testimonials
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-50">
              Loved by trainers worldwide
            </h2>
            <p className="mt-4 text-lg text-neutral-400">
              Join hundreds of fitness professionals growing their business with CMPD.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, index) => (
              <motion.div
                key={t.name}
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

      {/* CTA */}
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
              Ready to grow your fitness business?
            </h2>
            <p className="mt-6 text-lg text-neutral-400">
              Start your 14-day free trial today. No credit card required.
            </p>
            <a
              href="https://eddytrains-admin.vercel.app/signup"
              className="mt-10 inline-block px-8 py-4 bg-accent hover:bg-accent-light text-neutral-950 font-bold text-lg rounded-md transition-colors glow"
            >
              Start Your Free Trial
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
            <div className="flex gap-6">
              {['LinkedIn', 'Twitter', 'Instagram'].map((social) => (
                <span
                  key={social}
                  className="text-sm text-neutral-500 hover:text-accent transition-colors cursor-pointer"
                >
                  {social}
                </span>
              ))}
            </div>
            <p className="text-neutral-500 text-sm">
              © {new Date().getFullYear()} CMPD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
