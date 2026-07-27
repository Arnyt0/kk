"use client";

import Link from "next/link";
import { useEffect } from "react";
import {
  ADSENSE_CLIENT,
  getAd,
  type AdPlacementId,
} from "@/lib/ads";

declare global {
  interface Window {
    adsbygoogle?: Record<string, unknown>[];
  }
}

const SIZE_CLASS: Record<string, string> = {
  leaderboard: "min-h-[90px] w-full max-w-[728px]",
  rectangle: "min-h-[250px] w-full max-w-[336px]",
  "mobile-banner": "min-h-[50px] w-full max-w-[320px]",
};

type AdSlotProps = {
  placement: AdPlacementId;
  className?: string;
};

export function AdSlot({ placement, className = "" }: AdSlotProps) {
  const ad = getAd(placement);
  const useAdsense = Boolean(ADSENSE_CLIENT && ad.adsenseSlot);
  const external = ad.href.startsWith("http");

  useEffect(() => {
    if (!useAdsense) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not ready */
    }
  }, [useAdsense, ad.adsenseSlot]);

  const body = (
    <span className="max-w-sm">
      <span className="block text-sm font-semibold text-ink group-hover:text-accent-deep">
        {ad.cta}
      </span>
      <span className="mt-1 block text-xs text-ink-muted">
        Ad space · click to open partner link
      </span>
    </span>
  );

  const boxClass = `group flex ${SIZE_CLASS[ad.size]} items-center justify-center border border-dashed border-line bg-bg-elevated px-4 text-center transition-colors hover:border-accent hover:bg-accent-soft`;

  return (
    <aside
      className={`ad-slot mx-auto flex w-full flex-col items-center ${className}`}
      aria-label={`Advertisement: ${ad.label}`}
      data-ad-placement={ad.id}
    >
      <p className="mb-1.5 w-full max-w-[728px] text-center font-mono text-[10px] uppercase tracking-[0.14em] text-ink-muted/80">
        Advertisement
      </p>

      {useAdsense ? (
        <ins
          className={`adsbygoogle block ${SIZE_CLASS[ad.size]}`}
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT}
          data-ad-slot={ad.adsenseSlot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : external ? (
        <a
          href={ad.href}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className={boxClass}
        >
          {body}
        </a>
      ) : (
        <Link href={ad.href} className={boxClass}>
          {body}
        </Link>
      )}
    </aside>
  );
}
