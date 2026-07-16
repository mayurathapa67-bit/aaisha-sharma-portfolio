import Link from "next/link";

export default function NotFound() {
  return (
    <div className="grid min-h-[80vh] place-items-center px-6 text-center">
      <div>
        <p className="creative-gradient bg-clip-text font-display text-8xl text-transparent">
          404
        </p>
        <h1 className="mt-4 font-display text-3xl text-charcoal">
          This page wandered off
        </h1>
        <p className="mx-auto mt-3 max-w-md font-body text-soft">
          The story you&rsquo;re looking for may have been moved, or never
          written. Let&rsquo;s get you back to the library.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3 text-sm font-medium text-cream transition hover:-translate-y-0.5"
        >
          Return home →
        </Link>
      </div>
    </div>
  );
}
