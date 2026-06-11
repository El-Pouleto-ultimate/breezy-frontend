/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind scanne ces fichiers pour purger les classes inutilisées en prod
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      // Couleurs personnalisées Breezy
      colors: {
        breezy: {
          dark: "#1a1a1a",
          muted: "#6b6b68",
          border: "#d0cfc9",
          bg: "#f5f4f1",
          card: "#edece9",
          panel: "#e2e1de",
        },
      },
      fontFamily: {
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
