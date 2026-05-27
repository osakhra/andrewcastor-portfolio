import type { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import NetworkGrid from '@/components/NetworkGrid';
import ScrollProgress from '@/components/ScrollProgress';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(`https://${siteConfig.domain}`),
  title: {
    default: `${siteConfig.name} · ${siteConfig.title}`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.meta.description,
  keywords: siteConfig.meta.keywords,
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: `https://${siteConfig.domain}`,
    siteName: siteConfig.name,
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.meta.description,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.name} · ${siteConfig.title}`,
    description: siteConfig.meta.description,
  },
  robots: { index: true, follow: true },
};

// FOUC prevention: reads the `theme` cookie and applies data-theme="light"
// before first paint if the user previously selected light mode.
// Must run before any other JS — placed as the first child of <body>.
const themeScript = `(function() {
  try {
    var c = document.cookie.split(';');
    for (var i = 0; i < c.length; i++) {
      var p = c[i].trim().split('=');
      if (p[0] === 'theme' && p[1] === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        return;
      }
    }
  } catch(e) {}
})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <body className="flex min-h-screen flex-col bg-bg-primary text-text-primary">
        {/* Runs synchronously before React hydration to prevent FOUC on light mode */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <NetworkGrid />
        <Nav />
        <ScrollProgress />
        <main className="flex-1 pt-14">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
