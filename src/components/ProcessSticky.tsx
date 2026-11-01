"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { LineReveal, Reveal } from "./Reveal";
import Magnetic from "./Magnetic";

/**
 * Desktop retains the sticky service index. Mobile is deliberately normal flow:
 * no secondary pinned layer for Safari to re-composite while
 * its address bar changes size. Scroll-driven React updates are desktop-only.
 */
export default function ProcessSticky() {
  const { t } = useLang();
  const items = t.services.items;
  const total = items.length;
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const desktopLayout = window.matchMedia("(min-width: 1024px)");
    let frame = 0;
    let current = -1;
    const sample = () => {
      frame = 0;
      if (!desktopLayout.matches) return;
      const panels = panelRefs.current.filter((panel) => panel !== null);
      if (!panels.length) return;
      const first = panels[0].getBoundingClientRect();
      const last = panels[panels.length - 1].getBoundingClientRect();
      if (first.top > window.innerHeight || last.bottom < 80) return;
      const activationLine = Math.max(180, window.innerHeight * .5);
      // Always calculate from document order, not observer callback order.
      const found = panels.findIndex((panel) => panel.getBoundingClientRect().bottom > activationLine);
      const next = found < 0 ? panels.length - 1 : found;
      if (next !== current) { current = next; setActive(next); }
    };
    const schedule = () => { if (desktopLayout.matches && !frame) frame = requestAnimationFrame(sample); };
    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(frame);
    };
  }, [total]);

  const heading = (
    <>
      {t.services.headingPre}
      <span className="text-accent">{t.services.headingAccent}</span>
    </>
  );

  return (
    <section id="services" className="services-section border-t border-line">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        {/* Mobile heading (scrolls away) */}
        <div className="services-mobile-intro pt-24 md:pt-32 lg:hidden">
          <Reveal y={24}>
          <h2 className="font-display text-[clamp(2.6rem,11vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.02em]">{heading}</h2>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-bone/55">
              {t.services.intro}
            </p>
          </Reveal>
        </div>

        {/* Desktop-only sticky context; phone content stays in normal flow. */}
        <div className="relative">
          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            {/* Desktop sticky left */}
            <div className="services-desktop-index hidden lg:col-span-5 lg:block" data-active-step={active}>
              <div className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center">
                <LineReveal
                  as="h2"
                  className="font-display text-[clamp(2.6rem,6vw,6rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]"
                  lines={[<span key="0">{heading}</span>]}
                />
                <Reveal delay={0.15}>
                  <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-bone/50">
                    {t.services.intro}
                  </p>
                </Reveal>
                <ul className="mt-10 flex flex-col gap-1">
                  {items.map((s, i) => (
                    <li key={s.n}>
                      <button
                        type="button"
                        onClick={() =>
                          panelRefs.current[i]?.scrollIntoView({
                            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                            block: "center",
                          })
                        }
                        className={`flex w-full items-center gap-4 py-2 text-left transition-colors duration-300 ${
                          active === i ? "text-bone" : "text-bone/35"
                        }`}
                      >
                        <span
                          className={`font-display text-xs font-bold transition-colors duration-300 ${
                            active === i ? "text-accent" : "text-bone/30"
                          }`}
                        >
                          {s.n}
                        </span>
                        <span className="flex-1 text-xs font-medium uppercase tracking-[0.2em]">
                          {s.name}
                        </span>
                        <span
                          className={`h-px bg-accent transition-all duration-500 ${
                            active === i ? "w-8" : "w-0"
                          }`}
                        />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Scrolling step panels */}
            <div className="lg:col-span-7">
              {items.map((s, i) => (
                <div
                  key={s.n}
                  ref={(el) => {
                    panelRefs.current[i] = el;
                  }}
                  data-index={i}
                  className="services-panel flex min-h-[58svh] flex-col justify-center border-t border-line py-14 first:border-t-0 lg:min-h-[85svh] lg:border-t-0"
                >
                  <Reveal>
                    <span className="font-display text-6xl font-black leading-none text-accent/25 md:text-8xl">
                      {s.n}
                    </span>
                    <h3 className="mt-5 font-display text-[clamp(1.5rem,6.5vw,2.25rem)] font-bold uppercase leading-[1.05] tracking-tight text-bone md:text-6xl">
                      {s.name}
                    </h3>
                    <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-bone/60 md:text-xl">
                      {s.desc}
                    </p>
                  </Reveal>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-line py-20 md:py-28">
          <Reveal>
            <Magnetic>
              <Link
                href="/contact"
                className="group inline-flex items-center gap-4 rounded-full border border-bone/25 px-9 py-4 text-xs font-semibold uppercase tracking-[0.25em] text-bone transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-base"
              >
                {t.services.cta}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </Link>
            </Magnetic>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
