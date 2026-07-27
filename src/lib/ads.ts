/**
 * Ad / sponsor configuration for WattPayback.
 *
 * Fill in AdSense IDs after approval, or set click-through URLs for
 * direct sponsor / affiliate placements in the meantime.
 */

export type AdPlacementId =
  | "home-mid"
  | "home-bottom"
  | "tools-top"
  | "tools-bottom"
  | "blog-inline"
  | "blog-bottom"
  | "sidebar";

export type AdPlacement = {
  id: AdPlacementId;
  label: string;
  /** Google AdSense ad slot ID (numbers only). Leave empty until approved. */
  adsenseSlot: string;
  /**
   * Click-through when AdSense is off — sponsor, affiliate, or partner URL.
   * TODO: replace with your real ad / affiliate destinations.
   */
  href: string;
  /** Shown on the placeholder / sponsored unit */
  cta: string;
  size: "leaderboard" | "rectangle" | "mobile-banner";
};

/** TODO: replace with your AdSense publisher ID, e.g. ca-pub-xxxxxxxxxxxxxxxx */
export const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.trim() || "";

export const ADS_ENABLED =
  process.env.NEXT_PUBLIC_ADS_ENABLED === "true" || Boolean(ADSENSE_CLIENT);

export const AD_PLACEMENTS: Record<AdPlacementId, AdPlacement> = {
  "home-mid": {
    id: "home-mid",
    label: "Home — after tools",
    adsenseSlot: process.env.NEXT_PUBLIC_ADS_SLOT_HOME_MID || "",
    href: "/contact",
    cta: "Advertise on WattPayback",
    size: "leaderboard",
  },
  "home-bottom": {
    id: "home-bottom",
    label: "Home — below blog",
    adsenseSlot: process.env.NEXT_PUBLIC_ADS_SLOT_HOME_BOTTOM || "",
    href: "/contact",
    cta: "Partner with WattPayback",
    size: "leaderboard",
  },
  "tools-top": {
    id: "tools-top",
    label: "Calculator — below intro",
    adsenseSlot: process.env.NEXT_PUBLIC_ADS_SLOT_TOOLS_TOP || "",
    // TODO: replace with your solar / battery affiliate URL
    href: "https://www.google.com/search?q=home+solar+panels",
    cta: "Sponsored — home solar & battery kit",
    size: "leaderboard",
  },
  "tools-bottom": {
    id: "tools-bottom",
    label: "Calculator — above related",
    adsenseSlot: process.env.NEXT_PUBLIC_ADS_SLOT_TOOLS_BOTTOM || "",
    // TODO: replace with your heat-pump / insulation affiliate URL
    href: "https://www.google.com/search?q=heat+pump+running+costs",
    cta: "Sponsored — heating upgrades worth checking",
    size: "rectangle",
  },
  "blog-inline": {
    id: "blog-inline",
    label: "Blog — after intro",
    adsenseSlot: process.env.NEXT_PUBLIC_ADS_SLOT_BLOG_INLINE || "",
    href: "/contact",
    cta: "Sponsored placement available",
    size: "rectangle",
  },
  "blog-bottom": {
    id: "blog-bottom",
    label: "Blog — end of article",
    adsenseSlot: process.env.NEXT_PUBLIC_ADS_SLOT_BLOG_BOTTOM || "",
    // TODO: replace with your EV / tariff affiliate URL
    href: "https://www.google.com/search?q=ev+home+charging",
    cta: "Sponsored — EV charging & tariffs",
    size: "leaderboard",
  },
  sidebar: {
    id: "sidebar",
    label: "Sidebar / sticky",
    adsenseSlot: process.env.NEXT_PUBLIC_ADS_SLOT_SIDEBAR || "",
    href: "/contact",
    cta: "Advertise here",
    size: "rectangle",
  },
};

export function getAd(id: AdPlacementId): AdPlacement {
  return AD_PLACEMENTS[id];
}
