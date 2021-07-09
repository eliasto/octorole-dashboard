module.exports = {
  purge: [
    './twtoast.config.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      octorole: {
        light: '#dca8fd',
        DEFAULT: '#c490e4',
        dark: '#986bb4',
      },
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-toast')
  ],
}
