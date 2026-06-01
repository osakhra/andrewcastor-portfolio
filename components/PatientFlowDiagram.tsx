'use client';

import { useEffect, useRef, useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type Station = {
  id: string;
  label: string;
  sublabel: string;
  x: number;
  y: number;
  color: 'teal' | 'purple';
};

type PacketColor = 'silver' | 'teal' | 'purple';

type EdgeDef = {
  from: string;
  to: string;
  weight: number;       // how OFTEN this route fires (relative dot count)
  color: PacketColor;
  speed?: number;       // how FAST dots move on this route (per-frame t step).
                        // Omit to use BASE_SPEED. Lower = slower.
};

type Packet = {
  edgeIdx: number;
  t: number;
  alive: boolean;
};

// ─── Station layout ───────────────────────────────────────────────────────────

const STATIONS: Station[] = [
  { id: 'reg',       label: 'Registration', sublabel: 'Patient intake',        x: 90,  y: 100, color: 'teal'   },
  { id: 'triage',    label: 'Triage',       sublabel: 'Vitals & routing',       x: 250, y: 100, color: 'teal'   },
  { id: 'provider',  label: 'Provider',     sublabel: 'Medical exam',           x: 415, y: 40,  color: 'purple' },
  { id: 'dental',    label: 'Dental',       sublabel: 'Dental care',            x: 415, y: 110, color: 'purple' },
  { id: 'vision',    label: 'Vision',       sublabel: 'Eye screening',          x: 415, y: 180, color: 'purple' },
  { id: 'pharmacy',  label: 'Pharmacy',     sublabel: 'Dispensing & discharge', x: 580, y: 80,  color: 'teal'   },
  // Discharge sits directly below Pharmacy — same physical table as Registration in
  // Costa Rica; future deployments (Laredo, Philippines) may move it to its own room.
  { id: 'discharge', label: 'Discharge',    sublabel: 'Form return · food',     x: 580, y: 162, color: 'purple' },
];

// ─── Drawn edges ──────────────────────────────────────────────────────────────

// Forward flow — full-opacity dashed lines with arrowheads.
const FORWARD_EDGES: [string, string][] = [
  ['reg',      'triage'],
  ['triage',   'provider'],
  ['triage',   'dental'],
  ['triage',   'vision'],
  ['provider', 'pharmacy'],
  ['dental',   'pharmacy'],
  ['vision',   'pharmacy'],
];

// Completion flow — faint purple dashed lines (no arrowheads).
// All four lines travel rightward / downward — no crossing of the forward flow.
const RETURN_EDGES: [string, string][] = [
  ['pharmacy', 'discharge'],   // straight vertical drop — the main exit path
  ['provider', 'discharge'],   // diagonal right-down
  ['dental',   'discharge'],   // diagonal right-down
  ['vision',   'discharge'],   // nearly horizontal right
];

// ─── Packet edges with weights ────────────────────────────────────────────────
//
// Mass-conservation proof:
//   Patients enter at Registration (weight 6) and exit at Discharge (weight 6).
//
//   reg → triage                weight  6    (100% of patients enter)
//   triage → each clinic        weight  2    (2+2+2 = 6, all fanned out ✓)
//   clinic → pharmacy  (75%)    weight  1.5  (1.5×3 = 4.5 into pharmacy)
//   clinic → discharge (25%)    weight  0.5  (0.5×3 = 1.5 direct to discharge)
//   pharmacy → discharge        weight  4.5  (all pharmacy patients complete)
//
//   Total into discharge: 1.5 + 4.5 = 6 = input ✓  (no patient lost or created)
//
// Colors:
//   silver  — neutral entry (reg → triage)
//   teal    — active treatment (triage → clinics → pharmacy)
//   purple  — completion / discharge (anything → discharge)

const PACKET_EDGES: EdgeDef[] = [
  { from: 'reg',       to: 'triage',    weight: 6,   color: 'silver' },
  { from: 'triage',    to: 'provider',  weight: 2,   color: 'teal'   },
  { from: 'triage',    to: 'dental',    weight: 2,   color: 'teal'   },
  { from: 'triage',    to: 'vision',    weight: 2,   color: 'teal'   },
  { from: 'provider',  to: 'pharmacy',  weight: 1.5, color: 'teal'   },
  { from: 'dental',    to: 'pharmacy',  weight: 1.5, color: 'teal'   },
  { from: 'vision',    to: 'pharmacy',  weight: 1.5, color: 'teal'   },
  { from: 'provider',  to: 'discharge', weight: 0.5, color: 'purple' },
  { from: 'dental',    to: 'discharge', weight: 0.5, color: 'purple' },
  { from: 'vision',    to: 'discharge', weight: 0.5, color: 'purple' },
  { from: 'pharmacy',  to: 'discharge', weight: 4.5, color: 'purple', speed: 0.0035 },
];

const TOTAL_WEIGHT = PACKET_EDGES.reduce((s, e) => s + e.weight, 0);

const NODE_W     = 100;
const NODE_H     = 42;
const CANVAS_H   = 250;
const BASE_SPEED = 0.006;   // default per-frame travel step for every route

// ─── Component ────────────────────────────────────────────────────────────────

export default function PatientFlowDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>();
  const [active, setActive] = useState<string | null>(null);

  const getCenter = (s: Station) => ({ x: s.x + NODE_W / 2, y: s.y + NODE_H / 2 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W   = canvas.offsetWidth;
    canvas.width  = W   * dpr;
    canvas.height = CANVAS_H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const packets: Packet[] = [];
    let last = 0;

    // Weighted random spawn — heavier edges fire more often, proportional to flow.
    // Hard rule: at most ONE orb per line. Any edge that still has a live orb on it
    // is excluded from the draw, so a node never appears to emit two patients onto
    // the same line at once. If every candidate line is occupied, we spawn nothing
    // this tick (the next 700 ms check tries again).
    const spawnPacket = () => {
      const occupied = new Set(
        packets.filter(p => p.alive).map(p => p.edgeIdx)
      );
      const available = PACKET_EDGES
        .map((edge, i) => ({ edge, i }))
        .filter(({ i }) => !occupied.has(i));
      if (available.length === 0) return;

      const totalWeight = available.reduce((s, { edge }) => s + edge.weight, 0);
      let r = Math.random() * totalWeight;
      let idx = available[available.length - 1].i;
      for (const { edge, i } of available) {
        r -= edge.weight;
        if (r <= 0) { idx = i; break; }
      }
      packets.push({ edgeIdx: idx, t: 0, alive: true });
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, W, CANVAS_H);

      // ── Forward edges: dashed lines + arrowheads ───────────────────────────
      for (const [fromId, toId] of FORWARD_EDGES) {
        const from = STATIONS.find(s => s.id === fromId)!;
        const to   = STATIONS.find(s => s.id === toId)!;
        const fc   = getCenter(from);
        const tc   = getCenter(to);

        ctx.strokeStyle = 'rgba(168, 178, 191, 0.18)';
        ctx.lineWidth   = 1.5;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(fc.x, fc.y);
        ctx.lineTo(tc.x, tc.y);
        ctx.stroke();
        ctx.setLineDash([]);

        const angle = Math.atan2(tc.y - fc.y, tc.x - fc.x);
        ctx.fillStyle = 'rgba(168, 178, 191, 0.35)';
        ctx.beginPath();
        ctx.moveTo(tc.x - 6 * Math.cos(angle) + 4 * Math.sin(angle),
                   tc.y - 6 * Math.sin(angle) - 4 * Math.cos(angle));
        ctx.lineTo(tc.x - 10 * Math.cos(angle), tc.y - 10 * Math.sin(angle));
        ctx.lineTo(tc.x - 6 * Math.cos(angle) - 4 * Math.sin(angle),
                   tc.y - 6 * Math.sin(angle) + 4 * Math.cos(angle));
        ctx.fill();
      }

      // ── Return edges: faint purple dashes — packet path surface ───────────
      for (const [fromId, toId] of RETURN_EDGES) {
        const from = STATIONS.find(s => s.id === fromId)!;
        const to   = STATIONS.find(s => s.id === toId)!;
        const fc   = getCenter(from);
        const tc   = getCenter(to);

        ctx.strokeStyle = 'rgba(184, 156, 224, 0.14)';
        ctx.lineWidth   = 1;
        ctx.setLineDash([3, 6]);
        ctx.beginPath();
        ctx.moveTo(fc.x, fc.y);
        ctx.lineTo(tc.x, tc.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // ── Spawn up to 6 live packets every ~700 ms ───────────────────────────
      if (now - last > 700) {
        if (packets.filter(p => p.alive).length < 6) spawnPacket();
        last = now;
      }

      // ── Animate packets ────────────────────────────────────────────────────
      for (const p of packets) {
        const edge = PACKET_EDGES[p.edgeIdx];
        p.t += edge.speed ?? BASE_SPEED;
        if (p.t >= 1) { p.alive = false; continue; }

        const from = STATIONS.find(s => s.id === edge.from)!;
        const to   = STATIONS.find(s => s.id === edge.to)!;
        const fc   = getCenter(from);
        const tc   = getCenter(to);
        const x    = fc.x + (tc.x - fc.x) * p.t;
        const y    = fc.y + (tc.y - fc.y) * p.t;
        // Fade in over the first 20% of travel, then stay fully opaque through
        // arrival so the packet visibly LANDS on the destination node instead of
        // vanishing mid-edge (the old sin() curve hit zero opacity exactly at t=1).
        const fade = Math.min(p.t / 0.2, 1);

        ctx.shadowBlur = 6;
        if (edge.color === 'silver') {
          // Medium steel-gray — visible on both dark and light backgrounds.
          ctx.shadowColor = `rgba(130, 148, 166, ${0.55 * fade})`;
          ctx.fillStyle   = `rgba(130, 148, 166, ${0.90 * fade})`;
        } else if (edge.color === 'teal') {
          ctx.shadowColor = `rgba(30, 158, 138, ${0.70 * fade})`;
          ctx.fillStyle   = `rgba(30, 158, 138, ${0.90 * fade})`;
        } else {
          // Purple — completion / discharge
          ctx.shadowColor = `rgba(184, 156, 224, ${0.60 * fade})`;
          ctx.fillStyle   = `rgba(184, 156, 224, ${0.85 * fade})`;
        }
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
        <div className="relative" style={{ minWidth: 700, height: CANVAS_H }}>

          {/* Canvas for animated packets */}
          <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 w-full"
            style={{ width: '100%', height: CANVAS_H }}
            aria-hidden="true"
          />

          {/* Station nodes */}
          {STATIONS.map((s) => {
            const isPharmacy  = s.id === 'pharmacy';
            const color       = isPharmacy
              ? 'rgba(168,178,191,0.55)'
              : s.color === 'teal' ? '#1E9E8A' : '#B89CE0';
            const borderColor = isPharmacy
              ? 'rgba(168,178,191,0.30)'
              : s.color === 'teal'
                ? 'rgba(30,158,138,0.5)'
                : 'rgba(184,156,224,0.5)';
            const bg = isPharmacy
              ? 'rgba(168,178,191,0.04)'
              : s.color === 'teal'
                ? 'rgba(30,158,138,0.08)'
                : 'rgba(184,156,224,0.08)';
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
                  background: isActive && !isPharmacy
                    ? (s.color === 'teal' ? 'rgba(30,158,138,0.18)' : 'rgba(184,156,224,0.18)')
                    : bg,
                  border: `1px ${isPharmacy ? 'dashed' : 'solid'} ${borderColor}`,
                  transform: isActive && !isPharmacy ? 'scale(1.04)' : 'scale(1)',
                  boxShadow: isActive && !isPharmacy ? `0 0 16px ${borderColor}` : 'none',
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
                  {isPharmacy ? 'External · dispensing' : s.sublabel}
                </span>
              </div>
            );
          })}

          {/* Legend — bottom right */}
          <div
            className="absolute flex flex-col gap-1 font-mono"
            style={{ right: 0, bottom: 0, fontSize: 8, opacity: 0.55 }}
          >
            <span style={{ color: 'var(--text-secondary)' }}>● Entry</span>
            <span style={{ color: 'rgba(30,158,138,0.9)'  }}>● Treatment</span>
            <span style={{ color: 'rgba(184,156,224,0.9)' }}>● Discharge</span>
            <span style={{ color: 'rgba(168,178,191,0.55)' }}>⌐ External</span>
          </div>
        </div>
      </div>
    </div>
  );
}
