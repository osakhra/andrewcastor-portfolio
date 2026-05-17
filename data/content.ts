export const siteConfig = {
  name: 'Andrew Castor',
  legalName: 'John Andrew Castor',
  title: 'Infrastructure & Cloud Security Engineer',
  domain: 'andrewcastor.dev',
  email: 'JohnAndrewCastor@gmail.com',
  location: 'Houston, Sugarland, TX',
  availability: 'Relacating · July 2026 → Orlando, FL',
  resumeFilename: 'Andrew_Castor_Resume.pdf',
  links: {
    github: 'https://github.com/osakhra',
    linkedin: 'https://linkedin.com/in/jandrewcastor',
  },
  meta: {
    description:
      'Andrew Castor — Infrastructure & Cloud Security Engineer. Building secure, offline-first systems for environments where reliability isn\'t optional.',
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

export const summary = `I build secure, offline-first systems for environments where reliability isn't optional — healthcare clinics in austere field conditions, multi-site networks, and hardened Linux deployments. Currently shipping a self-hosted EMR for a Costa Rica medical mission and preparing for cleared defense work.`;

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
  { name: 'CompTIA Security+', status: 'earned' as const },
  { name: 'CompTIA Network+', status: 'earned' as const },
  { name: 'Google IT Support', status: 'earned' as const },
  { name: 'Azure AZ-500', status: 'progress' as const },
];

export const experience = [
  {
    role: 'Tech Operations Lead',
    company: 'Medical Missionaries of Divine Mercy',
    location: 'Houston, TX',
    dates: '2023 – Present',
    bullets: [
      'Led end-to-end EMR modernization using OpenEMR on a hardened Linux/Apache/MariaDB/PHP stack, replacing 20+ years of paper-based workflow across six clinical stations.',
      'Migrated a corrupted Windows XAMPP environment to Ubuntu 22.04 on VirtualBox with private CA-issued TLS certificates, UFW firewall, and daily cron-based backups with 30-day rotation.',
      'Designed and deployed a 50,000 sq ft Wi-Fi 6 mesh network spanning five buildings with segmented VLANs, DHCP/DNS, and offline-tolerant routing.',
      'Implemented RBAC, ACLs, TLS/HTTPS encryption, and least-privilege access controls; engineered secure cloud archival pipeline via Microsoft Entra ID and SharePoint.',
      'Conducted workflow discovery across Registration, Triage, Medical, Dental, Vision, and Pharmacy departments; trained 50+ end users.',
      'Costa Rica Field Deployment (April 2026): deployed offline LAN running OpenEMR + OpenMRS in austere, no-internet environment supporting full-cycle traveling clinic operations.',
    ],
  },
];

export const education = [
  {
    institution: 'University of Central Florida',
    degree: 'B.S. Information Technology (CECS) — Accelerated M.S. Cyber Security & Privacy Track',
    location: 'Orlando, FL',
    dates: 'Fall 2026 – Expected 2030',
  },
  {
    institution: 'Houston Community College',
    degree: 'A.A.S. Artificial Intelligence — National Honor Society',
    location: 'Houston, TX',
    dates: 'Conferred 2025',
    gpa: '3.8',
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
  technologies: string[];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: 'mmdm-openemr',
    title: 'MMDM OpenEMR — Offline-First Clinical Platform',
    category: 'Flagship Project',
    status: 'progress',
    statusLabel: 'In Production · Field Deploy 2027',
    context: 'Medical Missionaries of Divine Mercy · Houston → Costa Rica · 2024–Present',
    description:
      'Self-hosted EMR built to run a six-station volunteer clinic in a Costa Rican parish hall with no internet, no cloud, and no public DNS. Migrated off a corrupted XAMPP environment to a hardened Ubuntu / Apache / MariaDB / PHP stack with a private certificate authority, daily backups, and bilingual Spanish/English clinical forms.',
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
    slug: 'wifi6-mesh',
    title: '50,000 sq ft Wi-Fi 6 Mesh',
    category: 'Network Architecture',
    status: 'shipped',
    statusLabel: 'Deployed',
    description:
      'Multi-building Wi-Fi 6 mesh across five buildings for MMDM Houston ops center. Segmented VLANs, DHCP/DNS, offline-tolerant routing.',
    technologies: ['Wi-Fi 6', 'VLAN', 'Multi-site LAN'],
  },
  {
    slug: 'eegd',
    title: 'Emergency Evacuation Guidance Device',
    category: 'Embedded / IoT',
    status: 'shipped',
    statusLabel: 'Shipped',
    context: 'ENGR 1201 · University of Houston · Spring 2026',
    description:
      'Handheld device that computes real-time evacuation routes via Dijkstra\'s algorithm, rerouting users away from heat sources detected by distributed DS18B20 probes. Raspberry Pi 4 + ESP32 sensor hub over USB-serial.',
    technologies: [
      'Raspberry Pi 4',
      'ESP32',
      'Python · Pygame',
      'NetworkX',
      'DS18B20',
      '1-Wire',
      'USB-Serial',
      'Systemd',
    ],
  },
  {
    slug: 'fall-detection',
    title: 'Fall Detection System',
    category: 'AI / Edge',
    status: 'shipped',
    statusLabel: 'Prototype',
    description:
      'Real-time emergency detection model on TensorFlow Lite + Raspberry Pi with mobile alert integration. Edge inference, no cloud round-trip.',
    technologies: ['TF Lite', 'Raspberry Pi', 'Python'],
  },
  {
    slug: 'newsbot',
    title: 'NewsBot 2.0',
    category: 'NLP / ML',
    status: 'shipped',
    statusLabel: 'Complete',
    description:
      'NLP pipeline for news article classification, sentiment analysis, and multilingual translation.',
    technologies: ['NLP', 'Sentiment', 'Translation'],
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
];

// Flagship case study — full deep-dive content for /projects/mmdm-openemr
export const mmdmCaseStudy = {
  metrics: [
    { value: '6', label: 'Clinical Stations' },
    { value: '30–40%', label: 'Intake Delay ↓' },
    { value: '50+', label: 'Users Trained' },
    { value: '0', label: 'Internet Required' },
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
    'Bilingual LBFs across all 6 stations',
    'Custom dental tooth-chart widget (PHP)',
    'Autorefractor CSV ingest pipeline',
    'HL7 export for CR National Healthcare',
    'Off-VM encrypted USB backup',
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
