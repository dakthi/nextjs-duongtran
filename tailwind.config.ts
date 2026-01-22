import type { Config } from "tailwindcss";

const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

const config: Config = {
  mode: "jit",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        neutral: colors.neutral,
        // Jules-inspired warm premium palette
        fg: '#1A1A1A',                 // Near-black text
        muted: '#6B7280',              // Gray secondary text
        accent: '#1E3A5F',             // Deep navy - primary
        'accent-2': '#C9A227',         // Warm gold - premium
        card: '#FAF8F5',               // Warm cream background
        // Legacy mappings for compatibility
        'outer-space': '#1A1A1A',
        'jungle-green': '#1E3A5F',
        'jungle-green-light': '#2E5B8C',
        'jungle-green-dark': '#152A44',
        'feldgrau': '#6B7280',
        'mint-green': '#FAF8F5',
        'warm-gold': '#C9A227',
        'warm-cream': '#FAF8F5',
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'serif'],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        stock: [defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'warm': '0 4px 20px -2px rgba(201, 162, 39, 0.15)',
      },
      typography: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
