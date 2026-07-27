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
    question: "Why is grid carbon intensity editable?",
    answer:
      "Grams of CO₂ per kWh vary by country, season and even hour of day as the generation mix changes. The 250 g/kWh default is only a placeholder mid-range figure — replace it with a local published intensity.",
  },
];

export function KwhCostCo2Calculator() {
  const { currency } = useRegion();
  const [kwh, setKwh] = useState(1000);
  const [price, setPrice] = useState(0.28);
  const [intensity, setIntensity] = useState(250);
  const [lastEdited, setLastEdited] = useState<"kwh" | "cost" | "co2">("kwh");

  const derived = useMemo(() => {
    const cost = kwh * price;
    const co2kg = (kwh * intensity) / 1000;
    return { cost, co2kg };
  }, [kwh, price, intensity]);

  function setFromCost(cost: number) {
    setLastEdited("cost");
    if (price > 0) setKwh(cost / price);
  }

  function setFromCo2(co2kg: number) {
    setLastEdited("co2");
    if (intensity > 0) setKwh((co2kg * 1000) / intensity);
  }

  return (
    <CalculatorShell
      title="kWh ↔ cost ↔ CO₂ converter"
      description="Convert freely between kilowatt-hours, electricity cost and CO₂ using editable price and grid intensity."
      slug="kwh-cost-co2"
      faq={FAQ}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <section className="border border-line bg-surface p-4 sm:p-5">
            <SectionLabel>Convert (edit any field)</SectionLabel>
            <FieldGrid>
              <NumberInput
                label="Energy"
                value={Number(kwh.toFixed(3))}
                onChange={(v) => {
                  setLastEdited("kwh");
                  setKwh(v);
                }}
                unit="kWh"
                step={10}
                min={0}
              />
              <NumberInput
                label="Cost"
                value={Number(derived.cost.toFixed(2))}
                onChange={setFromCost}
                unit={currency}
                step={1}
                min={0}
                tooltip="cost = kWh × price. Editing cost back-calculates kWh."
              />
              <NumberInput
                label="CO₂"
                value={Number(derived.co2kg.toFixed(2))}
                onChange={setFromCo2}
                unit="kg"
                step={1}
                min={0}
                tooltip="CO₂ = kWh × intensity / 1000. Editing CO₂ back-calculates kWh."
              />
            </FieldGrid>
            <p className="mt-3 text-xs text-ink-muted">
              Last edited: {lastEdited}. Other fields update from price and
              intensity below.
            </p>
          </section>
          <AssumptionsPanel>
            <FieldGrid>
              <NumberInput
                label="Price per kWh"
                value={price}
                onChange={setPrice}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
              <NumberInput
                label="Grid carbon intensity"
                value={intensity}
                onChange={setIntensity}
                unit="g/kWh"
                step={10}
                min={0}
                tooltip="Default 250 g CO₂/kWh is an editable placeholder. Real intensity varies by country and time of day — replace with a local figure."
              />
            </FieldGrid>
          </AssumptionsPanel>
        </div>
        <div className="space-y-4">
          <DisclaimerLine />
          <ResultGrid>
            <ResultCard
              label="Energy"
              value={`${formatNumber(kwh, 1)} kWh`}
              emphasize
            />
            <ResultCard
              label="Cost"
              value={formatMoney(derived.cost, currency)}
            />
            <ResultCard
              label="CO₂"
              value={`${formatNumber(derived.co2kg, 2)} kg`}
              hint={`${formatNumber(derived.co2kg / 1000, 3)} tonnes`}
            />
          </ResultGrid>
          <FormulaBlock
            lines={[
              `cost = ${formatNumber(kwh, 3)} × ${price} = ${formatMoney(derived.cost, currency)}`,
              `CO₂_kg = ${formatNumber(kwh, 3)} × ${intensity} / 1000 = ${formatNumber(derived.co2kg, 3)} kg`,
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
}
