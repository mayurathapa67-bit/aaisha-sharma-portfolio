import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import ContactForm from "@/components/ContactForm";
import RevealOnScroll from "@/components/RevealOnScroll";
import FloatingElements from "@/components/FloatingElements";
import TextScramble from "@/components/TextScramble";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a conversation with Aaisha Sharma — creative writer and blogger based in Sydney and Bhaktapur, Nepal.",
  openGraph: {
    title: "Contact — Aaisha Sharma",
    description: "Start a conversation with Aaisha Sharma.",
  },
};

export default async function ContactPage() {
  const { contact } = await getContent();

  return (
    <>
      <section className="relative isolate overflow-hidden pb-12 pt-36 paper-grain">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-teal/15 blur-3xl"
        />
        <FloatingElements />
        <div className="container-art relative text-center">
          <RevealOnScroll>
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.4em] text-coral">
              Let&rsquo;s Connect
            </p>
            <h1 className="font-display text-5xl leading-tight text-charcoal sm:text-6xl lg:text-7xl">
              <TextScramble text="Start a Conversation" as="span" speed={34} />
            </h1>
          </RevealOnScroll>
        </div>
      </section>

      <section className="pb-28">
        <div className="container-art grid gap-12 lg:grid-cols-[1fr_0.8fr]">
          <RevealOnScroll>
            <div className="rounded-3xl border border-charcoal/10 bg-cream p-8 shadow-sm sm:p-10">
              <ContactForm />
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="space-y-6">
              <div className="rounded-3xl border border-charcoal/10 bg-cream-deep p-7">
                <span className="inline-flex items-center gap-2 rounded-full bg-teal/15 px-4 py-1.5 text-sm font-medium text-teal">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-teal" />
                  {contact.availability}
                </span>
                <p className="mt-4 font-body text-sm text-soft">
                  {contact.response_time}
                </p>
              </div>

              <div className="rounded-3xl border border-charcoal/10 bg-cream p-7">
                <h3 className="font-display text-xl text-charcoal">
                  Get in touch
                </h3>
                <ul className="mt-4 space-y-4">
                  <li>
                    <p className="text-xs uppercase tracking-wide text-soft">
                      Email
                    </p>
                    <a
                      href={`mailto:${contact.email}`}
                      className="font-body text-ink transition-colors hover:text-coral"
                    >
                      {contact.email}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wide text-soft">
                      Phone
                    </p>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                      className="font-body text-ink transition-colors hover:text-coral"
                    >
                      {contact.phone}
                    </a>
                  </li>
                  <li>
                    <p className="text-xs uppercase tracking-wide text-soft">
                      Based in
                    </p>
                    <p className="font-body text-ink">
                      {contact.location_primary}
                    </p>
                    <p className="font-body text-ink">
                      {contact.location_secondary}
                    </p>
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-charcoal/10 bg-cream p-7">
                <h3 className="font-display text-xl text-charcoal">Elsewhere</h3>
                <div className="mt-4 flex flex-wrap gap-3">
                  {contact.socials.map((s) => (
                    <a
                      key={s.platform}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.platform}
                      className="rounded-full border border-charcoal/15 px-4 py-2 text-sm font-medium text-charcoal transition hover:bg-charcoal hover:text-cream"
                    >
                      {s.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </section>
    </>
  );
}
