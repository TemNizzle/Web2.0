# damian-site — scope

Damian's personal site: a place to share **projects and thoughts**. Not an MVP
hypothesis test itself — it's the permanent home base — but kept minimal.

The site will keep changing as Damian develops new ideas. This scope exists so
that churn stays cheap.

## Framing principle

**Content is the asset. The site is a skin you should expect to throw away.**

- Everything durable — essays, notes, project write-ups — lives as plain markdown
  in `content/`, with frontmatter as the one schema kept stable. The Next.js app,
  the Tailwind tokens, the layout, the "catalog" look: all a disposable rendering
  layer over that pile of files, and it should survive a full replatform
  untouched.
- **Nothing that is content lives in a `.tsx` file.** No hardcoded arrays of
  projects, posts, or copy in components.
- **Frontmatter schema changes are the expensive changes** — treat them with more
  care than any component rewrite. Keep the three shapes (essay / note / project)
  boring and stable.
- **URLs are a contract with the outside world.** Every redesign keeps old paths
  working via redirects, never broken links.
- **`lib/content.ts` is the seam** — one module turning files into typed data.
  Keep that boundary clean; rebuild everything above it freely.

## Core features (the 1–3 that matter)

1. **Homepage** — a short first-person intro, a `/now` line, recent thinking
   (essays + tended notes), the projects list, and a secondary consulting
   section with the discovery-call CTA.
2. **Three content kinds, all markdown, no CMS:**
   - **Essays** (`content/essays/*.md`) — dated, finished pieces.
   - **Notes** (`content/notes/*.md`) — evergreen, revisable; show planted +
     tended dates and a growth stage. May cross-link with `[[wiki-links]]`.
   - **Projects** (`content/projects/*.md`) — things built; each gets its own
     page here (problem, what was built, stack, status) and links out to its
     own deployment.
3. **RSS** (`/feed.xml`) — generated from essays + notes. The only distribution
   mechanism.

## Non-goals (deliberately not building)

- No CMS or admin UI — markdown files only.
- No comments, newsletter signup, or analytics.
- No auth / accounts.
- No backlinks panel / "what links here" / graph view yet — `[[wiki-links]]`
  resolve as plain links; the loader is structured so a backlinks panel is a
  later add if wanted.
- No manual light/dark toggle — the site follows `prefers-color-scheme`.
- No multi-tenant subdomain routing — each project is its own Vercel deployment.
- No design system beyond the tokens in `tailwind.config.ts` / `app/globals.css`.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind, deployed to Vercel. See
`README.md` for local dev, the three frontmatter shapes, the wiki-link
convention, and design tokens — keep that current, don't duplicate it here.
