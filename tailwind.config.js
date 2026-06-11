/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        breezy: {
          bg: '#F7F9FA',
          white: '#FFFFFF',
          dark: '#0F1419',
          primary: '#1D9BF0',
          border: '#EFF3F4',
          muted: '#536471',
          hover: '#F7F9FA',
          like: '#F91880',
          repost: '#00BA7C',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      screens: {
        'xs': '390px',
      }
    },
  },
  plugins: [],
}
