import { getEssays } from "@/lib/content";
import { CatalogEntry, shortDate } from "@/components/catalog";

export const metadata = { title: "Essays" };

export default function EssayIndex() {
  const essays = getEssays();

  return (
    <div className="max-w-catalog mx-auto px-[30px] pt-11">
      <h1 className="font-display font-semibold text-[25px]">Essays</h1>
      <p className="mt-1.5 mb-7 text-[15px] leading-relaxed text-secondary max-w-[46ch]">
        Finished pieces &mdash; things I&rsquo;ve thought through and am willing to
        stand behind.
      </p>

      {essays.map((e, i) => (
        <CatalogEntry
          key={e.slug}
          href={`/essays/${e.slug}`}
          num={`No. ${String(essays.length - i).padStart(3, "0")}`}
          badge={e.tag}
          meta={
            <>
              {shortDate(e.date)}
              <br />
              {e.readingTime}
            </>
          }
          title={e.title}
          excerpt={e.excerpt}
        />
      ))}

      {essays.length === 0 && (
        <p className="text-secondary border-t border-border pt-5">
          No essays yet &mdash; add a markdown file to content/essays.
        </p>
      )}
    </div>
  );
}
