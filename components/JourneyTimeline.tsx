"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Milestone } from "@/lib/content";

export default function JourneyTimeline({ items }: { items: Milestone[] }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-[auto_1fr]">
      <ol className="relative flex gap-4 overflow-x-auto pb-4 lg:flex-col lg:gap-0 lg:overflow-visible">
        <span
          aria-hidden
          className="absolute left-[11px] top-2 bottom-2 w-px bg-charcoal/15 lg:left-2 lg:top-2"
        />
        {items.map((m, i) => (
          <li key={m.year} className="relative shrink-0 lg:shrink">
            <button
              type="button"
              onClick={() => setActive(i)}
              className="flex items-center gap-4 text-left lg:py-3"
              aria-label={`${m.year} — ${m.milestone}`}
            >
              <span
                className={`relative z-10 grid h-6 w-6 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                  i === active
                    ? "border-coral bg-coral"
                    : "border-charcoal/30 bg-cream"
                }`}
              >
                {i === active && (
                  <motion.span
                    layoutId="timeline-dot"
                    className="h-2 w-2 rounded-full bg-white"
                  />
                )}
              </span>
              <span
                className={`font-display text-lg transition-colors ${
                  i === active ? "text-charcoal" : "text-soft"
                }`}
              >
                {m.year}
              </span>
            </button>
          </li>
        ))}
      </ol>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-charcoal/10 bg-cream p-8 shadow-sm"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">
            {current.year}
          </p>
          <h3 className="mt-2 font-display text-3xl text-charcoal">
            {current.milestone}
          </h3>
          <p className="mt-4 font-body text-lg leading-relaxed text-soft">
            {current.story}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
