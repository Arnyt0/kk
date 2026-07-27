"use client";

import { REGIONS, type RegionId } from "@/lib/tools";
import { useRegion } from "@/context/RegionContext";

export function RegionSelector({ compact = false }: { compact?: boolean }) {
  const { region, setRegionId } = useRegion();

  return (
    <label
      className={`flex items-center gap-2 ${compact ? "text-xs" : "text-sm"}`}
    >
      <span className="whitespace-nowrap text-ink-muted">Region</span>
      <select
        value={region.id}
        onChange={(e) => setRegionId(e.target.value as RegionId)}
        className="max-w-[11rem] border border-line bg-surface px-2 py-1.5 text-ink outline-none focus:border-accent sm:max-w-none"
        aria-label="Select region for defaults"
      >
        {REGIONS.map((r) => (
          <option key={r.id} value={r.id}>
            {r.label}
          </option>
        ))}
      </select>
    </label>
  );
}
