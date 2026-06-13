"use client";

import LogoMark from "./LogoMark";
import { useLang } from "@/lib/i18n";

export default function MarqueeBand() {
  const { t } = useLang();
  const items = t.marquee;

  const row = (key: string) => (
    <div key={key} className="flex shrink-0 items-center" aria-hidden={key === "b"}>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="px-8 font-display text-4xl font-black uppercase tracking-tight text-bone/90 md:px-12 md:text-6xl">
            {item}
          </span>
          <LogoMark className="h-7 w-auto text-accent md:h-9" />
        </span>
      ))}
    </div>
  );

  return (
    <div className="overflow-hidden border-y border-line py-8 md:py-10">
      <div className="flex w-max animate-marquee">
        {row("a")}
        {row("b")}
      </div>
    </div>
  );
}
