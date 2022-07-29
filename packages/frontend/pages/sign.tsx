// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { waitReady } from '@polkadot/wasm-crypto';
import { sendTx } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

// localhost:3000/sign?callback=http%3A%2F%2Flocalhost%3A3000&tx=0x94040500000ec62bcc320bbfb7fb77fe4b8cdfd871d6d8114e0542f8037e5e6d9b1b724b6604&network=polkadot
function Sign (): JSX.Element {
  const router = useRouter();
  const tx = router.query.tx as string;
  const callback = router.query.callback as string;
  const network = router.query.network as string;

  useEffect(() => {
    const apiFun1 = async (tx: string, callback: string, network: string) => {
      if (!tx) return;
      if (!callback) return;
      if (network !== 'polkadot') return;

      await waitReady();

      const keyring = new Keyring({ type: 'sr25519' });
      const key = keyring
        .addFromUri('KEY');

      const provider = new WsProvider('wss://staging.rpc.skye.kiwi');
      const api = await ApiPromise.create({ provider: provider });

      const rawTx = tx;
      const tx1 = api.tx(rawTx);

      console.log('callback');
      console.log(callback);// http://localhost:3000

      alert('Submitting transaction...');
      console.log('first');
      await sendTx(tx1, key);
      console.log('second');
      await router.push(callback);
    };

    apiFun1(tx, callback, network)
      .then(() => console.log('this will succeed'))
      .catch(() => 'catch');
  }, [tx, callback, network, router]);

  return (
    <div>Sign</div>
  );
}

export default Sign;
