// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import router from "next/router";
import { signIn } from "next-auth/react";
import React, { useState } from "react";

import { setClose, useAppThunkDispatch } from "@choko-wallet/app-redux";
import nft2 from "../../images/nft2.png";

import Modal from "../Modal";
import { AnimatePresence, motion } from "framer-motion";

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

        <div className=' flex flex-col items-center justify-center space-y-4 md:px-2 pb-5 md:pb-10'>
          <div className='flex items-center justify-between mb-4'>
            <img
              className='rounded-full border p-[2px] w-10 h-10 sm:w-16 sm:h-16 '
              src={nft2.src}
              alt=''
            />

            <div className='flex-1 mx-4 '>
              <h2 className='font-bold w-24 sm:w-full truncate'>
                email@email.com
              </h2>
              <h3 className='text-sm text-gray-400 whitespace-nowrap w-24 sm:w-full truncate'>
                Welcome to CHOKO WALLET
              </h3>
            </div>

            <button className='text-sm font-semibold text-blue-400'>
              Sign Out
            </button>
          </div>

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
              className='mb-5 '
              exit={{ opacity: 0, x: -30 }}
              initial={{ opacity: 0, x: 30 }}
              key={step}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && (
                <div className='w-full max-w-2xl  '>
                  <div className=' bg-white h-[180px] flex flex-col w-full '>
                    <p className='w-[230px] md:w-full text-black font-semibold text-xl md:text-2xl  font-poppins mt-3 mb-6 text-center mx-auto '>
                      Set Up Recovery Method
                    </p>

                    <div className=' text-[#C67391] flex flex-col  justify-center items-start '>
                      <label className='checkContainer font-poppins pt-[2px]'>
                        Another Social Login
                        <input
                          checked={check1}
                          onClick={() => setCheck1(!check1)}
                          type='checkbox'
                        />
                        <span className='checkmark'></span>
                      </label>

                      <label className='checkContainer font-poppins pt-[2px]'>
                        Google Auth
                        <input
                          checked={check2}
                          onClick={() => setCheck2(!check2)}
                          type='checkbox'
                        />
                        <span className='checkmark'></span>
                      </label>
                    </div>
                  </div>
                  <button
                    className=' text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-1 md:p-2 w-full bg-blue-400 focus:bg-[#0170BF] font-inter'
                    onClick={() => setStep(2)}
                  >
                    Confirm
                  </button>
                </div>
              )}

              {step === 2 && (
                <div className='w-full max-w-2xl  '>
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
                    className=' text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-1 md:p-2 w-full bg-blue-400 focus:bg-[#0170BF] font-inter'
                    onClick={() => {
                      setStep(1);
                      setSelectedAccount(false);
                      setCheck1(false);
                      setCheck2(false);
                      dispatch(setClose("landingLogin2"));
                    }}
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
