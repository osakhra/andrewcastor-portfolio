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
import FadeUp from '@/components/FadeUp';
import SectionHeader from '@/components/SectionHeader';
import AnimatedCounter from '@/components/AnimatedCounter';
import SectionNav from '@/components/SectionNav';

const sectionLinks = [
  { id: 'hero', label: 'Top' },
  // { id: 'status', label: 'Status' },
  { id: 'flagship', label: 'Flagship' },
  { id: 'capabilities', label: 'Capabilities' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export default function HomePage() {
  const flagship = projects.find((p) => p.featured);
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <>
      <SectionNav sections={sectionLinks} />

      {/* ═══════ HERO ═══════ */}
      <section id="hero" className="relative scroll-mt-24">
        <div
          className="pointer-events-none absolute -right-10 -top-20 h-[400px] w-[400px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(30,158,138,0.12), transparent 70%)' }}
        />
        <div
          className="pointer-events-none absolute -left-5 bottom-0 h-[280px] w-[280px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(184,156,224,0.10), transparent 70%)' }}
        />
        <div className="section-container relative grid grid-cols-1 items-center gap-10 py-16 sm:py-20 lg:grid-cols-[1.4fr_1fr] lg:gap-12 lg:py-28">
          <FadeUp>
            <div className="mb-4 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse-slow rounded-full bg-accent-teal" />
              <span className="font-mono text-[12px] text-text-tertiary">
                {siteConfig.availability}
              </span>
            </div>

            {/* Display tagline */}
            <p className="display-tagline mb-1 text-3xl leading-none sm:text-4xl lg:text-5xl">
              Built for the Field
            </p>
            <p className="mb-6 font-display text-xl font-medium text-text-secondary sm:text-2xl">
              <span className="text-accent-teal">Hardened.</span>{' '}
              <span className="text-accent-purple-bright">Recoverable.</span>{' '}
              <span style={{ color: '#DDE3EB' }}>Offline-first.</span>
            </p>

            <h1 className="mb-1 font-display text-2xl font-semibold tracking-tight text-text-primary sm:text-[26px]">
              {siteConfig.name}
            </h1>
            <p className="mb-4 font-display text-base font-medium text-accent-teal">
              {siteConfig.title}
            </p>
            <p className="mb-6 max-w-xl font-body text-base leading-relaxed text-text-secondary sm:text-[17px]">
              {summary}
            </p>

            <div className="mb-6 flex flex-wrap gap-2.5">
              <a
                href={`mailto:${siteConfig.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
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
                className="text-text-tertiary transition-colors hover:text-accent-teal"
              >
                <GithubIcon size={20} />
              </a>
              <a
                href={siteConfig.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-text-tertiary transition-colors hover:text-accent-teal"
              >
                <LinkedinIcon size={20} />
              </a>
            </div>
          </FadeUp>

          <div className="hidden lg:block">
            <FadeUp delay={200}>
              <TerminalPanel />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════ LIVE STATUS ═══════
      <section id="status" className="border-t border-border-subtle py-8">
        <div className="section-container">
          <FadeUp>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
                [ Currently ]
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { text: 'Studying AZ-500 — Azure Security Engineer', dot: 'teal' },
                  { text: 'Building Splunk detection lab', dot: 'teal' },
                  { text: 'Developing bilingual EMR forms for MMDM 2027', dot: 'purple' },
                  { text: 'UCF Fall 2026 — NSA CAE-CD Cybersecurity', dot: 'purple' },
                ].map((item) => (
                  <span
                    key={item.text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border-subtle bg-bg-secondary/60 px-3 py-1 font-mono text-[11px] text-text-secondary backdrop-blur"
                  >
                    <span
                      className={`inline-block h-1.5 w-1.5 rounded-full ${item.dot === 'teal' ? 'bg-accent-teal animate-pulse-slow' : 'bg-accent-purple-bright'}`}
                    />
                    {item.text}
                  </span>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>  */}

      {/* ═══════ FLAGSHIP TEASER ═══════ */}
      {flagship && (
        <section id="flagship" className="border-t border-border-subtle py-16 scroll-mt-24">
          <div className="section-container">
            <FadeUp>
              <SectionHeader label={flagship.category} />
              <div className="mb-1 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display text-xl font-semibold text-text-primary sm:text-2xl">
                  {flagship.title}
                </h2>
                <span className="status-pill status-progress">{flagship.statusLabel}</span>
              </div>
              {flagship.context && (
                <p className="mb-5 font-mono text-[13px] text-text-tertiary">{flagship.context}</p>
              )}
              <p className="mb-7 max-w-3xl font-body text-base leading-relaxed text-text-secondary sm:text-[17px]">
                {flagship.description}
              </p>
            </FadeUp>

            <FadeUp delay={120}>
              <div className="mb-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {mmdmCaseStudy.metrics.map((m) => (
                  <AnimatedCounter key={m.label} value={m.value} label={m.label} />
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={200}>
              <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                {[
                  { label: 'Problem', body: mmdmCaseStudy.problem },
                  { label: 'Solution', body: mmdmCaseStudy.solution },
                  { label: 'Impact', body: mmdmCaseStudy.impact },
                ].map((box) => (
                  <div key={box.label} className="ac-card">
                    <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
                      {box.label}
                    </p>
                    <p className="font-body text-[15px] leading-relaxed text-text-secondary">
                      {box.body}
                    </p>
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={280}>
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
            </FadeUp>
          </div>
        </section>
      )}

      {/* ═══════ CAPABILITIES ═══════ */}
      <section id="capabilities" className="border-t border-border-subtle py-16 scroll-mt-24">
        <div className="section-container">
          <FadeUp>
            <SectionHeader label="Technical Capabilities" title="What I Work With" />
          </FadeUp>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {capabilities.map((c, i) => (
              <FadeUp key={c.category} delay={i * 80}>
                <CapabilityCard {...c} />
              </FadeUp>
            ))}
          </div>

          <FadeUp delay={200}>
            <div className="mt-5">
              <p className="mb-2.5 font-mono text-[11px] uppercase tracking-widest text-text-tertiary">
                Certifications
              </p>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert) => (
                  <span
                    key={cert.name}
                    className="inline-flex items-center gap-1.5 rounded-md border border-border-subtle bg-bg-secondary/70 px-3 py-1.5 font-mono text-[12px] text-text-secondary backdrop-blur"
                  >
                    <ShieldIcon
                      className={
                        cert.status === 'earned' ? 'text-accent-teal' : 'text-accent-purple-bright'
                      }
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
        </div>
      </section>

      {/* ═══════ OTHER PROJECTS ═══════ */}
      <section id="projects" className="border-t border-border-subtle py-16 scroll-mt-24">
        <div className="section-container">
          <FadeUp>
            <SectionHeader label="Other Work" title="Additional Projects" />
          </FadeUp>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {otherProjects.map((project, i) => (
              <FadeUp key={project.slug} delay={i * 60}>
                <ProjectCard {...project} />
              </FadeUp>
            ))}
            <FadeUp delay={otherProjects.length * 60}>
              <GithubTile />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════ CONTACT ═══════ */}
      <section id="contact" className="border-t border-border-subtle py-16 scroll-mt-24">
        <div className="section-container text-center">
          <FadeUp>
            <SectionHeader label="Contact" />
            <h2 className="mb-2.5 font-display text-2xl font-semibold text-text-primary">
              Build systems that hold up.
            </h2>
            <p className="mx-auto mb-5 max-w-md font-body text-base leading-relaxed text-text-secondary">
              I&apos;m open to infrastructure, security, and field deployment roles — internships, co-op, contract, or full-time. Based in Orlando, FL.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <a
                href={`mailto:${siteConfig.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
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
          </FadeUp>
        </div>
      </section>
    </>
  );
}
