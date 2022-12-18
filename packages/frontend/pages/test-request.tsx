// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextPage } from 'next';
import Image from 'next/image';

import { cryptoWaitReady, encodeAddress } from '@polkadot/util-crypto';
import { AsymmetricEncryption } from '@skyekiwi/crypto';
import { hexToU8a, stringToU8a, u8aToHex, u8aToString } from '@skyekiwi/util';
import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';
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

import { staggerContainer, fadeIn, planetVariants, textContainer, textVariant2 } from '../utils/motion';
import ball from '../images/ball.png';

import { useAppThunkDispatch } from '../features/redux/store';
import { setClose, setOpen } from '../features/slices/status';
import TestRequestModal from '../components/modal/TestRequestModal';
import superagent from 'superagent';

const callbackUrl = `${walletUrl}/test-request`;
const apiUrl = `http://localhost:3333/choko/beta`;
// const apiUrl = `https://formapi.skye.kiwi/choko/beta`;

const TestRequest: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  const [account, setAccount] = useState<UserAccount>(null);
  const [walletConnected, setWalletConnected] = useState<boolean>(false);

  const [aaAddress, setAAAddress] = useState('');

  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useAppThunkDispatch();
  const [modalString, setModalString] = useState<string>('');

  const [claimFaucet, setClaimFaucet] = useState(false);
  const [connect, setConnect] = useState(false);
  const [recordGasless, setRecordGasless] = useState(false);

  const [discordHandler, setDiscordHandler] = useState("");

  const apiConnect = async (polkadotAddress: string, eoaAddress: string, aaAddress: string) => {
    
    if (!polkadotAddress || !eoaAddress || !aaAddress) {
      throw new Error("address not ready");
    }

    const r = await superagent
      .post(`${apiUrl}/connect`)
      .send({
        polkadotAddress: polkadotAddress, 
        eoaAddress: eoaAddress, 
        aaAddress: aaAddress,
      });

    if (r.body.error === "None") {
      console.log("All Done! Wallet connected ")
      setConnect(false);
    }
  }

  const apiFaucet = async (aaAddress: string) => {
    
    if (!aaAddress) {
      throw new Error("address not ready");
    }

    console.log(aaAddress)
    try {
      const r = await superagent
        .post(`${apiUrl}/faucet`)
        .send({ aaAddress: aaAddress });
      if (r.body.error === "None") {
        console.log("All Done! Faucet sent")
        setClaimFaucet(false);
      }
    } catch(e) {
      console.log(e)
    }
  }

  const apiRecord = async (eoaAddress: string, sig: string, discordHandler: string) => {
    
    if (!aaAddress) {
      throw new Error("address not ready");
    }

    const r = await superagent
      .post(`${apiUrl}/recordDiscord`)
      .send({
        eoaAddress,
        sig, discordHandler
      });
    if (r.body.error === "None") {
      console.log("All Done! Data is recorded to our database.")
    }
  }

  const apiRecordGasless = async (aaAddress: string, gaslessTxId: string) => {
    
    if (!aaAddress) {
      throw new Error("address not ready");
    }

    const r = await superagent
      .post(`${apiUrl}/recordGasless`)
      .send({
        aaAddress, gaslessTxId
      });
    if (r.body.error === "None") {
      console.log("All Done! Gasless Data is recorded to our database.")
    }
  }

  useEffect(() => {
    if (!mounted) return;

    console.log("claimFaucet", claimFaucet)
    if (connect) {
      apiConnect(
        account.getAddress('sr25519'),
        account.getAddress('ethereum'),
        aaAddress 
      )
    } else if (claimFaucet) {
      apiFaucet(
        aaAddress
      );
    }
  }, [mounted, connect, claimFaucet])

  // set up Dapp account storage
  useEffect(() => {
    if (router.query && router.query.response && aaAddress) {
      try {
        const response = decompressParameters(hexToU8a(router.query.response as string));

        if (response && response.length > 0) {
          if (router.query.responseType === 'signTx') {
            const resp = SignTxResponse.deserialize(response);
            console.log('resp', resp);
            console.log('signTx');
            setWalletConnected(true);
            setModalString(JSON.stringify(resp.payload));
            dispatch(setOpen('testRequest'));

            apiRecordGasless(
              aaAddress, `0x${u8aToHex(resp.payload.gaslessTxId)}`,
            )
          } else if (router.query.responseType === 'signMessage') {
            const resp = SignMessageResponse.deserialize(response);

            console.log(resp);

            const msg = `Use Etherscan To verify this: 
            msg = 'Test Messaage',
            address = ${resp.userOrigin.getAddress('ethereum')},
            sig = 0x${u8aToHex(resp.payload.signature)}
          `;

            console.log(msg);
            console.log('signMessage');
            setWalletConnected(true);
            setModalString(msg);
            dispatch(setOpen('testRequest'))

            apiRecord(
              resp.userOrigin.getAddress('ethereum'),
              `0x${u8aToHex(resp.payload.signature)}`,
              discordHandler
            )

          } else if (router.query.responseType === 'connectDapp') {
            const resp = ConnectDappResponse.deserialize(response);
            console.log(resp);
            const store = loadStorage();
            storeUserAccount(store, resp.payload.userAccount);
            persistStorage(store);
            console.log('connectDapp');
            setWalletConnected(true);
            setConnect(true);
          }
        }
      } catch (err) {
        console.error('err', err);
      }

    }
  }, [router, aaAddress]);

  // configSDK and store in localStorage
  useEffect(() => {
    const store = configSDK({
      accountOption: new AccountOption({
        hasEncryptedPrivateKeyExported: false,
        localKeyEncryptionStrategy: 0
      }),
      activeNetworkHash: u8aToHex(xxHash('goerli')),
      displayName: 'Choko Wallet Beta Test',
      infoName: 'beta-test',
      version: 0
    });

    const data = store.userAccount;

    if (data && data !== 'null') {
      const a = UserAccount.deserialize(decompressParameters(hexToU8a(data)));

      setAccount(a);

      void (async () => {
        await cryptoWaitReady();
        const res = await fetchAAWalletAddress([a]);
        // const res = ['0x89898989898989']

        setAAAddress(res[0]);
        const discord = localStorage.getItem("discordHandler");
        if (discord) {
          setDiscordHandler(discord);
        }

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
                  <span className="font-normal text-[15px] text-[#B0B0B0] leading-[32.4px]">Your Polkadot Account address: </span><br />
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
                  We will send you 0.1DAI on Goerli
                </p>
              </div>

              <a
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
                onClick={() => {
                  setClaimFaucet(true)
                }}>
                Claim Faucet
              </a>

            </div>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 'spring', 1.4, 1)}
            className="flex md:flex-row flex-col gap-4"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <p className="font-normal lg:text-[42px] text-[26px] text-white">
                  Sign A Gasless Transaction
                </p>
              </div>

              <button
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
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
            variants={fadeIn('up', 'spring', 1.7, 1)}
            className="flex md:flex-row flex-col gap-4"
          >
            <div className="w-full flex justify-between items-center">
              <div className="flex-1 md:ml-[62px] flex flex-col max-w-[650px]">
                <p className="font-normal lg:text-[42px] text-[26px] text-white">
                  Sign A Message
                </p>

                <p className="m-2 font-normal lg:text-[20px] text-[20px] text-white">
                  <span className='m-2'>Your Discord Handler: </span>
                  <input className='m-2 p-2 w-full input input-bordered input-info bg-transparent font-poppins text-white'
                    onChange={(e) => setDiscordHandler(e.target.value)}
                    placeholder={`choko wallet#3218`}
                    type='text'
                    value={discordHandler}
                  />
                </p>
              </div>
              
              <button
                className="flex items-center justify-center shadow-md hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-[#25618B] rounded-[32px] "
                onClick={() => {
                  const s = loadStorage();

                  localStorage.setItem("discordHandler", discordHandler);
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


      <TestRequestModal modalString={modalString} />
    </div>
  );
};

export default TestRequest;
