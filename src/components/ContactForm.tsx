"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { dictionaries, useLang } from "@/lib/i18n";

const FIELD =
  "w-full border-b border-line bg-transparent py-4 text-base text-bone placeholder:text-bone/30 transition-colors duration-300 focus:border-accent focus:outline-none";
const LABEL = "mb-1 block text-[11px] uppercase tracking-[0.35em] text-bone/45";

export default function ContactForm() {
  const { t } = useLang();
  const [typeIndex, setTypeIndex] = useState(0);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    if (!name || !email || !message) {
      setError(t.form.error);
      return;
    }

    // Email the studio in English regardless of UI language.
    const type = dictionaries.en.form.types[typeIndex];
    const subject = encodeURIComponent(`New ${type} project enquiry — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nProject type: ${type}\n\n${message}`
    );
    window.location.href = `mailto:hello@curriarchitect.com?subject=${subject}&body=${body}`;
    setSent(true);
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex h-full min-h-[420px] flex-col items-start justify-center border border-line p-10"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent">
          <svg viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5" className="h-6 w-6" aria-hidden="true">
            <path d="M5 13l4 4L19 7" />
          </svg>
        </span>
        <h3 className="mt-8 font-display text-3xl font-black uppercase tracking-tight">
          {t.form.successTitle}
        </h3>
        <p className="mt-4 max-w-[40ch] text-bone/55">{t.form.successBody}</p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 cursor-pointer text-xs font-semibold uppercase tracking-[0.3em] text-accent underline-offset-4 hover:underline"
        >
          {t.form.again}
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-10">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={LABEL}>
            {t.form.name}
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.form.namePlaceholder}
            required
            className={FIELD}
          />
        </div>
        <div>
          <label htmlFor="email" className={LABEL}>
            {t.form.email}
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t.form.emailPlaceholder}
            required
            className={FIELD}
          />
        </div>
      </div>

      <fieldset>
        <legend className={LABEL}>{t.form.projectType}</legend>
        <div className="mt-3 flex flex-wrap gap-3">
          {t.form.types.map((label, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setTypeIndex(i)}
              aria-pressed={typeIndex === i}
              className={`cursor-pointer rounded-full border px-5 py-2.5 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-200 ${
                typeIndex === i
                  ? "border-accent bg-accent text-base"
                  : "border-line text-bone/60 hover:border-bone/40 hover:text-bone"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className={LABEL}>
          {t.form.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder={t.form.messagePlaceholder}
          required
          className={`${FIELD} resize-none`}
        />
      </div>

      {error && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="group inline-flex cursor-pointer items-center gap-4 rounded-full bg-accent px-10 py-5 text-sm font-semibold uppercase tracking-[0.25em] text-base transition-colors duration-300 hover:bg-bone"
      >
        {t.form.send}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </button>
    </form>
  );
}
