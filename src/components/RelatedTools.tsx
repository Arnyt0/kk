import Link from "next/link";
import { relatedTools } from "@/lib/tools";
import { ToolIcon } from "@/components/Icons";

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
              className="tool-card group flex gap-3 border border-line bg-surface px-4 py-3 hover:border-accent hover:bg-accent-soft/50"
            >
              <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center border border-line bg-bg-elevated text-accent group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                <ToolIcon slug={t.slug} size={18} />
              </span>
              <span>
                <p className="text-sm font-semibold text-ink">{t.shortTitle}</p>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  {t.description}
                </p>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
