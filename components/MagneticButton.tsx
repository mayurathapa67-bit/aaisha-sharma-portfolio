"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type MotionStyle } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  ariaLabel?: string;
}

const VARIANTS: Record<string, string> = {
  primary:
    "creative-gradient text-charcoal shadow-[0_10px_30px_-10px_rgba(255,107,107,0.6)]",
  secondary:
    "bg-charcoal text-cream hover:bg-ink shadow-[0_10px_30px_-12px_rgba(26,26,26,0.5)]",
  ghost:
    "border border-charcoal/20 bg-transparent text-charcoal hover:border-charcoal/50",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 250, damping: 18 });
  const y = useSpring(my, { stiffness: 250, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - (rect.left + rect.width / 2);
    const relY = e.clientY - (rect.top + rect.height / 2);
    mx.set(relX * 0.35);
    my.set(relY * 0.45);
  }

  function reset() {
    mx.set(0);
    my.set(0);
  }

  const shared = {
    ref: ref as never,
    onMouseMove: handleMove,
    onMouseLeave: reset,
    className: cn(
      "relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-medium tracking-wide transition-colors will-change-transform",
      VARIANTS[variant],
      className
    ),
    style: { x, y } as MotionStyle,
    "aria-label": ariaLabel,
  };

  if (href) {
    return (
      <motion.a href={href} {...shared}>
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button type="button" onClick={onClick} {...shared}>
      {children}
    </motion.button>
  );
}
