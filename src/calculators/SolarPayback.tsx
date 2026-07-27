"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CalculatorShell,
  DisclaimerLine,
  SectionLabel,
} from "@/components/CalculatorShell";
import { AssumptionsPanel } from "@/components/AssumptionsPanel";
import { FormulaBlock } from "@/components/FormulaBlock";
import { FieldGrid, NumberInput, SelectInput } from "@/components/NumberInput";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import { SavingsChart } from "@/components/SavingsChart";
import { useRegion } from "@/context/RegionContext";
import { REGIONS, type RegionId } from "@/lib/tools";
import { formatMoney, formatNumber } from "@/lib/format";

const FAQ = [
  {
    question: "Why do installer quotes often show a faster payback?",
    answer:
      "Many quotes assume high self-consumption, optimistic specific yield, rising electricity prices, and ignore inverter replacement. This calculator makes every assumption visible so you can match your own bill and roof.",
  },
  {
    question: "What is specific yield?",
    answer:
      "Specific yield is annual AC generation per kilowatt-peak of panels (kWh/kWp/yr). It depends on location, orientation, tilt, shading and system losses. Region defaults here are mid-range starting points only.",
  },
  {
    question: "Does self-consumption matter more than generation?",
    answer:
      "Often yes. Electricity you use yourself displaces the full retail rate; exported energy usually earns much less. Raising self-consumption (or adding a battery) can improve payback more than a slightly larger array.",
  },
];

export function SolarPaybackCalculator() {
  const { region, currency, specificYield, setRegionId, setSpecificYield } =
    useRegion();

  const [kWp, setKWp] = useState(6);
  const [cost, setCost] = useState(9000);
  const [yieldKwh, setYieldKwh] = useState(specificYield);
  const [selfConsumption, setSelfConsumption] = useState(30);
  const [gridPrice, setGridPrice] = useState(0.28);
  const [exportPrice, setExportPrice] = useState(0.08);
  const [inflation, setInflation] = useState(2);
  const [degradation, setDegradation] = useState(0.5);
  const [inverterCost, setInverterCost] = useState(1200);
  const [inverterYear, setInverterYear] = useState(12);

  useEffect(() => {
    setYieldKwh(specificYield);
  }, [specificYield]);

  const result = useMemo(() => {
    const years = 25;
    const points: { year: number; value: number }[] = [];
    let cumulative = -cost;
    let paybackYear: number | null = null;
    let totalSaving = 0;
    const year0Gen = kWp * yieldKwh;

    points.push({ year: 0, value: cumulative });

    for (let y = 1; y <= years; y++) {
      const generation = year0Gen * Math.pow(1 - degradation / 100, y - 1);
      const selfUsed = generation * (selfConsumption / 100);
      const exported = generation - selfUsed;
      const price = gridPrice * Math.pow(1 + inflation / 100, y - 1);
      const saving = selfUsed * price + exported * exportPrice;
      totalSaving += saving;
      cumulative += saving;
      if (y === inverterYear) cumulative -= inverterCost;
      points.push({ year: y, value: cumulative });
      if (paybackYear === null && cumulative >= 0) paybackYear = y;
    }

    return {
      points,
      paybackYear,
      netGain: cumulative,
      avgAnnual: totalSaving / years,
      year1Gen: year0Gen,
      year1Saving:
        year0Gen * (selfConsumption / 100) * gridPrice +
        year0Gen * (1 - selfConsumption / 100) * exportPrice,
    };
  }, [
    kWp,
    cost,
    yieldKwh,
    selfConsumption,
    gridPrice,
    exportPrice,
    inflation,
    degradation,
    inverterCost,
    inverterYear,
  ]);

  return (
    <CalculatorShell
      title="Solar payback calculator"
      description="Project 25 years of generation, self-consumption and export value. Every assumption is editable — including degradation and inverter replacement."
      slug="solar-payback"
      faq={FAQ}
    >
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-5">
          <section className="border border-line bg-surface p-4 sm:p-5">
            <SectionLabel>Your situation</SectionLabel>
            <FieldGrid>
              <NumberInput
                label="System size"
                value={kWp}
                onChange={setKWp}
                unit="kWp"
                step={0.1}
                min={0}
                tooltip="DC peak capacity of the array. A typical home system is 3–10 kWp."
              />
              <NumberInput
                label="Total installed cost (net)"
                value={cost}
                onChange={setCost}
                unit={currency}
                step={100}
                min={0}
                tooltip="What you pay after grants/tax credits. Use the net cash outlay, not the sticker price before incentives."
              />
              <SelectInput
                label="Region (sets yield default)"
                value={region.id}
                onChange={(v) => {
                  setRegionId(v as RegionId);
                  const r = REGIONS.find((x) => x.id === v);
                  if (r) setYieldKwh(r.specificYield);
                }}
                options={REGIONS.map((r) => ({ value: r.id, label: r.label }))}
                tooltip={region.yieldNote}
              />
              <NumberInput
                label="Specific yield"
                value={yieldKwh}
                onChange={(v) => {
                  setYieldKwh(v);
                  setSpecificYield(v);
                }}
                unit="kWh/kWp/yr"
                step={10}
                min={0}
                tooltip={region.yieldNote}
              />
              <NumberInput
                label="Self-consumption"
                value={selfConsumption}
                onChange={setSelfConsumption}
                unit="%"
                step={1}
                min={0}
                max={100}
                tooltip="Share of generation used on-site. Without a battery, 25–35% is a common starting range for homes. Not a fact — match your load profile."
              />
              <NumberInput
                label="Grid electricity price"
                value={gridPrice}
                onChange={setGridPrice}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
                tooltip="Retail import rate you currently pay (or expect). Standing charges are ignored here; focus on the variable unit rate."
              />
              <NumberInput
                label="Export / feed-in price"
                value={exportPrice}
                onChange={setExportPrice}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
                tooltip="What you receive per exported kWh. Often much lower than the retail import rate."
              />
            </FieldGrid>
          </section>

          <AssumptionsPanel>
            <FieldGrid>
              <NumberInput
                label="Electricity price inflation"
                value={inflation}
                onChange={setInflation}
                unit="%/yr"
                step={0.1}
                tooltip="Assumed annual rise in the retail import rate. Export price is held flat unless you change the model."
              />
              <NumberInput
                label="Panel degradation"
                value={degradation}
                onChange={setDegradation}
                unit="%/yr"
                step={0.1}
                min={0}
                tooltip="Typical warranty assumptions are ~0.4–0.5%/yr linear degradation. Default 0.5% is a conservative mid-range starting point."
              />
              <NumberInput
                label="Inverter replacement cost"
                value={inverterCost}
                onChange={setInverterCost}
                unit={currency}
                step={50}
                min={0}
                tooltip="Many string inverters are replaced once around year 10–15. Set to 0 to ignore."
              />
              <NumberInput
                label="Inverter replacement year"
                value={inverterYear}
                onChange={setInverterYear}
                unit="yr"
                step={1}
                min={1}
                max={25}
                tooltip="Year in which the inverter cash cost is deducted from cumulative savings."
              />
            </FieldGrid>
          </AssumptionsPanel>
        </div>

        <div className="space-y-4">
          <DisclaimerLine />
          <ResultGrid>
            <ResultCard
              label="Simple payback"
              value={
                result.paybackYear != null
                  ? `Year ${result.paybackYear}`
                  : "> 25 years"
              }
              hint="First year cumulative cash ≥ 0"
              emphasize
            />
            <ResultCard
              label="25-year net gain"
              value={formatMoney(result.netGain, currency)}
              hint="After cost and inverter replacement"
            />
            <ResultCard
              label="Avg. annual saving"
              value={formatMoney(result.avgAnnual, currency)}
              hint="Gross bill/export savings ÷ 25"
            />
            <ResultCard
              label="Year-1 generation"
              value={`${formatNumber(result.year1Gen, 0)} kWh`}
            />
            <ResultCard
              label="Year-1 saving"
              value={formatMoney(result.year1Saving, currency)}
            />
          </ResultGrid>

          <SavingsChart
            points={result.points}
            currency={currency}
            breakEvenYear={result.paybackYear}
          />

          <FormulaBlock
            lines={[
              `generation[y] = ${kWp} kWp × ${yieldKwh} × (1 − ${degradation}/100)^(y−1)`,
              `selfUsed = generation × ${selfConsumption}%`,
              `exported = generation − selfUsed`,
              `price[y] = ${gridPrice} × (1 + ${inflation}/100)^(y−1)`,
              `saving[y] = selfUsed × price[y] + exported × ${exportPrice}`,
              `cumulative = −${cost} + Σ saving − inverter(${inverterCost} @ yr ${inverterYear})`,
              `year-1 gen = ${formatNumber(result.year1Gen, 0)} kWh; year-1 saving ≈ ${formatMoney(result.year1Saving, currency)}`,
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
}
