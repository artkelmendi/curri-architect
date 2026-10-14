"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { studio } from "@/data/studio";
import LogoMark from "./LogoMark";

export default function StudioMap() {
  const { lang } = useLang();
  const sq = lang === "sq";
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { once: true, amount: .15 });
  const reduced = useReducedMotion();
  const [interactive, setInteractive] = useState(false);
  return (
    <motion.section ref={ref} className="studio-map" aria-labelledby="studio-map-title"
      initial={{ opacity: 0, transform: "translateY(24px)" }}
      animate={visible ? { opacity: 1, transform: "translateY(0px)" } : undefined}
      style={reduced ? { transform: "none" } : undefined}
      transition={{ duration: reduced ? .2 : .6, ease: [.23, 1, .32, 1] }}>
      <div className="studio-map__info">
        <p className="studio-map__eyebrow">{sq ? "Na vizitoni" : "Visit the studio"}</p>
        <LogoMark className="studio-map__mark" />
        <h2 id="studio-map-title">Pejë<span>.</span></h2>
        <p className="studio-map__country">{sq ? "Kosovë" : "Kosovo"}</p>
        <p className="studio-map__invitation">{sq ? "Një vend për ide të reja. Le të flasim për tuajën." : "A place for new ideas. Let’s talk about yours."}</p>
        <a className="studio-map__directions" href={studio.directionsUrl} target="_blank" rel="noopener noreferrer">
          {sq ? "Merr udhëzimet" : "Get directions"}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" /></svg>
        </a>
        <a className="studio-map__external" href={studio.mapsUrl} target="_blank" rel="noopener noreferrer">{sq ? "Hap në Google Maps" : "Open in Google Maps"}</a>
        <p className="studio-map__coordinates">42.660023° N<br />20.283602° E</p>
      </div>
      <div className="studio-map__canvas" data-interactive={interactive}>
        <iframe title="Curri Architects studio — Pejë, Kosovo" loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen
          src={`https://maps.google.com/maps?q=${studio.latitude},${studio.longitude}&z=17&output=embed&hl=${sq ? "sq" : "en"}`}
          tabIndex={interactive ? 0 : -1} />
        <button type="button" className="studio-map__interact" onClick={() => setInteractive(!interactive)} aria-pressed={interactive}>
          {interactive ? (sq ? "Blloko hartën" : "Lock map") : (sq ? "Eksploro hartën" : "Explore map")}
          <span aria-hidden="true">{interactive ? "−" : "+"}</span>
        </button>
      </div>
    </motion.section>
  );
}
