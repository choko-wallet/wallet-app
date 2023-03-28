// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from "@headlessui/react";
import { XIcon, CheckCircleIcon } from "@heroicons/react/outline";
import { signIn, useSession } from "next-auth/react";
import React, { useState } from "react";

import { setClose, useAppThunkDispatch } from "@choko-wallet/app-redux";
import googleSvg from "../../images/google.svg";
import githubSvg from "../../images/github.svg";
import facebookSvg from "../../images/facebook.svg";
import appleSvg from "../../images/apple.svg";
import redditSvg from "../../images/reddit.svg";

import discordSvg from "../../images/discord.svg";
import twitterSvg from "../../images/twitter.svg";

import Modal from "../Modal";
import { AnimatePresence, motion } from "framer-motion";

const LoginModal2 = (): JSX.Element => {
  const { data: session } = useSession();

  const dispatch = useAppThunkDispatch();
  const [step, setStep] = useState<number>(1);
  const [secondProvider, setSecondProvider] = useState<string>("");

  const loginWithSecodeProvider = async () => {
    if (secondProvider === "") return;
    await signIn(secondProvider);
  };

  return (
    <Modal modalName='landingLogin2'>
      <Dialog.Panel className='w-[300px] sm:w-[360px] md:w-[400px] transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all '>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 flex items-center mb-3'
        >
          <p className=' text-black flex flex-grow font-poppins'> </p>
          <div
            onClick={() => {
              setStep(1);
              dispatch(setClose("landingLogin2"));
            }}
          >
            <XIcon className=' text-[#B6B7BC] h-5 w-5 cursor-pointer md:h-8 md:w-8' />
          </div>
        </Dialog.Title>

        <p className='w-[230px] md:w-full text-black font-semibold text-xl md:text-xl  font-poppins mt-3 mb-6 text-center mx-auto '>
          Sign Up
        </p>

        <div className=' w-[230px] flex items-center justify-center mx-auto  my-2'>
          <div className='h-5 w-5 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center'>
            <p className='text-[10px] text-white'>1</p>
          </div>
          <div className='h-[2px] w-[90px] rounded-full bg-green-300 hover:bg-green-400'></div>
          <div className='h-5 w-5 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center'>
            <p className='text-[10px] text-white'>2</p>
          </div>
          <div className='h-[2px] w-[90px] rounded-full bg-gray-300 hover:bg-gray-400'></div>
          <div className='h-[10px] w-[10px] rounded-full bg-gray-500 hover:bg-gray-400'></div>
        </div>

        <p className='w-[230px] md:w-full text-black font-semibold text-sm font-poppins text-center mx-auto hover:text-gray-700'>
          Note: This is the default
        </p>

        <div className='flex items-center justify-between my-3 '>
          <div className='flex items-center flex-1 bg-gray-100 hover:bg-gray-300/70 rounded-lg p-2 mx-1'>
            <img
              className='rounded-full border p-[2px] w-16 h-16 hover:opacity-80'
              src={session?.user?.image}
              alt=''
            />

            <div className='flex-1 mx-4'>
              <h2 className='font-bold w-16 sm:w-28 truncate'>
                {session?.user?.name}
              </h2>
              <h3 className='text-sm text-gray-400 w-16 sm:w-32 md:w-40 truncate '>
                {session?.user?.email}
              </h3>
            </div>

            <img
              // loading='lazy'
              className='w-8 h-8 hover:opacity-80'
              src={googleSvg.src}
            />
          </div>
          <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer md:h-8 md:w-8' />
        </div>

        <div className=' flex flex-col items-center justify-center space-y-4 md:px-2 pb-5   '>
          <AnimatePresence exitBeforeEnter>
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className='mb-5 w-full space-y-4 md:px-6 flex flex-col'
              exit={{ opacity: 0, x: -30 }}
              initial={{ opacity: 0, x: 30 }}
              key={step}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className='w-full relative h-[140px] space-y-5  '>
                  <div className=' flex w-full items-center justify-evenly py-5'>
                    <div className='relative h-[70px] w-10 flex flex-col items-center group'>
                      <button
                        className='h-10 w-10 flex items-center justify-center bg-transparent active:scale-95 transition duration-150 ease-in-out '
                        // onClick={loginWithGithub}
                        onClick={() => setSecondProvider("github")}
                      >
                        <img
                          // loading='lazy'
                          className='w-10 h-10 hover:opacity-80'
                          src={githubSvg.src}
                        />
                      </button>
                      {secondProvider === "github" ? (
                        <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                      ) : (
                        <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                      )}
                    </div>

                    <div className='relative h-[70px] w-10 flex flex-col items-center  group'>
                      <button
                        className='h-10 w-10 flex items-center justify-center active:scale-95 transition duration-150 ease-in-out '
                        // onClick={loginWithGithub}
                        onClick={() => setSecondProvider("discord")}
                      >
                        <a
                          className=''
                          href={"https://discord.gg/zkp8UEQctM"}
                          rel='noreferrer'
                          target='_blank'
                        >
                          <img
                            // loading='lazy'
                            className='w-10 h-10 hover:opacity-80'
                            src={discordSvg.src}
                          />
                        </a>
                      </button>
                      {secondProvider === "discord" ? (
                        <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                      ) : (
                        <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                      )}
                    </div>

                    <div className='relative h-[70px] w-10 flex flex-col items-center  group'>
                      <button
                        className='h-10 w-10 flex items-center justify-center active:scale-95 transition duration-150 ease-in-out '
                        // onClick={loginWithGithub}
                        onClick={() => setSecondProvider("reddit")}
                      >
                        <img
                          // loading='lazy'
                          className='w-10 h-10 hover:opacity-80'
                          src={redditSvg.src}
                        />
                      </button>
                      {secondProvider === "reddit" ? (
                        <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                      ) : (
                        <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                      )}
                    </div>

                    <div className='relative h-[70px] w-10 flex flex-col items-center  group'>
                      <button
                        className='h-10 w-10 flex items-center justify-center active:scale-95 transition duration-150 ease-in-out '
                        // onClick={loginWithGithub}
                        onClick={() => setSecondProvider("facebook")}
                      >
                        <img
                          // loading='lazy'
                          className='w-10 h-10 hover:opacity-80'
                          src={facebookSvg.src}
                        />
                      </button>
                      {secondProvider === "facebook" ? (
                        <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                      ) : (
                        <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                      )}
                    </div>

                    {/* <div className='relative h-[70px] w-10 flex flex-col items-center  group'>
                      <button
                        className='h-10 w-10 flex items-center justify-center active:scale-95 transition duration-150 ease-in-out '
                        // onClick={loginWithGithub}
                        onClick={() => setSecondProvider("apple")}
                      >
                        <img
                          // loading='lazy'
                          className='w-10 h-10 hover:opacity-80'
                          src={appleSvg.src}
                        />
                      </button>
                      {secondProvider === "apple" ? (
                        <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                      ) : (
                        <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                      )}
                    </div> */}

                    {/* <div className='relative h-[70px] w-10 flex flex-col items-center  group'>
                      <button
                        className='h-10 w-10 flex items-center justify-center active:scale-95 transition duration-150 ease-in-out '
                        // onClick={loginWithGithub}
                        onClick={() => setSecondProvider("twitter")}
                      >
                        <img
                          // loading='lazy'
                          className='w-10 h-10 hover:opacity-80'
                          src={twitterSvg.src}
                        />
                      </button>
                      {secondProvider === "twitter" ? (
                        <CheckCircleIcon className=' text-green-600 h-6 w-6 cursor-pointer absolute bottom-0' />
                      ) : (
                        <div className='hidden group-hover:block absolute bottom-0 bg-gray-300/80 w-5 h-5 rounded-full'></div>
                      )}
                    </div> */}
                  </div>

                  <button
                    className={`absolute bottom-0 text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-2 md:p-2 w-full  focus:bg-[#0170BF] font-inter ${
                      secondProvider === ""
                        ? "bg-gray-500 text-black cursor-not-allowed"
                        : "text-white bg-blue-400 cursor-pointer"
                    }`}
                    onClick={loginWithSecodeProvider}
                    disabled={secondProvider === ""}
                  >
                    Confirm
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default LoginModal2;
