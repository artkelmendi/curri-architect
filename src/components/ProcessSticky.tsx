"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/lib/i18n";
import { LineReveal, Reveal } from "./Reveal";
import Magnetic from "./Magnetic";

/**
 * Long sticky-scroll process section. On desktop the left column pins for the
 * full height of the tall step panels on the right, and an index highlights the
 * active step as you scroll. On mobile it gracefully stacks — no pinning, no
 * scroll listeners beyond a cheap IntersectionObserver — so it never lags.
 */
export default function ProcessSticky() {
  const { t } = useLang();
  const items = t.services.items;
  const [active, setActive] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const idx = Number(
              (entry.target as HTMLElement).dataset.index ?? 0
            );
            setActive(idx);
          }
        }
      },
      // A thin band across the middle of the viewport picks the "current" step.
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );
    panelRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [items.length]);

  return (
    <section className="border-t border-line">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16">
          {/* ── Sticky left ─────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="pt-24 md:pt-32 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:pt-0">
              <LineReveal
                as="h2"
                className="font-display text-[clamp(2.6rem,6vw,6rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]"
                lines={[
                  <span key="0">
                    {t.services.headingPre}
                    <span className="text-accent">
                      {t.services.headingAccent}
                    </span>
                  </span>,
                ]}
              />
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-[38ch] text-sm leading-relaxed text-bone/50">
                  {t.services.intro}
                </p>
              </Reveal>

              {/* Index — active step lights up as you scroll */}
              <ul className="mt-10 hidden flex-col gap-1 lg:flex">
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
                      <span className="relative flex-1 text-xs font-medium uppercase tracking-[0.2em]">
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

          {/* ── Scrolling steps right ───────────────────── */}
          <div className="lg:col-span-7">
            {items.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                data-index={i}
                className="flex min-h-[62vh] flex-col justify-center border-t border-line py-14 first:border-t-0 lg:min-h-[85vh] lg:border-t-0"
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
