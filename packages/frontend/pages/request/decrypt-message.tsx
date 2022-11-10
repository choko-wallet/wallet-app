// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { hexToU8a, u8aToHex, u8aToString } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import Modal from '@choko-wallet/frontend/components/Modal';
import { selectCurrentUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
import { setClose, setOpen } from '@choko-wallet/frontend/features/slices/status';
import { decryptCurrentUserAccount, loadUserAccount, switchUserAccount } from '@choko-wallet/frontend/features/slices/user';
import { DecryptMessageDescriptor, DecryptMessageRequest } from '@choko-wallet/request-handler/decryptMessage';

function DecryptMessageHandler (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUserAccount = useSelector(selectCurrentUserAccount);
  // const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState('');

  const [mounted, setMounted] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<string>('hex');

  const [request, setRequest] = useState<DecryptMessageRequest>(null);
  const [callback, setCallback] = useState<string>('');

  useEffect(() => {
    if (!router.isReady) return;
    const payload = router.query.payload as string;
    const u8aRequest = decompressParameters(hexToU8a(payload));
    const callbackUrl = router.query.callbackUrl as string;
    const request = DecryptMessageRequest.deserialize(u8aRequest);

    dispatch(loadUserAccount());
    dispatch(switchUserAccount(request.userOrigin.address));
    setCallback(callbackUrl);
    setRequest(request);
  }, [dispatch, router.isReady, router.query]);

  useEffect(() => {
    if (request) setMounted(true);
  }, [request]);

  function unlock () {
    if (request) {
      try {
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

        if (currentUserAccount && !currentUserAccount.isLocked) {
          setPassword('');
          // setOpenPasswordModal(false);
          dispatch(setClose('decryptMessagePasswordModal'));

          void (async () => {
            const decryptMessage = new DecryptMessageDescriptor();

            try {
              const response = await decryptMessage.requestHandler(request, currentUserAccount);
              const s = response.serialize();

              window.location.href = callback + `?response=${u8aToHex(compressParameters(s))}&responseType=decryptMessage`;
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

  // function closeModal () {
  //   setPassword('');
  //   setOpenPasswordModal(false);
  // }

  if (!mounted) {
    return null;
  }

  return (
    <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400 p-5'>
      <Toaster />
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
            Request to Decrypt a Message
          </h2>
          <h3>Decrypt an Encrypted Message.</h3>

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
              Client Ephemeral Key:
            </div>
            <div className='col-span-12'>
              <code className='underline text-clip'
                style={{ overflowWrap: 'break-word' }}>0x{request.payload.receiptPublicKey}</code>
            </div>
            <div className='col-span-12'>
              <div className='divider'></div>
            </div>
            <div className='col-span-12'>
              Message To Decrypt:
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
          onClick={() => dispatch(setOpen('decryptMessagePasswordModal'))}>
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <div className='col-span-4 md:col-span-2'>
        <button className='btn btn-error btn-circle btn-lg'
          onClick={() => router.push('/')} >
          <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>

      <Modal
        modalName='decryptMessagePasswordModal'

      // closeModal={closeModal}
      //   isOpen={openPasswordModal}
      >
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

export default DecryptMessageHandler;
