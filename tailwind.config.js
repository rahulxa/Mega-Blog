/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnightBlue: '#2c3e50',
        slateBlue: '#6A5ACD',
        darkSlateGray: '#2F4F4F',
        steelBlue: '#4682B4',
        cadetBlue: '#5F9EA0',
        indigo: '#4B0082',
        darkCyan: '#008B8B',
        teal: '#008080',
      }
    },
  },
  plugins: [],
}