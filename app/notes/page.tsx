import Link from "next/link";
import { getNotes } from "@/lib/content";
import { GrowthDot, shortDate, stageLabel } from "@/components/catalog";

export const metadata = { title: "Notes" };

export default function NotesIndex() {
  const notes = getNotes();

  return (
    <div className="max-w-catalog mx-auto px-[30px] pt-11">
      <h1 className="font-display font-semibold text-[25px]">Notes</h1>
      <p className="mt-1.5 mb-7 text-[15px] leading-relaxed text-secondary max-w-[48ch]">
        Evergreen and unfinished &mdash; things I&rsquo;m still turning over. They
        grow as I revisit them.
      </p>

      {notes.map((n, i) => (
        <Link
          key={n.slug}
          href={`/notes/${n.slug}`}
          className="grid grid-cols-[84px_1fr] sm:grid-cols-[96px_1fr] gap-5 sm:gap-[22px] border-t border-border py-5 group"
        >
          <div>
            <div className="entry-num">N-{String(notes.length - i).padStart(2, "0")}</div>
            <div className="mt-2 flex items-center gap-1.5 font-mono text-[10.5px] text-grow">
              <GrowthDot stage={n.stage} size={11} />
              {stageLabel(n.stage)}
            </div>
            <div className="mt-2 font-mono text-[10.5px] leading-tight text-faint">
              tended
              <br />
              {shortDate(n.updated)}
            </div>
          </div>
          <div>
            <div className="font-display font-medium text-[17px] text-primary group-hover:text-accent transition-colors">
              {n.title}
            </div>
            <p className="mt-1.5 text-[14px] leading-relaxed text-secondary max-w-[52ch]">
              {n.excerpt}
            </p>
            {n.tags.length > 0 && (
              <div className="mt-2 font-mono text-[10.5px] text-faint">
                {n.tags.join(" · ")}
              </div>
            )}
          </div>
        </Link>
      ))}

      {notes.length === 0 && (
        <p className="text-secondary border-t border-border pt-5">
          No notes yet &mdash; add a markdown file to content/notes.
        </p>
      )}
    </div>
  );
}
