import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Nav from '../../_components/Nav';
import Media from '../../_components/Media';
import BuyButton from './BuyButton';
import { programs, getProgram, perSession, perDay, sessionCount } from '../../programs';
import { contentFor } from '../../program-content';
import { MEDICAL_DISCLAIMER, CUSTOM_URL } from '../../site';

// The page between the quiz and the checkout.
//
// The quiz says which program. This says what it is and why it works, then
// takes the money. Statically generated for all six, so it loads instantly
// from the edge rather than waiting on anything.

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProgram(slug);
  const c = contentFor(slug);
  if (!p || !c) return {};
  return {
    title: `CMPD | ${p.name}`,
    description: c.promise,
    openGraph: { title: `${p.name} — CMPD`, description: c.promise },
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  const content = contentFor(slug);
  if (!program || !content) notFound();

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Nav />

      <main className="mx-auto max-w-3xl px-5 pb-24 pt-28 sm:px-6 sm:pt-32">
        <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">
          {program.area}
        </span>
        <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
          {program.name}
        </h1>
        <p className="mt-4 text-lg text-neutral-300 sm:text-xl">{content.promise}</p>

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-neutral-400">
          <span>{program.weeks} weeks</span>
          <span>{sessionCount(program)} sessions</span>
          <span>4 a week, 30 to 45 minutes</span>
          <span>Gym-based</span>
        </div>

        {/* Eddy explaining it. Nothing renders until the file exists. */}
        <div className="mt-8">
          <Media
            src={`/media/program-${program.id}.mp4`}
            kind="video"
            ratio="aspect-video"
            label={`${program.name} explained`}
          />
        </div>

        {/* Why */}
        <section className="mt-12">
          <h2 className="text-xl font-bold sm:text-2xl">Why this works</h2>
          <div className="mt-4 space-y-4">
            {content.why.map((para) => (
              <p key={para.slice(0, 24)} className="leading-relaxed text-neutral-400">
                {para}
              </p>
            ))}
          </div>
        </section>

        {/* What's in it */}
        <section className="mt-12">
          <h2 className="text-xl font-bold sm:text-2xl">What you get</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {content.inside.map((item) => (
              <div key={item.title} className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5">
                <h3 className="font-semibold text-neutral-50">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Who it is not for. Deliberately before the price. */}
        <section className="mt-12">
          <h2 className="text-xl font-bold sm:text-2xl">Do not buy this if</h2>
          <ul className="mt-4 space-y-2">
            {content.notFor.map((item) => (
              <li key={item} className="flex gap-3 leading-relaxed text-neutral-400">
                <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-neutral-500">
            Any of those and you want a program written for you, not one off the shelf.{' '}
            <Link href={CUSTOM_URL} className="text-accent hover:underline">
              Start with the injury form
            </Link>
            .
          </p>
        </section>

        {/* Price and the buy */}
        <section className="mt-12 rounded-2xl border-2 border-accent bg-neutral-900 p-6 glow-sm sm:p-8">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-3xl font-bold sm:text-4xl">${perSession(program)}</span>
            <span className="text-neutral-400">a session</span>
          </div>
          <p className="mt-3 text-neutral-300">
            <span className="font-semibold text-neutral-50">${program.price}</span> once, for{' '}
            {sessionCount(program)} sessions over {program.weeks} weeks.
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            ${perDay(program)} a day. No subscription, nothing to cancel.
          </p>

          <BuyButton slug={program.id} />

          <p className="mt-4 text-sm text-neutral-500">
            Access starts the first Monday after you buy and runs to the last training day of
            week {program.weeks}. You will get an email to set your password.
          </p>
        </section>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          <Link href="/quiz" className="text-neutral-400 transition-colors hover:text-neutral-50">
            Retake the quiz
          </Link>
          <Link href="/#programs" className="text-neutral-400 transition-colors hover:text-neutral-50">
            See all programs
          </Link>
        </div>

        <p className="mt-10 text-xs leading-relaxed text-neutral-500">{MEDICAL_DISCLAIMER}</p>
      </main>
    </div>
  );
}
