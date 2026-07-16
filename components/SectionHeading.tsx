import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-coral">
          {eyebrow}
        </p>
      )}
      <h2 className="font-display text-4xl leading-tight text-charcoal sm:text-5xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 font-body text-lg leading-relaxed text-soft">
          {subtitle}
        </p>
      )}
    </div>
  );
}
