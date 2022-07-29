// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Hash, Version } from './types';

import { INetwork } from '.';

export interface ITransaction {
  network: INetwork;
  encoded: Uint8Array;
  version: Version;
}

export interface ITransactionOutcome {
  isSuccessful: boolean;

  transactionHash: Hash;

  version: Version;
}
