import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import PortfolioGrid from "@/components/PortfolioGrid";
import FloatingElements from "@/components/FloatingElements";
import RevealOnScroll from "@/components/RevealOnScroll";
import TextScramble from "@/components/TextScramble";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "A curated archive of fiction, poetry, travel writing and essays by Aaisha Sharma.",
  openGraph: {
    title: "Portfolio — Aaisha Sharma",
    description:
      "A curated archive of fiction, poetry, travel writing and essays by Aaisha Sharma.",
  },
};

export default async function PortfolioPage() {
  const works = (await getContent()).portfolio.filter((w) => w.is_published);

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-36 paper-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-coral/15 blur-3xl"
        />
        <FloatingElements />
        <div className="container-art relative">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em] text-coral">
              The Archive
            </p>
            <h1 className="font-display text-5xl leading-tight text-charcoal sm:text-6xl lg:text-7xl">
              <TextScramble text="Literary Works" as="span" speed={34} />
            </h1>
            <p className="mt-6 max-w-2xl font-body text-lg leading-relaxed text-soft">
              Fiction, poetry, travelogues and essays — each one a small world
              you can step into. Filter, search, and stay a while.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-art">
          <PortfolioGrid works={works} />
        </div>
      </section>
    </>
  );
}
