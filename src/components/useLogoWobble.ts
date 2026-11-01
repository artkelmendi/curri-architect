"use client";

import { useRef, type PointerEvent } from "react";
import { useReducedMotion, useSpring, useTransform } from "framer-motion";

/** Small elastic deformation; exact SVG artwork and layout stay untouched. */
export default function useLogoWobble() {
  const reduced = useReducedMotion();
  const bounds = useRef<DOMRect | null>(null);
  const spring = { mass: 1, stiffness: 100, damping: 10 };
  const rotation = useSpring(0, spring);
  const lean = useSpring(0, spring);
  const transform = useTransform([rotation, lean], ([r, s]) => `rotate(${r}deg) skewX(${s}deg)`);
  const reset = () => { bounds.current = null; rotation.set(0); lean.set(0); };
  const onPointerEnter = (event: PointerEvent<Element>) => {
    if (reduced || event.pointerType !== "mouse" || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    bounds.current = event.currentTarget.getBoundingClientRect();
  };
  const onPointerMove = (event: PointerEvent<Element>) => {
    if (reduced || event.pointerType !== "mouse" || !bounds.current) return;
    const rect = bounds.current;
    const x = Math.max(-1, Math.min(1, (event.clientX - rect.left) / rect.width * 2 - 1));
    const y = Math.max(-1, Math.min(1, (event.clientY - rect.top) / rect.height * 2 - 1));
    rotation.set(x * 4);
    lean.set(y * -3);
  };
  return { onPointerEnter, onPointerMove, onPointerLeave: reset, onPointerCancel: reset, style: { transform, transformOrigin: "50% 50%" }, "data-logo-wobble": true };
}
