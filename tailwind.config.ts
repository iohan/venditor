import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: { sm: "100%", md: "100%", lg: "100%", xl: "1200px" },
    },
    extend: {
      animation: {
        "spin-slow": "spin 5s linear infinite",
        "bounce-slow": "bounce 3s linear infinite",
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        dmSans: ["var(--font-dm-sans)"],
        grotesk: ["var(--font-grotesk)"],
      },
    },
  },
  plugins: [],
};
export default config;
