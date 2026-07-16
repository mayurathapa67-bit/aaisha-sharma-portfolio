"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Work } from "@/lib/content";
import { formatDate, cn } from "@/lib/utils";

const FILTERS = [
  "All Works",
  "Fiction",
  "Poetry",
  "Travel",
  "Lifestyle",
  "Essay",
  "Article",
];

type SortKey = "newest" | "popular" | "read";

export default function PortfolioGrid({ works }: { works: Work[] }) {
  const [filter, setFilter] = useState("All Works");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("newest");

  const filtered = useMemo(() => {
    let list = [...works];
    if (filter !== "All Works") {
      list = list.filter((w) => w.category === filter);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.excerpt.toLowerCase().includes(q) ||
          (w.tags ?? []).some((t) => t.toLowerCase().includes(q))
      );
    }
    if (sort === "newest") {
      list.sort(
        (a, b) =>
          new Date(b.published_date).getTime() -
          new Date(a.published_date).getTime()
      );
    } else if (sort === "popular") {
      list.sort((a, b) => Number(b.popular) - Number(a.popular));
    } else {
      list.sort(
        (a, b) =>
          parseInt(a.read_time) - parseInt(b.read_time) ||
          a.read_time.localeCompare(b.read_time)
      );
    }
    return list;
  }, [works, filter, query, sort]);

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
                filter === f
                  ? "border-charcoal bg-charcoal text-cream"
                  : "border-charcoal/15 text-soft hover:border-charcoal/40"
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search stories…"
              aria-label="Search stories"
              className="w-full rounded-full border border-charcoal/15 bg-white/70 px-5 py-2.5 text-sm outline-none transition focus:border-charcoal/50 focus:ring-2 focus:ring-coral/30 sm:w-64"
            />
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            aria-label="Sort works"
            className="rounded-full border border-charcoal/15 bg-white/70 px-4 py-2.5 text-sm outline-none transition focus:border-charcoal/50"
          >
            <option value="newest">Newest</option>
            <option value="popular">Popular</option>
            <option value="read">Read Time</option>
          </select>
        </div>
      </div>

      <motion.div
        layout
        className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filtered.map((work) => (
            <motion.article
              key={work.slug}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4 }}
              className="group flex flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-cream shadow-sm transition-shadow hover:shadow-xl"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.featured_image}
                  alt={work.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal">
                  {work.category}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-xs text-soft">
                  <time dateTime={work.published_date}>
                    {formatDate(work.published_date)}
                  </time>
                  <span aria-hidden>·</span>
                  <span>{work.read_time}</span>
                </div>
                <h3 className="mt-3 font-display text-xl leading-snug text-charcoal transition-colors group-hover:text-coral">
                  {work.title}
                </h3>
                <p className="mt-3 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-soft">
                  {work.excerpt}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {(work.tags ?? []).slice(0, 3).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-charcoal/[0.05] px-2.5 py-1 text-xs text-soft"
                    >
                      #{t}
                    </span>
                  ))}
                </div>
                <Link
                  href={`/portfolio/${work.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
                >
                  Read Story
                  <span
                    aria-hidden
                    className="transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center font-accent text-2xl italic text-soft">
          No stories found — try another search.
        </p>
      )}
    </div>
  );
}
