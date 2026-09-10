import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import readingTime from "reading-time";

// The one seam between the markdown files in content/ and the pages.
// Keep this boundary clean; rebuild anything above it freely.

const root = path.join(process.cwd(), "content");

// ---------------------------------------------------------------- types

export type Essay = {
  kind: "essay";
  slug: string;
  title: string;
  date: string; // ISO date
  excerpt: string;
  tag: string;
  project: string | null; // slug of a project in content/projects
  readingTime: string;
};

export type NoteStage = "seedling" | "budding" | "evergreen";

export type Note = {
  kind: "note";
  slug: string;
  title: string;
  planted: string;
  updated: string;
  tags: string[];
  excerpt: string;
  stage: NoteStage;
};

export type Project = {
  kind: "project";
  slug: string;
  name: string;
  summary: string;
  status: string; // "live" | "building" | "archived" | free text
  url: string | null;
  repo: string | null;
  stack: string[];
  year: number;
  order: number | null;
};

export type Rendered<T> = T & { contentHtml: string };

// ------------------------------------------------------------- internals

type Frontmatter = { [key: string]: any };

function listSlugs(dir: string): string[] {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

function readFile(dir: string, slug: string): { data: Frontmatter; content: string } {
  const full = path.join(root, dir, `${slug}.md`);
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  return { data, content };
}

// [[slug]] and [[slug|Label]] -> links into /notes. Flat, no backlink index.
function applyWikiLinks(md: string): string {
  return md.replace(
    /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,
    (_match, slug: string, label?: string) => {
      const s = slug.trim();
      const text = (label ?? s).trim();
      return `[${text}](/notes/${s})`;
    }
  );
}

async function toHtml(md: string, opts: { wikiLinks?: boolean } = {}): Promise<string> {
  const src = opts.wikiLinks ? applyWikiLinks(md) : md;
  const processed = await remark().use(html).process(src);
  return processed.toString();
}

function deriveStage(planted: string): NoteStage {
  const days = (Date.now() - new Date(planted).getTime()) / 86_400_000;
  if (!planted || Number.isNaN(days)) return "seedling";
  if (days < 30) return "seedling";
  if (days < 120) return "budding";
  return "evergreen";
}

// One builder per kind so the frontmatter schema lives in exactly one place.

function essayFrom(slug: string, data: Frontmatter, content: string): Essay {
  return {
    kind: "essay",
    slug,
    title: data.title ?? slug,
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    tag: data.tag ?? "Essay",
    project: data.project ?? null,
    readingTime: readingTime(content).text,
  };
}

function noteFrom(slug: string, data: Frontmatter): Note {
  const planted = data.planted ?? data.updated ?? "";
  return {
    kind: "note",
    slug,
    title: data.title ?? slug,
    planted,
    updated: data.updated ?? planted,
    tags: Array.isArray(data.tags) ? data.tags : [],
    excerpt: data.excerpt ?? "",
    stage: (data.stage as NoteStage) ?? deriveStage(planted),
  };
}

function projectFrom(slug: string, data: Frontmatter): Project {
  return {
    kind: "project",
    slug,
    name: data.name ?? slug,
    summary: data.summary ?? "",
    status: data.status ?? "",
    url: data.url ?? null,
    repo: data.repo ?? null,
    stack: Array.isArray(data.stack) ? data.stack : [],
    year: Number(data.year) || 0,
    order: typeof data.order === "number" ? data.order : null,
  };
}

// --------------------------------------------------------------- essays

export function getEssays(): Essay[] {
  return listSlugs("essays")
    .map((slug) => {
      const { data, content } = readFile("essays", slug);
      return essayFrom(slug, data, content);
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getEssay(slug: string): Promise<Rendered<Essay>> {
  const { data, content } = readFile("essays", slug);
  return { ...essayFrom(slug, data, content), contentHtml: await toHtml(content) };
}

// ---------------------------------------------------------------- notes

export function getNotes(): Note[] {
  return listSlugs("notes")
    .map((slug) => noteFrom(slug, readFile("notes", slug).data))
    .sort((a, b) => (a.updated < b.updated ? 1 : -1));
}

export async function getNote(slug: string): Promise<Rendered<Note>> {
  const { data, content } = readFile("notes", slug);
  return {
    ...noteFrom(slug, data),
    contentHtml: await toHtml(content, { wikiLinks: true }),
  };
}

// ------------------------------------------------------------- projects

export function getProjects(): Project[] {
  return listSlugs("projects")
    .map((slug) => projectFrom(slug, readFile("projects", slug).data))
    .sort((a, b) => {
      if (a.order != null && b.order != null) return a.order - b.order;
      if (a.order != null) return -1;
      if (b.order != null) return 1;
      return b.year - a.year;
    });
}

export async function getProject(slug: string): Promise<Rendered<Project>> {
  const { data, content } = readFile("projects", slug);
  return { ...projectFrom(slug, data), contentHtml: await toHtml(content) };
}

// ------------------------------------------------------------------ now

export async function getNow(): Promise<{ updated: string; contentHtml: string }> {
  const full = path.join(root, "now.md");
  if (!fs.existsSync(full)) return { updated: "", contentHtml: "" };
  const { data, content } = matter(fs.readFileSync(full, "utf8"));
  return { updated: data.updated ?? "", contentHtml: await toHtml(content) };
}

// ----------------------------------------------- homepage: recent thinking

export type FeedItem =
  | {
      kind: "essay";
      slug: string;
      title: string;
      excerpt: string;
      date: string;
      tag: string;
      readingTime: string;
    }
  | {
      kind: "note";
      slug: string;
      title: string;
      excerpt: string;
      date: string;
      stage: NoteStage;
    };

// Essays and notes interleaved, most-recently-touched first.
export function getRecentThinking(limit = 5): FeedItem[] {
  const essays: FeedItem[] = getEssays().map((e) => ({
    kind: "essay",
    slug: e.slug,
    title: e.title,
    excerpt: e.excerpt,
    date: e.date,
    tag: e.tag,
    readingTime: e.readingTime,
  }));
  const notes: FeedItem[] = getNotes().map((n) => ({
    kind: "note",
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt,
    date: n.updated,
    stage: n.stage,
  }));
  return [...essays, ...notes]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, limit);
}
