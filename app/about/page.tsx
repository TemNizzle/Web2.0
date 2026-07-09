export const metadata = {
  title: "About — Damian",
};

export default function About() {
  return (
    <div className="max-w-[680px] mx-auto px-7 py-16">
      <h1 className="font-display font-medium text-2xl mb-6">About</h1>
      <p className="text-[17px] leading-relaxed text-secondary mb-5">
        I&apos;m an independent IT consultant based in Toronto, working with
        organizations that aren&apos;t in the business of technology — but
        depend on it anyway.
      </p>
      <p className="text-[17px] leading-relaxed text-secondary">
        Over 15+ years in IT leadership, I&apos;ve learned that most
        technology budgets don&apos;t need to grow — they need to be
        re-examined. That&apos;s the work: cost optimization and technology
        strategy that funds what&apos;s next without asking for more budget.
      </p>
    </div>
  );
}
