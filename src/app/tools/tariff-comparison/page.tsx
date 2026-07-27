import type { Metadata } from "next";
import { TariffComparisonCalculator } from "@/calculators/TariffComparison";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Time-of-use tariff comparison",
  description: "Compare up to three electricity tariffs with peak, off-peak and night bands.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Time-of-use tariff comparison",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Compare up to three electricity tariffs with peak, off-peak and night bands.",
        }}
      />
      <TariffComparisonCalculator />
    </>
  );
}
