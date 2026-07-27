"use client";

import { useMemo, useState } from "react";
import {
  CalculatorShell,
  DisclaimerLine,
  SectionLabel,
} from "@/components/CalculatorShell";
import { FormulaBlock } from "@/components/FormulaBlock";
import { FieldGrid, NumberInput, TextInput } from "@/components/NumberInput";
import { ResultCard, ResultGrid } from "@/components/ResultCard";
import { useRegion } from "@/context/RegionContext";
import { formatMoney, formatNumber } from "@/lib/format";

type Tariff = {
  id: string;
  name: string;
  peak: number;
  offPeak: number;
  night: number;
  standingDaily: number;
};

const FAQ = [
  {
    question: "Who do time-of-use tariffs suit?",
    answer:
      "Households that can shift EV charging, immersion heaters, dishwashers or heat-pump tanks into cheap windows. If most use is evening peak and you cannot shift, a flat rate can win.",
  },
];

export function TariffComparisonCalculator() {
  const { currency } = useRegion();
  const [annualKwh, setAnnualKwh] = useState(4000);
  const [peakPct, setPeakPct] = useState(40);
  const [offPeakPct, setOffPeakPct] = useState(35);
  const [nightPct, setNightPct] = useState(25);
  const [tariffs, setTariffs] = useState<Tariff[]>([
    {
      id: "1",
      name: "Flat standard",
      peak: 0.28,
      offPeak: 0.28,
      night: 0.28,
      standingDaily: 0.55,
    },
    {
      id: "2",
      name: "EV / night saver",
      peak: 0.34,
      offPeak: 0.22,
      night: 0.1,
      standingDaily: 0.5,
    },
    {
      id: "3",
      name: "Two-rate",
      peak: 0.32,
      offPeak: 0.18,
      night: 0.18,
      standingDaily: 0.48,
    },
  ]);

  const splitOk = Math.abs(peakPct + offPeakPct + nightPct - 100) < 0.01;

  const ranked = useMemo(() => {
    const peakKwh = annualKwh * (peakPct / 100);
    const offKwh = annualKwh * (offPeakPct / 100);
    const nightKwh = annualKwh * (nightPct / 100);
    return tariffs
      .map((t) => {
        const energy =
          peakKwh * t.peak + offKwh * t.offPeak + nightKwh * t.night;
        const standing = t.standingDaily * 365;
        const total = energy + standing;
        return { ...t, energy, standing, total };
      })
      .sort((a, b) => a.total - b.total);
  }, [annualKwh, peakPct, offPeakPct, nightPct, tariffs]);

  const worst = ranked[ranked.length - 1];
  const best = ranked[0];

  function update(id: string, patch: Partial<Tariff>) {
    setTariffs((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...patch } : t)),
    );
  }

  return (
    <CalculatorShell
      title="Time-of-use tariff comparison"
      description="Split annual consumption across peak, off-peak and night bands, then rank up to three tariffs."
      slug="tariff-comparison"
      faq={FAQ}
    >
      <div className="space-y-6">
        <section className="border border-line bg-surface p-4 sm:p-5">
          <SectionLabel>Your situation</SectionLabel>
          <FieldGrid>
            <NumberInput
              label="Annual consumption"
              value={annualKwh}
              onChange={setAnnualKwh}
              unit="kWh/yr"
              step={50}
              min={0}
            />
            <NumberInput
              label="Peak share"
              value={peakPct}
              onChange={setPeakPct}
              unit="%"
              step={1}
              min={0}
              max={100}
            />
            <NumberInput
              label="Off-peak share"
              value={offPeakPct}
              onChange={setOffPeakPct}
              unit="%"
              step={1}
              min={0}
              max={100}
            />
            <NumberInput
              label="Night share"
              value={nightPct}
              onChange={setNightPct}
              unit="%"
              step={1}
              min={0}
              max={100}
            />
          </FieldGrid>
          {!splitOk && (
            <p className="mt-3 text-xs text-warn">
              Peak + off-peak + night should total 100% (currently{" "}
              {formatNumber(peakPct + offPeakPct + nightPct, 0)}%).
            </p>
          )}
        </section>

        <div className="space-y-3">
          <SectionLabel>Tariffs (up to 3)</SectionLabel>
          {tariffs.map((t) => (
            <div
              key={t.id}
              className="grid gap-3 border border-line bg-surface p-3 sm:grid-cols-5"
            >
              <TextInput
                label="Name"
                value={t.name}
                onChange={(v) => update(t.id, { name: v })}
              />
              <NumberInput
                label="Peak rate"
                value={t.peak}
                onChange={(v) => update(t.id, { peak: v })}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
              <NumberInput
                label="Off-peak rate"
                value={t.offPeak}
                onChange={(v) => update(t.id, { offPeak: v })}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
              <NumberInput
                label="Night rate"
                value={t.night}
                onChange={(v) => update(t.id, { night: v })}
                unit={`${currency}/kWh`}
                step={0.01}
                min={0}
              />
              <NumberInput
                label="Standing charge"
                value={t.standingDaily}
                onChange={(v) => update(t.id, { standingDaily: v })}
                unit={`${currency}/day`}
                step={0.01}
                min={0}
              />
            </div>
          ))}
        </div>

        <DisclaimerLine />
        {best && worst && (
          <ResultGrid>
            <ResultCard
              label="Cheapest tariff"
              value={best.name}
              hint={formatMoney(best.total, currency) + " / yr"}
              emphasize
            />
            <ResultCard
              label="Saving vs. most expensive"
              value={formatMoney(worst.total - best.total, currency)}
              hint={`vs ${worst.name}`}
            />
          </ResultGrid>
        )}

        <div className="border border-line bg-surface">
          <p className="border-b border-line px-4 py-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
            Ranked annual cost
          </p>
          <ul className="divide-y divide-line">
            {ranked.map((t, i) => (
              <li
                key={t.id}
                className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 text-sm"
              >
                <span className="font-medium text-ink">
                  #{i + 1} {t.name}
                </span>
                <span className="font-mono text-xs text-ink-muted">
                  energy {formatMoney(t.energy, currency)} + standing{" "}
                  {formatMoney(t.standing, currency)} ={" "}
                  <strong className="text-ink">
                    {formatMoney(t.total, currency)}
                  </strong>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <FormulaBlock
          lines={
            best
              ? [
                  `peak_kWh = ${annualKwh} × ${peakPct}% = ${formatNumber(annualKwh * peakPct / 100, 0)}`,
                  `off_kWh = ${annualKwh} × ${offPeakPct}% = ${formatNumber(annualKwh * offPeakPct / 100, 0)}`,
                  `night_kWh = ${annualKwh} × ${nightPct}% = ${formatNumber(annualKwh * nightPct / 100, 0)}`,
                  `${best.name}: Σ(band_kWh × rate) + ${best.standingDaily} × 365 = ${formatMoney(best.total, currency)}`,
                ]
              : []
          }
        />
      </div>
    </CalculatorShell>
  );
}
