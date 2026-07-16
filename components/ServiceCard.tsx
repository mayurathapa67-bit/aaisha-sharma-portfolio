"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const ICONS: Record<string, string> = {
  pen: "🖊️",
  blog: "📝",
  sparkle: "✨",
  edit: "✏️",
  ghost: "👻",
  chart: "📈",
};

export default function ServiceCard({
  service,
  index,
}: {
  service: {
    title: string;
    description: string;
    icon: string;
    price: string;
    deliverables: string[];
    timeline: string;
  };
  index: number;
}) {
  const [hover, setHover] = useState(false);
  const icon = ICONS[service.icon] ?? "📚";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.06 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-cream p-8 shadow-sm transition-shadow hover:shadow-2xl"
    >
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-coral/10 blur-2xl transition-opacity ${
          hover ? "opacity-100" : "opacity-0"
        }`}
      />
      <span className="grid h-16 w-16 place-items-center rounded-2xl bg-charcoal/[0.05] text-3xl">
        {icon}
      </span>
      <h3 className="mt-6 font-display text-2xl text-charcoal">
        {service.title}
      </h3>
      <p className="mt-3 flex-1 font-body text-sm leading-relaxed text-soft">
        {service.description}
      </p>
      <p className="mt-5 font-display text-xl text-charcoal">
        {service.price}
      </p>
      <ul className="mt-4 space-y-2">
        {service.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2 text-sm text-ink/80">
            <span aria-hidden className="mt-0.5 text-coral">
              ✦
            </span>
            {d}
          </li>
        ))}
      </ul>
      <p className="mt-4 text-xs uppercase tracking-wide text-soft">
        Timeline: {service.timeline}
      </p>
      <Link
        href="/contact"
        className="mt-6 inline-flex items-center justify-center gap-2 rounded-full creative-gradient px-6 py-3 text-sm font-semibold text-charcoal transition-transform group-hover:-translate-y-0.5"
      >
        Get Started →
      </Link>
    </motion.div>
  );
}

export function FaqAccordion({
  items,
}: {
  items: { q: string; a: string }[];
}) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-charcoal/10 border-y border-charcoal/10">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
              aria-expanded={isOpen}
            >
              <span className="font-display text-lg text-charcoal">
                {item.q}
              </span>
              <span
                className={`text-2xl text-coral transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 font-body leading-relaxed text-soft">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
