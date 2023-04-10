// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CheckCircleIcon, CheckIcon, XIcon } from '@heroicons/react/outline';
import { AnimatePresence, motion } from 'framer-motion';
import { signIn, signOut, useSession } from 'next-auth/react';
import React, { useState } from 'react';

import { setClose, useAppThunkDispatch } from '@choko-wallet/app-redux';

import discordSvg from '../../images/discord.svg';
import facebookSvg from '../../images/facebook.svg';
import githubSvg from '../../images/github.svg';
import googleSvg from '../../images/google.svg';
import redditSvg from '../../images/reddit.svg';
import Modal from '../Modal';

const LoginModal2 = (): JSX.Element => {
  const { data: session } = useSession();

  const dispatch = useAppThunkDispatch();
  const [step, setStep] = useState<number>(1);
  const [secondProvider, setSecondProvider] = useState<string>('');

  const loginWithSecodeProvider = async () => {
    if (secondProvider === '') return;
    await signIn(secondProvider);
  };

  return (
    <Modal modalName='landingLogin2'>
      <Dialog.Panel className='w-[320px] sm:w-[360px] md:w-[400px] transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all '>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 flex items-center mb-3'
        >
          <p className=' text-black flex flex-grow font-poppins'> </p>
          <div
            onClick={() => {
              setStep(1);
              dispatch(setClose('landingLogin2'));
            }}
          >
            <XIcon className=' text-[#B6B7BC] hover:text-blue-400 h-5 w-5 cursor-pointer md:h-8 md:w-8' />
          </div>
        </Dialog.Title>

        <div className=' flex flex-col items-center justify-center space-y-4 md:px-6 '>
          <p className=' text-black flex flex-grow font-roboto text-[20px] sm:text-[24px] font-semibold whitespace-nowrap'>
            Complete Backup Account
          </p>

          <p className=' text-[#747474] flex font-roboto text-[10px] sm:text-[12px] '>
            Connect a backup account to get started
          </p>

          <div className='flex items-center space-x-2 w-full sm:w-[280px] md:w-[320px] bg-gray-100 hover:bg-gray-300/70 rounded-lg p-2 md:p-2 '>
            <img
              alt=''
              className='rounded-full border p-[2px] w-12 h-12 md:w-16 md:h-16 hover:opacity-80 '
              src={session?.user?.image}
            />

            <div className='flex-1  '>
              <h2 className='font-bold w-28 sm:w-28 truncate'>
                {session?.user?.name}
              </h2>
              <h3 className='text-sm text-gray-400 w-28 sm:w-28 md:w-28 truncate '>
                {session?.user?.email}
              </h3>
            </div>

            <img
              // loading='lazy'
              className='w-8 h-8 hover:opacity-80 '
              /* eslint-disable */
              // @ts-ignore
              src={googleSvg.src}
              /* eslint-enable */
            />

            <div className=' w-6 h-6 rounded-full bg-[#F5CBD5]  md:h-8 md:w-8 flex items-center justify-center'>
              <CheckIcon className=' text-green-600 h-5 w-5 cursor-pointer md:h-7 md:w-7' />
            </div>
          </div>

          <div className=' flex flex-col items-center justify-center w-full   '>
            <AnimatePresence exitBeforeEnter>
              <motion.div
                animate={{ opacity: 1, x: 0 }}
                className='mb-5 w-full   flex flex-col '
                exit={{ opacity: 0, x: -30 }}
                initial={{ opacity: 0, x: 30 }}
                key={step}
                transition={{ duration: 0.3 }}
              >
                {step === 1 && (
                  <div className='w-full '>
                    <div className=' flex w-full items-center justify-evenly py-2 '>
                      <div className='relative h-[70px] w-10 flex flex-col items-center group'>
                        <button
                          className='h-10 w-10 flex items-center justify-center  active:scale-90 transition duration-150 ease-in-out p-[6px] bg-gray-200 rounded-full shadow-md'
                          onClick={() => setSecondProvider('github')}
                        >
                          <img
                            // loading='lazy'
                            className='w-10 h-10 hover:opacity-80 '
                            /* eslint-disable */
                            // @ts-ignore
                            src={githubSvg.src}
                            /* eslint-enable */
                          />
                        </button>
                        {secondProvider === 'github' ? (
                          <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                        ) : (
                          <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                        )}
                      </div>

                      <div className='relative h-[70px] w-10 flex flex-col items-center  group'>
                        <button
                          className='h-10 w-10 flex items-center justify-center active:scale-90 transition duration-150 ease-in-out p-[6px] bg-gray-200 rounded-full shadow-md'
                          // onClick={loginWithGithub}
                          onClick={() => setSecondProvider('discord')}
                        >
                          <a
                            className=''
                            href={'https://discord.gg/zkp8UEQctM'}
                            rel='noreferrer'
                            target='_blank'
                          >
                            <img
                              // loading='lazy'
                              className='w-10 h-10 hover:opacity-80'
                              /* eslint-disable */
                              // @ts-ignore
                              src={discordSvg.src}
                              /* eslint-enable */
                            />
                          </a>
                        </button>
                        {secondProvider === 'discord' ? (
                          <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                        ) : (
                          <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                        )}
                      </div>

                      <div className='relative h-[70px] w-10 flex flex-col items-center  group'>
                        <button
                          className='h-10 w-10 flex items-center justify-center active:scale-90 transition duration-150 ease-in-out p-[6px] bg-gray-200 rounded-full shadow-md'
                          // onClick={loginWithGithub}
                          onClick={() => setSecondProvider('reddit')}
                        >
                          <img
                            // loading='lazy'
                            className='w-10 h-10 hover:opacity-80'
                            /* eslint-disable */
                            // @ts-ignore
                            src={redditSvg.src}
                            /* eslint-enable */
                          />
                        </button>
                        {secondProvider === 'reddit' ? (
                          <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                        ) : (
                          <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                        )}
                      </div>

                      <div className='relative h-[70px] w-10 flex flex-col items-center  group'>
                        <button
                          className='h-10 w-10 flex items-center justify-center active:scale-90 transition duration-150 ease-in-out p-[6px] bg-gray-200 rounded-full shadow-md'
                          // onClick={loginWithGithub}
                          onClick={() => setSecondProvider('facebook')}
                        >
                          <img
                            // loading='lazy'
                            className='w-10 h-10 hover:opacity-80'
                            /* eslint-disable */
                            // @ts-ignore
                            src={facebookSvg.src}
                            /* eslint-enable */
                          />
                        </button>
                        {secondProvider === 'facebook' ? (
                          <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                        ) : (
                          <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            <button
              className={` text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-2 md:p-2 w-[140px] mx-auto focus:bg-[#0170BF] font-inter  ${
                secondProvider === ''
                  ? 'bg-gray-500 text-black cursor-not-allowed'
                  : 'text-white bg-blue-400 cursor-pointer transition-colors duration-200'
              }`}
              disabled={secondProvider === ''}
              onClick={loginWithSecodeProvider}
            >
              Confirm
            </button>

            <button
              className='text-sm font-semibold text-blue-400 mt-3'
              onClick={() => signOut()}
            >
              Back
            </button>

            <div className='flex space-x-2 items-center justify-center pt-4 sm:pt-6'>
              <div className='w-2 h-2 bg-[#F7CAD8] rounded-full'></div>
              <div className='w-8 h-2 bg-[#F7CAD8] rounded-full'></div>
              <div className='w-2 h-2 bg-[#D9D9D9] rounded-full'></div>
            </div>
          </div>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default LoginModal2;
