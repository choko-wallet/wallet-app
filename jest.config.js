// Copyright 2021-2022 @choko-wallet/base authors & contributors
// SPDX-License-Identifier: Apache-2.0

const config = require('@skyekiwi/dev/config/jest.cjs');

module.exports = Object.assign({}, config, {
  moduleNameMapper: {
    '@choko-wallet/core(.*)$': '<rootDir>/packages/core/src/$1',
    '@choko-wallet/frontend(.*)$': '<rootDir>/packages/frontend/$1',
    '@choko-wallet/known-networks(.*)$': '<rootDir>/packages/known-networks/src/$1',
    '@choko-wallet/request-handler(.*)$': '<rootDir>/packages/request-handler/src/$1',
    '@choko-wallet/sdk(.*)$': '<rootDir>/packages/sdk/src/$1'
  },
  modulePathIgnorePatterns: [
    '<rootDir>/packages/core/build',
    '<rootDir>/packages/frontend/build',
    '<rootDir>/packages/known-networks/build',
    '<rootDir>/packages/request-handler/build',
    '<rootDir>/packages/sdk/build'
  ],
  testTimeout: 3_000_000,
  transformIgnorePatterns: [
    '/node_modules/(?!@polkadot|@skyekiwi|@babel/runtime/helpers/esm/)'
  ]
});
