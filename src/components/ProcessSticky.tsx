"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { LineReveal, Reveal } from "./Reveal";
import Magnetic from "./Magnetic";

/**
 * Long sticky-scroll process section, pinning on every device:
 *  - Desktop: the left column pins for the full height of the tall step
 *    panels, with an index that highlights the active step.
 *  - Mobile: a compact progress bar pins at the top (active step + a filling
 *    line) while the panels scroll beneath it.
 * Both use plain CSS `position: sticky` + one cheap IntersectionObserver, so
 * there are no scroll listeners to jank on a phone.
 */
export default function ProcessSticky() {
  const { t } = useLang();
  const items = t.services.items;
  const total = items.length;
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(Number((entry.target as HTMLElement).dataset.index ?? 0));
          }
        }
      },
      // A thin band across the middle of the viewport marks the "current" step.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [total]);

  const heading = (
    <>
      {t.services.headingPre}
      <span className="text-accent">{t.services.headingAccent}</span>
    </>
  );

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        {/* Mobile heading (scrolls away) */}
        <div className="pt-24 md:pt-32 lg:hidden">
          <LineReveal
            as="h2"
            className="font-display text-[clamp(2.6rem,11vw,4rem)] font-black uppercase leading-[0.95] tracking-[-0.02em]"
            lines={[<span key="0">{heading}</span>]}
          />
          <Reveal delay={0.15}>
            <p className="mt-5 max-w-[42ch] text-sm leading-relaxed text-bone/55">
              {t.services.intro}
            </p>
          </Reveal>
        </div>

        {/* Sticky context: bar pins here, unpins when the steps end */}
        <div className="relative">
          {/* Mobile sticky progress bar */}
          <div className="sticky top-20 z-20 -mx-6 mt-8 border-y border-line bg-base px-6 py-3 md:-mx-12 md:px-12 lg:hidden">
            <div className="flex items-center justify-between gap-4">
              <span className="font-display text-xs font-bold uppercase tracking-[0.2em]">
                {heading}
              </span>
              <span className="font-display text-xs font-bold text-accent">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(total).padStart(2, "0")}
              </span>
            </div>
            <div className="mt-1.5 truncate text-[11px] uppercase tracking-[0.18em] text-bone/55">
              {items[active].name}
            </div>
            <div className="mt-2.5 h-0.5 w-full bg-line">
              <div
                className="h-full bg-accent transition-[width] duration-500 ease-out"
                style={{ width: `${((active + 1) / total) * 100}%` }}
              />
            </div>
          </div>

          <div className="lg:grid lg:grid-cols-12 lg:gap-16">
            {/* Desktop sticky left */}
            <div className="hidden lg:col-span-5 lg:block">
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
                            behavior: "smooth",
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
                  className="flex min-h-[58vh] flex-col justify-center border-t border-line py-14 first:border-t-0 lg:min-h-[85vh] lg:border-t-0"
                >
                  <Reveal>
                    <span className="font-display text-6xl font-black leading-none text-accent/25 md:text-8xl">
                      {s.n}
                    </span>
                    <h3 className="mt-5 font-display text-4xl font-bold uppercase leading-[0.95] tracking-tight text-bone md:text-6xl">
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
