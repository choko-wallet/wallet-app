// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';
import Image from 'next/image';

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
import { motion } from 'framer-motion';
import { encodeContractCall, encodeTransaction } from '@choko-wallet/abi';
import { AccountOption, UserAccount } from '@choko-wallet/core';
import { SignMessageType, SignTxType } from '@choko-wallet/core/types';
import { decompressParameters, xxHash } from '@choko-wallet/core/util';
import { ConnectDappResponse, DecryptMessageResponse, SignMessageResponse, SignTxResponse } from '@choko-wallet/request-handler';
import { buildConnectDappUrl, buildSignMessageUrl, buildSignTxUrl, configSDK, storeUserAccount } from '@choko-wallet/sdk';
import { buildDecryptMessageUrl } from '@choko-wallet/sdk/requests';
import { loadStorage, persistStorage } from '@choko-wallet/sdk/store';

import { fetchAAWalletAddress } from '../utils/aaUtils';
import { deploymentEnv, walletUrl } from '../utils/env';
import Loading from './../components/Loading';
import toast from 'react-hot-toast';


import ball from '../images/ball.png';

const callbackUrl = `${walletUrl}/test-request`;

const TestRequest: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [account, setAccount] = useState<UserAccount>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  const [encryptedMessage, setEncryptedMessage] = useState<Uint8Array>(new Uint8Array(0));
  const [clientPrivateKey, setClientPrivateKey] = useState<Uint8Array>(new Uint8Array(32));
  const [aaAddress, setAAAddress] = useState('');

  const [loading, setLoading] = useState<boolean>(true);

  // set up Dapp account storage
  useEffect(() => {// 解密参数要加try catch 
    if (router.query && router.query.response) {
      try {
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
          } else if (router.query.responseType === 'connectDapp') {//如果连接钱包回到成功 给状态 显示账户
            const resp = ConnectDappResponse.deserialize(response);
            console.log(resp);
            const store = loadStorage();
            storeUserAccount(store, resp.payload.userAccount);
            persistStorage(store);

            console.log('1111');
            setWalletConnected(true);
          }
        }
      } catch (err) {
        console.error('err', err);
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


  const staggerContainer = () => ({
    hidden: {
    },
    show: {
      transition: {
      },
    },
  });

  const planetVariants = (direction: string) => ({
    hidden: {
      x: direction === 'left' ? '-100%' : '100%',
      rotate: 120,//旋转进入 
    },
    show: {
      x: 0,
      rotate: 0,
      transition: {
        type: 'spring',//有刹车效果 
        duration: 1.8,
        delay: 0.5,
      },
    },
  });


  const fadeIn = (direction: string, type: string, delay: number, duration: number) => ({
    hidden: {
      x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
      y: direction === 'up' ? 100 : direction === 'down' ? -100 : 0,
      opacity: 0,
    },
    show: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type,
        delay,
        duration,
        ease: 'easeOut',
      },
    },
  });

  const textContainer = {
    hidden: {
      opacity: 0,
    },
    show: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
    }),
  };

  const textVariant2 = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'tween',
        ease: 'easeIn',
      },
    },
  };




  return (
    <div className="overflow-hidden min-h-screen bg-[#1A232E]">

      <section className='sm:p-16 xs:p-8 px-6 py-12 relative z-10'>
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className='2xl:max-w-[1280px] w-full mx-auto flex md:flex-row flex-col gap-8'
        >
          <motion.div
            variants={planetVariants('left')}
            className='flex-1 flex justify-center items-center'
          >

            <Image
              alt='choko wallet'
              className='relative object-contain mx-auto rounded-full'
              height={180}
              /* eslint-disable */
              // @ts-ignore
              src={ball}
              /* eslint-enable */
              width={180}
            />
          </motion.div>

          <motion.div
            variants={fadeIn('left', 'tween', 0.2, 1)}
            className="flex justify-center flex-col"
          >

            <motion.p
              variants={textContainer}
              // transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
              // staggerChildren每个字母 delayChildren 整体出现的延迟
              className='font-normal text-[14px] text-white'
            >
              {Array.from("| Test Page for Request Handler").map((letter, index) => (
                <motion.span variants={textVariant2} key={index}>
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.p>

            {walletConnected ?

              <motion.p
                variants={textVariant2}
                initial="hidden"
                whileInView="show"
                className='mt-[8px] font-bold md:text-[10px] text-[10px] text-white '
              >
                {<>
                  <span className="font-normal text-[15px] text-[#B0B0B0] leading-[32.4px]">Your Account address: </span><br />
                  {account.getAddress('sr25519')}<br />
                  <span className="font-normal text-[15px] text-[#B0B0B0] leading-[32.4px]">Your Ethereum EOA address: </span><br />
                  {account.getAddress('ethereum')}<br />
                  <span className="font-normal text-[15px] text-[#B0B0B0] leading-[32.4px]">Your AA address: </span><br />
                  {aaAddress}<br />
                </>}
              </motion.p>

              :

              <div>
                <motion.p
                  variants={textVariant2}
                  initial="hidden"
                  whileInView="show"
                  className='mt-[8px] font-bold md:text-[24px] text-[16px] text-white '
                >
                  {<>Connect This Testing Page with an Address!</>}
                </motion.p>

                <button
                  className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 max-w-[300px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
                  onClick={() => {
                    const s = loadStorage();

                    console.log(s);
                    const x = buildConnectDappUrl(s, callbackUrl, deploymentEnv);

                    window.location.href = x;
                  }}>
                  Connect Wallet
                </button>
              </div>
            }





          </motion.div>
        </motion.div>
      </section>

      {
        account && walletConnected &&
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.25 }}
          className='2xl:max-w-[1280px] w-full mx-auto flex flex-col gap-8 mb-10  px-6 sm:p-8'
        >
          <motion.div
            variants={fadeIn('up', 'spring', 0.5, 1)}
            className="flex md:flex-row flex-col gap-4"
          >

            <div className="w-full flex justify-between items-center">
              <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <p className="font-normal lg:text-[42px] text-[26px] text-white">
                  Claim Faucet
                </p>

                <p className="mt-[16px] font-normal lg:text-[20px] text-[14px] text-white">
                  Follow SkyeKiwi on their <a className='text-sky-400'
                    href='https://discord.com/invite/m7tFX8u43J'>Discord server</a> and go to <b>“#alpha-testnet-faucet”</b> channel to generate test tokens. Send <b>“!faucet </b> with your created account address to receive testnet tokens.
                </p>
              </div>

              <a
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
                href='https://discord.com/invite/m7tFX8u43J'>
                Claim Faucet
              </a>

            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 'spring', 0.8, 1)}
            className="flex md:flex-row flex-col gap-4"
          >

            <div className="w-full flex justify-between items-center">
              <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <p className="font-normal lg:text-[42px] text-[26px] text-white">
                  Sign A Transaction - Polkadot Style
                </p>
              </div>

              <button
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
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
                }}>
                Sign Tx
              </button>

            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 'spring', 1.1, 1)}
            className="flex md:flex-row flex-col gap-4"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <p className="font-normal lg:text-[42px] text-[26px] text-white">
                  Sign A Transaction - On Goerli, Gasless
                </p>
              </div>

              <button
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
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
                }}
              >
                Sign Tx
              </button>

            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 'spring', 1.4, 1)}
            className="flex md:flex-row flex-col gap-4"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <p className="font-normal lg:text-[42px] text-[26px] text-white">
                  Sign A Transaction - On Goerli / ERC20 - AA Contract Call With Gas
                </p>
              </div>

              <button
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
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
                }}>
                Sign Tx
              </button>

            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 'spring', 1.7, 1)}
            className="flex md:flex-row flex-col gap-4"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <p className="font-normal lg:text-[42px] text-[26px] text-white">
                  Sign A Message
                </p>
              </div>

              <button
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
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
                }}>
                Sign Tx
              </button>

            </div>
          </motion.div>


          <motion.div
            variants={fadeIn('up', 'spring', 2.0, 1)}
            className="flex md:flex-row flex-col gap-4"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <p className="font-normal lg:text-[42px] text-[26px] text-white">
                  Decrypt A Message
                </p>

                <p className="font-normal text-[6px] text-white stringWrap ">
                  Message - A Clear Text Message - encoded into {'0x' + u8aToHex(stringToU8a('A Clear Text Message'))} <br />
                  Send to {'0x' + u8aToHex(account.publicKeys[0])} on sr25519 and address is {encodeAddress(account.publicKeys[0])} <br />
                  Encrypted Message is {encryptedMessage} <br />
                  Client Ephermeral Private Key is {'0x' + u8aToHex(clientPrivateKey)} and public key is {'0x' + u8aToHex(AsymmetricEncryption.getPublicKey(clientPrivateKey))}
                </p>
              </div>

              <button
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
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
                }}>
                Decrypt Msg
              </button>

            </div>
          </motion.div>

        </motion.div>

      }





      {/* <main className='grid grid-cols-12 gap-4 '>

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
                }}>
                Connect Wallet
              </button>



              <div className='divider'></div>

              {
                account && walletConnected &&
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
      </main> */}

    </div>
  );
};

export default TestRequest;
