// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import { mnemonicValidate } from '@polkadot/util-crypto';
import ProgressBar from '@ramonak/react-progress-bar';
import { useRouter } from 'next/router';
import Loading from 'packages/app/components/Loading';
import React, { useEffect, useState } from 'react';
// redux
import { useDispatch } from 'react-redux';

import { addUserAccount } from '@choko-wallet/app-redux';

/**
 * Guide user to import an account
 * Paste a seed into any space will automatically try to render the whole seed phrase
 */
function ImportWallet (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const [mounted, setMounted] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [seeds, setSeeds] = useState<Array<string>>(Array(12).fill(''));
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [redirectRequest, setRedirectRequest] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleSetPassword = () => {
    setLoading(true);
    /* eslint-disable */
    // @ts-ignore
    dispatch(addUserAccount({ password: password, seeds: seeds.join(' ') })).then(() => {
      if (redirectRequest) {
        void router.push('/request?' + redirectRequest);
      } else {
        void router.push('/home');
      }
    })
    /* eslint-enable */
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

  if (loading) return <Loading title='Creating Account ... ' />;

  return (
    <main className='bg-[#383A53] min-h-screen px-3 md:px-6' >

      <div className='max-w-2xl min-h-screen mx-auto w-full flex flex-col items-center justify-center '>
        <ProgressBar
          baseBgColor='#AFAFAF'
          bgColor='#4075A9'
          className='w-full '
          completed={step === 1
            ? 0
            : step === 2 ? (password && repeatPassword && password === repeatPassword) ? 100 : 50 : 50}
          height='13px'
        />

        <div className='w-full max-w-2xl justify-between mt-2 flex md:mb-10'>
          <p className={` text-xs md:text-sm font-poppins ${step > 1 ? 'text-[#4075A9]' : 'text-white'}`}>Type In Your Mnemonic</p>
          <p className={` text-xs md:text-sm font-poppins ${step > 1 && (password && repeatPassword && password === repeatPassword) ? 'text-[#4075A9]' : 'text-white'}`}>Set Password</p>
        </div>

        {step === 1 &&

          <div className='w-full max-w-2xl  ' >
            <div className='mt-8 md:mt-16 bg-white h-[500px] md:h-96 rounded-[10px] flex flex-col space-y-5 justify-center w-full max-w-3xl p-5 md:p-12'>

              <p className=' text-black font-semibold text-xl md:text-2xl font-poppins  mb-6'>
                Import a 12 words mnemonic. </p>

              <div className='grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 '>
                {seeds.map((_, index) =>
                  <div className='border border-[#94C5E3] rounded-lg flex items-center justify-center p-3 py-2'
                    key={index}>
                    {/* <p className='text-black text-sm font-poppins'>{seed}</p> */}
                    <input className='w-full outline-none text-black bg-transparent font-poppins'
                      onChange={(e) => handleMnemonicInput(e.target.value, index)}
                      placeholder={`Word #${index + 1}`}
                      type='text'
                      value={
                        seeds[index].split(' ').length !== 1 ? seeds[index].split(' ')[index] : seeds[index]
                      }
                    />
                  </div>
                )}
              </div>

            </div>

            <div className='flex justify-evenly mt-12 md:mt-20'>

              <button className='bg-[#F5CBD5] rounded-full p-3'
                onClick={() => router.push('/')} >
                <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
              </button>

              <button className={`h-[55px] w-[55px] bg-[#0170BF] text-white rounded-full flex items-center justify-center ' ${(mnemonicValidate(seeds.join(' '))) ? '' : 'bg-[#7AAAC9] text-gray-300 cursor-not-allowed'}`}
                disabled={!(mnemonicValidate(seeds.join(' ')))}
                onClick={() => setStep(step + 1)}
              >
                <ArrowRightIcon className='h-8 text-white duration-300 hover:scale-125 transtion east-out' />
              </button>

            </div>

          </div>
        }

        {step === 2 &&
          <div className='w-full max-w-2xl '>

            <div className='mt-8 md:mt-16 bg-white h-[500px] md:h-96 rounded-[10px] flex flex-col space-y-5 justify-center w-full max-w-3xl p-5 md:p-12'>
              <p className=' text-black font-semibold text-xl md:text-2xl md:-mt-5 font-poppins'>
                Set a local password for your wallet:
              </p>

              <div className='flex items-center justify-between px-10 py-5'>
                <p className=' text-black text-xl font-poppins'>
                  Set Password
                </p>
                <input className='w-[150px] md:w-[200px] h-12 ml-3 pl-3 border border-[#94C5E3] rounded-md bg-gray-50 sm:text-sm focus:ring-none outline-none'
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
                  <input className='w-[150px] md:w-[200px] h-12 ml-3 pl-3 border border-[#94C5E3] rounded-md bg-gray-50 sm:text-sm focus:ring-none outline-none'
                    onChange={(e) => setRepeatPassword(e.target.value)}
                    // placeholder='Repeat the Password'
                    type='password'
                    value={repeatPassword}
                  />
                </div>
              </div>

            </div>

            <div className='flex justify-evenly mt-12 md:mt-20'>
              <button className='bg-[#F5CBD5] rounded-full h-[55px] w-[55px] flex items-center justify-center'
                onClick={() => setStep(1)} >
                <ArrowLeftIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
              </button>

              <button className={`h-[55px] w-[55px] bg-[#0170BF] text-white rounded-full flex items-center justify-center  
            ${(password && repeatPassword && password === repeatPassword) ? '' : 'bg-[#7AAAC9] text-gray-300 cursor-not-allowed'}`}
              disabled={(!password || !repeatPassword || password !== repeatPassword)}
              onClick={() => handleSetPassword()}
              >

                <CheckIcon className='h-8 text-white duration-300 hover:scale-125 transtion east-out' />
              </button>
            </div>

          </div>
        }

      </div>
    </main>
  );
}

export default ImportWallet;
