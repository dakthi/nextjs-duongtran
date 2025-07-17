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
        brand: {
          primary: "#334155", // dark slate (trust, dependability)
          accent: "#64748b",  // soft muted blue-gray
          light: "#f8fafc",   // very light background
        },
      },
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontWeight: "700",
              fontSize: "2.25rem",
              letterSpacing: "-0.015em",
              color: "#1f2937", // gray-800
            },
            h2: {
              fontWeight: "600",
              fontSize: "1.875rem",
              letterSpacing: "-0.01em",
              color: "#1f2937",
            },
            p: {
              color: "#374151", // gray-700
              fontSize: "1.05rem",
              lineHeight: "1.8",
            },
            ul: {
              color: "#374151",
              fontSize: "1.05rem",
              lineHeight: "1.7",
              paddingLeft: "1.25rem",
              listStyleType: "disc",
            },
            a: {
              color: "#2563eb", // blue-600
              fontWeight: "500",
              textDecoration: "underline",
              "&:hover": {
                color: "#1d4ed8", // blue-700
              },
            },
            code: {
              backgroundColor: "#f1f5f9", // slight blue-gray
              padding: "0.25rem 0.5rem",
              borderRadius: "0.375rem",
              fontSize: "0.95rem",
            },
          },
        },
      },
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
      stock: [defaultTheme.fontFamily.sans],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
