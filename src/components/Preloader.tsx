"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  LOGO_PIECE_TOP,
  LOGO_PIECE_BOTTOM,
  LOGO_VIEWBOX,
  CURRI_LETTERS,
  ARCHITECT_LETTERS,
  WORDMARK_VIEWBOX,
} from "./LogoMark";

const EASE = [0.76, 0, 0.24, 1] as const;

// Replay the intro after this long. Mobile browsers keep tabs (and their
// sessionStorage) alive for weeks, so a per-session flag effectively meant
// "never again" on phones — a time window keeps repeat visits snappy while
// still playing the intro when someone comes back later.
const INTRO_REPLAY_MS = 45 * 60 * 1000;

// Storage can throw (e.g. iOS Safari private mode) — never let that block
// dismissing the overlay.
function introRecentlySeen() {
  try {
    const at = Number(localStorage.getItem("curri-intro-at") || 0);
    return at > 0 && Date.now() - at < INTRO_REPLAY_MS;
  } catch {
    return false;
  }
}
function markIntroSeen() {
  try {
    localStorage.setItem("curri-intro-at", String(Date.now()));
  } catch {}
}

export default function Preloader() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (introRecentlySeen()) {
      setShow(false);
      return;
    }
    // The intro always plays its full length — it's a brief, brand-defining
    // reveal, so we intentionally don't shorten it under reduced-motion (which
    // iOS Low Power Mode forces on). A hard fallback timer guarantees the
    // overlay always dismisses even if an animation event never fires.
    const t = setTimeout(() => {
      setShow(false);
      markIntroSeen();
    }, 3400);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = show ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-base"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: EASE }}
          aria-hidden="true"
        >
          {/* Logo: two pieces of the cube draw themselves, fly in and lock together */}
          <svg
            viewBox={LOGO_VIEWBOX}
            className="relative h-28 w-auto md:h-36"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              d={LOGO_PIECE_TOP}
              stroke="#ff6600"
              strokeWidth={2.5}
              fill="#ff6600"
              initial={{ pathLength: 0, fillOpacity: 0, opacity: 0, x: -28, y: -28 }}
              animate={{ pathLength: 1, fillOpacity: 1, opacity: 1, x: 0, y: 0 }}
              transition={{
                opacity: { duration: 0.3, delay: 0.2 },
                pathLength: { duration: 1.1, ease: "easeInOut", delay: 0.2 },
                x: { duration: 1.0, ease: EASE, delay: 0.2 },
                y: { duration: 1.0, ease: EASE, delay: 0.2 },
                fillOpacity: { duration: 0.55, delay: 1.25 },
              }}
            />
            <motion.path
              d={LOGO_PIECE_BOTTOM}
              stroke="#ff6600"
              strokeWidth={2.5}
              fill="#ff6600"
              initial={{ pathLength: 0, fillOpacity: 0, opacity: 0, x: 28, y: 28 }}
              animate={{ pathLength: 1, fillOpacity: 1, opacity: 1, x: 0, y: 0 }}
              transition={{
                opacity: { duration: 0.3, delay: 0.35 },
                pathLength: { duration: 1.1, ease: "easeInOut", delay: 0.35 },
                x: { duration: 1.0, ease: EASE, delay: 0.35 },
                y: { duration: 1.0, ease: EASE, delay: 0.35 },
                fillOpacity: { duration: 0.55, delay: 1.25 },
              }}
            />
          </svg>

          {/* Wordmark — his original letterforms, rising letter by letter */}
          <svg
            viewBox={WORDMARK_VIEWBOX}
            className="relative mt-10 h-14 w-auto md:h-[4.5rem]"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            {CURRI_LETTERS.map((d, i) => (
              <motion.path
                key={i}
                d={d}
                fill="var(--color-bone)"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  ease: EASE,
                  delay: 1.55 + i * 0.07,
                }}
              />
            ))}
            {ARCHITECT_LETTERS.map((d, i) => (
              <motion.path
                key={`a${i}`}
                d={d}
                fill="var(--color-bone)"
                fillOpacity={0.6}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.45,
                  delay: 2.0 + i * 0.04,
                }}
              />
            ))}
          </svg>

          {/* Footer line */}
          <motion.div
            className="absolute bottom-8 flex w-full items-end justify-between px-6 text-[10px] tracking-[0.35em] text-bone/35 md:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 2.3 }}
          >
            <span>PORTFOLIO</span>
            <span>© 2026</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
