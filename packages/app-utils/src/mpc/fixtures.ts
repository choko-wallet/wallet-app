// Copyright 2021-2022 @choko-wallet/mpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Multiaddr, NodeInfo } from './interface';

const fullNode1: NodeInfo = [
  '12D3KooWFAYpT3YAoREqXMK4v3ghPS2SjjuhHgBxkhco1xU15wFs',
  '/ip4/10.0.0.3/tcp/2620/ws/p2p/12D3KooWFAYpT3YAoREqXMK4v3ghPS2SjjuhHgBxkhco1xU15wFs'
];

const fullNode2: NodeInfo = [
  '12D3KooWLrtYUi9CRjE9KqTtWtxtkUg7ys56zwJ6rTi5b9GXGRdd',
  '/ip4/10.0.0.3/tcp/2621/ws/p2p/12D3KooWLrtYUi9CRjE9KqTtWtxtkUg7ys56zwJ6rTi5b9GXGRdd'
];

const lightNode: NodeInfo = [
  '12D3KooWLYLcvqbj1TBvM8u83jotaCEuwMqVhuRENdA3CfEA3dHa',
  '/ip4/10.0.0.3/tcp/2622/ws/p2p/12D3KooWLYLcvqbj1TBvM8u83jotaCEuwMqVhuRENdA3CfEA3dHa'
];

const clientNode: NodeInfo = [
  '12D3KooWDMdKQcMKbEc9giHEAcunLQoJCzxgmmTef6ZpVQkf56cu',
  '/ip4/10.0.0.3/tcp/2619/ws/p2p/12D3KooWDMdKQcMKbEc9giHEAcunLQoJCzxgmmTef6ZpVQkf56cu'
];

const clientNodeRawAddr: Multiaddr = '/ip4/10.0.0.3/tcp/2619/ws';

export { fullNode1, fullNode2, lightNode, clientNode, clientNodeRawAddr };
