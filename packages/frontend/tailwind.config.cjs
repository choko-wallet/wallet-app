// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  daisyui: {
    darkTheme: 'light'
  },
  darkMode: 'class',

  // daisyUI config (optional)

  plugins: [require('daisyui'), require('tailwind-scrollbar')],
  theme: {
    extend: {
      colors: {
        dimBlue: 'rgba(9, 151, 124, 0.1)',
        footerBg: '#d8c9d8', // bg-footerBg
        primary: '#00040f'

      },
      fontFamily: {
        Josefin: ['Josefin Sans', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif']

      },
      height: {
        //   "10v": "10vh",
        //   "20v": "20vh",
        //   "30v": "30vh",
        //   "40v": "40vh",
        //   "50v": "50vh",
        //   "60v": "60vh",
        //   "70v": "70vh",
        '85v': '85vh'
        //   "90v": "90vh",
        //   "100v": "100vh",
      }
    }

  },
  variants: {
    // ...
    scrollbar: ['dark']
  }

};
