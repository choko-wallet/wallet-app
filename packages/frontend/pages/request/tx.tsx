// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function TxRequest (): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  // const { theme } = useTheme();

  const [displayType, setDisplayType] = useState<string>('decoded');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className='grid grid-cols-12 gap-4 h-screen content-center bg-gray-400'>

      <div className='grid grid-cols-12 content-center col-span-1 col-start-4 shadow-xl rounded-lg bg-red-400'>
        <h1 className='col-span-12 card-title text-white vertical-text select-none'>
          Polkadot Network
        </h1>
      </div>
      <div className='grid grid-cols-12 col-span-4 gap-y-5'>
        <div className='col-span-12 shadow-xl rounded-lg'>
          <div className='card p-10 '
            style={{ background: 'white' }}>
            <h2 className='card-title'>
              Request to Sign a Transction
            </h2>
            <h3>Submit a transaction to the selected network.</h3>

            <div className='grid grid-cols-12 gap-5 m-10 select-none'>
              <div className='col-span-12'>
                DApp Origin: <code className='m-2 p-2 border'> XXX Finance</code>
              </div> <br/>
              <div className='col-span-12'>
                Your Orign: <code className='m-2 p-2 border'>5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC</code>
              </div>
              <div className='col-span-12'>
                <div className='divider'></div>
              </div>
              <div className='col-span-12'>
                Transaction To Sign:
              </div>

              <div className='col-span-12'>
                <div className='tabs'>
                  <a className={`tab tab-bordered ${displayType === 'decoded' ? 'tab-active' : ''}`}
                    onClick={() => setDisplayType('decoded')}>Decoded</a>
                  <a className={`tab tab-bordered ${displayType === 'hex' ? 'tab-active' : ''}`}
                    onClick={() => setDisplayType('hex')}>Hex</a>
                </div>
              </div>

              <div className='col-span-12'>
                {
                  displayType === 'hex'
                    ? (
                      <div className='h-20 bg-gray-400 p-4 shadow-xl rounded-lg'>
                        <code className='text-white'>0x12334434</code>
                      </div>
                    )
                    : (
                      <div className='h-20 p-4'>
                      Method: <code className='m-1 p-1 border'>balance.transfer</code><br/><br/>
                      Parameter: <code className='m-1 p-1 border'>(5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC, 10)</code>
                      </div>
                    )
                }
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className='col-span-1 col-start-6 m-5'>
        <button className='btn btn-success btn-circle btn-lg' >
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

export default TxRequest;
