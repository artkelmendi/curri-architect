"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import {
  LOGO_PIECE_TOP,
  LOGO_PIECE_BOTTOM,
  LOGO_VIEWBOX,
} from "./LogoMark";

const EASE = [0.76, 0, 0.24, 1] as const;

/** Scroll-triggered version of the intro animation: the two pieces of the
 *  mark draw themselves as strokes, slide together, then fill with orange. */
export default function AnimatedLogoMark({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const piece = (dx: number, dy: number, delay: number): Variants => ({
    hidden: reduced
      ? { pathLength: 1, fillOpacity: 1, opacity: 1 }
      : { pathLength: 0, fillOpacity: 0, opacity: 0, x: dx, y: dy },
    visible: {
      pathLength: 1,
      fillOpacity: 1,
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        opacity: { duration: 0.3, delay },
        pathLength: { duration: 1.1, ease: "easeInOut", delay },
        x: { duration: 1.0, ease: EASE, delay },
        y: { duration: 1.0, ease: EASE, delay },
        fillOpacity: { duration: 0.55, delay: delay + 1.05 },
      },
    },
  });

  return (
    <motion.svg
      viewBox={LOGO_VIEWBOX}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.35 }}
    >
      <motion.path
        d={LOGO_PIECE_TOP}
        stroke="currentColor"
        strokeWidth={2.5}
        fill="currentColor"
        variants={piece(-28, -28, 0.1)}
      />
      <motion.path
        d={LOGO_PIECE_BOTTOM}
        stroke="currentColor"
        strokeWidth={2.5}
        fill="currentColor"
        variants={piece(28, 28, 0.25)}
      />
    </motion.svg>
  );
}
