import type { Metadata } from "next";
import { HeatPumpVsBoilerCalculator } from "@/calculators/HeatPumpVsBoiler";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Heat pump vs. gas boiler running cost",
  description: "Compare heat pump and gas boiler annual running costs using SCOP and fuel prices.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Heat pump vs. gas boiler running cost",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Compare heat pump and gas boiler annual running costs using SCOP and fuel prices.",
        }}
      />
      <HeatPumpVsBoilerCalculator />
    </>
  );
}
