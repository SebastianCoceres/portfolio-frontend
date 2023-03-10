/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      screens: {
        "3xl": "1680px",
      },
    },
  },
  variants: {
    extend: {
      inset: ["group-hover"],
    },
  },
  plugins: [],
};
