/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#6c63ff",
        secondary: "#00d4ff",
        dark: {
          bg: "#0a0a0f",
          card: "#12121a",
          border: "#1e1e2e",
        },
        textPrimary: "#ffffff",
        textSecondary: "#a0a0b0",
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "3rem",
        },
      },
    },
  },
  plugins: [],
};