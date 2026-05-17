# andrewcastor.dev

Personal portfolio for Andrew Castor — Infrastructure & Cloud Security Engineer.

## Stack

- **Next.js 14** (App Router) with static export
- **TypeScript**
- **Tailwind CSS**
- **Fonts:** Sora (display), Outfit (body), JetBrains Mono (code)
- **Deployment:** Cloudflare Pages (static)

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
/app                            Next.js App Router pages
  /projects                     Projects index
    /mmdm-openemr              MMDM case study (deep dive)
  /resume                       Resume page
  layout.tsx                    Root layout
  page.tsx                      Home page
  globals.css                   Global styles + Tailwind
/components                     Reusable UI components
/data
  content.ts                    All site content — edit here
/public                         Static assets (resume PDF goes here)
```

## Editing Content

Everything visible on the site is in `data/content.ts`. Update jobs, projects, skills, and certifications there — all pages pull from this file.

### Adding a project

Append to the `projects` array in `data/content.ts`:

```ts
{
  slug: 'project-slug',
  title: 'Project Name',
  category: 'Category Label',
  status: 'shipped',     // or 'progress'
  statusLabel: 'Shipped', // or 'In Progress'
  context: 'Optional context line',
  description: 'What it does.',
  technologies: ['Tech1', 'Tech2'],
}
```

### Updating the resume PDF

Drop your file at `public/John_Andrew_Castor_Resume.pdf` — overwrite the existing one. Both the home page Resume button and the Resume page Download button link to this file.

## Deploying to Cloudflare Pages

1. Push to GitHub (private repo).
2. In Cloudflare dashboard → **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
3. Authorize GitHub and select the repo.
4. Configure build:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
   - Node version: `20`
5. Save and Deploy.
6. In **Custom domains** tab → add `andrewcastor.dev` and `www.andrewcastor.dev`. DNS auto-configures since the domain is on Cloudflare.

## Updates after launch

```bash
git add .
git commit -m "describe changes"
git push
```

Cloudflare auto-deploys within ~2 minutes.
