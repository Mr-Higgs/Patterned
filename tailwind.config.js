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
          DEFAULT: '#f15922',//#f15922
          light: '#ff7816',
          dark: '#ff6017',
        },
        secondary: {
          DEFAULT: '#259051',
          light: '#2aa65c',
          dark: '#1f7443',
        },
        neutral: {
          cream: '#FFF5E9',
          sand: '#F5E6D3',
          brown: '#8B7355',
          stone: '#2C2C2C',
        },
        accent: '#ff7816',
        background: '#FFFFFF',
        text: '#000000',
      },
    },
  },
  plugins: [],
}

