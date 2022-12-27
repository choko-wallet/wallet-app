// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { decodeContractCall, decodeTransaction } from '@choko-wallet/abi';
import { SignTxType } from '@choko-wallet/core/types';
import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import Modal from '@choko-wallet/frontend/components/Modal';
import { selectCurrentUserAccount, selectUserAccount } from '@choko-wallet/redux-module';
import { setClose, setOpen } from '@choko-wallet/redux-module';
import { decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, noteAAWalletAddress, switchUserAccount } from '@choko-wallet/redux-module';
import { encodeAddr, fetchAAWalletAddress } from '@choko-wallet/frontend-utils-module';
import { getAlchemy } from '@choko-wallet/frontend-utils-module';
import { SignTxDescriptor, SignTxRequest } from '@choko-wallet/request-handler';

import Loading from '../../components/Loading';

function SignTxHandler(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const userAccount = useSelector(selectUserAccount);

  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState<boolean>(false);
  const [sendingTx, setSendingTx] = useState<boolean>(false);

  const [displayType, setDisplayType] = useState<string>('decoded');

  const [decodingTx, setDecodingTx] = useState<boolean>(true);
  const [decodedTx, setDecodedTx] = useState<string>('');

  const [request, setRequest] = useState<SignTxRequest>(null);
  const [callback, setCallback] = useState<string>('');

  // 1. parse query
  useEffect(() => {
    if (!router.isReady) return;
    const payload = router.query.payload as string;
    const callbackUrl = router.query.callbackUrl as string;
    const u8aRequest = decompressParameters(hexToU8a(payload));
    const request = SignTxRequest.deserialize(u8aRequest);

    if (!localStorage.getItem('serialziedUserAccount')) {
      localStorage.setItem('requestParams', `payload=${payload}&callbackUrl=${callbackUrl}`);
      void router.push('/account');
    } else {
      setCallback(callbackUrl);
      setRequest(request);
    }
  }, [router.isReady, router.query, dispatch, router]);

  // 2. load accounts and switch account is not matching origin
  useEffect(() => {
    if (!request) return;

    dispatch(loadUserAccount());
  }, [request, dispatch]);

  useEffect(() => {
    if (!userAccount) return;
    if (!request) return;

    const len = userAccount.length;

    for (let i = 0; i < len; ++i) {
      if (userAccount[i].getAddress('ethereum') === request.userOrigin.getAddress('ethereum')) {
        dispatch(switchUserAccount(i));
        break;
      }
    }
  }, [request, userAccount, dispatch]);

  // 2+. fetch AA wallet address if not set
  useEffect(() => {
    if (!request) return;
    if (!currentUserAccount) return;

    // check if the AA address is correctly populated
    if (!currentUserAccount.aaWalletAddress) {
      void (async () => {
        const aaAddresses = await fetchAAWalletAddress(userAccount);

        dispatch(noteAAWalletAddress(aaAddresses));
        setMounted(true);
      })();
    } else {
      setMounted(true);
    }
  }, [request, currentUserAccount, dispatch, userAccount]);

  // parse the transaction and display
  useEffect(() => {
    if (!mounted) return;

    void (async () => {
      if (request.dappOrigin.activeNetwork.networkType === 'polkadot') {
        const provider = new WsProvider(request.dappOrigin.activeNetwork.defaultProvider);
        const api = await ApiPromise.create({ provider: provider });
        const tx = api.tx(request.payload.encoded).toHuman();

        /* eslint-disable */
        // @ts-ignore
        const value = Number(tx.method.args.value.toString().replaceAll(",", '')) / Math.pow(10, request.dappOrigin.activeNetwork.nativeTokenDecimal)
        // @ts-ignore
        setDecodedTx(`Send ${value} ${request.dappOrigin.activeNetwork.nativeTokenSymbol} to ${tx.method.args.dest.Id} `);
        /* eslint-enable */

        setDecodingTx(false);
      } else {
        const encodedTx = `0x${u8aToHex(request.payload.encoded)}`;
        const tx = decodeTransaction(encodedTx);

        if (tx.data === '0x') {
          const value = ethers.utils.formatEther(ethers.BigNumber.from(tx.value._hex));

          setDecodedTx(`Send ${value} ${request.dappOrigin.activeNetwork.nativeTokenSymbol} to ${tx.to} `);
        } else {
          const result = decodeContractCall('erc20', tx);
          const tokenContractAddress = tx.to;
          const alchemy = getAlchemy(request.dappOrigin.activeNetwork);

          const metadata = await alchemy.core.getTokenMetadata(tokenContractAddress);
          const value = ethers.BigNumber.from(result.args._value);
          const humanValue = value.div(BigNumber.from('10').pow(metadata.decimals));

          setDecodedTx(`Send ${humanValue.toString()} ${metadata.name} to ${result.args._to as string} `);
        }

        setDecodingTx(false);
      }
    })();
  }, [mounted, request, dispatch, userAccount, currentUserAccount]);

  function unlock() {
    if (!request) return;

    try {
      dispatch(decryptCurrentUserAccount(password));

      if (currentUserAccount && !currentUserAccount.isLocked) {
        setPassword('');
        dispatch(setClose('signTxPasswordModal'));

        void (async () => {
          const signTx = new SignTxDescriptor();

          try {
            setSendingTx(true);

            try {
              const response = await signTx.requestHandler(request, currentUserAccount);// 这一步是发送
              const s = response.serialize();

              dispatch(lockCurrentUserAccount());
              window.location.href = callback + `?response=${u8aToHex(compressParameters(s))}&responseType=signTx`;
              setSendingTx(false);
            } catch (e) {
              console.error(e);
            }
          } catch (err) {
            console.log('err', err);
            toast('Something Wrong', {
              style: {
                background: 'red',
                color: 'white',
                fontFamily: 'Poppins',
                fontSize: '16px',
                fontWeight: 'bolder',
                padding: '20px'
              }
            });
          }
        })();
      }

      toast('Password Correct, Redirecting...', {
        duration: 5000,
        icon: '👏',
        style: {
          background: 'green',
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: '17px',
          fontWeight: 'bolder',
          padding: '20px'
        }
      });
    } catch (e) {
      toast('Wrong Password!', {
        style: {
          background: 'red',
          color: 'white',
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontWeight: 'bolder',
          padding: '20px'
        }
      });
    }
  }

  if (!mounted) {
    return null;
  }

  if (decodingTx) return <Loading title='Decoding Transaction ...' />;
  if (sendingTx) return <Loading title='Sending Transaction ...' />;

  return (
    <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400 p-5'>
      <Toaster />
      <div className='grid content-center col-span-12 md:col-span-1 md:col-start-4 shadow-xl justify-center rounded-lg bg-pink-600'>
        <h1 className='md:hidden col-span-12 card-title text-white select-none p-10 '>
          {request.dappOrigin.activeNetwork.text}
        </h1>
        <h1 className='hidden md:block col-span-12 card-title text-white select-none p-10 vertical-text'>
          {request.dappOrigin.activeNetwork.text}
        </h1>
      </div>
      <div className='grid grid-cols-12 col-span-12 md:col-span-5 gap-y-5'>
        <div className='col-span-12 shadow-xl rounded-lg card p-10 bg-white'>
          <h2 className='card-title'>
            Request to Sign a Transaction
          </h2>
          <h3>Send a transaction on the selected blockchain network.</h3>

          <div className='grid grid-cols-12 gap-5 md:m-10 select-none'>
            <br />
            <div className='col-span-12'>
              DApp Origin:
            </div>
            <div className='col-span-12'>
              <code className='underline'>{request.dappOrigin.displayName}</code>
            </div>
            <div className='col-span-12'>
              Your Orign:
            </div>
            <div className='col-span-12'>
              <code className='underline text-clip'
                style={{ overflowWrap: 'break-word' }}>{
                  encodeAddr(request.dappOrigin.activeNetwork, currentUserAccount)
                }</code>
            </div>
            <div className='col-span-12'>
              Trasnaction Type:
            </div>
            <div className='col-span-12'>
              <code className='underline text-clip'
                style={{ overflowWrap: 'break-word' }}>{
                  SignTxType[request.payload.signTxType]
                }</code>
            </div>

            <div className='col-span-12'>
              <div className='divider'></div>
            </div>
            <div className='col-span-12'>
              Transaction To Sign:
            </div>

            <div className='col-span-12'>
              <div className='tabs'>
                <a className={`tab tab-bordered ${displayType === 'hex' ? 'tab-active' : ''}`}
                  onClick={() => setDisplayType('hex')}>Hex</a>
                <a className={`tab tab-bordered ${displayType === 'ascii' ? 'tab-active' : ''}`}
                  onClick={() => setDisplayType('decoded')}>Decoded</a>
              </div>
            </div>

            <div className='col-span-12'>
              {
                displayType === 'hex'
                  ? (
                    <div className='textarea h-[20vh] font-mono border-gray-400 scrollbar-thin overflow-y-auto'
                      style={{ overflowWrap: 'break-word' }}>{'0x' + u8aToHex(request.payload.encoded)}</div>
                  )
                  : (
                    <div className='textarea h-[20vh] font-mono border-gray-400 scrollbar-thin overflow-y-auto'
                      style={{ overflowWrap: 'break-word' }}>{decodedTx}</div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-12 my-2'></div>

      {/* {sendLoading ?
        null
        :
        <div className='grid grid-cols-12 col-span-12' >
          <div className='col-span-4 col-start-4 md:col-span-2 md:col-start-6'>
            <button className='btn btn-success btn-circle btn-lg'
              onClick={() => dispatch(setOpen('signTxPasswordModal'))}>
              <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
          <div className='col-span-4 md:col-span-2'>
            <button className='btn btn-error btn-circle btn-lg'
              onClick={() => router.push('/')} >
              <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
      } */}
      <div className='col-span-4 col-start-4 md:col-span-2 md:col-start-6'>
        <button className='btn btn-success btn-circle btn-lg'
          onClick={() => dispatch(setOpen('signTxPasswordModal'))}>
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <div className='col-span-4 md:col-span-2'>
        <button className='btn btn-error btn-circle btn-lg'
          onClick={() => router.push('/')} >
          <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>

      <Modal modalName='signTxPasswordModal'>
        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff] '>
          <Dialog.Title
            as='h3'
            className='font-poppins text-lg font-medium leading-6 text-black w-72'
          >
            Unlock Wallet with Password
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              <input className='input input-bordered w-full max-w-xs'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Account Password'

                type='password'
                value={password}
              />
            </p>
          </div>

          <div className='mt-4 flex justify-between'>
            <button
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              onClick={unlock}
              type='button'
            >
              Unlock
            </button>

          </div>
        </Dialog.Panel>
      </Modal>
    </main>
  );
}

export default SignTxHandler;
