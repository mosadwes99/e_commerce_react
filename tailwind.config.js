/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: ["light"],
  },
  theme: {
    container: {
      center: true,
    },
    extend: {
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },
      colors: {
        "pramiry": "#133a5e",
        "secondary":"#ffb921"
      },
    },
  },
  plugins: [require("daisyui")],
};
