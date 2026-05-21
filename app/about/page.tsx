import type { Metadata } from 'next';
import Link from 'next/link';
import FadeUp from '@/components/FadeUp';
import SectionHeader from '@/components/SectionHeader';
import SectionNav from '@/components/SectionNav';
import { ArrowRightIcon, DownloadIcon } from '@/components/Icons';
import { siteConfig } from '@/data/content';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Beyond the resume — military family background, competitive esports career, OASIS founding, and personal story of Andrew Castor.',
};

const aboutSections = [
  { id: 'intro',    label: 'Background' },
  { id: 'esports',  label: 'Esports' },
  { id: 'oasis',    label: 'OASIS' },
  { id: 'travel',   label: 'Travel' },
  { id: 'personal', label: 'Personal' },
];

// Timeline of where I've lived — US-born, military family moves
const locations = [
  { place: 'United States',     note: 'Born' },
  { place: 'Germany',           note: 'Age ~3 — first overseas posting' },
  { place: 'Tampa, FL',         note: 'Age ~5' },
  { place: 'Virginia',          note: 'Age ~8' },
  { place: 'Abu Dhabi, UAE',    note: 'Age ~9' },
  { place: 'Florida (statewide)', note: 'Age ~12 — multiple schools' },
  { place: 'Houston, TX',       note: 'Age ~16 — stayed through college' },
  { place: 'Orlando, FL',       note: 'Now — UCF Fall 2026' },
];

const transferableSkills = [
  {
    skill: 'Adversarial Pattern Recognition',
    detail:
      'Hundreds of hours weekly analyzing international tournament footage, cataloguing team tendencies, agent compositions, economic patterns, and map-specific behaviors. The same systematic approach to opponent modeling applies directly to threat intelligence.',
  },
  {
    skill: 'High-Stakes Briefing Under Pressure',
    detail:
      'Delivered pre-match intelligence briefs to an active roster before tournament matches. Communication had to be concise, accurate, and actionable under time pressure. These are the same constraints as defense-sector operational briefing.',
  },
  {
    skill: 'Statistical Performance Analysis',
    detail:
      'Built Excel-based tracking sheets for individual player performance metrics round-by-round, identifying performance peaks, drops, and behavioral patterns. Quantitative analysis under competitive conditions.',
  },
  {
    skill: 'Structured Decision-Making',
    detail:
      'Chose the analyst role over the IGL (captain) role, deliberately trading visibility for effectiveness. The decision reflected prioritizing team outcome over personal advancement, a judgment pattern that translates directly to professional leadership.',
  },
];

// const oasisSkills = [
//   'Community governance — drafted and enforced rulesets covering bug exploitation, behavioral standards, and exploit patches for live-updating games with active vulnerabilities',
//   'Stakeholder negotiation — convinced skeptical Ukrainian developers during wartime to provision dedicated practice servers; required iterative persuasion, data, and trust-building across language and time-zone barriers',
//   'Sponsorship and grant acquisition — sourced prize pools up to $600 through external grants and brand sponsors with no prior fundraising experience',
//   'Operations management — coordinated media teams, tournament brackets, broadcast logistics, and community communications simultaneously',
//   'Early-access product intelligence — evaluated new PvP titles at alpha/beta stage for competitive viability; provided structured feedback to development teams before public release',
//   'Business development — attended gaming conventions, cold-pitched development studios, negotiated in-person and remote partnerships, and nearly secured a Stockholm studio residency with Alara Prime',
//   'Crisis operations — maintained community trust and event continuity through the Alara Prime bankruptcy, demonstrating organizational resilience under external failure',
// ];

// Verified competitive rankings — accurate per user
const gamingRanks = [
  {
    game: 'Valorant',
    rank: 'Radiant · Top 50',
    note: 'Act 1 · 15M+ Player Base',
  },
  {
    game: 'Counter-Strike 2',
    rank: 'Faceit Level 10 · 27K ELO · Global ELite',
    note: 'Current Premier Rating Top 1% · 31M+ Player Base',
  },
  {
    game: 'Rainbow Six Siege X',
    rank: 'Champion',
    note: 'Top 4000 · 5M+ Player Base',
  },
  {
    game: 'FragPunk',
    rank: '#5 Broker · #5 Dual Master · Punkmaster',
    note: 'Top 200 Season One Leaderboard',
  },
  {
    game: 'Spectre Divide',
    rank: 'Champion · Top 20',
    note: 'Reached During Peak Hours',
  },
  {
    game: 'Aimlab',
    rank: 'Master III',
    note: 'Precision · Perception · Cognition: Top 0.07%',
  },
];

export default function AboutPage() {
  return (
    <section className="py-14">
      <SectionNav sections={aboutSections} />
      <div className="section-container max-w-4xl">

        {/* Intro */}
        <FadeUp>
          <SectionHeader
            id="intro"
            label="Background"
            title="Beyond the Resume"
            subtitle="Military family. Ten schools. Always the new kid — which turns out to be excellent training for operating in environments where you have to build trust quickly and figure things out fast."
          />
        </FadeUp>

        <FadeUp delay={100}>
          <div className="ac-card mb-10">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-accent-teal">
              Military Brat · USAF Family
            </p>
            <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
              Born at Eglin Air Force Base in Fort Walton Beach, Florida. Both parents served in the United States Air Force; my mother retired as a Lieutenant Colonel, my father as a Colonel. Growing up meant packing your things and moving every few years: transitioned through 10 schools by the time I graduated high school. I learned early how to adapt to new environments, read new social structures, and build trust with strangers. It wasn&apos;t always easy, but it&apos;s a background that translates directly into how I work.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {locations.map((loc) => (
                <div
                  key={loc.place}
                  className="flex items-baseline justify-between rounded-md border border-border-subtle bg-bg-tertiary/40 px-3 py-2"
                >
                  <span className="font-display text-[14px] font-medium text-text-primary">{loc.place}</span>
                  <span className="font-mono text-[11px] text-text-tertiary">{loc.note}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Esports */}
        <FadeUp>
          <SectionHeader
            id="esports"
            label="Competitive Esports"
            title="Analyst · XSET Valorant"
          />
        </FadeUp>

        <FadeUp delay={80}>
          <div className="ac-card mb-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-display text-base font-semibold text-text-primary">Performance Analyst</p>
                <p className="font-mono text-[12px] text-accent-teal">XSET Gaming · North America VCT · 2021–2022</p>
              </div>
              <span className="status-pill status-shipped">Tier 1 Org</span>
            </div>
            <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
              XSET was one of the top NA Valorant organizations during the game&apos;s early competitive era. The same roster that won the VCT 2022 NA Stage 2 Challengers and represented North America internationally at Masters Copenhagen. I was offered the IGL (captain) role following strong performance in the open circuit, but chose to stay as an analyst, a deliberate decision to have more impact behind the scenes than at the mic.
            </p>
            <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
              The job was structured 12-hour days. Up at 5:30 AM watching international tournament VODs before the NA market woke up. By afternoon I was building per-player performance spreadsheets: round-by-round statistics, behavioral patterns, performance curves plotted over time. Evenings the roster was in scrims; I&apos;d watch live, flag in-round events, then spend the post-session reviewing every angle. At peak I was rated among the better analysts in the NA scene.
            </p>
            <p className="font-body text-[15px] leading-relaxed text-text-secondary">
              I left the scene by choice. I'd hit my ceiling for what the role could teach me, and I could see more important work ahead. The discipline, pattern recognition, and analytical habits I built have stayed with me. They now show up directly in how I approach infrastructure and security work today.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={120}>
          <div className="mb-10">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              Transferable Skills
            </p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {transferableSkills.map((item) => (
                <div key={item.skill} className="ac-card">
                  <h3 className="mb-1.5 font-display text-[14px] font-semibold text-accent-teal">
                    {item.skill}
                  </h3>
                  <p className="font-body text-[13px] leading-relaxed text-text-secondary">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Verified competitive ranks */}
        <FadeUp delay={80}>
          <div className="mb-10">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              Competitive Achievements · Ranks
            </p>
            <p className="mb-4 font-body text-[13px] text-text-tertiary">
              After two years in competitive esports, I've shifted to treating it as a hobby. I still push myself due to an unrelenting competitive mindset; however, I now get to enjoy being competitive alongside friends.
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {gamingRanks.map((r) => (
                <div
                  key={r.game}
                  className="rounded-md border border-border-subtle bg-bg-secondary/60 px-3 py-2.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-display text-[13px] font-semibold text-text-primary">{r.game}</p>
                    <p className="font-mono text-[11px] text-accent-teal">{r.rank}</p>
                  </div>
                  <p className="mt-0.5 font-mono text-[10px] text-text-tertiary">{r.note}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* OASIS */}
        <FadeUp>
          <SectionHeader
            id="oasis"
            label="Founder"
            title="O Λ S I S — Esports Events & Dev Partnerships"
          />
        </FadeUp>

        <FadeUp delay={80}>
          <div className="ac-card mb-4">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="font-display text-base font-semibold text-text-primary">Founder & Operations Lead</p>
                <p className="font-mono text-[12px] text-accent-teal">O Λ S I S · 2022–2024</p>
              </div>
              <span className="status-pill status-shipped">Concluded 2024</span>
            </div>
            <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
              After leaving the Valorant scene I discovered Shatterline, a tactical shooter developed by Frag Lab Studio in Ukraine during the start of the Russia-Ukraine war. I wanted to help keep the game viable. I reached out to the developers and built their first competitive scene from scratch, founding OASIS as the organization behind it.
            </p>
            <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
              The initial work with Shatterline required convincing skeptical developers under wartime stress to provision practice servers they had no interest in running. It took a couple weeks of iterative persuasion, data-backed proposals, and trust-building across language and time-zone barriers. When I finally aquired server access, I built a full tournament infrastructure: rules, brackets, broadcast logistics, community moderation, and prize-pool funding secured through grants and sponsorships with our highest payout reaching $600.
            </p>
            <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
              When Shatterline&apos;s developers shifted their focus from PvP to PvE, OASIS pivoted. We expanded into a generalized model: identify promising early-access PvP titles, partnered with their development teams, and ran structured competitive events using experienced esports participants to generate media, feedback, and community momentum for games that needed it. I attended gaming conventions, cold-pitched studios, and nearly secured a Stockholm residency with the Alara Prime team before their funding collapsed. When Alara filed for bankruptcy, I managed the community transition without losing the trust we&apos;d built.
            </p>
            <p className="font-body text-[15px] leading-relaxed text-text-secondary">
              OASIS ran until the early-access PvP market contracted and the community could not sustain momentum without a strong anchor title. I shut it down deliberately rather than let it decay. The organization had a real website, a small team, a competitive Discord community, and real developer partnerships. It was a startup. It taught me more about operations, negotiation, and resilience than anything else I could have done in that window.
            </p>
          </div>
        </FadeUp>

        {/* <FadeUp delay={80}>
          <div className="mb-10">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-text-tertiary">
              What I Learned
            </p>
            <ul className="space-y-2.5">
              {oasisSkills.map((skill, i) => (
                <li
                  key={i}
                  className="relative pl-4 font-body text-[14px] leading-relaxed text-text-secondary before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-accent-teal"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </FadeUp> */}

        {/* Travel
        <FadeUp>
          <SectionHeader
            id="travel"
            label="Travel"
            title="Travel as Default"
          />
        </FadeUp>

        <FadeUp delay={80}>
          <div className="ac-card mb-4">
            <p className="mb-4 font-body text-[15px] leading-relaxed text-text-secondary">
              Travel has been a constant since before I could choose it. Between a military family that moved across continents and my own adult life, I&apos;ve lived in or traveled through 20+ countries and 10+ US states. International exposure isn&apos;t a bullet point — it&apos;s the baseline. The common thread is operating in unfamiliar environments without losing effectiveness. I want to keep working in environments that require travel, ideally internationally. The medical mission work is where this instinct is most useful right now.
            </p>
          </div>
        </FadeUp>

        <FadeUp delay={80}>
          <div className="mb-10 ac-card">
            <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-accent-teal">
              Medical Mission Deployments
            </p>
            <div className="space-y-3">
              {[
                { location: 'Costa Rica',  date: 'April 2026',     note: 'First full EMR field deployment — live production use across 6 clinical stations' },
                { location: 'Laredo, TX',  date: 'Recurring',      note: 'Domestic mission operations, ongoing' },
                { location: 'Costa Rica',  date: '2027 (planned)', note: 'Next international field deployment' },
              ].map((dep) => (
                <div key={dep.location + dep.date} className="flex flex-col gap-0.5 border-l-2 border-accent-teal/30 pl-3">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <span className="font-display text-[14px] font-semibold text-text-primary">{dep.location}</span>
                    <span className="font-mono text-[11px] text-text-tertiary">{dep.date}</span>
                  </div>
                  <span className="font-body text-[13px] text-text-secondary">{dep.note}</span>
                </div>
              ))}
            </div>
          </div>
        </FadeUp> */}

        {/* Personal */}
        <FadeUp>
          <SectionHeader
            id="personal"
            label="Personal"
            title="Outside the Terminal"
          />
        </FadeUp>

        <FadeUp delay={80}>
          <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              {
                title: 'Hiking & the Outdoors',
                body: "I hike to get offline. There's no better debugging environment than a trail where the only variable is your own pace. I'm drawn to elevation and distance over comfort, searching for the perfect view.",
              },
              {
                title: 'Ocean Swimming & Offshore Fishing',
                body: "I like to swim out twice as far as the surfers, finding a calm wave to float on, and fish 5+ miles offshore for the kind of catch that will feed the neighbors.",
              },
              {
                title: 'Competitive Gaming',
                body: "I play games the same way I enjoy work, with the goal to understand the task at hand completely and master it fully. I play with highly competitive friends who together, bring out the best in each of us as we climb to the ranked ladder. ",
              },
              {
                title: 'Travel as Default',
                body: 'I grew up without a permanent home city and never felt the need for one. I want to keep working in environments that require travel, ideally internationally.',
              },
            ].map((item) => (
              <div key={item.title} className="ac-card">
                <h3 className="mb-1.5 font-display text-[15px] font-semibold text-text-primary">{item.title}</h3>
                <p className="font-body text-[14px] leading-relaxed text-text-secondary">{item.body}</p>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Bottom CTA */}
        <FadeUp>
          <div className="rounded-lg border border-accent-teal/25 bg-accent-teal/[0.06] p-5 text-center backdrop-blur">
            <p className="mb-1 font-display text-base font-semibold text-text-primary">
              Ready to talk about the technical side?
            </p>
            <p className="mb-4 font-body text-[14px] text-text-secondary">
              The professional case is on the Resume and Projects pages.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <Link href="/resume" className="btn-primary">
                <ArrowRightIcon size={13} /> View Resume
              </Link>
              <Link href="/projects" className="btn-outline">
                View Projects <ArrowRightIcon size={13} />
              </Link>
              <a href={`/${siteConfig.resumeFilename}`} download className="btn-outline">
                <DownloadIcon size={13} /> Download PDF
              </a>
            </div>
          </div>
        </FadeUp>

      </div>
    </section>
  );
}
