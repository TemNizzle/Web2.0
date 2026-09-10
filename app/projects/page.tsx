import { getProjects } from "@/lib/content";
import { CatalogEntry } from "@/components/catalog";

export const metadata = { title: "Projects" };

export default function ProjectsIndex() {
  const projects = getProjects();

  return (
    <div className="max-w-catalog mx-auto px-[30px] pt-11">
      <h1 className="font-display font-semibold text-[25px]">Projects</h1>
      <p className="mt-1.5 mb-7 text-[15px] leading-relaxed text-secondary max-w-[48ch]">
        Small tools I&rsquo;ve built. Each has its own home &mdash; these are the
        write-ups.
      </p>

      {projects.map((p, i) => (
        <CatalogEntry
          key={p.slug}
          href={`/projects/${p.slug}`}
          num={`P-${String(projects.length - i).padStart(2, "0")}`}
          badge="Project"
          meta={
            <>
              {p.status || "—"}
              <br />
              {p.year || ""}
            </>
          }
          accentMeta={p.status.toLowerCase() === "live"}
          title={p.name}
          excerpt={p.summary}
        />
      ))}

      {projects.length === 0 && (
        <p className="text-secondary border-t border-border pt-5">
          No projects yet &mdash; add a markdown file to content/projects.
        </p>
      )}
    </div>
  );
}
