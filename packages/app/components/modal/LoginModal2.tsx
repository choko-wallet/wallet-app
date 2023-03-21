// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import router from "next/router";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

import { setClose, useAppThunkDispatch } from "@choko-wallet/app-redux";
import nft2 from "../../images/nft2.png";
import googleSvg from "../../images/google.svg";
import githubSvg from "../../images/github.svg";
import twitterSvg from "../../images/twitter.svg";
import discordSvg from "../../images/discord.svg";

import Modal from "../Modal";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "../landingComponents/Check";

const LoginModal2 = (): JSX.Element => {
  const dispatch = useAppThunkDispatch();
  const [step, setStep] = useState<number>(1);
  const [check1, setCheck1] = useState<boolean>(false);
  const [check2, setCheck2] = useState<boolean>(false);
  const [selectedAccount, setSelectedAccount] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    await signIn("google");
  };

  const loginWithGithub = async () => {
    await signIn("github");
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
              setSelectedAccount(false);
              dispatch(setClose("landingLogin2"));
            }}
          >
            <XIcon className=' text-[#B6B7BC] h-5 w-5 cursor-pointer md:h-8 md:w-8' />
          </div>
        </Dialog.Title>

        <p className='w-[230px] md:w-full text-black font-semibold text-xl md:text-2xl  font-poppins mt-3 mb-6 text-center mx-auto '>
          Set Up Recovery Method
        </p>

        <div className=' flex flex-col items-center justify-center space-y-4 md:px-2 pb-5 md:pb-10 '>
          {/* two animate line  */}
          <div className='flex items-center justify-center space-x-3  mt-5'>
            <motion.div
              className='h-2 '
              layout
              transition={{ layout: { duration: 0.5, type: "tween" } }}
            >
              {step === 1 ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[82px] h-[4px] bg-[#0170BF] rounded-full '></div>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[23px] h-[4px] bg-[#0170BF] rounded-full'></div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className='h-2 '
              layout
              transition={{ layout: { duration: 0.5, type: "tween" } }}
            >
              {step === 2 ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[82px] h-[4px] bg-[#0170BF] rounded-full '></div>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[23px] h-[4px] bg-[#B6B7BC] rounded-full'></div>
                </motion.div>
              )}
            </motion.div>
          </div>

          <div className='flex items-center justify-center space-x-3  mt-5'>
            <motion.div
              className='h-2 '
              layout
              transition={{ layout: { duration: 0.5, type: "tween" } }}
            >
              {step === 1 ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[24px] h-[24px] bg-[#0170BF] rounded-full font-poppins flex items-center justify-center text-gray-200'>
                    1
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[24px] h-[24px] bg-[#0170BF] rounded-full font-poppins flex items-center justify-center text-gray-200'>
                    1
                  </div>
                </motion.div>
              )}
            </motion.div>

            <motion.div
              className='h-2 '
              layout
              transition={{ layout: { duration: 0.5, type: "tween" } }}
            >
              {step === 2 ? (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[24px] h-[24px] bg-[#0170BF] rounded-full font-poppins flex items-center justify-center text-gray-200'>
                    2
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className='w-[24px] h-[24px] bg-gray-200  rounded-full font-poppins flex items-center justify-center text-gray-800'>
                    2
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>

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
                <div className='w-full h-[260px] md:h-[320px] relative '>
                  <div className=' flex flex-col w-full space-y-4 py-5'>
                    <button
                      className='flex items-center justify-center text-[15px] md:text-[18px] text-black rounded-md hover:shadow-sm p-1 md:p-2 w-full border border-gray-300 bg-transparent font-inter hover:ring-[#0170BF] hover:ring-2 transition duration-150 active:scale-95 ease-in-out disabled:bg-gray-300 disabled:cursor-not-allowed disabled:active:scale-100 disabled:hover:ring-0'
                      disabled={true}
                      // onClick={loginWithGoogle}
                    >
                      Continue with
                      <img
                        // loading='lazy'
                        className='w-6 h-6 ml-3'
                        src={googleSvg.src}
                      />
                    </button>

                    <button
                      className='flex items-center justify-center text-[15px] md:text-[18px] text-black rounded-md hover:shadow-sm p-1 md:p-2 w-full border border-gray-300 bg-transparent font-inter hover:ring-[#0170BF] hover:ring-2 transition duration-150 active:scale-95 ease-in-out'
                      // onClick={loginWithGithub}
                    >
                      Continue with
                      <img
                        // loading='lazy'
                        className='w-6 h-6 ml-3'
                        src={githubSvg.src}
                      />
                    </button>

                    <button
                      className='flex items-center justify-center text-[15px] md:text-[18px] text-black rounded-md hover:shadow-sm p-1 md:p-2 w-full border border-gray-300 bg-transparent font-inter hover:ring-[#0170BF] hover:ring-2 transition duration-150 active:scale-95 ease-in-out'
                      // onClick={loginWithTwitter}
                    >
                      Continue with
                      <img
                        // loading='lazy'
                        className='w-6 h-6 ml-3'
                        src={twitterSvg.src}
                      />
                    </button>

                    <button
                      className='flex items-center justify-center text-[15px] md:text-[18px] text-black rounded-md hover:shadow-sm p-1 md:p-2 w-full border border-gray-300 bg-transparent font-inter hover:ring-[#0170BF] hover:ring-2 transition duration-150 active:scale-95 ease-in-out'
                      // onClick={loginWithDiscord}
                    >
                      Continue with
                      <img
                        // loading='lazy'
                        className='w-6 h-6 ml-3'
                        src={discordSvg.src}
                      />
                    </button>
                  </div>
                  <button
                    className='absolute bottom-0 text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-1 md:p-2 w-full bg-blue-400 focus:bg-[#0170BF] font-inter'
                    onClick={() => setStep(2)}
                  >
                    Confirm
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className='w-full max-w-2xl h-[260px] md:h-[320px] relative '>
                  <div className=' bg-white h-[180px] flex flex-col w-full '>
                    <p className='w-[230px] md:w-full text-black font-semibold text-xl md:text-2xl  font-poppins mt-3 mb-6 text-center mx-auto '>
                      Select An Account
                    </p>
                    <div
                      onClick={() => {
                        setSelectedAccount(!selectedAccount);
                      }}
                      className={`flex items-center justify-between mb-4 p-2 rounded-md cursor-pointer  ${
                        selectedAccount ? "bg-gray-300 " : "bg-white "
                      }`}
                    >
                      <img
                        className='rounded-full border p-[2px] w-16 h-16 '
                        src={nft2.src}
                        alt=''
                      />

                      <div className='flex-1 mx-4'>
                        <h2 className='font-bold'>email@email.com</h2>
                      </div>
                    </div>
                  </div>

                  <button
                    className='absolute bottom-0  text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-1 px-24 md:px-28 w-full bg-blue-400 focus:bg-[#0170BF] font-inter h-[70px] flex items-center '
                    onClick={() => {
                      setStep(1);
                      setSelectedAccount(false);
                      setCheck1(false);
                      setCheck2(false);
                      dispatch(setClose("landingLogin2"));
                    }}
                  >
                    {/* <div className='flex bg-red-300 '> */}
                    <Check />
                    {/* </div> */}
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