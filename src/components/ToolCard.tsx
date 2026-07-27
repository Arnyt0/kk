import Link from "next/link";
import type { ToolMeta } from "@/lib/tools";

export function ToolCard({ tool, index }: { tool: ToolMeta; index: number }) {
  return (
    <Link
      href={tool.href}
      className="group block border border-line bg-surface px-5 py-5 transition-all hover:border-accent hover:bg-accent-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs text-ink-muted">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="text-accent opacity-0 transition-opacity group-hover:opacity-100">
          →
        </span>
      </div>
      <h3 className="mt-3 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink">
        {tool.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {tool.description}
      </p>
    </Link>
  );
}
