import { Project } from '@/data/content';
import { ServerIcon, CloudIcon, CodeIcon, ShieldIcon } from './Icons';

type ProjectCardProps = Pick<
  Project,
  'title' | 'category' | 'status' | 'statusLabel' | 'context' | 'description' | 'bullets' | 'technologies'
>;

// Pick a representative glyph for the card header based on the category.
function categoryIcon(category: string): typeof CodeIcon {
  const c = category.toLowerCase();
  if (c.includes('security')) return ShieldIcon;
  if (c.includes('data') || c.includes('geo') || c.includes('cloud')) return CloudIcon;
  if (c.includes('embedded') || c.includes('iot') || c.includes('network')) return ServerIcon;
  return CodeIcon;
}

export default function ProjectCard({
  title,
  category,
  status,
  statusLabel,
  context,
  description,
  bullets,
  technologies,
}: ProjectCardProps) {
  const Icon = categoryIcon(category);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-secondary/70 backdrop-blur transition-all duration-300 hover:border-accent-teal/40">
      {/* Corner-bracket accents — give the card a defined, framed edge */}
      <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-accent-teal/40" />
      <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-accent-teal/40" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent-teal/40" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent-teal/40" />

      {/* Header: icon + title, status pill */}
      <div className="flex items-start justify-between gap-2 px-5 pb-3 pt-5">
        <div className="flex items-center gap-2.5">
          <Icon className="mt-0.5 shrink-0 text-accent-teal" size={16} />
          <h3 className="font-display text-base font-semibold leading-tight text-text-primary">
            {title}
          </h3>
        </div>
        <span className={`status-pill shrink-0 ${status === 'shipped' ? 'status-shipped' : 'status-progress'}`}>
          {statusLabel}
        </span>
      </div>

      {/* Summary block: category, optional context, description */}
      <div className="border-t border-border-subtle px-5 py-3.5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-accent-teal">
          {category}
        </p>
        {context && (
          <p className="mt-1 font-mono text-[11px] leading-relaxed text-text-tertiary">
            {context}
          </p>
        )}
        <p className="mt-2 font-body text-[13px] leading-relaxed text-text-secondary">
          {description}
        </p>
      </div>

      {/* Feature bullets (only when present) */}
      {bullets && bullets.length > 0 && (
        <ul className="space-y-2 border-t border-border-subtle px-5 py-3.5">
          {bullets.map((bullet, i) => (
            <li
              key={i}
              className="relative pl-4 font-body text-[12.5px] leading-relaxed text-text-secondary before:absolute before:left-0 before:top-[7px] before:h-1 before:w-1 before:rounded-full before:bg-accent-teal/70"
            >
              {bullet}
            </li>
          ))}
        </ul>
      )}

      {/* Tech tags — pinned to the bottom so cards align in the grid */}
      <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border-subtle px-5 py-4">
        {technologies.map((tech) => (
          <span key={tech} className="ac-tag">
            {tech}
          </span>
        ))}
      </div>
    </article>
  );
}
