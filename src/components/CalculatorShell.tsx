import type { ReactNode } from "react";
import { RelatedTools } from "@/components/RelatedTools";
import { Faq, type FaqItem } from "@/components/Faq";

export function CalculatorShell({
  title,
  description,
  slug,
  children,
  faq,
}: {
  title: string;
  description: string;
  slug: string;
  children: ReactNode;
  faq: FaqItem[];
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-wider text-accent">
          Calculator
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-ink-muted">
          {description}
        </p>
      </div>

      <div className="mt-8">{children}</div>

      <Faq items={faq} />
      <RelatedTools slug={slug} />
    </div>
  );
}

export function DisclaimerLine() {
  return (
    <p className="border border-warn/30 bg-warn-soft px-3 py-2 text-xs leading-relaxed text-warn">
      Estimate only. Based on the assumptions you entered. Get a site-specific
      survey before spending money.
    </p>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-ink-muted">
      {children}
    </h2>
  );
}
