"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { CategoryFilter } from "@/lib/content";

const ICONS: Record<string, string> = {
  Fiction: "📖",
  Poetry: "🪶",
  Travel: "✈️",
  Lifestyle: "🌿",
  Essay: "✍️",
  Article: "📰",
};

export default function CategoryCard({
  item,
  index,
}: {
  item: { name: CategoryFilter | string; blurb: string };
  index: number;
}) {
  const icon = ICONS[item.name.split(" ")[0]] ?? "📝";
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      whileHover={{ y: -6 }}
      className="group relative overflow-hidden rounded-3xl border border-charcoal/10 bg-cream p-8 shadow-sm transition-shadow hover:shadow-xl"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-coral/10 opacity-0 blur-2xl transition-opacity group-hover:opacity-100"
      />
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-charcoal/[0.04] text-3xl transition-transform group-hover:scale-110">
        {icon}
      </span>
      <h3 className="mt-6 font-display text-2xl text-charcoal">{item.name}</h3>
      <p className="mt-2 font-body text-soft">{item.blurb}</p>
      <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-charcoal opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100">
        Explore
        <span aria-hidden>→</span>
      </span>
      <Link
        href={`/portfolio?category=${encodeURIComponent(item.name)}`}
        className="absolute inset-0"
        aria-label={`Explore ${item.name}`}
      />
    </motion.div>
  );
}
