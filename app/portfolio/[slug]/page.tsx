import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import ReadingProgress from "@/components/ReadingProgress";
import TableOfContents, { type TocItem } from "@/components/TableOfContents";
import BlogCard from "@/components/BlogCard";
import { ArticleBody, buildToc } from "@/components/ArticleBody";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const content = await getContent();
  return content.portfolio
    .filter((w) => w.is_published)
    .map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const work = content.portfolio.find((w) => w.slug === slug);
  if (!work) return { title: "Story not found" };
  return {
    title: work.title,
    description: work.excerpt,
    openGraph: {
      title: work.title,
      description: work.excerpt,
      images: [work.featured_image],
    },
  };
}

export default async function PortfolioDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent();
  const work = content.portfolio.find(
    (w) => w.slug === slug && w.is_published
  );
  if (!work) notFound();

  const toc: TocItem[] = buildToc(work.content);
  const related = content.portfolio
    .filter((w) => w.slug !== work.slug && w.is_published)
    .slice(0, 3);

  const shareUrl =
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aaishasharma.com") +
    `/portfolio/${work.slug}`;

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="relative isolate overflow-hidden pt-36 pb-16 paper-grain">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/20 blur-3xl"
          />
          <div className="container-art relative text-center">
            <Link
              href="/portfolio"
              className="text-sm text-soft transition-colors hover:text-charcoal"
            >
              ← Back to portfolio
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-coral">
              {work.category}
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
              {work.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-soft">
              <span>Aaisha Sharma</span>
              <span aria-hidden>·</span>
              <time dateTime={work.published_date}>
                {formatDate(work.published_date)}
              </time>
              <span aria-hidden>·</span>
              <span>{work.read_time}</span>
              {work.publication_name && (
                <>
                  <span aria-hidden>·</span>
                  <span className="text-coral">{work.publication_name}</span>
                </>
              )}
            </div>
          </div>
        </header>

        <div className="container-art grid gap-12 pb-24 lg:grid-cols-[1fr_240px]">
          <div className="min-w-0">
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-3xl shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={work.featured_image}
                alt={work.title}
                className="h-full w-full object-cover"
              />
            </div>
            <ArticleBody content={work.content} toc={toc} />

            <div className="mt-10 flex flex-wrap gap-2">
              {(work.tags ?? []).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-charcoal/[0.05] px-3 py-1.5 text-sm text-soft"
                >
                  #{t}
                </span>
              ))}
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-3 border-t border-charcoal/10 pt-8">
              <span className="font-body text-sm text-soft">Share:</span>
              <a
                href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                  shareUrl
                )}&text=${encodeURIComponent(work.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-charcoal/15 px-4 py-2 text-sm transition hover:bg-charcoal hover:text-cream"
              >
                Twitter
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-charcoal/15 px-4 py-2 text-sm transition hover:bg-charcoal hover:text-cream"
              >
                LinkedIn
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-charcoal/15 px-4 py-2 text-sm transition hover:bg-charcoal hover:text-cream"
              >
                Facebook
              </a>
            </div>
          </div>

          {toc.length > 0 && (
            <aside className="hidden lg:block">
              <div className="sticky top-28">
                <TableOfContents items={toc} />
              </div>
            </aside>
          )}
        </div>
      </article>

      {related.length > 0 && (
        <section className="bg-cream-deep py-24">
          <div className="container-art">
            <h2 className="font-display text-4xl text-charcoal">Keep reading</h2>
            <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r, i) => (
                <BlogCard
                  key={r.slug}
                  item={{
                    slug: r.slug,
                    title: r.title,
                    excerpt: r.excerpt,
                    featured_image: r.featured_image,
                    published_date: r.published_date,
                    read_time: r.read_time,
                    category: r.category,
                  }}
                  hrefPrefix="/portfolio"
                  index={i}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
