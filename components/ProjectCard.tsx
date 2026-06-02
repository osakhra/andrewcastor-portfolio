import { Project } from '@/data/content';
import { ServerIcon, CloudIcon, CodeIcon, ShieldIcon, WalletIcon, TabletIcon, ExternalLinkIcon } from './Icons';

type ProjectCardProps = Pick<
  Project,
  'title' | 'category' | 'status' | 'statusLabel' | 'context' | 'description' | 'bullets' | 'technologies'
> & {
  /** When set, wraps the card in an <a> and shows a small ExternalLinkIcon. */
  href?: string;
};

// Pick a representative glyph for the card header based on the category.
function categoryIcon(category: string): typeof CodeIcon {
  const c = category.toLowerCase();
  if (c.includes('finance') || c.includes('budget')) return WalletIcon;
  if (c.includes('embedded') || c.includes('iot'))   return TabletIcon;
  if (c.includes('lab') || c.includes('soc'))         return ServerIcon;
  if (c.includes('security'))                          return ShieldIcon;
  if (c.includes('data') || c.includes('geo') || c.includes('cloud')) return CloudIcon;
  if (c.includes('network'))                           return ServerIcon;
  return CodeIcon;
}

// Derive pill class from the statusLabel text so color conveys meaning:
//   Live → gold   |   Private / Prototype → silver   |   In Progress → purple   |   else → teal
function pillClass(statusLabel: string): string {
  const l = statusLabel.toLowerCase();
  if (l.includes('live'))                          return 'status-live';
  if (l.includes('private') || l.includes('prototype')) return 'status-private';
  if (l.includes('progress'))                      return 'status-progress';
  return 'status-shipped';
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
  href,
}: ProjectCardProps) {
  const Icon = categoryIcon(category);

  const card = (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-bg-secondary/70 backdrop-blur transition-all duration-300 hover:border-accent-teal/40">
      {/* Corner-bracket accents — give the card a defined, framed edge */}
      <span aria-hidden className="pointer-events-none absolute left-0 top-0 h-3 w-3 border-l border-t border-accent-teal/40" />
      <span aria-hidden className="pointer-events-none absolute right-0 top-0 h-3 w-3 border-r border-t border-accent-teal/40" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-3 w-3 border-b border-l border-accent-teal/40" />
      <span aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-3 w-3 border-b border-r border-accent-teal/40" />

      {/* Header: icon + title, status pill, optional external-link indicator */}
      <div className="flex items-start justify-between gap-2 px-5 pb-3 pt-5">
        <div className="flex items-center gap-2.5">
          <Icon className="mt-0.5 shrink-0 text-accent-teal" size={16} />
          <h3 className="font-display text-base font-semibold leading-tight text-text-primary">
            {title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className={`status-pill ${pillClass(statusLabel)}`}>
            {statusLabel}
          </span>
          {href && <ExternalLinkIcon size={11} className="text-text-tertiary" />}
        </div>
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

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full transition-transform duration-200 hover:-translate-y-0.5"
      >
        {card}
      </a>
    );
  }
  return card;
}
