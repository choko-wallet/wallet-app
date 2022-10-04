// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @type {import('next').NextConfig} */

export default {
  images: {
    domains: ['cdn.jsdelivr.net', 'avatars.githubusercontent.com', 'media-exp1.licdn.com', 'firebasestorage.googleapis.com']

  },
  distDir: 'build',
  eslint: {
    // TODO: remove this
    ignoreDuringBuilds: true
  },
  reactStrictMode: true
};
