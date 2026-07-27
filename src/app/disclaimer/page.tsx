import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Disclaimer",
  description: "Disclaimer for WattPayback energy calculators.",
};

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink">
        Disclaimer
      </h1>
      <div className="prose-blog mt-6 space-y-4">
        <p>
          Every tool on WattPayback shows this short reminder above its results:
        </p>
        <p className="border border-warn/30 bg-warn-soft px-3 py-2 text-sm text-warn">
          Estimate only. Based on the assumptions you entered. Get a
          site-specific survey before spending money.
        </p>
        <p>
          Defaults (specific yield, self-consumption, SCOP, grid intensity and
          so on) are mid-range starting points from commonly cited ranges. They
          are <strong>not</strong> facts about your roof, climate, tariff or
          installation quality.
        </p>
        <p>
          Solar generation, heat-pump performance, battery throughput and
          insulation savings depend on site-specific factors that a web form
          cannot capture. Use these calculators to understand sensitivity —
          which inputs move the answer — then verify with professionals.
        </p>
        <p>
          See also <Link href="/terms">terms</Link> and{" "}
          <Link href="/privacy">privacy</Link>.
        </p>
      </div>
    </div>
  );
}
