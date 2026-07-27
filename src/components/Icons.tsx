import type { ReactElement, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function attrs({ size = 24, className, ...props }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
    ...props,
  };
}

export function IconSun(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8" />
    </svg>
  );
}

export function IconPanels(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M3 10h18M3 15h18M9 5v14M15 5v14" />
    </svg>
  );
}

export function IconBattery(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <rect x="2" y="7" width="18" height="10" rx="2" />
      <path d="M20 10h2v4h-2M6 10v4M10 10v4M14 10v4" />
    </svg>
  );
}

export function IconHeatPump(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
      <path d="M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
    </svg>
  );
}

export function IconEv(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <path d="M4 15h16l-1.5-5.5A2 2 0 0 0 16.6 8H7.4a2 2 0 0 0-1.9 1.5L4 15Z" />
      <path d="M6.5 15v2.5M17.5 15v2.5M3 15h18" />
      <path d="M11 5l-1.5 3h3L11 11" />
    </svg>
  );
}

export function IconPlug(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <path d="M9 7V3M15 7V3M8 7h8v4a4 4 0 0 1-8 0V7Z" />
      <path d="M12 15v6" />
    </svg>
  );
}

export function IconHome(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M6 10.5V20h12v-9.5" />
      <path d="M10 20v-5h4v5" />
    </svg>
  );
}

export function IconClock(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  );
}

export function IconConvert(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <path d="M4 8h11M12 5l3 3-3 3" />
      <path d="M20 16H9M12 13l-3 3 3 3" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconFormula(props: IconProps) {
  return (
    <svg {...attrs(props)}>
      <path d="M5 6h14M5 12h9M5 18h14" />
      <path d="M16 10l3 2-3 2" />
    </svg>
  );
}

export function BrandMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <rect width="32" height="32" rx="7" fill="#0b6e63" />
      <path
        d="M6 21 L11 9 L16 18 L21 9 L26 21"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M7 24h18" stroke="#d7efe9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const BY_SLUG: Record<string, (p: IconProps) => ReactElement> = {
  "solar-payback": IconSun,
  "solar-system-size": IconPanels,
  "battery-roi": IconBattery,
  "heat-pump-vs-boiler": IconHeatPump,
  "ev-charging-cost": IconEv,
  "appliance-running-cost": IconPlug,
  "insulation-payback": IconHome,
  "tariff-comparison": IconClock,
  "kwh-cost-co2": IconConvert,
};

export function ToolIcon({
  slug,
  size = 22,
  className,
}: {
  slug: string;
  size?: number;
  className?: string;
}) {
  const Cmp = BY_SLUG[slug] ?? IconFormula;
  return <Cmp size={size} className={className} />;
}
