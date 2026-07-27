"use client";

import { useId, useState, type ReactNode } from "react";

type NumberInputProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  tooltip?: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
};

export function NumberInput({
  label,
  value,
  onChange,
  unit,
  tooltip,
  min,
  max,
  step = 1,
  className = "",
}: NumberInputProps) {
  const id = useId();
  const tipId = `${id}-tip`;
  const [showTip, setShowTip] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <div className="mb-1.5 flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {tooltip && (
          <button
            type="button"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-line text-[10px] font-bold text-ink-muted hover:border-accent hover:text-accent"
            aria-describedby={showTip ? tipId : undefined}
            aria-label={`About ${label}`}
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            onFocus={() => setShowTip(true)}
            onBlur={() => setShowTip(false)}
            onClick={() => setShowTip((v) => !v)}
          >
            ?
          </button>
        )}
      </div>
      {tooltip && showTip && (
        <div
          id={tipId}
          role="tooltip"
          className="absolute left-0 top-7 z-20 max-w-xs border border-line bg-ink px-3 py-2 text-xs leading-relaxed text-white shadow-lg"
        >
          {tooltip}
        </div>
      )}
      <div className="input-glow flex items-stretch border border-line bg-surface transition-shadow focus-within:border-accent">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          value={Number.isFinite(value) ? value : ""}
          min={min}
          max={max}
          step={step}
          onChange={(e) => {
            const n = e.target.valueAsNumber;
            onChange(Number.isFinite(n) ? n : 0);
          }}
          className="w-full min-w-0 bg-transparent px-3 py-2.5 text-sm text-ink outline-none"
        />
        {unit && (
          <span className="flex items-center border-l border-line bg-bg-elevated px-2.5 text-xs font-medium text-ink-muted">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function SelectInput({
  label,
  value,
  onChange,
  options,
  tooltip,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  tooltip?: string;
}) {
  const id = useId();
  const [showTip, setShowTip] = useState(false);

  return (
    <div className="relative">
      <div className="mb-1.5 flex items-center gap-1.5">
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
        </label>
        {tooltip && (
          <button
            type="button"
            className="inline-flex h-4 w-4 items-center justify-center rounded-full border border-line text-[10px] font-bold text-ink-muted"
            onMouseEnter={() => setShowTip(true)}
            onMouseLeave={() => setShowTip(false)}
            onFocus={() => setShowTip(true)}
            onBlur={() => setShowTip(false)}
            aria-label={`About ${label}`}
          >
            ?
          </button>
        )}
      </div>
      {tooltip && showTip && (
        <div className="absolute left-0 top-7 z-20 max-w-xs border border-line bg-ink px-3 py-2 text-xs leading-relaxed text-white shadow-lg">
          {tooltip}
        </div>
      )}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function TextInput({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full border border-line bg-surface px-3 py-2.5 text-sm text-ink outline-none focus:border-accent"
      />
    </div>
  );
}

export function FieldGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">{children}</div>
  );
}
