"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type FloatItem = {
  emoji: string;
  className?: string;
  duration?: number;
};

const DEFAULT_ITEMS: FloatItem[] = [
  { emoji: "📖", className: "left-[6%] top-[18%]", duration: 7 },
  { emoji: "✒️", className: "right-[10%] top-[24%]", duration: 9 },
  { emoji: "☕", className: "left-[12%] bottom-[16%]", duration: 8 },
  { emoji: "🍃", className: "right-[8%] bottom-[20%]", duration: 10 },
  { emoji: "🌿", className: "left-[46%] top-[8%]", duration: 11 },
];

export default function FloatingElements({
  items = DEFAULT_ITEMS,
  className,
}: {
  items?: FloatItem[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden",
        className
      )}
    >
      {items.map((item, i) => (
        <motion.span
          key={i}
          className={cn(
            "absolute select-none text-3xl opacity-70 blur-[0.2px] drop-shadow-sm md:text-4xl",
            item.className
          )}
          animate={{
            y: [0, -22, 0],
            rotate: [0, 6, 0],
            x: [0, 8, 0],
          }}
          transition={{
            duration: item.duration ?? 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {item.emoji}
        </motion.span>
      ))}
    </div>
  );
}
