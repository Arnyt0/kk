import type { Metadata } from "next";
import { SolarSystemSizeCalculator } from "@/calculators/SolarSystemSize";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Solar system size estimator",
  description: "Size a rooftop PV system from annual consumption, target offset and specific yield.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Solar system size estimator",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Size a rooftop PV system from annual consumption, target offset and specific yield.",
        }}
      />
      <SolarSystemSizeCalculator />
    </>
  );
}
