import type { Metadata } from "next";
import { ApplianceRunningCostCalculator } from "@/calculators/ApplianceRunningCost";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Appliance running cost calculator",
  description: "Build an appliance list and see annual electricity cost by device.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Appliance running cost calculator",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Build an appliance list and see annual electricity cost by device.",
        }}
      />
      <ApplianceRunningCostCalculator />
    </>
  );
}
