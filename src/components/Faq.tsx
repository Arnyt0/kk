export type FaqItem = {
  question: string;
  answer: string;
};

export function Faq({ items }: { items: FaqItem[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section className="mt-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-ink">
        Frequently asked questions
      </h2>
      <div className="mt-4 divide-y divide-line border border-line bg-surface">
        {items.map((item) => (
          <details key={item.question} className="group px-4 py-3">
            <summary className="cursor-pointer list-none text-sm font-semibold text-ink marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-3">
                {item.question}
                <span className="font-mono text-ink-muted group-open:hidden">+</span>
                <span className="hidden font-mono text-ink-muted group-open:inline">−</span>
              </span>
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
