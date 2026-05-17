import { ReactNode } from 'react';
import { ServerIcon, ShieldIcon, CloudIcon, CodeIcon } from './Icons';

type Props = {
  category: string;
  icon: string;
  items: string[];
};

const iconMap: Record<string, ReactNode> = {
  server: <ServerIcon className="text-accent-teal" />,
  shield: <ShieldIcon className="text-accent-teal" />,
  cloud: <CloudIcon className="text-accent-teal" />,
  code: <CodeIcon className="text-accent-teal" />,
};

export default function CapabilityCard({ category, icon, items }: Props) {
  return (
    <div className="ac-card">
      <div className="mb-3 flex items-center gap-2">
        {iconMap[icon] ?? iconMap.server}
        <span className="font-display text-[11px] font-semibold uppercase tracking-wider text-text-primary">
          {category}
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="ac-tag">
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
