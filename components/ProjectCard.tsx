import { Project } from '@/data/content';

type ProjectCardProps = Pick<
  Project,
  'title' | 'category' | 'status' | 'statusLabel' | 'context' | 'description' | 'technologies'
>;

export default function ProjectCard({
  title,
  category,
  status,
  statusLabel,
  context,
  description,
  technologies,
}: ProjectCardProps) {
  return (
    <div className="ac-card flex h-full flex-col">
      <div className="mb-2 flex items-baseline justify-between gap-1.5">
        <p className="font-mono text-[11px] uppercase tracking-wider text-accent-teal">
          {category}
        </p>
        <span className={`status-pill ${status === 'shipped' ? 'status-shipped' : 'status-progress'}`}>
          {statusLabel}
        </span>
      </div>
      <h3 className="mb-1 font-display text-base font-semibold text-text-primary">{title}</h3>
      {context && (
        <p className="mb-2 font-mono text-[11px] text-text-tertiary">{context}</p>
      )}
      <p className="mb-2.5 flex-1 font-body text-[13px] leading-relaxed text-text-secondary">
        {description}
      </p>
      <div className="flex flex-wrap gap-1">
        {technologies.map((tech) => (
          <span key={tech} className="ac-tag">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
