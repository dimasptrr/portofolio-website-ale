/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        pixel: ['"Silkscreen"', 'monospace'],
        hand: ['"Patrick Hand"', '"Caveat"', 'cursive'],
        script: ['"Caveat"', 'cursive'],
      },
      colors: {
        paper: '#f8f7f2',
        notebookLine: '#e2decb',
        accentYellow: '#fec84b',
        accentMint: '#a6e8cf',
        accentPink: '#ff708f',
        accentGreen: '#12b76a',
        accentBlue: '#2563eb',
      },
    },
  },
  plugins: [],
};

