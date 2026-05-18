import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/data/content';
import ProjectCard from '@/components/ProjectCard';
import GithubTile from '@/components/GithubTile';
import { ArrowRightIcon } from '@/components/Icons';
import FadeUp from '@/components/FadeUp';
import SectionHeader from '@/components/SectionHeader';

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
        <FadeUp>
          <SectionHeader
            label="Projects"
            title="What I've Built & Deployed"
            subtitle="From field infrastructure to embedded systems and AI prototypes — systems designed to work in production."
          />
        </FadeUp>

        {/* Flagship */}
        {flagship && (
          <FadeUp delay={120}>
            <div className="mb-10">
              <Link
                href={`/projects/${flagship.slug}`}
                className="block transition-transform duration-200 hover:-translate-y-0.5"
              >
                <div className="ac-card">
                  <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent-teal">
                      {flagship.category}
                    </p>
                    <span className="status-pill status-progress">{flagship.statusLabel}</span>
                  </div>
                  <h2 className="mb-1 font-display text-2xl font-semibold text-text-primary">
                    {flagship.title}
                  </h2>
                  {flagship.context && (
                    <p className="mb-3 font-mono text-[12px] text-text-tertiary">{flagship.context}</p>
                  )}
                  <p className="mb-4 font-body text-base leading-relaxed text-text-secondary">
                    {flagship.description}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-1.5">
                    {flagship.technologies.map((tech) => (
                      <span key={tech} className="ac-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 font-mono text-[13px] text-accent-teal">
                    Read case study <ArrowRightIcon size={12} />
                  </span>
                </div>
              </Link>
            </div>
          </FadeUp>
        )}

        {/* Other projects */}
        <FadeUp delay={180}>
          <h2 className="mb-4 font-display text-lg font-semibold text-text-primary">
            Other Projects
          </h2>
        </FadeUp>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((p, i) => (
            <FadeUp key={p.slug} delay={i * 60}>
              <ProjectCard {...p} />
            </FadeUp>
          ))}
          <FadeUp delay={others.length * 60}>
            <GithubTile />
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
