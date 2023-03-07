// Copyright 2021-2022 @choko-wallet/mpc authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Multiaddr, NodeInfo } from './interface';

const fullNode1: NodeInfo = [
  '12D3KooWHwGnK5FhETtw48sHGy4mLWfDFND59b1x2RngCr8Xv6nB',
  '/dns/f1.mpc.choko.app/tcp/2620/ws/p2p/12D3KooWHwGnK5FhETtw48sHGy4mLWfDFND59b1x2RngCr8Xv6nB'
];

const fullNode2: NodeInfo = [
  '12D3KooWDT97aUogGk3Hb7SZazACBWcpjuGyVfJdVajToGdocuky',
  '/dns/f2.mpc.choko.app/tcp/2621/ws/p2p/12D3KooWDT97aUogGk3Hb7SZazACBWcpjuGyVfJdVajToGdocuky'
];

const lightNode: NodeInfo = [
  '12D3KooWEfuMKPNTpcnHj7ywgk4h7THztZt2gi5DxYUApjkCi2Di',
  '/dns/l.mpc.choko.app/tcp/2622/ws/p2p/12D3KooWEfuMKPNTpcnHj7ywgk4h7THztZt2gi5DxYUApjkCi2Di'
];

const clientNode: NodeInfo = [
  '12D3KooWM7yXoRonZbkUi2Wm6D5V95yuYCTcE7Yx6RPiX5vg5S8P',
  "/dns/c.mpc.choko.app/tcp/2619/ws/p2p/12D3KooWM7yXoRonZbkUi2Wm6D5V95yuYCTcE7Yx6RPiX5vg5S8P"
];

const clientNodeRawAddr: Multiaddr = '/ip4/143.198.142.119/tcp/2619/ws';

export { fullNode1, fullNode2, lightNode, clientNode, clientNodeRawAddr };
