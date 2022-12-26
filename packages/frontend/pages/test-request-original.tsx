// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import { ApiPromise, WsProvider } from '@polkadot/api';
import { cryptoWaitReady, encodeAddress } from '@polkadot/util-crypto';
import { AsymmetricEncryption } from '@skyekiwi/crypto';
import { hexToU8a, stringToU8a, u8aToHex, u8aToString } from '@skyekiwi/util';
import { BigNumber, ethers } from 'ethers';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import tweetnacl from 'tweetnacl';

import { encodeContractCall, encodeTransaction } from '@choko-wallet/abi';
import { AccountOption, UserAccount } from '@choko-wallet/core';
import { SignMessageType, SignTxType } from '@choko-wallet/core/types';
import { decompressParameters, xxHash } from '@choko-wallet/core/util';
import { ConnectDappResponse, DecryptMessageResponse, SignMessageResponse, SignTxResponse } from '@choko-wallet/request-handler';
import { buildConnectDappUrl, buildSignMessageUrl, buildSignTxUrl, configSDK, storeUserAccount } from '@choko-wallet/sdk';
import { buildDecryptMessageUrl } from '@choko-wallet/sdk/requests';
import { loadStorage, persistStorage } from '@choko-wallet/sdk/store';

import { fetchAAWalletAddress } from '@choko-wallet/frontend-utils-module/aaUtils';
import { deploymentEnv, walletUrl } from '@choko-wallet/frontend-utils-module/env';
import Loading from './../components/Loading';

const callbackUrl = `${walletUrl}/test-request`;

const TestRequest: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [account, setAccount] = useState<UserAccount>(null);

  const [encryptedMessage, setEncryptedMessage] = useState<Uint8Array>(new Uint8Array(0));
  const [clientPrivateKey, setClientPrivateKey] = useState<Uint8Array>(new Uint8Array(32));
  const [aaAddress, setAAAddress] = useState('');

  const [loading, setLoading] = useState<boolean>(true);
  const { setTheme, theme } = useTheme();

  if (theme !== 'dark' && theme !== 'light') {
    setTheme('dark');
  }

  // set up Dapp account storage
  useEffect(() => {
    if (router.query && router.query.response) {
      const response = decompressParameters(hexToU8a(router.query.response as string));

      if (response && response.length > 0) {
        if (router.query.responseType === 'signTx') {
          const resp = SignTxResponse.deserialize(response);

          console.log(resp);

          alert(JSON.stringify(resp.payload));
        } else if (router.query.responseType === 'signMessage') {
          const resp = SignMessageResponse.deserialize(response);

          console.log(resp);

          // stringToU8a('Test Messaage')
          const msg = `Use Etherscan To verify this: 
            msg = 'Test Messaage',
            address = ${resp.userOrigin.getAddress('ethereum')},
            sig = 0x${u8aToHex(resp.payload.signature)}
          `;

          console.log(msg);
          alert(msg);
        } else if (router.query.responseType === 'decryptMessage') {
          const resp = DecryptMessageResponse.deserialize(response);

          console.log(resp);
          const decryptMsg = u8aToString(AsymmetricEncryption.decrypt(clientPrivateKey, resp.payload.message));

          alert('Decrypt Message: ' + decryptMsg);
        } else if (router.query.responseType === 'connectDapp') {
          const resp = ConnectDappResponse.deserialize(response);

          console.log(resp);
          const store = loadStorage();

          storeUserAccount(store, resp.payload.userAccount);
          persistStorage(store);
        }
      }
    }
  }, [router, clientPrivateKey]);

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

  // configSDK and store in localStorage
  useEffect(() => {
    const store = configSDK({
      accountOption: new AccountOption({
        hasEncryptedPrivateKeyExported: false,
        localKeyEncryptionStrategy: 0
      }),
      activeNetworkHash: u8aToHex(xxHash('goerli')),
      displayName: 'Choko Wallet Sample Dapp',
      infoName: 'native-sample-dapp',
      version: 0
    });

    const data = store.userAccount;

    if (data && data !== 'null') {
      const a = UserAccount.deserialize(decompressParameters(hexToU8a(data)));

      setAccount(a);

      if (!loading) {
        const orignalMessage = stringToU8a('A Clear Text Message');
        const msg = AsymmetricEncryption.encryptWithCurveType(
          'sr25519',
          orignalMessage,
          a.publicKeys[0]
        );

        setEncryptedMessage(msg);
      }

      void (async () => {
        await cryptoWaitReady();
        const res = await fetchAAWalletAddress([a]);
        // const res = ['0x89898989898989']

        setAAAddress(res[0]);
        setMounted(true);
        setLoading(false);
      })();
    } else {
      setLoading(false);
      setMounted(true);
    }
  }, [loading]);

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
              const s = loadStorage();

              console.log(s);
              const x = buildConnectDappUrl(s, callbackUrl, deploymentEnv);

              window.location.href = x;
            }}>Connect Wallet</button>

          <div className='divider'></div>

          {
            account &&
            <>
              <h2 className='text-black'>Claim Some Faucet Token First ... </h2><br />
              <h3 className='text-black'
                style={{ overflowWrap: 'break-word' }}><span>Address of your account is: <b>{account.getAddress('sr25519')}</b></span></h3> <br />
              <h3 className='text-black'
                style={{ overflowWrap: 'break-word' }}><span>Your Ethereum EOA(Master) address is: <b>{account.getAddress('ethereum')}</b></span> . Do not fund this address unless you know what you are trying to do. </h3> <br />
              <h3 className='text-black'
                style={{ overflowWrap: 'break-word' }}><span>Your AA address is: <b>{aaAddress}</b></span> . </h3> <br />

              <h3 className='text-black'>Follow SkyeKiwi on their <a className='text-sky-400'
                href='https://discord.com/invite/m7tFX8u43J'>Discord server</a> and go to <b>“#alpha-testnet-faucet”</b> channel to generate test tokens. Send <b>“!faucet </b> with your created account address to receive testnet tokens.</h3>
              <br />

              <div className='divider'></div>

              <h2 className='text-black'>Sign A Transaction - Polkadot Style</h2><br />
              <button className='btn m-5 btn-error'
                onClick={async () => {
                  const provider = new WsProvider('wss://staging.rpc.skye.kiwi');
                  const api = await ApiPromise.create({ provider: provider });
                  const tx = api.tx.balances.transfer('5CQ5PxbmUkAzRnLPUkU65fZtkypqpx8MrKnAfXkSy9eiSeoM', 1);

                  const store = configSDK({
                    accountOption: new AccountOption({
                      hasEncryptedPrivateKeyExported: false,
                      localKeyEncryptionStrategy: 0
                    }),
                    activeNetworkHash: u8aToHex(xxHash('skyekiwi')),
                    displayName: 'Choko Wallet Sample Dapp',
                    infoName: 'native-sample-dapp',
                    version: 0
                  }, false);

                  const encoded = hexToU8a(tx.toHex().substring(2));
                  const x = buildSignTxUrl(
                    store,
                    encoded,
                    SignTxType.Ordinary,
                    callbackUrl,
                    deploymentEnv
                  );

                  await provider.disconnect();
                  window.location.href = x;
                }}>Sign Transaction</button><br />

              <div className='divider'></div>

              <h2 className='text-black'>Sign A Transaction - On Goerli, Gasless</h2><br />
              <button className='btn m-5 btn-error'
                onClick={() => {
                  const tx = {
                    to: '0xAA1658296e2b770fB793eb8B36E856c8210A566F',
                    value: ethers.utils.parseEther('0.00001')
                  };
                  const s = loadStorage();

                  console.log(s);
                  const x = buildSignTxUrl(
                    s,
                    hexToU8a(encodeTransaction(tx).slice(2)),
                    SignTxType.Gasless,
                    callbackUrl,
                    deploymentEnv
                  );

                  window.location.href = x;
                }}>Sign Transaction</button><br />

              <h2 className='text-black'>Sign A Transaction - On Goerli / ERC20 - AA Contract Call With Gas</h2><br />
              <button className='btn m-5 btn-error'
                onClick={() => {
                  const tx = {
                    data: encodeContractCall('erc20', 'transfer', [
                      '0xAA1658296e2b770fB793eb8B36E856c8210A566F',
                      BigNumber.from('1000000000000000')
                    ]),
                    gasLimit: 2000000,
                    to: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
                    value: ethers.utils.parseEther('0')
                  };
                  const s = loadStorage();

                  console.log(s);
                  const x = buildSignTxUrl(
                    s,
                    hexToU8a(encodeTransaction(tx).slice(2)),
                    SignTxType.AACall,
                    callbackUrl,
                    deploymentEnv
                  );

                  window.location.href = x;
                }}>Sign Transaction</button><br />

              <div className='divider'></div>
              <h2 className='text-black'>Sign A Message</h2><br />
              <button className='btn m-5 btn-error'
                onClick={() => {
                  const s = loadStorage();

                  console.log(s);
                  const x = buildSignMessageUrl(
                    s,
                    stringToU8a('Test Messaage'),
                    SignMessageType.EthereumPersonalSign,
                    callbackUrl,
                    deploymentEnv
                  );

                  window.location.href = x;
                }}>Sign Message</button><br />

              <div className='divider'></div>

              <h2 className='text-black'>Decrypt A Message</h2><br />

              <h2>
                Message - A Clear Text Message - encoded into {'0x' + u8aToHex(stringToU8a('A Clear Text Message'))} <br />
                Send to {'0x' + u8aToHex(account.publicKeys[0])} on sr25519 and address is {encodeAddress(account.publicKeys[0])} <br />
                Encrypted Message is {encryptedMessage} <br />
                Client Ephermeral Private Key is {'0x' + u8aToHex(clientPrivateKey)} and public key is {'0x' + u8aToHex(AsymmetricEncryption.getPublicKey(clientPrivateKey))}
              </h2>
              <button className='btn m-5 btn-error'
                onClick={() => {
                  const s = loadStorage();

                  console.log(s);
                  const x = buildDecryptMessageUrl(
                    s,
                    'sr25519',
                    encryptedMessage,
                    AsymmetricEncryption.getPublicKey(clientPrivateKey),
                    callbackUrl,
                    deploymentEnv
                  );

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
