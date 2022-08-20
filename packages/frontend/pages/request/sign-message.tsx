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
// sign message
import { SignMessageDescriptor, SignMessageRequest } from '@choko-wallet/request-handler/signMessage';

// http://localhost:3000/request?requestType=signMessage&payload=01789c6360606029492d2e61a00cf07801cd500801129979e9e418d052575dbf30e1463c03839b8def0dff3b93dfe5f79ffa52e99ee4f663c77d97904d4d558f6fccf75b5f3e4b1baa818b91899985958d9d83938b42b78f82210b0092e61cb9&callbackUrl=dapp_url
// http://100.111.205.15:3000/request?requestType=signMessage&payload=01789c6360606029492d2e61a00cf07801cd500801129979e9e418d052575dbf30e1463c03839b8def0dff3b93dfe5f79ffa52e99ee4f663c77d97904d4d558f6fccf75b5f3e4b1baa818b91899985958d9d83938b42b78f82210b0092e61cb9&callbackUrl=dapp_url
function SignMsgRequest (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);
  // const requestError = useSelector(selectError);

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  const [mounted, setMounted] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<string>('hex');

  const [request, setRequest] = useState<SignMessageRequest>(null);
  const [response, setResponse] = useState<Uint8Array>(new Uint8Array());

  useEffect(() => {
    if (router.query && router.query.requestType) {
      const u8aRequest = decompressParameters(hexToU8a(router.query.payload as string));

      setRequest(SignMessageRequest.deserialize(u8aRequest));
    }
  }, [router.query]);

  useEffect(() => {
    if (userAccount && Object.keys(userAccount).length > 0) {
      for (const account in userAccount) {
        if (!userAccount[account].isLocked) {
          void (async () => {
            const signMessasge = new SignMessageDescriptor();
            const response = await signMessasge.requestHandler(request, userAccount[account]);
            const s = response.serialize();

            setResponse(compressParameters(s));
          })();
        }
      }
    }
  }, [userAccount, request]);

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
            <br/>
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
              <code className='underline text-clip'
                style={{ overflowWrap: 'break-word' }}>{response}</code>
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
                    <div className='textarea h-[10vh] font-mono border-gray-400'>{'0x' + u8aToHex(request.payload.message)}</div>
                  )
                  : (
                    <div className='textarea h-[10vh] font-mono border-gray-400'>{u8aToString(request.payload.message)}</div>
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

export default SignMsgRequest;
