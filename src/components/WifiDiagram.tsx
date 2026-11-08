/**
 * Illustrative cut-away of a customer's home explaining a "bad Wi-Fi experience":
 * healthy line into the home, weak signal far from the modem, neighbouring networks
 * congesting the channel, and many devices sharing one band. Numbered markers match
 * the explanation list rendered next to it.
 */

const C = {
  line: "rgb(255 255 255 / 0.18)",
  wall: "rgb(255 255 255 / 0.28)",
  text: "#cbd5e1",
  mint: "#3ee6a8",
  sun: "#facc15",
  coral: "#f2554b",
  violet: "#c04df9",
  sky: "#3fa9f5",
  cyan: "#22d3ee",
};

function Marker({ x, y, n, color }: { x: number; y: number; n: number; color: string }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="15" fill={color} />
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
    <svg viewBox="0 0 820 470" className="h-auto w-full" role="img" aria-labelledby="wifi-diagram-title" fontFamily="Barlow, sans-serif">
      <title id="wifi-diagram-title">
        Cut-away of a home: the line into the house is healthy, but the Wi-Fi signal weakens with distance, neighbouring networks
        congest the channel, and many devices share one band.
      </title>
      <defs>
        <radialGradient id="wifi-signal" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(205 352) scale(420)">
          <stop offset="0" stopColor={C.cyan} stopOpacity="0.35" />
          <stop offset="0.55" stopColor={C.cyan} stopOpacity="0.08" />
          <stop offset="1" stopColor={C.cyan} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="neighbour-signal" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(735 330) scale(150)">
          <stop offset="0" stopColor={C.coral} stopOpacity="0.32" />
          <stop offset="1" stopColor={C.coral} stopOpacity="0" />
        </radialGradient>
        <clipPath id="house-clip">
          <path d="M120 400V200L340 70 560 200V400Z" />
        </clipPath>
      </defs>

      {/* Ground */}
      <path d="M20 400H800" stroke={C.line} strokeWidth="2" />

      {/* Neighbouring home + its router (congestion source) */}
      <g>
        <path d="M640 400V300L725 245 810 300V400" fill="rgb(255 255 255 / 0.03)" stroke={C.wall} strokeWidth="2" />
        <circle cx="735" cy="330" r="150" fill="url(#neighbour-signal)" />
        <rect x="718" y="350" width="34" height="18" rx="4" fill="none" stroke={C.coral} strokeWidth="2.5" />
        {[22, 36, 50].map((r) => (
          <path key={r} d={`M${735 - r} ${342 - r * 0.2}a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={C.coral} strokeOpacity="0.7" strokeWidth="2.5" />
        ))}
        <text x="725" y="430" textAnchor="middle" fontSize="13" fill={C.text}>
          Neighbour's Wi-Fi
        </text>
      </g>
      {/* Second neighbouring network (top right) */}
      <g>
        <circle cx="675" cy="143" r="95" fill={C.coral} fillOpacity="0.07" />
        <rect x="660" y="135" width="30" height="16" rx="4" fill="none" stroke={C.coral} strokeWidth="2.5" />
        {[18, 30].map((r) => (
          <path key={r} d={`M${675 - r} ${130 - r * 0.2}a${r} ${r} 0 0 1 ${r * 2} 0`} fill="none" stroke={C.coral} strokeOpacity="0.6" strokeWidth="2.5" />
        ))}
      </g>

      {/* Customer home */}
      <g>
        <path d="M120 400V200L340 70 560 200V400Z" fill="rgb(255 255 255 / 0.04)" stroke={C.wall} strokeWidth="3" strokeLinejoin="round" />
        {/* Wi-Fi coverage fading with distance */}
        <g clipPath="url(#house-clip)">
          <circle cx="205" cy="352" r="420" fill="url(#wifi-signal)" />
          {[60, 110, 165, 225].map((r, i) => (
            <circle key={r} cx="205" cy="352" r={r} fill="none" stroke={C.cyan} strokeOpacity={0.55 - i * 0.13} strokeWidth="2" strokeDasharray="6 7" />
          ))}
        </g>
        {/* Floors and interior walls */}
        <path d="M120 290H560" stroke={C.wall} strokeWidth="3" />
        <path d="M330 290V400M410 200V290" stroke={C.wall} strokeWidth="3" />
        <text x="225" y="392" textAnchor="middle" fontSize="12" fill="#94a3b8" letterSpacing="2">LIVING ROOM</text>
        <text x="445" y="392" textAnchor="middle" fontSize="12" fill="#94a3b8" letterSpacing="2">KITCHEN</text>
        <text x="485" y="282" textAnchor="middle" fontSize="12" fill="#94a3b8" letterSpacing="2">BEDROOM</text>

        {/* Modem */}
        <rect x="182" y="343" width="46" height="22" rx="5" fill="#0b0e27" stroke={C.cyan} strokeWidth="2.5" />
        <circle cx="194" cy="354" r="3" fill={C.mint} />
        <circle cx="205" cy="354" r="3" fill={C.mint} />
        <circle cx="216" cy="354" r="3" fill={C.sun} />
        <text x="205" y="335" textAnchor="middle" fontSize="13" fontWeight="700" fill="#ffffff">Modem</text>

        {/* Devices near the modem: crowded band */}
        <Device x={150} y={318} kind="phone" color={C.violet} />
        <Device x={262} y={322} kind="tablet" color={C.violet} />
        <Device x={290} y={360} kind="phone" color={C.violet} />
        <Device x={150} y={372} kind="phone" color={C.violet} />
        <Bars x={140} y={300} level={4} color={C.mint} />

        {/* TV in kitchen: OK-ish */}
        <Device x={445} y={350} kind="tv" color={C.sun} />
        <Bars x={432} y={322} level={2} color={C.sun} />

        {/* Laptop far upstairs: weak signal */}
        <Device x={485} y={245} kind="laptop" color={C.coral} />
        <Bars x={472} y={220} level={1} color={C.coral} />
      </g>

      {/* Line into the home: healthy */}
      <g>
        <path d="M20 352H120M120 352H182" stroke={C.mint} strokeWidth="4" strokeDasharray="10 7" />
        <text x="60" y="340" textAnchor="middle" fontSize="13" fontWeight="700" fill={C.mint}>Line OK</text>
      </g>

      {/* Numbered markers */}
      <Marker x={62} y={378} n={1} color={C.mint} />
      <Marker x={520} y={218} n={2} color={C.sun} />
      <Marker x={640} y={205} n={3} color={C.coral} />
      <Marker x={110} y={300} n={4} color={C.violet} />
    </svg>
  );
}
