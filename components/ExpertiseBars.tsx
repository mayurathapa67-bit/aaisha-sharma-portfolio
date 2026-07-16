"use client";

import { motion } from "framer-motion";

export default function ExpertiseBars({
  items,
}: {
  items: { name: string; level: number }[];
}) {
  return (
    <div className="space-y-6">
      {items.map((item, i) => (
        <div key={item.name}>
          <div className="mb-2 flex items-center justify-between">
            <span className="font-display text-lg text-charcoal">
              {item.name}
            </span>
            <span className="text-sm text-soft">{item.level}%</span>
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-charcoal/10">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${item.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.1, delay: i * 0.1, ease: "easeOut" }}
              className="h-full rounded-full creative-gradient"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
