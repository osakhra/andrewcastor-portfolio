import { siteConfig } from '@/data/content';
import { GithubIcon } from './Icons';

export default function GithubTile() {
  return (
    <a
      href={siteConfig.links.github}
      target="_blank"
      rel="noopener noreferrer"
      className="ac-card flex flex-col items-center justify-center text-center"
      style={{
        background:
          'linear-gradient(135deg, #0D1117 0%, #0A1418 100%)',
      }}
    >
      <GithubIcon className="mb-2.5 text-accent-teal opacity-80" size={32} />
      <h3 className="mb-1.5 font-display text-base font-semibold text-text-primary">
        More on GitHub
      </h3>
      <p className="mb-3 font-body text-[13px] leading-relaxed text-text-secondary">
        Coursework, lab repos, automation scripts, and works-in-progress.
      </p>
      <span className="font-mono text-[12px] text-accent-teal">github.com/osakhra →</span>
    </a>
  );
}
