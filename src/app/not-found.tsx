import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-start px-4 py-24 sm:px-6">
      <p className="font-mono text-xs uppercase tracking-wider text-ink-muted">
        404
      </p>
      <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink">
        Page not found
      </h1>
      <p className="mt-3 text-ink-muted">
        That URL is not part of WattPayback. Try the calculators or the blog.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-deep"
        >
          Home
        </Link>
        <Link
          href="/tools"
          className="border border-line bg-surface px-4 py-2.5 text-sm font-semibold text-ink hover:border-accent"
        >
          All tools
        </Link>
      </div>
    </div>
  );
}
