'use client';

import { useEffect, useRef } from 'react';

type Node = { x: number; y: number };
type Edge = { a: number; b: number; length: number };
type Packet = {
  edgeIdx: number;
  t: number;        // 0 → 1, progress along edge
  speed: number;
  direction: 1 | -1;
  color: 'teal' | 'purple';
  alive: boolean;
};

export default function NetworkGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let nodes: Node[] = [];
    let edges: Edge[] = [];
    const packets: Packet[] = [];
    let width = 0;
    let height = 0;
    let lastPacketSpawn = 0;

    const setSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const buildGrid = () => {
      // Triangulated point grid with slight jitter — looks like a network topology, not a regular grid
      const spacing = 110;
      const cols = Math.ceil(width / spacing) + 2;
      const rows = Math.ceil(height / spacing) + 2;
      nodes = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          // Offset every other row by half-spacing for a triangular layout
          const offset = r % 2 === 0 ? 0 : spacing / 2;
          const jitterX = (Math.random() - 0.5) * spacing * 0.3;
          const jitterY = (Math.random() - 0.5) * spacing * 0.3;
          nodes.push({
            x: c * spacing + offset + jitterX - spacing,
            y: r * spacing + jitterY - spacing,
          });
        }
      }

      // Build edges by connecting nodes within a distance threshold
      edges = [];
      const maxDist = spacing * 1.3;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            edges.push({ a: i, b: j, length: dist });
          }
        }
      }
    };

    const spawnPacket = () => {
      if (edges.length === 0) return;
      if (packets.filter((p) => p.alive).length >= 4) return; // cap at 4 simultaneous packets

      // Pick a random edge that's at least partially on-screen
      let tries = 0;
      while (tries < 12) {
        const edgeIdx = Math.floor(Math.random() * edges.length);
        const e = edges[edgeIdx];
        const na = nodes[e.a];
        const nb = nodes[e.b];
        const onScreen =
          (na.x > -50 && na.x < width + 50 && na.y > -50 && na.y < height + 50) ||
          (nb.x > -50 && nb.x < width + 50 && nb.y > -50 && nb.y < height + 50);
        if (onScreen) {
          packets.push({
            edgeIdx,
            t: 0,
            speed: 0.003 + Math.random() * 0.004, // very slow drift
            direction: Math.random() > 0.5 ? 1 : -1,
            color: Math.random() > 0.7 ? 'purple' : 'teal',
            alive: true,
          });
          return;
        }
        tries++;
      }
    };

    const render = (now: number) => {
      ctx.clearRect(0, 0, width, height);

      // Draw edges (very faint)
      ctx.strokeStyle = 'rgba(30, 158, 138, 0.06)';
      ctx.lineWidth = 0.5;
      for (const edge of edges) {
        const na = nodes[edge.a];
        const nb = nodes[edge.b];
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();
      }

      // Draw nodes (subtle dots)
      ctx.fillStyle = 'rgba(30, 158, 138, 0.18)';
      for (const node of nodes) {
        if (node.x < -10 || node.x > width + 10 || node.y < -10 || node.y > height + 10) continue;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Spawn new packets occasionally
      if (now - lastPacketSpawn > 1800) {
        spawnPacket();
        lastPacketSpawn = now;
      }

      // Animate and draw packets
      for (const p of packets) {
        if (!p.alive) continue;
        p.t += p.speed * p.direction;
        if (p.t >= 1 || p.t <= 0) {
          p.alive = false;
          continue;
        }

        const edge = edges[p.edgeIdx];
        const na = nodes[edge.a];
        const nb = nodes[edge.b];
        const x = na.x + (nb.x - na.x) * p.t;
        const y = na.y + (nb.y - na.y) * p.t;

        // Fade in and out at edge endpoints
        const fade = Math.sin(p.t * Math.PI); // 0 at endpoints, 1 in middle

        // Highlight the edge the packet is traveling on
        ctx.strokeStyle =
          p.color === 'teal'
            ? `rgba(30, 158, 138, ${0.25 * fade})`
            : `rgba(184, 156, 224, ${0.25 * fade})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(na.x, na.y);
        ctx.lineTo(nb.x, nb.y);
        ctx.stroke();

        // Trail
        const trailLength = 0.08;
        const trailT = Math.max(0, p.t - trailLength * p.direction);
        const tx = na.x + (nb.x - na.x) * trailT;
        const ty = na.y + (nb.y - na.y) * trailT;
        const gradient = ctx.createLinearGradient(tx, ty, x, y);
        const trailColor = p.color === 'teal' ? '30, 158, 138' : '184, 156, 224';
        gradient.addColorStop(0, `rgba(${trailColor}, 0)`);
        gradient.addColorStop(1, `rgba(${trailColor}, ${0.7 * fade})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tx, ty);
        ctx.lineTo(x, y);
        ctx.stroke();

        // Packet head — bright dot with subtle glow
        const headColor = p.color === 'teal' ? '30, 158, 138' : '184, 156, 224';
        ctx.shadowBlur = 8;
        ctx.shadowColor = `rgba(${headColor}, ${0.8 * fade})`;
        ctx.fillStyle = `rgba(${headColor}, ${0.95 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Garbage collect dead packets
      for (let i = packets.length - 1; i >= 0; i--) {
        if (!packets[i].alive) packets.splice(i, 1);
      }

      animationRef.current = requestAnimationFrame(render);
    };

    const handleResize = () => {
      setSize();
      buildGrid();
      packets.length = 0;
    };

    setSize();
    buildGrid();
    animationRef.current = requestAnimationFrame(render);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.9 }}
      aria-hidden="true"
    />
  );
}
