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
        'outer-space': '#434F4D',
        'jungle-green': '#40B291',
        'mint-green': '#D2E8E2',
        'mint-green-light': '#E8F4F0',
        'feldgrau': '#3F6059',
        'outer-space-variant': '#454E4D',
        'jungle-green-light': '#58C9A6',
        'jungle-green-dark': '#2F8E75',
        brand: {
          primary: "#334155", // dark slate (trust, dependability)
          accent: "#64748b",  // soft muted blue-gray
          light: "#f8fafc",   // very light background
        },
      },
      fontFamily: {
        serif: ['Libre Baskerville', 'serif'],
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        stock: [defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'brutalist': '4px 4px 0px 0px rgba(67, 79, 77, 1)',
        'brutalist-hover': '6px 6px 0px 0px rgba(64, 178, 145, 1)',
        'brutalist-green': '4px 4px 0px 0px rgba(64, 178, 145, 1)',
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "700",
              fontSize: "2.25rem",
              letterSpacing: "-0.015em",
              color: "#3F6059", // feldgrau
            },
            h2: {
              fontWeight: "600",
              fontSize: "1.875rem",
              letterSpacing: "-0.01em",
              color: "#3F6059",
            },
            p: {
              color: "#434F4D", // outer-space
              fontSize: "1.05rem",
              lineHeight: "1.8",
            },
            ul: {
              color: "#434F4D",
              fontSize: "1.05rem",
              lineHeight: "1.7",
              paddingLeft: "1.25rem",
              listStyleType: "disc",
            },
            a: {
              color: "#40B291", // jungle-green
              fontWeight: "500",
              textDecoration: "underline",
              "&:hover": {
                color: "#2F8E75", // jungle-green-dark
              },
            },
            code: {
              backgroundColor: "#D2E8E2", // mint-green
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
              fontSize: "0.95rem",
            },
          },
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
