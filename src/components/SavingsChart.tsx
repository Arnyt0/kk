"use client";

export type ChartPoint = {
  year: number;
  value: number;
};

export function SavingsChart({
  points,
  currency,
  breakEvenYear,
  height = 280,
}: {
  points: ChartPoint[];
  currency: string;
  breakEvenYear?: number | null;
  height?: number;
}) {
  if (points.length === 0) return null;

  const width = 640;
  const pad = { top: 20, right: 16, bottom: 36, left: 56 };
  const innerW = width - pad.left - pad.right;
  const innerH = height - pad.top - pad.bottom;

  const xs = points.map((p) => p.year);
  const ys = points.map((p) => p.value);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(0, ...ys);
  const maxY = Math.max(0, ...ys);
  const yRange = maxY - minY || 1;

  const xScale = (x: number) =>
    pad.left + ((x - minX) / (maxX - minX || 1)) * innerW;
  const yScale = (y: number) =>
    pad.top + ((maxY - y) / yRange) * innerH;

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${xScale(p.year)} ${yScale(p.value)}`)
    .join(" ");

  const zeroY = yScale(0);
  const ticks = 4;
  const yTicks = Array.from({ length: ticks + 1 }, (_, i) => {
    const v = minY + (yRange * i) / ticks;
    return v;
  });

  const breakEven =
    breakEvenYear != null && Number.isFinite(breakEvenYear)
      ? points.find((p) => p.year === Math.round(breakEvenYear))
      : null;

  return (
    <div className="border border-line bg-surface p-3 sm:p-4">
      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-ink-muted">
        Cumulative cash position
      </p>
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full"
        role="img"
        aria-label="Cumulative savings over 25 years"
      >
        <line
          x1={pad.left}
          y1={zeroY}
          x2={width - pad.right}
          y2={zeroY}
          stroke="#cfd7df"
          strokeWidth="1"
          strokeDasharray="4 3"
        />
        {yTicks.map((v, i) => (
          <g key={i}>
            <line
              x1={pad.left}
              y1={yScale(v)}
              x2={width - pad.right}
              y2={yScale(v)}
              stroke="#eef1f4"
              strokeWidth="1"
            />
            <text
              x={pad.left - 8}
              y={yScale(v) + 3}
              textAnchor="end"
              fontSize="10"
              fill="#4a5a6a"
              fontFamily="var(--font-mono), monospace"
            >
              {formatAxis(v, currency)}
            </text>
          </g>
        ))}
        <path d={path} fill="none" stroke="#0b6e63" strokeWidth="2.5" />
        {breakEven && (
          <g>
            <circle
              cx={xScale(breakEven.year)}
              cy={yScale(breakEven.value)}
              r="5"
              fill="#085249"
              stroke="#fff"
              strokeWidth="2"
            />
            <text
              x={xScale(breakEven.year)}
              y={yScale(breakEven.value) - 12}
              textAnchor="middle"
              fontSize="11"
              fill="#085249"
              fontWeight="600"
            >
              Break-even ≈ yr {breakEven.year}
            </text>
          </g>
        )}
        <text
          x={pad.left}
          y={height - 10}
          fontSize="10"
          fill="#4a5a6a"
          fontFamily="var(--font-mono), monospace"
        >
          Year {minX}
        </text>
        <text
          x={width - pad.right}
          y={height - 10}
          textAnchor="end"
          fontSize="10"
          fill="#4a5a6a"
          fontFamily="var(--font-mono), monospace"
        >
          Year {maxX}
        </text>
      </svg>
    </div>
  );
}

function formatAxis(v: number, currency: string): string {
  const abs = Math.abs(v);
  if (abs >= 1000) return `${v < 0 ? "−" : ""}${currency}${(abs / 1000).toFixed(0)}k`;
  return `${v < 0 ? "−" : ""}${currency}${abs.toFixed(0)}`;
}
