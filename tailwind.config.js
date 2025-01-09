import { light } from '@mui/material/styles/createPalette'

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
        homeColor:{
          DEFAULT:"#64D8FF",
          light:"#dcf4fc",
          darkMode:"#B1BBC9",
          darkModeLight:"#bec7d4"
        },
        darkColor:{
          DEFAULT:"#1D232A",
          light:"#39424d",
          text:"#A6ADBB",
          input:"#121212"
        }
      },
      fontFamily: {
        brandFont: ["Lora", "sans-serif"],
      },
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["light", "dark"],
  },
  darkMode: ['selector', '[data-theme="dark"]'],
}

