export const siteConfig = {
  name: 'Andrew Castor',
  legalName: 'John Andrew Castor',
  title: 'Infrastructure & Cloud Security Engineer',
  domain: 'andrewcastor.dev',
  email: 'JohnAndrewCastor@gmail.com',
  location: 'Orlando, FL',
  availability: 'Available for co-op, internships & infrastructure roles',
  resumeFilename: 'Andrew_Castor_Resume.pdf',
  links: {
    github: 'https://github.com/osakhra',
    linkedin: 'https://linkedin.com/in/jandrewcastor',
  },
  meta: {
    description:
      'Andrew Castor — Infrastructure & Cloud Security Engineer. Cybersecurity student at UCF building hardened Linux deployments, multi-site networks, and offline-first clinical systems.',
    keywords: [
      'infrastructure engineer',
      'cloud security',
      'network architecture',
      'healthcare IT',
      'AWS',
      'Azure',
      'IAM',
      'RBAC',
      'Linux',
      'Defense contractor',
    ],
  },
};

export const summary = `Cybersecurity student heading into UCF's NSA-designated cybersecurity program with 2 years of hands-on infrastructure and healthcare IT work experience. Having built hardened Linux deployments, multi-site networks, and offline-first clinical systems for volunteer medical missions; the kind of constrained, high-stakes environments that translate directly to cloud security and cleared work opportunities.`;
export const resumeSummary = `Infrastructure and security engineer with 2 years of hands-on production work across healthcare IT, austere field deployments, and high-pressure event operations. CompTIA Security+ and Network+ certified, with active AZ-500 study underway. Currently leading offline-first EMR and network infrastructure for a Houston-based volunteer medical mission, with successful field deployment in Costa Rica (April 2026). Background includes founding a competitive esports organization with international developer partnerships, and 2 years in client-facing event operations. Heading into UCF's NSA-designated cybersecurity program (Fall 2026) on an accelerated B.S. to M.S. track. Targeting cloud security, infrastructure, and cleared defense roles.`;

export const capabilities = [
  {
    category: 'Infrastructure & Linux',
    icon: 'server',
    items: [
      'Ubuntu Server',
      'Apache · Nginx',
      'MariaDB · MySQL',
      'VirtualBox',
      'Wi-Fi 6 Mesh',
      'LAN/WAN',
      'Netplan · DHCP/DNS',
    ],
  },
  {
    category: 'Security',
    icon: 'shield',
    items: [
      'Private CA · OpenSSL',
      'TLS · HTTPS hardening',
      'UFW · iptables',
      'RBAC · ACLs',
      'Entra ID',
      'Least Privilege',
      'HIPAA-aligned posture',
    ],
  },
  {
    category: 'Cloud & DevOps',
    icon: 'cloud',
    items: [
      'Azure · Entra ID',
      'SharePoint sync',
      'AWS (learning)',
      'Bash · Cron',
      'PowerShell',
      'Git · GitHub',
    ],
  },
  {
    category: 'Application & Data',
    icon: 'code',
    items: [
      'PHP 8.1',
      'Python',
      'SQL · MariaDB',
      'OpenEMR · LBF',
      'HL7 (planned)',
      'TensorFlow Lite',
    ],
  },
];

export const certifications = [
  { name: 'CompTIA Security+', status: 'earned' as const,   url: 'https://placeholder.example.com/comptia-security-plus' },
  { name: 'CompTIA Network+', status: 'earned' as const,    url: 'https://placeholder.example.com/comptia-network-plus' },
  { name: 'Google IT Support', status: 'earned' as const,   url: 'https://www.credly.com/badges/835f3b5d-8240-4fb8-a3c7-a4857ca1dded/public_url' },
  { name: 'Azure AZ-500',      status: 'progress' as const, url: 'https://placeholder.example.com/azure-az-500' },
];

type ExperienceBulletGroup = {
  heading?: string;
  items: string[];
};

type ExperienceLink = {
  url: string;
  label: string;
};

type ExperienceMetric = {
  value: string;
  label: string;
};

type ExperienceEntry = {
  role: string;
  company: string;
  location: string;
  dates: string;
  links?: ExperienceLink[];
  metrics?: ExperienceMetric[];
  bulletGroups?: ExperienceBulletGroup[];
  bullets?: string[];
  closingNote?: string;
};

export const experience: ExperienceEntry[] = [
  {
    role: 'Tech Operations Lead',
    company: 'Medical Missionaries of Divine Mercy',
    location: 'Houston, TX',
    dates: '2023 – Present',
    links: [
      { url: 'https://mmdm.org', label: 'MMDM.org' },
      { url: 'https://mmdm.andrewcastor.dev', label: 'Field Journal' },
    ],

    metrics: [
      { value: '6', label: 'Clinical Stations' },
      { value: '~40%', label: 'Intake Delay ↓' },
      { value: '50+', label: 'Users Trained' },
      { value: '1,121', label: 'Patients Served' },
    ],
    bulletGroups: [
      {
        heading: 'Security & Infrastructure',
        items: [
          'Rebuilt OpenEMR 7.0.x on Ubuntu 22.04 / Apache / MariaDB 10.6 / PHP 8.1 after diagnosing an AJAX/JSON failure rooted in globals.php; chose full rebuild over patch to eliminate latent config drift.',
          'Built private Certificate Authority and signed server certificate with OpenSSL; deployed the full chain to /etc/ssl/openemr/ and enforced HTTP → HTTPS 301 redirect for offline TLS coverage.',
          'Hardened OS for austere field conditions — UFW firewall scoped to ports 80/22, disabled snapd and unattended-upgrades to eliminate unplanned reboots, and configured daily cron-driven encrypted backups with 30-day rotation.',
          'Designed HIPAA-aligned RBAC across 8 station-specific service accounts with documented post-pilot tightening plan; provisioned VirtualBox snapshot rollback strategy for rapid recovery.',
          'Designed and deployed a 50,000 sq ft Wi-Fi 6 mesh network spanning five buildings with segmented VLANs, DHCP/DNS, and offline-tolerant routing.',
        ],
      },
      {
        heading: 'Clinical Systems & Operations',
        items: [
          'Mapped bilingual paper-based workflow (Spanish patient-facing, English provider-facing) to OpenEMR schema across 6 stations; selected native modules where possible and scoped custom Layout-Based Forms only for gaps.',
          'Built Spanish-language Registration LBF (Registro de Pacientes y la Forma de Examen) mirroring 2026 paper form: demographics, vitals, allergy/medication intake, routing checkboxes, and treatment/referral sections.',
          'Built specialized Vision and Dental LBFs with structured medical history alerts, bilateral acuity grids, 32-tooth charting, anesthesia selection, and Rx dispensing tracking; specified autorefractor CSV ingest as next-phase integration.',
          'Conducted workflow discovery interviews with 8+ station leads (including providers with 26–32 mission tenure); designed paper-shadow-then-collaborative-entry training protocol that onboarded 50+ users.',
          'Engineered secure cloud archival pipeline via Microsoft Entra ID and SharePoint for post-mission data continuity.',
        ],
      },
    ],
    closingNote:
      'Costa Rica Field Deployment (April 18–25, 2026, Grano de Oro): deployed offline LAN running OpenEMR in austere, no-internet environment supporting full-cycle traveling clinic operations. Roadmap: Laredo (Nov 4–10, 2026) pre-deployment testing track; Costa Rica (April 17–24, 2027) full incorporation; Philippines (Feb 16–25, 2027) first Asia-Pacific deployment.',
  },
  {
    role: 'Bartender · Event Operations',
    company: 'J. Martini Hospitality Group',
    location: 'Houston, TX',
    dates: 'Apr 2023 – Apr 2025',
    links: [
      { url: 'https://jmartiniservices.com/', label: 'View Company' },
    ],
    bullets: [
      'Worked client-facing event operations across the Houston metro area — corporate gatherings, weddings, and private events for a hospitality firm specializing in premium service delivery (high-end bar service, cigar service, full-event waitstaff coordination).',
      'Trusted by the company owner with multi-venue supply logistics across Houston, transporting setup and inventory between sites on schedules often extending past 2 AM; supported onboarding for new event staff and on-site setup verification. Averaged ~30 hours/week over 2 years.',
    ],
  },
  {
    role: 'Founder & Operations Lead',
    company: 'O Λ S I S',
    location: 'Remote · US / Ukraine / EU',
    dates: '2022 – 2024',
    bullets: [
      'Founded and operated a competitive playtesting organization partnering with indie PvP developers to run structured pre-release events using experienced esports participants for media, feedback, and community momentum.',
      'Built the first competitive scene for Shatterline (Frag Lab Studio, Ukraine) from scratch near the start of the Russia-Ukraine war — negotiated dedicated practice server access across language and time-zone barriers, drafted competitive rulesets, and operated tournament brackets with grant-funded prize pools up to $600.',
      'Expanded to a generalized dev-partnership model after Shatterline — pitched studios at gaming conventions, nearly secured a Stockholm residency with Alara Prime before their funding collapse, and managed community transition through the bankruptcy without losing partner trust.',
    ],
  },
];

export const education = [
  {
    institution: 'University of Central Florida',
    degree: 'B.S. Information Technology (CECS) — Accelerated M.S. Cyber Security & Privacy Track',
    location: 'Orlando, FL',
    dates: 'Fall 2026',
  },
  {
    institution: 'Houston City College',
    degree: 'A.A.S. Artificial Intelligence — National Honor Society',
    location: 'Houston, TX',
    dates: 'Conferred 2025',
    gpa: '3.8',
  },
  {
    institution: 'Houston City College',
    degree: 'A.S. General Science',
    location: 'Houston, TX',
    dates: 'Conferred 2026',
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  status: 'shipped' | 'progress';
  statusLabel: string;
  context?: string;
  description: string;
  bullets?: string[];
  technologies: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'mmdm-openemr',
    title: 'MMDM OpenEMR — Offline-First Clinical Platform',
    category: 'Flagship Project',
    status: 'progress',
    statusLabel: 'Deployed 2026 · Ongoing',
    context: 'Medical Missionaries of Divine Mercy · Houston → Costa Rica · 2024–Present',
    description:
      'Self-hosted EMR built to run a six-station volunteer clinic in a Costa Rican parish hall with no internet, no cloud, and no public DNS. Migrated off a corrupted XAMPP environment to a hardened Ubuntu / Apache / MariaDB / PHP stack with a private certificate authority, daily backups, and bilingual Spanish/English clinical forms. Deployed at the April 18–25, 2026 mission in Grano de Oro, Costa Rica; next field deployment 2027.',
    technologies: [
      'Ubuntu 22.04',
      'Apache',
      'MariaDB 10.6',
      'PHP 8.1',
      'OpenEMR 7.0',
      'Private CA · OpenSSL',
      'UFW',
      'Bash · Cron',
      'Netplan',
      'RBAC',
    ],
    featured: true,
  },
  {
    slug: 'forecastor',
    title: 'foreCastor',
    category: 'Finance · Personal',
    status: 'shipped',
    statusLabel: 'Private',
    description:
      'A PIN-locked personal finance tracker with live bank integration, spending analytics, and a long-term savings goal engine — built entirely for personal use.',
    bullets: [
      'Connected to Bank of America via the Plaid API to automatically import, normalize, and categorize transactions without manual entry.',
      'Tracks a long-term savings goal with a compound-growth projection chart and a target date that changes color based on whether you\'re on pace.',
      'Per-category monthly spending limits with live progress bars that shift from teal to amber to red as you approach and exceed your budget.',
      'Scans transaction history to detect recurring charges and suggests adding them to your fixed expenses list automatically.',
      '31 unlockable achievements tied to real savings milestones, income streaks, and usage habits — with rarity tiers styled after Steam.',
    ],
    technologies: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'Cloudflare Pages',
      'SQLite',
      'Plaid API',
    ],
  },
  {
    slug: 'eegd',
    title: 'Emergency Evacuation Guidance Device',
    category: 'Embedded / IoT',
    status: 'shipped',
    statusLabel: 'Prototype',
    context: 'ENGR 1201 · Houston City College · Spring 2026',
    description:
      'Handheld device that computes real-time evacuation routes via Dijkstra\'s algorithm, rerouting users away from heat sources detected by distributed DS18B20 probes. Raspberry Pi 4 + ESP32 sensor hub over USB-serial.',
    technologies: [
      'Raspberry Pi 4',
      'ESP32',
      'Python · Pygame',
      'NetworkX',
      'USB-Serial',
      'Systemd',
    ],
  },
  {
    slug: 'fall-detection',
    title: 'Fall Detection System',
    category: 'AI / Edge',
    status: 'shipped',
    statusLabel: 'Private',
    description:
      'Flutter safety monitor app paired over BLE to an ESP32 sensor hub. TensorFlow Lite classifies accelerometer, gyroscope, and barometric altitude readings on-device to detect freefall, abrupt impact, or severe rotation — triggering an audible alarm and a servo actuator for physical deployment. Live dashboard shows altitude, heading, temperature, GPS lock, detection probability, and raw sensor waveform. Timestamped event logging for post-incident review. Edge inference, no cloud round-trip.',
    technologies: ['TensorFlow Lite', 'Flutter', 'ESP32', 'BLE', 'Python', 'Raspberry Pi'],
  },
  {
    slug: 'air-grid',
    title: 'air.grid — Live U.S. Air Quality & Emissions Atlas',
    category: 'Geospatial / Data',
    status: 'shipped',
    statusLabel: 'Live 2026',
    context: 'air.andrewcastor.dev · github.com/Osakhra/air.grid · Built in one day, June 2026',
    description:
      'Live U.S. air quality and industrial emissions atlas built in one day using Claude Code\'s multi-agent system. Parallel ingestion agents pulled from 6 federal data sources; a geo-matcher joined 108,336 schools to their nearest emitters using scipy cKDTree; a QA agent validated before deploy. Stack: Next.js, MapLibre, deck.gl, Python. 268,980 facilities, 15,897 live sensors, real proximity joins — no mock data.',
    technologies: [
      'Next.js 14',
      'TypeScript',
      'Tailwind',
      'MapLibre GL',
      'deck.gl',
      'Recharts',
      'Python · geopandas',
      'scipy cKDTree',
      'Vercel',
    ],
  },
  {
    slug: 'splunk-lab',
    title: 'Splunk SOC Home Lab',
    category: 'Security Lab',
    status: 'progress',
    statusLabel: 'In Progress',
    description:
      'Self-hosted Splunk environment for log ingestion, detection rule writing, and SOC triage exercises. Pairs with TryHackMe SOC L1 path.',
    technologies: ['Splunk', 'SIEM', 'Detection Eng'],
  },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Projects', href: '/projects' },
  { label: 'Resume', href: '/resume' },
  { label: 'About', href: '/about' },
];

// Flagship case study — full deep-dive content for /projects/mmdm-openemr
export const mmdmCaseStudy = {
  metrics: [
    { value: '6', label: 'Clinical Stations' },
    { value: '1,121', label: 'Patients in 40 hours' },
    { value: '50+', label: 'Users Trained' },
    { value: 'Offline', label: 'Operations Posture' },
  ],
  problem:
    'Corrupted Windows XAMPP stack with Aria storage engine failure. Paper forms across six clinical stations. No backups, no encryption, no recovery path. Mission-critical with zero connectivity guarantee.',
  solution:
    'Clean rebuild on Ubuntu 22.04 + Apache + MariaDB 10.6 + PHP 8.1. Private CA for offline TLS. UFW-hardened LAN posture. Daily cron backups with 30-day rotation. VirtualBox snapshot recovery.',
  impact:
    'Replaced 20+ years of paper workflow with structured clinical data. HIPAA-aligned posture. Recoverable from hardware failure. Designed for volunteers to redeploy at any mission site without a network engineer present.',
  shipped: [
    'Linux VM rebuild & XAMPP migration',
    'Private CA + hardened Apache TLS',
    'RBAC across 6 clinical stations',
    'Daily cron backups, 30-day rotation',
    'Implementation guide (canonical doc)',
  ],
  roadmap: [
    'Laredo, TX · Nov 4–10, 2026 — HIPAA pre-deployment test track',
    'Costa Rica · April 17–24, 2027 — full clinical incorporation',
    'Philippines · Feb 16–25, 2027 — first Asia-Pacific deployment',
  ],
  principles: [
    {
      title: 'Offline-first',
      desc: 'No cloud, no public DNS, no assumed internet. The system must work in a Costa Rican parish hall with nothing but a power strip.',
    },
    {
      title: 'HIPAA-aligned posture',
      desc: 'Even though Costa Rica patients aren\'t covered by HIPAA, the same controls protect everyone.',
    },
    {
      title: 'Structured data over free text',
      desc: 'Every paper form field becomes a queryable database column so the mission can produce real statistics.',
    },
    {
      title: 'Recoverable',
      desc: 'Snapshots, daily backups, and a documented rebuild path mean a single hardware failure doesn\'t end the mission.',
    },
  ],
};
