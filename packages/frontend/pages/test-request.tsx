// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { cryptoWaitReady, encodeAddress } from '@polkadot/util-crypto';
import { AsymmetricEncryption } from '@skyekiwi/crypto';
import { hexToU8a, stringToU8a, u8aToHex, u8aToString } from '@skyekiwi/util';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import tweetnacl from 'tweetnacl';

import { AccountOption, UserAccount } from '@choko-wallet/core';
import { decompressParameters } from '@choko-wallet/core/util';
import { ConnectDappResponse, DecryptMessageResponse, SignMessageResponse, SignTxResponse } from '@choko-wallet/request-handler';
import { buildConnectDappUrl, buildSignMessageUrl, buildSignTxUrl, configSDKAndStore, getUserAccount, storeUserAccount } from '@choko-wallet/sdk';
import { buildDecryptMessageUrl } from '@choko-wallet/sdk/requests';

import Loading from './../components/Loading';

const localTesting = true;
// const callbackUrl = 'https://choko.app/test-request'
const callbackUrl = 'http://localhost:3000/test-request';
const accountOption = new AccountOption({
  hasEncryptedPrivateKeyExported: false,
  keyType: 'sr25519',
  localKeyEncryptionStrategy: 0
});
const sdkConfig = {
  accountOption: accountOption,
  activeNetworkHash: '847e7b7fa160d85f', // skyekiwi
  callbackUrlBase: callbackUrl,
  displayName: 'Choko Wallet Alpha Test',
  infoName: 'test',
  version: 0
};

const TestRequest: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [account, setAccount] = useState<UserAccount>(null);
  const [response, setResponse] = useState<Uint8Array>(new Uint8Array(0));

  const [encryptedMessage, setEncryptedMessage] = useState<Uint8Array>(new Uint8Array(0));
  const [clientPrivateKey, setClientPrivateKey] = useState<Uint8Array>(new Uint8Array(32));

  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (response && response.length > 0) {
      if (router.query.responseType === 'signTx') {
        const resp = SignTxResponse.deserialize(response);

        console.log(resp);

        alert(JSON.stringify(resp.payload));
      } else if (router.query.responseType === 'signMessage') {
        const resp = SignMessageResponse.deserialize(response);

        console.log(resp);

        alert(JSON.stringify(resp.payload));
      } else if (router.query.responseType === 'decryptMessage') {
        const resp = DecryptMessageResponse.deserialize(response);

        console.log(resp);
        const decryptMsg = u8aToString(AsymmetricEncryption.decrypt(clientPrivateKey, resp.payload.message));

        alert('Decrypt Message: ' + decryptMsg);
      } else if (router.query.responseType === 'connectDapp') {
        const resp = ConnectDappResponse.deserialize(response);

        console.log(resp.payload.userAccount);
        storeUserAccount(resp.payload.userAccount);
        setAccount(resp.payload.userAccount);

        console.log(resp.payload.userAccount);
      }
    }
  }, [response, clientPrivateKey, router.query]);

  useEffect(() => {
    if (router.query && router.query.response) {
      setResponse(decompressParameters(hexToU8a(router.query.response as string)));
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
    try {
      const a = getUserAccount();

      configSDKAndStore(sdkConfig, a.address !== '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM' ? a : null);

      if (!loading) {
        const orignalMessage = stringToU8a('A Clear Text Message');
        const encryptedMessage = AsymmetricEncryption.encryptWithCurveType('sr25519', orignalMessage, a.publicKey);

        console.error(encryptedMessage);
        setEncryptedMessage(encryptedMessage);
      }
    } catch (e) {
      configSDKAndStore(sdkConfig);
      console.error(e);
    }

    void (async () => {
      await cryptoWaitReady();
      setLoading(false);
    })();

    setMounted(true);
  }, [loading]);

  useEffect(() => {
    const lsSK = localStorage.getItem('ephemeralKey');

    if (!lsSK) {
      console.log('Generating ephermeral key');
      const sk = tweetnacl.randomBytes(32);

      localStorage.setItem('ephemeralKey', '0x' + u8aToHex(sk));
    }

    const sk = localStorage.getItem('ephemeralKey');

    setClientPrivateKey(hexToU8a(sk.substring(2)));
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) return <Loading title='Initializing ... ' />;

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
              const x = buildConnectDappUrl(localTesting);

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
                  const x = buildSignTxUrl(encoded, localTesting);

                  await provider.disconnect();
                  window.location.href = x;
                }}>Sign Transaction</button><br />

              <div className='divider'></div>
              <h2 className='text-black'>Sign A Message</h2><br />
              <button className='btn m-5 btn-error'
                onClick={() => {
                  const x = buildSignMessageUrl(stringToU8a('Test Messaage'), localTesting);

                  window.location.href = x;
                }}>Sign Message</button><br />

              <div className='divider'></div>

              <h2 className='text-black'>Decrypt A Message</h2><br />

              <h2>
                Message - A Clear Text Message - encoded into {'0x' + u8aToHex(stringToU8a('A Clear Text Message'))} <br/>
                Send to {'0x' + u8aToHex(account.publicKey)} on sr25519 and address is { encodeAddress(account.publicKey) } <br/>
                Encrypted Message is {encryptedMessage} <br/>
                Client Ephermeral Private Key is {'0x' + u8aToHex(clientPrivateKey)} and public key is {'0x' + u8aToHex(AsymmetricEncryption.getPublicKey(clientPrivateKey))}
              </h2>
              <button className='btn m-5 btn-error'
                onClick={() => {
                  const x = buildDecryptMessageUrl('sr25519', encryptedMessage, AsymmetricEncryption.getPublicKey(clientPrivateKey), localTesting);

                  window.location.href = x;
                }}>Decrypt Message</button><br />
            </>
          }
        </div>

      </div>
    </div>
  </main>);
};

export default TestRequest;
