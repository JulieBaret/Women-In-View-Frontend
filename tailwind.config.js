/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        dark: "#2C2C2C",
        primary: "#D23E8D",
        'primary-hovered': "#A82f70",
        secondary: "#524AAF",
        'secondary-hovered': "#3f388a",
        light: "#E6E6E6",
        grey: "#9B8E9E",
        // lightGrey: "#D1C4D5"
      }
    },
    fontFamily: {
      figtree: ["Figtree", "sans-serif"],
      fraunces: ["Fraunces", "serif"],
      'body': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      'sans': [
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}