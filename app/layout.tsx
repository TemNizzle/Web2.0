import type { Metadata } from "next";
import Link from "next/link";
import { Space_Grotesk, Source_Serif_4, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const serif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-serif",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://vitalistechnology.com"),
  title: {
    default: "Damian Vidal — projects and thoughts",
    template: "%s — Damian Vidal",
  },
  description:
    "Damian Vidal: fifteen years in IT leadership, now consulting, building small tools, and writing about both.",
  alternates: {
    types: { "application/rss+xml": "/feed.xml" },
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
  },
};

const nav = [
  { href: "/essays", label: "Essays" },
  { href: "/notes", label: "Notes" },
  { href: "/projects", label: "Projects" },
  { href: "/now", label: "Now" },
  { href: "/about", label: "About" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${display.variable} ${serif.variable} ${mono.variable} font-serif`}
      >
        <header className="border-b-[1.5px] border-rule">
          <div className="max-w-catalog mx-auto px-[30px] py-[18px] flex items-baseline justify-between gap-4">
            <Link
              href="/"
              className="font-display font-bold text-[15px] tracking-[0.02em] text-primary"
            >
              DAMIAN VIDAL
            </Link>
            <nav className="flex flex-wrap gap-x-[18px] gap-y-1 justify-end">
              {nav.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-muted hover:text-primary transition-colors"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="border-t-[1.5px] border-rule mt-20">
          <div className="max-w-catalog mx-auto px-[30px] py-8 flex flex-wrap items-baseline justify-between gap-3 font-mono text-[11px] text-muted">
            <span>© 2026 Damian Vidal — Toronto, ON</span>
            <span className="flex gap-4">
              <Link href="/consulting" className="hover:text-primary transition-colors">
                Consulting
              </Link>
              <a
                href="mailto:d.vidal@outlook.com"
                className="hover:text-primary transition-colors"
              >
                Email
              </a>
              <a
                href="https://www.linkedin.com/in/dcvidal/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors"
              >
                LinkedIn
              </a>
              <a href="/feed.xml" className="hover:text-primary transition-colors">
                RSS
              </a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
