/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ], theme: {
    extend: {
      colors: {
        "weather-primary": "#0068A1", // Perbaikan: Tambahkan angka 1 (#0068A1)
        "weather-secondary": "#004E71"
      },
      fontFamily: {
        Roboto: ["Roboto, sans-serif"],
      },
      container: {
        padding: "2rem",
        center: true
      },
      screens: {
        sm: "640px",
        md: '768px'
      }
    },
  },
  plugins: [],
}

