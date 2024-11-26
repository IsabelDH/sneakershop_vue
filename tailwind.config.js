/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./src/**/*.{html,js,vue}",],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'primary': '#5dde40', //fel groen
        'secondary': '#a7bf49', //lichr groen voor btn
        'black': '#000000',
        'offblack': '#222222',
        'grey': '#f0f0f0',
        'red': "#ff0000",
      },
    },
  },
  plugins: [],
}

