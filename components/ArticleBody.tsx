import type { TocItem } from "@/components/TableOfContents";

export function buildToc(content: string): TocItem[] {
  const items: TocItem[] = [];
  content.split("\n").forEach((raw, i) => {
    const line = raw.trim();
    if (line.startsWith("## ")) {
      const title = line.replace(/^##\s+/, "");
      const id = `section-${i}`;
      items.push({ id, title });
    }
  });
  return items;
}

export function ArticleBody({
  content,
  toc,
}: {
  content: string;
  toc: TocItem[];
}) {
  const lines = content.split("\n");
  const blocks: { type: string; text: string; id?: string }[] = [];
  let buffer: string[] = [];

  function flush() {
    if (buffer.length) {
      blocks.push({ type: "p", text: buffer.join(" ") });
      buffer = [];
    }
  }

  lines.forEach((raw, i) => {
    const line = raw.trim();
    if (!line) {
      flush();
      return;
    }
    if (line.startsWith("## ")) {
      flush();
      blocks.push({
        type: "h2",
        text: line.replace(/^##\s+/, ""),
        id: toc.find((t) => t.title === line.replace(/^##\s+/, ""))?.id ?? `section-${i}`,
      });
      return;
    }
    if (line.startsWith("> ")) {
      flush();
      blocks.push({ type: "quote", text: line.replace(/^>\s+/, "") });
      return;
    }
    buffer.push(line);
  });
  flush();

  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.type === "h2") {
          return (
            <h2
              key={i}
              id={b.id}
              className="scroll-mt-28 pt-4 font-display text-3xl text-charcoal"
            >
              {b.text}
            </h2>
          );
        }
        if (b.type === "quote") {
          return (
            <blockquote
              key={i}
              className="my-8 border-l-4 border-coral bg-cream-deep px-6 py-4 font-accent text-2xl italic leading-snug text-charcoal"
            >
              {b.text}
            </blockquote>
          );
        }
        return (
          <p key={i} className="font-body text-lg leading-[1.9] text-ink/90">
            {b.text}
          </p>
        );
      })}
    </div>
  );
}
