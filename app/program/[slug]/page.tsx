import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Nav from '../../_components/Nav';
import Media from '../../_components/Media';
import BuyButton from './BuyButton';
import StickyBuy from './StickyBuy';
import { programs, getProgram, perSession, perDay, sessionCount } from '../../programs';
import { contentFor } from '../../program-content';
import { MEDICAL_DISCLAIMER, CUSTOM_URL } from '../../site';

// The page between the quiz and the checkout.
//
// The quiz says which program. This says what it is and takes the money.
// Statically generated for all six, so it loads instantly from the edge.
//
// HOW IT IS LAID OUT, AND WHY
//
// The price sits in a sticky column on the right from `lg` up, and directly
// under the headline on a phone. Either way it is the second thing read, not
// the last: somebody arriving from the quiz has already decided they want the
// area sorted, and the only question left is what it costs. Burying that
// under a thousand words of reasons does not make the number smaller, it just
// makes them scroll looking for it.
//
// Everything above the fold is the finished state rather than the method.
// "Pressing a barbell again" is what someone is buying; "progressive loading
// protocol" is what they are being given. The method is further down for the
// people who want it, which is a minority, which is why it is short.
//
// The price is always said twice: once per session and once in total. The
// total on its own invites a straight yes or no; the per-session figure gives
// it a scale, and the comparison it invites (one physio appointment) is both
// true and in our favour. Neither number is hidden, so neither is a trick.

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

function Tick() {
  return (
    <svg
      viewBox="0 0 20 20"
      aria-hidden
      className="mt-0.5 h-5 w-5 shrink-0 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m4 10.5 4 4 8-9" />
    </svg>
  );
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  const content = contentFor(slug);
  if (!program || !content) notFound();

  const sessions = sessionCount(program);

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      <Nav />

      <main className="shell pb-28 pt-24 sm:pt-28 lg:pb-32 lg:pt-32">
        {/* Three cells, and the order they fall into on a phone is the whole
            reason for the explicit placement: headline, then price, then the
            long stuff. Left to itself a grid would put the aside last on a
            narrow screen and the price would be the final thing on the page. */}
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_21rem] lg:gap-x-14 xl:grid-cols-[minmax(0,1fr)_24rem] xl:gap-x-20">
          <header className="measure lg:col-start-1 lg:row-start-1">
            <span className="text-xs font-medium uppercase tracking-wider text-accent sm:text-sm">
              {program.area}
            </span>
            <h1 className="mt-3 text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl">
              {program.name}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-neutral-300 sm:text-xl lg:text-2xl">
              {content.promise}
            </p>
          </header>

          <aside
            id="buy-card"
            className="lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:self-start lg:sticky lg:top-24"
          >
            <div className="rounded-2xl border-2 border-accent bg-neutral-900 p-6 glow-sm xl:p-8">
              {/* The anchor goes before the price, not after it. */}
              <p className="text-sm text-neutral-400">
                One physio appointment is $90 or more.
              </p>

              <div className="mt-3 flex flex-wrap items-baseline gap-x-2">
                <span className="text-4xl font-bold tracking-tight xl:text-5xl">
                  ${perSession(program)}
                </span>
                <span className="text-neutral-400">a session</span>
              </div>

              <p className="mt-3 leading-relaxed text-neutral-300">
                <span className="font-semibold text-neutral-50">${program.price}</span> once, for{' '}
                {sessions} sessions across {program.weeks} weeks. That is ${perDay(program)} a day.
              </p>

              <BuyButton slug={program.id} />

              <ul className="mt-5 space-y-2 text-sm text-neutral-400">
                <li className="flex gap-2.5">
                  <Tick />
                  One payment. No subscription, nothing to cancel.
                </li>
                <li className="flex gap-2.5">
                  <Tick />
                  Every session in the CMPD app, every exercise on video.
                </li>
                <li className="flex gap-2.5">
                  <Tick />
                  Written by an exercise physiologist, not generated.
                </li>
              </ul>

              <p className="mt-5 border-t border-neutral-800 pt-4 text-sm leading-relaxed text-neutral-500">
                You get an email to set your password straight away. Week one starts the first
                Monday after you buy.
              </p>
            </div>
          </aside>

          <div className="lg:col-start-1 lg:row-start-2">
            {/* Eddy explaining it. Nothing renders until the file exists. */}
            <Media
              src={`/media/program-${program.id}.mp4`}
              kind="video"
              ratio="aspect-video"
              label={`${program.name} explained`}
            />

            <section className="mt-10 lg:mt-12">
              <h2 className="text-xl font-bold sm:text-2xl">
                Where you are in {program.weeks} weeks
              </h2>
              <ul className="mt-5 space-y-3.5">
                {content.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-base leading-relaxed text-neutral-200 sm:text-lg">
                    <Tick />
                    {o}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12 lg:mt-16">
              <h2 className="text-xl font-bold sm:text-2xl">What you get</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {content.inside.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-neutral-800 bg-neutral-900 p-5 xl:p-6"
                  >
                    <h3 className="font-semibold text-neutral-50">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-neutral-400">{item.body}</p>
                  </div>
                ))}
              </div>
              <p className="mt-5 text-sm text-neutral-500">
                {program.weeks} weeks, {sessions} sessions, four a week at 30 to 45 minutes. Gym-based.
              </p>
            </section>

            <section className="mt-12 lg:mt-16">
              <h2 className="text-xl font-bold sm:text-2xl">Why it works</h2>
              <p className="measure mt-4 leading-relaxed text-neutral-400">{content.why}</p>
            </section>

            {/* One line rather than the old wall of reasons not to buy, but it
                stays: the symptoms named here are the ones that need a person,
                not a program off a shelf. */}
            <p className="measure mt-10 text-sm leading-relaxed text-neutral-500">
              Numbness, pins and needles or weakness, or an injury nobody has looked at yet? That
              wants a program written for you.{' '}
              <Link href={CUSTOM_URL} className="text-accent hover:underline">
                Start with the injury form
              </Link>
              .
            </p>

            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
              <Link href="/quiz" className="text-neutral-400 transition-colors hover:text-neutral-50">
                Retake the quiz
              </Link>
              <Link href="/#programs" className="text-neutral-400 transition-colors hover:text-neutral-50">
                See all programs
              </Link>
            </div>

            <p className="measure mt-10 text-xs leading-relaxed text-neutral-500">
              {MEDICAL_DISCLAIMER}
            </p>
          </div>
        </div>
      </main>

      <StickyBuy slug={program.id} perSession={perSession(program)} total={program.price} />
    </div>
  );
}
