import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { POLICY, LAST_UPDATED } from './policy';

export const metadata: Metadata = {
  title: 'CMPD | Privacy Policy',
  description:
    'How CMPD collects, uses, stores and protects your personal and health information, under the Privacy Act 1988 (Cth).',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <nav className="border-b border-neutral-800">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-5 sm:px-6">
          <Link href="/" className="flex h-11 items-center" aria-label="CMPD, home">
            <Image src="/logo.png" alt="CMPD" width={1132} height={392} sizes="110px" className="h-7 w-auto sm:h-8" priority />
          </Link>
        </div>
      </nav>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:px-6 sm:py-20">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-neutral-500">Last updated {LAST_UPDATED}</p>

        <p className="mt-6 leading-relaxed text-neutral-300">
          CMPD holds health information about the people it trains. This policy says exactly
          what we collect, who can see it, how it is protected and how long we keep it.
        </p>

        <div className="mt-12 space-y-12">
          {POLICY.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold text-neutral-50 sm:text-2xl">{section.heading}</h2>
              <div className="mt-4 space-y-4">
                {section.body.map((para) => (
                  <p key={para.slice(0, 28)} className="leading-relaxed text-neutral-400">
                    {para}
                  </p>
                ))}
              </div>
              {section.list && (
                <ul className="mt-4 space-y-3">
                  {section.list.map((item) => (
                    <li key={item.slice(0, 28)} className="flex gap-3 leading-relaxed text-neutral-400">
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        <div className="mt-14 border-t border-neutral-800 pt-8">
          <Link href="/" className="text-sm text-neutral-400 transition-colors hover:text-neutral-50">
            Back to the site
          </Link>
        </div>
      </main>
    </div>
  );
}
