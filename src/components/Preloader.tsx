"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  LOGO_PIECE_TOP,
  LOGO_PIECE_BOTTOM,
  LOGO_VIEWBOX,
  CURRI_LETTERS,
  ARCHITECT_LETTERS,
  WORDMARK_VIEWBOX,
} from "./LogoMark";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Preloader() {
  const [show, setShow] = useState(true);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (sessionStorage.getItem("curri-intro")) {
      setShow(false);
      return;
    }
    const duration = reduced ? 1200 : 3400;
    const t = setTimeout(() => {
      sessionStorage.setItem("curri-intro", "1");
      setShow(false);
    }, duration);
    return () => clearTimeout(t);
  }, [reduced]);

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
              initial={
                reduced
                  ? { pathLength: 1, fillOpacity: 1, opacity: 1 }
                  : { pathLength: 0, fillOpacity: 0, opacity: 0, x: -28, y: -28 }
              }
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
              initial={
                reduced
                  ? { pathLength: 1, fillOpacity: 1, opacity: 1 }
                  : { pathLength: 0, fillOpacity: 0, opacity: 0, x: 28, y: 28 }
              }
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
                fill="#f2efe9"
                initial={reduced ? { opacity: 1 } : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.65,
                  ease: EASE,
                  delay: reduced ? 0 : 1.55 + i * 0.07,
                }}
              />
            ))}
            {ARCHITECT_LETTERS.map((d, i) => (
              <motion.path
                key={`a${i}`}
                d={d}
                fill="#f2efe9"
                fillOpacity={0.6}
                initial={reduced ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.45,
                  delay: reduced ? 0.2 : 2.0 + i * 0.04,
                }}
              />
            ))}
          </svg>

          {/* Footer line */}
          <motion.div
            className="absolute bottom-8 flex w-full items-end justify-between px-6 text-[10px] tracking-[0.35em] text-bone/35 md:px-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: reduced ? 0.2 : 2.3 }}
          >
            <span>PORTFOLIO</span>
            <span>© 2026</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
