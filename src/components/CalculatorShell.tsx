import type { ReactNode } from "react";
import { RelatedTools } from "@/components/RelatedTools";
import { Faq, type FaqItem } from "@/components/Faq";
import { AdSlot } from "@/components/AdSlot";
import { ToolIcon } from "@/components/Icons";

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
        <div className="section-mark text-accent">
          <span className="inline-flex h-8 w-8 items-center justify-center border border-accent/30 bg-accent-soft">
            <ToolIcon slug={slug} size={18} />
          </span>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
            Calculator
          </span>
        </div>
        <h1 className="hero-rise mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          {title}
        </h1>
        <p className="hero-rise-delay mt-3 text-base leading-relaxed text-ink-muted">
          {description}
        </p>
      </div>

      <AdSlot placement="tools-top" className="mt-8" />

      <div className="mt-8">{children}</div>

      <Faq items={faq} />
      <AdSlot placement="tools-bottom" className="mt-10" />
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
    <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
      {children}
    </h2>
  );
}
