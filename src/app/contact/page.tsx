import type { Metadata } from "next";
import { OPERATOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact WattPayback.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        Contact
      </h1>
      <div className="prose-blog mt-6 space-y-4">
        <p>
          For corrections, formula questions, advertising, or privacy requests,
          reach the site operator using the details below.
        </p>
        <div className="border border-line bg-surface p-4 text-sm text-ink">
          <p>
            <span className="text-ink-muted">Name:</span> {OPERATOR.name}
          </p>
          <p className="mt-2">
            <span className="text-ink-muted">Email:</span>{" "}
            <a
              className="text-accent-deep underline underline-offset-2"
              href={`mailto:${OPERATOR.email}`}
            >
              {OPERATOR.email}
            </a>
          </p>
        </div>
        <p>
          There is no support phone line and no installer referral service.
          Please do not send personal energy bills containing identifying data
          unless necessary for a privacy request.
        </p>
      </div>
    </div>
  );
}
