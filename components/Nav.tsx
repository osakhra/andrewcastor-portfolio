'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { navLinks, siteConfig } from '@/data/content';
import { MenuIcon, XIcon } from './Icons';
import ThemeToggle from '@/components/ui/ThemeToggle';

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 z-50 w-full border-b border-border-subtle bg-bg-primary/85 backdrop-blur-xl">
      <nav className="section-container flex h-14 items-center justify-between">
        <Link
          href="/"
          className="font-display text-[14px] font-semibold tracking-wide text-text-primary transition-colors hover:text-accent-teal"
        >
          <span className="text-accent-teal">{'>'}</span> andrew.castor
        </Link>

        <ul className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`font-body text-[13px] font-medium transition-colors duration-200 ${
                  isActive(link.href)
                    ? 'text-accent-teal'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={`mailto:${siteConfig.email}`} target="_blank" rel="noopener noreferrer" className="btn-primary !px-3 !py-1.5 !text-[12px]">
              Get in Touch
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>

        <button
          onClick={() => setOpen(!open)}
          className="text-text-tertiary md:hidden"
          aria-label="Toggle menu"
        >
          {open ? <XIcon size={20} /> : <MenuIcon size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-border-subtle bg-bg-primary/95 backdrop-blur-xl md:hidden">
          <ul className="section-container flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-3 py-2.5 font-body text-[15px] font-medium transition-colors ${
                    isActive(link.href)
                      ? 'bg-bg-tertiary text-accent-teal'
                      : 'text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={`mailto:${siteConfig.email}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary inline-flex"
                onClick={() => setOpen(false)}
              >
                Get in Touch
              </a>
            </li>
            <li className="border-t border-border-subtle pt-3 mt-1">
              <div className="flex items-center gap-2 px-3">
                <span className="font-mono text-[11px] text-text-tertiary">Theme</span>
                <ThemeToggle />
              </div>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
