"use client";

import { useLang } from "@/lib/i18n";
import { LineReveal, Reveal } from "@/components/Reveal";
import ContactForm from "@/components/ContactForm";
import AnimatedLogoMark from "@/components/AnimatedLogoMark";

export default function ContactView() {
  const { t } = useLang();

  const details = [
    {
      label: t.contactPage.email,
      value: "hello@curriarchitect.com",
      href: "mailto:hello@curriarchitect.com",
    },
    {
      label: t.contactPage.phone,
      value: "+383 44 000 000",
      href: "tel:+38344000000",
    },
    {
      label: t.contactPage.studio,
      value: t.contactPage.city,
    },
  ];

  return (
    <section className="relative">
      <div className="relative mx-auto max-w-[1700px] px-6 pb-32 pt-36 md:px-12 md:pt-44">
        {/* Header */}
        <div className="mb-20 flex flex-wrap items-end justify-between gap-10 md:mb-28">
          <div>
            <Reveal y={0} delay={0.1}>
              <p className="mb-6 flex items-center gap-4 text-xs uppercase tracking-[0.4em] text-bone/50">
                <span className="h-px w-12 bg-accent" />
                {t.contactPage.eyebrow}
              </p>
            </Reveal>
            <LineReveal
              as="h1"
              delay={0.15}
              className="font-display text-[clamp(3.5rem,11vw,11rem)] font-black uppercase leading-[0.88] tracking-[-0.03em]"
              lines={[
                <span key="0">{t.contactPage.titleL1}</span>,
                <span key="1" className="text-outline">
                  {t.contactPage.titleL2}
                  <span className="no-stroke text-accent">.</span>
                </span>,
              ]}
            />
          </div>
          {/* The logo draws itself in as the header lands */}
          <AnimatedLogoMark className="hidden h-32 w-auto text-accent md:block lg:h-44" />
        </div>

        <div className="grid gap-20 lg:grid-cols-12">
          {/* Info column */}
          <div className="lg:col-span-4">
            <Reveal>
              <p className="max-w-[38ch] text-lg leading-relaxed text-bone/60">
                {t.contactPage.intro}
              </p>
            </Reveal>
            <div className="mt-14 space-y-8">
              {details.map((d, i) => (
                <Reveal key={d.label} delay={0.1 + i * 0.08}>
                  <p className="text-[11px] uppercase tracking-[0.35em] text-bone/40">
                    {d.label}
                  </p>
                  {d.href ? (
                    <a
                      href={d.href}
                      className="mt-2 inline-block font-display text-xl font-bold text-bone transition-colors duration-200 hover:text-accent md:text-2xl"
                    >
                      {d.value}
                    </a>
                  ) : (
                    <p className="mt-2 font-display text-xl font-bold text-bone md:text-2xl">
                      {d.value}
                    </p>
                  )}
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.35} className="mt-14">
              <p className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-bone/50">
                <span className="h-2 w-2 rounded-full bg-accent animate-pulse-dot" />
                {t.contactPage.availability}
              </p>
            </Reveal>
          </div>

          {/* Form column */}
          <Reveal delay={0.2} className="lg:col-span-7 lg:col-start-6">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
