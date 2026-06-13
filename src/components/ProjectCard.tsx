"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

export default function ProjectCard({
  project,
  index,
  delay = 0,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: {
  project: Project;
  index: number;
  delay?: number;
  sizes?: string;
}) {
  const { lang } = useLang();
  return (
    <Reveal delay={delay}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden bg-raised">
          <Image
            src={project.hero}
            alt={project.title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-base/0 transition-colors duration-500 group-hover:bg-base/20" />
          {/* Hover arrow chip */}
          <div className="absolute right-5 top-5 flex h-12 w-12 translate-y-2 items-center justify-center rounded-full bg-accent opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.2" className="h-5 w-5" aria-hidden="true">
              <path d="M7 17L17 7M9 7h8v8" />
            </svg>
          </div>
        </div>
        <div className="mt-5 flex items-start justify-between gap-6">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-bone transition-colors duration-300 group-hover:text-accent md:text-3xl">
              {project.title}
            </h3>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-bone/45">
              {project.category[lang]} — {project.location}, {project.year}
            </p>
          </div>
          <span className="font-display text-sm font-bold text-accent/80">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
      </Link>
    </Reveal>
  );
}
