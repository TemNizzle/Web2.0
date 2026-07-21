import type { Metadata } from "next";
import { Space_Grotesk, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-serif",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Damian — IT Cost Optimization & Technology Strategy",
  description:
    "IT cost optimization and technology strategy for organizations that aren't in the business of technology.",
  icons: {
    icon: [
      { url: "/vitalis-icon.svg", type: "image/svg+xml" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/vitalis-icon-180.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${serif.variable} ${mono.variable} font-serif`}
      >
        <header className="border-b border-border">
          <div className="max-w-[760px] mx-auto px-7 py-6 flex items-center justify-between">
            <a href="/" className="font-display font-semibold text-base">
              Vitalis Technology<span className="text-accent"></span>
            </a>
            <nav className="flex gap-7">
              <a
                href="/blog"
                className="font-mono text-[12.5px] uppercase tracking-wider text-secondary hover:text-primary transition-colors"
              >
                Blog
              </a>
              <a
                href="/#projects"
                className="font-mono text-[12.5px] uppercase tracking-wider text-secondary hover:text-primary transition-colors"
              >
                Projects
              </a>
              <a
                href="/about"
                className="font-mono text-[12.5px] uppercase tracking-wider text-secondary hover:text-primary transition-colors"
              >
                About
              </a>
            </nav>
          </div>
        </header>

        <section className="border-b border-border">
          <div className="max-w-[760px] mx-auto px-7 py-6 flex justify-center">
            <a
              href="https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ3RYzWv-yZX9WSUnoAr8sFBV-YmpzKmx_gL-RoD7ojp28JJBAj-HRVkRhXxKpSwUYOT50idFV1u"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[12.5px] uppercase tracking-wider text-bg bg-accent hover:bg-accent-dim transition-colors px-6 py-3.5 rounded"
            >
              Book a free 15-min discovery call
            </a>
          </div>
        </section>

        <main>{children}</main>

        <footer className="border-t border-border">
          <div className="max-w-[760px] mx-auto px-7 py-8 flex items-center justify-between font-mono text-xs text-secondary">
            <span>© 2026 Vitalis Technology — Toronto, ON</span>
            <span className="flex gap-5">
              <a href="mailto:d.vidal@outlook.com" className="hover:text-primary transition-colors">
                Email
              </a>
              <a href="https://www.linkedin.com/in/dcvidal/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">
                LinkedIn
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
