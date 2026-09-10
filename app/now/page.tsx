import { getNow } from "@/lib/content";
import { formatDate } from "@/components/catalog";

export const metadata = {
  title: "Now",
  description: "What Damian is working on this month.",
};

export default async function NowPage() {
  const now = await getNow();

  return (
    <div className="max-w-measure mx-auto px-[30px] pt-11">
      <div className="flex items-baseline justify-between gap-3">
        <h1 className="font-display font-semibold text-[25px]">Now</h1>
        {now.updated && (
          <span className="font-mono text-[11.5px] text-muted">
            updated {formatDate(now.updated)}
          </span>
        )}
      </div>

      {now.contentHtml ? (
        <div
          className="prose-custom mt-6 text-[16px] leading-[1.75] text-primary"
          dangerouslySetInnerHTML={{ __html: now.contentHtml }}
        />
      ) : (
        <p className="mt-6 text-secondary">Nothing filed here yet.</p>
      )}

      <p className="mt-10 font-mono text-[11px] text-faint">
        This is a{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent hover:underline"
        >
          now page
        </a>
        .
      </p>
    </div>
  );
}
