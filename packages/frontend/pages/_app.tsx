// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import '../styles/globals.css';

import type { AppProps } from 'next/app';

import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../features/redux/store';
import useAckee from 'use-ackee';

// import { persistStore } from 'redux-persist';
// import { PersistGate } from 'redux-persist/integration/react';

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
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  );
}

export default MyApp;
