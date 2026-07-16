"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function NewsletterSignup({
  compact = false,
}: {
  compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle"
  );
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "Newsletter Subscriber",
          email,
          subject: "Newsletter Signup",
          message: "Please add me to the literary journey newsletter.",
        }),
      });
      if (res.ok) {
        setStatus("success");
        setMessage("Welcome aboard — check your inbox soon!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-charcoal/10 bg-cream p-7",
        !compact && "paper-grain"
      )}
    >
      {!compact && (
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-coral/15 blur-2xl"
        />
      )}
      <div className="relative">
        {!compact && (
          <>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-coral">
              Newsletter
            </p>
            <h3 className="mt-2 font-display text-3xl text-charcoal">
              Join My Literary Journey
            </h3>
            <p className="mt-3 max-w-md font-body text-soft">
              One thoughtful letter a month — new stories, behind-the-scenes
              notes, and the occasional poem. No spam, ever.
            </p>
          </>
        )}
        <form onSubmit={handleSubmit} className="mt-5">
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email address"
              className="w-full rounded-full border border-charcoal/15 bg-white/70 px-5 py-3 text-sm text-ink outline-none transition focus:border-charcoal/50 focus:ring-2 focus:ring-coral/30"
            />
            <motion.button
              type="submit"
              whileTap={{ scale: 0.97 }}
              disabled={status === "loading"}
              className="creative-gradient shrink-0 rounded-full px-6 py-3 text-sm font-semibold text-charcoal transition-opacity disabled:opacity-70"
            >
              {status === "loading" ? "Sending…" : "Subscribe"}
            </motion.button>
          </div>
          <AnimatePresence mode="wait">
            {message && (
              <motion.p
                key={status + message}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={cn(
                  "mt-3 text-sm",
                  status === "success" ? "text-teal" : "text-coral"
                )}
              >
                {message}
              </motion.p>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
