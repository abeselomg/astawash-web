module.exports = {
  purge: ["./pages/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: "#143199",
      },
     
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
