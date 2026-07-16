"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&@$?/<>*";

interface TextScrambleProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  speed?: number;
  delay?: number;
  revealOnView?: boolean;
}

export default function TextScramble({
  text,
  className,
  as = "span",
  speed = 28,
  delay = 0,
  revealOnView = true,
}: TextScrambleProps) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      let frame = 0;
      const total = text.length;
      const timer = setTimeout(function step() {
        frame++;
        let out = "";
        for (let i = 0; i < total; i++) {
          const ch = text[i];
          if (ch === " ") {
            out += " ";
            continue;
          }
          if (i < frame / 2) {
            out += ch;
          } else {
            out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          }
        }
        setDisplay(out);
        if (frame / 2 < total) {
          setTimeout(step, speed);
        } else {
          setDisplay(text);
        }
      }, delay);
      return () => clearTimeout(timer);
    };

    if (!revealOnView) {
      run();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [text, speed, delay, revealOnView]);

  const Tag = as as keyof React.JSX.IntrinsicElements;
  return (
    // @ts-expect-error dynamic tag with ref
    <Tag ref={ref} className={cn("inline-block", className)}>
      {display}
    </Tag>
  );
}
