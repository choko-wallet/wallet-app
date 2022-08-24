// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { hexToU8a, u8aToHex, u8aToString } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import { selectUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
import { unlockUserAccount } from '@choko-wallet/frontend/features/slices/userSlice';
import { SignTxDescriptor, SignTxRequest } from '@choko-wallet/request-handler';

// http://localhost:3000/request?requestType=signTx&payload=01789c6360606029492d2e61a00c7004bb782b8450604e4b5d75fdc2841bf10c0c6e36be37fcef4c7e97df7fea4ba57b92db8f1df75d423635553dbe31df6f7df92c6da806b5292c2c0c0c7cc7b4cf1871efdffebbfc9f77cffd1b85d76e08fab13afd60ae8bcb9d2d5de49dc642a1bf46c1a00600ab7d2aa6&callbackUrl=https://localhost:3001/callback

function SignTxHandler (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);
  // const requestError = useSelector(selectError);

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  const [mounted, setMounted] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<string>('hex');

  const [request, setRequest] = useState<SignTxRequest>(null);
  const [callback, setCallback] = useState<string>('');

  useEffect(() => {
    if (!router.isReady) return;
    const payload = router.query.payload as string;
    const u8aRequest = decompressParameters(hexToU8a(payload));

    setRequest(SignTxRequest.deserialize(u8aRequest));
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (!router.isReady) return;
    const callbackUrl = router.query.callbackUrl as string;

    setCallback(callbackUrl);
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (userAccount && Object.keys(userAccount).length > 0) {
      for (const account in userAccount) {
        if (!userAccount[account].isLocked) {
          void (async () => {
            const signTx = new SignTxDescriptor();
            const response = await signTx.requestHandler(request, userAccount[account]);
            const s = response.serialize();

            window.location.href = callback + `?response=${u8aToHex(compressParameters(s))}&responseType=signTx`;
          })();
        }
      }
    }
  }, [userAccount, request, callback]);

  useEffect(() => {
    if (request) setMounted(true);
  }, [request]);

  function closeModal () {
    setOpenPasswordModal(false);

    if (request) {
      dispatch(unlockUserAccount({
        address: request.userOrigin.address,
        password: password
      }));
    } else {
      alert('unexpected!');
    }
  }

  if (!mounted) {
    return null;
  }

  return (
    <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400 p-5'>

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
            <br/>
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
              <code className='underline'
                style={{ overflowWrap: 'break-word' }}>{request.userOrigin.address}</code>
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
                  onClick={() => setDisplayType('ascii')}>Ascii</a>
              </div>
            </div>

            <div className='col-span-12'>
              {
                displayType === 'hex'
                  ? (
                    <div className='textarea h-[10vh] font-mono border-gray-400'
                      style={{ overflowWrap: 'break-word' }}>{'0x' + u8aToHex(request.payload.encoded)}</div>
                  )
                  : (
                    <div className='textarea h-[10vh] font-mono border-gray-400'
                      style={{ overflowWrap: 'break-word' }}>{u8aToString(request.payload.encoded)}</div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-12 my-2'></div>

      <div className='col-span-4 col-start-4 md:col-span-2 md:col-start-6'>
        <button className='btn btn-success btn-circle btn-lg'
          onClick={() => setOpenPasswordModal(true)}>
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <div className='col-span-4 md:col-span-2'>
        <button className='btn btn-error btn-circle btn-lg'
          onClick={() => router.push('/')} >
          <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <Transition appear
        as={Fragment}
        show={openPasswordModal}>
        <Dialog as='div'
          className='relative z-10'
          onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'
                  >
                  Unlock Wallet with Password
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm text-gray-500'>
                      <input className='input input-bordered w-full max-w-xs'
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='Set a Password'

                        type='password'
                        value={password}
                      />
                    </p>
                  </div>

                  <div className='mt-4'>
                    <button
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal}
                      type='button'
                    >
                    Unlock
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </main>
  );
}

export default SignTxHandler;
