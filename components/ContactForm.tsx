"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const FIELDS = [
  { name: "name", label: "Your Name", type: "text", placeholder: "Jane Reader" },
  { name: "email", label: "Email", type: "email", placeholder: "you@email.com" },
  {
    name: "subject",
    label: "Subject",
    type: "text",
    placeholder: "A project, a question, a hello",
  },
] as const;

export default function ContactForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  function update(field: string, value: string) {
    setValues((v) => ({ ...v, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!values.name || !values.email || !values.message) {
      setStatus("error");
      setError("Please fill in name, email and message.");
      return;
    }
    if (!values.email.includes("@")) {
      setStatus("error");
      setError("Please enter a valid email.");
      return;
    }
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setStatus("success");
        setValues({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setError("Network error. Please try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {FIELDS.map((f) => (
        <div key={f.name} className="relative">
          <label
            htmlFor={f.name}
            className="mb-2 block text-sm font-medium text-charcoal"
          >
            {f.label}
          </label>
          <input
            id={f.name}
            type={f.type}
            required={f.name !== "subject"}
            value={values[f.name]}
            onChange={(e) => update(f.name, e.target.value)}
            placeholder={f.placeholder}
            className={cn(
              "w-full rounded-2xl border border-charcoal/15 bg-white/70 px-5 py-3.5 text-sm text-ink outline-none transition",
              "focus:border-charcoal/50 focus:ring-2 focus:ring-coral/30"
            )}
          />
        </div>
      ))}

      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-charcoal"
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell me about your project or just say hello…"
          className="w-full resize-none rounded-2xl border border-charcoal/15 bg-white/70 px-5 py-3.5 text-sm text-ink outline-none transition focus:border-charcoal/50 focus:ring-2 focus:ring-coral/30"
        />
      </div>

      <motion.button
        type="submit"
        whileTap={{ scale: 0.98 }}
        disabled={status === "loading"}
        className="creative-gradient w-full rounded-full px-8 py-4 text-sm font-semibold text-charcoal transition-opacity disabled:opacity-70"
      >
        {status === "loading" ? "Sending…" : "Send Message →"}
      </motion.button>

      <AnimatePresence>
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-teal/15 px-5 py-3 text-sm text-teal"
          >
            Thank you! Your message is on its way. I&rsquo;ll reply within
            24–48 hours.
          </motion.p>
        )}
        {status === "error" && error && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-2xl bg-coral/15 px-5 py-3 text-sm text-coral"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
