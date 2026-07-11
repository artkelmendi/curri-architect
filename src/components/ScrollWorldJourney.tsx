"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState, useSyncExternalStore } from "react";
import {
  motion,
  type MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { projects, type Project } from "@/data/projects";
import { useLang } from "@/lib/i18n";

const scenes = projects.slice(0, 4);

const subscribeDesktop = (onChange: () => void) => {
  const query = window.matchMedia("(min-width: 1024px)");
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
};
const getDesktopSnapshot = () => window.matchMedia("(min-width: 1024px)").matches;
const getServerDesktopSnapshot = () => false;

const copy = {
  en: {
    chapter: "Built as one continuous journey",
    explore: "Explore project",
    route: "Project route",
    reduced: "Selected projects",
  },
  sq: {
    chapter: "Ndërtuar si një udhëtim i vazhdueshëm",
    explore: "Shiko projektin",
    route: "Rruga e projekteve",
    reduced: "Projekte të zgjedhura",
  },
};

function Scene({
  project,
  index,
  progress,
}: {
  project: Project;
  index: number;
  progress: MotionValue<number>;
}) {
  const last = scenes.length - 1;
  const segment = 1 / scenes.length;
  const start = index * segment;
  const end = (index + 1) * segment;
  const fade = segment * 0.1;

  const opacityInput =
    index === 0
      ? [0, end - fade, end + fade]
      : index === last
        ? [start - fade, start + fade, 1]
        : [start - fade, start + fade, end - fade, end + fade];
  const opacityOutput = index === 0 ? [1, 1, 0] : index === last ? [0, 1, 1] : [0, 1, 1, 0];

  const opacity = useTransform(progress, opacityInput, opacityOutput);
  const scale = useTransform(progress, [start, end], [1.08, 1]);
  const y = useTransform(
    progress,
    [start, end],
    ["-3%", "3%"]
  );

  return (
    <motion.div style={{ opacity }} className="absolute inset-0">
      <motion.div style={{ scale, y }} className="absolute -inset-y-[6%] inset-x-0">
        <Image
          src={project.hero}
          alt=""
          fill
          priority={index === 0}
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,.9)_0%,rgba(10,10,10,.56)_38%,rgba(10,10,10,.08)_72%),linear-gradient(0deg,rgba(10,10,10,.72)_0%,transparent_38%)]" />
    </motion.div>
  );
}

function Chapter({
  project,
  index,
  active,
}: {
  project: Project;
  index: number;
  active: boolean;
}) {
  const { lang } = useLang();

  return (
    <motion.article
      initial={false}
      animate={{ opacity: active ? 1 : 0, x: active ? 0 : 40 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 mx-auto max-w-[1700px] px-12 pb-16"
      aria-hidden={!active}
    >
      <div className="max-w-3xl">
        <div className="mb-5 flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.34em] text-white/60">
          <span className="text-accent">{String(index + 1).padStart(2, "0")}</span>
          <span className="h-px w-10 bg-accent" />
          <span>{project.category[lang]}</span>
          <span aria-hidden="true">·</span>
          <span>{project.location}</span>
        </div>
        <h3 className="font-display text-[clamp(3.5rem,7vw,7.8rem)] font-black uppercase leading-[0.84] tracking-[-0.045em] text-white">
          {project.title}
          <span className="text-accent">.</span>
        </h3>
        <p className="mt-6 max-w-[48ch] text-base leading-relaxed text-white/72">
          {project.excerpt[lang]}
        </p>
        <Link
          href={`/projects/${project.slug}`}
          tabIndex={active ? 0 : -1}
          className="pointer-events-auto mt-7 inline-flex min-h-11 items-center gap-3 rounded-full border border-white/35 px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.25em] text-white transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-base"
        >
          {copy[lang].explore}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </Link>
      </div>
    </motion.article>
  );
}

export default function ScrollWorldJourney() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const desktop = useSyncExternalStore(subscribeDesktop, getDesktopSnapshot, getServerDesktopSnapshot);
  const reduced = useReducedMotion();
  const { lang } = useLang();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const next = Math.min(scenes.length - 1, Math.floor(value * scenes.length));
    setActive((current) => (current === next ? current : next));
  });

  const jumpTo = (index: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const top = window.scrollY + section.getBoundingClientRect().top;
    const distance = section.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + distance * ((index + 0.5) / scenes.length), behavior: "smooth" });
  };

  if (!desktop) return null;

  if (reduced) {
    return (
      <div className="grid gap-px overflow-hidden border border-line bg-line lg:grid-cols-2" aria-label={copy[lang].reduced}>
        {scenes.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group bg-base p-4">
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image src={project.hero} alt={project.title} fill sizes="50vw" className="object-cover" />
            </div>
            <div className="flex items-center justify-between gap-4 py-4">
              <h3 className="font-display text-xl font-bold uppercase">{project.title}</h3>
              <span className="text-xs uppercase tracking-[0.2em] text-accent">{project.year}</span>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <section ref={sectionRef} className="relative h-[460vh]" aria-label={copy[lang].route}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="absolute inset-0">
          {scenes.map((project, index) => (
            <Scene key={project.slug} project={project} index={index} progress={scrollYProgress} />
          ))}
        </div>

        <div className="absolute inset-x-0 top-0 z-30 h-px bg-white/20">
          <motion.div style={{ width: progressWidth }} className="h-full bg-accent" />
        </div>

        <div className="absolute inset-x-0 top-24 z-30 mx-auto flex max-w-[1700px] items-center justify-between px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.36em] text-white/55">
            {copy[lang].chapter}
          </p>
          <nav aria-label={copy[lang].route} className="flex items-center gap-2">
            {scenes.map((project, index) => (
              <button
                key={project.slug}
                type="button"
                onClick={() => jumpTo(index)}
                className="group flex h-11 w-11 cursor-pointer items-center justify-center rounded-full"
                aria-label={`${String(index + 1).padStart(2, "0")} — ${project.title}`}
              >
                <span className={`h-1.5 rounded-full transition-all duration-200 group-hover:w-5 group-hover:bg-accent ${active === index ? "w-5 bg-accent" : "w-1.5 bg-white/55"}`} />
              </button>
            ))}
          </nav>
        </div>

        {scenes.map((project, index) => (
          <Chapter key={project.slug} project={project} index={index} active={active === index} />
        ))}

        <div className="pointer-events-none absolute bottom-16 right-12 z-30 hidden items-end gap-3 xl:flex">
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/45">Scroll</span>
          <span className="relative h-16 w-px overflow-hidden bg-white/25">
            <span className="absolute inset-x-0 top-0 h-6 animate-scroll-world-line bg-accent" />
          </span>
        </div>
      </div>
    </section>
  );
}
