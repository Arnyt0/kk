import type { Metadata } from "next";
import { KwhCostCo2Calculator } from "@/calculators/KwhCostCo2";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "kWh ↔ cost ↔ CO₂ converter",
  description: "Convert between kilowatt-hours, electricity cost and CO₂ emissions.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "kWh ↔ cost ↔ CO₂ converter",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Convert between kilowatt-hours, electricity cost and CO₂ emissions.",
        }}
      />
      <KwhCostCo2Calculator />
    </>
  );
}
