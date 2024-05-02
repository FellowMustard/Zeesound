/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          card: "#121212",
          saturated: "#242424",
          light: "#494949",
          text: "#a7a7a7",
          primary: "#A0153E",
          primarySaturated: "#684d55",
          error: "#EB5757",
          success: "#44D787",
        },
      },
    },
  },
  plugins: [],
};
