import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f4ff",
          100: "#e0e9ff",
          200: "#c7d4fe",
          300: "#a4b8fc",
          400: "#7b93f9",
          500: "#5a6ef5",
          600: "#454fec",
          700: "#3a3ed9",
          800: "#3338b3",
          900: "#0f1a8a",
          950: "#0a105c",
        },
        accent: {
          500: "#06b6d4",
          600: "#0891b2",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Poppins", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0a105c 0%, #0f1a8a 50%, #1e3a8a 100%)",
      },
    },
  },
  plugins: [],
};
export default config;
