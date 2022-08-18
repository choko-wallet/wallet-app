// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

// redux
import { useSelector, useDispatch } from 'react-redux';
import { selectUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
import { unlockUserAccount } from '@choko-wallet/frontend/features/slices/userSlice';

// sign message
import { knownNetworks } from '@choko-wallet/known-networks';
import { DappDescriptor } from '@choko-wallet/core/dapp';
import { SignMessageDescriptor, SignMessageRequest, SignMessageRequestPayload } from '@choko-wallet/request-handler/signMessage';

function SignMsgRequest(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const userAccount = useSelector(selectUserAccount);

  const [mounted, setMounted] = useState<boolean>(false);
  const [displayType, setDisplayType] = useState<string>('hex');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSignMessage = () => {
    dispatch(unlockUserAccount('asdf'));
  }

  useEffect(() => {
    if (userAccount) {
      (async () => {
        const msg = new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        const request = new SignMessageRequest({
          dappOrigin: new DappDescriptor({
            activeNetwork: knownNetworks['847e7b7fa160d85f'], // skyekiwi
            displayName: 'Testing sign messsage',
            infoName: 'test',
            version: 0
          }),
          payload: new SignMessageRequestPayload({
            message: msg
          }),
          userOrigin: userAccount
        });
        const signMessasge = new SignMessageDescriptor();
        const response = await signMessasge.requestHandler(request, userAccount);
        console.log("response: ", response);
      })();
    }
  }, [userAccount])

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
        <button className='btn btn-success btn-circle btn-lg' onClick={() => handleSignMessage()}>
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <div className='col-span-1 m-5'>
        <button className='btn btn-error btn-circle btn-lg'
          onClick={() => router.push('/')} >
          <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>

    </main>
  );
}

export default SignMsgRequest;
