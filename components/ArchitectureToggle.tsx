'use client';

import { useState } from 'react';

type ViewKey = 'emr' | 'wifi';

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
          EMR Stack
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

      {/* Diagram */}
      <div className="ac-card !p-5">
        {view === 'emr' ? <EmrDiagram /> : <WifiDiagram />}
      </div>
    </div>
  );
}

function EmrDiagram() {
  return (
    <svg width="100%" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" className="block">
      {/* Caption — theme-aware text */}
      <text x="350" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10"
        style={{ fill: 'var(--text-tertiary)' }}>
        LAN-only · No internet · Offline-first
      </text>
      {/* Separator — theme-aware border */}
      <line x1="20" y1="36" x2="690" y2="36" strokeWidth="0.5" strokeDasharray="2,2"
        style={{ stroke: 'var(--border-subtle)' }} />

      {/* Horizontal connection lines */}
      <line x1="120" y1="100" x2="220" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="340" y1="100" x2="440" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="560" y1="100" x2="640" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      {/* Vertical drop lines to sub-tags */}
      <line x1="280" y1="125" x2="280" y2="170" stroke="#5B2D8E" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="500" y1="125" x2="500" y2="170" stroke="#5B2D8E" strokeWidth="1" strokeDasharray="3,3" />

      {/* Node: Volunteer Workstation */}
      <rect x="20" y="75" width="100" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="70" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">Volunteer</text>
      <text x="70" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">Workstation</text>

      {/* Node: Apache + TLS */}
      <rect x="220" y="75" width="120" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="280" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">Apache + TLS</text>
      <text x="280" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">Private CA · UFW</text>

      {/* Node: OpenEMR 7.0 */}
      <rect x="440" y="75" width="120" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="500" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">OpenEMR 7.0</text>
      <text x="500" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">PHP 8.1 · 6 stations</text>

      {/* Node: DB */}
      <rect x="640" y="75" width="50" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="665" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">DB</text>
      <text x="665" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="8">MariaDB</text>

      {/* Sub-tag: RBAC */}
      <rect x="220" y="170" width="120" height="22" rx="4" fill="#0D1117" stroke="#5B2D8E" strokeWidth="1" />
      <text x="280" y="184" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9"
        style={{ fill: 'var(--accent-purple-soft)' }}>RBAC · 6 roles</text>

      {/* Sub-tag: Daily backup */}
      <rect x="440" y="170" width="120" height="22" rx="4" fill="#0D1117" stroke="#5B2D8E" strokeWidth="1" />
      <text x="500" y="184" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="9"
        style={{ fill: 'var(--accent-purple-soft)' }}>Daily backup · cron</text>
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

  // Fan lines spread evenly across the wider Core Switch box (x: 270–430)
  const fanX = [290, 315, 350, 385, 410];
  // Each building node is 120 wide, so its center is x + 60
  const buildingCenters = buildings.map((b) => b.x + 60);

  return (
    <svg width="100%" viewBox="0 0 700 230" xmlns="http://www.w3.org/2000/svg" className="block">
      {/* Caption — theme-aware text */}
      <text x="350" y="22" textAnchor="middle" fontFamily="JetBrains Mono" fontSize="10"
        style={{ fill: 'var(--text-tertiary)' }}>
        50,000 sq ft · 5 buildings · Segmented VLANs
      </text>
      {/* Separator — theme-aware border */}
      <line x1="20" y1="36" x2="690" y2="36" strokeWidth="0.5" strokeDasharray="2,2"
        style={{ stroke: 'var(--border-subtle)' }} />

      {/* Node: Core Switch — widened to 160 to fit subtitle */}
      <rect x="270" y="55" width="160" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="350" y="75" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">Core Switch</text>
      <text x="350" y="91" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">DHCP · DNS · VLAN trunk</text>

      {/* Fan connections from Core Switch to each building */}
      {buildings.map((b, i) => (
        <line key={i}
          x1={fanX[i]} y1="105"
          x2={buildingCenters[i]} y2="165"
          stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3"
        />
      ))}

      {/* Building nodes */}
      {buildings.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="165" width="120" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
          <text x={b.x + 60} y="185" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">{b.label}</text>
          <text x={b.x + 60} y="200" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">Wi-Fi 6 AP</text>
        </g>
      ))}
    </svg>
  );
}
