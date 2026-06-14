"use client";

import { flushSync } from "react-dom";
import { useTheme } from "@/lib/theme";

const EASE = "cubic-bezier(0.76, 0, 0.24, 1)";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";

  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const supported =
      typeof document !== "undefined" &&
      "startViewTransition" in document;

    if (!supported || reduced) {
      setTheme(next);
      return;
    }

    // Circular reveal of the new theme, expanding from the toggle button.
    const x = e.clientX;
    const y = e.clientY;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = (
      document as Document & {
        startViewTransition: (cb: () => void) => { ready: Promise<void> };
      }
    ).startViewTransition(() => {
      flushSync(() => setTheme(next));
    });

    transition.ready
      .then(() => {
        document.documentElement.animate(
          {
            clipPath: [
              `circle(0px at ${x}px ${y}px)`,
              `circle(${endRadius}px at ${x}px ${y}px)`,
            ],
          },
          {
            duration: 600,
            easing: EASE,
            pseudoElement: "::view-transition-new(root)",
          }
        );
      })
      // If the transition aborts (e.g. tab not visible), the theme still
      // switched via the update callback — just skip the reveal animation.
      .catch(() => {});
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
      className={`flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-bone/20 text-bone/70 transition-colors duration-200 hover:border-accent hover:text-accent ${className ?? ""}`}
    >
      {isDark ? (
        // Sun — click to go light
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="h-[18px] w-[18px]" aria-hidden="true">
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
        </svg>
      ) : (
        // Moon — click to go dark
        <svg viewBox="0 0 24 24" fill="currentColor" className="h-[18px] w-[18px]" aria-hidden="true">
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}
