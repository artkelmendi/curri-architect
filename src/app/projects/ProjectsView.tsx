"use client";

import { projects } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { LineReveal, Reveal } from "@/components/Reveal";
import ProjectCard from "@/components/ProjectCard";

export default function ProjectsView() {
  const { t } = useLang();

  return (
    <section className="mx-auto max-w-[1700px] px-6 pb-32 pt-36 md:px-12 md:pt-44">
      {/* Header */}
      <div className="mb-20 md:mb-28">
        <Reveal y={0} delay={0.1}>
          <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-bone/50">
            <span className="h-px w-12 bg-accent" />
            {t.projectsPage.eyebrow}
          </p>
        </Reveal>
        <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
          <LineReveal
            as="h1"
            delay={0.15}
            className="font-display text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.88] tracking-[-0.03em]"
            lines={[<span key="0">{t.projectsPage.title}</span>]}
          />
          <Reveal delay={0.4}>
            <span className="mb-3 inline-block font-display text-2xl font-bold text-accent md:text-4xl">
              ({String(projects.length).padStart(2, "0")})
            </span>
          </Reveal>
        </div>
        <Reveal delay={0.45} className="mt-8 max-w-[52ch]">
          <p className="text-base leading-relaxed text-bone/55">
            {t.projectsPage.blurb}
          </p>
        </Reveal>
      </div>

      {/* Grid */}
      <div className="grid gap-x-10 gap-y-20 md:grid-cols-2">
        {projects.map((project, i) => (
          <div key={project.slug} className={i % 2 === 1 ? "md:mt-32" : ""}>
            <ProjectCard project={project} index={i} delay={(i % 2) * 0.1} />
          </div>
        ))}
      </div>
    </section>
  );
}
