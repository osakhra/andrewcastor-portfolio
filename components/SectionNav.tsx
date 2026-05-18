'use client';

import { useEffect, useState } from 'react';

type Section = { id: string; label: string };

type Props = {
  sections: Section[];
};

export default function SectionNav({ sections }: Props) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveId(section.id);
            }
          });
        },
        { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [sections]);

  return (
    <nav
      aria-label="Section navigation"
      className="hidden xl:fixed xl:right-6 xl:top-1/2 xl:z-30 xl:block xl:-translate-y-1/2"
    >
      <ul className="flex flex-col gap-2.5 border-l border-border-subtle pl-3">
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className={`group flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                  active ? 'text-accent-teal' : 'text-text-muted hover:text-text-secondary'
                }`}
              >
                <span
                  className={`block h-[1px] transition-all duration-300 ${
                    active
                      ? 'w-6 bg-accent-teal'
                      : 'w-2 bg-text-muted group-hover:w-4 group-hover:bg-text-secondary'
                  }`}
                />
                {s.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
