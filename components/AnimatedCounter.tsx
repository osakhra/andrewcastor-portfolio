'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  label: string;
  duration?: number;
};

// Parses "30–40%", "50+", "6", "0" into a target number and suffix
function parseValue(raw: string): { num: number; prefix: string; suffix: string } {
  const match = raw.match(/^([^\d]*)(\d+)(?:[–-](\d+))?(.*)$/);
  if (!match) return { num: 0, prefix: '', suffix: raw };
  const high = match[3] ? parseInt(match[3], 10) : parseInt(match[2], 10);
  return {
    num: high,
    prefix: match[1] || '',
    suffix: (match[3] ? `–${match[3]}` : '') + (match[4] || ''),
  };
}

export default function AnimatedCounter({ value, label, duration = 1400 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('0');
  const [hasAnimated, setHasAnimated] = useState(false);
  const { num, prefix, suffix } = parseValue(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            const start = performance.now();
            const animate = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / duration, 1);
              // Ease-out cubic
              const eased = 1 - Math.pow(1 - t, 3);
              const current = Math.round(num * eased);
              setDisplay(`${prefix}${current}${suffix}`);
              if (t < 1) requestAnimationFrame(animate);
              else setDisplay(`${prefix}${num}${suffix}`);
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [num, prefix, suffix, duration, hasAnimated]);

  // For ranges like "30–40%" we want the display to show the range at the end
  const finalDisplay = hasAnimated && display === `${prefix}${num}${suffix}` ? value : display;

  return (
    <div ref={ref} className="ac-card text-center">
      <p className="font-mono text-xl font-semibold text-accent-teal sm:text-2xl tabular-nums">
        {finalDisplay}
      </p>
      <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-tertiary">
        {label}
      </p>
    </div>
  );
}
