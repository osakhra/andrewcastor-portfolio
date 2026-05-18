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
      <text x="350" y="22" textAnchor="middle" fill="#5A6577" fontFamily="JetBrains Mono" fontSize="10">
        LAN-only · No internet · Offline-first
      </text>
      <line x1="20" y1="36" x2="690" y2="36" stroke="#1E2737" strokeWidth="0.5" strokeDasharray="2,2" />

      <line x1="120" y1="100" x2="220" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="340" y1="100" x2="440" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="560" y1="100" x2="640" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="280" y1="125" x2="280" y2="170" stroke="#5B2D8E" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="500" y1="125" x2="500" y2="170" stroke="#5B2D8E" strokeWidth="1" strokeDasharray="3,3" />

      <rect x="20" y="75" width="100" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="70" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">Volunteer</text>
      <text x="70" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">Workstation</text>

      <rect x="220" y="75" width="120" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="280" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">Apache + TLS</text>
      <text x="280" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">Private CA · UFW</text>

      <rect x="440" y="75" width="120" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="500" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">OpenEMR 7.0</text>
      <text x="500" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">PHP 8.1 · 6 stations</text>

      <rect x="640" y="75" width="50" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="665" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">DB</text>
      <text x="665" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="8">MariaDB</text>

      <rect x="220" y="170" width="120" height="22" rx="4" fill="#0D1117" stroke="#5B2D8E" strokeWidth="1" />
      <text x="280" y="184" textAnchor="middle" fill="#B89CE0" fontFamily="JetBrains Mono" fontSize="9">RBAC · 6 roles</text>

      <rect x="440" y="170" width="120" height="22" rx="4" fill="#0D1117" stroke="#5B2D8E" strokeWidth="1" />
      <text x="500" y="184" textAnchor="middle" fill="#B89CE0" fontFamily="JetBrains Mono" fontSize="9">Daily backup · cron</text>
    </svg>
  );
}

function WifiDiagram() {
  return (
    <svg width="100%" viewBox="0 0 700 220" xmlns="http://www.w3.org/2000/svg" className="block">
      <text x="350" y="22" textAnchor="middle" fill="#5A6577" fontFamily="JetBrains Mono" fontSize="10">
        50,000 sq ft · 5 buildings · Segmented VLANs
      </text>
      <line x1="20" y1="36" x2="690" y2="36" stroke="#1E2737" strokeWidth="0.5" strokeDasharray="2,2" />

      {/* Core */}
      <rect x="290" y="55" width="120" height="40" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
      <text x="350" y="72" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">Core Switch</text>
      <text x="350" y="86" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">DHCP · DNS · VLAN trunk</text>

      {/* Connections fanning out */}
      <line x1="290" y1="95" x2="80" y2="155" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="320" y1="95" x2="220" y2="155" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="350" y1="95" x2="350" y2="155" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="380" y1="95" x2="480" y2="155" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
      <line x1="410" y1="95" x2="620" y2="155" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />

      {/* 5 access points */}
      {[
        { x: 20, label: 'Bldg A' },
        { x: 160, label: 'Bldg B' },
        { x: 290, label: 'Bldg C' },
        { x: 420, label: 'Bldg D' },
        { x: 560, label: 'Bldg E' },
      ].map((b, i) => (
        <g key={i}>
          <rect x={b.x} y="155" width="120" height="40" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
          <text x={b.x + 60} y="172" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">{b.label}</text>
          <text x={b.x + 60} y="186" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">Wi-Fi 6 AP</text>
        </g>
      ))}
    </svg>
  );
}
