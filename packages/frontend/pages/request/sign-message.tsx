// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { Popover, RadioGroup, Transition, Dialog } from '@headlessui/react';
import React, { Fragment, useEffect, useState } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
import { unlockUserAccount } from '@choko-wallet/frontend/features/slices/userSlice';

// sign message
import { SignMessageDescriptor, SignMessageRequest } from '@choko-wallet/request-handler/signMessage';
import { hexToU8a } from '@skyekiwi/util';

// http://localhost:3000/request?requestType=signMessage&payload=00000004746573740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c4a6573742054657374696e6700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000847e7b7fa160d85f0000463c4dd84fdc93ee6f8fcaf479476246f8b8df4454b2827ae3d89f4eaf779a2b000000000000000a0102030405060708090a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000&callbackUrl=dapp_url
function SignMsgRequest(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const userAccount = useSelector(selectUserAccount);

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  const [mounted, setMounted] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<string>('hex');
  const [payload, setPayload] = useState(null);

  useEffect(() => {
    setPayload(router.query.payload);
  }, [router.query])

  useEffect(() => {
    setMounted(true);
  }, []);

  function closeModal() {
    setOpenPasswordModal(false);
    dispatch(unlockUserAccount('123'));
    console.log('close')
  }

  useEffect(() => {
    if (userAccount && payload) {
      (async () => {
        const u8aRequest = hexToU8a(payload);
        const request = SignMessageRequest.deserialize(u8aRequest);
        console.log("request: ", request);
        const signMessasge = new SignMessageDescriptor();
        const response = await signMessasge.requestHandler(request, userAccount);
        console.log("response: ", response);
      })();
    }
  }, [userAccount, payload])

  if (!mounted) {
    return null;
  }

  return (
    <main className='grid grid-cols-12 gap-4 h-screen content-center bg-gray-400'>

      <div className='grid grid-cols-12 content-center col-span-1 col-start-4 shadow-xl rounded-lg bg-gray-600'>
        <h1 className='col-span-12 card-title text-white vertical-text select-none'>
          General Request
        </h1>
      </div>
      <div className='grid grid-cols-12 col-span-4 gap-y-5'>
        <div className='col-span-12 shadow-xl rounded-lg'>
          <div className='card p-10 '
            style={{ background: 'white' }}>
            <h2 className='card-title'>
              Request to Sign a Message
            </h2>
            <h3>Generate a cryptographic singature.</h3>

            <div className='grid grid-cols-12 gap-5 m-10 select-none'>
              <div className='col-span-12'>
                DApp Origin: <code className='m-2 p-2 border'> XXX Finance</code>
              </div> <br />
              <div className='col-span-12'>
                Your Orign: <code className='m-2 p-2 border'>5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC</code>
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
                      <textarea className='textarea border-gray-400'
                        cols={50}
                        rows={5}
                        defaultValue={'0x123'}></textarea>
                    )
                    : (
                      <textarea className='textarea border-gray-400'
                        cols={50}
                        rows={5}
                        defaultValue={'abc'}></textarea>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-1 col-start-6 m-5'>
        <button className='btn btn-success btn-circle btn-lg' onClick={() => setOpenPasswordModal(true)}>
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <div className='col-span-1 m-5'>
        <button className='btn btn-error btn-circle btn-lg'
          onClick={() => router.push('/')} >
          <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      
      <Transition appear show={openPasswordModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Unlock Wallet with Password
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <input className='input input-bordered w-full max-w-xs'
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='Set a Password'

                      type='password'
                      value={password}
                    />
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
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
