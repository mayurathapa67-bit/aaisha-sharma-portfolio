"use client";

import { motion } from "framer-motion";
import FloatingElements from "./FloatingElements";
import MagneticButton from "./MagneticButton";
import type { HeroData } from "@/lib/content";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.045, delayChildren: 0.15 },
  },
};

const letter = {
  hidden: { opacity: 0, y: 60, rotateX: -90 },
  show: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: { duration: 0.8, ease: [0.2, 0.8, 0.2, 1] as const },
  },
};

export default function Hero({ data }: { data: HeroData }) {
  const words = data.tagline.split(" ");

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden paper-grain">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 creative-gradient opacity-[0.07]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-coral/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-teal/20 blur-3xl"
      />

      <FloatingElements />

      <div className="container-art relative z-10 grid items-center gap-12 py-28 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 text-sm font-medium uppercase tracking-[0.4em] text-soft"
          >
            {data.role}
          </motion.p>

          <h1 className="font-display text-charcoal">
            <span className="block text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
              {data.title}
            </span>
            <motion.span
              variants={container}
              initial="hidden"
              animate="show"
              className="mt-4 block text-4xl leading-tight sm:text-5xl lg:text-6xl"
              aria-label={data.tagline}
            >
              {words.map((word, wi) => (
                <span key={wi} className="mr-3 inline-block">
                  {word.split("").map((char, ci) => (
                    <motion.span
                      key={ci}
                      variants={letter}
                      className="text-gradient inline-block [transform-style:preserve-3d]"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              ))}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-7 max-w-xl font-body text-lg leading-relaxed text-soft"
          >
            {data.subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <MagneticButton href="/portfolio" ariaLabel={data.cta_primary}>
              {data.cta_primary}
              <span aria-hidden>→</span>
            </MagneticButton>
            <MagneticButton
              href="/blog"
              variant="secondary"
              ariaLabel={data.cta_secondary}
            >
              {data.cta_secondary}
            </MagneticButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto aspect-[4/5] w-full max-w-sm"
        >
          <div className="absolute inset-0 translate-x-5 translate-y-5 rounded-[2rem] creative-gradient opacity-60 blur-md" />
          <div className="absolute inset-0 overflow-hidden rounded-[2rem] border border-white/40 shadow-2xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={data.image}
              alt={`Portrait representing ${data.title}`}
              className="h-full w-full object-cover"
            />
          </div>
          <span className="absolute -bottom-5 -left-5 rotate-[-6deg] rounded-2xl bg-cream px-5 py-3 font-accent text-2xl italic text-charcoal shadow-lg">
            &ldquo;words that wander&rdquo;
          </span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-soft"
        aria-hidden
      >
        <span className="block animate-float text-2xl">↓</span>
      </motion.div>
    </section>
  );
}
