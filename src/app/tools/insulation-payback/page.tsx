import type { Metadata } from "next";
import { InsulationPaybackCalculator } from "@/calculators/InsulationPayback";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Insulation payback calculator",
  description: "Estimate payback for loft, cavity, draught-proofing and glazing measures.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Insulation payback calculator",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Estimate payback for loft, cavity, draught-proofing and glazing measures.",
        }}
      />
      <InsulationPaybackCalculator />
    </>
  );
}
