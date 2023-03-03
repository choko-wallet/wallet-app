// Copyright 2021-2022 @choko-wallet/mpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Multiaddr, NodeInfo } from './interface';

const fullNode1: NodeInfo = [
  '12D3KooWK99VoVxNE7XzyBwXEzW7xhK7Gpv85r9F3V3fyKSUKPH5',
  '/ip4/100.104.199.31/tcp/2620/ws/p2p/12D3KooWK99VoVxNE7XzyBwXEzW7xhK7Gpv85r9F3V3fyKSUKPH5'
];

const fullNode2: NodeInfo = [
  '12D3KooWJWoaqZhDaoEFshF7Rh1bpY9ohihFhzcW6d69Lr2NASuq',
  '/ip4/100.104.199.31/tcp/2621/ws/p2p/12D3KooWJWoaqZhDaoEFshF7Rh1bpY9ohihFhzcW6d69Lr2NASuq'
];

const lightNode: NodeInfo = [
  '12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba',
  '/ip4/100.104.199.31/tcp/2619/ws/p2p/12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba'
];

const clientNode: NodeInfo = [
  '12D3KooWPT98FXMfDQYavZm66EeVjTqP9Nnehn1gyaydqV8L8BQw',
  '/ip4/100.104.199.31/tcp/2622/ws/p2p/12D3KooWPT98FXMfDQYavZm66EeVjTqP9Nnehn1gyaydqV8L8BQw'
];

const clientNodeRawAddr: Multiaddr = '/ip4/100.104.199.31/tcp/2622/ws';

export { fullNode1, fullNode2, lightNode, clientNode, clientNodeRawAddr };
