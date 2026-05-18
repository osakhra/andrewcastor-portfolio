'use client';

import { useEffect, useRef, useState } from 'react';

type Station = {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: 'teal' | 'purple' | 'muted';
};

const STATIONS: Station[] = [
  { id: 'reg',      label: 'Registration',  sublabel: 'Patient intake',       x: 90,  y: 100, color: 'teal'   },
  { id: 'triage',   label: 'Triage',        sublabel: 'Vitals & routing',      x: 250, y: 100, color: 'teal'   },
  { id: 'provider', label: 'Provider',      sublabel: 'Medical exam',          x: 415, y: 40,  color: 'purple' },
  { id: 'dental',   label: 'Dental',        sublabel: 'Dental care',           x: 415, y: 110, color: 'purple' },
  { id: 'vision',   label: 'Vision',        sublabel: 'Eye screening',         x: 415, y: 180, color: 'purple' },
  { id: 'pharmacy', label: 'Pharmacy',      sublabel: 'Dispensing & discharge',x: 580, y: 100, color: 'teal'   },
];

// Connections: [from, to]
const EDGES: [string, string][] = [
  ['reg',    'triage'],
  ['triage', 'provider'],
  ['triage', 'dental'],
  ['triage', 'vision'],
  ['provider','pharmacy'],
  ['dental',  'pharmacy'],
  ['vision',  'pharmacy'],
];

const NODE_W = 100;
const NODE_H = 42;

type Packet = {
  edgeIdx: number;
  t: number;
  alive: boolean;
};

export default function PatientFlowDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>();
  const [active, setActive] = useState<string | null>(null);

  const getCenter = (s: Station) => ({ x: s.x + NODE_W / 2, y: s.y + NODE_H / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const packets: Packet[] = [];
    let last = 0;

    const spawnPacket = () => {
      const edgeIdx = Math.floor(Math.random() * EDGES.length);
      packets.push({ edgeIdx, t: 0, alive: true });
    };

    const colorFor = (c: Station['color']) =>
      c === 'teal' ? '#1E9E8A' : c === 'purple' ? '#B89CE0' : '#A8B2BF';

    const render = (now: number) => {
      ctx.clearRect(0, 0, W, H);

      // Draw edges
      for (const [fromId, toId] of EDGES) {
        const from = STATIONS.find(s => s.id === fromId)!;
        const to   = STATIONS.find(s => s.id === toId)!;
        const fc = getCenter(from);
        const tc = getCenter(to);
        ctx.strokeStyle = 'rgba(168, 178, 191, 0.18)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(fc.x + 2, fc.y);
        ctx.lineTo(tc.x - 2, tc.y);
        ctx.stroke();
        ctx.setLineDash([]);

        // Arrow head
        const angle = Math.atan2(tc.y - fc.y, tc.x - fc.x);
        const ax = tc.x - 10 * Math.cos(angle);
        const ay = tc.y - 10 * Math.sin(angle);
        ctx.fillStyle = 'rgba(168, 178, 191, 0.35)';
        ctx.beginPath();
        ctx.moveTo(tc.x - 6 * Math.cos(angle) + 4 * Math.sin(angle),
                   tc.y - 6 * Math.sin(angle) - 4 * Math.cos(angle));
        ctx.lineTo(ax, ay);
        ctx.lineTo(tc.x - 6 * Math.cos(angle) - 4 * Math.sin(angle),
                   tc.y - 6 * Math.sin(angle) + 4 * Math.cos(angle));
        ctx.fill();
      }

      // Move and draw packets
      if (now - last > 800) {
        if (packets.filter(p => p.alive).length < 3) spawnPacket();
        last = now;
      }

      for (const p of packets) {
        p.t += 0.012;
        if (p.t >= 1) { p.alive = false; continue; }
        const [fromId, toId] = EDGES[p.edgeIdx];
        const from = STATIONS.find(s => s.id === fromId)!;
        const to   = STATIONS.find(s => s.id === toId)!;
        const fc = getCenter(from);
        const tc = getCenter(to);
        const x = fc.x + (tc.x - fc.x) * p.t;
        const y = fc.y + (tc.y - fc.y) * p.t;
        const fade = Math.sin(p.t * Math.PI);
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(30, 158, 138, ${0.7 * fade})`;
        ctx.fillStyle = `rgba(30, 158, 138, ${0.9 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // GC
      for (let i = packets.length - 1; i >= 0; i--) {
        if (!packets[i].alive) packets.splice(i, 1);
      }

      animRef.current = requestAnimationFrame(render);
    };

    animRef.current = requestAnimationFrame(render);
    return () => { if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, []);

  return (
    <div>
      <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
        Patient Flow · 6 Stations · EMR-Tracked
      </p>
      <div className="ac-card !p-5 overflow-x-auto">
        <div className="relative" style={{ minWidth: 700, height: 240 }}>
          {/* Canvas for animated packets */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 w-full h-full"
            style={{ width: '100%', height: '100%' }}
            aria-hidden="true"
          />
          {/* Nodes */}
          {STATIONS.map((s) => {
            const color = s.color === 'teal' ? '#1E9E8A' : s.color === 'purple' ? '#B89CE0' : '#A8B2BF';
            const borderColor = s.color === 'teal'
              ? 'rgba(30,158,138,0.5)'
              : s.color === 'purple'
                ? 'rgba(184,156,224,0.5)'
                : 'rgba(168,178,191,0.3)';
            const bg = s.color === 'teal'
              ? 'rgba(30,158,138,0.08)'
              : s.color === 'purple'
                ? 'rgba(184,156,224,0.08)'
                : 'rgba(168,178,191,0.05)';
            const isActive = active === s.id;
            return (
              <div
                key={s.id}
                onMouseEnter={() => setActive(s.id)}
                onMouseLeave={() => setActive(null)}
                className="absolute cursor-default select-none rounded-md transition-all duration-200"
                style={{
                  left: s.x,
                  top: s.y,
                  width: NODE_W,
                  height: NODE_H,
                  background: isActive ? (s.color === 'teal' ? 'rgba(30,158,138,0.18)' : 'rgba(184,156,224,0.18)') : bg,
                  border: `1px solid ${borderColor}`,
                  transform: isActive ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: isActive ? `0 0 16px ${borderColor}` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '4px 6px',
                }}
              >
                <span
                  className="font-display font-semibold leading-tight text-center"
                  style={{ fontSize: 11, color }}
                >
                  {s.label}
                </span>
                <span
                  className="font-mono leading-tight text-center text-text-tertiary"
                  style={{ fontSize: 9 }}
                >
                  {s.sublabel}
                </span>
              </div>
            );
          })}
          {/* Impact callout */}
          <div
            className="absolute rounded-md border font-mono"
            style={{
              left: 580,
              top: 165,
              width: 100,
              background: 'rgba(30,158,138,0.06)',
              border: '0.5px solid rgba(30,158,138,0.25)',
              padding: '4px 6px',
              fontSize: 9,
              color: '#1E9E8A',
              textAlign: 'center',
            }}
          >
            40% faster<br />intake
          </div>
        </div>
      </div>
    </div>
  );
}
