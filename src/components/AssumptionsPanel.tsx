"use client";

import { useState, type ReactNode } from "react";

export function AssumptionsPanel({
  children,
  title = "Assumptions (edit if you know better)",
  defaultOpen = true,
}: {
  children: ReactNode;
  title?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <section className="border border-line bg-bg-elevated">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-ink">{title}</span>
        <span className="font-mono text-xs text-ink-muted">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="border-t border-line px-4 py-4">
          <p className="mb-4 text-xs leading-relaxed text-ink-muted">
            Defaults are starting points from typical published ranges — never
            facts. Change any value that does not match your situation.
          </p>
          {children}
        </div>
      )}
    </section>
  );
}
