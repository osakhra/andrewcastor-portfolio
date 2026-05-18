'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(pct);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div
      className="fixed left-0 right-0 top-14 z-40 h-[2px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-accent-teal transition-[width] duration-100"
        style={{
          width: `${progress}%`,
          boxShadow:
            progress > 0
              ? '0 0 10px rgba(30, 158, 138, 0.6)'
              : 'none',
        }}
      />
    </div>
  );
}
