import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#080B12',
          secondary: '#0D1117',
          tertiary: '#131A24',
          terminal: '#0A0E18',
        },
        accent: {
          teal: '#1E9E8A',
          'teal-dim': '#17796A',
          'teal-glow': 'rgba(30,158,138,0.4)',
          purple: '#5B2D8E',
          'purple-soft': '#B89CE0',
          'purple-bright': '#C9B0EA',
        },
        text: {
          primary: '#E8ECF1',
          secondary: '#B5BFCD',
          tertiary: '#8B95A5',
          muted: '#5A6577',
        },
        border: {
          subtle: '#1E2737',
          DEFAULT: '#2A3444',
          accent: 'rgba(30,158,138,0.4)',
        },
        status: {
          'shipped-bg': 'rgba(30,158,138,0.12)',
          'shipped-border': 'rgba(30,158,138,0.3)',
          'progress-bg': 'rgba(91,45,142,0.15)',
          'progress-border': 'rgba(91,45,142,0.4)',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        body: ['Outfit', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'pulse-slow': 'pulseSlow 3s ease-in-out infinite',
        blink: 'blink 1.2s step-end infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 8px rgba(30,158,138,0.4)' },
          '50%': { opacity: '0.6', boxShadow: '0 0 4px rgba(30,158,138,0.2)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
