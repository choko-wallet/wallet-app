// Copyright 2021-2022 @choko-wallet/known-networks authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { KnownNetworks } from '@choko-wallet/core';

import { SkyeKiwiNetwork, SkyeKiwiNetworkHash } from './skyekiwi';

export const knownNetworks: KnownNetworks = {
  [SkyeKiwiNetworkHash]: new SkyeKiwiNetwork()
};
