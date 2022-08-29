/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./app/**/*.{hbs,js,html}'],
  theme: {
    extend: {},
    colors:{
      ...colors,
      'brand': "#007AC4",
      'brand-dark': "#009AF2",
      'shadow':colors.slate["800"],
      'dark-item':colors.slate["600"],
      'dark-bg':"#353535",
    }
  },
  plugins: [],
};
