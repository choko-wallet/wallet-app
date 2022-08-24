// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, RadioGroup, Transition } from '@headlessui/react';
import { CheckCircleIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import { selectUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
import { loadUserAccount, unlockUserAccount } from '@choko-wallet/frontend/features/slices/userSlice';
// sign message
import { ConnectDappDescriptor, ConnectDappRequest } from '@choko-wallet/request-handler';

//  http://localhost:3000/request?requestType=connectDapp&payload=01789c6360606029492d2e61a00c7004bb782b8450604e4b5d75fdc2841bf1c4eb0000282108a3&callbackUrl=https://localhost:3001/callback
// http://localhost:3000/request?requestType=connectDapp&payload=01789c6360606029492d2e61a00c7004bb782b8450604e4b5d75fdc2841bf1c4eb0000282108a3&callbackUrl=https://localhost:3001/callback
function ConnectDappHandler (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  const [mounted, setMounted] = useState<boolean>(false);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [request, setRequest] = useState<ConnectDappRequest>(null);
  const [callback, setCallback] = useState<string>('');

  useEffect(() => {
    if (allAccounts && currentAccount) {
      return;
    }

    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      dispatch(loadUserAccount());
    }

    if (userAccount && Object.keys(userAccount).length > 0) {
      const allAddrs = Object.keys(userAccount);

      setCurrentAccount(allAddrs[0]);
      setAllAccounts(allAddrs);
    }
  }, [router, dispatch, userAccount, currentAccount, allAccounts]);

  useEffect(() => {
    if (!router.isReady) return;
    const payload = router.query.payload as string;
    const u8aRequest = decompressParameters(hexToU8a(payload));

    setRequest(ConnectDappRequest.deserialize(u8aRequest));
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
            const connectDapp = new ConnectDappDescriptor();
            const response = await connectDapp.requestHandler(request, userAccount[account]);
            const s = response.serialize();

            window.location.href = callback + `?response=${u8aToHex(compressParameters(s))}&responseType=connectDapp`;
          })();
        }
      }
    }
  }, [userAccount, request, callback]);

  useEffect(() => {
    setMounted(true);
  }, []);

  function closeModal () {
    setOpenPasswordModal(false);

    if (request) {
      dispatch(unlockUserAccount({
        address: currentAccount,
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
      <div className='grid content-center col-span-12 md:col-span-1 md:col-start-4 shadow-xl justify-center rounded-lg bg-pink-500'>
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
            Request to Connect From a Dapp
          </h2>
          <h3>Give the Dapp your public address.</h3>

          <div className='grid grid-cols-12 gap-5 md:m-10 select-none'>
            <br/>
            <div className='col-span-12'>
              DApp Origin:
            </div>
            <div className='col-span-12'>
              <code className='underline text-clip'>{request.dappOrigin.displayName}</code>
            </div>
            <RadioGroup className='col-span-12'
              onChange={setCurrentAccount}
              value={currentAccount}>
              {allAccounts.map((name, index) => (
                <RadioGroup.Option
                  className={({ active, checked }) =>
                    `${checked ? 'bg-gray-500 bg-opacity-75 text-white' : 'bg-white'}
                      m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none col-span-12`
                  }
                  key={index}
                  value={name}
                >
                  {({ active, checked }) => (
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='text-sm'>
                          <RadioGroup.Label
                            as='div'
                            className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}
                          >
                            <div className="w-1/2 md:w-full" style={{ overflowWrap: 'break-word' }}>{name}</div>
                          </RadioGroup.Label>
                        </div>
                      </div>
                      {checked && (
                        <div className='shrink-0 text-white'>
                          <CheckCircleIcon className='h-6 w-6' />
                        </div>
                      )}
                    </div>
                  )}
                </RadioGroup.Option>
              ))}
            </RadioGroup>
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

export default ConnectDappHandler;
