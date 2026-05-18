'use client';

import { useEffect, useRef, useState } from 'react';

type Props = {
  value: string;
  label: string;
  duration?: number;
};

function parseValue(raw: string): { num: number; prefix: string; suffix: string; isNumeric: boolean } {
  // Anything without a digit gets fade-in treatment
  if (!/\d/.test(raw)) {
    return { num: 0, prefix: '', suffix: raw, isNumeric: false };
  }
  const match = raw.match(/^([^\d]*)(\d+)(?:[–-](\d+))?(.*)$/);
  if (!match) return { num: 0, prefix: '', suffix: raw, isNumeric: false };
  const high = match[3] ? parseInt(match[3], 10) : parseInt(match[2], 10);
  return {
    num: high,
    prefix: match[1] || '',
    suffix: (match[3] ? `–${match[3]}` : '') + (match[4] || ''),
    isNumeric: true,
  };
}

export default function AnimatedCounter({ value, label, duration = 2200 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState('0');
  const [fadeIn, setFadeIn] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const { num, prefix, suffix, isNumeric } = parseValue(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);

            if (!isNumeric) {
              // Non-numeric value: fade in only
              setDisplay(value);
              requestAnimationFrame(() => setFadeIn(true));
              return;
            }

            // Numeric value: ease-out count
            const start = performance.now();
            const animate = (now: number) => {
              const elapsed = now - start;
              const t = Math.min(elapsed / duration, 1);
              // Ease-out quintic — strong settle at the end
              const eased = 1 - Math.pow(1 - t, 5);
              const current = Math.round(num * eased);
              setDisplay(`${prefix}${current}${suffix}`);
              if (t < 1) requestAnimationFrame(animate);
              else {
                setDisplay(`${prefix}${num}${suffix}`);
                setFadeIn(true);
              }
            };
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [num, prefix, suffix, duration, hasAnimated, isNumeric, value]);

  // For ranges like "30–40%" display the full range at completion
  const finalDisplay =
    isNumeric && fadeIn && display === `${prefix}${num}${suffix}` ? value : display;

  return (
    <div
      ref={ref}
      className="ac-card text-center"
      style={{
        opacity: hasAnimated ? 1 : 0,
        transition: 'opacity 0.6s ease-out',
      }}
    >
      <p className="font-mono text-2xl font-semibold text-accent-teal sm:text-3xl tabular-nums">
        {hasAnimated ? finalDisplay : '\u00A0'}
      </p>
      <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-text-secondary">
        {label}
      </p>
    </div>
  );
}
