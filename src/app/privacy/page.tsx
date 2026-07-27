import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Privacy policy for WattPayback.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink">
        Privacy policy
      </h1>
      <div className="prose-blog mt-6 space-y-4 text-sm">
        <p>Last updated: TODO — date</p>
        <p>
          WattPayback calculators run entirely in your browser. Inputs you type
          into tools are not sent to a WattPayback server for calculation (there
          is no calculation API).
        </p>
        <p>
          Region preferences may be stored in your browser&apos;s localStorage
          so defaults persist between visits.
        </p>
        <h2>Advertising</h2>
        <p>
          WattPayback shows advertisement slots on some pages (home, calculators,
          and articles). Until Google AdSense (or another network) is connected,
          those slots may link to partner / sponsor destinations. When AdSense is
          enabled, Google and its partners may use cookies or similar technologies
          to serve personalized or non-personalized ads subject to your consent
          choices and Google&apos;s policies.
        </p>
        <p>
          {/* TODO: add AdSense / CMP details once live */}
          Publisher / AdSense ID: TODO — set{" "}
          <code>NEXT_PUBLIC_ADSENSE_CLIENT</code> in the host environment.
        </p>
        <h2>Hosting and logs</h2>
        <p>
          The site is hosted on Vercel. Hosting providers may process standard
          server logs (IP address, user agent, pages requested). TODO — name any
          additional analytics once enabled.
        </p>
        <h2>Contact</h2>
        <p>
          Privacy requests: TODO — privacy@email.example (replace with your
          address).
        </p>
      </div>
    </div>
  );
}
