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
        // Warm, premium coaching palette
        'outer-space': '#2D3436',      // Deep charcoal for text
        'jungle-green': '#1E3A5F',     // Deep navy blue - trust & professionalism
        'mint-green': '#F8F6F3',       // Warm off-white
        'mint-green-light': '#FDFCFB', // Light cream
        'feldgrau': '#4A5568',         // Warm gray for body text
        'outer-space-variant': '#374151',
        'jungle-green-light': '#2E5B8C', // Lighter navy
        'jungle-green-dark': '#152A44',  // Darker navy
        // Accent colors
        'warm-gold': '#C9A227',        // Premium gold accent
        'warm-gold-light': '#E8D48A',  // Light gold
        'warm-cream': '#FAF8F5',       // Warm background
        'soft-coral': '#E8B4A0',       // Soft accent
        brand: {
          primary: "#1E3A5F",  // Deep navy
          accent: "#C9A227",   // Warm gold
          light: "#FAF8F5",    // Warm cream
          dark: "#2D3436",     // Deep charcoal
        },
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
