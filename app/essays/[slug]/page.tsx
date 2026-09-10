import Link from "next/link";
import { notFound } from "next/navigation";
import { getEssay, getEssays, getProjects } from "@/lib/content";
import { formatDate } from "@/components/catalog";

export function generateStaticParams() {
  return getEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const e = await getEssay(params.slug);
    return { title: e.title, description: e.excerpt };
  } catch {
    return {};
  }
}

export default async function EssayPage({ params }: { params: { slug: string } }) {
  let essay;
  try {
    essay = await getEssay(params.slug);
  } catch {
    notFound();
  }

  const project = essay.project
    ? getProjects().find((p) => p.slug === essay.project)
    : null;

  return (
    <article className="max-w-measure mx-auto px-[30px] pt-11">
      <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted">
        {essay.tag}
      </div>
      <h1 className="font-display font-semibold text-[27px] leading-[1.25] mt-3">
        {essay.title}
      </h1>
      <div className="mt-3 font-mono text-[11.5px] text-muted">
        {formatDate(essay.date)} &nbsp;&middot;&nbsp; {essay.readingTime}
      </div>

      <div
        className="prose-custom mt-9 text-[17px] leading-[1.75] text-primary"
        dangerouslySetInnerHTML={{ __html: essay.contentHtml }}
      />

      {project && (
        <div className="mt-12 border-t border-border pt-5">
          <div className="kicker mb-2">From the project</div>
          <Link
            href={`/projects/${project.slug}`}
            className="font-display font-medium text-[16px] text-primary hover:text-accent transition-colors"
          >
            {project.name} &rarr;
          </Link>
        </div>
      )}

      <div className="mt-10">
        <Link href="/essays" className="font-mono text-[12px] text-accent hover:underline">
          &larr; All essays
        </Link>
      </div>
    </article>
  );
}
