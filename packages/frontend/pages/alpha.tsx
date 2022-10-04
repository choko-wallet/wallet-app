// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import superagent from 'superagent';

import { UserAccount } from '@choko-wallet/core';
import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import { ConnectDappResponse, SignTxResponse } from '@choko-wallet/request-handler';
import { buildConnectDappUrl, buildSignTxUrl, configSDKAndStore, getUserAccount, storeUserAccount } from '@choko-wallet/sdk';

const AlphaTest: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [accessToken, setAccessToken] = useState<string>('');
  const [validToken, setValidToken] = useState<string>('');
  const [tosAgreed, setTOSAgreed] = useState<boolean>(false);

  const [account, setAccount] = useState<UserAccount>(null);

  const [response, setResponse] = useState<string>('');
  const [submit, setSubmit] = useState<boolean>(false);

  // http://localhost:3000/alpha?response=01789c6360606029492d2e61a00c883b67e467e72b8427e6e4a4962838e61464242a8490626c4b5d75fdc2841bf10c0c454795571588dc65b5ea49fa75764ef9b4c9ace29fceaed86fca62bbcdf5ea26375e90eae93e337d0e6ee6507cee3de16d59d4f259fd4d9b7364b9d3b8a66cdf7d8b5dfb611ec44c001c3d2cc3&responseType=signTx

  useEffect(() => {

    if (response && submit) {
      const u = decompressParameters(hexToU8a(response));
      const resp = SignTxResponse.deserialize(u);
      console.error(resp);

      (async () => {
        const r = await superagent
          .post('https://formapi.skye.kiwi/choko/alpha/update')
          .send({
            accessToken: accessToken,
            address: resp.userOrigin.address,
            txSent: u8aToHex(resp.payload.txHash),
            faucetClaimed: true,
          });
        if (r.body.error === "None") {
          alert("All Done! Data is recorded to our database.")
        }
      })();
    }

  }, [submit, response])

  useEffect(() => {
    if (router.query && router.query.response && router.query.responseType) {
      const u8aResponse = decompressParameters(hexToU8a(router.query.response as string));

      if (router.query.responseType === 'connectDapp') {
        const response = ConnectDappResponse.deserialize(u8aResponse);

        console.error(response.payload.userAccount);
        storeUserAccount(response.payload.userAccount);
        setAccount(response.payload.userAccount);
      } else if (router.query.responseType === 'signTx') {
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
    const lsValidToken = localStorage.getItem('validToken');
    const lsAccessToken = localStorage.getItem('accessToken');
    const accountOption = new AccountOption({
      hasEncryptedPrivateKeyExported: false,
      keyType: 'sr25519',
      localKeyEncryptionStrategy: 0
    });
    try {
      const a = getUserAccount();


      configSDKAndStore({
        accountOption: accountOption,
        activeNetworkHash: '847e7b7fa160d85f',

        callbackUrlBase: 'http://localhost:3000/alpha',

        // callbackUrlBase: 'https://choko.app/alpha',

        displayName: 'Choko Wallet Alpha Test',
        infoName: 'test',

        version: 0
      }, a.address !== '5C4hrfjw9DjXZTzV3MwzrrAr9P1MJhSrvWGWqi1eSuyUpnhM' ? a : null);
      setValidToken(lsValidToken);
      setAccessToken(lsAccessToken === null ? '' : lsAccessToken);
    } catch (e) {
      configSDKAndStore({
        accountOption: accountOption,
        activeNetworkHash: '847e7b7fa160d85f',

        callbackUrlBase: 'http://localhost:3000/alpha',
        // callbackUrlBase: 'https://choko.app/alpha',

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
        <h3 className='card-title mb-3'>Type In Your Access Token</h3>

        <div className='col-span-3'>
          <input className='input input-bordered max-w-xs m-5'
            onChange={(e) => setAccessToken(e.target.value)}
            placeholder='Type In Your Access Token'
            type='text'
            value={accessToken}
          />
          <button className='btn btn-accent m-5'
            onClick={async () => {
              const r = await superagent
                .post('https://formapi.skye.kiwi/choko/alpha/auth')
                .send({ accessToken: accessToken });

              localStorage.setItem('validToken', 'Authenticated');
              localStorage.setItem('accessToken', accessToken);

              // eslint-disable-next-line
              if (r.body.error === 'None' && r.body.data === 'authed') {
                setValidToken('Authenticated');
              } else {
                setValidToken('Unauthenticated');
              }
            }}>Authenticate</button>

          <span>{validToken}</span>
        </div>

        {
          validToken === 'Authenticated' && <div className='col-span-12 px-5'>
            <div className='divider'></div>
            <h2>Welcome To the Choko Wallet Alpha Test Program.</h2><br />

            <h2>Things To Note: this test program is intent for those who had experience working with wallets. Please use your usual caution when working with Choko Wallet. Beaware of <b>FISHING WEBSITES</b> and <b>ALWAYS SAFEGUARD YOUR PRIVATE KEY</b>. Like any wallets, we <b>WILL NOT ABLE TO RECOVER YOUR PRIVATE KEY</b>, as we <b>DO NOT HAVE ACCESS TO YOUR PRIVATE KEY</b></h2>
            <br />
            <h2>Any DMs requesting recovering wallet private keys <b>WILL BE IGNORED</b> as there is nothing we can do about it.</h2>
            <br />
            <h2>Also, our team will <b>NEVER DM FOR YOUR PRIVATE KEY</b> or <b>NEVER ASK FOR FUNDS</b>.</h2>

            <button className='btn m-5'
              onClick={() => {
                setTOSAgreed(true);
              }}>Read & Acknowledged. Let me Proceeed!</button>
          </div>
        }
        {
          tosAgreed && <div className='col-span-12 px-5'>
            <div className='divider'></div>
            <h2>There are three things you need to do:</h2><br />

            <h2>1. Generate or Import a walelt address on the home page. Switch network to SkyeKiwi Network and connect this page to the wallet. </h2>
            <button className='btn m-5 btn-error'
              onClick={() => {
                const x = buildConnectDappUrl();

                window.location.href = x;
              }}>Take me there</button>
            <br />

            {
              account && <>
                <h2>2. Claim some faucet token so that you could send a transaction on the next step.  </h2><br />
                <h3 style={{ overflowWrap: 'break-word' }}><span>Address of your account is: <b>{account.address}</b></span></h3> <br />
                <h3>Follow SkyeKiwi on their <a className='text-sky-400'
                  href='https://discord.com/invite/m7tFX8u43J'>Discord server</a> and go to <b>“#alpha-testnet-faucet”</b> channel to generate test tokens. Send <b>“!faucet </b> with your created account address to receive testnet tokens.</h3>
                <br />

                <h2>3. Click on the button below to sign a transaction. And keep the generated response hex string.</h2><br />
                <button className='btn m-5 btn-error'
                  onClick={async () => {
                    const provider = new WsProvider('wss://staging.rpc.skye.kiwi');
                    const api = await ApiPromise.create({ provider: provider });
                    const tx = api.tx.balances.transfer('5CQ5PxbmUkAzRnLPUkU65fZtkypqpx8MrKnAfXkSy9eiSeoM', 1);
                    const encoded = hexToU8a(tx.toHex().substring(2));
                    const x = buildSignTxUrl(encoded);

                    // await provider.disconnect();
                    window.location.href = x;
                  }}>Take me there</button><br />

                {response && <>
                  <h1 style={{ overflowWrap: 'break-word' }}>
                    Finally, keep this response hex string. Most likely it will be recorded automatically... but just in case. <b>0x{response}</b>. <br />Then you are all done!
                  </h1>

                  <button className='btn m-5 btn-success'
                    onClick={() => {
                      setSubmit(true);
                    }}>Finish!</button><br />
                </>
                }
              </>
            }
          </div>
        }

      </div>
    </div>
  </main>);
};

export default AlphaTest;
