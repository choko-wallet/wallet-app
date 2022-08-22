// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../styles/globals.css';

import type { AppProps } from 'next/app';

import ProgressBar from '@badrap/bar-of-progress';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../features/redux/store';

// import { ThemeProvider } from 'next-themes';

const progress = new ProgressBar({
  className: 'z-50',
  color: '#3afbef',
  delay: 100,
  size: 4
});

Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function Root ({ Component, pageProps }: AppProps): JSX.Element {
  // console.error(process.env);

  return (
    <Provider store={store}>
      <Head>
        {
          process.env.ENABLE_TRACKING &&
          <script async
            data-website-id='c309f7b0-7e50-4944-b73b-1e779ac13207'
            defer
            src='https://analytics.skye.kiwi/umami.js'></script>
        }
      </Head>
      {/* <ThemeProvider> */}
      <Component {...pageProps} />
      {/* </ThemeProvider> */}
    </Provider>
  );
}

export default Root;
