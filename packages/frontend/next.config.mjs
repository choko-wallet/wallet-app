// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @type {import('next').NextConfig} */

export default {
  distDir: 'build',
  eslint: {
    // TODO: remove this
    ignoreDuringBuilds: true
  },
  reactStrictMode: true,

  webpack: (config, options) => {
    config.module.rules.push({
      test: /\.(ts)x?$/, // Just `tsx?` file only
      use: [
        {
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true,
            // onlyCompileBundledFiles: true
          }
        }
      ]
    });

    // config.module.rules.push({
    //   test: /\.m?js$/,
    //   include: /(core|known-networks)/i,
    //   use: {
    //     loader: 'babel-loader',
    //     options: {
    //       presets: [
    //         '@babel/preset-env',
    //       ],
    //       plugins: [
    //         "@babel/plugin-proposal-private-methods",
    //         "@babel/plugin-proposal-class-properties",
    //         '@babel/plugin-proposal-object-rest-spread',
    //       ]
    //     }
    //   }
    // });
    return config;
  }
};
