// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  // daisyUI config (optional)
  daisyui: {
    darkTheme: 'light'
  },
  plugins: [require('daisyui')],
  theme: {
    extend: {
      fontFamily: {
        Italiana: ["Italiana", "mono"],
      },
      colors: {
        footerBg: '#d8c9d8' // bg-footerBg
      }
    }
  }
};
