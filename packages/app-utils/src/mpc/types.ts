// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NodeInfo } from './interface';

export interface PeerIds {
  c: string,
  f1: string,
  f2: string,
  l: string,
}

export interface MpcNodeFixtures {
  c: NodeInfo,
  f1: NodeInfo,
  f2: NodeInfo,
  l: NodeInfo,
}
