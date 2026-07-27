"use client";

import { useMemo, useState } from "react";
import {
  CalculatorShell,
  DisclaimerLine,
  SectionLabel,
} from "@/components/CalculatorShell";
import { FormulaBlock } from "@/components/FormulaBlock";
import { NumberInput } from "@/components/NumberInput";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import { useRegion } from "@/context/RegionContext";
import { formatMoney, formatNumber } from "@/lib/format";

type Measure = {
  id: string;
  name: string;
  reduction: number;
  cost: number;
  enabled: boolean;
};

const FAQ = [
  {
    question: "Why multiplicative reductions?",
    answer:
      "You cannot save the same heat twice. If loft insulation cuts remaining heat loss by 15% and draught-proofing by 10%, remaining demand is 0.85 × 0.90 of the start — not 25% off additively.",
  },
];

export function InsulationPaybackCalculator() {
  const { currency } = useRegion();
  const [heatingCost, setHeatingCost] = useState(1500);
  const [measures, setMeasures] = useState<Measure[]>([
    { id: "loft", name: "Loft insulation", reduction: 15, cost: 800, enabled: true },
    { id: "cavity", name: "Cavity wall insulation", reduction: 12, cost: 1200, enabled: true },
    { id: "draught", name: "Draught-proofing", reduction: 8, cost: 250, enabled: true },
    { id: "glazing", name: "Improved glazing", reduction: 10, cost: 4000, enabled: false },
  ]);

  const result = useMemo(() => {
    let remainingCost = heatingCost;
    const rows: {
      id: string;
      name: string;
      saving: number;
      payback: number;
      cost: number;
      reduction: number;
    }[] = [];

    for (const m of measures) {
      if (!m.enabled) continue;
      const after = remainingCost * (1 - m.reduction / 100);
      const saving = remainingCost - after;
      rows.push({
        id: m.id,
        name: m.name,
        saving,
        payback: saving > 0 ? m.cost / saving : Infinity,
        cost: m.cost,
        reduction: m.reduction,
      });
      remainingCost = after;
    }

    const totalSaving = heatingCost - remainingCost;
    const totalCost = rows.reduce((s, r) => s + r.cost, 0);
    const packagePayback = totalSaving > 0 ? totalCost / totalSaving : Infinity;

    return { rows, totalSaving, totalCost, packagePayback, remainingCost };
  }, [heatingCost, measures]);

  function update(id: string, patch: Partial<Measure>) {
    setMeasures((prev) =>
      prev.map((m) => (m.id === id ? { ...m, ...patch } : m)),
    );
  }

  return (
    <CalculatorShell
      title="Insulation / draught-proofing payback"
      description="Stack loft, cavity, draught-proofing and glazing measures with multiplicative heat-loss reductions."
      slug="insulation-payback"
      faq={FAQ}
    >
      <div className="space-y-6">
        <section className="border border-line bg-surface p-4 sm:p-5">
          <SectionLabel>Your situation</SectionLabel>
          <div className="max-w-sm">
            <NumberInput
              label="Annual heating cost"
              value={heatingCost}
              onChange={setHeatingCost}
              unit={`${currency}/yr`}
              step={50}
              min={0}
              tooltip="What you currently spend on space heating per year (gas, oil, heat pump electricity, etc.)."
            />
          </div>
        </section>

        <div className="space-y-3">
          <SectionLabel>Measures (applied in order, multiplicatively)</SectionLabel>
          {measures.map((m) => (
            <div
              key={m.id}
              className="grid gap-3 border border-line bg-surface p-3 sm:grid-cols-[auto_1fr_1fr_1fr]"
            >
              <label className="flex items-center gap-2 text-sm font-medium text-ink">
                <input
                  type="checkbox"
                  checked={m.enabled}
                  onChange={(e) => update(m.id, { enabled: e.target.checked })}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                {m.name}
              </label>
              <NumberInput
                label="Heat demand reduction"
                value={m.reduction}
                onChange={(v) => update(m.id, { reduction: v })}
                unit="%"
                step={1}
                min={0}
                max={90}
                tooltip="Expected reduction of remaining heat demand after previous measures. Defaults are illustrative starting points — get a survey for your fabric."
              />
              <NumberInput
                label="Install cost"
                value={m.cost}
                onChange={(v) => update(m.id, { cost: v })}
                unit={currency}
                step={50}
                min={0}
              />
              <div>
                <p className="mb-1.5 text-sm font-medium text-ink">Incl.?</p>
                <p className="border border-line bg-bg-elevated px-3 py-2.5 text-sm text-ink-muted">
                  {m.enabled ? "Yes — in package" : "Skipped"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <DisclaimerLine />
        <ResultGrid>
          <ResultCard
            label="Combined annual saving"
            value={formatMoney(result.totalSaving, currency)}
            emphasize
          />
          <ResultCard
            label="Package cost"
            value={formatMoney(result.totalCost, currency)}
          />
          <ResultCard
            label="Package payback"
            value={
              Number.isFinite(result.packagePayback)
                ? `${formatNumber(result.packagePayback, 1)} years`
                : "—"
            }
          />
          <ResultCard
            label="Heating cost after measures"
            value={formatMoney(result.remainingCost, currency)}
          />
        </ResultGrid>

        {result.rows.length > 0 && (
          <div className="border border-line bg-surface">
            <p className="border-b border-line px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Per-measure (in order)
            </p>
            <ul className="divide-y divide-line">
              {result.rows.map((r) => (
                <li
                  key={r.id}
                  className="flex flex-wrap items-center justify-between gap-2 px-4 py-2.5 text-sm"
                >
                  <span className="font-medium text-ink">
                    {r.name} (−{r.reduction}%)
                  </span>
                  <span className="font-mono text-xs text-ink-muted">
                    save {formatMoney(r.saving, currency)}/yr · payback{" "}
                    {Number.isFinite(r.payback)
                      ? `${formatNumber(r.payback, 1)} yr`
                      : "—"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <FormulaBlock
          lines={[
            `remaining starts at ${formatMoney(heatingCost, currency)}`,
            ...result.rows.map(
              (r) =>
                `after ${r.name}: remaining × (1 − ${r.reduction}/100); saving ${formatMoney(r.saving, currency)}; payback ${r.cost} / saving`,
            ),
            `package_payback = ${formatMoney(result.totalCost, currency)} / ${formatMoney(result.totalSaving, currency)}`,
          ]}
        />
      </div>
    </CalculatorShell>
  );
}
