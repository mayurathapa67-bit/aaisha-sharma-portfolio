"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import NewsletterSignup from "./NewsletterSignup";

const LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

const SOCIALS = [
  { name: "Instagram", href: "https://instagram.com/" },
  { name: "Twitter", href: "https://twitter.com/" },
  { name: "LinkedIn", href: "https://linkedin.com/" },
  { name: "Goodreads", href: "https://goodreads.com/" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-charcoal/10 bg-cream-deep">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/20 blur-3xl"
      />
      <div className="container-art relative grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-10 w-10 place-items-center rounded-full creative-gradient font-display text-xl font-bold text-charcoal">
              A
            </span>
            <span className="font-display text-2xl font-semibold text-charcoal">
              Aaisha Sharma
            </span>
          </Link>
          <p className="mt-5 max-w-sm font-body leading-relaxed text-soft">
            Creative writer and blogger weaving fiction, poetry and travel essays
            between the shores of Sydney and the courtyards of Bhaktapur.
          </p>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map((s) => (
              <motion.a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -4 }}
                className="grid h-10 w-10 place-items-center rounded-full border border-charcoal/15 bg-cream text-sm font-medium text-charcoal transition-colors hover:border-charcoal/40"
                aria-label={s.name}
              >
                {s.name[0]}
              </motion.a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-lg text-charcoal">Explore</h3>
          <ul className="mt-4 space-y-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-soft transition-colors hover:text-charcoal"
                >
                  {l.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-lg text-charcoal">
            Join the journey
          </h3>
          <p className="mt-4 text-sm text-soft">
            A letter, sometimes two, a month. No noise.
          </p>
          <div className="mt-4">
            <NewsletterSignup compact />
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal/10">
        <div className="container-art flex flex-col items-center justify-between gap-3 py-6 text-xs text-soft sm:flex-row">
          <p>© {new Date().getFullYear()} Aaisha Sharma. All rights reserved.</p>
          <p className="font-accent text-base italic">
            &ldquo;Words that breathe life.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
