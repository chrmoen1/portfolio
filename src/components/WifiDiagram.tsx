/**
 * Illustrative path from the core network to a customer's devices. A "bad Wi-Fi"
 * complaint could come from any layer: (1) core network, (2) optical fibre signal,
 * (3) WAN speed at the modem, (4) Wi-Fi congestion, (5) Wi-Fi interference / weak signal.
 * Numbered markers match the explanation list rendered next to it.
 */

const C = {
  line: "rgb(255 255 255 / 0.18)",
  wall: "rgb(255 255 255 / 0.28)",
  text: "#cbd5e1",
  muted: "#94a3b8",
  sky: "#3fa9f5",
  sun: "#facc15",
  cyan: "#22d3ee",
  coral: "#f2554b",
  violet: "#c04df9",
};

function Marker({ x, y, n, color }: { x: number; y: number; n: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="15" fill={color} stroke="#0b0e27" strokeWidth="3" />
      <text y="5.5" textAnchor="middle" fontSize="16" fontWeight="800" fill="#0b0e27">
        {n}
      </text>
    </g>
  );
}

/** Signal bars: `level` of 4 filled. */
function Bars({ x, y, level, color }: { x: number; y: number; level: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={i * 7} y={-6 - i * 5} width="5" height={6 + i * 5} rx="1" fill={i < level ? color : "rgb(255 255 255 / 0.2)"} />
      ))}
    </g>
  );
}

function Device({ x, y, kind, color }: { x: number; y: number; kind: "phone" | "laptop" | "tv" | "tablet"; color: string }) {
  const s = { fill: "none", stroke: color, strokeWidth: 2.5, strokeLinejoin: "round" as const };
  return (
    <g transform={`translate(${x} ${y})`}>
      {kind === "phone" && <rect x="-7" y="-13" width="14" height="26" rx="3" {...s} />}
      {kind === "tablet" && <rect x="-11" y="-14" width="22" height="28" rx="3" {...s} />}
      {kind === "laptop" && (
        <>
          <rect x="-15" y="-12" width="30" height="19" rx="2" {...s} />
          <path d="M-20 10h40" {...s} />
        </>
      )}
      {kind === "tv" && (
        <>
          <rect x="-20" y="-14" width="40" height="25" rx="2" {...s} />
          <path d="M-8 16h16" {...s} />
        </>
      )}
    </g>
  );
}

export default function WifiDiagram() {
  return (
    <svg viewBox="0 0 900 470" className="h-auto w-full" role="img" aria-labelledby="wifi-diagram-title" fontFamily="Barlow, sans-serif">
      <title id="wifi-diagram-title">
        The path from the core network to a customer's devices: core network, fibre line, modem and WAN connection, and Wi-Fi inside
        the home, where congestion and interference can also degrade the experience.
      </title>
      <defs>
        <radialGradient id="wifi-signal" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(305 352) scale(420)">
          <stop offset="0" stopColor={C.cyan} stopOpacity="0.32" />
          <stop offset="0.55" stopColor={C.cyan} stopOpacity="0.07" />
          <stop offset="1" stopColor={C.cyan} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="neighbour-signal" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(780 330) scale(110)">
          <stop offset="0" stopColor={C.coral} stopOpacity="0.32" />
          <stop offset="1" stopColor={C.coral} stopOpacity="0" />
        </radialGradient>
        <clipPath id="house-clip">
          <path d="M220 400V200L440 70 660 200V400Z" />
        </clipPath>
      </defs>

      {/* Ground */}
      <path d="M10 400H890" stroke={C.line} strokeWidth="2" />

      {/* 1. Core network */}
      <g>
        <path
          d="M40 150a28 28 0 0 1 30-26 36 36 0 0 1 66 6 24 24 0 0 1 8 47H52a26 26 0 0 1-12-27z"
          fill="rgb(63 169 245 / 0.12)"
          stroke={C.sky}
          strokeWidth="2.5"
        />
        <text x="92" y="160" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">Core network</text>
      </g>

      {/* 2. Fibre line into the home */}
      <g>
        <path d="M92 178V352H282" fill="none" stroke={C.sun} strokeWidth="4" strokeDasharray="10 7" />
        <text x="150" y="342" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.sun}>Fibre line</text>
      </g>

      {/* Neighbouring home + router (congestion) */}
      <g>
        <path d="M700 400V300L780 245 860 300V400" fill="rgb(255 255 255 / 0.03)" stroke={C.wall} strokeWidth="2" />
        <circle cx="780" cy="330" r="110" fill="url(#neighbour-signal)" />
        <rect x="763" y="350" width="34" height="18" rx="4" fill="none" stroke={C.coral} strokeWidth="2.5" />
        {[22, 36, 50].map((r) => (
          <path key={r} d={`M${780 - r} ${342 - r * 0.2}a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={C.coral} strokeOpacity="0.7" strokeWidth="2.5" />
        ))}
        <text x="780" y="428" textAnchor="middle" fontSize="13" fill={C.text}>Neighbour's Wi-Fi</text>
      </g>
      <g>
        <circle cx="770" cy="143" r="80" fill={C.coral} fillOpacity="0.07" />
        <rect x="755" y="135" width="30" height="16" rx="4" fill="none" stroke={C.coral} strokeWidth="2.5" />
        {[18, 30].map((r) => (
          <path key={r} d={`M${770 - r} ${130 - r * 0.2}a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={C.coral} strokeOpacity="0.6" strokeWidth="2.5" />
        ))}
      </g>

      {/* Customer home */}
      <g>
        <path d="M220 400V200L440 70 660 200V400Z" fill="rgb(255 255 255 / 0.04)" stroke={C.wall} strokeWidth="3" strokeLinejoin="round" />
        <g clipPath="url(#house-clip)">
          <circle cx="305" cy="352" r="420" fill="url(#wifi-signal)" />
          {[60, 110, 165, 225].map((r, i) => (
            <circle key={r} cx="305" cy="352" r={r} fill="none" stroke={C.cyan} strokeOpacity={0.55 - i * 0.13} strokeWidth="2" strokeDasharray="6 7" />
          ))}
        </g>
        <path d="M220 290H660" stroke={C.wall} strokeWidth="3" />
        <path d="M430 290V400M510 200V290" stroke={C.wall} strokeWidth="3" />
        <text x="372" y="392" textAnchor="middle" fontSize="12" fill={C.muted} letterSpacing="2">LIVING ROOM</text>
        <text x="545" y="392" textAnchor="middle" fontSize="12" fill={C.muted} letterSpacing="2">KITCHEN</text>
        <text x="585" y="282" textAnchor="middle" fontSize="12" fill={C.muted} letterSpacing="2">BEDROOM</text>

        {/* 3. Modem (WAN) */}
        <rect x="282" y="341" width="48" height="24" rx="5" fill="#0b0e27" stroke={C.cyan} strokeWidth="2.5" />
        <circle cx="295" cy="353" r="3" fill={C.cyan} />
        <circle cx="306" cy="353" r="3" fill={C.cyan} />
        <circle cx="317" cy="353" r="3" fill={C.sun} />
        <text x="306" y="333" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">Modem · WAN</text>

        {/* Devices crowding the band near the modem (congestion) */}
        <Device x={250} y={318} kind="phone" color={C.coral} />
        <Device x={362} y={322} kind="tablet" color={C.coral} />
        <Device x={392} y={358} kind="phone" color={C.coral} />
        <Device x={250} y={374} kind="phone" color={C.coral} />

        <Device x={545} y={350} kind="tv" color={C.text} />
        <Bars x={532} y={322} level={3} color={C.cyan} />

        {/* Far device with weak, noisy signal (interference) */}
        <Device x={585} y={245} kind="laptop" color={C.violet} />
        <Bars x={572} y={220} level={1} color={C.violet} />
        <path d="M535 238l6-8 6 8 6-8 6 8M535 256l6-8 6 8 6-8 6 8" fill="none" stroke={C.violet} strokeWidth="2.2" strokeLinejoin="round" opacity="0.85" />
      </g>

      {/* Numbered markers: possible causes along the path */}
      <Marker x={150} y={120} n={1} color={C.sky} />
      <Marker x={120} y={372} n={2} color={C.sun} />
      <Marker x={345} y={300} n={3} color={C.cyan} />
      <Marker x={700} y={215} n={4} color={C.coral} />
      <Marker x={625} y={218} n={5} color={C.violet} />
    </svg>
  );
}
