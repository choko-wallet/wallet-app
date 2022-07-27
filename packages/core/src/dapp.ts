// Copyright 2021-2022 @choko-wallet/core authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { Version } from './types';

import { INetwork } from '.';

export interface IDappDescriptor {
  displayName: string;
  infoName: string;

  activeNetwork: INetwork;
  defaultNetwork?: INetwork; // or encoded network?
  avaliableNetworks?: INetwork[]; // or encoded networks?

  version: Version;
}
