// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowSmLeftIcon, ArrowSmRightIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import { mnemonicValidate } from '@polkadot/util-crypto';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// redux
import { useDispatch } from 'react-redux';

import { addUserAccount } from '../../features/slices/userSlice';

function ImportWallet (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [seeds, setSeeds] = useState<Array<string>>(Array(12).fill(''));
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [redirectRequest, setRedirectRequest] = useState<string>('');

  const handleSetPassword = () => {
    dispatch(addUserAccount({ password: password, seeds: seeds.join(' ') }));

    if (redirectRequest) {
      void router.push('/request?' + redirectRequest);
    }

    void router.push('/home');
  };

  useEffect(() => {
    const redirectParams = localStorage.getItem('requestParams');

    localStorage.removeItem('requestParams');

    if (redirectParams) {
      setRedirectRequest(redirectParams);
    }

    setMounted(true);
  }, [router]);

  if (!mounted) {
    return null;
  }

  const handleMnemonicInput = (text: string, index: number): void => {
    if (mnemonicValidate(text)) {
      setSeeds(text.split(' '));
    } else {
      setSeeds(seeds.map((seed, i) => i === index ? text : seed));
    }
  };

  return (
    <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400 p-5' >

      <div className='md:hidden col-span-12'></div>
      <div className='md:hidden col-span-12'></div>
      <ul className='steps steps-horizontal col-span-10 col-start-2 md:col-span-6 md:col-start-4'>
        <li className={`text-black step ${step > 0 ? 'step-neutral' : ''}`}>
          <p className='text-black'>Type In Your Mnemonic</p>
        </li>
        <li className={`text-black step ${step > 1 ? 'step-neutral' : ''}`}>
          <p className='text-black'>Set a Password</p>
        </li>
      </ul>

      {/* TODO: these are used to create more space between the steps and main content.
    We should have a better way to deal with it  */}
      <div className='hidden md:block col-span-12'></div>
      <div className='hidden md:block col-span-12'></div>
      <div className='hidden md:block col-span-12'></div>

      {step === 1 &&

        <div className='grid grid-cols-12 col-span-12 md:col-span-4 md:col-start-5'>
          <div className='col-span-12 shadow-xl rounded-lg'>
            <div className='card p-5 md:p-6 bg-white'>
              <h2 className='card-title'>
                Import Mnemonic
              </h2>
              <h3>Import a 12 words mnemonic.</h3>

              <div className='grid grid-cols-12 gap-5 m-6 select-none'>
                {seeds.map((_, index) => {
                  // console.error(seeds)
                  return <div className='col-span-6 md:col-span-3 p-2 text-center rounded-lg border border-netrual-200'
                    key={index}>
                    <input className='input input-bordered w-full max-w-xs'
                      onChange={(e) => handleMnemonicInput(e.target.value, index)}
                      placeholder={`Word #${index + 1}`}
                      type='text'
                      value={
                        seeds[index].split(' ').length !== 1 ? seeds[index].split(' ')[index] : seeds[index]
                      }
                    />
                  </div>;
                }
                )}
              </div>
            </div>
          </div>

          <div className='col-span-12 my-4'></div>

          <div className='col-span-4 col-start-4'>
            <button className='btn btn-error btn-circle btn-lg'
              onClick={() => router.push('/')} >
              <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
          <div className='col-span-4'>
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
        <div className='grid grid-cols-12 col-span-12 md:col-span-4 md:col-start-5'>
          <div className=' col-span-12 shadow-xl rounded-lg'>
            <div className='card p-5 md:p-6 bg-white'>
              <h2 className='card-title'>
                Set a Password
              </h2>
              <h3>Set a local password for you wallet. </h3>

              <div className='grid grid-cols-12 gap-5 m-6'>
                {/* TODO: Should not use this pt-2, but some vertical-align instead */}
                <h2 className='col-span-5 pt-2'>
                  <span className=''>Set a good password</span>
                </h2>
                <div className='col-span-7'>
                  <input className='input input-bordered w-full max-w-xs'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Set a Password'

                    type='password'
                    value={password}
                  />
                </div>
              </div>
              <div className='grid grid-cols-12 gap-5 m-6'>
                {/* TODO: Should not use this pt-2, but some vertical-align instead */}
                <h2 className='col-span-5 pt-2'>
                  <span className=''>Repeat Password</span>
                </h2>
                <div className='col-span-7'>
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
          <div className='col-span-12 my-4'></div>

          <div className='col-span-4 col-start-4'>
            <button className='btn btn-error btn-circle btn-lg'
              onClick={() => setStep(1)} >
              <ArrowSmLeftIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
          <div className='col-span-4 '>
            <button className={`btn btn-accent btn-circle btn-lg ${(password && repeatPassword && password === repeatPassword) ? '' : 'btn-disabled'}`}
              onClick={() => handleSetPassword()}>
              <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
      }
    </main>
  );
}

export default ImportWallet;
