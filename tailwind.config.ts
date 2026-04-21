import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f0fdf9",
          100: "#ccfbef",
          200: "#99f6df",
          300: "#5eead0",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a"
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12"
        },
        surface: "#f7f8f5",
        ink: "#10231d"
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"]
      },
      boxShadow: {
        panel: "0 20px 50px rgba(16, 35, 29, 0.08)"
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(to right, rgba(16,35,29,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(16,35,29,0.06) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
