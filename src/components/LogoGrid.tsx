"use client";

import { useEffect, useRef } from "react";

/**
 * A slowly drifting grid of the Curri "C" mark at very low opacity. A brighter
 * copy of the same grid is revealed only inside a soft circle that follows the
 * cursor, so the marks light up wherever the mouse goes. Pointer-events are
 * off and everything is GPU-composited (transform drift + radial mask), so it
 * stays cheap and never blocks interaction.
 */

// The mark, translated to a 134×153 origin and centred in a padded tile so the
// repeated C's sit on a grid with breathing room.
const TILE =
  "<svg xmlns='http://www.w3.org/2000/svg' viewBox='-43 -40 220 233' fill='%23ff6600'>" +
  "<path d='M33,56.9l34.1-19.7,62.6,36.1v-33.1l-62.6-36.1-34.1,19.7v33.1Z'/>" +
  "<path d='M4.3,73.5v39.4l62.8,36.2,62.6-36.1v-33.1l-62.6,36.1-34.1-19.7v-39.4l-28.6,16.5Z'/>" +
  "</svg>";

export default function LogoGrid() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--mx", `${e.clientX}px`);
        el.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="logo-grid pointer-events-none fixed inset-0 z-0"
      style={{ ["--logo-tile" as string]: `url("data:image/svg+xml,${TILE}")` }}
      aria-hidden="true"
    >
      <div className="logo-grid__layer logo-grid__layer--base">
        <div className="logo-grid__tiles" />
      </div>
      <div className="logo-grid__layer logo-grid__layer--glow">
        <div className="logo-grid__tiles" />
      </div>
    </div>
  );
}
