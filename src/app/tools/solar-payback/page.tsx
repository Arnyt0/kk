import type { Metadata } from "next";
import { SolarPaybackCalculator } from "@/calculators/SolarPayback";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Solar payback calculator",
  description: "Estimate solar PV payback and 25-year net gain with transparent, editable assumptions.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Solar payback calculator",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Estimate solar PV payback and 25-year net gain with transparent, editable assumptions.",
        }}
      />
      <SolarPaybackCalculator />
    </>
  );
}
