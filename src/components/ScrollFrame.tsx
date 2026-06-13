"use client";

import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Two faint measurement rails down the left and right margins that fill with
 * orange as the visitor scrolls, with a small node tracking the scroll
 * position. Runs the full viewport height (behind the footer and everything
 * else) and is deliberately low-contrast so the content reads cleanly on top.
 */
export default function ScrollFrame() {
  const { scrollYProgress } = useScroll();
  const nodeTop = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      className="pointer-events-none fixed inset-y-0 left-5 right-5 z-0"
      aria-hidden="true"
    >
      {/* Left rail */}
      <div className="absolute left-0 top-0 h-full w-px bg-bone/[0.06]" />
      <motion.div
        className="absolute left-0 top-0 w-px origin-top bg-accent/30"
        style={{ height: "100%", scaleY: scrollYProgress }}
      />
      <motion.div
        className="absolute -left-[2px] h-1 w-1 rounded-full bg-accent/70"
        style={{ top: nodeTop }}
      />

      {/* Right rail */}
      <div className="absolute right-0 top-0 h-full w-px bg-bone/[0.06]" />
      <motion.div
        className="absolute right-0 top-0 w-px origin-top bg-accent/30"
        style={{ height: "100%", scaleY: scrollYProgress }}
      />
      <motion.div
        className="absolute -right-[2px] h-1 w-1 rounded-full bg-accent/70"
        style={{ top: nodeTop }}
      />
    </div>
  );
}
