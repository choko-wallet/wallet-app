// Copyright 2021-2022 @choko-wallet/known-networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { HexString } from '@choko-wallet/core/types';

import { INetwork } from '@choko-wallet/core';

export class SkyeKiwiNetwork implements INetwork {
  providers: Record<string, string>;
  info: string;
  text: string;
  homepage?: string;
  isChild?: boolean;
  isDevelopment?: boolean;
  isDisabled?: boolean;
  isUnreachable?: boolean;
  paraId?: number;
  summary?: string;
  color?: string;
  logo?: Uint8Array;

  constructor () {
    this.info = 'skyekiwi';
    this.text = 'SkyeKiwi Network';
    this.homepage = 'https://skye.kiwi';

    this.providers = {
      SkyeKiwi: 'wss://staging.rpc.skye.kiwi'
    };
  }
}

export const SkyeKiwiNetworkHash: HexString = '0x847e7b7fa160d85f'; // xxHash('skyekiwi');
