import type { Metadata } from "next";
import Link from "next/link";
import { getContent } from "@/lib/content";
import BlogCard from "@/components/BlogCard";
import NewsletterSignup from "@/components/NewsletterSignup";
import RevealOnScroll from "@/components/RevealOnScroll";
import FloatingElements from "@/components/FloatingElements";
import TextScramble from "@/components/TextScramble";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Essays, travel notes, book musings and writing tips from Aaisha Sharma.",
  openGraph: {
    title: "Blog — Aaisha Sharma",
    description:
      "Essays, travel notes, book musings and writing tips from Aaisha Sharma.",
  },
};

const CATEGORIES = ["Travel", "Lifestyle", "Culture", "Books", "Writing Tips"];

export default async function BlogPage() {
  const posts = [...(await getContent()).blog].sort(
    (a, b) =>
      new Date(b.published_date).getTime() -
      new Date(a.published_date).getTime()
  );
  const [featured, ...rest] = posts;
  const popular = [...posts]
    .sort((a, b) => a.read_time.localeCompare(b.read_time))
    .slice(0, 3);

  return (
    <>
      <section className="relative isolate overflow-hidden pb-10 pt-36 paper-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-gold/15 blur-3xl"
        />
        <FloatingElements />
        <div className="container-art relative">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em] text-coral">
              Thoughts & Notes
            </p>
            <h1 className="font-display text-5xl leading-tight text-charcoal sm:text-6xl lg:text-7xl">
              <TextScramble text="The Blog" as="span" speed={34} />
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-soft">
              Casual, personal, and a little messy — like a real notebook.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-art grid gap-12 lg:grid-cols-[1fr_320px]">
          <div>
            {/* Featured */}
            <Link
              href={`/blog/${featured.slug}`}
              className="group relative block overflow-hidden rounded-3xl border border-charcoal/10 shadow-lg"
            >
              <div className="relative aspect-[21/9] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featured.featured_image}
                  alt={featured.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-8">
                  <span className="rounded-full bg-cream/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-charcoal">
                    Featured · {featured.category}
                  </span>
                  <h2 className="mt-3 max-w-2xl font-display text-3xl text-cream sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-2 max-w-xl font-body text-cream/80">
                    {featured.excerpt}
                  </p>
                </div>
              </div>
            </Link>

            <div className="mt-12 grid gap-7 sm:grid-cols-2">
              {rest.map((post, i) => (
                <BlogCard
                  key={post.slug}
                  item={{
                    slug: post.slug,
                    title: post.title,
                    excerpt: post.excerpt,
                    featured_image: post.featured_image,
                    published_date: post.published_date,
                    read_time: post.read_time,
                    category: post.category,
                  }}
                  hrefPrefix="/blog"
                  index={i}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-10">
            <div className="rounded-3xl border border-charcoal/10 bg-cream p-7">
              <h3 className="font-display text-xl text-charcoal">Categories</h3>
              <ul className="mt-4 space-y-2">
                {CATEGORIES.map((c) => (
                  <li key={c}>
                    <Link
                      href={`/blog?category=${c}`}
                      className="text-sm text-soft transition-colors hover:text-charcoal"
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-charcoal/10 bg-cream p-7">
              <h3 className="font-display text-xl text-charcoal">
                Popular Reads
              </h3>
              <ul className="mt-4 space-y-4">
                {popular.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/blog/${p.slug}`}
                      className="group flex gap-3"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.featured_image}
                        alt={p.title}
                        className="h-16 w-16 shrink-0 rounded-xl object-cover"
                      />
                      <div>
                        <p className="font-body text-sm font-medium leading-snug text-charcoal group-hover:text-coral">
                          {p.title}
                        </p>
                        <p className="text-xs text-soft">{p.read_time}</p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-3xl border border-charcoal/10 bg-cream-deep p-7">
              <NewsletterSignup compact />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
