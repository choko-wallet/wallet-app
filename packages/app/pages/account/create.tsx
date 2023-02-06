// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, DuplicateIcon, RefreshIcon, XIcon } from '@heroicons/react/outline';
import { cryptoWaitReady, mnemonicGenerate } from '@polkadot/util-crypto';
import ProgressBar from '@ramonak/react-progress-bar';
import { useRouter } from 'next/router';
import Loading from 'packages/app/components/Loading';
import React, { useEffect, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
// redux
import { useDispatch } from 'react-redux';

import { addUserAccount } from '@choko-wallet/app-redux';
import { AnimatePresence, motion } from 'framer-motion';

/**
 * Guide user to create an account with seed phrase
 */
function CreateWallet(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const [mounted, setMounted] = useState<boolean>(false);
  const [check1, setCheck1] = useState<boolean>(false);
  const [check2, setCheck2] = useState<boolean>(false);


  const [step, setStep] = useState<number>(1);
  const [seeds, setSeeds] = useState<string>('');
  const [quizMnemonic, setQuizMnemonic] = useState<number>(1);

  const [seedsStringForCopy, setSeedsStringForCopy] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [verifyMnemonic, setVerifyMnemonic] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');

  const [redirectRequest, setRedirectRequest] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const refreshMnemonic = () => {
    const mnemonic = mnemonicGenerate();

    setSeeds(mnemonic);
    setSeedsStringForCopy(mnemonic);
  };

  const handleSetPassword = () => {
    setLoading(true);

    /* eslint-disable */
    // @ts-ignore
    dispatch(addUserAccount({ password: password, seeds: seeds })).then(() => {
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

    (async () => {
      await cryptoWaitReady();
      const mnemonic = mnemonicGenerate();

      setSeeds(mnemonic);
      setSeedsStringForCopy(mnemonic);
      setQuizMnemonic(Math.floor(Math.random() * 12) + 1);
    })().then(() => {
      setMounted(true);
    }).catch((e) => {
      console.error(e);
    });
  }, []);

  if (!mounted) {
    return null;
  }

  if (loading) return <Loading title='Creating Account ... ' />;

  return (
    <main className='bg-[#383A53] min-h-screen px-3 md:px-6' >

      <div className='max-w-2xl min-h-screen mx-auto w-full flex flex-col items-center justify-center overflow-hidden md:overflow-visible'>

        <div className='flex md:hidden items-center justify-center space-x-3  mt-5'>
          <motion.div
            transition={{ layout: { duration: 0.5, type: 'tween' } }}
            layout
            className='h-2 '>

            {step === 1 ?
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className='w-[82px] h-[4px] bg-[#0170BF] rounded-full '></div>
              </motion.div>
              :
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className='w-[23px] h-[4px] bg-[#0170BF] rounded-full'></div>
              </motion.div>
            }
          </ motion.div>

          <motion.div
            transition={{ layout: { duration: 0.5, type: 'tween' } }}
            layout
            className='h-2 '>

            {step === 2 ?
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className='w-[82px] h-[4px] bg-[#0170BF] rounded-full '></div>
              </motion.div>
              : step === 3 ?
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[23px] h-[4px] bg-[#0170BF] rounded-full'></div>
                </motion.div>
                :
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[23px] h-[4px] bg-[#B6B7BC] rounded-full'></div>
                </motion.div>
            }
          </ motion.div>


          <motion.div
            transition={{ layout: { duration: 0.5, type: 'tween' } }}
            layout
            className='h-2 '>

            {step === 3 ?
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className='w-[82px] h-[4px] bg-[#0170BF] rounded-full '></div>
              </motion.div>
              :
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <div className='w-[23px] h-[4px] bg-[#B6B7BC] rounded-full'></div>
              </motion.div>
            }
          </ motion.div>
        </div>

        <div className='hidden md:flex w-full space-x-1'>
          <label
            className="checkContainer2 font-poppins">
            <input type="checkbox" checked={step === 2 || step === 3}
            // onClick={() => setCheck1(!check1)}
            />
            <span className="checkmark2"></span>
          </label>

          <ProgressBar
            baseBgColor='#AFAFAF'
            bgColor='#4075A9'
            className='w-full pt-2 pr-2'
            completed={step === 1
              ? 0
              : step === 2
                ? 100
                : 100}
            height='3px'
            customLabel=" "
          />

          <label
            className="checkContainer2 font-poppins">
            <input type="checkbox" checked={step === 3}
            // onClick={() => setCheck1(!check1)}
            />
            <span className="checkmark2"></span>
          </label>


          <ProgressBar
            baseBgColor='#AFAFAF'
            bgColor='#4075A9'
            className='w-full pt-2 pr-2'
            completed={step === 2
              ? 0
              : step === 3 ? (password && repeatPassword && password === repeatPassword) ? 100 : 0 : 0}
            height='3px'
            customLabel=" "
          />

          <label
            className="checkContainer2 font-poppins">
            <input type="checkbox" checked={step === 3 && (password && repeatPassword && password === repeatPassword)}
            // onClick={() => setCheck1(!check1)}
            />
            <span className="checkmark2"></span>
          </label>

        </div>

        <div className='hidden md:flex w-full max-w-2xl justify-center mt-5 h-5 relative  '>
          <p className={`absolute top-0 -left-12 text-xs md:text-sm font-poppins ${step > 1 ? 'text-[#4075A9]' : 'text-white'}`}>Generate Mnemonic</p>
          <p className={`absolute top-0 text-xs md:text-sm font-poppins pr-2 ${step > 2 ? 'text-[#4075A9]' : 'text-white'}`}>Verify</p>
          <p className={`absolute top-0 -right-6 text-xs md:text-sm font-poppins ${step > 2 && (password && repeatPassword && password === repeatPassword) ? 'text-[#4075A9]' : 'text-white'}`}>Set Password</p>
        </div>

        <AnimatePresence exitBeforeEnter>
          <motion.div
            key={step}
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -30, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='mb-5'
          >
            {step === 1 &&
              <div className='w-full max-w-2xl  ' >
                <div className='mt-8 md:mt-16 bg-white h-[480px] md:h-96 rounded-[10px] flex flex-col justify-center w-full max-w-3xl px-[30px] md:p-12 '>

                  <p className='w-[230px] md:w-full text-black font-semibold text-xl md:text-2xl  font-poppins md:mt-3 mb-6 text-center mx-auto  -mt-7'>
                    Generated 12-word mnemonic seed: </p>

                  <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 '>
                    {seeds.split(' ').map((seed, index) =>
                      <div className='border border-[#94C5E3] w-[120px] h-[33px]  rounded-lg flex items-center justify-center p-1 md:p-3 py-2 mx-1'
                        key={index}>
                        <p className='text-black text-sm font-poppins'>{seed}</p>
                      </div>
                    )}
                  </div>

                  <div className='flex items-center justify-between max-w-[276px] relative mt-3'>
                    <button className='flex items-center w-[120px] h-[33px] ml-1  my-[16px] justify-center group  font-bold  transition duration-150
                bg-[#FDF7DE] rounded-md hover:shadow-sm active:scale-95 '
                      onClick={refreshMnemonic}>
                      <RefreshIcon className='text-[#0170BF] h-5 m-3 duration-300 group-hover:rotate-180 transtion east-out' />
                      <p className='text-[#0170BF] text-sm font-poppins'>REFRESH</p>
                    </button>

                    <CopyToClipboard onCopy={() => setCopied(true)}
                      text={seedsStringForCopy}>
                      <button className='flex items-center justify-center  w-[120px] h-[33px] mr-1  my-[16px]   font-bold  transition duration-150
                bg-[#0170BF] rounded-md hover:shadow-sm active:scale-95 '>
                        <DuplicateIcon className='text-[#F5CBD5] h-5  m-3 duration-300 hover:scale-125 transtion east-out' />
                        <p className='text-[#F5CBD5] text-sm font-poppins'>COPY</p>
                      </button>
                    </CopyToClipboard>

                    {copied ?
                      <p className='text-[#99D8FF] font-poppins h-6 absolute top-[55px] left-[200px]'>COPIED!</p> :
                      <p className='text-[#99D8FF] font-poppins h-6 absolute top-[55px] left-[200px]'></p>
                    }

                  </div>


                </div>

                <div className='flex justify-evenly mt-12 md:mt-20'>
                  <button className='bg-[#F5CBD5] rounded-full p-2'
                    onClick={() => router.push('/')} >
                    <XIcon className='h-6 duration-300 hover:scale-125 transtion east-out' />
                  </button>

                  <button className='bg-[#0170BF] rounded-full p-2'
                    onClick={() => setStep(step + 1)} >
                    <ArrowRightIcon className='h-6 text-white duration-300 hover:scale-125 transtion east-out' />
                  </button>
                </div>

              </div>
            }

            {step === 2 &&

              <div className='w-full max-w-2xl ' >
                <div className='mt-8 md:mt-16 bg-white h-[480px] md:h-96 rounded-[10px] flex flex-col space-y-5  w-full max-w-3xl p-5 md:p-12 relative'>

                  <p className=' text-black font-semibold text-xl md:text-2xl -mt-1 mb-10 font-poppins text-center'>
                    Verify your mnemonic seed:
                  </p>
                  <p className='text-center text-black text-sm md:text-xl md:-mt-5 font-poppins'>
                    Ensure that you keep the secret seed in a safe place.</p>

                  <div className='flex items-center justify-center p-10'>

                    <p className=' text-black font-semibold font-poppins mr-5'>
                      Word #{quizMnemonic}
                    </p>

                    <input className='w-[200px] h-12 ml-3 pl-3 border border-[#94C5E3] rounded-md bg-gray-50 sm:text-sm focus:ring-none outline-none'
                      onChange={(e) => setVerifyMnemonic(e.target.value)}
                      placeholder='verify'
                      type='text'
                      value={verifyMnemonic}
                    />

                  </div>

                  <div className='absolute bottom-6 left-5 md:left-10 text-purple-700 flex flex-col  justify-center items-start'>

                    <label
                      className="checkContainer font-poppins">Keep my seed phrase safe
                      <input type="checkbox" checked={check1}
                        onClick={() => setCheck1(!check1)}
                      />
                      <span className="checkmark"></span>
                    </label>

                    <label
                      className="checkContainer font-poppins ">If I lose my seed, I will lose my fund
                      <input type="checkbox" checked={check2}
                        onClick={() => setCheck2(!check2)}
                      />
                      <span className="checkmark"></span>
                    </label>


                  </div>
                </div>

                {/* 
                <div className='flex justify-evenly mt-12 md:mt-20'>
                  <button className='bg-[#F5CBD5] rounded-full p-2'
                    onClick={() => router.push('/')} >
                    <XIcon className='h-6 duration-300 hover:scale-125 transtion east-out' />
                  </button>

                  <button className='bg-[#0170BF] rounded-full p-2'
                    onClick={() => setStep(step + 1)} >
                    <ArrowRightIcon className='h-6 text-white duration-300 hover:scale-125 transtion east-out' />
                  </button>
                </div> */}


                <div className='flex justify-evenly mt-12 md:mt-20'>
                  <button className='bg-[#F5CBD5] rounded-full p-2 flex items-center justify-center'
                    onClick={() => setStep(1)} >
                    <ArrowLeftIcon className='h-6 duration-300 hover:scale-125 transtion east-out' />
                  </button>

                  <button className={`p-2 bg-[#0170BF] text-white rounded-full flex items-center justify-center ' ${verifyMnemonic.toLowerCase() === seeds.split(' ')[quizMnemonic - 1] && check1 && check2 ? '' : 'bg-[#7AAAC9] text-gray-300 cursor-not-allowed'}`}
                    disabled={verifyMnemonic.toLowerCase() !== seeds.split(' ')[quizMnemonic - 1] || !check1 || !check2}
                    onClick={() => setStep(step + 1)}
                  >
                    <ArrowRightIcon className='h-6 text-white duration-300 hover:scale-125 transtion east-out' />
                  </button>
                </div>

              </div>
            }

            {step === 3 &&
              <div className='w-full max-w-2xl '>

                {/* <div className='mt-8 md:mt-16 bg-white h-[480px] md:h-96 rounded-[10px] flex flex-col space-y-5 justify-center w-full max-w-3xl p-5 md:p-12'> */}
                <div className='mt-8 md:mt-16 bg-white h-[480px] md:h-96 rounded-[10px] flex flex-col space-y-5  w-full max-w-3xl p-5 md:p-12'>

                  <p className=' text-black font-semibold text-xl md:text-2xl -mt-1 mb-10 font-poppins'>
                    {/* <p className=' text-black font-semibold text-xl md:text-2xl -mt-10 mb-20  font-poppins'> */}
                    Set a local password for your wallet:
                  </p>

                  <div className='flex items-center justify-between px-10 '>
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

                  <div className='flex items-center justify-between px-10 pt-6'>
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
                  <button className='bg-[#F5CBD5] rounded-full p-2 flex items-center justify-center'
                    onClick={() => setStep(1)} >
                    <ArrowLeftIcon className='h-6 duration-300 hover:scale-125 transtion east-out' />
                  </button>

                  <button className={`p-2 bg-[#0170BF] text-white rounded-full flex items-center justify-center  
            ${(password && repeatPassword && password === repeatPassword) ? '' : 'bg-[#7AAAC9] text-gray-300 cursor-not-allowed'}`}
                    disabled={(!password || !repeatPassword || password !== repeatPassword)}
                    onClick={() => handleSetPassword()}
                  >

                    <CheckIcon className='h-6 text-white duration-300 hover:scale-125 transtion east-out' />
                  </button>
                </div>
              </div>
            }


          </motion.div>
        </AnimatePresence>


      </div>
    </main>
  );
}

export default CreateWallet;
