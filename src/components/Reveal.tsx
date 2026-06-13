"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 48,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

const lineVariants: Variants = {
  hidden: { y: "112%" },
  visible: {
    y: 0,
    transition: { duration: 0.95, ease: EASE },
  },
};

/**
 * Each line slides up from behind a mask — for big display headings.
 * The in-view observer lives on the (un-clipped) heading element and the
 * clipped lines animate through variant propagation, since an element
 * translated fully outside an overflow-hidden parent never intersects
 * the viewport on its own.
 */
export function LineReveal({
  lines,
  delay = 0,
  stagger = 0.09,
  className,
  lineClassName,
  as: Tag = "h2",
}: {
  lines: ReactNode[];
  delay?: number;
  stagger?: number;
  className?: string;
  lineClassName?: string;
  as?: "h1" | "h2" | "h3" | "p" | "div";
}) {
  const MotionTag = motion[Tag];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {lines.map((line, i) => (
        // py/-my give the clip box vertical headroom so diacritics (ë, ç) and
        // descenders aren't shaved by overflow-hidden, without shifting layout.
        <span key={i} className="block overflow-hidden py-[0.14em] -my-[0.14em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            variants={lineVariants}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
