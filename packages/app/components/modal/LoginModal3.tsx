// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from "@headlessui/react";
import { CheckCircleIcon, CheckIcon, XIcon } from "@heroicons/react/outline";
import { Session } from "next-auth";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

import { setClose, useAppThunkDispatch } from "@choko-wallet/app-redux";
import Image from "next/image";

import appleSvg from "../../images/apple.svg";
import discordSvg from "../../images/discord.svg";
import facebookSvg from "../../images/facebook.svg";
import githubSvg from "../../images/github.svg";
import googleSvg from "../../images/google.svg";
import Modal from "../Modal";
import logo from "../../images/logo.png";

interface Props {
  enterChoko: () => Promise<void>;
}

const LoginModal3 = ({ enterChoko }: Props): JSX.Element => {
  const dispatch = useAppThunkDispatch();
  const { data: session } = useSession();
  const [primaryProvider, setPrimaryProvider] = useState<Session>();
  const [beforeEnterCheck, setBeforeEnterCheck] = useState<boolean>(false);

  useEffect(() => {
    if (!session) return;
    const primaryProviderString = localStorage.getItem("primarySession");

    setPrimaryProvider(JSON.parse(primaryProviderString));
  }, [session]);

  const providerToImage = (provider: string): string => {
    switch (provider) {
      /* eslint-disable */
      // @ts-ignore
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
      /* eslint-enable */
    }
  };

  if (!primaryProvider) return null;

  return (
    <Modal modalName='landingLogin3'>
      <Dialog.Panel className='w-[320px] sm:w-[360px] md:w-[400px]  transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all '>
        <Dialog.Title
          as='h3'
          className='text-lg font-medium leading-6 flex items-center relative  justify-center'
        >
          <div className='flex relative items-center justify-center  w-[60px] h-[60px] my-auto cursor-pointer'>
            <Image layout='fill' objectFit='contain' src={logo.src} />
          </div>

          <div
            className='absolute right-0'
            onClick={() => {
              dispatch(setClose("landingLogin3"));
            }}
          >
            <XIcon className=' text-[#B6B7BC] hover:text-blue-400 h-5 w-5 cursor-pointer md:h-8 md:w-8' />
          </div>
        </Dialog.Title>

        <div className=' flex flex-col items-center justify-center space-y-2 md:px-6 '>
          <p className=' text-black flex flex-grow font-roboto text-[20px] sm:text-[24px] font-semibold whitespace-nowrap'>
            Your Selected Credentials
          </p>

          <p className=' text-[#747474] flex font-roboto text-[10px] sm:text-[12px] '>
            Remember your credential combo for future login.
          </p>

          {/* google */}
          <div className='flex items-center space-x-2 w-full sm:w-[280px] md:w-[320px] bg-gray-100 hover:bg-gray-300/70 rounded-lg p-2 md:p-2 '>
            <img
              alt=''
              className='rounded-full border p-[2px] w-12 h-12 md:w-16 md:h-16 hover:opacity-80 '
              src={primaryProvider?.user?.image}
            />

            <div className='flex-1  '>
              <h2 className='font-bold w-28 sm:w-28 truncate'>
                {primaryProvider?.user?.name}
              </h2>
              <h3 className='text-sm text-gray-400 w-28 sm:w-28 md:w-28 truncate '>
                {primaryProvider?.user?.email}
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

          {/* github */}
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
              src={providerToImage(session?.user?.provider)}
              /* eslint-enable */
            />

            <div className=' w-6 h-6 rounded-full bg-[#F5CBD5]  md:h-8 md:w-8 flex items-center justify-center'>
              <CheckIcon className=' text-green-600 h-5 w-5 cursor-pointer md:h-7 md:w-7' />
            </div>
          </div>

          <div
            className='flex cursor-pointer items-center justify-center p-2'
            onClick={() => setBeforeEnterCheck(!beforeEnterCheck)}
          >
            <p className=' text-[#0170BF] flex-1 font-inter text-[12px] '>
              Your Choko account is linked with the above combo.
            </p>

            {beforeEnterCheck === true ? (
              <div className=' w-6 h-6 rounded-full bg-[#F5CBD5]  md:h-8 md:w-8 flex items-center justify-center '>
                <CheckIcon className=' text-green-600 h-5 w-5 cursor-pointer md:h-7 md:w-7' />
              </div>
            ) : (
              <div className=' border-[2px] border-gray-300 w-6 h-6  md:h-8 md:w-8 rounded-full'></div>
            )}
          </div>

          <button
            className={` text-[15px] md:text-[18px] text-white rounded-md hover:shadow-sm p-2 md:p-2 w-[140px] mx-auto focus:bg-[#0170BF] font-inter  ${
              beforeEnterCheck === false
                ? "bg-gray-500 text-black cursor-not-allowed"
                : "text-white bg-blue-400 cursor-pointer transition-colors duration-200"
            }`}
            disabled={beforeEnterCheck === false}
            onClick={enterChoko}
          >
            Let's Go
          </button>

          <button
            className='text-sm font-semibold text-gray-500 font-inter'
            onClick={() => signOut()}
          >
            Sign Out
          </button>

          <div className='flex space-x-2 items-center justify-center pt-4 sm:pt-6'>
            <div className='w-2 h-2 bg-[#F7CAD8] rounded-full'></div>
            <div className='w-2 h-2 bg-[#F7CAD8] rounded-full'></div>
            <div className='w-8 h-2 bg-[#F7CAD8] rounded-full'></div>
          </div>
        </div>
      </Dialog.Panel>
    </Modal>
  );
};

export default LoginModal3;
