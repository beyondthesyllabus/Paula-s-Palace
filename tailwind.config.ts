import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff1f1',
          100: '#ffdfdf',
          200: '#ffc5c5',
          300: '#ff9d9d',
          400: '#ff6464',
          500: '#8B0000', // Deep Crimson
          600: '#7a0000',
          700: '#660000',
          800: '#540000',
          900: '#450000',
        },
        gold: {
          50: '#fbf8ed',
          100: '#f5edcf',
          200: '#ebda9d',
          300: '#dfc163',
          400: '#d4af37', // Classic Gold
          500: '#c29b2f',
          600: '#a57a25',
          700: '#855c21',
          800: '#704d1f',
          900: '#5f411d',
        },
        cream: {
          50: '#ffffff',
          100: '#fdfbf7',
          200: '#f9f4ec',
          300: '#f4ecd9',
          400: '#ede0c1',
          500: '#e3cea0',
        }
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
