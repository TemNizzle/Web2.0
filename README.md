# damian-site

Personal site: homepage, blog, and a home for project links. Built with Next.js 14 (App Router) + Tailwind CSS.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. The homepage pulls in whatever's in `content/blog` and shows the most recent post automatically.

## Writing blog posts

Add a markdown file to `content/blog/your-slug.md`:

```markdown
---
title: "Your post title"
date: "2026-07-15"
excerpt: "One or two sentence summary shown on the homepage and blog index."
tag: "Strategy"
---

Your post content here, written in plain markdown.
```

The homepage always shows the most recent post by `date`. No build step or restart needed in dev — just save the file.

## Project structure

```
app/
  layout.tsx        — shared header/footer, fonts, global metadata
  page.tsx           — homepage (hero, latest entry, projects)
  about/page.tsx      — about page
  blog/page.tsx        — full post index
  blog/[slug]/page.tsx  — individual post page
lib/posts.ts         — reads and parses markdown from content/blog
content/blog/*.md    — your posts live here
```

## Design tokens

Colors, fonts, and spacing live in `tailwind.config.ts` and `app/globals.css`. The palette:

- `bg` `#10151B` — page background (ink navy)
- `surface` `#171E26` — cards
- `border` `#2A323C` — hairlines
- `primary` `#ECE8DE` — body text
- `secondary` `#8D95A0` — muted text
- `accent` `#C9A961` — the one accent color (links, the "filed" stamp)

Fonts: Space Grotesk (headings), Source Serif 4 (body), IBM Plex Mono (dates, labels, nav).

## Deploying to Vercel

1. Push this project to a GitHub repo.
2. Import it in Vercel (vercel.com/new).
3. Vercel auto-detects Next.js — no config needed. Deploy.
4. In Vercel → Settings → Domains, add your domain.

## Adding subdomains for other projects (next step)

Once you have separate projects (e.g. Vitalis Consulting, the tennis club concept), the cleanest approach on Vercel is:

- **Separate Vercel projects**, each mapped to its own subdomain (`vitalis.yourdomain.com`, `courts.yourdomain.com`) via Domains settings — good if each project has its own codebase.
- **One repo, Next.js middleware** that reads the `Host` header and rewrites to a `/sites/[subdomain]` folder — good if you want to manage everything from this one project.

Happy to build out either approach when you're ready — let me know which project you want to wire up first.
