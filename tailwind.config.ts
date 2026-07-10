import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Monochrome dark theme — black & white only.
        ink: "#f4f4f5", // primary text / strong surfaces
        muted: "#a1a1a6", // secondary text
        paper: "#0b0b0c", // page background
        surface: "#161618", // card / panel background
        line: "#26262a", // borders & dividers
        moss: "#fafafa", // primary accent (was green)
        pine: "#e4e4e7", // positive emphasis text
        ember: "#8e8e93", // negative emphasis text
        amber: "#c7c7cc",
        sky: "#d4d4d8"
      },
      fontFamily: {
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      boxShadow: {
        soft: "0 18px 45px -28px rgba(0, 0, 0, 0.8)"
      }
    }
  },
  plugins: []
};

export default config;
