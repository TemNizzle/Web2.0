import Link from "next/link";
import { notFound } from "next/navigation";
import { getNote, getNotes } from "@/lib/content";
import { GrowthDot, formatDate, stageLabel } from "@/components/catalog";

export function generateStaticParams() {
  return getNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const n = await getNote(params.slug);
    return { title: n.title, description: n.excerpt };
  } catch {
    return {};
  }
}

export default async function NotePage({ params }: { params: { slug: string } }) {
  let note;
  try {
    note = await getNote(params.slug);
  } catch {
    notFound();
  }

  return (
    <article className="max-w-measure mx-auto px-[30px] pt-11">
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-1 font-mono text-[11.5px] text-muted">
        <span className="flex items-center gap-1.5 text-grow">
          <GrowthDot stage={note.stage} size={12} />
          {stageLabel(note.stage)}
        </span>
        <span className="text-faint">|</span>
        <span>planted {formatDate(note.planted)}</span>
        <span className="text-faint">|</span>
        <span>tended {formatDate(note.updated)}</span>
      </div>

      <h1 className="font-display font-semibold text-[24px] leading-[1.3] mt-4">
        {note.title}
      </h1>

      <div
        className="prose-custom mt-6 text-[16px] leading-[1.75] text-primary"
        dangerouslySetInnerHTML={{ __html: note.contentHtml }}
      />

      {note.tags.length > 0 && (
        <div className="mt-10">
          <div className="kicker mb-2">Filed under</div>
          <div className="font-mono text-[12px] text-secondary">
            {note.tags.join(" · ")}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link href="/notes" className="font-mono text-[12px] text-accent hover:underline">
          &larr; All notes
        </Link>
      </div>
    </article>
  );
}
