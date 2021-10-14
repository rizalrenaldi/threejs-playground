const defaultTheme = require( 'tailwindcss/defaultTheme' )

module.exports = {
  mode: "jit",
  purge: [
    "./src/**/*.{html,js,css}"
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans]
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
