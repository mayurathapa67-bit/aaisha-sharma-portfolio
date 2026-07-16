import Link from "next/link";
import { getContent } from "@/lib/content";
import Hero from "@/components/Hero";
import FeaturedWorks from "@/components/FeaturedWorks";
import RevealOnScroll from "@/components/RevealOnScroll";
import AnimatedCounter from "@/components/AnimatedCounter";
import BlogCard from "@/components/BlogCard";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import NewsletterSignup from "@/components/NewsletterSignup";
import SectionHeading from "@/components/SectionHeading";
import CategoryCard from "@/components/CategoryCard";
import { CATEGORIES } from "@/components/categories";
import PullQuote from "@/components/PullQuote";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const content = await getContent();
  const featured = content.portfolio.filter((w) => w.popular).slice(0, 6);
  const masonryBlogs = [...content.blog]
    .sort(
      (a, b) =>
        new Date(b.published_date).getTime() -
        new Date(a.published_date).getTime()
    )
    .slice(0, 5);

  return (
    <>
      <Hero data={content.hero} />

      {/* Stats band */}
      <section className="border-y border-charcoal/10 bg-cream-deep py-14">
        <div className="container-art grid grid-cols-1 gap-8 text-center sm:grid-cols-3">
          {content.hero.stats.map((stat) => (
            <RevealOnScroll key={stat.label} className="flex flex-col items-center">
              <span className="font-display text-5xl text-charcoal sm:text-6xl">
                <AnimatedCounter value={stat.numeric} suffix={stat.suffix} />
              </span>
              <span className="mt-2 font-body text-sm uppercase tracking-[0.2em] text-soft">
                {stat.label}
              </span>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <FeaturedWorks works={featured} />

      {/* About preview */}
      <section className="py-24">
        <div className="container-art grid items-center gap-14 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute inset-0 translate-x-6 translate-y-6 rounded-[2rem] creative-gradient opacity-50 blur-md" />
              <div className="relative overflow-hidden rounded-[2rem] border border-white/40 shadow-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={content.about.image}
                  alt="Aaisha Sharma writing"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-coral">
              The Writer
            </p>
            <h2 className="font-display text-4xl leading-tight text-charcoal sm:text-5xl">
              A storyteller between two homes
            </h2>
            <p className="mt-6 font-body text-lg leading-relaxed text-soft">
              {content.about.bio}
            </p>
            <PullQuote
              text={content.about.philosophy}
              className="my-8 text-left"
              align="left"
            />
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3 text-sm font-medium text-cream transition hover:-translate-y-0.5"
            >
              Read my journey →
            </Link>
          </RevealOnScroll>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-cream-deep py-24 paper-grain">
        <div className="container-art">
          <SectionHeading
            eyebrow="What I Write"
            title="A library of worlds"
            subtitle="Five rooms, each with its own light. Wander wherever the mood takes you."
            align="center"
            className="mx-auto"
          />
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CATEGORIES.map((cat, i) => (
              <CategoryCard key={cat.name} item={cat} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest blog masonry */}
      <section className="py-24">
        <div className="container-art">
          <SectionHeading
            eyebrow="From the Blog"
            title="Latest thoughts"
            subtitle="Essays, tips and travel notes — freshly inked."
          />
          <div className="mt-12 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {masonryBlogs.map((post, i) => (
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
                className="break-inside-avoid"
              />
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full border border-charcoal/20 px-7 py-3 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-cream"
            >
              Visit the blog →
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-cream-deep py-24">
        <div className="container-art">
          <SectionHeading
            eyebrow="Kind Words"
            title="Readers & clients"
            align="center"
            className="mx-auto mb-12"
          />
          <TestimonialCarousel items={content.testimonials} />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24">
        <div className="container-art">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
