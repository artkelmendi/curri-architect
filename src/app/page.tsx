"use client";

import Link from "next/link";
import { projects } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { LineReveal, Reveal } from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";
import MarqueeBand from "@/components/MarqueeBand";
import ProjectCard from "@/components/ProjectCard";
import Magnetic from "@/components/Magnetic";
import AnimatedLogoMark from "@/components/AnimatedLogoMark";

export default function Home() {
  const { t } = useLang();
  const featured = projects.slice(0, 4);

  return (
    <>
      {/* ── Hero ─────────────────────────────────────── */}
      <section className="relative">
        <div className="relative mx-auto max-w-[1700px] px-6 pt-36 md:px-12 md:pt-44">
          <div className="grid items-end gap-10 lg:grid-cols-12">
            <div className="lg:col-span-9">
              <Reveal y={0} delay={0.1}>
                <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-bone/50">
                  <span className="h-px w-12 bg-accent" />
                  {t.hero.eyebrow}
                </p>
              </Reveal>
              <LineReveal
                as="h1"
                delay={0.2}
                className="font-display text-[clamp(3.8rem,12vw,12rem)] font-black uppercase leading-[0.88] tracking-[-0.03em]"
                lines={[
                  <span key="0">{t.hero.l1}</span>,
                  <span key="1">
                    {t.hero.l2} <span className="text-accent">&</span>
                  </span>,
                  <span key="2" className="text-outline">
                    {t.hero.l3}
                  </span>,
                ]}
              />
            </div>
            <div className="lg:col-span-3">
              <Reveal delay={0.6}>
                <p className="max-w-[34ch] text-base leading-relaxed text-bone/60">
                  {t.hero.intro}
                </p>
                <Link
                  href="/projects"
                  className="group mt-8 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-accent"
                >
                  {t.hero.viewWork}
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </Link>
              </Reveal>
            </div>
          </div>

          {/* Hero image */}
          <Reveal delay={0.5} className="mt-16 md:mt-24">
            <Link href={`/projects/${featured[0].slug}`} className="group block">
              <ParallaxImage
                src={featured[0].hero}
                alt={featured[0].title}
                priority
                className="h-[55vh] md:h-[78vh]"
              />
              <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-bone/45">
                <span className="transition-colors duration-300 group-hover:text-accent">
                  {featured[0].title} — {featured[0].year}
                </span>
                <span>{t.hero.scroll}</span>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ── Marquee ──────────────────────────────────── */}
      <div className="mt-24 md:mt-36">
        <MarqueeBand />
      </div>

      {/* ── Selected works ───────────────────────────── */}
      <section className="mx-auto max-w-[1700px] px-6 py-28 md:px-12 md:py-40">
        <div className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-24">
          <LineReveal
            as="h2"
            className="font-display text-[clamp(2.6rem,7vw,7rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]"
            lines={[
              <span key="0">{t.works.l1}</span>,
              <span key="1">
                {t.works.l2}<span className="text-accent">.</span>
              </span>,
            ]}
          />
          <Reveal delay={0.2}>
            <Link
              href="/projects"
              className="group inline-flex items-center gap-3 rounded-full border border-bone/25 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.25em] text-bone transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-base"
            >
              {t.works.allProjects}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          </Reveal>
        </div>

        <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
          <ProjectCard project={featured[0]} index={0} />
          <div className="md:mt-32">
            <ProjectCard project={featured[1]} index={1} delay={0.1} />
          </div>
          <ProjectCard project={featured[2]} index={2} />
          <div className="md:mt-32">
            <ProjectCard project={featured[3]} index={3} delay={0.1} />
          </div>
        </div>
      </section>

      {/* ── The architect ────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto grid max-w-[1700px] gap-16 px-6 py-28 md:px-12 md:py-40 lg:grid-cols-2">
          <div>
            <LineReveal
              as="h2"
              className="font-display text-[clamp(2.6rem,6vw,6rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]"
              lines={t.about.headingLines.map((line, i) => (
                <span key={i} className={i === t.about.headingLines.length - 1 ? "text-outline-accent" : undefined}>
                  {line}
                </span>
              ))}
            />
            <Reveal delay={0.2} className="mt-10 space-y-6 text-lg leading-relaxed text-bone/65">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </Reveal>
            <div className="mt-14 grid grid-cols-2 gap-px bg-line md:grid-cols-4">
              {t.about.stats.map((s, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08} className="bg-base py-6 pr-4 md:px-5">
                  <p className="font-display text-4xl font-black text-accent md:text-5xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-[11px] uppercase tracking-[0.25em] text-bone/45">
                    {s.label}
                  </p>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.15} className="relative">
            <ParallaxImage
              src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1400&auto=format&fit=crop"
              alt={t.about.portraitAlt}
              className="h-[60vh] w-full lg:h-full lg:min-h-[640px]"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
            <div className="absolute -bottom-5 -left-5 hidden h-28 w-28 border-2 border-accent md:block" aria-hidden="true" />
          </Reveal>
        </div>
      </section>

      {/* ── Brand moment: the mark draws itself on scroll ── */}
      <section className="relative border-t border-line">
        <div className="relative mx-auto flex max-w-[1700px] flex-col items-center px-6 py-28 md:py-44">
          <AnimatedLogoMark className="h-44 w-auto text-accent md:h-64" />
          <Reveal delay={0.4} className="mt-12 text-center">
            <p className="text-xs uppercase tracking-[0.45em] text-bone/45">
              {t.band.tagline}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Services ─────────────────────────────────── */}
      <section className="border-t border-line">
        <div className="mx-auto max-w-[1700px] px-6 py-28 md:px-12 md:py-40">
          <div className="mb-16 flex flex-wrap items-end justify-between gap-6">
            <LineReveal
              as="h2"
              className="font-display text-[clamp(2.6rem,6vw,6rem)] font-black uppercase leading-[0.92] tracking-[-0.02em]"
              lines={[
                <span key="0">
                  {t.services.headingPre}
                  <span className="text-accent">{t.services.headingAccent}</span>
                </span>,
              ]}
            />
            <Reveal delay={0.15}>
              <p className="max-w-[36ch] text-sm leading-relaxed text-bone/50">
                {t.services.intro}
              </p>
            </Reveal>
          </div>

          <div>
            {t.services.items.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.05}>
                <div className="group grid cursor-default gap-2 border-t border-line py-8 transition-colors duration-300 hover:bg-raised md:grid-cols-12 md:items-center md:gap-6 md:py-10">
                  <span className="font-display text-sm font-bold text-accent md:col-span-1 md:pl-4">
                    {s.n}
                  </span>
                  <h3 className="font-display text-3xl font-bold uppercase tracking-tight text-bone transition-transform duration-300 group-hover:translate-x-2 md:col-span-6 md:text-5xl">
                    {s.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-bone/50 md:col-span-4">
                    {s.desc}
                  </p>
                  <span className="hidden justify-end pr-4 md:col-span-1 md:flex">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" aria-hidden="true">
                      <path d="M7 17L17 7M9 7h8v8" />
                    </svg>
                  </span>
                </div>
              </Reveal>
            ))}
            <div className="border-t border-line" />
          </div>

          <Reveal delay={0.2} className="mt-16">
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
      </section>
    </>
  );
}
