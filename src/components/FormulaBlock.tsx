export function FormulaBlock({
  title = "Formula with your numbers",
  lines,
}: {
  title?: string;
  lines: string[];
}) {
  return (
    <div className="border border-line bg-ink px-4 py-3 text-white">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-white/60">
        {title}
      </p>
      <div className="space-y-1.5 font-mono text-xs leading-relaxed sm:text-sm">
        {lines.map((line, i) => (
          <p key={i} className="break-all whitespace-pre-wrap">
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}
