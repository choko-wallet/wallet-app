// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../styles/globals.css';

import type { AppProps } from 'next/app';

import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../features/redux/store';
import useAckee from 'use-ackee';

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

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  
  useAckee('/', {
    server: 'https://analytics.choko.app',
    domainId: 'd29f288d-14fa-47fc-b6dd-f06f4f72f5e3'
  }, {
    // TODO: cookie consent form for user
    detailed: true,
    ignoreLocalhost: true,
    ignoreOwnVisits: true
  })

  return (
    <Provider store={store}>
        {/* <ThemeProvider> */}
          <Component {...pageProps} />
        {/* </ThemeProvider> */}
    </Provider>
  );
}

export default MyApp;
