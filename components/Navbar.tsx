"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

const FALLBACK_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Services", href: "/services" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled ? "glass shadow-[0_4px_30px_-12px_rgba(0,0,0,0.18)]" : "bg-transparent"
      )}
    >
      <nav className="container-art flex h-20 items-center justify-between">
        <Link href="/" className="group flex items-center gap-2" aria-label="Aaisha Sharma home">
          <span className="grid h-9 w-9 place-items-center rounded-full creative-gradient font-display text-lg font-bold text-charcoal transition-transform group-hover:rotate-12">
            A
          </span>
          <span className="font-display text-xl font-semibold tracking-tight text-charcoal">
            Aaisha<span className="text-soft">.</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {FALLBACK_LINKS.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={handleNav}
                  className={cn(
                    "relative rounded-full px-4 py-2 text-sm font-medium transition-colors",
                    active ? "text-charcoal" : "text-soft hover:text-charcoal"
                  )}
                >
                  {link.name}
                  {active && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-charcoal/[0.06]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <Link
          href="/contact"
          onClick={handleNav}
          className="hidden rounded-full bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition-transform hover:-translate-y-0.5 md:inline-block"
        >
          Let&rsquo;s Talk
        </Link>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="relative z-50 grid h-11 w-11 place-items-center md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          <span className="relative block h-5 w-6">
            <motion.span
              className="absolute left-0 block h-0.5 w-6 rounded bg-charcoal"
              animate={open ? { rotate: 45, top: 9 } : { rotate: 0, top: 0 }}
              style={{ top: 0 }}
            />
            <motion.span
              className="absolute left-0 top-2 block h-0.5 w-6 rounded bg-charcoal"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="absolute left-0 block h-0.5 w-6 rounded bg-charcoal"
              animate={open ? { rotate: -45, top: 9 } : { rotate: 0, top: 16 }}
              style={{ top: 16 }}
            />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="glass absolute inset-x-0 top-20 mx-3 rounded-3xl p-4 shadow-2xl md:hidden"
          >
            <ul className="flex flex-col gap-1">
              {FALLBACK_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    href={link.href}
                    onClick={handleNav}
                    className="block rounded-2xl px-5 py-3 font-display text-2xl text-charcoal transition-colors hover:bg-charcoal/[0.05]"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
