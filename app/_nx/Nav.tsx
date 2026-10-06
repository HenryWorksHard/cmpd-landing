"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { NAV_LINKS, LOGIN_URL } from "../site";

/**
 * The header. Two states, and it is readable in both.
 *
 * Over the hero it is a light pill on dark artwork; past the hero the page is
 * paper, so a white pill would disappear into it — it contracts and inverts.
 *
 * Under about 1040px the links pill stops fitting beside a logo and a call to
 * action. It moves into a sheet rather than being hidden, which is the cheap
 * option and takes half the page away from every phone.
 */
export default function Nav({ overHero = false }: { overHero?: boolean }) {
  const [past, setPast] = useState(!overHero);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!overHero) return;
    const onScroll = () => setPast(window.scrollY > window.innerHeight * 0.6);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [overHero]);

  // Anywhere else, and Escape. A menu you have to find the button again to
  // close is a menu people leave open.
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const key = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("click", close);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", key);
    };
  }, [open]);

  return (
    <header className={`nx-nav${past ? " nx-nav-past" : ""}`}>
      <Link href="/" className="nx-brand" aria-label="CMPD, home">
        <span className="nx-brand-pill">
          <Image src="/logo.png" alt="CMPD" width={1132} height={392} sizes="130px" priority />
        </span>
      </Link>

      <nav className="nx-nav-links" aria-label="Sections">
        {NAV_LINKS.map((l) => (
          <Link key={l.href} href={l.href}>
            {l.label}
          </Link>
        ))}
      </nav>

      <div className="nx-nav-right">
        <a href={LOGIN_URL} className="nx-nav-signin">
          Sign in
        </a>
        <Link href="/quiz" className="nx-btn nx-nav-cta">
          Find your program
        </Link>
        <button
          className="nx-nav-burger"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={(e) => {
            e.stopPropagation();
            setOpen((v) => !v);
          }}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className="nx-sheet" onClick={(e) => e.stopPropagation()}>
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <a href={LOGIN_URL}>Sign in</a>
        </div>
      )}
    </header>
  );
}
