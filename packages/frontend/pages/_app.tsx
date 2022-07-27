// [object Object]
// SPDX-License-Identifier: Apache-2.0

import '../styles/globals.css';

import type { AppProps } from 'next/app';

import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Provider } from 'react-redux';

import { store } from '../features/redux/store';

const progress = new ProgressBar({
  className: 'z-50',
  color: '#3afbef',
  delay: 100,
  size: 4 // 进度条宽度颜色延迟时间

});

// 进度条启动停止
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
