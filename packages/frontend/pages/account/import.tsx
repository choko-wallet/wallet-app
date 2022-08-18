// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowSmLeftIcon, ArrowSmRightIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import { mnemonicValidate } from '@polkadot/util-crypto';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function ImportWallet (): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [seeds, setSeeds] = useState<Array<string>>(Array(12).fill(''));
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handlePaste = (e: ClipboardEvent): any => {
    const text = e.clipboardData.getData('text');

    if (text && mnemonicValidate(text)) {
      setSeeds(text.split(' '));
    }
  };

  /* eslint-disable */
  // @ts-ignore
  window.addEventListener('paste', handlePaste);
  /* eslint-enable */

  return (
    <main className='grid grid-cols-12 gap-4 h-screen content-center bg-gray-400'>

      <ul className='steps col-span-6 col-start-4'>
        <li className={`step ${step > 0 ? 'step-neutral' : ''}`}>
          Type In Your Mnemonic
        </li>
        <li className={`step ${step > 1 ? 'step-neutral' : ''}`}>
          Set a Password
        </li>
      </ul>

      {/* TODO: these are used to create more space between the steps and main content.
      We should have a better way to deal with it  */}
      <div className='col-span-12'></div>
      <div className='col-span-12'></div>
      <div className='col-span-12'></div>
      <div className='col-span-12'></div>
      <div className='col-span-12'></div>
      <div className='col-span-12'></div>

      {step === 1 &&

      <div className='grid grid-cols-12 col-span-4 col-start-5 gap-y-5'>
        <div className=' col-span-12 shadow-xl rounded-lg'>
          <div className='card p-10 '
            style={{ background: 'white' }}>
            <h2 className='card-title'>
              Import Mnemonic
            </h2>
            <h3>Import a 12 words mnemonic.</h3>

            <div className='grid grid-cols-8 gap-5 m-10 select-none'>
              {seeds.map((i, index) =>
                <div className='col-span-2 p-2 text-center rounded-lg'
                  key={index}>
                  <input className='input input-bordered w-full max-w-xs'
                    onChange={(e) => setSeeds(
                      seeds.map((seed, i) => i === index ? e.target.value : seed)
                    )}
                    placeholder={`Word #${index + 1}`}
                    type='text'
                    value={seeds[index]}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className='col-span-12'></div>

        <div className='col-span-3 col-start-5'>
          <button className='btn btn-error btn-circle btn-lg'
            onClick={() => router.push('/')} >
            <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
          </button>
        </div>
        <div className='col-span-3'>
          <button className={`btn btn-accent btn-circle btn-lg ${(mnemonicValidate(seeds.join(' '))) ? '' : 'btn-disabled'}`}
            onClick={() => {
              setStep(2);
            }} >
            <ArrowSmRightIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
          </button>
        </div>

      </div>
      }

      {step === 2 &&
        <div className='grid grid-cols-12 col-span-4 col-start-5 gap-y-5'>
          <div className='col-span-12 shadow-xl rounded-lg'>
            <div className='card p-10 '
              style={{ background: 'white' }}>
              <h2 className='card-title'>
                Set a Password
              </h2>
              <h3>Set a local password for you walelt. </h3>

              <div className='grid grid-cols-8 gap-5 m-4 mt-8'>
                {/* TODO: Should not use this pt-2, but some vertical-align instead */}
                <h2 className='col-span-2 align-center pt-2'>
                  <span className=''>Set a good password</span>
                </h2>
                <div className='col-span-4'>
                  <input className='input input-bordered w-full max-w-xs'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Set a Password'

                    type='password'
                    value={password}
                  />
                </div>
              </div>
              <div className='grid grid-cols-8 gap-5 m-4'>
                {/* TODO: Should not use this pt-2, but some vertical-align instead */}
                <h2 className='col-span-2 align-center pt-2'>
                  <span className=''>Repeat Password</span>
                </h2>
                <div className='col-span-4'>
                  <input className='input input-bordered w-full max-w-xs'
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    placeholder='Repeat the Password'
                    type='password'
                    value={repeatPassword}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-span-12'></div>

          <div className='col-span-3 col-start-5'>
            <button className='btn btn-error btn-circle btn-lg'
              onClick={() => setStep(1)} >
              <ArrowSmLeftIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
          <div className='col-span-3 '>
            <button className={`btn btn-accent btn-circle btn-lg ${(password && repeatPassword && password === repeatPassword) ? '' : 'btn-disabled'}`}
              onClick={async () => {
                alert('DONE. Need to plugin redux logic here');
                await router.push('/');
              }} >
              <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
      }
    </main>
  );
}

export default ImportWallet;
