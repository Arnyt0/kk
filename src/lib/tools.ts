export type RegionId =
  | "central-europe"
  | "uk-ireland"
  | "southern-europe"
  | "us-southwest"
  | "custom";

export type Region = {
  id: RegionId;
  label: string;
  currency: string;
  currencyCode: string;
  specificYield: number;
  yieldNote: string;
};

export const REGIONS: Region[] = [
  {
    id: "central-europe",
    label: "Central Europe (DE, PL, CZ, SK)",
    currency: "€",
    currencyCode: "EUR",
    specificYield: 1000,
    yieldNote:
      "Typical south-facing ~35° tilt yield for Central Europe is ~950–1,050 kWh/kWp/yr. Default mid-range: 1,000.",
  },
  {
    id: "uk-ireland",
    label: "UK & Ireland",
    currency: "£",
    currencyCode: "GBP",
    specificYield: 900,
    yieldNote:
      "Typical south-facing ~35° tilt yield for UK/Ireland is ~850–950 kWh/kWp/yr. Default mid-range: 900.",
  },
  {
    id: "southern-europe",
    label: "Southern Europe (ES, IT, PT, GR)",
    currency: "€",
    currencyCode: "EUR",
    specificYield: 1400,
    yieldNote:
      "Typical south-facing ~35° tilt yield for Southern Europe is ~1,300–1,500 kWh/kWp/yr. Default mid-range: 1,400.",
  },
  {
    id: "us-southwest",
    label: "US Southwest",
    currency: "$",
    currencyCode: "USD",
    specificYield: 1600,
    yieldNote:
      "Typical south-facing ~35° tilt yield for the US Southwest is ~1,500–1,700 kWh/kWp/yr. Default mid-range: 1,600.",
  },
  {
    id: "custom",
    label: "Custom",
    currency: "€",
    currencyCode: "EUR",
    specificYield: 1000,
    yieldNote: "Enter your own specific yield and currency. Defaults are starting points only.",
  },
];

export function getRegion(id: RegionId): Region {
  return REGIONS.find((r) => r.id === id) ?? REGIONS[0];
}

export type ToolMeta = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  href: string;
};

export const TOOLS: ToolMeta[] = [
  {
    slug: "solar-payback",
    title: "Solar payback calculator",
    shortTitle: "Solar payback",
    description:
      "Estimate simple payback and 25-year net gain from a rooftop PV system with transparent assumptions.",
    href: "/tools/solar-payback",
  },
  {
    slug: "solar-system-size",
    title: "Solar system size estimator",
    shortTitle: "System size",
    description:
      "Size a PV array from annual consumption, target offset, and local specific yield.",
    href: "/tools/solar-system-size",
  },
  {
    slug: "battery-roi",
    title: "Home battery ROI calculator",
    shortTitle: "Battery ROI",
    description:
      "Work out whether a home battery pays back by capturing more of your own solar.",
    href: "/tools/battery-roi",
  },
  {
    slug: "heat-pump-vs-boiler",
    title: "Heat pump vs. gas boiler",
    shortTitle: "Heat pump vs boiler",
    description:
      "Compare annual running costs using SCOP, boiler efficiency, and fuel prices.",
    href: "/tools/heat-pump-vs-boiler",
  },
  {
    slug: "ev-charging-cost",
    title: "EV home charging cost",
    shortTitle: "EV charging",
    description:
      "Calculate home EV charging cost with day/night tariffs and compare to petrol.",
    href: "/tools/ev-charging-cost",
  },
  {
    slug: "appliance-running-cost",
    title: "Appliance running cost",
    shortTitle: "Appliances",
    description:
      "Build a list of household appliances and see annual electricity cost by device.",
    href: "/tools/appliance-running-cost",
  },
  {
    slug: "insulation-payback",
    title: "Insulation payback",
    shortTitle: "Insulation",
    description:
      "Estimate payback for loft, cavity, draught-proofing and glazing with multiplicative savings.",
    href: "/tools/insulation-payback",
  },
  {
    slug: "tariff-comparison",
    title: "Time-of-use tariff comparison",
    shortTitle: "Tariff compare",
    description:
      "Split usage across peak, off-peak and night bands and rank up to three tariffs.",
    href: "/tools/tariff-comparison",
  },
  {
    slug: "kwh-cost-co2",
    title: "kWh ↔ cost ↔ CO₂ converter",
    shortTitle: "kWh converter",
    description:
      "Convert freely between kilowatt-hours, cost and CO₂ using editable grid intensity.",
    href: "/tools/kwh-cost-co2",
  },
];

export function getTool(slug: string): ToolMeta | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function relatedTools(slug: string, count = 3): ToolMeta[] {
  const idx = TOOLS.findIndex((t) => t.slug === slug);
  if (idx < 0) return TOOLS.slice(0, count);
  const rest = [...TOOLS.slice(idx + 1), ...TOOLS.slice(0, idx)];
  return rest.slice(0, count);
}
