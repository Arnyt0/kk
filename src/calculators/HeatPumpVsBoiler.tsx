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
    question: "What is the SCOP-to-price-ratio rule?",
    answer:
      "A heat pump is cheaper to run than a gas boiler when electricity_price / gas_price < SCOP × boiler_efficiency (roughly). That break-even ratio is shown in the results.",
  },
  {
    question: "What SCOP should I use?",
    answer:
      "Air-source heat pumps often land around 2.8–4.0 seasonal COP depending on climate and design temperature. Ground-source can be higher. Use the SCOP from a proper heat-loss design, not a marketing peak COP.",
  },
];

export function HeatPumpVsBoilerCalculator() {
  const { currency } = useRegion();
  const [demand, setDemand] = useState(12000);
  const [scop, setScop] = useState(3.5);
  const [elecPrice, setElecPrice] = useState(0.28);
  const [efficiency, setEfficiency] = useState(0.88);
  const [gasPrice, setGasPrice] = useState(0.1);
  const [hpStanding, setHpStanding] = useState(0);
  const [gasStanding, setGasStanding] = useState(120);

  const result = useMemo(() => {
    const hpEnergy = demand / scop;
    const boilerEnergy = demand / efficiency;
    const hpCost = hpEnergy * elecPrice + hpStanding;
    const boilerCost = boilerEnergy * gasPrice + gasStanding;
    const delta = boilerCost - hpCost;
    const breakEvenRatio = scop * efficiency;
    const actualRatio = gasPrice > 0 ? elecPrice / gasPrice : Infinity;
    return {
      hpEnergy,
      boilerEnergy,
      hpCost,
      boilerCost,
      delta,
      breakEvenRatio,
      actualRatio,
    };
  }, [demand, scop, elecPrice, efficiency, gasPrice, hpStanding, gasStanding]);

  return (
    <CalculatorShell
      title="Heat pump vs. gas boiler running cost"
      description="Compare annual running costs using heat demand, SCOP, boiler efficiency, unit rates and standing charges."
      slug="heat-pump-vs-boiler"
      faq={FAQ}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <section className="border border-line bg-surface p-4 sm:p-5">
            <SectionLabel>Your situation</SectionLabel>
            <FieldGrid>
              <NumberInput
                label="Annual heat demand"
                value={demand}
                onChange={setDemand}
                unit="kWh/yr"
                step={100}
                min={0}
                tooltip="Space heating (+ optionally DHW) energy demand in kWh of heat, not fuel input."
              />
              <NumberInput
                label="Electricity price"
                value={elecPrice}
                onChange={setElecPrice}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
              <NumberInput
                label="Gas price"
                value={gasPrice}
                onChange={setGasPrice}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
                tooltip="Gas unit rate on a kWh basis (higher heating value as billed)."
              />
            </FieldGrid>
          </section>
          <AssumptionsPanel>
            <FieldGrid>
              <NumberInput
                label="Heat pump SCOP"
                value={scop}
                onChange={setScop}
                unit="SCOP"
                step={0.1}
                min={0.1}
                tooltip="Seasonal coefficient of performance. Air-source often ~3.0–4.0; ground-source ~4.0–5.0. Default 3.5 is a mid air-source starting point."
              />
              <NumberInput
                label="Boiler seasonal efficiency"
                value={efficiency}
                onChange={setEfficiency}
                unit="fraction"
                step={0.01}
                min={0.1}
                max={1}
                tooltip="Modern condensing boilers often ~0.85–0.92 seasonal. Default 0.88."
              />
              <NumberInput
                label="HP-related standing charge"
                value={hpStanding}
                onChange={setHpStanding}
                unit={`${currency}/yr`}
                step={10}
                min={0}
                tooltip="Extra annual standing cost attributable to the heat-pump electricity supply, if any."
              />
              <NumberInput
                label="Gas standing charge"
                value={gasStanding}
                onChange={setGasStanding}
                unit={`${currency}/yr`}
                step={10}
                min={0}
              />
            </FieldGrid>
          </AssumptionsPanel>
        </div>
        <div className="space-y-4">
          <DisclaimerLine />
          <ResultGrid>
            <ResultCard
              label="Heat pump annual cost"
              value={formatMoney(result.hpCost, currency)}
              hint={`${formatNumber(result.hpEnergy, 0)} kWh electricity`}
              emphasize={result.hpCost <= result.boilerCost}
            />
            <ResultCard
              label="Gas boiler annual cost"
              value={formatMoney(result.boilerCost, currency)}
              hint={`${formatNumber(result.boilerEnergy, 0)} kWh gas`}
              emphasize={result.boilerCost < result.hpCost}
            />
            <ResultCard
              label="Annual difference"
              value={formatMoney(Math.abs(result.delta), currency)}
              hint={
                result.delta >= 0
                  ? "heat pump cheaper"
                  : "gas boiler cheaper"
              }
            />
            <ResultCard
              label="Break-even elec/gas ratio"
              value={formatNumber(result.breakEvenRatio, 2)}
              hint={`SCOP × efficiency; your ratio ${formatNumber(result.actualRatio, 2)}`}
            />
          </ResultGrid>
          <FormulaBlock
            lines={[
              `hp_cost = ${demand} / ${scop} × ${elecPrice} + ${hpStanding} = ${formatMoney(result.hpCost, currency)}`,
              `boiler_cost = ${demand} / ${efficiency} × ${gasPrice} + ${gasStanding} = ${formatMoney(result.boilerCost, currency)}`,
              `break_even_ratio = ${scop} × ${efficiency} = ${formatNumber(result.breakEvenRatio, 3)}`,
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
}
