// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, RadioGroup } from '@headlessui/react';
import { CheckCircleIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import Modal from 'packages/app/components/Modal';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, noteAAWalletAddress, selectCurrentUserAccount, selectUserAccount, setClose, setOpen, switchUserAccount } from '@choko-wallet/app-redux';
import { encodeAddr, fetchAAWalletAddress } from '@choko-wallet/app-utils';
import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import { ConnectDappDescriptor, ConnectDappRequest } from '@choko-wallet/request-handler';

// http://localhost:3000/request/connect-dapp?requestType=connectDapp&payload=01789c6360606029492d2e61a00c883b67e467e72b8427e6e4a4962838e61464242a8490626c4b5d75fdc2841bf124d809006db70e53&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Falpha

/**
 * Handler for ConnectDappRequest
 */
function ConnectDappHandler (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);
  const currentUserAccount = useSelector(selectCurrentUserAccount);

  const [password, setPassword] = useState('');

  const [mounted, setMounted] = useState<boolean>(false);

  const [selectedUserAccount, setSelectedUserAccount] = useState<number>(0);
  const [request, setRequest] = useState<ConnectDappRequest>(null);
  const [callback, setCallback] = useState<string>('');

  // 1. get the request params & load user account
  useEffect(() => {
    if (!router.isReady) return;
    const payload = router.query.payload as string;
    const callbackUrl = router.query.callbackUrl as string;
    const u8aRequest = decompressParameters(hexToU8a(payload));
    const request = ConnectDappRequest.deserialize(u8aRequest);

    dispatch(loadUserAccount());
    setRequest(request);
    setCallback(callbackUrl);
  }, [router.isReady, router.query, dispatch, router, userAccount]);

  // 1+. fetch AA wallet address if not set before
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

  /**
   * when currentUserAccount is unlcoked
   * we process the request
  */
  useEffect(() => {
    if (currentUserAccount && !currentUserAccount.isLocked) {
      void (async () => {
        const connectDapp = new ConnectDappDescriptor();
        const response = await connectDapp.requestHandler(request, currentUserAccount);
        const s = response.serialize();

        setPassword('');
        dispatch(setClose('connectDappPasswordModal'));
        dispatch(lockCurrentUserAccount());
        window.location.href = callback + `?response=${u8aToHex(compressParameters(s))}&responseType=connectDapp`;
      })();
    }
  }, [currentUserAccount, dispatch, request, callback]);

  function unlock () {
    if (request) {
      try {
        dispatch(switchUserAccount(selectedUserAccount));
        dispatch(decryptCurrentUserAccount(password));
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
  }

  if (!mounted) {
    return null;
  }

  return (
    <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400 p-5'>
      {/* <Toaster /> */}
      <div className='grid content-center col-span-12 md:col-span-1 md:col-start-4 shadow-xl justify-center rounded-lg bg-pink-500'>
        <h1 className='md:hidden col-span-12 card-title text-white select-none p-10 '>
          {request?.dappOrigin.activeNetwork.text}
        </h1>
        <h1 className='hidden md:block col-span-12 card-title text-white select-none p-10 vertical-text'>
          {request?.dappOrigin.activeNetwork.text}
        </h1>
      </div>
      <div className='grid grid-cols-12 col-span-12 md:col-span-5 gap-y-5'>
        <div className='col-span-12 shadow-xl rounded-lg card p-10 bg-white'>
          <h2 className='card-title'>
            Request to Connect From a Dapp
          </h2>
          <h3>Give the Dapp your public address.</h3>

          <div className='grid grid-cols-12 gap-5 md:m-10 select-none'>
            <br />
            <div className='col-span-12'>
              DApp Origin:
            </div>
            <div className='col-span-12'>
              <code className='underline text-clip'>{request?.dappOrigin.displayName}</code>
            </div>
            <RadioGroup className='col-span-12'
              onChange={setSelectedUserAccount}
              value={selectedUserAccount}>
              {userAccount.map((acct, index) => (
                <RadioGroup.Option
                  className={({ checked }) =>
                    `${checked ? 'bg-gray-500 bg-opacity-75 text-white' : 'bg-white'}
                      m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none col-span-12`
                  }
                  key={index}
                  onClick={() => dispatch(switchUserAccount(index))}
                  value={index}
                >
                  {({ checked }) => (
                    <div className='flex w-full items-center justify-between'>
                      <div className='flex items-center'>
                        <div className='text-sm'>
                          <RadioGroup.Label
                            as='div'
                            className={`font-medium ${checked ? 'text-white' : 'text-gray-900'}`}
                          >
                            <div className='w-1/2 md:w-full'
                              style={{ overflowWrap: 'break-word' }}>{encodeAddr(request.dappOrigin.activeNetwork, acct)}</div>
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
          onClick={() => dispatch(setOpen('connectDappPasswordModal'))}>
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <div className='col-span-4 md:col-span-2'>
        <button className='btn btn-error btn-circle btn-lg'
          onClick={() => router.push('/')} >
          <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>

      <Modal modalName='connectDappPasswordModal' >

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

export default ConnectDappHandler;
