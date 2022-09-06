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
    }
  }
};
