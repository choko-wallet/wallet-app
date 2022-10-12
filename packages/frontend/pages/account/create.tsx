// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowSmLeftIcon, ArrowSmRightIcon, CheckIcon, DuplicateIcon, RefreshIcon, XIcon } from '@heroicons/react/outline';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
// redux
import { useDispatch } from 'react-redux';

import { addUserAccount } from '../../features/slices/userSlice';

interface Props {
  mnemonic: string,
  quizMnemonic: number,
}

function CreateWallet ({ mnemonic, quizMnemonic }: Props): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [seeds, setSeeds] = useState<string>(mnemonic);
  const [seedsStringForCopy, setSeedsStringForCopy] = useState<string>(mnemonic);
  const [copied, setCopied] = useState<boolean>(false);
  const [verifyMnemonic, setVerifyMnemonic] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [redirectRequest, setRedirectRequest] = useState<string>('');

  const refreshMnemonic = () => {
    const mnemonic = mnemonicGenerate();

    setSeeds(mnemonic);
    setSeedsStringForCopy(mnemonic);
  };

  const handleSetPassword = () => {
    console.log('first');
    console.log(localStorage.getItem('serialziedUserAccount'));// null

    dispatch(addUserAccount({ password: password, seeds: seeds }));

    if (redirectRequest) {
      void router.push('/request?' + redirectRequest);
    } else {
      void router.push('/home');
    }
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

  return (
    <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400 p-5' >

      <div className='md:hidden col-span-12'></div>
      <div className='md:hidden col-span-12'></div>

      <ul className='steps steps-horizontal col-span-10 col-start-2 md:col-span-6 md:col-start-4'>
        <li className={`text-black step ${step > 0 ? 'step-neutral  ' : ' '}`}>
          <p className='text-black'>Generate Mnemonic</p>
        </li>
        <li className={`step ${step > 1 ? 'step-neutral' : ''}`}>
          <p className='text-black'>Verify</p>
        </li>
        <li className={`step ${step > 2 ? 'step-neutral' : ''}`}>
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
              <h2 className='card-title text-black'>
                Create Mnemonic
              </h2>
              <h3 className=' text-black'>Generate a 12 words mnemonic.</h3>
              <div className='grid grid-cols-12 gap-5 m-6 select-none'>
                {seeds.split(' ').map((seed, index) =>
                  <div className='col-span-6 md:col-span-3 p-2 text-center rounded-lg border border-netrual-200'
                    key={index}>
                    <p className=' text-black'>{seed}</p>
                  </div>
                )}

                <button className='btn col-span-6 md:col-span-5'
                  onClick={refreshMnemonic}>

                  <RefreshIcon className='h-5 duration-300 hover:rotate-180 transtion east-out' />
                  <span className='md:ml-3'>Refresh</span>
                </button>

                <CopyToClipboard onCopy={() => setCopied(true)}
                  text={seedsStringForCopy}>
                  <button className='btn btn-accent col-span-6 md:col-span-4'>
                    <DuplicateIcon className='h-5 duration-300 hover:scale-125 transtion east-out' />
                    <span className='md:ml-3'>Copy</span>
                  </button>
                </CopyToClipboard>

                {
                  copied && <button
                    className='btn btn-outline btn-success col-span-2 border-none'>
                    Copied!</button>
                }
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
            <button className='btn btn-accent btn-circle btn-lg'
              onClick={() => setStep(step + 1)} >
              <ArrowSmRightIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
      }

      {step === 2 &&

        <div className='grid grid-cols-12 col-span-12 md:col-span-4 md:col-start-5'>
          <div className=' col-span-12 shadow-xl rounded-lg'>
            <div className='card p-5 md:p-6 bg-white'>
              <h2 className='card-title text-black'>
                Verify
              </h2>
              <h3 className='card-title text-black'>Verify if you have securely remember these mneomic.</h3>

              <div className='grid grid-cols-12 gap-5 m-6'>

                <h2 className='col-span-6 pt-2'>
                  <span className='text-black'>What is Word #{quizMnemonic}</span>
                </h2>
                <div className='col-span-6'>
                  <input className='input input-bordered w-full max-w-xs'
                    onChange={(e) => setVerifyMnemonic(e.target.value)}

                    placeholder='Verify'
                    type='text'

                    value={verifyMnemonic}
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

          <div className='col-span-4'>
            <button className={`btn btn-accent btn-circle btn-lg ${verifyMnemonic.toLowerCase() === seeds.split(' ')[quizMnemonic - 1] ? '' : 'btn-disabled'}`}
              onClick={() => setStep(step + 1)} >
              <ArrowSmRightIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
      }

      {step === 3 &&
        <div className='grid grid-cols-12 col-span-12 md:col-span-4 md:col-start-5'>
          <div className=' col-span-12 shadow-xl rounded-lg'>
            <div className='card p-5 md:p-6 bg-white'>
              <h2 className='card-title text-black'>
                Set a Password
              </h2>
              <h3 className=' text-black'>Set a local password for you wallet. </h3>

              <div className='grid grid-cols-12 gap-5 m-6'>

                <h2 className='col-span-5 pt-2'>
                  <span className='text-black'>Set a good password</span>
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

                <h2 className='col-span-5 pt-2'>
                  <span className='text-black'>Repeat Password</span>
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

export default CreateWallet;

export const getServerSideProps: GetServerSideProps = async () => {
  await cryptoWaitReady();
  const mnemonic = mnemonicGenerate();
  const quizMnemonic = Math.floor(Math.random() * 12) + 1;

  return {
    props: {
      mnemonic,
      quizMnemonic
    }
  };
};
