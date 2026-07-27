export function formatMoney(value: number, currency: string, digits = 0): string {
  if (!Number.isFinite(value)) return "—";
  const abs = Math.abs(value);
  const formatted =
    abs >= 100
      ? abs.toLocaleString(undefined, {
          maximumFractionDigits: digits,
          minimumFractionDigits: digits,
        })
      : abs.toLocaleString(undefined, {
          maximumFractionDigits: Math.max(digits, 2),
          minimumFractionDigits: Math.min(2, Math.max(digits, 0)),
        });
  return `${value < 0 ? "−" : ""}${currency}${formatted}`;
}

export function formatNumber(value: number, digits = 1): string {
  if (!Number.isFinite(value)) return "—";
  return value.toLocaleString(undefined, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  });
}

export function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}
