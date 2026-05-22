import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette stricte : NOIR · BLANC · ROSE POUDRÉ (inspirée du logo)
        white: "#FFFFFF",
        bone: "#FAFAF7",
        rose: {
          50: "#FDF4F8",
          100: "#FBE7EF",
          200: "#F7C9DC",
          300: "#F4B5CC", // 💗 rose du logo
          400: "#EE9DB9", // accent principal
          500: "#E58AAB", // CTA & hovers
          600: "#C46A8B", // texte accent sur fond clair
          700: "#984F69",
        },
        ink: {
          50: "#F4F4F4",
          100: "#E5E5E5",
          200: "#C7C7C7",
          400: "#525252",
          700: "#1F1F1F",
          800: "#080808",
          900: "#000000", // noir absolu pour matcher le fond du logo
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "10xl": ["10rem", { lineHeight: "0.9", letterSpacing: "-0.04em" }],
        "12xl": ["14rem", { lineHeight: "0.85", letterSpacing: "-0.05em" }],
      },
      boxShadow: {
        hard: "8px 8px 0 0 #000000",
        "hard-rose": "8px 8px 0 0 #F4B5CC",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "shake-cta": {
          "0%, 18%, 100%": { transform: "translateX(0) rotate(0)" },
          "2%": { transform: "translateX(-4px) rotate(-2deg)" },
          "4%": { transform: "translateX(4px) rotate(2deg)" },
          "6%": { transform: "translateX(-3px) rotate(-1deg)" },
          "8%": { transform: "translateX(3px) rotate(1deg)" },
          "10%": { transform: "translateX(-2px)" },
          "12%": { transform: "translateX(2px)" },
          "14%": { transform: "translateX(-1px)" },
          "16%": { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fade-in 1.1s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        "marquee-slow": "marquee 80s linear infinite",
        "shake-cta": "shake-cta 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
