import type { Config } from 'tailwindcss';

// All color values reference CSS custom properties defined in app/globals.css.
// No raw hex anywhere in this file — see the token audit in globals.css.
//
// Colors that are used with Tailwind opacity modifiers (e.g. bg-bg-primary/85)
// use the rgb(var(--token-rgb) / <alpha-value>) pattern so opacity composition works.
// Colors that are never opacity-modified use var(--token-name) directly.

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          // rgb() variants support opacity modifiers: bg-bg-primary/85, etc.
          primary:   'rgb(var(--bg-primary-rgb) / <alpha-value>)',
          secondary: 'rgb(var(--bg-secondary-rgb) / <alpha-value>)',
          tertiary:  'rgb(var(--bg-tertiary-rgb) / <alpha-value>)',
          terminal:  'var(--bg-terminal)',
        },
        accent: {
          // teal used with opacity modifiers: border-accent-teal/50, bg-accent-teal/[0.06], etc.
          teal:           'rgb(var(--accent-teal-rgb) / <alpha-value>)',
          'teal-dim':     'var(--accent-teal-dim)',
          'teal-glow':    'var(--accent-teal-glow)',
          purple:         'var(--accent-purple)',
          'purple-soft':  'var(--accent-purple-soft)',
          // purple-bright used with opacity modifiers: text-accent-purple-bright/70, etc.
          'purple-bright': 'rgb(var(--accent-purple-bright-rgb) / <alpha-value>)',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary:  'var(--text-tertiary)',
          muted:     'var(--text-muted)',
        },
        border: {
          subtle:  'var(--border-subtle)',
          DEFAULT: 'var(--border-default)',
          accent:  'var(--border-accent)',
        },
        status: {
          'shipped-bg':       'var(--status-shipped-bg)',
          'shipped-border':   'var(--status-shipped-border)',
          'progress-bg':      'var(--status-progress-bg)',
          'progress-border':  'var(--status-progress-border)',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body:    ['Outfit', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out forwards',
        'fade-up':    'fadeUp 0.6s ease-out forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        blink:        'blink 1.2s step-end infinite',
      },
      keyframes: {
        // Keyframe rgba values kept as-is per spec — animation effects, not semantic tokens.
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px rgb(var(--accent-teal-rgb) / 0.4)' },
          '50%':       { opacity: '0.6', boxShadow: '0 0 4px rgb(var(--accent-teal-rgb) / 0.2)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
