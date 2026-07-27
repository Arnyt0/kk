import type { Metadata } from "next";
import { EvChargingCostCalculator } from "@/calculators/EvChargingCost";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "EV home charging cost calculator",
  description: "Estimate home EV charging cost with day and night tariffs versus petrol.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "EV home charging cost calculator",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Estimate home EV charging cost with day and night tariffs versus petrol.",
        }}
      />
      <EvChargingCostCalculator />
    </>
  );
}
