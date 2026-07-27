"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getRegion, type Region, type RegionId } from "@/lib/tools";

type RegionContextValue = {
  region: Region;
  setRegionId: (id: RegionId) => void;
  currency: string;
  specificYield: number;
  setCurrency: (currency: string) => void;
  setSpecificYield: (yieldKwh: number) => void;
};

const RegionContext = createContext<RegionContextValue | null>(null);

const STORAGE_KEY = "wattpayback-region";

export function RegionProvider({ children }: { children: ReactNode }) {
  const [regionId, setRegionIdState] = useState<RegionId>("central-europe");
  const [currencyOverride, setCurrencyOverride] = useState<string | null>(null);
  const [yieldOverride, setYieldOverride] = useState<number | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as {
        regionId?: RegionId;
        currency?: string;
        specificYield?: number;
      };
      if (parsed.regionId) setRegionIdState(parsed.regionId);
      if (parsed.currency) setCurrencyOverride(parsed.currency);
      if (typeof parsed.specificYield === "number") {
        setYieldOverride(parsed.specificYield);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const persist = useCallback(
    (next: { regionId: RegionId; currency: string; specificYield: number }) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
    },
    [],
  );

  const base = getRegion(regionId);
  const currency = currencyOverride ?? base.currency;
  const specificYield = yieldOverride ?? base.specificYield;

  const setRegionId = useCallback(
    (id: RegionId) => {
      const r = getRegion(id);
      setRegionIdState(id);
      setCurrencyOverride(r.currency);
      setYieldOverride(r.specificYield);
      persist({
        regionId: id,
        currency: r.currency,
        specificYield: r.specificYield,
      });
    },
    [persist],
  );

  const setCurrency = useCallback(
    (c: string) => {
      setCurrencyOverride(c);
      setRegionIdState("custom");
      persist({
        regionId: "custom",
        currency: c,
        specificYield: yieldOverride ?? base.specificYield,
      });
    },
    [persist, yieldOverride, base.specificYield],
  );

  const setSpecificYield = useCallback(
    (y: number) => {
      setYieldOverride(y);
      persist({
        regionId,
        currency: currencyOverride ?? base.currency,
        specificYield: y,
      });
    },
    [persist, regionId, currencyOverride, base.currency],
  );

  const region: Region = useMemo(
    () => ({
      ...base,
      id: regionId,
      currency,
      specificYield,
    }),
    [base, regionId, currency, specificYield],
  );

  const value = useMemo(
    () => ({
      region,
      setRegionId,
      currency,
      specificYield,
      setCurrency,
      setSpecificYield,
    }),
    [region, setRegionId, currency, specificYield, setCurrency, setSpecificYield],
  );

  return (
    <RegionContext.Provider value={value}>{children}</RegionContext.Provider>
  );
}

export function useRegion(): RegionContextValue {
  const ctx = useContext(RegionContext);
  if (!ctx) {
    throw new Error("useRegion must be used within RegionProvider");
  }
  return ctx;
}
