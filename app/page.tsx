import Link from "next/link";
import {
  getEssays,
  getNotes,
  getProjects,
  getRecentThinking,
  getNow,
} from "@/lib/content";
import {
  CatalogEntry,
  GrowthDot,
  formatDate,
  shortDate,
  stageLabel,
} from "@/components/catalog";

export default async function Home() {
  const essays = getEssays();
  const notes = getNotes();
  const projects = getProjects();
  const recent = getRecentThinking(6);
  const now = await getNow();

  const essayNum = new Map(
    essays.map((e, i) => [e.slug, `No. ${String(essays.length - i).padStart(3, "0")}`])
  );
  const noteNum = new Map(
    notes.map((n, i) => [n.slug, `N-${String(notes.length - i).padStart(2, "0")}`])
  );

  const [specimen, ...rest] = recent;

  return (
    <div className="max-w-catalog mx-auto px-[30px] pb-4">
      {/* hero */}
      <section className="grid grid-cols-1 sm:grid-cols-[96px_1fr] gap-3 sm:gap-[22px] pt-11 pb-9">
        <div className="kicker sm:pt-1.5">
          Index<span className="hidden sm:inline"><br /></span>
          <span className="sm:hidden"> </span>of work
        </div>
        <div>
          <h1 className="font-display font-semibold text-[26px] leading-[1.3] max-w-[24ch]">
            Consulting, small tools, and notes on both.
          </h1>
          <p className="mt-3.5 text-[15px] leading-relaxed text-secondary max-w-[50ch]">
            Fifteen years in IT leadership, now independent in Toronto. Everything
            I&rsquo;ve filed &mdash; essays, working notes, projects &mdash; is
            catalogued below.
          </p>
        </div>
      </section>

      {/* now */}
      {now.contentHtml && (
        <section className="grid grid-cols-1 sm:grid-cols-[96px_1fr] gap-2 sm:gap-[22px] border-t border-border py-7">
          <div className="kicker sm:pt-1">
            Now
            {now.updated && (
              <span className="sm:block"> &middot; {formatDate(now.updated)}</span>
            )}
          </div>
          <div
            className="prose-custom text-[14.5px] leading-relaxed text-secondary [&_p]:mb-3 [&_p:last-child]:mb-0 max-w-[52ch]"
            dangerouslySetInnerHTML={{ __html: now.contentHtml }}
          />
        </section>
      )}

      {/* specimen — latest entry */}
      {specimen && (
        <section className="pt-7">
          <Link
            href={
              specimen.kind === "essay"
                ? `/essays/${specimen.slug}`
                : `/notes/${specimen.slug}`
            }
            className="block border border-border bg-surface p-6 hover:border-accent transition-colors group"
          >
            <div className="flex justify-between items-baseline gap-3">
              <span className="kicker">Latest entry</span>
              <span className="entry-num">
                {specimen.kind === "essay"
                  ? essayNum.get(specimen.slug)
                  : noteNum.get(specimen.slug)}
              </span>
            </div>
            <h2 className="font-display font-semibold text-[21px] leading-snug mt-3.5 max-w-[30ch] group-hover:text-accent transition-colors">
              {specimen.title}
            </h2>
            <p className="mt-2 text-[14.5px] leading-relaxed text-secondary max-w-[54ch]">
              {specimen.excerpt}
            </p>
            <div className="mt-3.5 font-mono text-[11.5px] text-muted flex items-center gap-2">
              {specimen.kind === "essay" ? (
                <>
                  Essay &middot; {formatDate(specimen.date)} &middot;{" "}
                  {specimen.readingTime} &middot; {specimen.tag}
                </>
              ) : (
                <>
                  <GrowthDot stage={specimen.stage} size={11} />
                  Note &middot; {stageLabel(specimen.stage)} &middot; tended{" "}
                  {formatDate(specimen.date)}
                </>
              )}
            </div>
          </Link>
        </section>
      )}

      {/* catalogue */}
      {rest.length > 0 && (
        <section className="pt-9">
          <div className="kicker mb-1">Catalogue</div>
          {rest.map((item) =>
            item.kind === "essay" ? (
              <CatalogEntry
                key={`e-${item.slug}`}
                href={`/essays/${item.slug}`}
                num={essayNum.get(item.slug) ?? ""}
                badge="Essay"
                meta={shortDate(item.date)}
                title={item.title}
                excerpt={item.excerpt}
              />
            ) : (
              <CatalogEntry
                key={`n-${item.slug}`}
                href={`/notes/${item.slug}`}
                num={noteNum.get(item.slug) ?? ""}
                badge="Note"
                meta={
                  <>
                    tended
                    <br />
                    {shortDate(item.date)}
                  </>
                }
                title={item.title}
                excerpt={item.excerpt}
              />
            )
          )}
        </section>
      )}

      {/* projects */}
      {projects.length > 0 && (
        <section className="pt-9">
          <div className="kicker mb-1">Projects</div>
          {projects.map((p, i) => (
            <CatalogEntry
              key={p.slug}
              href={`/projects/${p.slug}`}
              num={`P-${String(projects.length - i).padStart(2, "0")}`}
              badge="Project"
              meta={p.status || "—"}
              accentMeta={p.status.toLowerCase() === "live"}
              title={p.name}
              excerpt={p.summary}
            />
          ))}
        </section>
      )}

      {/* consulting — secondary */}
      <section className="grid grid-cols-1 sm:grid-cols-[96px_1fr] gap-2 sm:gap-[22px] border-t-[1.5px] border-rule mt-2 pt-7">
        <div className="kicker sm:pt-5">Consulting</div>
        <div className="sm:pt-[18px]">
          <p className="text-[15px] leading-relaxed max-w-[50ch]">
            I also help finance leaders find the budget already inside their
            existing IT spend. Past engagements have cut operational spend by 30%.
          </p>
          <Link
            href="/consulting"
            className="inline-block mt-3 font-mono text-[12px] text-accent hover:text-accent-hover hover:underline"
          >
            How I work &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
