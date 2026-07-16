"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef } from "react";
import { motion } from "framer-motion";
import type { Work } from "@/lib/content";

export default function FeaturedWorks({ works }: { works: Work[] }) {
  const router = useRouter();
  const scroller = useRef<HTMLDivElement>(null);

  function scrollBy(dir: 1 | -1) {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.8), behavior: "smooth" });
  }

  return (
    <section className="py-24">
      <div className="container-art">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-coral">
              Featured Works
            </p>
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">
              Stories worth lingering in
            </h2>
          </div>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Scroll left"
              className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-charcoal transition hover:bg-charcoal hover:text-cream"
            >
              ←
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Scroll right"
              className="grid h-11 w-11 place-items-center rounded-full border border-charcoal/15 text-charcoal transition hover:bg-charcoal hover:text-cream"
            >
              →
            </button>
          </div>
        </div>
      </div>

      <div
        ref={scroller}
        className="no-scrollbar mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-6 lg:px-[max(2.5rem,calc((100vw-78rem)/2))]"
      >
        {works.map((work, i) => (
          <motion.article
            key={work.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.05 }}
            className="group relative w-[85vw] shrink-0 snap-start sm:w-[420px]"
          >
            <Link href={`/portfolio/${work.slug}`} className="block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl border border-charcoal/10 shadow-lg transition-transform duration-500 group-hover:-translate-y-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={work.featured_image}
                  alt={work.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/10 to-transparent" />
                <span className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal">
                  {work.category}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="font-display text-2xl leading-snug text-cream">
                    {work.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 font-body text-sm text-cream/80">
                    {work.excerpt}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-cream">
                    Read Story
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>
              </div>
            </Link>
          </motion.article>
        ))}
      </div>

      <div className="container-art mt-10 text-center">
        <button
          type="button"
          onClick={() => router.push("/portfolio")}
          className="rounded-full border border-charcoal/20 px-7 py-3 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-cream"
        >
          View all works
        </button>
      </div>
    </section>
  );
}
