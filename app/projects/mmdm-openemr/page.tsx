import type { Metadata } from 'next';
import Link from 'next/link';
import { projects, mmdmCaseStudy } from '@/data/content';
import { ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'MMDM OpenEMR — Case Study',
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
          className="mb-6 inline-flex items-center gap-1 font-mono text-[11px] text-text-muted transition-colors hover:text-accent-teal"
        >
          ← All Projects
        </Link>

        <span className="ac-label">{project.category}</span>
        <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="font-display text-3xl font-semibold text-text-primary">{project.title}</h1>
          <span className="status-pill status-progress">{project.statusLabel}</span>
        </div>
        {project.context && (
          <p className="mb-6 font-mono text-xs text-text-muted">{project.context}</p>
        )}

        <p className="mb-8 max-w-3xl font-body text-[15px] leading-relaxed text-text-tertiary">
          {project.description}
        </p>

        {/* Metrics */}
        <div className="mb-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {mmdmCaseStudy.metrics.map((m) => (
            <div key={m.label} className="ac-card text-center">
              <p className="font-mono text-2xl font-semibold text-accent-teal">{m.value}</p>
              <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-tertiary">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        {/* P/S/I */}
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {[
            { label: 'Problem', body: mmdmCaseStudy.problem },
            { label: 'Solution', body: mmdmCaseStudy.solution },
            { label: 'Impact', body: mmdmCaseStudy.impact },
          ].map((box) => (
            <div key={box.label} className="ac-card">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                {box.label}
              </p>
              <p className="font-body text-sm leading-relaxed text-text-secondary">{box.body}</p>
            </div>
          ))}
        </div>

        {/* Architecture diagram */}
        <h2 className="mb-3 font-display text-base font-semibold text-text-primary">
          System Architecture
        </h2>
        <div className="ac-card mb-10 !p-5">
          <svg width="100%" viewBox="0 0 700 200" xmlns="http://www.w3.org/2000/svg" className="block">
            <line x1="120" y1="100" x2="220" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="340" y1="100" x2="440" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="560" y1="100" x2="640" y2="100" stroke="#1E9E8A" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="280" y1="125" x2="280" y2="170" stroke="#5B2D8E" strokeWidth="1" strokeDasharray="3,3" />
            <line x1="500" y1="125" x2="500" y2="170" stroke="#5B2D8E" strokeWidth="1" strokeDasharray="3,3" />

            <rect x="20" y="75" width="100" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
            <text x="70" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">Volunteer</text>
            <text x="70" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">Workstation</text>

            <rect x="220" y="75" width="120" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
            <text x="280" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">Apache + TLS</text>
            <text x="280" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">Private CA · UFW</text>

            <rect x="440" y="75" width="120" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
            <text x="500" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">OpenEMR 7.0</text>
            <text x="500" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="9">PHP 8.1 · 6 stations</text>

            <rect x="640" y="75" width="50" height="50" rx="6" fill="#0D1117" stroke="#1E9E8A" strokeWidth="1" />
            <text x="665" y="95" textAnchor="middle" fill="#E8ECF1" fontFamily="JetBrains Mono" fontSize="11" fontWeight="500">DB</text>
            <text x="665" y="110" textAnchor="middle" fill="#8B95A5" fontFamily="JetBrains Mono" fontSize="8">MariaDB</text>

            <rect x="220" y="170" width="120" height="22" rx="4" fill="#0D1117" stroke="#5B2D8E" strokeWidth="1" />
            <text x="280" y="184" textAnchor="middle" fill="#9d7bc7" fontFamily="JetBrains Mono" fontSize="9">RBAC · 6 roles</text>

            <rect x="440" y="170" width="120" height="22" rx="4" fill="#0D1117" stroke="#5B2D8E" strokeWidth="1" />
            <text x="500" y="184" textAnchor="middle" fill="#9d7bc7" fontFamily="JetBrains Mono" fontSize="9">Daily backup · cron</text>

            <text x="350" y="40" textAnchor="middle" fill="#5A6577" fontFamily="JetBrains Mono" fontSize="10">LAN-only · No internet · Offline-first</text>
            <line x1="20" y1="50" x2="690" y2="50" stroke="#1E2737" strokeWidth="0.5" strokeDasharray="2,2" />
          </svg>
        </div>

        {/* Shipped vs roadmap */}
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="ac-card">
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-accent-teal">
              Shipped
            </p>
            <ul className="space-y-1.5 font-body text-sm text-text-secondary">
              {mmdmCaseStudy.shipped.map((item) => (
                <li key={item}>✓ {item}</li>
              ))}
            </ul>
          </div>
          <div className="ac-card">
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-accent-purple-soft">
              Roadmap → 2027 Field Deploy
            </p>
            <ul className="space-y-1.5 font-body text-sm text-text-secondary">
              {mmdmCaseStudy.roadmap.map((item) => (
                <li key={item}>→ {item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Principles */}
        <h2 className="mb-3 font-display text-base font-semibold text-text-primary">
          Guiding Principles
        </h2>
        <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {mmdmCaseStudy.principles.map((p) => (
            <div key={p.title} className="ac-card">
              <h3 className="mb-1 font-display text-sm font-semibold text-accent-teal">
                {p.title}
              </h3>
              <p className="font-body text-[13px] leading-relaxed text-text-tertiary">
                {p.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <h2 className="mb-3 font-display text-base font-semibold text-text-primary">
          Technology Stack
        </h2>
        <div className="mb-10 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <span key={tech} className="ac-tag">
              {tech}
            </span>
          ))}
        </div>

        <Link href="/projects" className="btn-outline">
          ← Back to all projects
        </Link>
      </div>
    </section>
  );
}
