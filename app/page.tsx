'use client';

import { useState } from 'react';
import Link from 'next/link';

const features = [
  {
    title: 'Program Builder',
    description: 'Create custom strength, cardio, HYROX, and hybrid programs with our drag-and-drop builder.',
  },
  {
    title: 'Client Management',
    description: 'Manage unlimited clients, track their progress, and assign personalized programs.',
  },
  {
    title: 'Nutrition Plans',
    description: 'Create and assign meal plans with macro tracking. Available on Pro and above.',
  },
  {
    title: 'Progress Tracking',
    description: 'Clients log workouts, track 1RMs, and upload progress photos automatically.',
  },
  {
    title: 'Custom Branding',
    description: 'White-label the app with your logo and brand colors. Studio plan and above.',
  },
  {
    title: 'Mobile App',
    description: 'Clients access workouts from any device. PWA support for home screen install.',
  },
];

const tiers = [
  {
    name: 'Starter',
    price: 39,
    clients: 'Up to 10 clients',
    features: ['Program builder', 'Client management', 'Progress tracking', 'Mobile app access'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Pro',
    price: 79,
    clients: 'Up to 30 clients',
    features: ['Everything in Starter', 'Nutrition plans', 'Priority support', 'Client messaging'],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Studio',
    price: 149,
    clients: 'Up to 75 clients',
    features: ['Everything in Pro', 'Custom branding', 'Team accounts', 'API access'],
    cta: 'Start Free Trial',
    popular: false,
  },
  {
    name: 'Gym',
    price: 299,
    clients: 'Unlimited clients',
    features: ['Everything in Studio', 'White-label option', 'Dedicated support', 'Custom integrations'],
    cta: 'Contact Sales',
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
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Nav */}
      <nav className="border-b border-[var(--card-border)] sticky top-0 bg-[var(--background)]/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center font-bold text-black">
              C
            </div>
            <span className="font-bold text-xl">CMPD</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Features</a>
            <a href="#pricing" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Pricing</a>
            <a href="#testimonials" className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://eddytrains-admin.vercel.app/login"
              className="text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              Sign In
            </a>
            <a
              href="https://eddytrains-admin.vercel.app/signup"
              className="px-4 py-2 bg-[var(--accent)] hover:opacity-90 text-black font-semibold rounded-lg transition-opacity"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium rounded-full mb-6">
            14-day free trial — No credit card required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The platform built for
            <br />
            <span className="text-[var(--accent)]">fitness professionals</span>
          </h1>
          <p className="text-xl text-[var(--muted)] max-w-2xl mx-auto mb-8">
            Stop paying per client. Build programs, manage clients, and grow your business with one simple monthly subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://eddytrains-admin.vercel.app/signup"
              className="px-8 py-4 bg-[var(--accent)] hover:opacity-90 text-black font-bold text-lg rounded-xl transition-opacity"
            >
              Start Your Free Trial
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 bg-[var(--card)] border border-[var(--card-border)] hover:border-[var(--muted)] font-semibold text-lg rounded-xl transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run your fitness business</h2>
            <p className="text-[var(--muted)] text-lg">From program creation to client management, we've got you covered.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6">
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-[var(--muted)]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-[var(--muted)] text-lg mb-8">No per-client fees. No hidden charges. Just one monthly subscription.</p>
            
            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={annualBilling ? 'text-[var(--muted)]' : 'text-[var(--foreground)]'}>Monthly</span>
              <button
                onClick={() => setAnnualBilling(!annualBilling)}
                className={`w-14 h-7 rounded-full p-1 transition-colors ${
                  annualBilling ? 'bg-[var(--accent)]' : 'bg-[var(--card-border)]'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    annualBilling ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={annualBilling ? 'text-[var(--foreground)]' : 'text-[var(--muted)]'}>
                Annual <span className="text-green-500 text-sm">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-[var(--card)] rounded-2xl p-6 border-2 ${
                  tier.popular ? 'border-[var(--accent)]' : 'border-[var(--card-border)]'
                }`}
              >
                {tier.popular && (
                  <div className="text-[var(--accent)] text-sm font-medium mb-2">Most Popular</div>
                )}
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${annualBilling ? Math.round(tier.price * 0.8) : tier.price}
                  </span>
                  <span className="text-[var(--muted)]">/mo</span>
                </div>
                <p className="text-[var(--muted)] text-sm mt-1">{tier.clients}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"></span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://eddytrains-admin.vercel.app/signup"
                  className={`mt-6 block text-center py-3 rounded-xl font-semibold transition-all ${
                    tier.popular
                      ? 'bg-[var(--accent)] hover:opacity-90 text-black'
                      : 'bg-[var(--card-border)] hover:bg-[var(--muted)]/20'
                  }`}
                >
                  {tier.cta}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 border-t border-[var(--card-border)]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by trainers worldwide</h2>
            <p className="text-[var(--muted)] text-lg">Join hundreds of fitness professionals growing their business with CMPD.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-[var(--card)] border border-[var(--card-border)] rounded-2xl p-6">
                <p className="text-[var(--muted)] mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-[var(--muted)] text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-[var(--card-border)]">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to grow your fitness business?</h2>
          <p className="text-[var(--muted)] text-lg mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <a
            href="https://eddytrains-admin.vercel.app/signup"
            className="inline-block px-8 py-4 bg-[var(--accent)] hover:opacity-90 text-black font-bold text-lg rounded-xl transition-opacity"
          >
            Start Your Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--card-border)] py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--accent)] rounded-lg flex items-center justify-center font-bold text-black text-sm">
                C
              </div>
              <span className="font-semibold">CMPD</span>
            </div>
            <p className="text-[var(--muted)] text-sm">
              © {new Date().getFullYear()} CMPD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
