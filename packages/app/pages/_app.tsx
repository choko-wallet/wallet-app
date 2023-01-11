// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../styles/globals.css';

import type { AppProps } from 'next/app';

import ProgressBar from '@badrap/bar-of-progress';
import Head from 'next/head';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Provider, store } from '@choko-wallet/app-redux';

const progress = new ProgressBar({
  className: 'z-50',
  color: '#F5CBD5',
  delay: 100,
  size: 4
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function Root({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Head>
        {
          process.env.NEXT_PUBLIC_ENABLE_TRACKING &&
          <script async
            data-website-id='c309f7b0-7e50-4944-b73b-1e779ac13207'
            defer
            src='https://analytics.skye.kiwi/umami.js'></script>
        }
        <link href='https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap'
          rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@300;400;700&display=swap'
          rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=Rubik&display=swap'
          rel='stylesheet' />
        <link href='https://fonts.googleapis.com/css2?family=VT323&display=swap'
          rel='stylesheet' />
      </Head>
      <ThemeProvider attribute="class">
        <Toaster />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default Root;
