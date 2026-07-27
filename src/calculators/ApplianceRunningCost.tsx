"use client";

import { useMemo, useState } from "react";
import {
  CalculatorShell,
  DisclaimerLine,
  SectionLabel,
} from "@/components/CalculatorShell";
import { FormulaBlock } from "@/components/FormulaBlock";
import { NumberInput, SelectInput, TextInput } from "@/components/NumberInput";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import { useRegion } from "@/context/RegionContext";
import { formatMoney, formatNumber } from "@/lib/format";

type Row = {
  id: string;
  name: string;
  watts: number;
  hoursPerDay: number;
  daysPerYear: number;
};

const PRESETS: Omit<Row, "id">[] = [
  { name: "Fridge-freezer", watts: 100, hoursPerDay: 24, daysPerYear: 365 },
  { name: "Tumble dryer", watts: 2500, hoursPerDay: 1, daysPerYear: 150 },
  { name: "Electric shower", watts: 8500, hoursPerDay: 0.25, daysPerYear: 365 },
  { name: "Gaming PC", watts: 400, hoursPerDay: 4, daysPerYear: 300 },
  { name: "Air conditioner", watts: 1200, hoursPerDay: 4, daysPerYear: 90 },
  { name: "Kettle", watts: 3000, hoursPerDay: 0.2, daysPerYear: 365 },
  { name: "Dishwasher", watts: 1800, hoursPerDay: 1.5, daysPerYear: 200 },
  { name: "Washing machine", watts: 2000, hoursPerDay: 1, daysPerYear: 200 },
  { name: "LED TV", watts: 80, hoursPerDay: 4, daysPerYear: 365 },
  { name: "Broadband router", watts: 12, hoursPerDay: 24, daysPerYear: 365 },
];

const FAQ = [
  {
    question: "Are nameplate watts the same as average draw?",
    answer:
      "Not always. Fridges cycle, washers heat intermittently, and PCs vary with load. For cycling appliances, an average wattage or measured kWh from a plug meter is better than the sticker maximum.",
  },
];

function annualCost(row: Row, price: number) {
  return (row.watts / 1000) * row.hoursPerDay * row.daysPerYear * price;
}

export function ApplianceRunningCostCalculator() {
  const { currency } = useRegion();
  const [price, setPrice] = useState(0.28);
  const [preset, setPreset] = useState(PRESETS[0].name);
  const [rows, setRows] = useState<Row[]>([
    { id: "1", ...PRESETS[0] },
    { id: "2", ...PRESETS[5] },
  ]);

  const ranked = useMemo(() => {
    return rows
      .map((r) => ({ ...r, cost: annualCost(r, price) }))
      .sort((a, b) => b.cost - a.cost);
  }, [rows, price]);

  const total = ranked.reduce((s, r) => s + r.cost, 0);

  function addPreset() {
    const p = PRESETS.find((x) => x.name === preset) ?? PRESETS[0];
    setRows((prev) => [
      ...prev,
      { id: `${Date.now()}`, ...p },
    ]);
  }

  function update(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function remove(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <CalculatorShell
      title="Appliance running cost calculator"
      description="Add appliances (or pick presets) and see annual electricity cost, sorted from most to least expensive."
      slug="appliance-running-cost"
      faq={FAQ}
    >
      <div className="space-y-6">
        <section className="border border-line bg-surface p-4 sm:p-5">
          <SectionLabel>Your situation</SectionLabel>
          <div className="grid gap-4 sm:grid-cols-3">
            <NumberInput
              label="Electricity price"
              value={price}
              onChange={setPrice}
              unit={`${currency}/kWh`}
              step={0.01}
              min={0}
              tooltip="Variable unit rate from your bill."
            />
            <SelectInput
              label="Add preset"
              value={preset}
              onChange={setPreset}
              options={PRESETS.map((p) => ({ value: p.name, label: p.name }))}
            />
            <div className="flex items-end">
              <button
                type="button"
                onClick={addPreset}
                className="w-full border border-accent bg-accent px-4 py-2.5 text-sm font-semibold text-white hover:bg-accent-deep"
              >
                Add appliance
              </button>
            </div>
          </div>
        </section>

        <div className="space-y-3">
          {rows.map((row) => (
            <div
              key={row.id}
              className="grid gap-3 border border-line bg-surface p-3 sm:grid-cols-6"
            >
              <TextInput
                label="Name"
                value={row.name}
                onChange={(v) => update(row.id, { name: v })}
              />
              <NumberInput
                label="Power"
                value={row.watts}
                onChange={(v) => update(row.id, { watts: v })}
                unit="W"
                step={10}
                min={0}
              />
              <NumberInput
                label="Hours / day"
                value={row.hoursPerDay}
                onChange={(v) => update(row.id, { hoursPerDay: v })}
                unit="h"
                step={0.1}
                min={0}
              />
              <NumberInput
                label="Days / year"
                value={row.daysPerYear}
                onChange={(v) => update(row.id, { daysPerYear: v })}
                unit="d"
                step={1}
                min={0}
                max={365}
              />
              <div>
                <p className="mb-1.5 text-sm font-medium text-ink">Annual</p>
                <p className="border border-line bg-bg-elevated px-3 py-2.5 text-sm font-semibold">
                  {formatMoney(annualCost(row, price), currency)}
                </p>
              </div>
              <div className="flex items-end">
                <button
                  type="button"
                  onClick={() => remove(row.id)}
                  className="w-full border border-line px-3 py-2.5 text-sm text-ink-muted hover:border-warn hover:text-warn"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <DisclaimerLine />
        <ResultGrid>
          <ResultCard
            label="Total annual cost"
            value={formatMoney(total, currency)}
            emphasize
          />
          <ResultCard label="Appliances" value={`${rows.length}`} />
        </ResultGrid>

        {ranked.length > 0 && (
          <div className="border border-line bg-surface">
            <p className="border-b border-line px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Sorted breakdown
            </p>
            <ul className="divide-y divide-line">
              {ranked.map((r) => (
                <li
                  key={r.id}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
                >
                  <span className="text-ink">{r.name}</span>
                  <span className="font-mono text-ink-muted">
                    {formatMoney(r.cost, currency)} ·{" "}
                    {formatNumber(
                      (r.watts / 1000) * r.hoursPerDay * r.daysPerYear,
                      1,
                    )}{" "}
                    kWh
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <FormulaBlock
          lines={
            ranked.length
              ? ranked.slice(0, 3).map(
                  (r) =>
                    `${r.name}: (${r.watts}/1000) × ${r.hoursPerDay} × ${r.daysPerYear} × ${price} = ${formatMoney(r.cost, currency)}`,
                )
              : ["Add an appliance to see substituted formulas."]
          }
        />
      </div>
    </CalculatorShell>
  );
}
