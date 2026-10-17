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
          DEFAULT: "#0a0908",
          900: "#12100e",
          800: "#1c1815",
          700: "#2a241f",
        },
        roast: {
          900: "#2a1810",
          800: "#3a2418",
          600: "#7a4a32",
          400: "#b87d5c",
          300: "#d4a88a",
        },
        pink: {
          DEFAULT: "#e83a7a",
          bright: "#f55a8f",
          soft: "#f28ab0",
        },
        foam: "#f3eee8",
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
