"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LogoMark, { LogoWordmark } from "./LogoMark";
import LangSwitch from "./LangSwitch";
import ThemeToggle from "./ThemeToggle";
import { useLang } from "@/lib/i18n";

const EASE = [0.76, 0, 0.24, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const LINKS = [
    { href: "/", label: t.nav.home },
    { href: "/projects", label: t.nav.projects },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle("overflow-hidden", open);
    return () => document.documentElement.classList.remove("overflow-hidden");
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled && !open
            ? "border-b border-line bg-base/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex h-20 max-w-[1700px] items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            className="group flex items-center gap-3"
            aria-label="Curri Architect — home"
          >
            <LogoMark className="h-9 w-auto text-accent transition-transform duration-300 group-hover:scale-110" />
            <LogoWordmark className="h-7 w-auto text-bone" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-10 md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`group relative text-xs font-medium uppercase tracking-[0.25em] transition-colors duration-200 ${
                  isActive(link.href)
                    ? "text-accent"
                    : "text-bone/70 hover:text-bone"
                }`}
              >
                {link.label}
                <span
                  className={`absolute -bottom-2 left-0 h-px bg-accent transition-all duration-300 ${
                    isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            ))}
            <Link
              href="/contact"
              className="rounded-full border border-bone/25 px-6 py-2.5 text-xs font-medium uppercase tracking-[0.25em] text-bone transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-base"
            >
              {t.nav.letsTalk}
            </Link>
            <span className="h-4 w-px bg-bone/20" />
            <LangSwitch />
            <ThemeToggle />
          </div>

          {/* Mobile right cluster */}
          <div className="flex items-center gap-3 md:hidden">
            <LangSwitch />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="flex h-11 w-11 cursor-pointer flex-col items-center justify-center gap-1.5"
            >
            <span
              className={`h-0.5 w-7 bg-bone transition-transform duration-300 ${
                open ? "translate-y-1 rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-7 bg-bone transition-transform duration-300 ${
                open ? "-translate-y-1 -rotate-45" : ""
              }`}
            />
            </button>
          </div>
        </nav>
      </header>

      {/* Fullscreen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-between bg-base px-6 pb-10 pt-32 md:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <nav className="flex flex-col gap-2">
              {LINKS.map((link, i) => (
                <span key={link.href} className="block overflow-hidden">
                  <motion.span
                    className="block"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE }}
                  >
                    <Link
                      href={link.href}
                      className={`font-display text-[clamp(2.6rem,13vw,4.5rem)] font-black uppercase leading-[1.08] tracking-tight ${
                        isActive(link.href) ? "text-accent" : "text-bone"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.span>
                </span>
              ))}
            </nav>
            <motion.div
              className="flex items-end justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.45 }}
            >
              <a
                href="mailto:hello@curriarchitect.com"
                className="text-sm text-bone/60 underline-offset-4 hover:text-accent hover:underline"
              >
                hello@curriarchitect.com
              </a>
              <LogoMark className="h-10 w-auto text-accent" aria-hidden="true" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
