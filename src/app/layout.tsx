import type { Metadata } from "next";
import { Source_Sans_3, Space_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { RegionProvider } from "@/context/RegionContext";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const body = Source_Sans_3({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const display = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const mono = IBM_Plex_Mono({
  variable: "--font-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "WattPayback — Neutral home energy & solar calculators",
    template: "%s · WattPayback",
  },
  description:
    "Transparent solar payback, battery ROI, heat pump and EV charging calculators. Every assumption is editable. No installer lead forms.",
  openGraph: {
    type: "website",
    siteName: "WattPayback",
    title: "WattPayback — Neutral home energy & solar calculators",
    description:
      "Transparent solar payback, battery ROI, heat pump and EV charging calculators.",
  },
  other: {
    "google-adsense-account": "ca-pub-4517726775065181",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Auto ads — on every page */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4517726775065181"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${body.variable} ${display.variable} ${mono.variable} antialiased`}
      >
        <RegionProvider>
          <Header />
          <main className="min-h-[70vh]">{children}</main>
          <Footer />
        </RegionProvider>
      </body>
    </html>
  );
}
