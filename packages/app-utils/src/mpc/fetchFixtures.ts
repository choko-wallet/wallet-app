// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

import superagent from 'superagent';

import { MpcNodeFixtures, PeerIds } from './types';

// const fetchPeers = async (): Promise<MpcNodeFixtures> => {
//   const res = await superagent
//     .get('https://auth.choko.app/info/peerid')
//     .accept('json');
//   const peerIds = JSON.parse(res.text) as PeerIds;

//   console.log('peerIds', peerIds);

//   return {
//     c: [
//       peerIds.c,
//       `/dns/c.mpc.choko.app/tcp/2619/ws/p2p/${peerIds.c}`
//     ],
//     f1: [
//       peerIds.f1,
//       `/dns/f1.mpc.choko.app/tcp/2620/ws/p2p/${peerIds.f1}`
//     ],
//     f2: [
//       peerIds.f2,
//       `/dns/f2.mpc.choko.app/tcp/2621/ws/p2p/${peerIds.f2}`
//     ],
//     l: [
//       peerIds.l,
//       `/dns/l.mpc.choko.app/tcp/2622/ws/p2p/${peerIds.l}`
//     ],
//   };
// };

const fetchPeers = async (): Promise<MpcNodeFixtures> => {
  const res = await superagent
    .get('https://auth.choko.app/info/peerid')
    .accept('json');
  const peerIds = JSON.parse(res.text) as PeerIds;

  return {
    c: [
      peerIds.c,
      `/ip4/127.0.0.1/tcp/2619/ws/p2p/${peerIds.c}`
    ],
    f1: [
      peerIds.f1,
      `/ip4/127.0.0.1/tcp/2620/ws/p2p/${peerIds.f1}`
    ],
    f2: [
      peerIds.f2,
      `/ip4/127.0.0.1/tcp/2621/ws/p2p/${peerIds.f2}`
    ],
    l: [
      peerIds.l,
      `/ip4/127.0.0.1/tcp/2622/ws/p2p/${peerIds.l}`
    ]
  };
};

export { fetchPeers };
