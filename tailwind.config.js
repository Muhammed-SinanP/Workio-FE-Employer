/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandColor: {
          DEFAULT: "#00A264",
          dark: "#004D2F",
          light: "#76e3b9",
          lighter: "#7efcce",
        },
      },
      fontFamily: {
        brandFont: ["Lora", "sans-serif"],
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [],
}

