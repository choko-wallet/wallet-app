// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    '../balance-module/src/**/*.{js,ts,jsx,tsx}',
    '../landing-module/src/**/*.{js,ts,jsx,tsx}',
    '../network-sidebar-module/src/**/*.{js,ts,jsx,tsx}',
    '../button-module/src/**/*.{js,ts,jsx,tsx}',
    '../footer-module/src/**/*.{js,ts,jsx,tsx}',
    '../header-module/src/**/*.{js,ts,jsx,tsx}',
    '../modal-module/src/**/*.{js,ts,jsx,tsx}',
    '../loading-module/src/**/*.{js,ts,jsx,tsx}',
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
        poppins: ['Poppins', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        vt323: ['VT323', 'sans-serif']

      },
      height: {
        '70v': '70vh',
        '75v': '75vh',
        '80v': '80vh',
        '85v': '85vh',
        '90v': '90vh'
      },
      screens: {
        nxl: '2000px'
      }
    }

  },
  variants: {
    // ...
    scrollbar: ['dark']
  }

};
