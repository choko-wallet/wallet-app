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
import { selectCurrentUserAccount, selectDecryptCurrentUserAccountResult, selectError } from '@choko-wallet/frontend/features/redux/selectors';
import { decryptCurrentUserAccount, loadUserAccount, switchUserAccount } from '@choko-wallet/frontend/features/slices/userSlice';
// sign message
import { SignMessageDescriptor, SignMessageRequest } from '@choko-wallet/request-handler/signMessage';

import Loading from '../../components/Loading';

function SignMessageHandler(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUserAccount = useSelector(selectCurrentUserAccount);
  const reduxError = useSelector(selectError);
  const decryptCurrentUserAccountResult = useSelector(selectDecryptCurrentUserAccountResult);

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  const [mounted, setMounted] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<string>('hex');

  const [request, setRequest] = useState<SignMessageRequest>(null);
  const [callback, setCallback] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;
    const payload = router.query.payload as string;
    const u8aRequest = decompressParameters(hexToU8a(payload));
    const callbackUrl = router.query.callbackUrl as string;
    const request = SignMessageRequest.deserialize(u8aRequest);

    dispatch(loadUserAccount());
    dispatch(switchUserAccount(request.userOrigin.address));
    setCallback(callbackUrl);
    setRequest(request);
  }, [dispatch, router.isReady, router.query]);

  useEffect(() => {
    if (reduxError) {
      alert(reduxError);
    }

    console.log(currentUserAccount, decryptCurrentUserAccountResult);

    if (currentUserAccount && !currentUserAccount.isLocked && decryptCurrentUserAccountResult === 'success') {
      void (async () => {
        const signMessage = new SignMessageDescriptor();

        try {
          setLoading(true);

          const response = await signMessage.requestHandler(request, currentUserAccount);
          const s = response.serialize();
          dispatch(decryptCurrentUserAccount(''));
          window.location.href = callback + `?response=${u8aToHex(compressParameters(s))}&responseType=signMessage`;
        } catch (err) {
          alert(err);
          console.error(err);
        }
      })();
    }
  }, [reduxError, currentUserAccount, decryptCurrentUserAccountResult, request, callback]);

  useEffect(() => {
    if (request) setMounted(true);
  }, [request]);

  function unlock() {
    if (request) {
      dispatch(decryptCurrentUserAccount(password));
    } else {
      alert('unexpected!');
    }
  }

  function closeModal() {
    setPassword('');
    dispatch(decryptCurrentUserAccount(''));
    setOpenPasswordModal(false);
  }

  if (!mounted) {
    return null;
  }

  if (loading) return <Loading title='Signing Messsage. You will be redirected back once done.' />;

  return (
    <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400 p-5'>

      <div className='grid content-center col-span-12 md:col-span-1 md:col-start-4 shadow-xl justify-center rounded-lg bg-gray-600'>
        <h1 className='md:hidden col-span-12 card-title text-white select-none p-10 '>
          General Request
        </h1>
        <h1 className='hidden md:block col-span-12 card-title text-white select-none p-10 vertical-text'>
          General Request
        </h1>
      </div>
      <div className='grid grid-cols-12 col-span-12 md:col-span-5 gap-y-5'>
        <div className='col-span-12 shadow-xl rounded-lg card p-10 bg-white'>
          <h2 className='card-title'>
            Request to Sign a Message
          </h2>
          <h3>Generate a cryptographic singature.</h3>

          <div className='grid grid-cols-12 gap-5 md:m-10 select-none'>
            <br />
            <div className='col-span-12'>
              DApp Origin:
            </div>
            <div className='col-span-12'>
              <code className='underline text-clip'>{request.dappOrigin.displayName}</code>
            </div>
            <div className='col-span-12'>
              Your Orign:
            </div>
            <div className='col-span-12'>
              <code className='underline text-clip'
                style={{ overflowWrap: 'break-word' }}>{request.userOrigin.address}</code>
            </div>
            <div className='col-span-12'>
              <div className='divider'></div>
            </div>
            <div className='col-span-12'>
              Message To Sign:
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
                      style={{ overflowWrap: 'break-word' }}>{'0x' + u8aToHex(request.payload.message)}</div>
                  )
                  : (
                    <div className='textarea h-[10vh] font-mono border-gray-400'
                      style={{ overflowWrap: 'break-word' }}>{u8aToString(request.payload.message)}</div>
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
                      onClick={unlock}
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

export default SignMessageHandler;
