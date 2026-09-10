import type { Config } from "tailwindcss";

// Colours are CSS variables defined in app/globals.css (light + dark via
// prefers-color-scheme). Names here are stable; the values move with the theme.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        surface: "var(--surface)",
        border: "var(--border)",
        rule: "var(--rule)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        faint: "var(--faint)",
        accent: "var(--accent)",
        "accent-hover": "var(--accent-hover)",
        grow: "var(--grow)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        measure: "640px",
        catalog: "712px",
      },
    },
  },
  plugins: [],
};
export default config;
