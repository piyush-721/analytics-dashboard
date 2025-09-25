// tailwind.config.js 
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'orange-primary': '#FF6B35',
      }
    },
  },
  plugins: [],
}
