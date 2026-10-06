"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_LINKS, LOGIN_URL } from "../site";

/**
 * The header.
 *
 * The old version hid the section links outright below `md` and left a phone
 * with two buttons and no way to reach most of the page. They go into a sheet
 * instead — which is also why the bar closes on route change, on Escape and on
 * a tap anywhere else.
 */
export default function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("click", close);
    window.addEventListener("keydown", key);
    // A menu over a scrolling page reads as broken; hold the page still.
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-800 bg-neutral-950/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          <Link href="/" className="flex h-11 shrink-0 items-center" aria-label="CMPD, home">
            <Image
              src="/logo.png"
              alt="CMPD"
              width={1132}
              height={392}
              sizes="130px"
              className="h-7 w-auto sm:h-8"
              priority
            />
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-50"
              >
                {l.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <a
              href={LOGIN_URL}
              className="hidden text-sm font-medium text-neutral-400 transition-colors hover:text-neutral-50 sm:block"
            >
              Sign In
            </a>
            <Link
              href="/quiz"
              className="inline-flex h-11 items-center rounded-md bg-accent px-4 text-sm font-semibold text-neutral-950 transition-colors hover:bg-accent-light sm:px-5"
            >
              Find your program
            </Link>

            <button
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={(e) => {
                e.stopPropagation();
                setOpen((v) => !v);
              }}
              className="grid h-11 w-11 shrink-0 place-items-center rounded-md border border-neutral-700 text-neutral-200 transition-colors hover:border-accent lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span aria-hidden className="flex flex-col gap-[5px]">
                <span
                  className={`block h-px w-4 bg-current transition-transform ${open ? "translate-y-[6px] rotate-45" : ""}`}
                />
                <span className={`block h-px w-4 bg-current transition-opacity ${open ? "opacity-0" : ""}`} />
                <span
                  className={`block h-px w-4 bg-current transition-transform ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
                />
              </span>
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div
          className="border-t border-neutral-800 bg-neutral-950 lg:hidden"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-3.5 text-base font-medium text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-neutral-50"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={LOGIN_URL}
              className="block rounded-md px-3 py-3.5 text-base font-medium text-neutral-300 transition-colors hover:bg-neutral-900 hover:text-neutral-50"
            >
              Sign In
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
