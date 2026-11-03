import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Media from '../../_components/Media';
import { programs, getProgram, sessionCount } from '../../programs';
import { contentFor } from '../../program-content';
import { LOGIN_URL, MEDICAL_DISCLAIMER } from '../../site';

// Where Stripe sends someone after they pay, one page per program.
//
// It deliberately does not claim the program is already in their account.
// The webhook does that work and may not have finished by the time this
// renders, so the page says what is always true: the payment went through
// and an email is on its way.

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgram(slug);
  return { title: p ? `CMPD | Welcome to ${p.name}` : 'CMPD | Payment received' };
}

const STEPS = [
  {
    n: '01',
    t: 'Check your email',
    b: 'There is a link in your inbox to set a password. That is the only thing standing between you and the program. Check spam if it is not there in a few minutes.',
  },
  {
    n: '02',
    t: 'Open the CMPD app',
    b: 'Phone, tablet or laptop. Your program is already on your account, with every session laid out and every exercise on video.',
  },
  {
    n: '03',
    t: 'Start on Monday',
    b: 'Week one begins the first Monday from now, so you start at the start of a week rather than halfway through one. Have a look around before then.',
  },
];

export default async function WelcomePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  const content = contentFor(slug);
  if (!program || !content) notFound();

  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      <nav className="border-b border-neutral-800">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-5 sm:px-6">
          <Link href="/" className="flex h-11 items-center" aria-label="CMPD, home">
            <Image src="/logo.png" alt="CMPD" width={1132} height={392} sizes="110px" className="h-7 w-auto sm:h-8" priority />
          </Link>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-2xl flex-1 px-5 py-14 sm:px-6 sm:py-20">
        <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">
          Payment received
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          Welcome to <span className="gradient-text">{program.name}</span>
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-300">{content.welcome}</p>

        {/* Eddy welcoming them. Nothing renders until the file exists. */}
        <div className="mt-8">
          <Media
            src={`/media/welcome-${program.id}.mp4`}
            kind="video"
            ratio="aspect-video"
            label={`Welcome to ${program.name}`}
          />
        </div>

        <section className="mt-12">
          <h2 className="text-xl font-bold sm:text-2xl">What happens now</h2>
          <ol className="mt-5 space-y-4">
            {STEPS.map((s) => (
              <li key={s.n} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                <p className="text-2xl font-bold gradient-text">{s.n}</p>
                <h3 className="mt-2 font-semibold text-neutral-50">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{s.b}</p>
              </li>
            ))}
          </ol>
        </section>

        <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/60 p-5">
          <p className="text-sm leading-relaxed text-neutral-400">
            <span className="font-semibold text-neutral-50">
              {program.weeks} weeks, {sessionCount(program)} sessions.
            </span>{' '}
            Access runs from the first Monday after today to the last training day of week{' '}
            {program.weeks}.
          </p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={LOGIN_URL}
            className="rounded-md bg-accent px-7 py-3.5 text-center font-semibold text-neutral-950 transition-colors hover:bg-accent-light"
          >
            Go to the app
          </a>
          <Link
            href="/"
            className="rounded-md border border-neutral-700 px-7 py-3.5 text-center font-medium text-neutral-50 transition-all hover:border-accent hover:bg-neutral-900"
          >
            Back to the site
          </Link>
        </div>

        <p className="mt-8 text-sm text-neutral-500">
          Nothing in your inbox after a few minutes? Check spam, then email{' '}
          <a href="mailto:contact@cmpdcollective.com" className="text-accent hover:underline">
            contact@cmpdcollective.com
          </a>{' '}
          and we will sort it out.
        </p>

        <p className="mt-10 text-xs leading-relaxed text-neutral-500">{MEDICAL_DISCLAIMER}</p>
      </main>
    </div>
  );
}
