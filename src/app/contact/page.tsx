import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { BrandMark, IconConvert } from "@/components/Icons";
import { OPERATOR } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact WattPayback — questions, corrections, advertising.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <div className="page-enter">
        <div className="section-mark text-accent">
          <BrandMark size={20} />
          <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.16em]">
            Get in touch
          </span>
        </div>
        <h1 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
          Contact
        </h1>
        <p className="mt-3 text-ink-muted">
          Corrections, formula questions, advertising, or privacy requests —
          send a message below. It goes to {OPERATOR.name}.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Reveal className="border border-line bg-surface p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            Email
          </p>
          <a
            href={`mailto:${OPERATOR.email}`}
            className="mt-2 inline-block text-lg font-semibold text-accent-deep underline underline-offset-2"
          >
            {OPERATOR.email}
          </a>
        </Reveal>
        <Reveal delay={80} className="border border-line bg-surface p-4">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ink-muted">
            Operator
          </p>
          <p className="mt-2 text-lg font-semibold text-ink">{OPERATOR.name}</p>
          <p className="mt-1 text-sm text-ink-muted">WattPayback · wattpayback.com</p>
        </Reveal>
      </div>

      <Reveal delay={120} className="mt-8">
        <ContactForm />
      </Reveal>

      <Reveal delay={160} className="prose-blog mt-8">
        <p className="flex items-start gap-2 text-sm text-ink-muted">
          <IconConvert size={16} className="mt-1 shrink-0 text-accent" />
          <span>
            There is no phone support and no installer referral service. Please
            don’t send bills with personal data unless needed for a privacy
            request.
          </span>
        </p>
      </Reveal>
    </div>
  );
}
