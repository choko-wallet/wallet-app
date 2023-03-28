// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { setClose, useAppThunkDispatch } from "@choko-wallet/app-redux";
import googleSvg from "../../images/google.svg";
import githubSvg from "../../images/github.svg";
import facebookSvg from "../../images/facebook.svg";
import appleSvg from "../../images/apple.svg";
import discordSvg from "../../images/discord.svg";

import Modal from "../Modal";
import { Session } from "next-auth";

interface Props {
  enterChoko: () => Promise<void>;
}
const LoginModal3 = ({ enterChoko }: Props): JSX.Element => {
  const dispatch = useAppThunkDispatch();
  const { data: session } = useSession();
  const [primaryProvider, setPrimaryProvider] = useState<Session>();

  useEffect(() => {
    if (!session) return;
    const primaryProviderString = localStorage.getItem("primarySession");
    setPrimaryProvider(JSON.parse(primaryProviderString));
  }, [session]);

  const providerToImage = (provider: string): string => {
    switch (provider) {
      case "github":
        return githubSvg.src;
      case "twitter":
        return appleSvg.src;
      case "facebook":
        return facebookSvg.src;
      case "discord":
        return discordSvg.src;
      default:
        return githubSvg.src;
    }
  };

  if (!primaryProvider) return null;
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
              dispatch(setClose("landingLogin3"));
            }}
          >
            <XIcon className=' text-[#B6B7BC] h-5 w-5 cursor-pointer md:h-8 md:w-8' />
          </div>
        </Dialog.Title>

        <p className='w-[230px] md:w-full text-black font-semibold text-xl md:text-2xl  font-poppins mt-3 mb-6 text-center mx-auto '>
          Your Selected Credentials
        </p>

        <div className=' w-[230px] flex items-center justify-center mx-auto  my-2'>
          <div className='h-5 w-5 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center'>
            <p className='text-[10px] text-white'>1</p>
          </div>
          <div className='h-[2px] w-[90px] rounded-full bg-green-300 hover:bg-green-400'></div>
          <div className='h-5 w-5 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center'>
            <p className='text-[10px] text-white'>2</p>
          </div>
          <div className='h-[2px] w-[90px] rounded-full bg-green-300 hover:bg-green-400'></div>
          <div className='h-5 w-5 rounded-full bg-green-500 hover:bg-green-400 flex items-center justify-center'>
            <p className='text-[10px] text-white'>3</p>
          </div>
        </div>

        <p className=' text-[#747474] flex flex-grow font-roboto text-center text-[14px]'>
          PLEASE REMEMBER THESE CREDENTIALS! We link your Web3 Account with the
          combination you selected.
        </p>

        <div className=' flex flex-col items-center justify-center space-y-4 md:px-2 pb-5 md:pb-10 '>
          <div className='flex items-center justify-between hover:bg-gray-200 rounded-md hover:shadow-md hover:shadow-slate-400/30'>
            <img
              className='rounded-full border p-[2px] w-16 h-16 hover:opacity-80'
              src={primaryProvider?.user?.image}
              alt=''
            />

            <div className='flex-1 mx-4 hover:opacity-80'>
              <h2 className='font-bold w-28 sm:w-44 md:w-48 truncate'>
                {primaryProvider?.user?.name}
              </h2>
              <h3 className='text-sm text-gray-400 w-28 sm:w-44 md:w-48 truncate'>
                {primaryProvider?.user?.email}
              </h3>
            </div>

            <img
              // loading='lazy'
              className='w-10 h-10 mr-3 hover:opacity-80'
              src={googleSvg.src}
            />
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
              src={providerToImage(session?.user?.provider)}
            />
          </div>

          <button
            onClick={() => signOut()}
            className='text-sm font-semibold text-blue-400'
          >
            Sign Out
          </button>

          <button
            className={`bottom-0 text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-2 md:p-2 w-full  focus:bg-[#0170BF] font-inter bg-blue-400 cursor-pointer`}
            onClick={enterChoko}
          >
            ENTER CHOKO
          </button>

          {/* <div className='w-full mt-10 flex items-center justify-center '>
            <div className='h-5 w-5 rounded-full bg-green-600 mx-3'></div>
            <div className='h-5 w-5 rounded-full bg-green-600 mx-3'></div>
          </div> */}
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default LoginModal3;
