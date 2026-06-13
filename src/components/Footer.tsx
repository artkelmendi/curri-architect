"use client";

import Link from "next/link";
import { LogoFull } from "./LogoMark";
import Magnetic from "./Magnetic";
import { LineReveal, Reveal } from "./Reveal";
import { useLang } from "@/lib/i18n";

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" className="h-5 w-5" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.25 8.25h4.5V23H.25V8.25zM8.5 8.25h4.31v2.02h.06c.6-1.14 2.07-2.34 4.26-2.34 4.55 0 5.39 3 5.39 6.89V23h-4.5v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V23H8.5V8.25z" />
      </svg>
    ),
  },
  {
    label: "Behance",
    href: "https://behance.net",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
        <path d="M9.1 11.2c.8-.4 1.4-1.2 1.4-2.4 0-2.4-1.8-3-3.9-3H0v12.4h6.8c2.4 0 4.6-1.1 4.6-3.8 0-1.6-.8-2.8-2.3-3.2zM3 8h3.2c1 0 1.7.4 1.7 1.4 0 1-.7 1.4-1.6 1.4H3V8zm3.6 8H3v-3.3h3.7c1.2 0 2 .5 2 1.7 0 1.2-.9 1.6-2.1 1.6zM21.6 7.1h-5.5V8.5h5.5V7.1zM18.8 9.4c-3 0-5.2 2.1-5.2 5.2 0 3.2 2.1 5.2 5.3 5.2 2.4 0 4.2-1.2 4.9-3.3h-2.7c-.3.8-1.1 1.2-2.1 1.2-1.4 0-2.3-.8-2.5-2.3H24v-.7c0-3.1-1.9-5.3-5.2-5.3zm-2.3 4.2c.2-1.2 1-2 2.3-2 1.4 0 2.1.9 2.2 2h-4.5z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="relative z-10 border-t border-line">
      {/* Big CTA */}
      <div className="relative overflow-hidden">
        <div className="relative mx-auto max-w-[1700px] px-6 py-28 md:px-12 md:py-40">
        <Reveal>
          <p className="mb-8 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-bone/50">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
            {t.footerCta.available}
          </p>
        </Reveal>
        <LineReveal
          as="h2"
          className="font-display text-[clamp(2.8rem,8vw,8rem)] font-black uppercase leading-[0.95] tracking-[-0.02em]"
          lines={[
            <span key="0">{t.footerCta.l1}</span>,
            <span key="1">
              {t.footerCta.l2} <span className="text-accent">{t.footerCta.accent}</span>
            </span>,
          ]}
        />
        <Reveal delay={0.25} className="mt-14">
          <Magnetic>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 rounded-full bg-accent px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-base transition-colors duration-300 hover:bg-bone"
            >
              {t.footerCta.button}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Magnetic>
        </Reveal>
        </div>
      </div>

      {/* Info grid */}
      <div className="border-t border-line">
        <div className="mx-auto grid max-w-[1700px] gap-12 px-6 py-16 md:grid-cols-4 md:px-12">
          <div>
            <LogoFull className="h-28 w-auto text-bone" />
            <p className="mt-6 max-w-[28ch] text-sm leading-relaxed text-bone/55">
              {t.footer.blurb}
            </p>
          </div>
          <div>
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-bone/40">
              {t.footer.menuTitle}
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/", label: t.nav.home },
                { href: "/projects", label: t.nav.projects },
                { href: "/contact", label: t.nav.contact },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-sm text-bone/70 transition-colors duration-200 hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-bone/40">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-3 text-sm text-bone/70">
              <li>
                <a
                  href="mailto:hello@curriarchitect.com"
                  className="transition-colors duration-200 hover:text-accent"
                >
                  hello@curriarchitect.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+38344000000"
                  className="transition-colors duration-200 hover:text-accent"
                >
                  +383 44 000 000
                </a>
              </li>
              <li className="text-bone/45">{t.footer.city}</li>
            </ul>
          </div>
          <div>
            <h3 className="mb-5 text-[11px] uppercase tracking-[0.35em] text-bone/40">
              {t.footer.followTitle}
            </h3>
            <div className="flex gap-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-bone/60 transition-colors duration-300 hover:border-accent hover:text-accent"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-2 px-6 py-6 text-[11px] uppercase tracking-[0.3em] text-bone/35 md:flex-row md:px-12">
          <span>{t.footer.rights}</span>
          <span>{t.footer.tagline}</span>
        </div>
      </div>
    </footer>
  );
}
