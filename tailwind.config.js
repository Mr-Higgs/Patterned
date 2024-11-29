/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f15922',
          light: '#ff7816',
          dark: '#ff6017',
        },
        secondary: '#259051',
        black: '#000000',
        white: '#ffffff',
      },
    },
  },
  plugins: [],
}

