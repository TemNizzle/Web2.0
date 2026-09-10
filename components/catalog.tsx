import Link from "next/link";
import type { NoteStage } from "@/lib/content";

export function formatDate(iso: string): string {
  if (!iso) return "";
  return new Date(iso + "T00:00:00").toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function shortDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(d.getDate())}.${p(d.getMonth() + 1)}.${String(d.getFullYear()).slice(2)}`;
}

const STAGE_LABEL: Record<NoteStage, string> = {
  seedling: "Seedling",
  budding: "Budding",
  evergreen: "Evergreen",
};

export function GrowthDot({ stage, size = 13 }: { stage: NoteStage; size?: number }) {
  const r = 5.5;
  const c = 7;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      role="img"
      aria-label={STAGE_LABEL[stage]}
      style={{ flex: "none" }}
    >
      {stage === "seedling" && (
        <>
          <circle cx={c} cy={c} r={r} fill="none" stroke="var(--grow)" strokeWidth="1.3" />
          <circle cx={c} cy={c} r="1.8" fill="var(--grow)" />
        </>
      )}
      {stage === "budding" && (
        <>
          <path d={`M${c} ${c - r} A${r} ${r} 0 0 1 ${c} ${c + r} Z`} fill="var(--grow)" />
          <circle cx={c} cy={c} r={r} fill="none" stroke="var(--grow)" strokeWidth="1.3" />
        </>
      )}
      {stage === "evergreen" && <circle cx={c} cy={c} r={r} fill="var(--grow)" />}
    </svg>
  );
}

export function stageLabel(stage: NoteStage): string {
  return STAGE_LABEL[stage];
}

/**
 * One row in a catalogue list: a left metadata gutter, a right column with the
 * linked title and a one-line excerpt.
 */
export function CatalogEntry({
  href,
  num,
  badge,
  meta,
  title,
  excerpt,
  accentMeta,
}: {
  href: string;
  num: string;
  badge: string;
  meta: React.ReactNode;
  title: string;
  excerpt: string;
  accentMeta?: boolean;
}) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[84px_1fr] gap-5 border-t border-border py-5 group sm:grid-cols-[96px_1fr] sm:gap-[22px]"
    >
      <div>
        <div className="entry-num">{num}</div>
        <div className="mt-2">
          <span className="badge">{badge}</span>
        </div>
        <div
          className={`mt-2 font-mono text-[10.5px] leading-tight ${
            accentMeta ? "text-grow" : "text-faint"
          }`}
        >
          {meta}
        </div>
      </div>
      <div>
        <div className="font-display font-medium text-[17px] text-primary group-hover:text-accent transition-colors">
          {title}
        </div>
        <p className="mt-1.5 text-[14px] leading-relaxed text-secondary max-w-[52ch]">
          {excerpt}
        </p>
      </div>
    </Link>
  );
}
