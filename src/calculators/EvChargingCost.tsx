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
    question: "Why is charging efficiency less than 100%?",
    answer:
      "AC/DC conversion, battery thermal management and cable losses typically consume 10–15% of energy drawn from the wall. Default 88% means divide by 0.88.",
  },
  {
    question: "Is night charging always cheaper?",
    answer:
      "If you have a time-of-use tariff with a genuine overnight trough, shifting charge sessions there usually dominates the annual cost. Without a cheap night rate the petrol comparison matters more.",
  },
];

export function EvChargingCostCalculator() {
  const { currency } = useRegion();
  const [km, setKm] = useState(15000);
  const [kwhPer100, setKwhPer100] = useState(18);
  const [efficiency, setEfficiency] = useState(88);
  const [dayRate, setDayRate] = useState(0.28);
  const [nightRate, setNightRate] = useState(0.12);
  const [nightShare, setNightShare] = useState(80);
  const [litresPer100, setLitresPer100] = useState(6.5);
  const [fuelPrice, setFuelPrice] = useState(1.7);

  const result = useMemo(() => {
    const energyNeeded = (km / 100) * kwhPer100 / (efficiency / 100);
    const blendedRate =
      (nightShare / 100) * nightRate + (1 - nightShare / 100) * dayRate;
    const evAnnual = energyNeeded * blendedRate;
    const evPer100 = (kwhPer100 / (efficiency / 100)) * blendedRate;
    const petrolPer100 = litresPer100 * fuelPrice;
    const petrolAnnual = (km / 100) * petrolPer100;
    const difference = petrolAnnual - evAnnual;
    return {
      energyNeeded,
      blendedRate,
      evAnnual,
      evPer100,
      petrolPer100,
      petrolAnnual,
      difference,
    };
  }, [
    km,
    kwhPer100,
    efficiency,
    dayRate,
    nightRate,
    nightShare,
    litresPer100,
    fuelPrice,
  ]);

  return (
    <CalculatorShell
      title="EV home charging cost calculator"
      description="Estimate annual home charging cost with day/night tariffs and compare against a petrol car."
      slug="ev-charging-cost"
      faq={FAQ}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-5">
          <section className="border border-line bg-surface p-4 sm:p-5">
            <SectionLabel>Your situation</SectionLabel>
            <FieldGrid>
              <NumberInput
                label="Annual distance"
                value={km}
                onChange={setKm}
                unit="km/yr"
                step={100}
                min={0}
              />
              <NumberInput
                label="EV consumption"
                value={kwhPer100}
                onChange={setKwhPer100}
                unit="kWh/100km"
                step={0.5}
                min={0}
                tooltip="Wall-to-wheels you can still adjust via charging efficiency below. This is the vehicle's traction energy use."
              />
              <NumberInput
                label="Day rate"
                value={dayRate}
                onChange={setDayRate}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
              <NumberInput
                label="Night rate"
                value={nightRate}
                onChange={setNightRate}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
              <NumberInput
                label="Share charged at night"
                value={nightShare}
                onChange={setNightShare}
                unit="%"
                step={1}
                min={0}
                max={100}
              />
            </FieldGrid>
          </section>
          <AssumptionsPanel>
            <FieldGrid>
              <NumberInput
                label="Charging efficiency"
                value={efficiency}
                onChange={setEfficiency}
                unit="%"
                step={1}
                min={1}
                max={100}
                tooltip="EV charging losses are often 10–15%, so efficiency ≈ 85–90%. Default 88%."
              />
              <NumberInput
                label="Petrol consumption"
                value={litresPer100}
                onChange={setLitresPer100}
                unit="L/100km"
                step={0.1}
                min={0}
              />
              <NumberInput
                label="Fuel price"
                value={fuelPrice}
                onChange={setFuelPrice}
                unit={`${currency}/L`}
                step={0.01}
                min={0}
              />
            </FieldGrid>
          </AssumptionsPanel>
        </div>
        <div className="space-y-4">
          <DisclaimerLine />
          <ResultGrid>
            <ResultCard
              label="Energy from wall"
              value={`${formatNumber(result.energyNeeded, 0)} kWh/yr`}
            />
            <ResultCard
              label="EV annual cost"
              value={formatMoney(result.evAnnual, currency)}
              emphasize
            />
            <ResultCard
              label="EV cost / 100 km"
              value={formatMoney(result.evPer100, currency)}
            />
            <ResultCard
              label="Petrol cost / 100 km"
              value={formatMoney(result.petrolPer100, currency)}
            />
            <ResultCard
              label="Petrol annual cost"
              value={formatMoney(result.petrolAnnual, currency)}
            />
            <ResultCard
              label="Annual difference"
              value={formatMoney(Math.abs(result.difference), currency)}
              hint={
                result.difference >= 0 ? "EV cheaper" : "petrol cheaper"
              }
            />
          </ResultGrid>
          <FormulaBlock
            lines={[
              `energy = ${km}/100 × ${kwhPer100} / (${efficiency}/100) = ${formatNumber(result.energyNeeded, 1)} kWh`,
              `blended_rate = ${nightShare}% × ${nightRate} + ${100 - nightShare}% × ${dayRate} = ${formatNumber(result.blendedRate, 4)}`,
              `ev_cost = energy × blended_rate = ${formatMoney(result.evAnnual, currency)}`,
              `petrol_per_100 = ${litresPer100} × ${fuelPrice} = ${formatMoney(result.petrolPer100, currency)}`,
            ]}
          />
        </div>
      </div>
    </CalculatorShell>
  );
}
