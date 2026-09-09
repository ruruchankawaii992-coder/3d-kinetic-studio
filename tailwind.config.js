/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0E14',
        neonCyan: {
          DEFAULT: '#00F0FF',
          dark: '#00B8CC',
          light: '#80F8FF'
        },
        electricPurple: {
          DEFAULT: '#9D4EDD',
          dark: '#7B2CBF',
          light: '#C77DFF'
        },
        studioGlass: {
          border: 'rgba(255, 255, 255, 0.08)',
          bg: 'rgba(11, 14, 20, 0.65)',
          glow: 'rgba(0, 240, 255, 0.15)'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        neonCyan: '0 0 15px rgba(0, 240, 255, 0.4)',
        neonPurple: '0 0 15px rgba(157, 78, 221, 0.4)',
      }
    },
  },
  plugins: [],
}
