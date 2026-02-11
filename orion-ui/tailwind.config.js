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
          purple: '#E491C9',  // Nebula glow
          neon: '#00f5d4',    // Primary cyan accent
          alert: '#f15bb5',   // Warning magenta
        },
      },
    },
  },
  plugins: [],
}