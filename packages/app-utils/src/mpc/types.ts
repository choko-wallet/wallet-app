// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { NodeInfo } from './interface';

export interface PeerIds {
  f1: string,
  f2: string,
  l: string,
  c: string
}

export interface MpcNodeFixtures {
  f1: NodeInfo,
  f2: NodeInfo,
  l: NodeInfo,
  c: NodeInfo,
}
