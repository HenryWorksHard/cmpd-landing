import Link from 'next/link';
import Image from 'next/image';
import { LOGIN_URL, MEDICAL_DISCLAIMER } from '../site';

// Where Stripe sends someone after they pay.
//
// Deliberately says nothing about what they bought. The webhook does the real
// work, and it may not have finished by the time this renders, so claiming
// "your program is ready" here would sometimes be a lie. What is always true
// is that the payment went through and an email is coming.

export const metadata = { title: 'CMPD | Payment received' };

export default function WelcomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-neutral-950 text-neutral-50">
      <nav className="border-b border-neutral-800">
        <div className="mx-auto flex h-16 max-w-3xl items-center px-5 sm:px-6">
          <Link href="/" className="flex h-11 items-center" aria-label="CMPD, home">
            <Image src="/logo.png" alt="CMPD" width={1132} height={392} sizes="110px" className="h-7 w-auto sm:h-8" priority />
          </Link>
        </div>
      </nav>

      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 py-16 sm:px-6">
        <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">
          Payment received
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
          You are in. <span className="gradient-text">Check your email.</span>
        </h1>

        <div className="mt-8 rounded-2xl border border-neutral-800 bg-neutral-900 p-6">
          <p className="leading-relaxed text-neutral-300">
            We have sent you a link to set your password. Open it and your program is
            waiting in the CMPD app.
          </p>
          <p className="mt-4 leading-relaxed text-neutral-400">
            Week one starts on the first Monday from now, so the program begins at the
            start of a week rather than halfway through one.
          </p>
          <p className="mt-4 text-sm text-neutral-500">
            Nothing in your inbox after a few minutes? Check the spam folder, then email{' '}
            <a href="mailto:contact@cmpdcollective.com" className="text-accent hover:underline">
              contact@cmpdcollective.com
            </a>{' '}
            and we will sort it out.
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

        <p className="mt-10 text-xs leading-relaxed text-neutral-500">{MEDICAL_DISCLAIMER}</p>
      </main>
    </div>
  );
}
