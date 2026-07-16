"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  title: string;
}

export default function TableOfContents({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [items]);

  function handleClick(e: React.MouseEvent, id: string) {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    }
  }

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-4 font-display text-lg text-charcoal">Contents</p>
      <ul className="space-y-3 border-l border-charcoal/10">
        {items.map((item) => (
          <li key={item.id} className="-ml-px border-l-2 border-transparent">
            <a
              href={`#${item.id}`}
              onClick={(e) => handleClick(e, item.id)}
              className={cn(
                "block pl-4 leading-snug transition-colors",
                active === item.id
                  ? "border-charcoal font-medium text-charcoal"
                  : "text-soft hover:text-charcoal"
              )}
              style={
                active === item.id
                  ? { borderColor: "var(--color-charcoal)" }
                  : undefined
              }
            >
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
