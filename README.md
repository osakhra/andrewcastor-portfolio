<div align="center">

# CastorUI

### Design system starter for [andrewcastor.dev](https://andrewcastor.dev) and its subdomains

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

A clonable Next.js 14 starter with the full **Castor branding pre-wired**: color tokens, typography, animated background, reusable components, and design rules baked in. Clone it to spin up any subdomain on `*.andrewcastor.dev` without rebuilding the foundation each time.

</div>

---

## Quick start

```bash
git clone https://github.com/osakhra/castor-ui my-new-subdomain
cd my-new-subdomain
rm -rf .git && git init
npm install
npm run dev
```

Open `http://localhost:3000` to see the component showcase.

---

## What you get out of the box

### Stack
- **Next.js 14** with App Router and static export for Cloudflare Pages
- **TypeScript** with strict mode
- **Tailwind CSS 3** with the full token system pre-extended
- Zero animation libraries. Zero UI libraries. Zero runtime deps beyond React.

### Pre-wired branding
- Color tokens in Tailwind config and `data/tokens.ts`
- Fonts loaded: **Sora** (display), **Outfit** (body), **JetBrains Mono** (mono)
- **Network Grid Pulse** canvas background mounted in the root layout
- Scroll progress bar at the top of every page
- Nav and Footer ready to customize per subdomain

### Reusable components
| Component | Purpose |
|---|---|
| `Button` | Primary and outline variants over the `.btn-primary` / `.btn-outline` utility classes |
| `Card` | Translucent surface with backdrop blur and teal hover border |
| `Tag` | Small pill for skill, tech, or category labels |
| `StatusPill` | Shipped (teal) or in-progress (purple) status indicators |
| `SectionHeader` | Bracketed label and title pattern used across the portfolio |
| `SectionNav` | Right-side scroll-spy navigation for long pages |
| `FadeUp` | Drop-in wrapper that fades and translates content into view |
| `AnimatedCounter` | Scroll-triggered numeric counters with ease-out animation |
| `ScrollProgress` | Top-of-page progress bar |
| `NetworkGrid` | Triangulated canvas background with traveling packets |
| `TerminalPanel` | Decorative animated JSON terminal element |
| `Icons` | Hand-rolled SVG icon set including animated GitHub and LinkedIn |

---

## Repository structure