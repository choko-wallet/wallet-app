// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Version } from './types';

import { Network } from '.';

export interface DappDescriptor {
  displayName: string;
  infoName: string;

  activeNetwork: Network;
  defaultNetwork?: Network; // or encoded network?
  avaliableNetworks?: Network[]; // or encoded networks?

  version: Version,
}
