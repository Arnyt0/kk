import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "WattPayback is a neutral suite of home energy and solar calculators with transparent formulas.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        About WattPayback
      </h1>
      <div className="prose-blog mt-6 space-y-4">
        <p>
          WattPayback is a static suite of home-energy calculators. The aim is
          simple: show the arithmetic that solar and heating decisions rest on,
          with every assumption editable and every formula printed out.
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
        <p>
          {/* TODO: add personal / operator details */}
          Operator details: TODO — name, location and contact email to be filled
          in by the site owner. Do not treat placeholder text as a company
          identity.
        </p>
        <p>
          Questions? See the <Link href="/contact">contact</Link> page or read
          the <Link href="/disclaimer">disclaimer</Link>.
        </p>
      </div>
    </div>
  );
}
