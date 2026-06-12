import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, mmdmCaseStudy } from '@/data/content';
import { ArrowRightIcon, ExternalLinkIcon } from '@/components/Icons';
import ArchitectureToggle from '@/components/ArchitectureToggle';
import AnimatedCounter from '@/components/AnimatedCounter';
import FadeUp from '@/components/FadeUp';
import SectionHeader from '@/components/SectionHeader';
import PatientFlowDiagram from '@/components/PatientFlowDiagram';

export const metadata: Metadata = {
  title: 'MMDM OpenEMR · Case Study',
  description:
    'Self-hosted, offline-first EMR for a six-station volunteer clinic in Costa Rica. Linux + Apache + MariaDB + PHP with private CA TLS and daily backups.',
};

export default function MmdmCaseStudyPage() {
  const project = projects.find((p) => p.slug === 'mmdm-openemr')!;

  return (
    <section className="py-14">
      <div className="section-container max-w-4xl">
        <Link
          href="/projects"
          className="mb-6 inline-flex items-center gap-1 font-mono text-[12px] text-text-tertiary transition-colors hover:text-accent-teal"
        >
          ← All Projects
        </Link>

        <FadeUp>
          <SectionHeader label={project.category} />
          <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
            <h1 className="font-display text-3xl font-semibold text-text-primary">{project.title}</h1>
            <span className="status-pill status-progress">{project.statusLabel}</span>
          </div>
          {project.context && (
            <p className="mb-6 font-mono text-[13px] text-text-tertiary">{project.context}</p>
          )}
          <p className="mb-8 max-w-3xl font-body text-base leading-relaxed text-text-secondary sm:text-[17px]">
            {project.description}
          </p>
        </FadeUp>

        {/* Animated metrics */}
        <FadeUp delay={120}>
          <div className="mb-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {mmdmCaseStudy.metrics.map((m) => (
              <AnimatedCounter key={m.label} value={m.value} label={m.label} />
            ))}
          </div>
        </FadeUp>

        {/* P/S/I */}
        <FadeUp delay={180}>
          <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { label: 'Problem', body: mmdmCaseStudy.problem },
              { label: 'Solution', body: mmdmCaseStudy.solution },
              { label: 'Impact', body: mmdmCaseStudy.impact },
            ].map((box) => (
              <div key={box.label} className="ac-card">
                <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                  {box.label}
                </p>
                <p className="font-body text-[15px] leading-relaxed text-text-secondary">{box.body}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Interactive architecture toggle */}
        <FadeUp>
          <h2 className="mb-3 font-display text-lg font-semibold text-text-primary">
            System Architecture
          </h2>
          <p className="mb-4 font-body text-[14px] text-text-secondary">
            Toggle between the EMR application stack and the field network it runs on.
          </p>
          <div className="mb-10">
            <ArchitectureToggle />
          </div>
        </FadeUp>

        {/* Patient flow diagram */}
        <FadeUp>
          <div className="mb-10">
            <PatientFlowDiagram />
          </div>
        </FadeUp>

        {/* Shipped vs roadmap */}
        <FadeUp>
          <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div className="ac-card">
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-accent-teal">
                Shipped
              </p>
              <ul className="space-y-2 font-body text-[14px] text-text-secondary">
                {mmdmCaseStudy.shipped.map((item) => (
                  <li key={item}>✓ {item}</li>
                ))}
              </ul>
            </div>
            <div className="ac-card">
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-wider text-accent-purple-bright">
                Roadmap → 2027 Field Deploy
              </p>
              <ul className="space-y-2 font-body text-[14px] text-text-secondary">
                {mmdmCaseStudy.roadmap.map((item) => (
                  <li key={item}>→ {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </FadeUp>

        {/* Principles */}
        <FadeUp>
          <h2 className="mb-3 font-display text-lg font-semibold text-text-primary">
            Guiding Principles
          </h2>
          <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {mmdmCaseStudy.principles.map((p, i) => (
              <FadeUp key={p.title} delay={i * 80}>
                <div className="ac-card h-full">
                  <h3 className="mb-1.5 font-display text-[15px] font-semibold text-accent-teal">
                    {p.title}
                  </h3>
                  <p className="font-body text-[14px] leading-relaxed text-text-secondary">
                    {p.desc}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </FadeUp>

        {/* Tech stack */}
        <FadeUp>
          <h2 className="mb-3 font-display text-lg font-semibold text-text-primary">
            Technology Stack
          </h2>
          <div className="mb-10 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span key={tech} className="ac-tag">
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            
              <a href="https://mmdm.andrewcastor.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Field Journal <ExternalLinkIcon size={12} />
            </a>
            <Link href="/projects" className="btn-outline">
              ← Back to all projects
            </Link>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
