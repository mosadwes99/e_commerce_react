/** @type {import('tailwindcss').Config} */
export default {
  content:[
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center:true,
    },
    extend: {
      animation: {
        "spin-fast": "spin 0.5s linear infinite",
      },
    },
  },
  plugins: [],
}
