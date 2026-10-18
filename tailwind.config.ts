import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          DEFAULT: "rgb(var(--noir) / <alpha-value>)",
          900: "rgb(var(--noir-900) / <alpha-value>)",
          800: "rgb(var(--noir-800) / <alpha-value>)",
          700: "rgb(var(--noir-700) / <alpha-value>)",
        },
        roast: {
          900: "rgb(var(--roast-900) / <alpha-value>)",
          800: "rgb(var(--roast-800) / <alpha-value>)",
          600: "rgb(var(--roast-600) / <alpha-value>)",
          400: "rgb(var(--roast-400) / <alpha-value>)",
          300: "rgb(var(--roast-300) / <alpha-value>)",
        },
        pink: {
          DEFAULT: "rgb(var(--pink) / <alpha-value>)",
          bright: "rgb(var(--pink-bright) / <alpha-value>)",
          contrast: "rgb(var(--pink-contrast) / <alpha-value>)",
          soft: "rgb(var(--pink-soft) / <alpha-value>)",
        },
        foam: "rgb(var(--foam) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        lede: ["var(--font-lede)", "Manrope", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: [
          "clamp(2.75rem, 10vw, 5.5rem)",
          { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" },
        ],
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        marquee: "marquee 22s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
