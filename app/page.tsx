import Link from 'next/link';
import {
  siteConfig,
  summary,
  capabilities,
  certifications,
  projects,
  mmdmCaseStudy,
} from '@/data/content';
import {
  MailIcon,
  ArrowRightIcon,
  DownloadIcon,
  GithubIcon,
  LinkedinIcon,
  ShieldIcon,
} from '@/components/Icons';
import TerminalPanel from '@/components/TerminalPanel';
import CapabilityCard from '@/components/CapabilityCard';
import ProjectCard from '@/components/ProjectCard';
import GithubTile from '@/components/GithubTile';

export default function HomePage() {
  const flagship = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <>
      {/* ═══════ HERO ═══════ */}
      <section className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute -right-10 -top-20 h-[400px] w-[400px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(30,158,138,0.07), transparent 70%)',
          }}
        />
        <div
          className="pointer-events-none absolute -left-5 bottom-0 h-[280px] w-[280px] rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(91,45,142,0.05), transparent 70%)',
          }}
        />
        <div className="section-container relative grid grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:py-24">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-slow rounded-full bg-accent-teal" />
              <span className="font-mono text-[11px] text-text-muted">
                {siteConfig.availability}
              </span>
            </div>
            <h1 className="mb-2 font-display text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {siteConfig.name}
            </h1>
            <p className="mb-4 font-display text-base font-medium text-accent-teal sm:text-lg">
              {siteConfig.title}
            </p>
            <p className="mb-6 max-w-xl font-body text-sm leading-relaxed text-text-tertiary sm:text-[15px]">
              {summary}
            </p>
            <div className="mb-6 flex flex-wrap gap-2.5">
              <a href={`mailto:${siteConfig.email}`} className="btn-primary">
                <MailIcon size={14} /> Get in Touch
              </a>
              <Link href="/projects" className="btn-outline">
                View Projects <ArrowRightIcon size={12} />
              </Link>
              <a href={`/${siteConfig.resumeFilename}`} download className="btn-outline">
                <DownloadIcon size={12} /> Resume
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="text-text-muted transition-colors hover:text-accent-teal"
              >
                <GithubIcon size={18} />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-muted transition-colors hover:text-accent-teal"
              >
                <LinkedinIcon size={18} />
              </a>
            </div>
          </div>
          <div className="hidden lg:block">
            <TerminalPanel />
          </div>
        </div>
      </section>

      {/* ═══════ FLAGSHIP TEASER ═══════ */}
      {flagship && (
        <section className="border-t border-border-subtle py-14">
          <div className="section-container">
            <div className="flex items-baseline justify-between gap-2">
              <span className="ac-label">{flagship.category}</span>
              <Link
                href={`/projects/${flagship.slug}`}
                className="font-mono text-[10px] text-text-muted transition-colors hover:text-accent-teal"
              >
                /projects/{flagship.slug} →
              </Link>
            </div>
            <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
                {flagship.title}
              </h2>
              <span className="status-pill status-progress">{flagship.statusLabel}</span>
            </div>
            {flagship.context && (
              <p className="mb-5 font-mono text-xs text-text-muted">{flagship.context}</p>
            )}
            <p className="mb-6 max-w-3xl font-body text-sm leading-relaxed text-text-tertiary sm:text-[15px]">
              {flagship.description}
            </p>

            {/* Metric strip */}
            <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              {mmdmCaseStudy.metrics.map((m) => (
                <div key={m.label} className="ac-card text-center">
                  <p className="font-mono text-xl font-semibold text-accent-teal sm:text-2xl">
                    {m.value}
                  </p>
                  <p className="mt-1 font-mono text-[9px] uppercase tracking-wider text-text-tertiary">
                    {m.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Problem / Solution / Impact */}
            <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { label: 'Problem', body: mmdmCaseStudy.problem },
                { label: 'Solution', body: mmdmCaseStudy.solution },
                { label: 'Impact', body: mmdmCaseStudy.impact },
              ].map((box) => (
                <div key={box.label} className="ac-card">
                  <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                    {box.label}
                  </p>
                  <p className="font-body text-[13px] leading-relaxed text-text-secondary">
                    {box.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mb-5 flex flex-wrap gap-1.5">
              {flagship.technologies.map((tech) => (
                <span key={tech} className="ac-tag">
                  {tech}
                </span>
              ))}
            </div>

            <Link href={`/projects/${flagship.slug}`} className="btn-outline">
              Read full case study <ArrowRightIcon size={12} />
            </Link>
          </div>
        </section>
      )}

      {/* ═══════ CAPABILITIES ═══════ */}
      <section className="border-t border-border-subtle py-14">
        <div className="section-container">
          <span className="ac-label">Technical Capabilities</span>
          <h2 className="mb-5 font-display text-xl font-semibold text-text-primary sm:text-2xl">
            What I Work With
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {capabilities.map((c) => (
              <CapabilityCard key={c.category} {...c} />
            ))}
          </div>

          <div className="mt-5">
            <p className="mb-2.5 font-mono text-[10px] uppercase tracking-widest text-text-muted">
              Certifications
            </p>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-bg-secondary px-2.5 py-1.5 font-mono text-[11px] text-text-secondary"
                >
                  <ShieldIcon
                    className={cert.status === 'earned' ? 'text-accent-teal' : 'text-accent-purple'}
                  />
                  {cert.name}
                  {cert.status === 'progress' && (
                    <span className="text-text-muted">(in study)</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════ OTHER PROJECTS ═══════ */}
      <section className="border-t border-border-subtle py-14">
        <div className="section-container">
          <span className="ac-label">Other Work</span>
          <h2 className="mb-5 font-display text-xl font-semibold text-text-primary sm:text-2xl">
            Additional Projects
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project) => (
              <ProjectCard key={project.slug} {...project} />
            ))}
            <GithubTile />
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section className="border-t border-border-subtle py-14">
        <div className="section-container text-center">
          <span className="ac-label">Contact</span>
          <h2 className="mb-2.5 font-display text-2xl font-semibold text-text-primary">
            Build systems that hold up.
          </h2>
          <p className="mx-auto mb-5 max-w-md font-body text-sm leading-relaxed text-text-tertiary">
            I&apos;m open to infrastructure, security, and field deployment roles — full-time, contract, or co-op. Relocating to Orlando, FL in August 2026 for UCF.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <a href={`mailto:${siteConfig.email}`} className="btn-primary">
              {siteConfig.email}
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <LinkedinIcon size={14} /> LinkedIn
            </a>
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              <GithubIcon size={14} /> GitHub
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
