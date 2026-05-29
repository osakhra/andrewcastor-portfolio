'use client';

import { useState } from 'react';
import {
  siteConfig,
  resumeSummary,
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
  ExternalLinkIcon,
} from '@/components/Icons';
import FadeUp from '@/components/FadeUp';
import SectionHeader from '@/components/SectionHeader';
import SectionNav from '@/components/SectionNav';
import AnimatedCounter from '@/components/AnimatedCounter';
import ContactModal from '@/components/ContactModal';

const resumeSections = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certs' },
  { id: 'education', label: 'Education' },
];

export default function ResumePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-text-secondary">
                <span className="flex items-center gap-1.5 font-body text-[13px]">
                  <MapPinIcon /> {siteConfig.location}
                </span>
                
                {/* Updated Header Email Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="flex items-center gap-1.5 font-body text-[13px] transition-colors hover:text-accent-teal"
                >
                  <MailIcon size={13} /> {siteConfig.email}
                </button>
                
                <a
                  href={siteConfig.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-body text-[13px] transition-colors hover:text-accent-teal"
                >
                  <LinkedinIcon size={13} /> LinkedIn
                </a>
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 font-body text-[13px] transition-colors hover:text-accent-teal"
                >
                  <GithubIcon size={13} /> GitHub
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
            <h2 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-widest text-text-tertiary">
              Summary
            </h2>
            <p className="max-w-3xl font-body text-base leading-relaxed text-text-secondary">
              {resumeSummary}
            </p>
          </div>
        </FadeUp>

        {/* Experience */}
        <FadeUp>
          <div id="experience" className="mb-10 scroll-mt-24">
            <h2 className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-widest text-text-tertiary">
              Experience
            </h2>
            {experience.map((job) => (
              <div key={job.company} className="ac-card mb-3 last:mb-0">
                <div className="mb-1 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-display text-lg font-semibold text-text-primary">
                    {job.role}
                  </h3>
                  <span className="font-mono text-[12px] text-text-tertiary">{job.dates}</span>
                </div>
                <p className="mb-3 flex flex-wrap items-center gap-1.5 font-body text-[13px] text-accent-teal">
                 <span>{job.company}</span>
                 <span className="text-text-tertiary">·</span>
                 <span className="text-text-tertiary">{job.location}</span>
                 {job.links && job.links.map((link) => (
                     <span key={link.url} className="inline-flex items-center gap-1.5">
                     <span className="text-text-tertiary">·</span>
                     <a
                       href={link.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-1 rounded-md border border-border-subtle bg-bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-text-tertiary transition-colors hover:border-accent-teal/50 hover:text-accent-teal"
                     >
                      {link.label} <ExternalLinkIcon size={11} />
                     </a>
               </span>
            ))}
           </p>

                {/* Optional metrics strip */}
                {job.metrics && (
                  <div className="mb-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {job.metrics.map((m) => (
                      <AnimatedCounter key={m.label} value={m.value} label={m.label} />
                    ))}
                  </div>
                )}

                {/* Grouped bullets (with sub-headings) */}
                {job.bulletGroups &&
                  job.bulletGroups.map((group, gi) => (
                    <div key={gi} className={gi > 0 ? 'mt-4' : ''}>
                      {group.heading && (
                        <h4 className="mb-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-accent-purple-bright">
                          {group.heading}
                        </h4>
                      )}
                      <ul className="space-y-2">
                        {group.items.map((bullet, bi) => (
                          <li
                            key={bi}
                            className="relative pl-3 font-body text-[14px] leading-relaxed text-text-secondary before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-accent-teal/70"
                          >
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                {/* Flat bullets (fallback for simpler entries) */}
                {job.bullets && (
                  <ul className="space-y-2">
                    {job.bullets.map((bullet, i) => (
                      <li
                        key={i}
                        className="relative pl-3 font-body text-[14px] leading-relaxed text-text-secondary before:absolute before:left-0 before:top-2 before:h-1 before:w-1 before:rounded-full before:bg-accent-teal/70"
                      >
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}

                {/* Optional closing note */}
                {job.closingNote && (
                  <p className="mt-4 rounded-md border-l-2 border-accent-purple-bright/40 bg-accent-purple-bright/[0.04] py-2 pl-3 font-body text-[13px] leading-relaxed text-text-secondary">
                    {job.closingNote}
                  </p>
                )}
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Skills */}
        <FadeUp>
          <div id="skills" className="mb-10 scroll-mt-24">
            <h2 className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-widest text-text-tertiary">
              Technical Skills
            </h2>
            <div className="ac-card space-y-3">
              {capabilities.map((c) => (
                <div key={c.category} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
                  <span className="w-44 shrink-0 font-mono text-[12px] font-semibold uppercase tracking-wide text-accent-teal">
                    {c.category}
                  </span>
                  <p className="font-body text-[14px] text-text-secondary">
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
            <h2 className="mb-3 font-mono text-[12px] font-semibold uppercase tracking-widest text-text-tertiary">
              Certifications
            </h2>
            <div className="flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert.name}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-bg-secondary/70 px-3 py-1.5 font-mono text-[12px] text-text-secondary backdrop-blur"
                >
                  <ShieldIcon
                    className={cert.status === 'earned' ? 'text-accent-teal' : 'text-accent-purple-bright'}
                  />
                  {cert.name}
                  {cert.status === 'progress' && (
                    <span className="text-text-tertiary">(in study)</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Education */}
        <FadeUp>
          <div id="education" className="mb-10 scroll-mt-24">
            <h2 className="mb-5 font-mono text-[12px] font-semibold uppercase tracking-widest text-text-tertiary">
              Education
            </h2>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.institution} className="ac-card">
                  <div className="mb-0.5 flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-base font-semibold text-text-primary">
                      {edu.institution}
                    </h3>
                    <span className="font-mono text-[12px] text-text-tertiary">{edu.dates}</span>
                  </div>
                  <p className="font-body text-[14px] text-text-secondary">{edu.degree}</p>
                  {edu.gpa && (
                    <p className="font-mono text-[12px] text-text-tertiary">GPA: {edu.gpa}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Availability footer */}
        <FadeUp>
          <div className="rounded-lg border border-accent-teal/25 bg-accent-teal/[0.06] p-5 text-center backdrop-blur">
            <p className="mb-1 font-display text-base font-semibold text-text-primary">
              Open to Opportunities
            </p>
            <p className="font-body text-[14px] text-text-secondary">
              {siteConfig.availability}
            </p>
            
            {/* Updated Footer Email Button */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="btn-primary mt-3 inline-flex"
            >
              <MailIcon size={14} /> {siteConfig.email}
            </button>
          </div>
        </FadeUp>
      </div>
      
      {/* Render the modal */}
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}