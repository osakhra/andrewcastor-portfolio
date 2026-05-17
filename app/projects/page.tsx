import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/content';
import ProjectCard from '@/components/ProjectCard';
import GithubTile from '@/components/GithubTile';
import { ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Projects',
  description:
    'Infrastructure deployments, embedded systems, AI prototypes, and security labs by Andrew Castor.',
};

export default function ProjectsPage() {
  const flagship = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section className="py-14">
      <div className="section-container">
        <span className="ac-label">Projects</span>
        <h1 className="mb-2 font-display text-3xl font-semibold text-text-primary">
          What I&apos;ve Built &amp; Deployed
        </h1>
        <p className="mb-8 max-w-2xl font-body text-sm leading-relaxed text-text-tertiary">
          From field infrastructure to embedded systems and AI prototypes — systems designed to work in production.
        </p>

        {/* Flagship */}
        {flagship && (
          <div className="mb-10">
            <Link
              href={`/projects/${flagship.slug}`}
              className="block transition-transform duration-200 hover:-translate-y-0.5"
            >
              <div className="ac-card">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-accent-teal">
                    {flagship.category}
                  </p>
                  <span className="status-pill status-progress">{flagship.statusLabel}</span>
                </div>
                <h2 className="mb-1 font-display text-xl font-semibold text-text-primary">
                  {flagship.title}
                </h2>
                {flagship.context && (
                  <p className="mb-3 font-mono text-[10px] text-text-muted">{flagship.context}</p>
                )}
                <p className="mb-4 font-body text-sm leading-relaxed text-text-tertiary">
                  {flagship.description}
                </p>
                <div className="mb-4 flex flex-wrap gap-1.5">
                  {flagship.technologies.map((tech) => (
                    <span key={tech} className="ac-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1 font-mono text-xs text-accent-teal">
                  Read case study <ArrowRightIcon size={12} />
                </span>
              </div>
            </Link>
          </div>
        )}

        {/* Other projects */}
        <h2 className="mb-4 font-display text-base font-semibold text-text-primary">
          Other Projects
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p) => (
            <ProjectCard key={p.slug} {...p} />
          ))}
          <GithubTile />
        </div>
      </div>
    </section>
  );
}
