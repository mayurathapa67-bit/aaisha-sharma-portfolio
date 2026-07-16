import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import RevealOnScroll from "@/components/RevealOnScroll";
import JourneyTimeline from "@/components/JourneyTimeline";
import ExpertiseBars from "@/components/ExpertiseBars";
import PullQuote from "@/components/PullQuote";
import NewsletterSignup from "@/components/NewsletterSignup";
import FloatingElements from "@/components/FloatingElements";
import TextScramble from "@/components/TextScramble";

export const metadata: Metadata = {
  title: "About",
  description:
    "Behind the words: the story, philosophy and journey of Aaisha Sharma, creative writer and blogger.",
  openGraph: {
    title: "About — Aaisha Sharma",
    description:
      "Behind the words: the story, philosophy and journey of Aaisha Sharma.",
  },
};

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const { about, contact } = await getContent();

  return (
    <>
      <section className="relative isolate overflow-hidden pt-36 pb-16 paper-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal/15 blur-3xl"
        />
        <FloatingElements />
        <div className="container-art relative text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.4em] text-coral">
            {contact.location_primary} · {contact.location_secondary}
          </p>
          <h1 className="font-display text-5xl leading-tight text-charcoal sm:text-6xl lg:text-7xl">
            <TextScramble text={about.headline} as="span" speed={32} />
          </h1>
          <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-soft">
            {about.bio}
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="bg-cream-deep py-24">
        <div className="container-art max-w-4xl text-center">
          <RevealOnScroll>
            <PullQuote text={about.philosophy} />
          </RevealOnScroll>
        </div>
      </section>

      {/* Journey */}
      <section className="py-24">
        <div className="container-art">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-coral">
              The Journey
            </p>
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">
              Milestones in ink
            </h2>
          </RevealOnScroll>
          <div className="mt-12">
            <JourneyTimeline items={about.journey} />
          </div>
        </div>
      </section>

      {/* Expertise + Image */}
      <section className="bg-cream-deep py-24">
        <div className="container-art grid items-center gap-14 lg:grid-cols-2">
          <RevealOnScroll>
            <div className="relative">
              <div className="absolute inset-0 -translate-x-5 translate-y-5 rounded-[2rem] creative-gradient opacity-50 blur-md" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={about.image}
                alt="Aaisha Sharma"
                className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl"
              />
            </div>
          </RevealOnScroll>
          <RevealOnScroll delay={0.1}>
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">
              What I bring to the page
            </h2>
            <p className="mt-4 font-body text-soft">
              Years of practice across forms — here is where the ink runs
              deepest.
            </p>
            <div className="mt-8">
              <ExpertiseBars items={about.expertise} />
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {/* Publications */}
      <section className="py-24">
        <div className="container-art">
          <RevealOnScroll>
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">
              Selected Publications
            </h2>
          </RevealOnScroll>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {about.publications.map((p, i) => (
              <RevealOnScroll key={p.title} delay={i * 0.05}>
                <a
                  href={p.link}
                  className="group flex items-center justify-between gap-4 rounded-3xl border border-charcoal/10 bg-cream p-7 transition-shadow hover:shadow-lg"
                >
                  <div>
                    <h3 className="font-display text-xl text-charcoal">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-sm text-soft">{p.platform}</p>
                  </div>
                  <span className="font-accent text-2xl italic text-soft">
                    {p.year}
                  </span>
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section className="bg-cream-deep py-24">
        <div className="container-art">
          <RevealOnScroll>
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">
              Awards & Recognition
            </h2>
          </RevealOnScroll>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {about.awards.map((a, i) => (
              <RevealOnScroll key={a.title} delay={i * 0.07}>
                <div className="rounded-3xl border border-charcoal/10 bg-cream p-8 text-center shadow-sm">
                  <span className="mx-auto grid h-16 w-16 place-items-center rounded-full creative-gradient text-3xl text-charcoal">
                    🏆
                  </span>
                  <h3 className="mt-5 font-display text-xl text-charcoal">
                    {a.title}
                  </h3>
                  <p className="mt-1 text-sm text-coral">{a.year}</p>
                  <p className="mt-3 font-body text-sm text-soft">
                    {a.description}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* Interests */}
      <section className="py-24">
        <div className="container-art text-center">
          <RevealOnScroll>
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">
              Off the page
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-soft">
              The small things that refill the well.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              {about.interests.map((interest) => (
                <span
                  key={interest}
                  className="rounded-full border border-charcoal/15 bg-cream px-5 py-2.5 font-body text-sm text-charcoal transition-colors hover:bg-charcoal hover:text-cream"
                >
                  {interest}
                </span>
              ))}
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-art">
          <NewsletterSignup />
        </div>
      </section>
    </>
  );
}
