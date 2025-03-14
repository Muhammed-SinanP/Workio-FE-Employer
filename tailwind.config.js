import { light } from '@mui/material/styles/createPalette'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#1E3A8A",
          dark: "#041136",
          light: "#7d9fff",
          extralight: "#fafbfc",
          text: "#202124",
        },
        dark: {
          DEFAULT: "#1D232A",
          light: "#39424d",
          text: "#A6ADBB",
          input: "#121212",
        },
        "custom-border-color": {
          DEFAULT: "#9CA3AF",
        },
        placeholder: {
          DEFAULT: "#9CA3AF",
        },
      },
      fontFamily: {
        "brand-font": ["Lora", "sans-serif"],
        "para-font": ["Noto Sans", "sans-serif"],
      },
      fontSize: {
        xxs: "0.7rem",
      },
      borderWidth: {
        0.5: "0.5px",
        3: "3px",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: ["selector", '[data-theme="dark"]'],
};

