/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        darkGreen: "hsla(159, 41%, 10%, 1)",
        midGreen: "hsla(159, 36%, 57%, 1)",
        lightGreen: "hsla(159, 65%, 88%, 1)",
        lightGray: "hsla(0, 0%, 98%, 1)",
        lightWhite: "hsla(0, 0%, 100%, 1)",
      },
      fontFamily: {
        poppins: ["poppins", "sans-serif"],
        dmsans: ["dm sans", "sans-serif"],
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["dark"],
    },
  },
  plugins: [],
};
