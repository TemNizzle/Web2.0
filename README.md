# damian-site

Damian's personal site — projects and thoughts. Homepage, three content kinds
(essays, notes, projects), and an RSS feed. Built with Next.js 14 (App Router)
+ TypeScript + Tailwind, deployed to Vercel.

See `SCOPE.md` for what this is and isn't. The one rule worth repeating: **content
is the asset, the site is a skin** — everything durable is markdown in `content/`,
and `lib/content.ts` is the only seam between the files and the pages.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000. Add or edit a markdown file under `content/` and it
appears on save — no build step, no restart.

```
npm run build     # production build (also the type/route check)
npm run lint
```

## Information architecture

| path              | what |
|-------------------|------|
| `/`               | intro, `/now` line, recent thinking, projects, consulting (secondary) |
| `/essays`         | essay index |
| `/essays/[slug]`  | an essay |
| `/notes`          | notes index, sorted by last tended |
| `/notes/[slug]`   | a note |
| `/projects`       | project index |
| `/projects/[slug]`| a project write-up |
| `/now`            | what Damian is doing this month |
| `/about`          | bio |
| `/consulting`     | the consulting pitch + discovery-call CTA |
| `/feed.xml`       | RSS — essays + notes |

`/blog` and `/blog/[slug]` redirect to `/essays` (old links keep working).

## Authoring content

Every file needs YAML frontmatter. The three shapes:

### Essay — `content/essays/your-slug.md`

```markdown
---
title: "Your essay title"
date: "2026-08-25"
excerpt: "One or two sentences shown in indexes and the feed."
tag: "Build"
project: "sun-chaser"   # optional — slug of a project in content/projects/
---

Plain markdown.
```

### Note — `content/notes/your-slug.md`

```markdown
---
title: "Your note title"
planted: "2026-06-12"
updated: "2026-09-03"
tags: ["product", "trust"]
excerpt: "One sentence shown in the notes index."
stage: "evergreen"   # optional: seedling | budding | evergreen.
                     # Omitted → derived from how long ago it was planted.
---

Notes can link to other notes with [[other-note-slug]] or
[[other-note-slug|custom link text]].
```

### Project — `content/projects/your-slug.md`

```markdown
---
name: "Sun Chaser"
summary: "One line shown in the projects list and as the page subtitle."
status: "live"        # live | building | archived (free text; "live" shows green)
url: "https://sun.vitalistechnology.com"   # optional — the live deployment
repo: "https://github.com/..."             # optional
stack: ["Next.js", "Vercel", "Mapbox GL"]
year: 2026
order: 1              # optional — lower sorts first; otherwise sorted by year
---

The write-up: the problem, what you built, what you'd do next. Markdown.
```

Growth stage, when `stage` is omitted: `seedling` for the first ~30 days after
`planted`, `budding` to ~120 days, `evergreen` after. Set `stage` explicitly to
override.

Entry numbers on the homepage and indexes (`No. 001`, `N-04`, `P-01`) are
computed at render time from sort order — they are not stored in frontmatter.

## Design tokens

Colors are CSS variables in `app/globals.css`, mapped to Tailwind names in
`tailwind.config.ts`. The site follows the OS light/dark setting
(`prefers-color-scheme`) — there is no in-page toggle.

Light theme (warm paper):

| token         | light     | role |
|---------------|-----------|------|
| `bg`          | `#F3F0E6` | page background |
| `surface`     | `#F8F5EC` | the specimen card |
| `border`      | `#D9D2BE` | hairlines |
| `rule`        | `#1E1D18` | structural 1.5px rules |
| `primary`     | `#1E1D18` | body text |
| `secondary`   | `#5F5A4C` | excerpts, muted body |
| `muted`       | `#96907C` | kickers, labels |
| `faint`       | `#B0A88F` | entry numbers |
| `accent`      | `#8A6A2E` | links |
| `grow`        | `#6E8A5F` | "live" / evergreen cues |

Dark theme redefines the same tokens (brown-black ground, warmer accent) in the
`@media (prefers-color-scheme: dark)` block of `app/globals.css`.

Fonts: Space Grotesk (display / wordmark / entry titles), Source Serif 4 (body),
IBM Plex Mono (dates, labels, nav).

## Deploying to Vercel

Push to GitHub, import at vercel.com/new (Next.js auto-detected, no config),
deploy, add the domain under Settings → Domains.

Each standalone project (Sun Chaser, future ones) is its own repo and its own
Vercel project — this site only links out to them and hosts the write-up.
