// Copyright 2021-2022 @choko-wallet/known-networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { INetwork } from '@choko-wallet/core';
import { HexString } from '@choko-wallet/core/types';

import { SkyeKiwiNetwork, SkyeKiwiNetworkHash } from './skyekiwi';

export declare type KnownNetworks = Record<HexString, INetwork>;

export const knownNetworks: KnownNetworks = {
  [SkyeKiwiNetworkHash]: new SkyeKiwiNetwork()
};
