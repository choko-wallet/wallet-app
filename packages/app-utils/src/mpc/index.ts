// Copyright 2021-2022 @choko-wallet/app-utils authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* tslint:disable */
/* eslint-disable */

import initWasm, { ext_run_keygen, ext_run_sign } from './skw_mpc_wasm';

const keygenRequestBase = {
  payload_id: [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  payload_type: {
    // @ts-ignore
    KeyGen: null
  },
  peers: [
    [
      '12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba',
      '/ip4/100.104.199.31/tcp/2619/ws/p2p/12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba'
    ],
    [
      '12D3KooWK99VoVxNE7XzyBwXEzW7xhK7Gpv85r9F3V3fyKSUKPH5',
      '/ip4/100.104.199.31/tcp/2620/ws/p2p/12D3KooWK99VoVxNE7XzyBwXEzW7xhK7Gpv85r9F3V3fyKSUKPH5'
    ],
    [
      '12D3KooWJWoaqZhDaoEFshF7Rh1bpY9ohihFhzcW6d69Lr2NASuq',
      '/ip4/100.104.199.31/tcp/2621/ws/p2p/12D3KooWJWoaqZhDaoEFshF7Rh1bpY9ohihFhzcW6d69Lr2NASuq'
    ]
  ],
  sender: '12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba',
  t: 2,
  n: 3
};

const signRequestBase = {
  payload_id: [
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
  ],
  payload_type: {
    SignOffline: {
      message: [
        153, 137, 54, 6, 208, 242, 9, 109,
        205, 141, 170, 237, 173, 109, 240, 83,
        63, 99, 209, 55, 95, 138, 242, 111,
        173, 209, 74, 11, 155, 198, 45, 110
      ],
      keygen_id: [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ],
      keygen_peers: [
        [
          '12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba',
          '/ip4/100.104.199.31/tcp/2619/ws/p2p/12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba'
        ],
        [
          '12D3KooWK99VoVxNE7XzyBwXEzW7xhK7Gpv85r9F3V3fyKSUKPH5',
          '/ip4/100.104.199.31/tcp/2620/ws/p2p/12D3KooWK99VoVxNE7XzyBwXEzW7xhK7Gpv85r9F3V3fyKSUKPH5'
        ],
        [
          '12D3KooWJWoaqZhDaoEFshF7Rh1bpY9ohihFhzcW6d69Lr2NASuq',
          '/ip4/100.104.199.31/tcp/2621/ws/p2p/12D3KooWJWoaqZhDaoEFshF7Rh1bpY9ohihFhzcW6d69Lr2NASuq'
        ]
      ]
    }
  },
  peers: [
    [
      '12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba',
      '/ip4/100.104.199.31/tcp/2619/ws/p2p/12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba'
    ],
    [
      '12D3KooWK99VoVxNE7XzyBwXEzW7xhK7Gpv85r9F3V3fyKSUKPH5',
      '/ip4/100.104.199.31/tcp/2620/ws/p2p/12D3KooWK99VoVxNE7XzyBwXEzW7xhK7Gpv85r9F3V3fyKSUKPH5'
    ]
  ],
  sender: '12D3KooWRndVhVZPCiQwHBBBdg769GyrPUW13zxwqQyf9r3ANaba',
  t: 2,
  n: 3
};

const runKeygen = async (jobId: Uint8Array) => {
  await initWasm();

  const keygenRequest = keygenRequestBase;

  keygenRequest.payload_id = Array.from(jobId);

  return await ext_run_keygen(
    JSON.stringify(keygenRequest),
    '12D3KooWPT98FXMfDQYavZm66EeVjTqP9Nnehn1gyaydqV8L8BQw',
    '/ip4/100.104.199.31/tcp/2622/ws',
    false
  );
};

const runSign = async (jobId: Uint8Array, keygenJobId: Uint8Array, localKey: string) => {
  await initWasm();

  const signRequest = signRequestBase;

  signRequest.payload_id = Array.from(jobId);
  signRequest.payload_type.SignOffline.keygen_id = Array.from(keygenJobId);

  return await ext_run_sign(
    JSON.stringify(signRequest),
    localKey,
    '12D3KooWPT98FXMfDQYavZm66EeVjTqP9Nnehn1gyaydqV8L8BQw',
    '/ip4/100.104.199.31/tcp/2622/ws',
    false
  );
};

export { runKeygen, runSign };
