// Copyright 2021-2022 @choko-wallet/base authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@skyekiwi/dev/config/jest.cjs');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@choko-wallet/frontend(.*)$': '<rootDir>/packages/frontend/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/frontend/build'
  ],
  testTimeout: 3_000_000,
  transformIgnorePatterns: [
    '/node_modules/(?!@polkadot|@skyekiwi|@babel/runtime/helpers/esm/)'
  ]
});
