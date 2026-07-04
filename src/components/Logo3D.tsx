"use client";

import { useRef } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { LOGO_PIECE_TOP, LOGO_PIECE_BOTTOM, LOGO_VIEWBOX } from "./LogoMark";

/**
 * 3D assembly of the mark: the two pieces fly in from opposite sides with
 * depth and rotation, snap together with a spring overshoot, emit a brief
 * shockwave ring, then the assembled logo floats with a gentle 3D tilt.
 *
 * Mobile-safe by construction: the 3D transforms run on plain HTML wrappers
 * (Safari can't 3D-transform SVG elements), everything is transform/opacity
 * only, and the in-view trigger uses a plain `amount` threshold — no
 * rootMargin, which some mobile browsers ignore.
 */

const SPRING = { type: "spring", stiffness: 60, damping: 12, mass: 1 } as const;

const group: Variants = {
  hidden: { rotateY: 120, scale: 0.72 },
  assembled: {
    rotateY: 0,
    scale: 1,
    transition: {
      rotateY: { type: "spring", stiffness: 42, damping: 15 },
      scale: { type: "spring", stiffness: 42, damping: 15 },
      delayChildren: 0.05,
      staggerChildren: 0.16,
    },
  },
};

const pieceTop: Variants = {
  hidden: { opacity: 0, x: -120, y: -80, z: -380, rotateY: -95, rotateX: 30 },
  assembled: {
    opacity: 1,
    x: 0,
    y: 0,
    z: 0,
    rotateY: 0,
    rotateX: 0,
    transition: { ...SPRING, opacity: { duration: 0.45 } },
  },
};

const pieceBottom: Variants = {
  hidden: { opacity: 0, x: 120, y: 90, z: -380, rotateY: 95, rotateX: -30 },
  assembled: {
    opacity: 1,
    x: 0,
    y: 0,
    z: 0,
    rotateY: 0,
    rotateX: 0,
    transition: { ...SPRING, opacity: { duration: 0.45 } },
  },
};

const ring: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  assembled: {
    opacity: [0, 0.55, 0],
    scale: [0.85, 1.5],
    transition: { delay: 1.05, duration: 0.9, ease: "easeOut" },
  },
};

export default function Logo3D({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });

  return (
    <div
      ref={ref}
      className={`relative aspect-[134/153] ${className ?? ""}`}
      style={{ perspective: 1100 }}
      aria-hidden="true"
    >
      {/* Idle 3D float once assembled */}
      <motion.div
        className="h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={
          inView
            ? { rotateY: [0, 10, 0, -10, 0], rotateX: [0, -5, 0, 5, 0] }
            : undefined
        }
        transition={{
          duration: 11,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.9,
        }}
      >
        {/* Entry: the whole group spins into place while pieces converge */}
        <motion.div
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
          variants={group}
          initial="hidden"
          animate={inView ? "assembled" : "hidden"}
        >
          {/* Shockwave ring on landing */}
          <motion.div variants={ring} className="absolute inset-0">
            <svg viewBox={LOGO_VIEWBOX} className="h-full w-full">
              <path
                d={LOGO_PIECE_TOP}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={2}
              />
              <path
                d={LOGO_PIECE_BOTTOM}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth={2}
              />
            </svg>
          </motion.div>

          {/* Pieces — HTML wrappers so the 3D transforms work on Safari */}
          <motion.div
            variants={pieceTop}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg viewBox={LOGO_VIEWBOX} className="h-full w-full">
              <path d={LOGO_PIECE_TOP} fill="var(--color-accent)" />
            </svg>
          </motion.div>
          <motion.div
            variants={pieceBottom}
            className="absolute inset-0"
            style={{ transformStyle: "preserve-3d" }}
          >
            <svg viewBox={LOGO_VIEWBOX} className="h-full w-full">
              <path d={LOGO_PIECE_BOTTOM} fill="var(--color-accent)" />
            </svg>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
