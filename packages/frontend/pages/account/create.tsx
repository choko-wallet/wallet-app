// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowSmLeftIcon, ArrowRightIcon, CheckIcon, DuplicateIcon, RefreshIcon, XIcon, ArrowLeftIcon } from '@heroicons/react/outline';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
// redux
import { useDispatch } from 'react-redux';

import { addUserAccount } from '../../features/slices/user';

interface Props {
  mnemonic: string,
  quizMnemonic: number,
}

function CreateWallet({ mnemonic, quizMnemonic }: Props): JSX.Element {
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
    <main className='bg-[#383A53] min-h-screen flex flex-col space-y-10 items-center justify-center p-3 md:p-6' >

      <div className='w-full max-w-3xl  h-5 mb-5 absolute top-10 md:top-16 p-3'>
        <div className='w-full max-w-3xl bg-[#AFAFAF] h-5 relative'>
          {step === 2 ?
            <div className='h-full bg-[#4075A9] absolute left-0 top-0 w-1/2'></div>
            :
            null
          }
          {step === 3 ?
            <div className='h-full bg-[#4075A9] absolute left-0 top-0 w-full'></div>
            :
            null
          }
        </div>

        <div className='w-full max-w-3xl justify-between flex'>
          <p className='text-white'>Generate Mnemonic</p>
          <p className='text-white pr-10'>Verify</p>
          <p className='text-white font-poppins'>Set Password</p>
        </div>
      </div>

      {step === 1 &&
        <div>
          <div className='mt-16 bg-white rounded-md md:rounded-lg flex flex-col space-y-5 justify-center w-full max-w-3xl p-5 md:p-12'>

            <p className=' text-black font-semibold text-xl md:text-2xl md:-mt-5 font-poppins'>
              Generated 12-word mnemonic seed: </p>

            <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 '>
              {seeds.split(' ').map((seed, index) =>
                <div className='border border-[#94C5E3]  rounded-lg flex items-center justify-center p-1 md:p-3 py-2'
                  key={index}>
                  <p className='text-black text-sm font-poppins'>{seed}</p>
                </div>
              )}
            </div>

            <div className='flex space-x-5 items-center'>
              <button className='flex items-center justify-center group w-32 md:w-40 h-10 md:h-12 font-bold text-[#F5CBD5] transition duration-150 
                bg-[#FDF7DE] rounded-md hover:shadow-sm active:scale-95 '
                onClick={refreshMnemonic}>
                <RefreshIcon className='text-black h-5 m-3 duration-300 group-hover:rotate-180 transtion east-out' />
                <span className='text-black text-sm font-poppins'>Refresh</span>
              </button>

              <CopyToClipboard onCopy={() => setCopied(true)}
                text={seedsStringForCopy}>
                <button className='flex items-center justify-center w-32 md:w-40 h-10 md:h-12 font-bold text-[#F5CBD5] transition duration-150 
                bg-[#0170BF] rounded-md hover:shadow-sm active:scale-95 '>
                  <DuplicateIcon className='text-black h-5  m-3 duration-300 hover:scale-125 transtion east-out' />
                  <span className='text-black text-sm font-poppins'>Copy</span>
                </button>
              </CopyToClipboard>

              {copied &&
                <p className='text-[#99D8FF] font-poppins'>COPIED!</p>
              }

            </div>
          </div>


          <div className='flex justify-evenly mt-5 md:mt-8'>
            <button className='bg-[#F5CBD5] rounded-full p-3'
              onClick={() => router.push('/')} >
              <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>

            <button className='bg-[#0170BF] rounded-full p-3'
              onClick={() => setStep(step + 1)} >
              <ArrowRightIcon className='h-8 text-white duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>


        </div>
      }

      {step === 2 &&

        <div className=''>
          <div className='mt-16 bg-white rounded-md md:rounded-lg flex flex-col space-y-5 justify-center w-full max-w-3xl p-5 md:p-12'>

            <p className=' text-black font-semibold text-xl md:text-2xl md:-mt-5 font-poppins'>
              Verify your mnemonic seed:
            </p>
            <p className=' text-black font-semibold text-sm md:text-xl md:-mt-5 font-poppins'>
              Ensure that you keep the secret seed in a safe place.</p>

            <div className='flex items-center justify-center p-10'>

              <p className=' text-black font-semibold text-xl md:text-2xl font-poppins'>
                Word #{quizMnemonic}
              </p>

              <input className="w-[200px] h-12 ml-3 pl-3 border border-[#94C5E3] rounded-md bg-gray-50 sm:text-sm focus:ring-none outline-none"
                onChange={(e) => setVerifyMnemonic(e.target.value)}
                placeholder='Verify'
                type='text'
                value={verifyMnemonic}
              />

            </div>


          </div>


          <div className='flex justify-evenly mt-5 md:mt-8'>
            <button className='bg-[#F5CBD5] rounded-full h-[55px] w-[55px] flex items-center justify-center'
              onClick={() => setStep(1)} >
              <ArrowLeftIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>

            <button className={`h-[55px] w-[55px] bg-[#0170BF] text-white rounded-full flex items-center justify-center ' ${verifyMnemonic.toLowerCase() === seeds.split(' ')[quizMnemonic - 1] ? '' : 'bg-[#7AAAC9] text-gray-300 cursor-not-allowed'}`}
              onClick={() => setStep(step + 1)}
              disabled={verifyMnemonic.toLowerCase() !== seeds.split(' ')[quizMnemonic - 1]}
            >
              <ArrowRightIcon className='h-8 text-white duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>


        </div>
      }

      {step === 3 &&
        <div >

          <div className='mt-16 bg-white rounded-md md:rounded-lg flex flex-col space-y-5 justify-center w-full max-w-3xl p-5 md:p-12'>
            <p className=' text-black font-semibold text-xl md:text-2xl md:-mt-5 font-poppins'>
              Set a local password for your wallet:
            </p>

            <div className='flex items-center justify-between px-10 py-5'>
              <p className=' text-black text-xl font-poppins'>
                Set Password
              </p>
              <input className="w-[150px] md:w-[200px] h-12 ml-3 pl-3 border border-[#94C5E3] rounded-md bg-gray-50 sm:text-sm focus:ring-none outline-none"
                onChange={(e) => setPassword(e.target.value)}
                // placeholder='Set a Password'
                type='password'
                value={password}
              />
            </div>


            <div className='flex items-center justify-between px-10'>
              <p className=' text-black text-xl font-poppins'>
                Repeat Password
              </p>
              <div className=''>
                <input className="w-[150px] md:w-[200px] h-12 ml-3 pl-3 border border-[#94C5E3] rounded-md bg-gray-50 sm:text-sm focus:ring-none outline-none"
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  // placeholder='Repeat the Password'
                  type='password'
                  value={repeatPassword}
                />
              </div>
            </div>



          </div>



          <div className='flex justify-evenly mt-5 md:mt-8'>
            <button className='bg-[#F5CBD5] rounded-full h-[55px] w-[55px] flex items-center justify-center'
              onClick={() => setStep(1)} >
              <ArrowLeftIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>

            <button className={`h-[55px] w-[55px] bg-[#0170BF] text-white rounded-full flex items-center justify-center  
            ${(password && repeatPassword && password === repeatPassword) ? '' : 'bg-[#7AAAC9] text-gray-300 cursor-not-allowed'}`}
              onClick={() => handleSetPassword()}
              disabled={(!password || !repeatPassword || password !== repeatPassword)}
            >

              <CheckIcon className='h-8 text-white duration-300 hover:scale-125 transtion east-out' />
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
