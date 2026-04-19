import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-ibm-plex-arabic)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        bg: "var(--bg)",
        panel: "var(--panel)",
        ink: {
          DEFAULT: "var(--ink)",
          2: "var(--ink-2)",
          3: "var(--ink-3)",
          4: "var(--ink-4)",
        },
        line: {
          DEFAULT: "var(--line)",
          2: "var(--line-2)",
        },
        chip: "var(--chip)",
        good: {
          DEFAULT: "var(--good)",
          bg: "var(--good-bg)",
        },
        warn: {
          DEFAULT: "var(--warn)",
          bg: "var(--warn-bg)",
        },
        bad: {
          DEFAULT: "var(--bad)",
          bg: "var(--bad-bg)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
        },
        snap: {
          DEFAULT: "var(--p-snap)",
          bg: "var(--p-snap-bg)",
        },
        tiktok: {
          DEFAULT: "var(--p-tiktok)",
          bg: "var(--p-tiktok-bg)",
        },
        insta: {
          DEFAULT: "var(--p-insta)",
          bg: "var(--p-insta-bg)",
        },
      },
      borderRadius: {
        card: "var(--radius)",
      },
      boxShadow: {
        "token-sm": "var(--shadow-sm)",
        "token-md": "var(--shadow-md)",
      },
      letterSpacing: {
        tightish: "-0.02em",
        widelabel: "0.08em",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
