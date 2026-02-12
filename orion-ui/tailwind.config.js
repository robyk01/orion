/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        orbitron: ['Orbitron', 'sans-serif'],
        oxanium: ['Oxanium', 'sans-serif'],
      },
      colors: {
        orion: {
          void: '#15173D',    // Main background
          purple1: '#270071',
          purple2: "#3b1a9e",
          purple3: "#876aff",
          pink: "#c185ee",
          alert: '#f15bb5',   // Warning magenta
        },
      },
    },
  },
  plugins: [],
}