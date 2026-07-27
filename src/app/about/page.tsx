import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { BrandMark, IconFormula, IconSun, ToolIcon } from "@/components/Icons";
import { OPERATOR } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "About",
  description:
    "WattPayback is a neutral suite of home energy and solar calculators with transparent formulas.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="page-enter">
        <div className="section-mark text-accent">
          <BrandMark size={20} />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
            About the project
          </span>
        </div>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          About WattPayback
        </h1>
      </div>

      <Reveal className="prose-blog mt-6 space-y-4">
        <p>
          WattPayback is a suite of home-energy calculators. The aim is simple:
          show the arithmetic behind solar and heating decisions, with every
          assumption editable and every formula printed out.
        </p>
        <p>
          Installer sites often hide defaults that make payback look shorter.
          Here, region yield, self-consumption, degradation, export rates and
          the rest are inputs — not locked marketing choices.
        </p>
        <p>
          This is physics and arithmetic, not professional advice. Use the tools
          to understand orders of magnitude, then get a site-specific survey
          before spending money.
        </p>
      </Reveal>

      <Reveal delay={100} className="mt-10">
        <p className="section-mark font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">
          <IconFormula size={14} />
          What you can run
        </p>
        <ul className="mt-4 grid gap-2 sm:grid-cols-2">
          {TOOLS.map((t, i) => (
            <li key={t.slug}>
              <Link
                href={t.href}
                className="tool-card flex items-center gap-3 border border-line bg-surface px-3 py-2.5 text-sm hover:border-accent hover:bg-accent-soft/50"
                style={{ animationDelay: `${i * 0.04}s` }}
              >
                <span className="bob text-accent" style={{ animationDelay: `${i * 0.2}s` }}>
                  <ToolIcon slug={t.slug} size={18} />
                </span>
                {t.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal delay={160} className="mt-10 border border-line bg-surface p-5">
        <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
          Operator
        </p>
        <p className="mt-2 text-lg font-semibold text-ink">{OPERATOR.name}</p>
        <p className="mt-2 text-sm text-ink-muted">
          Questions?{" "}
          <Link href="/contact" className="font-semibold text-accent-deep underline underline-offset-2">
            Contact form
          </Link>{" "}
          or read the{" "}
          <Link href="/disclaimer" className="underline underline-offset-2">
            disclaimer
          </Link>
          .
        </p>
        <Link
          href="/tools/solar-payback"
          className="btn-primary mt-5 inline-flex items-center gap-2 bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-deep"
        >
          <IconSun size={16} />
          Try solar payback
        </Link>
      </Reveal>
    </div>
  );
}
