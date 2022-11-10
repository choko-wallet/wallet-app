// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

/** @type {import('next').NextConfig} */

export default {
  distDir: 'build',
  images: {
    domains: ['cdn.jsdelivr.net', 'static.alchemyapi.io', 'cdn.hackernoon.com', 'avatars.githubusercontent.com', 'media-exp1.licdn.com', 'firebasestorage.googleapis.com']
  },

  reactStrictMode: true
};
