import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#111111', // Hitam dari desain
        'brand-teal': '#00A19C', // Teal dari desain
        'brand-gray': '#1E1E1E', // Abu gelap dari desain
        'brand-light-gray': '#2D2D2D',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ['"Poppins"', 'sans-serif'],
      },      
    },
  },
  plugins: [],
} satisfies Config;

export default config;
