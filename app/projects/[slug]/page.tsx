import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, getProjects, getEssays } from "@/lib/content";

export function generateStaticParams() {
  return getProjects().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const p = await getProject(params.slug);
    return { title: p.name, description: p.summary };
  } catch {
    return {};
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  let project;
  try {
    project = await getProject(params.slug);
  } catch {
    notFound();
  }

  const related = getEssays().filter((e) => e.project === project.slug);
  const isLive = project.status.toLowerCase() === "live";

  return (
    <article className="max-w-measure mx-auto px-[30px] pt-11">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="font-display font-bold text-[26px]">{project.name}</h1>
        <span
          className={`font-mono text-[11px] uppercase tracking-[0.1em] whitespace-nowrap ${
            isLive ? "text-grow" : "text-muted"
          }`}
        >
          {project.status}
          {project.year ? ` · ${project.year}` : ""}
        </span>
      </div>

      <p className="mt-3.5 text-[17px] leading-[1.6] max-w-[46ch]">{project.summary}</p>

      {(project.url || project.repo) && (
        <div className="flex flex-wrap gap-2.5 mt-5">
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] border border-accent/50 rounded-[3px] px-3 py-1.5 text-accent hover:bg-accent hover:text-bg transition-colors"
            >
              Visit &rarr;
            </a>
          )}
          {project.repo && (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12px] border border-border rounded-[3px] px-3 py-1.5 text-muted hover:text-primary transition-colors"
            >
              Source
            </a>
          )}
        </div>
      )}

      <div
        className="prose-custom mt-8 text-[16px] leading-[1.75] text-primary"
        dangerouslySetInnerHTML={{ __html: project.contentHtml }}
      />

      {project.stack.length > 0 && (
        <div className="mt-9">
          <div className="kicker mb-2">Stack</div>
          <div className="font-mono text-[12.5px] text-secondary">
            {project.stack.join(" · ")}
          </div>
        </div>
      )}

      {related.length > 0 && (
        <div className="mt-8 border-t border-border pt-5">
          <div className="kicker mb-2">Related writing</div>
          {related.map((e) => (
            <Link
              key={e.slug}
              href={`/essays/${e.slug}`}
              className="block font-mono text-[12.5px] text-accent hover:underline"
            >
              {e.title} &rarr;
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10">
        <Link
          href="/projects"
          className="font-mono text-[12px] text-accent hover:underline"
        >
          &larr; All projects
        </Link>
      </div>
    </article>
  );
}
