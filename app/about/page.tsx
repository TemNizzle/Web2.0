export const metadata = { title: "About" };

export default function About() {
  return (
    <div className="max-w-measure mx-auto px-[30px] pt-11">
      <h1 className="font-display font-semibold text-[25px] mb-6">About</h1>

      <div className="prose-custom text-[16px] leading-[1.75] text-primary">
        <p>
          I&rsquo;m Damian Vidal. I&rsquo;ve spent fifteen years in IT leadership,
          mostly at organizations that aren&rsquo;t in the business of technology
          but depend on it anyway. I&rsquo;m based in Toronto.
        </p>
        <p>
          These days I do three things: I consult with finance leaders on IT cost
          and technology strategy, I build small tools when a problem annoys me
          enough, and I write about what I learn doing both. This site is where
          that work lives.
        </p>
        <p>
          The thread running through all of it: most technology budgets
          don&rsquo;t need to grow, they need to be re-examined &mdash; and most
          products are more trustworthy when they&rsquo;re honest about what they
          don&rsquo;t know.
        </p>
        <p>
          Reach me at{" "}
          <a href="mailto:d.vidal@outlook.com">d.vidal@outlook.com</a> or on{" "}
          <a
            href="https://www.linkedin.com/in/dcvidal/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>
    </div>
  );
}
