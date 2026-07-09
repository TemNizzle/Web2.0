import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#10151B",
        surface: "#171E26",
        "surface-hover": "#1D2530",
        border: "#2A323C",
        primary: "#ECE8DE",
        secondary: "#8D95A0",
        accent: "#C9A961",
        "accent-dim": "#8F824F",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        serif: ["var(--font-serif)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [],
};
export default config;
