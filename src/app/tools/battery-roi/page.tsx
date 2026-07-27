import type { Metadata } from "next";
import { BatteryRoiCalculator } from "@/calculators/BatteryRoi";
import { JsonLd } from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Home battery ROI calculator",
  description: "Calculate whether a home battery pays back by increasing self-consumption.",
};

export default function Page() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          name: "Home battery ROI calculator",
          applicationCategory: "UtilitiesApplication",
          operatingSystem: "Web",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          description: "Calculate whether a home battery pays back by increasing self-consumption.",
        }}
      />
      <BatteryRoiCalculator />
    </>
  );
}
