import { getEssays, getNotes } from "@/lib/content";

// The apex domain. Sun Chaser lives at sun.vitalistechnology.com.
const SITE = "https://vitalistechnology.com";

export const dynamic = "force-static";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

type Item = { title: string; link: string; date: string; desc: string; kind: string };

export function GET() {
  const items: Item[] = [
    ...getEssays().map((e) => ({
      title: e.title,
      link: `${SITE}/essays/${e.slug}`,
      date: e.date,
      desc: e.excerpt,
      kind: "Essay",
    })),
    ...getNotes().map((n) => ({
      title: n.title,
      link: `${SITE}/notes/${n.slug}`,
      date: n.updated,
      desc: n.excerpt,
      kind: "Note",
    })),
  ].sort((a, b) => (a.date < b.date ? 1 : -1));

  const lastBuild = items[0]
    ? new Date(items[0].date + "T00:00:00Z").toUTCString()
    : new Date().toUTCString();

  const body = items
    .map(
      (it) => `    <item>
      <title>${esc(it.title)}</title>
      <link>${it.link}</link>
      <guid isPermaLink="true">${it.link}</guid>
      <category>${it.kind}</category>
      <pubDate>${new Date(it.date + "T00:00:00Z").toUTCString()}</pubDate>
      <description>${esc(it.desc)}</description>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Damian Vidal — projects and thoughts</title>
    <link>${SITE}</link>
    <atom:link href="${SITE}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Essays and notes on IT strategy, small tools, and building things honestly.</description>
    <language>en</language>
    <lastBuildDate>${lastBuild}</lastBuildDate>
${body}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
