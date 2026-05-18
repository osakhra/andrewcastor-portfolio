import { ReactNode } from 'react';

type Props = {
  label: string;
  title?: string;
  subtitle?: string;
  id?: string;
  children?: ReactNode;
};

export default function SectionHeader({ label, title, subtitle, id, children }: Props) {
  return (
    <div id={id} className="mb-6 scroll-mt-24">
      <div className="mb-2 inline-flex items-center gap-2">
        <span className="font-mono text-[10px] text-accent-teal/50">[</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent-teal">
          {label}
        </span>
        <span className="font-mono text-[10px] text-accent-teal/50">]</span>
      </div>
      {title && (
        <h2 className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="mt-1 max-w-2xl font-body text-sm leading-relaxed text-text-tertiary">
          {subtitle}
        </p>
      )}
      {children}
    </div>
  );
}
