"use client";

import { useMemo, useState } from "react";
import {
  CalculatorShell,
  DisclaimerLine,
  SectionLabel,
} from "@/components/CalculatorShell";
import { AssumptionsPanel } from "@/components/AssumptionsPanel";
import { FormulaBlock } from "@/components/FormulaBlock";
import { FieldGrid, NumberInput } from "@/components/NumberInput";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import { useRegion } from "@/context/RegionContext";
import { formatMoney, formatNumber } from "@/lib/format";

const FAQ = [
  {
    question: "When does a home battery pay back?",
    answer:
      "Usually when you currently export a lot of cheap solar and import expensive grid power later. The value is roughly the retail–export price spread times the extra kWh you can shift.",
  },
  {
    question: "Why include round-trip efficiency?",
    answer:
      "Not every kWh stored comes back out. Round-trip efficiency (often ~85–95%) reduces usable throughput and therefore savings.",
  },
];

export function BatteryRoiCalculator() {
  const { currency } = useRegion();
  const [usable, setUsable] = useState(9.6);
  const [efficiency, setEfficiency] = useState(90);
  const [cost, setCost] = useState(6000);
  const [cyclesPerYear, setCyclesPerYear] = useState(250);
  const [cycleLife, setCycleLife] = useState(6000);
  const [gridPrice, setGridPrice] = useState(0.28);
  const [exportPrice, setExportPrice] = useState(0.08);
  const [exportedKwh, setExportedKwh] = useState(2500);

  const result = useMemo(() => {
    const throughput = usable * (efficiency / 100) * cyclesPerYear;
    const extraSelfConsumed = Math.min(throughput, exportedKwh);
    const spread = gridPrice - exportPrice;
    const annualSaving = extraSelfConsumed * spread;
    const payback = annualSaving > 0 ? cost / annualSaving : Infinity;
    const lifetimeYears = cyclesPerYear > 0 ? cycleLife / cyclesPerYear : Infinity;
    const diesBeforePayback = payback > lifetimeYears;
    return {
      throughput,
      extraSelfConsumed,
      annualSaving,
      payback,
      lifetimeYears,
      diesBeforePayback,
      spread,
    };
  }, [
    usable,
    efficiency,
    cost,
    cyclesPerYear,
    cycleLife,
    gridPrice,
    exportPrice,
    exportedKwh,
  ]);

  return (
    <CalculatorShell
      title="Home battery ROI calculator"
      description="Estimate extra self-consumption from a battery and whether it pays back before reaching end of cycle life."
      slug="battery-roi"
      faq={FAQ}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <section className="border border-line bg-surface p-4 sm:p-5">
            <SectionLabel>Your situation</SectionLabel>
            <FieldGrid>
              <NumberInput
                label="Usable capacity"
                value={usable}
                onChange={setUsable}
                unit="kWh"
                step={0.1}
                min={0}
                tooltip="Usable (not nominal) storage. Manufacturer usable capacity after depth-of-discharge limits."
              />
              <NumberInput
                label="Battery installed cost"
                value={cost}
                onChange={setCost}
                unit={currency}
                step={100}
                min={0}
              />
              <NumberInput
                label="Currently exported"
                value={exportedKwh}
                onChange={setExportedKwh}
                unit="kWh/yr"
                step={50}
                min={0}
                tooltip="Annual kWh you export today. Extra self-consumption cannot exceed what you currently spill to the grid (simplified model)."
              />
              <NumberInput
                label="Grid price"
                value={gridPrice}
                onChange={setGridPrice}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
              <NumberInput
                label="Export price"
                value={exportPrice}
                onChange={setExportPrice}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
            </FieldGrid>
          </section>
          <AssumptionsPanel>
            <FieldGrid>
              <NumberInput
                label="Round-trip efficiency"
                value={efficiency}
                onChange={setEfficiency}
                unit="%"
                step={1}
                min={1}
                max={100}
                tooltip="Typical lithium home batteries are often quoted around 85–95% round-trip. Default 90% is a mid starting point."
              />
              <NumberInput
                label="Expected cycles per year"
                value={cyclesPerYear}
                onChange={setCyclesPerYear}
                unit="cycles/yr"
                step={10}
                min={0}
                tooltip="How often the battery is fully cycled. Daily solar shifting is often ~200–300 equivalent full cycles/yr."
              />
              <NumberInput
                label="Cycle life"
                value={cycleLife}
                onChange={setCycleLife}
                unit="cycles"
                step={100}
                min={0}
                tooltip="Warranty or datasheet cycle count to a stated remaining capacity. Simplified: life ends at this count."
              />
            </FieldGrid>
          </AssumptionsPanel>
        </div>
        <div className="space-y-4">
          <DisclaimerLine />
          <ResultGrid>
            <ResultCard
              label="Extra self-consumed"
              value={`${formatNumber(result.extraSelfConsumed, 0)} kWh/yr`}
              emphasize
            />
            <ResultCard
              label="Annual saving"
              value={formatMoney(result.annualSaving, currency)}
              hint={`spread ${formatNumber(result.spread, 3)} ${currency}/kWh`}
            />
            <ResultCard
              label="Simple payback"
              value={
                Number.isFinite(result.payback)
                  ? `${formatNumber(result.payback, 1)} years`
                  : "—"
              }
            />
            <ResultCard
              label="Cycle life span"
              value={
                Number.isFinite(result.lifetimeYears)
                  ? `${formatNumber(result.lifetimeYears, 1)} years`
                  : "—"
              }
            />
          </ResultGrid>
          {result.diesBeforePayback && Number.isFinite(result.payback) && (
            <p className="border border-warn/30 bg-warn-soft px-3 py-2 text-xs text-warn">
              Warning: estimated payback ({formatNumber(result.payback, 1)} yr)
              exceeds cycle life ({formatNumber(result.lifetimeYears, 1)} yr).
              On these assumptions the battery dies before it pays for itself.
            </p>
          )}
          <FormulaBlock
            lines={[
              `throughput = ${usable} × ${efficiency}/100 × ${cyclesPerYear} = ${formatNumber(result.throughput, 1)} kWh/yr`,
              `extra_self_consumed = min(throughput, ${exportedKwh}) = ${formatNumber(result.extraSelfConsumed, 1)}`,
              `annual_saving = ${formatNumber(result.extraSelfConsumed, 1)} × (${gridPrice} − ${exportPrice}) = ${formatMoney(result.annualSaving, currency)}`,
              `payback = ${cost} / annual_saving = ${Number.isFinite(result.payback) ? formatNumber(result.payback, 2) + " yr" : "∞"}`,
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
}
