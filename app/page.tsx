import { getLatestPost, getAllPostsMeta } from "@/lib/posts";

const projects = [
  {
    name: "Sun Chaser",
    desc: "Find sunny patios in Toronto and spend time outside.",
    href: "https://sun.vitalistechnology.com",
    status: "",
  },
];

export default function Home() {
  const latest = getLatestPost();
  const entryNumber = getAllPostsMeta().length;

  return (
    <div className="max-w-[760px] mx-auto px-7">
      <section className="pt-20 pb-16">
        <h1 className="font-display font-medium text-[34px] leading-[1.28] tracking-tight max-w-[620px]">
          IT spend optimization for finance leaders who
          didn&apos;t sign up to manage a tech budget.
        </h1>
        <p className="mt-5 text-[17px] text-secondary max-w-[520px] leading-relaxed">
          Every month you delay aligning IT with your business
          objectives, vendor auto-renewals compound and your
          options narrow. I help you find the budget already
          inside your existing spend —
          before the decision gets made under pressure.
        </p>
        <div className="mt-7 font-mono text-[13.5px] text-accent-dim leading-relaxed">
          Past clients have cut operational spend by 30% and reduced downtime by 66%
        </div>
      </section>

      {latest && (
        <section className="py-12 border-t border-border">
          <div className="flex justify-between mb-5 font-mono text-xs uppercase tracking-widest text-secondary">
            <span>Latest entry</span>
            {/* <span className="text-accent-dim">
             No. {String(entryNumber).padStart(3, "0")}
            </span> */}
          </div>
          <a href={`/blog/${latest.slug}`} className="block">
            <div className="entry-card relative bg-surface border border-border rounded hover:border-accent-dim hover:bg-surface-hover transition-colors p-9">
              <div className="stamp absolute top-6 right-7 w-[78px] h-[78px] border border-dashed border-accent-dim rounded-full flex items-center justify-center text-accent-dim">
                <div className="text-center font-mono text-[8.5px] uppercase tracking-wider leading-relaxed">
                  Filed
                  <b className="block text-[9.5px] text-accent font-medium">
                    {new Date(latest.date)
                      .toLocaleDateString("en-CA", {
                        year: "2-digit",
                        month: "2-digit",
                        day: "2-digit",
                      })
                      .replace(/-/g, ".")}
                  </b>
                </div>
              </div>
              <h2 className="font-display font-medium text-[23px] max-w-[440px] leading-snug">
                {latest.title}
              </h2>
              <p className="mt-3.5 text-base text-secondary max-w-[460px]">
                {latest.excerpt}
              </p>
              <div className="mt-5 font-mono text-xs text-secondary">
                {latest.date} &nbsp;·&nbsp; {latest.readingTime} &nbsp;·&nbsp;{" "}
                {latest.tag}
              </div>
              <span className="read-link inline-block mt-5 font-mono text-[12.5px] text-accent">
                Read entry →
              </span>
            </div>
          </a>
        </section>
      )}

      <section id="projects" className="py-12 border-t border-border">
        <div className="mb-5 font-mono text-xs uppercase tracking-widest text-secondary">
          Projects
        </div>
        <div className="flex flex-col">
          {projects.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className={`flex justify-between items-baseline gap-6 py-5 ${i !== 0 ? "border-t border-border" : ""
                }`}
            >
              <span className="font-display font-medium text-[17px] whitespace-nowrap">
                {p.name}
              </span>
              <span className="text-sm text-secondary flex-1">{p.desc}</span>
              {p.status ? (
                <span className="font-mono text-[11px] uppercase tracking-wider text-accent-dim whitespace-nowrap">
                  {p.status}
                </span>
              ) : (
                <span className="font-mono text-sm text-secondary">→</span>
              )}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
