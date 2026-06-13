"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoMark from "@/components/LogoMark";

export type Lang = "en" | "sq";

const LANG_NAME: Record<Lang, string> = { en: "English", sq: "Shqip" };
const WIPE_EASE = [0.76, 0, 0.24, 1] as const;

const en = {
  nav: {
    home: "Home",
    projects: "Projects",
    contact: "Contact",
    letsTalk: "Let’s talk",
  },
  hero: {
    eyebrow: "Independent architecture practice",
    l1: "Space,",
    l2: "Light",
    l3: "Form.",
    intro:
      "Curri is the fresh new studio of one architect — designing residential, commercial and cultural spaces with honesty, proportion and light. Based in Prishtina, building anywhere.",
    viewWork: "View the work",
    scroll: "Scroll ↓",
  },
  marquee: [
    "Residential",
    "Interior",
    "Commercial",
    "Renovation",
    "Cultural",
    "Urban Design",
  ],
  works: {
    l1: "Selected",
    l2: "Works",
    allProjects: "All projects",
  },
  about: {
    headingLines: ["The", "Architect"],
    p1: "I’m Curri — a fresh new architect with a deliberately small studio. One architect, a handful of projects a year, and full attention on each of them, from the first sketch to the last site visit.",
    p2: "I believe every site has one honest answer. My work is the process of finding it: stripping away what isn’t needed until space, light and structure say everything on their own.",
    stats: [
      { value: "12+", label: "Years of practice" },
      { value: "48", label: "Projects delivered" },
      { value: "09", label: "Design awards" },
      { value: "01", label: "Architect. No noise." },
    ],
    portraitAlt: "Portrait of the architect",
  },
  band: {
    tagline: "One mark — one architect — one standard",
  },
  services: {
    headingPre: "What I ",
    headingAccent: "do",
    intro:
      "Every commission gets the same five-stage discipline — whether it’s a house, a tower or a single room.",
    items: [
      {
        n: "01",
        name: "Architectural Design",
        desc: "Concept to construction documents — buildings designed from the site up.",
      },
      {
        n: "02",
        name: "Interior Architecture",
        desc: "Spatial interiors where structure, light and material do the decorating.",
      },
      {
        n: "03",
        name: "Renovation & Reuse",
        desc: "New life for existing structures — surgical interventions, honest junctions.",
      },
      {
        n: "04",
        name: "Planning & Permits",
        desc: "Documentation, approvals and consulting through every regulatory stage.",
      },
      {
        n: "05",
        name: "Site Supervision",
        desc: "The drawing is half the work. I stay on site until the detail is built right.",
      },
    ],
    cta: "Discuss your project",
  },
  footerCta: {
    available: "Available for new projects",
    l1: "Have a project",
    l2: "in mind?",
    accent: "Let’s talk.",
    button: "Start a conversation",
  },
  footer: {
    blurb:
      "Independent architecture practice designing spaces of honesty, proportion and light.",
    menuTitle: "Menu",
    contactTitle: "Contact",
    followTitle: "Follow",
    city: "Prishtina, Kosovo",
    rights: "© 2026 Curri Architect",
    tagline: "Prishtina — Worldwide",
  },
  projectsPage: {
    eyebrow: "Selected work, 2022 — 2026",
    title: "Projects",
    blurb:
      "A deliberately short list. Each project here was designed, documented and supervised by one architect — no handovers, no dilution between the first sketch and the finished building.",
  },
  project: {
    back: "All projects",
    meta: {
      year: "Year",
      location: "Location",
      category: "Category",
      area: "Area",
      scope: "Scope",
    },
    aboutProject: "About the project",
    next: "Next project",
    view: (n: number) => `view ${n}`,
  },
  contactPage: {
    eyebrow: "Contact",
    titleL1: "Let’s",
    titleL2: "Talk",
    intro:
      "Every project starts with a conversation — about the site, the budget, and what the space needs to do for you. No obligation, no jargon.",
    email: "Email",
    phone: "Phone",
    studio: "Studio",
    city: "Prishtina, Kosovo",
    availability: "Currently taking projects for 2026 / 27",
  },
  form: {
    name: "Name",
    namePlaceholder: "Your name",
    email: "Email",
    emailPlaceholder: "you@example.com",
    projectType: "Project type",
    types: ["Residential", "Commercial", "Interior", "Renovation", "Other"],
    message: "About the project",
    messagePlaceholder: "Site, budget, timeline — whatever you know so far.",
    error:
      "Please fill in your name, email and a few words about the project.",
    send: "Send message",
    successTitle: "Message ready.",
    successBody:
      "Your email client should have opened with everything pre-filled — just hit send. I usually reply within one working day.",
    again: "Write another message",
  },
};

const sq: typeof en = {
  nav: {
    home: "Ballina",
    projects: "Projektet",
    contact: "Kontakti",
    letsTalk: "Të flasim",
  },
  hero: {
    eyebrow: "Studio e pavarur arkitekture",
    l1: "Hapësirë,",
    l2: "Dritë",
    l3: "Formë.",
    intro:
      "Curri është studioja e një arkitekti të vetëm — që projekton hapësira banimi, komerciale dhe kulturore me ndershmëri, proporcion dhe dritë. Me bazë në Prishtinë, ndërton kudo.",
    viewWork: "Shiko punët",
    scroll: "Shfleto ↓",
  },
  marquee: [
    "Banim",
    "Enterier",
    "Komerciale",
    "Rinovim",
    "Kulturore",
    "Dizajn urban",
  ],
  works: {
    l1: "Punë të",
    l2: "Zgjedhura",
    allProjects: "Të gjitha projektet",
  },
  about: {
    headingLines: ["Arkitekti"],
    p1: "Unë jam Curri — dhe kjo studio është qëllimisht e vogël. Një arkitekt, disa projekte në vit, dhe vëmendje e plotë për secilin prej tyre — nga skica e parë deri te vizita e fundit në kantier.",
    p2: "Besoj se çdo parcelë ka një përgjigje të vetme të ndershme. Puna ime është procesi i gjetjes së saj: heqja e gjithçkaje të panevojshme derisa hapësira, drita dhe struktura të thonë gjithçka vetë.",
    stats: [
      { value: "12+", label: "Vite përvojë" },
      { value: "48", label: "Projekte të realizuara" },
      { value: "09", label: "Çmime dizajni" },
      { value: "01", label: "Arkitekt. Pa zhurmë." },
    ],
    portraitAlt: "Portreti i arkitektit",
  },
  band: {
    tagline: "Një shenjë — një arkitekt — një standard",
  },
  services: {
    headingPre: "Çfarë ",
    headingAccent: "bëj",
    intro:
      "Çdo porosi kalon nëpër të njëjtën disiplinë pesëfazëshe — qoftë shtëpi, kullë apo një dhomë e vetme.",
    items: [
      {
        n: "01",
        name: "Projektim Arkitektonik",
        desc: "Nga koncepti te dokumentacioni i ndërtimit — objekte të projektuara duke nisur nga parcela.",
      },
      {
        n: "02",
        name: "Arkitekturë Enterieri",
        desc: "Enterierë hapësinorë ku struktura, drita dhe materiali bëjnë dekorimin.",
      },
      {
        n: "03",
        name: "Rinovim & Ripërdorim",
        desc: "Jetë e re për strukturat ekzistuese — ndërhyrje kirurgjikale, bashkime të ndershme.",
      },
      {
        n: "04",
        name: "Planifikim & Leje",
        desc: "Dokumentacion, miratime dhe këshillim në çdo fazë rregullatore.",
      },
      {
        n: "05",
        name: "Mbikëqyrje Kantieri",
        desc: "Vizatimi është gjysma e punës. Qëndroj në kantier derisa detaji të ndërtohet siç duhet.",
      },
    ],
    cta: "Diskuto projektin tënd",
  },
  footerCta: {
    available: "I lirë për projekte të reja",
    l1: "Keni një projekt",
    l2: "në mendje?",
    accent: "Të flasim.",
    button: "Nis bisedën",
  },
  footer: {
    blurb:
      "Studio e pavarur arkitekture që projekton hapësira me ndershmëri, proporcion dhe dritë.",
    menuTitle: "Menyja",
    contactTitle: "Kontakti",
    followTitle: "Na ndiqni",
    city: "Prishtinë, Kosovë",
    rights: "© 2026 Curri Architect",
    tagline: "Prishtinë — Kudo në botë",
  },
  projectsPage: {
    eyebrow: "Punë të zgjedhura, 2022 — 2026",
    title: "Projektet",
    blurb:
      "Një listë qëllimisht e shkurtër. Secili projekt këtu është projektuar, dokumentuar dhe mbikëqyrur nga një arkitekt i vetëm — pa dorëzime, pa hollim mes skicës së parë dhe objektit të përfunduar.",
  },
  project: {
    back: "Të gjitha projektet",
    meta: {
      year: "Viti",
      location: "Vendndodhja",
      category: "Kategoria",
      area: "Sipërfaqja",
      scope: "Fusha",
    },
    aboutProject: "Rreth projektit",
    next: "Projekti tjetër",
    view: (n: number) => `pamja ${n}`,
  },
  contactPage: {
    eyebrow: "Kontakti",
    titleL1: "Të",
    titleL2: "Flasim",
    intro:
      "Çdo projekt nis me një bisedë — për parcelën, buxhetin dhe atë që hapësira duhet të bëjë për ju. Pa detyrim, pa zhargon.",
    email: "Email",
    phone: "Telefoni",
    studio: "Studioja",
    city: "Prishtinë, Kosovë",
    availability: "Aktualisht pranoj projekte për 2026 / 27",
  },
  form: {
    name: "Emri",
    namePlaceholder: "Emri juaj",
    email: "Email",
    emailPlaceholder: "ju@shembull.com",
    projectType: "Lloji i projektit",
    types: ["Banim", "Komerciale", "Enterier", "Rinovim", "Tjetër"],
    message: "Rreth projektit",
    messagePlaceholder: "Parcela, buxheti, afati — çfarëdo që dini deri tani.",
    error:
      "Ju lutem plotësoni emrin, email-in dhe disa fjalë rreth projektit.",
    send: "Dërgo mesazhin",
    successTitle: "Mesazhi gati.",
    successBody:
      "Klienti juaj i email-it duhet të jetë hapur me gjithçka të plotësuar — thjesht shtypni dërgo. Zakonisht përgjigjem brenda një dite pune.",
    again: "Shkruaj një mesazh tjetër",
  },
};

export const dictionaries = { en, sq };
export type Dict = typeof en;

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dict;
};

const LangContext = createContext<LangContextValue>({
  lang: "en",
  setLang: () => {},
  t: en,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [wipe, setWipe] = useState<Lang | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("curri-lang");
    if (saved === "en" || saved === "sq") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(
    () => () => timers.current.forEach(clearTimeout),
    []
  );

  const setLang = (next: Lang) => {
    if (next === lang) return;
    localStorage.setItem("curri-lang", next);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduced) {
      setLangState(next);
      return;
    }

    // Branded wipe: orange panel sweeps in, swap happens under cover, sweeps out.
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setWipe(next);
    timers.current.push(setTimeout(() => setLangState(next), 420));
    timers.current.push(setTimeout(() => setWipe(null), 900));
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t: dictionaries[lang] }}>
      {children}

      <AnimatePresence>
        {wipe && (
          <motion.div
            key="lang-wipe"
            className="pointer-events-none fixed inset-0 z-[120] flex items-center justify-center bg-accent"
            initial={{ y: "100%" }}
            animate={{ y: "0%" }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: WIPE_EASE }}
            aria-hidden="true"
          >
            <motion.div
              className="flex flex-col items-center gap-5"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.12, ease: "easeOut" }}
            >
              <LogoMark className="h-16 w-auto text-base" />
              <span className="font-display text-2xl font-black uppercase tracking-[0.3em] text-base">
                {LANG_NAME[wipe]}
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
