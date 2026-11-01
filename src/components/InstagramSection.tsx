"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import { projects } from "@/data/projects";
import { studio } from "@/data/studio";
import { Reveal, LineReveal } from "./Reveal";

export default function InstagramSection() {
  const { t } = useLang();
  return (
    <section id="instagram" className="instagram-promo relative z-10 border-t border-line" aria-labelledby="instagram-title">
      <div className="instagram-promo__inner mx-auto max-w-[1700px] px-6 md:px-12">
        <div>
          <Reveal y={20}><p className="instagram-promo__eyebrow">Instagram · @curriarch</p></Reveal>
          <LineReveal as="h2" className="instagram-promo__title" lines={[<span key="1">{t.instagram.l1}</span>, <span key="2" className="text-accent">{t.instagram.l2}</span>]} />
          <Reveal delay={.1} y={20}>
            <p className="instagram-promo__description">{t.instagram.description}</p>
            <a className="instagram-promo__follow" href={studio.instagramUrl} target="_blank" rel="noopener noreferrer">
              {t.instagram.follow}
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>
            </a>
          </Reveal>
        </div>
        <Reveal delay={.15} y={32}>
          <a className="instagram-promo__image" href={studio.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={t.instagram.follow}>
            <Image src={projects[0].hero} alt="AS residential interior by Curri Architects" fill sizes="(min-width: 1024px) 50vw, 100vw" />
            <span className="instagram-promo__caption"><span>@curriarch</span><span aria-hidden="true">↗</span></span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
