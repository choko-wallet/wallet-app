// [object Object]
// SPDX-License-Identifier: Apache-2.0

import '../styles/globals.css';

import type { AppProps } from 'next/app';

import ProgressBar from '@badrap/bar-of-progress';
import Router from 'next/router';
import { ThemeProvider } from 'next-themes';
import { Provider } from 'react-redux';

import { store } from '../features/redux/store';

const progress = new ProgressBar({
  size: 4, // 进度条宽度颜色延迟时间
  color: '#3afbef',
  className: 'z-50',
  delay: 100
});

// 进度条启动停止
Router.events.on('routeChangeStart', progress.start);
Router.events.on('routeChangeComplete', progress.finish);
Router.events.on('routeChangeError', progress.finish);

function MyApp ({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

export default MyApp;
