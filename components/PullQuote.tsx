import { cn } from "@/lib/utils";

interface PullQuoteProps {
  text: string;
  author?: string;
  className?: string;
  align?: "center" | "left";
}

export default function PullQuote({
  text,
  author,
  className,
  align = "center",
}: PullQuoteProps) {
  return (
    <figure
      className={cn(
        "relative my-12 px-6",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      <span
        aria-hidden
        className="creative-gradient bg-clip-text font-display text-7xl leading-none text-transparent opacity-80"
      >
        &ldquo;
      </span>
      <blockquote
        className={cn(
          "font-accent text-2xl italic leading-snug text-charcoal sm:text-3xl",
          align === "center" ? "mx-auto max-w-3xl" : "max-w-2xl"
        )}
      >
        {text}
      </blockquote>
      {author && (
        <figcaption className="mt-4 font-body text-sm uppercase tracking-[0.2em] text-soft">
          — {author}
        </figcaption>
      )}
    </figure>
  );
}
