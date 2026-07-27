import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms",
  description: "Terms of use for WattPayback.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink">
        Terms of use
      </h1>
      <div className="prose-blog mt-6 space-y-4 text-sm">
        <p>Last updated: TODO — date</p>
        <p>
          By using WattPayback you agree that the calculators and articles are
          provided for general information only. They are estimates based on
          assumptions you enter or leave at defaults.
        </p>
        <p>
          WattPayback is not a licensed energy adviser, installer, engineer or
          financial adviser. Results are not a quote, offer or guarantee of
          savings, payback or system performance.
        </p>
        <p>
          To the fullest extent permitted by law, the operator is not liable for
          decisions you make using these tools. Always obtain a site-specific
          survey and independent advice before spending money.
        </p>
        <p>
          {/* TODO: governing law */}
          Governing law: TODO — jurisdiction.
        </p>
      </div>
    </div>
  );
}
