import Link from "next/link";
import type { ToolMeta } from "@/lib/tools";
import { IconArrow, ToolIcon } from "@/components/Icons";

export function ToolCard({ tool, index }: { tool: ToolMeta; index: number }) {
  return (
    <Link
      href={tool.href}
      className="tool-card stagger-card group block border border-line bg-surface px-5 py-5 hover:border-accent hover:bg-accent-soft/50"
      style={{ animationDelay: `${Math.min(index, 8) * 0.05}s` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="icon-pop inline-flex h-10 w-10 items-center justify-center border border-line bg-bg-elevated text-accent group-hover:border-accent group-hover:bg-accent group-hover:text-white"
          style={{ animationDelay: `${0.08 + index * 0.04}s` }}
        >
          <ToolIcon slug={tool.slug} size={20} />
        </span>
        <span className="arrow-slide font-mono text-xs text-ink-muted opacity-50 group-hover:text-accent">
          <IconArrow size={16} />
        </span>
      </div>
      <p className="mt-3 font-mono text-[11px] text-ink-muted">
        {String(index + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-1 font-[family-name:var(--font-display)] text-lg font-bold tracking-tight text-ink">
        {tool.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">
        {tool.description}
      </p>
    </Link>
  );
}
