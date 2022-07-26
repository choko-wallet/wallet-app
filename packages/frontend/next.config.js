// Copyright 2021-2022 @choko-wallet/base authors & contributors
// SPDX-License-Identifier: Apache-2.0 & MIT

/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: true,

  distDir: 'build',

  typescript: {
    // TODO: remove this
    ignoreBuildErrors: true,
  },

  eslint: {
    // TODO: remove this
    ignoreDuringBuilds: true,
  },
};
