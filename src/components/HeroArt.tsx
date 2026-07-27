/** Animated full-bleed technical diagram for the home hero. */
export function HeroArt() {
  return (
    <svg
      className="hero-art h-full w-full"
      viewBox="0 0 640 520"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <defs>
        <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#0b6e63" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#085249" stopOpacity="0.55" />
        </linearGradient>
        <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0b6e63" stopOpacity="0" />
          <stop offset="40%" stopColor="#0b6e63" />
          <stop offset="100%" stopColor="#0b6e63" stopOpacity="0.2" />
        </linearGradient>
      </defs>

      {/* soft field */}
      <rect x="40" y="40" width="560" height="440" rx="8" stroke="#cfd7df" strokeDasharray="4 6" className="draw-rect" />

      {/* sun */}
      <g className="spin-slow origin-center" style={{ transformOrigin: "520px 110px" }}>
        <circle cx="520" cy="110" r="28" stroke="#0b6e63" strokeWidth="2.5" fill="#d7efe9" />
        <g stroke="#0b6e63" strokeWidth="2" strokeLinecap="round">
          <path d="M520 62v12M520 146v12M472 110h12M556 110h12M486 76l8 8M546 136l8 8M486 144l8-8M546 84l8-8" />
        </g>
      </g>

      {/* roof + panels */}
      <path d="M90 250 L250 130 L410 250" stroke="#15202b" strokeWidth="3" className="draw-path" />
      <path d="M110 250 V360 H390 V250" stroke="#15202b" strokeWidth="2.5" />
      <g className="panel-pulse">
        <rect x="160" y="175" width="70" height="48" rx="2" fill="url(#panelGrad)" transform="skewY(-18) translate(0 48)" />
        <rect x="240" y="175" width="70" height="48" rx="2" fill="url(#panelGrad)" transform="skewY(-18) translate(0 48)" />
        <path d="M168 198 H222 M168 210 H222 M190 186 V222 M205 186 V222" stroke="#d7efe9" strokeOpacity="0.55" strokeWidth="1" transform="skewY(-18) translate(0 48)" />
        <path d="M248 198 H302 M248 210 H302 M270 186 V222 M285 186 V222" stroke="#d7efe9" strokeOpacity="0.55" strokeWidth="1" transform="skewY(-18) translate(0 48)" />
      </g>

      {/* meter / formula block */}
      <g className="float-y">
        <rect x="430" y="250" width="150" height="110" rx="4" fill="#15202b" />
        <text x="446" y="278" fill="#8fd0c4" fontFamily="ui-monospace, monospace" fontSize="11">
          payback =
        </text>
        <text x="446" y="300" fill="#ffffff" fontFamily="ui-monospace, monospace" fontSize="12">
          cost / saving
        </text>
        <text x="446" y="328" fill="#d7efe9" fontFamily="ui-monospace, monospace" fontSize="11">
          yr 1 → yr 25
        </text>
        <circle cx="556" cy="330" r="5" fill="#0b6e63" className="blink-dot" />
      </g>

      {/* cumulative curve */}
      <path
        d="M90 400 C 160 410, 200 390, 250 360 S 340 280, 400 250 S 500 210, 560 180"
        stroke="url(#lineGrad)"
        strokeWidth="3"
        className="draw-curve"
      />
      <circle cx="400" cy="250" r="6" fill="#085249" className="pulse-ring" />
      <text x="410" y="242" fill="#085249" fontFamily="ui-monospace, monospace" fontSize="11" className="fade-later">
        break-even
      </text>

      {/* floating symbols */}
      <g className="drift-a" opacity="0.85">
        <rect x="70" y="70" width="36" height="20" rx="3" stroke="#0b6e63" strokeWidth="1.5" fill="#f7f9fb" />
        <path d="M78 80h8M90 80h8" stroke="#0b6e63" strokeWidth="1.5" />
      </g>
      <g className="drift-b" opacity="0.85">
        <circle cx="360" cy="90" r="14" stroke="#0b6e63" strokeWidth="1.5" fill="#d7efe9" />
        <path d="M360 84v6l4 3" stroke="#085249" strokeWidth="1.5" />
      </g>
    </svg>
  );
}
