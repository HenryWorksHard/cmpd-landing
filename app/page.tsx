'use client';

import { useState } from 'react';
import Link from 'next/link';

const features = [
  {
    title: 'Program Builder',
    description: 'Create custom strength, cardio, HYROX, and hybrid programs with our drag-and-drop builder.',
    icon: '💪',
  },
  {
    title: 'Client Management',
    description: 'Manage unlimited clients, track their progress, and assign personalized programs.',
    icon: '👥',
  },
  {
    title: 'Nutrition Plans',
    description: 'Create and assign meal plans with macro tracking. Available on Pro and above.',
    icon: '🥗',
  },
  {
    title: 'Progress Tracking',
    description: 'Clients log workouts, track 1RMs, and upload progress photos automatically.',
    icon: '📈',
  },
  {
    title: 'Custom Branding',
    description: 'White-label the app with your logo and brand colors. Studio plan and above.',
    icon: '🎨',
  },
  {
    title: 'Mobile App',
    description: 'Clients access workouts from any device. PWA support for home screen install.',
    icon: '📱',
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
    <div className="min-h-screen bg-zinc-950 text-white">
      {/* Nav */}
      <nav className="border-b border-zinc-800 sticky top-0 bg-zinc-950/80 backdrop-blur-md z-50">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-400 rounded-xl flex items-center justify-center font-bold text-black">
              C
            </div>
            <span className="font-bold text-xl">CMPD</span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-zinc-400 hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="text-zinc-400 hover:text-white transition-colors">Pricing</a>
            <a href="#testimonials" className="text-zinc-400 hover:text-white transition-colors">Reviews</a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://eddytrains-admin.vercel.app/login"
              className="text-zinc-400 hover:text-white transition-colors"
            >
              Sign In
            </a>
            <a
              href="https://eddytrains-admin.vercel.app/signup"
              className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-semibold rounded-lg transition-colors"
            >
              Start Free Trial
            </a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <div className="inline-block px-4 py-1 bg-yellow-400/10 text-yellow-400 text-sm font-medium rounded-full mb-6">
            14-day free trial • No credit card required
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            The platform built for
            <br />
            <span className="text-yellow-400">fitness professionals</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto mb-8">
            Stop paying per client. Build programs, manage clients, and grow your business with one simple monthly subscription.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://eddytrains-admin.vercel.app/signup"
              className="px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg rounded-xl transition-colors"
            >
              Start Your Free Trial
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold text-lg rounded-xl transition-colors"
            >
              View Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to run your fitness business</h2>
            <p className="text-zinc-400 text-lg">From program creation to client management, we've got you covered.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-zinc-400 text-lg mb-8">No per-client fees. No hidden charges. Just one monthly subscription.</p>
            
            {/* Billing toggle */}
            <div className="flex items-center justify-center gap-4">
              <span className={annualBilling ? 'text-zinc-500' : 'text-white'}>Monthly</span>
              <button
                onClick={() => setAnnualBilling(!annualBilling)}
                className={`w-14 h-7 rounded-full p-1 transition-colors ${
                  annualBilling ? 'bg-yellow-400' : 'bg-zinc-700'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-full bg-white transition-transform ${
                    annualBilling ? 'translate-x-7' : 'translate-x-0'
                  }`}
                />
              </button>
              <span className={annualBilling ? 'text-white' : 'text-zinc-500'}>
                Annual <span className="text-green-400 text-sm">(Save 20%)</span>
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`bg-zinc-900 rounded-2xl p-6 border-2 ${
                  tier.popular ? 'border-yellow-400' : 'border-zinc-800'
                }`}
              >
                {tier.popular && (
                  <div className="text-yellow-400 text-sm font-medium mb-2">Most Popular</div>
                )}
                <h3 className="text-xl font-semibold">{tier.name}</h3>
                <div className="mt-4">
                  <span className="text-4xl font-bold">
                    ${annualBilling ? Math.round(tier.price * 0.8) : tier.price}
                  </span>
                  <span className="text-zinc-400">/mo</span>
                </div>
                <p className="text-zinc-400 text-sm mt-1">{tier.clients}</p>

                <ul className="mt-6 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-zinc-300">
                      <span className="text-green-400">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="https://eddytrains-admin.vercel.app/signup"
                  className={`mt-6 block text-center py-3 rounded-xl font-semibold transition-colors ${
                    tier.popular
                      ? 'bg-yellow-400 hover:bg-yellow-300 text-black'
                      : 'bg-zinc-800 hover:bg-zinc-700 text-white'
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
      <section id="testimonials" className="py-20 border-t border-zinc-800">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Loved by trainers worldwide</h2>
            <p className="text-zinc-400 text-lg">Join hundreds of fitness professionals growing their business with CMPD.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                <p className="text-zinc-300 mb-4">"{t.text}"</p>
                <div>
                  <p className="font-semibold">{t.name}</p>
                  <p className="text-zinc-500 text-sm">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t border-zinc-800">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to grow your fitness business?</h2>
          <p className="text-zinc-400 text-lg mb-8">
            Start your 14-day free trial today. No credit card required.
          </p>
          <a
            href="https://eddytrains-admin.vercel.app/signup"
            className="inline-block px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-lg rounded-xl transition-colors"
          >
            Start Your Free Trial
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center font-bold text-black text-sm">
                C
              </div>
              <span className="font-semibold">CMPD</span>
            </div>
            <p className="text-zinc-500 text-sm">
              © {new Date().getFullYear()} CMPD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
