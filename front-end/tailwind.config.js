/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "alizarin-crimson": "#ea232d",
        "davy-grey": "#575454",
        "bright-gray": "#eaebf3",
      },
    },
  },
  plugins: [],
};
