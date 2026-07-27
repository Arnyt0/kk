import type { Metadata } from "next";
import { ToolCard } from "@/components/ToolCard";
import { AdSlot } from "@/components/AdSlot";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = {
  title: "All calculators",
  description:
    "Browse all WattPayback home energy and solar calculators — payback, batteries, heat pumps, EV charging and more.",
};

export default function ToolsIndexPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight text-ink sm:text-4xl">
        All calculators
      </h1>
      <p className="mt-3 max-w-2xl text-ink-muted">
        Every assumption is editable. Results update live — no submit buttons,
        no installer lead forms.
      </p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TOOLS.map((tool, i) => (
          <ToolCard key={tool.slug} tool={tool} index={i} />
        ))}
      </div>
      <AdSlot placement="home-mid" className="mt-12" />
    </div>
  );
}
