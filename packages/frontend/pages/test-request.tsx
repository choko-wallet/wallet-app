// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';

import { hexToU8a, stringToU8a, u8aToHex } from '@skyekiwi/util';
import { BigNumber, ethers } from 'ethers';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import superagent from 'superagent';

import { encodeContractCall, encodeTransaction } from '@choko-wallet/abi';
import { AccountOption, UserAccount } from '@choko-wallet/core';
import { SignMessageType, SignTxType } from '@choko-wallet/core/types';
import { decompressParameters, xxHash } from '@choko-wallet/core/util';
import { ConnectDappResponse, SignMessageResponse, SignTxResponse } from '@choko-wallet/request-handler';
import { buildConnectDappUrl, buildSignMessageUrl, buildSignTxUrl, configSDK, storeUserAccount } from '@choko-wallet/sdk';
import { loadStorage, persistStorage } from '@choko-wallet/sdk/store';

import Loading from '../components/Loading';
import ball from '../images/ball.png';
import { fetchAAWalletAddress } from '../utils/aaUtils';
import { deploymentEnv, walletUrl } from '../utils/env';
import { fadeIn, planetVariants, staggerContainer, textContainer, textVariant2 } from '../utils/motion';
import { toastFail, toastSuccess } from '../utils/toast';
import { FormAPIResponse } from '../utils/types';

const callbackUrl = `${walletUrl}/test-request`;
// const apiUrl = 'http://localhost:3333/choko/beta';
const apiUrl = `https://betaapi.choko.app/choko/beta`;

const TestRequest: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [account, setAccount] = useState<UserAccount>(null);
  const [aaAddress, setAAAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [discordHandler, setDiscordHandler] = useState('');

  const apiConnect = async (polkadotAddress: string, eoaAddress: string, aaAddress: string) => {
    if (!polkadotAddress || !eoaAddress || !aaAddress) {
      console.log("wrong hook")
      return
      // throw new Error('address not ready');
    }

    await superagent
      .post(`${apiUrl}/connect`)
      .send({
        aaAddress: aaAddress,
        eoaAddress: eoaAddress,
        polkadotAddress: polkadotAddress
      })
      .then((res) => {
        console.log('All Done! Wallet connected', res);
      })
      .catch((err) => {
        console.log('Error', err);

        // Fail condition: DB write error. Should not happen
        toastFail('Someting Wrong! Please try again.');
      });
  };

  const apiFaucet = async (aaAddress: string) => {
    const notification = toast.loading('Claming Faucet...');

    if (!aaAddress) {
      throw new Error('address not ready');
    }

    await superagent
      .post(`${apiUrl}/faucet`)
      .send({ aaAddress: aaAddress })
      .then((res) => {
        const resp = res.body as FormAPIResponse;

        if (resp.error === 'already sent') {
          toast.error('Already Sent', {
            id: notification
          });
        } else {
          console.log('All Done! Faucet sent', res);
          toast.success('Faucet Sent', {
            id: notification
          });
        }
      })
      .catch((err) => {
        console.log('Error', err);
      });
  };

  const apiRecordGasless = async (aaAddress: string, gaslessTxId: string) => {
    if (!aaAddress) {
      throw new Error('address not ready');
    }

    await superagent
      .post(`${apiUrl}/recordGasless`)
      .send({
        aaAddress, gaslessTxId
      })
      .then((res) => {
        console.log('Gasless Tx ID recorded', res.body);
        toastSuccess('Finish Sending a Tx. DB Recorded.');
      })
      .catch((err) => {
        console.log('Error', err);
        toastFail('Someting Wrong! Please try again.');
      });
  };

  const apiRecord = async (eoaAddress: string, sig: string, discordHandler: string) => {
    if (!aaAddress) {
      throw new Error('address not ready');
    }

    const notification = toast.loading('Sending Discord Message ...');

    // console.log(discordHandler, eoaAddress, sig);
    await superagent
      .post(`${apiUrl}/recordDiscord`)
      .send({
        discordHandler,
        eoaAddress,
        sig
      })
      .then((res) => {
        const resp = res.body as FormAPIResponse;

        if (resp.error === 'no gaslessTxId') {
          toast.error('Failure: You have not sent a gasless Tx yet.', {
            id: notification
          });
        } else if (resp.error === 'sig wrong') {
          toast.error('Failure: Signature verification wrong. Make sure you have use the same account for signing.', {
            id: notification
          });
        } else if (resp.error === 'discord error') {
          toast.error('Failure: Failed to sent a discrod message. Make sure you have typed in the right discord handler.', {
            id: notification
          });
        } else if (resp.error === 'None') {
          toast.success('Success. You have finished the whole test. No further action needed.', {
            id: notification
          });
        }
      })
      .catch((err) => {
        console.log('Error', err);
        toastFail('Someting Wrong! Please try again.');
      });
  };

  // set up Dapp account storage
  useEffect(() => {
    if (!router.query || !router.query.response) return;

    const response = decompressParameters(hexToU8a(router.query.response as string));
    try {
      if (response && response.length > 0 && aaAddress) {
        if (router.query.responseType === 'signTx') {
          const resp = SignTxResponse.deserialize(response);

          void apiRecordGasless(
            aaAddress, `0x${u8aToHex(resp.payload.gaslessTxId)}`
          );
          void router.replace('/test-request', undefined, { shallow: true });
        } else if (router.query.responseType === 'signMessage') {
          const resp = SignMessageResponse.deserialize(response);

          void apiRecord(
            resp.userOrigin.getAddress('ethereum'),
            `0x${u8aToHex(resp.payload.signature)}`,
            discordHandler
          );
          void router.replace('/test-request', undefined, { shallow: true });
        }
      }
    } catch (err) {
      console.error('central-err', err);
      toastFail('Someting Wrong! Please try again.');
    }
  }, [router, aaAddress, account, discordHandler, loading]);

  useEffect(() => {
    if (router.query && router.query.responseType === 'connectDapp') {
      const response = decompressParameters(hexToU8a(router.query.response as string));
      const resp = ConnectDappResponse.deserialize(response);

      const store = loadStorage();
      storeUserAccount(store, resp.payload.userAccount);
      persistStorage(store);

      setLoading(true);
      void router.replace('/test-request', undefined, { shallow: true })
        .then(() => window.location.reload());
    }
  }, [router]);

  useEffect(() => {
    setLoading(true);
    const d = localStorage.getItem('userAccount');

    if (d && d !== 'null') {
      const a = UserAccount.deserialize(decompressParameters(hexToU8a(d)));
      setAccount(a);

      void (async() => {
        const res = await fetchAAWalletAddress([a]);
        setAAAddress(res[0]);
        await apiConnect(
          a.getAddress('sr25519'),
          a.getAddress('ethereum'),
          res[0]
        );
        setLoading(false)
      })()

      const discord = localStorage.getItem('discordHandler');
      if (discord) {
        setDiscordHandler(discord);
      }
    } else {
      setLoading(false)
    }
  }, []);

  // configSDK and store in localStorage
  useEffect(() => {
    configSDK({
      accountOption: new AccountOption({
        hasEncryptedPrivateKeyExported: false,
        localKeyEncryptionStrategy: 0
      }),
      activeNetworkHash: u8aToHex(xxHash('goerli')),
      displayName: 'Choko Wallet Beta Test',
      infoName: 'beta-test',
      version: 0
    });
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) return <Loading title='Loading Account ... ' />;

  return (
    <div className='overflow-hidden min-h-screen bg-[#1A232E]'>
      <Toaster />

      <section className='sm:p-16 xs:p-8 px-6 py-12 relative z-10'>
        <motion.div
          className='2xl:max-w-[1280px] w-full mx-auto flex md:flex-row flex-col gap-8'
          initial='hidden'
          variants={staggerContainer}
          viewport={{ amount: 0.25, once: false }}
          whileInView='show'
        >
          <motion.div
            className='flex-1 flex justify-center items-center'
            onClick={() => router.push('/home')}
            variants={planetVariants('left')}
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
            className='flex justify-center flex-col'
            variants={fadeIn('left', 'tween', 0.2, 1)}
          >

            <motion.p
              className='font-normal text-[14px] text-white'
              variants={textContainer}
            >
              {Array.from('| Choko Wallet Beta Test').map((letter, index) => (
                <motion.span key={index}
                  variants={textVariant2}>
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.p>

            {account
              ? <motion.p
                className='mt-[8px] font-bold md:text-[10px] text-[10px] text-white '
                initial='hidden'
                variants={textVariant2}
                whileInView='show'
              >
                {<>
                  <span className='font-normal text-[15px] text-[#B0B0B0] leading-[32.4px]'>Your Polkadot Account address: </span><br />
                  {account.getAddress('sr25519')}<br />
                  <span className='font-normal text-[15px] text-[#B0B0B0] leading-[32.4px]'>Your Ethereum EOA address: </span><br />
                  {account.getAddress('ethereum')}<br />
                  <span className='font-normal text-[15px] text-[#B0B0B0] leading-[32.4px]'>Your AA address: </span><br />
                  {aaAddress}<br />
                </>}
              </motion.p>

              : <div>
                <motion.p
                  className='mt-[8px] font-bold md:text-[24px] text-[16px] text-white '
                  initial='hidden'
                  variants={textVariant2}
                  whileInView='show'
                >
                  {<>Connect The Beta Test Dapp with an Address!</>}
                </motion.p>

                <button
                  className='flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 max-w-[300px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] '
                  onClick={() => {
                    const s = loadStorage();
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
        account &&
        <motion.div
          className='2xl:max-w-[1280px] w-full mx-auto flex flex-col gap-8 mb-10  px-6 sm:p-8'
          initial='hidden'
          variants={staggerContainer}
          viewport={{ amount: 0.25, once: false }}
          whileInView='show'
        >
          <motion.div
            className='flex md:flex-row flex-col gap-4'
            variants={fadeIn('up', 'spring', 0.5, 1)}
          >

            <div className='w-full flex justify-between items-center'>
              <div className='flex-1 md:ml-[62px] flex flex-col max-w-[650px]'>
                <p className='font-normal lg:text-[42px] text-[26px] text-white'>
                  Step 1: Claim Faucet
                </p>

                <p className='mt-[16px] font-normal lg:text-[20px] text-[14px] text-white'>
                  We will send you 1DAI on Goerli. You may only claim this once.
                </p>
                <p className='mt-[16px] font-normal lg:text-[20px] text-[14px] text-white'>
                  Once you have claimed the faucet. You click on the the purple sphere above to navigate to the wallet home and see your balance.
                </p>
              </div>

              <a
                className='flex items-center m-5 justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] '
                onClick={() => {
                  void apiFaucet(aaAddress);
                }}>
                Claim Faucet
              </a>

            </div>
          </motion.div>

          <motion.div
            className='flex md:flex-row flex-col gap-4'
            variants={fadeIn('up', 'spring', 0.8, 1)}
          >
            <div className='w-full flex justify-between items-center'>
              <div className='flex-1 md:ml-[62px] flex flex-col max-w-[650px]'>
                <p className='font-normal lg:text-[42px] text-[26px] text-white'>
                  Step 2: Sign A Gasless Transaction
                </p>
                <p className='mt-[16px] font-normal lg:text-[20px] text-[14px] text-white'>
                It will send some DAI back to the faucet home. You do not need to hold any tokens for gas as the transaction will be processed gasless.
                </p>
              </div>

              <button
                className='flex items-center justify-center shadow-md hover:shadow-xl m-5 active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] '
                onClick={() => {
                  const tx = {
                    data: encodeContractCall('erc20', 'transfer', [
                      '0xAA1658296e2b770fB793eb8B36E856c8210A566F',
                      BigNumber.from('1000000000000000000')
                    ]),
                    gasLimit: 2000000,
                    to: '0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844',
                    value: ethers.utils.parseEther('0')
                  };
                  const s = loadStorage();

                  const x = buildSignTxUrl(
                    s,
                    hexToU8a(encodeTransaction(tx).slice(2)),
                    SignTxType.Gasless,
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
            className='flex md:flex-row flex-col gap-4'
            variants={fadeIn('up', 'spring', 1.1, 1)}
          >
            <div className='w-full flex justify-between items-center'>
              <div className='flex-1 md:ml-[62px] flex flex-col max-w-[650px]'>
                <p className='font-normal lg:text-[42px] text-[26px] text-white'>
                  Step 3: Sign Your Discord Handler
                </p>
                <p className='mt-[16px] font-normal lg:text-[20px] text-[14px] text-white'>
                Check <a className='text-indigo-500'
                    href='https://www.remote.tools/remote-work/discord-tag'
                    rel='noreferrer'
                    target='_blank'>this article</a> on what is your discord handler. Upon finish signing, a bot will mention you in the discord channel. If you are able to receive it, you have completed the whole test. You are more than welcome to poke around the wallet and find bugs!
                </p><br/>

                <p className='m-2 font-normal lg:text-[20px] text-[20px] text-white'>
                  <span>Your Discord Handler: </span>
                  <input className='p-2 w-full input input-bordered input-info bg-transparent font-poppins text-white'
                    onChange={(e) => setDiscordHandler(e.target.value)}
                    placeholder={'choko wallet#3218'}
                    type='text'
                    value={discordHandler}
                  />
                </p>
              </div>

              <button
                className='flex items-center justify-center shadow-md m-5 hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] '
                onClick={() => {
                  const s = loadStorage();

                  localStorage.setItem('discordHandler', discordHandler);
                  const x = buildSignMessageUrl(
                    s,
                    stringToU8a(discordHandler),
                    SignMessageType.EthereumPersonalSign,
                    callbackUrl,
                    deploymentEnv
                  );

                  window.location.href = x;
                }}>
                Sign Message
              </button>

            </div>
          </motion.div>
        </motion.div>

      }
    </div>
  );
};

export default TestRequest;
