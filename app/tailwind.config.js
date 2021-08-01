module.exports = {
  mode: "jit",
  purge: ["./**/*.{js,tsx,ts}", "./**/**/*.{js,tsx,ts}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        mulish: ["Mulish"],
      },
    },
  },
  variants: {
    extend: {},
  },
  // plugins: [],
};
