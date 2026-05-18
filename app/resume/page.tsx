import type { Metadata } from 'next';
import {
  siteConfig,
  summary,
  experience,
  education,
  capabilities,
  certifications,
} from '@/data/content';
import {
  DownloadIcon,
  MapPinIcon,
  MailIcon,
  GithubIcon,
  LinkedinIcon,
  ShieldIcon,
} from '@/components/Icons';
import FadeUp from '@/components/FadeUp';
import SectionHeader from '@/components/SectionHeader';
import SectionNav from '@/components/SectionNav';

export const metadata: Metadata = {
  title: 'Resume',
  description: 'Professional resume of Andrew Castor — Infrastructure & Cloud Security Engineer.',
};

const resumeSections = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certs' },
  { id: 'education', label: 'Education' },
];

export default function ResumePage() {
  return (
    <section className="py-14">
      <SectionNav sections={resumeSections} />

      <div className="section-container max-w-4xl">
        {/* Header */}
        <FadeUp>
          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
            <div>
              <SectionHeader label="Resume" />
              <h1 className="mb-1 font-display text-3xl font-bold text-text-primary">
                {siteConfig.name}
              </h1>
              <p className="mb-3 font-display text-base font-medium text-accent-teal">
                {siteConfig.title}
              </p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-text-muted">
                <span className="flex items-center gap-1.5 font-body text-xs">
                  <MapPinIcon /> {siteConfig.location}
                </span>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-1.5 font-body text-xs transition-colors hover:text-accent-teal"
                >
                  <MailIcon size={12} /> {siteConfig.email}
                </a>
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-body text-xs transition-colors hover:text-accent-teal"
                >
                  <LinkedinIcon size={12} /> LinkedIn
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-body text-xs transition-colors hover:text-accent-teal"
                >
                  <GithubIcon size={12} /> GitHub
                </a>
              </div>
            </div>
            <a
              href={`/${siteConfig.resumeFilename}`}
              download
              className="btn-primary shrink-0 self-start"
            >
              <DownloadIcon size={13} /> Download PDF
            </a>
          </div>
        </FadeUp>

        <hr className="mb-8 border-border-subtle" />

        {/* Summary */}
        <FadeUp>
          <div id="summary" className="mb-10 scroll-mt-24">
            <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Summary
            </h2>
            <p className="max-w-3xl font-body text-sm leading-relaxed text-text-tertiary">
              {summary}
            </p>
          </div>
        </FadeUp>

        {/* Experience */}
        <FadeUp>
          <div id="experience" className="mb-10 scroll-mt-24">
            <h2 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Experience
            </h2>
            {experience.map((job) => (
              <div key={job.company} className="ac-card mb-3 last:mb-0">
                <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-display text-base font-semibold text-text-primary">
                    {job.role}
                  </h3>
                  <span className="font-mono text-[11px] text-text-muted">{job.dates}</span>
                </div>
                <p className="mb-3 flex flex-wrap items-center gap-1.5 font-body text-xs text-accent-teal/90">
                  <span>{job.company}</span>
                  <span className="text-text-muted">·</span>
                  <span className="text-text-muted">{job.location}</span>
                </p>
                <ul className="space-y-1.5">
                  {job.bullets.map((bullet, i) => (
                    <li
                      key={i}
                      className="relative pl-3 font-body text-[13px] leading-relaxed text-text-tertiary before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-accent-teal/60"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Skills */}
        <FadeUp>
          <div id="skills" className="mb-10 scroll-mt-24">
            <h2 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Technical Skills
            </h2>
            <div className="ac-card space-y-3">
              {capabilities.map((c) => (
                <div key={c.category} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="w-40 shrink-0 font-mono text-[11px] font-medium uppercase tracking-wide text-accent-teal">
                    {c.category}
                  </span>
                  <p className="font-body text-[13px] text-text-tertiary">
                    {c.items.join(' · ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Certs */}
        <FadeUp>
          <div id="certifications" className="mb-10 scroll-mt-24">
            <h2 className="mb-3 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-bg-secondary/70 px-2.5 py-1.5 font-mono text-[11px] text-text-secondary backdrop-blur"
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
        </FadeUp>

        {/* Education */}
        <FadeUp>
          <div id="education" className="mb-10 scroll-mt-24">
            <h2 className="mb-5 font-mono text-[11px] font-semibold uppercase tracking-widest text-text-muted">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.institution} className="ac-card">
                  <div className="mb-0.5 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-sm font-semibold text-text-primary">
                      {edu.institution}
                    </h3>
                    <span className="font-mono text-[11px] text-text-muted">{edu.dates}</span>
                  </div>
                  <p className="font-body text-[13px] text-text-tertiary">{edu.degree}</p>
                  {edu.gpa && (
                    <p className="font-mono text-[11px] text-text-muted">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Availability footer */}
        <FadeUp>
          <div className="rounded-lg border border-accent-teal/20 bg-accent-teal/[0.04] p-5 text-center backdrop-blur">
            <p className="mb-1 font-display text-sm font-semibold text-text-primary">
              Open to Opportunities
            </p>
            <p className="font-body text-xs text-text-tertiary">
              {siteConfig.availability}
            </p>
            <a href={`mailto:${siteConfig.email}`} className="btn-primary mt-3 inline-flex">
              <MailIcon size={13} /> Reach Out
            </a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
