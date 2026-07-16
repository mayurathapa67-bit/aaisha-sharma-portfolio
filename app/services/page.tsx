import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ServiceCard, { FaqAccordion } from "@/components/ServiceCard";
import RevealOnScroll from "@/components/RevealOnScroll";
import MagneticButton from "@/components/MagneticButton";
import FloatingElements from "@/components/FloatingElements";
import TextScramble from "@/components/TextScramble";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Creative writing, blogging, copywriting, editing and content strategy services by Aaisha Sharma.",
  openGraph: {
    title: "Services — Aaisha Sharma",
    description:
      "Creative writing, blogging, copywriting, editing and content strategy services.",
  },
};

const PROCESS = [
  {
    step: "01",
    title: "Discovery",
    desc: "We talk. I learn your voice, your goals, your audience — and what success looks like.",
  },
  {
    step: "02",
    title: "Creation",
    desc: "I draft with care: words that sound like you, structured to move the reader.",
  },
  {
    step: "03",
    title: "Revision",
    desc: "We refine together. One or two rounds until it feels exactly right.",
  },
  {
    step: "04",
    title: "Delivery",
    desc: "Polished, formatted, and ready to publish — with a little breathing room built in.",
  },
];

const FAQ = [
  {
    q: "How do we get started?",
    a: "Send a note through the contact page with a little about your project. I'll reply within 24–48 hours with next steps and a quote.",
  },
  {
    q: "Do you work on retainer?",
    a: "Yes — ongoing blog and content strategy work is billed monthly. One-off projects are scoped individually.",
  },
  {
    q: "What if I don't like the first draft?",
    a: "That's what revisions are for. Every package includes at least one round, and I'd rather get it right than rush.",
  },
  {
    q: "Who owns the rights?",
    a: "You do. Once paid, original writing is yours to publish under your name — full commercial rights included.",
  },
];

export default async function ServicesPage() {
  const services = (await getContent()).services;

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-36 paper-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-32 top-10 h-80 w-80 rounded-full bg-coral/15 blur-3xl"
        />
        <FloatingElements />
        <div className="container-art relative text-center">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em] text-coral">
              Let&rsquo;s Create Together
            </p>
            <h1 className="font-display text-5xl leading-tight text-charcoal sm:text-6xl lg:text-7xl">
              <TextScramble text="Writing Services" as="span" speed={34} />
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-lg leading-relaxed text-soft">
              Whether you need a single poem or a year of content, I&rsquo;d
              love to help you find the right words.
            </p>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-art">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <ServiceCard key={s.title} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-cream-deep py-24">
        <div className="container-art">
          <RevealOnScroll>
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">
              How we work
            </h2>
          </RevealOnScroll>
          <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
            {PROCESS.map((p, i) => (
              <RevealOnScroll key={p.step} delay={i * 0.08}>
                <div className="rounded-3xl border border-charcoal/10 bg-cream p-7">
                  <span className="creative-gradient bg-clip-text font-display text-5xl text-transparent">
                    {p.step}
                  </span>
                  <h3 className="mt-4 font-display text-2xl text-charcoal">
                    {p.title}
                  </h3>
                  <p className="mt-3 font-body text-sm leading-relaxed text-soft">
                    {p.desc}
                  </p>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24">
        <div className="container-art max-w-3xl">
          <RevealOnScroll>
            <h2 className="font-display text-4xl text-charcoal sm:text-5xl">
              Frequently asked
            </h2>
          </RevealOnScroll>
          <div className="mt-10">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-28">
        <div className="container-art text-center">
          <div className="relative overflow-hidden rounded-[2.5rem] creative-gradient px-8 py-16 text-charcoal shadow-xl">
            <h2 className="font-display text-4xl sm:text-5xl">
              Ready to start your project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl font-body text-lg">
              Tell me what you&rsquo;re dreaming of. The first conversation is
              always free.
            </p>
            <div className="mt-8 flex justify-center">
              <MagneticButton href="/contact" variant="secondary">
                Let&rsquo;s Talk →
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
