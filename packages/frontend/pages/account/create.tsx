// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowSmLeftIcon, ArrowSmRightIcon, CheckIcon, DuplicateIcon, RefreshIcon, XIcon } from '@heroicons/react/outline';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';

interface Props {
  mnemonic: string,
  quizMnemonic: number,
}

function CreateWallet ({ mnemonic, quizMnemonic }: Props): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  // const { theme } = useTheme();

  const [step, setStep] = useState<number>(1);

  const [seeds, setSeeds] = useState<string>(mnemonic);

  const [seedsStringForCopy, setSeedsStringForCopy] = useState<string>(mnemonic);
  const [copied, setCopied] = useState<boolean>(false);

  const [verifyMnemonic, setVerifyMnemonic] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const refreshMnemonic = () => {
    const mnemonic = mnemonicGenerate();

    setSeeds(mnemonic);
    setSeedsStringForCopy(mnemonic);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <main className='grid grid-cols-12 gap-4 h-screen content-center bg-gray-400' >

      <ul className='steps col-span-6 col-start-4'>
        <li className={`step ${step > 0 ? 'step-neutral' : ''}`}>
          Generate Mnemonic
        </li>
        <li className={`step ${step > 1 ? 'step-neutral' : ''}`}>
          Verify
        </li>
        <li className={`step ${step > 2 ? 'step-neutral' : ''}`}>
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
                Create Mnemonic
              </h2>
              <h3>Generate a 12 words mnemonic.</h3>

              <div className='grid grid-cols-8 gap-5 m-10 select-none'>
                {seeds.split(' ').map((seed, index) =>
                  <div className='col-span-2 p-2 text-center rounded-lg border border-netrual-200'
                    key={index}>
                    <p>{seed}</p>
                  </div>
                )}

                <button className='btn col-span-3'
                  onClick={refreshMnemonic}>

                  {/* // TODO: I broke cursor-pointer-group-active. changed to Hover for now */}
                  <RefreshIcon className='h-5 duration-300 hover:rotate-180 transtion east-out' />
                  <span className='ml-3'>Generate New</span>
                </button>
                <CopyToClipboard onCopy={() => setCopied(true)}
                  text={seedsStringForCopy}>
                  <button className='btn btn-accent col-span-2'>
                    <DuplicateIcon className='h-5 duration-300 hover:scale-125 transtion east-out' />
                    <span className='ml-3'>Copy</span>
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

          <div className='col-span-12'></div>

          <div className='col-span-3 col-start-5'>
            <button className='btn btn-error btn-circle btn-lg'
              onClick={() => router.push('/')} >
              <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>

          <div className='col-span-3'>
            <button className='btn btn-accent btn-circle btn-lg'
              onClick={() => setStep(step + 1)} >
              <ArrowSmRightIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
      }

      {step === 2 &&

        <div className='grid grid-cols-12 col-span-4 col-start-5 gap-y-5'>
          <div className=' col-span-12 shadow-xl rounded-lg'>
            <div className='card p-10 '
              style={{ background: 'white' }}>
              <h2 className='card-title'>
                Verify
              </h2>
              <h3>Verify if you have securely remember these mneomic.</h3>

              <div className='grid grid-cols-8 gap-5 m-10 select-none align-middle'>
                {/* TODO: Should not use this pt-2, but some vertical-align instead */}
                <h2 className='col-span-2 align-center pt-2'>
                  <span className=''>What is Word #{quizMnemonic}</span>
                </h2>
                <div className='col-span-4'>
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

          <div className='col-span-12'></div>

          <div className='col-span-3 col-start-5'>
            <button className='btn btn-error btn-circle btn-lg'
              onClick={() => setStep(1)} >
              <ArrowSmLeftIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
          <div className='col-span-3 '>
            <button className={`btn btn-accent btn-circle btn-lg ${verifyMnemonic === seeds.split(' ')[quizMnemonic - 1] ? '' : 'btn-disabled'}`}
              onClick={() => setStep(step + 1)} >
              <ArrowSmRightIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
      }

      {step === 3 &&
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

export default CreateWallet;

export const getServerSideProps: GetServerSideProps = async () => {
  await cryptoWaitReady();
  const mnemonic = mnemonicGenerate();
  const quizMnemonic = Math.floor(Math.random() * 12);

  return {
    props: {
      mnemonic,
      quizMnemonic
    }
  };
};
