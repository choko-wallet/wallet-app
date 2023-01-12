// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import path from 'path';
/** @type {import('next').NextConfig} */

export default {
  distDir: 'build',
  eslint: {
    // TODO: load global eslint config
    ignoreDuringBuilds: true
  },
  images: {
    domains: ['cdn.jsdelivr.net', 'www.creativosonline.org', 'static.alchemyapi.io', 'cdn.hackernoon.com', 'avatars.githubusercontent.com', 'media-exp1.licdn.com', 'firebasestorage.googleapis.com']
  },
  reactStrictMode: true,
  webpack: function (config, { defaultLoaders }) {
    const resolvedBaseUrl = path.resolve(config.context, '../../');

    config.module.rules = [
      ...config.module.rules,
      {
        exclude: (excludePath) => {
          return /node_modules/.test(excludePath);
        },
        include: [resolvedBaseUrl],
        test: /\.(tsx|ts|js|mjs|jsx)$/,
        use: defaultLoaders.babel

      }
    ];

    return config;
  }

};
