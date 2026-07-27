import Script from "next/script";
import { ADSENSE_CLIENT } from "@/lib/ads";

/** Injects the AdSense library in the document head when configured. */
export function AdSenseScript() {
  if (!ADSENSE_CLIENT) return null;
  return (
    <Script
      id="adsense-loader"
      async
      strategy="afterInteractive"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
      crossOrigin="anonymous"
    />
  );
}
