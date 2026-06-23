'use client';

import { useState } from 'react';

type ViewKey = 'emr' | 'wifi';

// ── Shared style tokens (mirrors PatientFlowDiagram) ──────────────────────────
const s = {
  tealRect:   { fill: 'rgb(var(--accent-teal-rgb) / 0.08)',          stroke: 'rgb(var(--accent-teal-rgb) / 0.50)'          },
  purpleRect: { fill: 'rgb(var(--accent-purple-bright-rgb) / 0.08)', stroke: 'rgb(var(--accent-purple-bright-rgb) / 0.50)' },
  tealTitle:  { fill: 'var(--accent-teal)' },
  purpleText: { fill: 'var(--accent-purple-soft)' },
  sublabel:   { fill: 'var(--text-tertiary)' },
  caption:    { fill: 'var(--text-tertiary)' },
  separator:  { stroke: 'var(--border-subtle)' },
};

export default function ArchitectureToggle() {
  const [view, setView] = useState<ViewKey>('emr');

  return (
    <div>
      {/* Tab strip */}
      <div className="mb-3 inline-flex rounded-md border border-border-subtle bg-bg-secondary p-0.5">
        <button
          onClick={() => setView('emr')}
          className={`rounded px-3 py-1.5 font-mono text-[11px] transition-all ${
            view === 'emr'
              ? 'bg-accent-teal/15 text-accent-teal'
              : 'text-text-tertiary hover:text-text-secondary'
          }`}
        >
          App Stack
        </button>
        <button
          onClick={() => setView('wifi')}
          className={`rounded px-3 py-1.5 font-mono text-[11px] transition-all ${
            view === 'wifi'
              ? 'bg-accent-teal/15 text-accent-teal'
              : 'text-text-tertiary hover:text-text-secondary'
          }`}
        >
          Wi-Fi 6 Mesh
        </button>
      </div>

      {/* Diagram panel */}
      <div className="ac-card !p-5">
        {view === 'emr' ? <EmrDiagram /> : <WifiDiagram />}
      </div>
    </div>
  );
}

function EmrDiagram() {
  return (
    <svg width="100%" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" className="block">
      {/* Caption */}
      <text x="350" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" style={s.caption}>
        LAN-only · No internet · Offline-first
      </text>
      {/* Separator */}
      <line x1="20" y1="36" x2="690" y2="36" strokeWidth="0.5" strokeDasharray="2,2" style={s.separator} />

      {/* Horizontal connections — teal */}
      <line x1="120" y1="100" x2="220" y2="100" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.6" style={{ stroke: 'var(--accent-teal)' }} />
      <line x1="340" y1="100" x2="440" y2="100" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.6" style={{ stroke: 'var(--accent-teal)' }} />
      <line x1="560" y1="100" x2="640" y2="100" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.6" style={{ stroke: 'var(--accent-teal)' }} />
      {/* Vertical drop lines — purple */}
      <line x1="280" y1="125" x2="280" y2="170" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.6" style={{ stroke: 'var(--accent-purple-bright)' }} />
      <line x1="500" y1="125" x2="500" y2="170" strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.6" style={{ stroke: 'var(--accent-purple-bright)' }} />

      {/* Node: Volunteer Workstation */}
      <rect x="20" y="75" width="100" height="50" rx="6" strokeWidth="1" style={s.tealRect} />
      <text x="70" y="95"  textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" style={s.tealTitle}>Volunteer</text>
      <text x="70" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9"  style={s.sublabel}>Workstation</text>

      {/* Node: React UI */}
      <rect x="220" y="75" width="120" height="50" rx="6" strokeWidth="1" style={s.tealRect} />
      <text x="280" y="95"  textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" style={s.tealTitle}>React UI</text>
      <text x="280" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9"  style={s.sublabel}>Static files</text>

      {/* Node: Node.js */}
      <rect x="440" y="75" width="120" height="50" rx="6" strokeWidth="1" style={s.tealRect} />
      <text x="500" y="95"  textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" style={s.tealTitle}>Node.js</text>
      <text x="500" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9"  style={s.sublabel}>systemd service</text>

      {/* Node: DB */}
      <rect x="640" y="75" width="50" height="50" rx="6" strokeWidth="1" style={s.tealRect} />
      <text x="665" y="95"  textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" style={s.tealTitle}>DB</text>
      <text x="665" y="110" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="8"  style={s.sublabel}>SQLite</text>

      {/* Sub-tag: RBAC — purple */}
      <rect x="220" y="170" width="120" height="22" rx="4" strokeWidth="1" style={s.purpleRect} />
      <text x="280" y="184" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" style={s.purpleText}>RBAC · 3 tiers</text>

      {/* Sub-tag: Hourly backup — purple */}
      <rect x="440" y="170" width="120" height="22" rx="4" strokeWidth="1" style={s.purpleRect} />
      <text x="500" y="184" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9" style={s.purpleText}>Hourly backup · SQLite API</text>
    </svg>
  );
}

function WifiDiagram() {
  const buildings = [
    { x: 20,  label: 'Bldg A' },
    { x: 160, label: 'Bldg B' },
    { x: 290, label: 'Bldg C' },
    { x: 420, label: 'Bldg D' },
    { x: 560, label: 'Bldg E' },
  ];

  // Fan lines spread across the 160-wide Core Switch box (x: 270–430, centre: 350)
  const fanX = [290, 315, 350, 385, 410];
  const buildingCenters = buildings.map((b) => b.x + 60);

  return (
    <svg width="100%" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" className="block">
      {/* Caption */}
      <text x="350" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10" style={s.caption}>
        50,000 sq ft · 5 buildings · Segmented VLANs
      </text>
      {/* Separator */}
      <line x1="20" y1="36" x2="690" y2="36" strokeWidth="0.5" strokeDasharray="2,2" style={s.separator} />

      {/* Node: Core Switch */}
      <rect x="270" y="55" width="160" height="50" rx="6" strokeWidth="1" style={s.tealRect} />
      <text x="350" y="75" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" style={s.tealTitle}>Core Switch</text>
      <text x="350" y="91" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9"  style={s.sublabel}>DHCP · DNS · VLAN trunk</text>

      {/* Fan connections */}
      {buildings.map((b, i) => (
        <line key={i}
          x1={fanX[i]} y1="105"
          x2={buildingCenters[i]} y2="165"
          strokeWidth="1" strokeDasharray="3,3" strokeOpacity="0.6"
          style={{ stroke: 'var(--accent-teal)' }}
        />
      ))}

      {/* Building nodes */}
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="165" width="120" height="50" rx="6" strokeWidth="1" style={s.tealRect} />
          <text x={b.x + 60} y="185" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="11" fontWeight="600" style={s.tealTitle}>{b.label}</text>
          <text x={b.x + 60} y="200" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9"  style={s.sublabel}>Wi-Fi 6 AP</text>
        </g>
      ))}
    </svg>
  );
}
