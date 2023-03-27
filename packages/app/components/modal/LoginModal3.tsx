// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import router from "next/router";
import { signIn, signOut, useSession } from "next-auth/react";
import React, { useState } from "react";

import { setClose, useAppThunkDispatch } from "@choko-wallet/app-redux";
import nft2 from "../../images/nft2.png";
import googleSvg from "../../images/google.svg";
import githubSvg from "../../images/github.svg";
import facebookSvg from "../../images/facebook.svg";
import appleSvg from "../../images/apple.svg";
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
  const { data: session } = useSession();

  const loginWithGoogle = async () => {
    await signIn("google");
  };

  const loginWithGithub = async () => {
    await signIn("github");
  };

  return (
    <Modal modalName='landingLogin3'>
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
              dispatch(setClose("landingLogin3"));
            }}
          >
            <XIcon className=' text-[#B6B7BC] h-5 w-5 cursor-pointer md:h-8 md:w-8' />
          </div>
        </Dialog.Title>

        <p className='w-[230px] md:w-full text-black font-semibold text-xl md:text-2xl  font-poppins mt-3 mb-6 text-center mx-auto '>
          Already Generated your account with
        </p>

        <div className=' flex flex-col items-center justify-center space-y-4 md:px-2 pb-5 md:pb-10 '>
          <div className='flex items-center justify-between hover:bg-gray-200 rounded-md hover:shadow-md hover:shadow-slate-400/30'>
            <img
              className='rounded-full border p-[2px] w-16 h-16 hover:opacity-80'
              src='https://lh3.googleusercontent.com/a/AGNmyxbU_kc17QfyWtxcS5SW0gsu2maw8IkOVCdIX40d=s96-c'
              alt=''
            />

            <div className='flex-1 mx-4 hover:opacity-80'>
              <h2 className='font-bold w-28 sm:w-44 md:w-48 truncate'>Leo</h2>
              <h3 className='text-sm text-gray-400 w-28 sm:w-44 md:w-48 truncate'>
                lizhuyao666@gmail.com
              </h3>
            </div>

            <img
              // loading='lazy'
              className='w-10 h-10 mr-3 hover:opacity-80'
              src={googleSvg.src}
            />

            {/* <button
              onClick={() => signOut}
              className='text-sm font-semibold text-blue-400'
            >
              Sign Out
            </button> */}
          </div>

          <div className='flex items-center justify-between hover:bg-gray-200 rounded-md hover:shadow-md hover:shadow-slate-400/30'>
            <img
              className='rounded-full border p-[2px] w-16 h-16 hover:opacity-80'
              src={session?.user?.image}
              alt=''
            />

            <div className='flex-1 mx-4 hover:opacity-80'>
              <h2 className='font-bold w-28 sm:w-44 md:w-48 truncate'>
                {session?.user?.name}
              </h2>
              <h3 className='text-sm text-gray-400 w-28 sm:w-44 md:w-48 truncate'>
                {session?.user?.email}
              </h3>
            </div>

            <img
              // loading='lazy'
              className='w-10 h-10 mr-3 hover:opacity-80'
              src={githubSvg.src}
            />
          </div>

          <button
            onClick={() => signOut()}
            className='text-sm font-semibold text-blue-400'
          >
            Sign Out
          </button>

          <div className='w-full mt-10 flex items-center justify-center '>
            <div className='h-5 w-5 rounded-full bg-green-600 mx-3'></div>
            <div className='h-5 w-5 rounded-full bg-green-600 mx-3'></div>
          </div>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default LoginModal2;
