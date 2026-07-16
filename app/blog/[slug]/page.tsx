import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getContent } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import ReadingProgress from "@/components/ReadingProgress";
import BlogCard from "@/components/BlogCard";
import { ArticleBody, buildToc } from "@/components/ArticleBody";
import TableOfContents, {
  type TocItem,
} from "@/components/TableOfContents";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  const content = await getContent();
  return content.blog.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = await getContent();
  const post = content.blog.find((b) => b.slug === slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.featured_image],
    },
  };
}

export default async function BlogDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = await getContent();
  const post = content.blog.find((b) => b.slug === slug);
  if (!post) notFound();

  const toc: TocItem[] = buildToc(post.content);
  const related = content.blog
    .filter((b) => b.slug !== post.slug && b.category === post.category)
    .slice(0, 3);
  const fallback = content.blog
    .filter((b) => b.slug !== post.slug)
    .slice(0, 3);

  return (
    <>
      <ReadingProgress />
      <article>
        <header className="relative isolate overflow-hidden pt-36 pb-16 paper-grain">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-20 right-1/4 h-72 w-72 rounded-full bg-teal/20 blur-3xl"
          />
          <div className="container-art relative text-center">
            <Link
              href="/blog"
              className="text-sm text-soft transition-colors hover:text-charcoal"
            >
              ← Back to blog
            </Link>
            <p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-coral">
              {post.category}
            </p>
            <h1 className="mx-auto mt-4 max-w-4xl font-display text-4xl leading-tight text-charcoal sm:text-5xl lg:text-6xl">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-sm text-soft">
              <time dateTime={post.published_date}>
                {formatDate(post.published_date)}
              </time>
              <span aria-hidden>·</span>
              <span>{post.read_time}</span>
            </div>
          </div>
        </header>

        <div className="container-art grid gap-12 pb-24 lg:grid-cols-[1fr_220px]">
          <div className="min-w-0">
            <div className="relative mb-12 aspect-[16/9] overflow-hidden rounded-3xl shadow-xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={post.featured_image}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
            <ArticleBody content={post.content} toc={toc} />
            <div className="mt-10 flex flex-wrap gap-2">
              {(post.tags ?? []).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-charcoal/[0.05] px-3 py-1.5 text-sm text-soft"
                >
                  #{t}
                </span>
              ))}
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

      <section className="bg-cream-deep py-24">
        <div className="container-art">
          <h2 className="font-display text-4xl text-charcoal">
            More from the blog
          </h2>
          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {(related.length ? related : fallback).map((r, i) => (
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
                hrefPrefix="/blog"
                index={i}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
