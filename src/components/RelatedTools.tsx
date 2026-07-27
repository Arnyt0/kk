import Link from "next/link";
import { relatedTools } from "@/lib/tools";

export function RelatedTools({ slug }: { slug: string }) {
  const tools = relatedTools(slug, 3);
  return (
    <section className="mt-10">
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink">
        Related tools
      </h2>
      <ul className="mt-4 grid gap-3 sm:grid-cols-3">
        {tools.map((t) => (
          <li key={t.slug}>
            <Link
              href={t.href}
              className="block border border-line bg-surface px-4 py-3 transition-colors hover:border-accent hover:bg-accent-soft"
            >
              <p className="text-sm font-semibold text-ink">{t.shortTitle}</p>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                {t.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
