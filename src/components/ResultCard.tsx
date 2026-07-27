import type { ReactNode } from "react";

export function ResultCard({
  label,
  value,
  hint,
  emphasize = false,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  emphasize?: boolean;
}) {
  return (
    <div
      className={`border px-4 py-3 ${
        emphasize
          ? "border-accent bg-accent-soft"
          : "border-line bg-surface"
      }`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
        {label}
      </p>
      <p
        className={`mt-1 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight ${
          emphasize ? "text-accent-deep" : "text-ink"
        }`}
      >
        {value}
      </p>
      {hint && <p className="mt-1 text-xs text-ink-muted">{hint}</p>}
    </div>
  );
}

export function ResultGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{children}</div>
  );
}
