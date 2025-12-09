import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Archive Dark Theme
        'pure-black': '#000000',
        'off-white': '#E5E5E5',
        'muted-grey': '#6B7280',
        'dark-grey': '#1A1A1A',
        'accent-subtle': '#404040',
        'highlight': '#FFFFFF',
        // Brand Accent Colors
        'brand-orange': '#E4602A',
        'brand-teal': '#63A5C8',
        'brand-navy': '#0C2D3A',
        'brand-gold': '#F0B23E',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Courier New', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        'archive': '0.12em',
      },
    },
  },
  plugins: [],
};
export default config;
