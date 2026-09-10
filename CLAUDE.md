# damian-site

Damian's personal site: a place to share **projects and thoughts**. The permanent
home base — a hub that links out to standalone project MVPs (Sun Chaser, etc.) —
not itself an MVP hypothesis test, but still kept minimal.

Full scope, goals, and non-goals live in `SCOPE.md`. Local dev, the frontmatter
shapes, the wiki-link convention, and design tokens live in `README.md`. This
file is the short version.

## Framing principle

**Content is the asset. The site is a skin you should expect to throw away.**

The site changes as Damian develops new ideas. That churn only stays cheap if
the thing being churned is presentation:

- Durable content — essays, notes, project write-ups — is plain markdown in
  `content/`. The app is a disposable rendering layer over it.
- **Nothing that is content lives in a `.tsx` file** — no hardcoded arrays of
  projects, posts, or copy.
- **Frontmatter schema changes are the expensive changes.** Keep the three
  shapes (essay / note / project) boring and stable.
- **URLs are a contract.** Redesigns keep old paths working via redirects.
- **`lib/content.ts` is the seam** — one module, files → typed data. Rebuild
  anything above it freely.

## Content kinds

| kind    | dir                  | frontmatter |
|---------|----------------------|-------------|
| essay   | `content/essays/*.md`   | `title, date, excerpt, tag, project?` |
| note    | `content/notes/*.md`     | `title, planted, updated, tags: [], excerpt, stage?` |
| project | `content/projects/*.md`  | `name, summary, status, url?, repo?, stack: [], year, order?` |

- **Essays** — dated, finished. `project` optionally links an essay to a project slug.
- **Notes** — evergreen, revisable. Show planted + tended dates and a growth
  stage (`seedling` / `budding` / `evergreen`; derived from age if omitted).
  Support `[[slug]]` and `[[slug|Label]]` wiki-links to other notes.
- **Projects** — each has a page here (problem, build, stack, status) and links
  out to its own repo/Vercel deployment. This supersedes the old "this site only
  links out" rule.

Add a markdown file, it appears. No CMS, no admin UI.

## Homepage

Catalog layout: first-person intro, a `/now` line, recent thinking (essays +
tended notes), the projects list, then a **secondary** consulting section with
the discovery-call CTA. The consulting angle (IT spend optimization for finance
leaders) is a hypothesis still being tested — don't treat that copy as settled,
and keep it demoted, not the headline.

## Non-goals

No CMS/admin UI · no comments/newsletter/analytics · no auth · no backlinks
panel or graph view yet · no manual light/dark toggle (follows
`prefers-color-scheme`) · no subdomain routing (each project is its own Vercel
deployment) · no design system beyond the tokens in `tailwind.config.ts` /
`app/globals.css`.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind, deployed to Vercel.
