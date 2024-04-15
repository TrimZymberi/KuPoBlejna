/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "green" : "#39DB4A",
        "red" : "#FF6886",
        "secondary" : "#555",
        "primaryBG" : "#FCFCFC"
      }
    },
  },
  plugins: [require("daisyui")],
}

