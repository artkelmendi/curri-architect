"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { LineReveal, Reveal } from "@/components/Reveal";
import ParallaxImage from "@/components/ParallaxImage";

export default function ProjectView({
  project,
  next,
}: {
  project: Project;
  next: Project;
}) {
  const { lang, t } = useLang();

  const meta = [
    { label: t.project.meta.year, value: project.year },
    { label: t.project.meta.location, value: project.location },
    { label: t.project.meta.category, value: project.category[lang] },
    { label: t.project.meta.area, value: project.area },
    { label: t.project.meta.scope, value: project.scope[lang] },
  ];

  return (
    <article className="pt-36 md:pt-44">
      <div className="mx-auto max-w-[1700px] px-6 md:px-12">
        {/* Back link */}
        <Reveal y={0} delay={0.05}>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-bone/50 transition-colors duration-200 hover:text-accent"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden="true">
              <path d="M19 12H5M11 6l-6 6 6 6" />
            </svg>
            {t.project.back}
          </Link>
        </Reveal>

        {/* Title */}
        <LineReveal
          as="h1"
          delay={0.15}
          className="mt-10 font-display text-[clamp(3rem,9vw,9rem)] font-black uppercase leading-[0.9] tracking-[-0.03em]"
          lines={project.title.split(" ").map((word, i) => (
            <span key={i} className={i === 1 ? "text-outline" : undefined}>
              {word}
            </span>
          ))}
        />

        {/* Meta */}
        <Reveal delay={0.35} className="mt-14">
          <dl className="grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-5">
            {meta.map((m) => (
              <div key={m.label} className="bg-base p-5 md:p-6">
                <dt className="text-[10px] uppercase tracking-[0.3em] text-bone/40">
                  {m.label}
                </dt>
                <dd className="mt-2 font-display text-base font-bold text-bone md:text-lg">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* Hero image */}
      <Reveal delay={0.2} className="mx-auto mt-16 max-w-[1700px] px-6 md:px-12">
        <ParallaxImage
          src={project.hero}
          alt={project.title}
          priority
          className="h-[55vh] md:h-[82vh]"
        />
      </Reveal>

      {/* Description */}
      <div className="mx-auto max-w-[1700px] px-6 py-24 md:px-12 md:py-36">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <p className="flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-accent">
              <span className="h-px w-12 bg-accent" />
              {t.project.aboutProject}
            </p>
          </Reveal>
          <div className="space-y-8 lg:col-span-7 lg:col-start-6">
            {project.description[lang].map((para, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className="text-xl leading-relaxed text-bone/70 md:text-2xl">
                  {para}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery */}
      <div className="mx-auto max-w-[1700px] space-y-10 px-6 md:px-12">
        <Reveal>
          <ParallaxImage
            src={project.gallery[0]}
            alt={`${project.title} — ${t.project.view(1)}`}
            className="h-[50vh] md:h-[75vh]"
          />
        </Reveal>
        <div className="grid gap-10 md:grid-cols-2">
          {project.gallery.slice(1).map((src, i) => (
            <Reveal key={src} delay={i * 0.1}>
              <ParallaxImage
                src={src}
                alt={`${project.title} — ${t.project.view(i + 2)}`}
                className="h-[45vh] md:h-[60vh]"
                sizes="(min-width: 768px) 50vw, 100vw"
              />
            </Reveal>
          ))}
        </div>
      </div>

      {/* Next project */}
      <div className="mt-28 border-t border-line md:mt-40">
        <Link href={`/projects/${next.slug}`} className="group block">
          <div className="mx-auto flex max-w-[1700px] flex-col gap-4 px-6 py-20 md:px-12 md:py-28">
            <span className="text-xs uppercase tracking-[0.4em] text-bone/40">
              {t.project.next}
            </span>
            <span className="flex items-center justify-between gap-6">
              <span className="font-display text-[clamp(2.4rem,7vw,7rem)] font-black uppercase leading-[0.95] tracking-[-0.02em] text-bone transition-colors duration-300 group-hover:text-accent">
                {next.title}
              </span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-10 w-10 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-3 md:h-16 md:w-16" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </div>
        </Link>
      </div>
    </article>
  );
}
