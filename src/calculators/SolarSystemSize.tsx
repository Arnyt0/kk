"use client";

import { useEffect, useMemo, useState } from "react";
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
import { formatNumber } from "@/lib/format";

const FAQ = [
  {
    question: "Does 100% offset mean I am off-grid?",
    answer:
      "No. Annual offset means yearly generation roughly matches yearly consumption. You still import at night and on dull days, and export surplus at other times, unless you have a very large battery and accept limited autonomy.",
  },
  {
    question: "How much roof area do panels need?",
    answer:
      "A rough planning factor is ~5–6 m² per kWp for typical crystalline modules including gaps. The factor is editable because module wattage and layout vary.",
  },
];

export function SolarSystemSizeCalculator() {
  const { specificYield, setSpecificYield } = useRegion();
  const [consumption, setConsumption] = useState(4000);
  const [offset, setOffset] = useState(80);
  const [yieldKwh, setYieldKwh] = useState(specificYield);
  const [panelWatts, setPanelWatts] = useState(420);
  const [m2PerKwp, setM2PerKwp] = useState(5.5);

  useEffect(() => setYieldKwh(specificYield), [specificYield]);

  const result = useMemo(() => {
    const kWpNeeded =
      yieldKwh > 0 ? (consumption * (offset / 100)) / yieldKwh : 0;
    const panelCount =
      panelWatts > 0 ? Math.ceil((kWpNeeded * 1000) / panelWatts) : 0;
    const roofArea = kWpNeeded * m2PerKwp;
    const annualGen = kWpNeeded * yieldKwh;
    return { kWpNeeded, panelCount, roofArea, annualGen };
  }, [consumption, offset, yieldKwh, panelWatts, m2PerKwp]);

  return (
    <CalculatorShell
      title="Solar system size estimator"
      description="Estimate the kWp, panel count and roof area needed to offset a chosen share of your annual electricity use."
      slug="solar-system-size"
      faq={FAQ}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <section className="border border-line bg-surface p-4 sm:p-5">
            <SectionLabel>Your situation</SectionLabel>
            <FieldGrid>
              <NumberInput
                label="Annual consumption"
                value={consumption}
                onChange={setConsumption}
                unit="kWh/yr"
                step={100}
                min={0}
                tooltip="Total household electricity use from your bill. Exclude EV charging if you size that separately."
              />
              <NumberInput
                label="Target annual offset"
                value={offset}
                onChange={setOffset}
                unit="%"
                step={1}
                min={0}
                max={150}
                tooltip="Share of annual kWh you want the array to generate. 70–100% is common; oversizing increases export."
              />
            </FieldGrid>
          </section>
          <AssumptionsPanel>
            <FieldGrid>
              <NumberInput
                label="Specific yield"
                value={yieldKwh}
                onChange={(v) => {
                  setYieldKwh(v);
                  setSpecificYield(v);
                }}
                unit="kWh/kWp/yr"
                step={10}
                tooltip="Region default is a mid-range starting point for south-facing ~35° tilt. Adjust for orientation and shading."
              />
              <NumberInput
                label="Panel wattage"
                value={panelWatts}
                onChange={setPanelWatts}
                unit="W"
                step={5}
                min={1}
                tooltip="Nameplate wattage of each module you expect to use."
              />
              <NumberInput
                label="Roof area factor"
                value={m2PerKwp}
                onChange={setM2PerKwp}
                unit="m²/kWp"
                step={0.1}
                min={0.1}
                tooltip="Planning rule of thumb ~5.5 m²/kWp including spacing. Edit for your module size and layout."
              />
            </FieldGrid>
          </AssumptionsPanel>
        </div>
        <div className="space-y-4">
          <DisclaimerLine />
          <ResultGrid>
            <ResultCard
              label="System size needed"
              value={`${formatNumber(result.kWpNeeded, 2)} kWp`}
              emphasize
            />
            <ResultCard
              label="Panel count"
              value={`${result.panelCount}`}
              hint={`at ${panelWatts} W each`}
            />
            <ResultCard
              label="Approx. roof area"
              value={`${formatNumber(result.roofArea, 1)} m²`}
            />
            <ResultCard
              label="Expected annual generation"
              value={`${formatNumber(result.annualGen, 0)} kWh`}
            />
          </ResultGrid>
          <p className="border border-line bg-bg-elevated px-3 py-2 text-xs leading-relaxed text-ink-muted">
            Offsetting 100% of annual consumption does not mean independence
            from the grid. Generation and demand rarely coincide hour by hour.
          </p>
          <FormulaBlock
            lines={[
              `kWp_needed = ${consumption} × ${offset}/100 / ${yieldKwh} = ${formatNumber(result.kWpNeeded, 3)} kWp`,
              `panel_count = ceil(${formatNumber(result.kWpNeeded, 3)} × 1000 / ${panelWatts}) = ${result.panelCount}`,
              `roof_area = ${formatNumber(result.kWpNeeded, 3)} × ${m2PerKwp} = ${formatNumber(result.roofArea, 2)} m²`,
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
}
