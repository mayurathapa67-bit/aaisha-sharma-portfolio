"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/content";

export default function TestimonialCarousel({
  items,
}: {
  items: Testimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 5000);
    return () => clearInterval(t);
  }, [paused, items.length]);

  const current = items[index];

  return (
    <div
      className="relative mx-auto max-w-3xl text-center"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <span
        aria-hidden
        className="creative-gradient bg-clip-text font-display text-[8rem] leading-none text-transparent opacity-30"
      >
        &ldquo;
      </span>
      <AnimatePresence mode="wait">
        <motion.figure
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
        >
          <blockquote className="font-accent text-2xl italic leading-snug text-charcoal sm:text-3xl">
            {current.quote}
          </blockquote>
          <figcaption className="mt-8 flex items-center justify-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={current.avatar}
              alt={current.name}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-charcoal/10"
            />
            <div className="text-left">
              <p className="font-display text-base text-charcoal">
                {current.name}
              </p>
              <p className="text-xs text-soft">
                {current.role}
                {current.company ? `, ${current.company}` : ""}
              </p>
            </div>
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      <div className="mt-8 flex justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
            className={cn(
              "h-2 rounded-full transition-all",
              i === index ? "w-8 bg-charcoal" : "w-2 bg-charcoal/25"
            )}
          />
        ))}
      </div>
    </div>
  );
}
