"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BaseItem {
  slug: string;
  title: string;
  excerpt: string;
  featured_image: string;
  published_date: string;
  read_time: string;
  category?: string;
  tags?: string[];
}

export default function BlogCard({
  item,
  hrefPrefix,
  className,
  index = 0,
}: {
  item: BaseItem;
  hrefPrefix: string;
  className?: string;
  index?: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08 }}
      whileHover={{ y: -6 }}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border border-charcoal/10 bg-cream shadow-sm transition-shadow hover:shadow-xl",
        className
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.featured_image}
          alt={item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {item.category && (
          <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal backdrop-blur">
            {item.category}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-3 text-xs text-soft">
          <time dateTime={item.published_date}>{item.published_date}</time>
          <span aria-hidden>·</span>
          <span>{item.read_time}</span>
        </div>
        <h3 className="mt-3 font-display text-xl leading-snug text-charcoal transition-colors group-hover:text-coral">
          {item.title}
        </h3>
        <p className="mt-3 line-clamp-3 flex-1 font-body text-sm leading-relaxed text-soft">
          {item.excerpt}
        </p>
        <Link
          href={`${hrefPrefix}/${item.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
          aria-label={`Read ${item.title}`}
        >
          Read More
          <span
            aria-hidden
            className="transition-transform group-hover:translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </motion.article>
  );
}
