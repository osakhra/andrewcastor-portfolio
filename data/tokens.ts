/**
 * CastorUI Design Tokens
 *
 * `tokens`      — Dark mode raw hex values. Used as canvas/SVG fallbacks when
 *                 CSS vars are not yet resolved (e.g. getComputedStyle returns '').
 * `lightTokens` — Light mode raw hex values. For documentation and canvas use
 *                 if a canvas component is later adapted to read directly from JS.
 * `cssVars`     — CSS variable reference strings for use in JS contexts that
 *                 need to construct style strings with theme-aware values.
 *
 * The ground truth for all values is app/globals.css.
 * Update all three exports together whenever a token changes.
 */

// ─── Dark mode (matches :root in globals.css) ────────────────────────────────
export const tokens = {
  bg: {
    primary:   '#080B12',
    secondary: '#0D1117',
    tertiary:  '#131A24',
    terminal:  '#0A0E18',
  },
  text: {
    primary:   '#D5DDE0',
    secondary: '#B5BEC8',
    tertiary:  '#A8B2BF',
    muted:     '#7E8898',
  },
  border: {
    subtle:  '#1E2737',
    default: '#2A3444',
  },
  accent: {
    teal:          '#1E9E8A',
    tealDim:       '#17796A',
    purple:        '#5B2D8E',
    purpleSoft:    '#B89CE0',
    purpleBright:  '#9B6FD4',
  },
} as const;

// ─── Light mode (matches [data-theme="light"] in globals.css) ─────────────────
export const lightTokens = {
  bg: {
    primary:   '#F4F6FA',
    secondary: '#EAEDF4',
    tertiary:  '#DDE1EC',
    terminal:  '#D0D5E3',
  },
  text: {
    primary:   '#0D1219',
    secondary: '#2A3444',
    tertiary:  '#455266',
    muted:     '#7E8898',
  },
  border: {
    subtle:  '#C8D0DF',
    default: '#B2BCCC',
  },
  accent: {
    teal:          '#1E9E8A',  // unchanged across modes
    tealDim:       '#17796A',  // unchanged across modes
    purple:        '#5B2D8E',  // unchanged across modes
    purpleSoft:    '#7B5CB5',  // darkened for light bg (was #B89CE0)
    purpleBright:  '#7B52B8',  // darkened for WCAG AA on #F4F6FA (was #9B6FD4)
  },
} as const;

// ─── CSS variable reference strings ──────────────────────────────────────────
// Use in JS/TS where you need to pass a theme-aware value to a style prop or
// non-canvas rendering context.
export const cssVars = {
  bg: {
    primary:   'var(--bg-primary)',
    secondary: 'var(--bg-secondary)',
    tertiary:  'var(--bg-tertiary)',
    terminal:  'var(--bg-terminal)',
  },
  text: {
    primary:   'var(--text-primary)',
    secondary: 'var(--text-secondary)',
    tertiary:  'var(--text-tertiary)',
    muted:     'var(--text-muted)',
  },
  border: {
    subtle:  'var(--border-subtle)',
    default: 'var(--border-default)',
    accent:  'var(--border-accent)',
  },
  accent: {
    teal:          'var(--accent-teal)',
    tealDim:       'var(--accent-teal-dim)',
    tealGlow:      'var(--accent-teal-glow)',
    purple:        'var(--accent-purple)',
    purpleSoft:    'var(--accent-purple-soft)',
    purpleBright:  'var(--accent-purple-bright)',
  },
  status: {
    shippedBg:       'var(--status-shipped-bg)',
    shippedBorder:   'var(--status-shipped-border)',
    progressBg:      'var(--status-progress-bg)',
    progressBorder:  'var(--status-progress-border)',
  },
  selectionBg: 'var(--selection-bg)',
} as const;
