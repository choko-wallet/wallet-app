// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  // daisyUI config (optional)
  daisyui: {
    darkTheme: 'light'
  },
  plugins: [require('daisyui'), require('tailwind-scrollbar'),],
  variants: {
    // ...
    scrollbar: ['dark']
  },
  theme: {
    extend: {
      colors: {
        primary: "#00040f",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        footerBg: '#d8c9d8' // bg-footerBg
      },
      fontFamily: {
        'poppins': ["Poppins", "sans-serif"],
        "Josefin": ["Josefin Sans", "sans-serif"],
      },
      height: {
        //   "10v": "10vh",
        //   "20v": "20vh",
        //   "30v": "30vh",
        //   "40v": "40vh",
        //   "50v": "50vh",
        //   "60v": "60vh",
        //   "70v": "70vh",
        "85v": "85vh",
        //   "90v": "90vh",
        //   "100v": "100vh",
      },
    },

  }
};
