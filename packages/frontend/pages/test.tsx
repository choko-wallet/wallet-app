// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToU8a, stringToU8a, u8aToHex } from '@skyekiwi/util';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { AccountOption, UserAccount } from '@choko-wallet/core';
import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import { ConnectDappResponse, SignMessageResponse, SignTxResponse } from '@choko-wallet/request-handler';
import { buildConnectDappUrl, buildSignMessageUrl, buildSignTxUrl, configSDKAndStore, getUserAccount, storeUserAccount } from '@choko-wallet/sdk';

const Test: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [account, setAccount] = useState<UserAccount>(null);
  const [response, setResponse] = useState<string>('');

  useEffect(() => {
    if (response) {
      const u = decompressParameters(hexToU8a(response));

      if (router.query.responseType === 'signTx') {
        const resp = SignTxResponse.deserialize(u);

        console.log(resp);

        alert(JSON.stringify(resp.payload));
      } else if (router.query.responseType === 'signMessage') {
        const resp = SignMessageResponse.deserialize(u);

        console.log(resp);

        alert(JSON.stringify(resp.payload));
      }
    }
  }, [response, router.query]);

  useEffect(() => {
    if (router.query && router.query.response && router.query.responseType) {
      const u8aResponse = decompressParameters(hexToU8a(router.query.response as string));

      if (router.query.responseType === 'connectDapp') {
        const response = ConnectDappResponse.deserialize(u8aResponse);

        console.error(response.payload.userAccount);
        storeUserAccount(response.payload.userAccount);
        setAccount(response.payload.userAccount);
      } else {
        const a = getUserAccount();

        setAccount(a);
        setResponse(u8aToHex(compressParameters(u8aResponse)));
      }
    } else {
      try {
        const a = getUserAccount();

        if (a) setAccount(a);
      } catch (e) {
        console.error(e);
        // pass
      }
    }
  }, [router]);

  useEffect(() => {
    const accountOption = new AccountOption({
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519',
      localKeyEncryptionStrategy: 0
    });

    try {
      const a = getUserAccount();

      configSDKAndStore({
        accountOption: accountOption,
        activeNetworkHash: '847e7b7fa160d85f', // skyekiwi

        callbackUrlBase: 'http://localhost:3000/test',

        // callbackUrlBase: 'https://choko.app/test',

        displayName: 'Choko Wallet Alpha Test',
        infoName: 'test',

        version: 0
      }, a.address !== '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM' ? a : null);
    } catch (e) {
      configSDKAndStore({
        accountOption: accountOption,
        activeNetworkHash: '847e7b7fa160d85f', // skyekiwi

        callbackUrlBase: 'http://localhost:3000/test',
        // callbackUrlBase: 'https://choko.app/test',

        displayName: 'Choko Wallet Alpha Test',
        infoName: 'test',

        version: 0
      });
      console.error(e);
    }

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (<main className='grid grid-cols-12 gap-4 min-h-screen content-center color-bg py-10'>
    <Head><title>Choko Wallet</title></Head>

    <div className='grid grid-cols-12 col-span-12 md:col-span-10 md:col-start-2 p-3'>
      <div className='col-span-12 shadow-xl rounded-lg card p-5 md:p-6 bg-white'>
        <h3 className='card-title mb-3'>Test Page for Request Handler</h3>

        <div className='col-span-12 px-5'>
          <div className='divider'></div>
          <h1>Connect This Testing Page with an Address! </h1><br />
          <button className='btn m-2 btn-error'
            onClick={() => {
              const x = buildConnectDappUrl();

              window.location.href = x;
            }}>Connect Wallet</button>

          <div className='divider'></div>

          {
            account && account.address !== '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM' && <>
              <h2 className='text-black'>Claim Some Faucet Token First ... </h2><br />
              <h3 className='text-black'
                style={{ overflowWrap: 'break-word' }}><span>Address of your account is: <b>{account.address}</b></span></h3> <br />
              <h3 className='text-black'>Follow SkyeKiwi on their <a className='text-sky-400'
                href='https://discord.com/invite/m7tFX8u43J'>Discord server</a> and go to <b>“#alpha-testnet-faucet”</b> channel to generate test tokens. Send <b>“!faucet </b> with your created account address to receive testnet tokens.</h3>
              <br />

              <div className='divider'></div>

              <h2 className='text-black'>Sign A Transaction</h2><br />
              <button className='btn m-5 btn-error'
                onClick={async () => {
                  const provider = new WsProvider('wss://staging.rpc.skye.kiwi');
                  const api = await ApiPromise.create({ provider: provider });
                  const tx = api.tx.balances.transfer('5CQ5PxbmUkAzRnLPUkU65fZtkypqpx8MrKnAfXkSy9eiSeoM', 1);
                  const encoded = hexToU8a(tx.toHex().substring(2));
                  const x = buildSignTxUrl(encoded);

                  console.log(x);
                  // await provider.disconnect();
                  // window.location.href = x;
                }}>Sign Transaction</button><br />

              <div className='divider'></div>
              <h2 className='text-black'>Sign A Message</h2><br />
              <button className='btn m-5 btn-error'
                onClick={() => {
                  const x = buildSignMessageUrl(stringToU8a('Test Messaage'));

                  console.log(x);
                  // window.location.href = x;
                }}>Sign Message</button><br />
            </>
          }
        </div>

      </div>
    </div>
  </main>);
};

export default Test;
