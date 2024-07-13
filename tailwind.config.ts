import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        foreground: "#f0f0f7",
        background: "#1e1e2f",
        content: "#27283c",
        primary: "#7959de",
        secondary: "#27283c",
      },
    },
  },
  darkMode: "class",
};
export default config;
