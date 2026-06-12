import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Resume',
  description:
    'Resume of Andrew Castor: infrastructure and cloud security engineering, healthcare IT, offline-first clinical systems, Security+ and Network+ certified.',
};

export default function ResumeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
