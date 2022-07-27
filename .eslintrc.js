// Copyright 2021-2022 @choko-wallet/base authors & contributors
// SPDX-License-Identifier: Apache-2.0

const base = require('@skyekiwi/dev/config/eslint.cjs');

module.exports = {
  ...base,
  ignorePatterns: [
    '.eslintrc.js',
    '.github/**',
    '.vscode/**',
    '.yarn/**',
    '**/build/*',
    '**/coverage/*',
    '**/node_modules/*',
    '**/examples/*',
    'next-env.d.ts',
  ],
  parserOptions: {
    ...base.parserOptions,
    project: [
      './tsconfig.json'
    ]
  },
  rules: {
    ...base.rules,

    'header/header': [2, 'line', [
      { pattern: ' Copyright \\d{4}(-\\d{4})? @choko-wallet/?' },
      ' SPDX-License-Identifier: Apache-2.0'
      ], 2],
    // this seems very broken atm, false positives
    '@typescript-eslint/unbound-method': 'off',
    'node/no-callback-literal': 'off'
  }
};
