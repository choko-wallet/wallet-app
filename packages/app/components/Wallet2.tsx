// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ClockIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  PhotographIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';

import discIcon1 from '../images/discord1.svg';
import discIcon2 from '../images/discord2.svg';
import blockchain4 from '../images/metaverse2.jpg';
import nft3 from '../images/nft3.png';
import nft4 from '../images/nft4.png';
import nft5 from '../images/nft5.png';
import nft6 from '../images/nft6.png';
import nft7 from '../images/nft7.png';
import tw from '../images/twitter.svg';

function Wallet2 (): JSX.Element {
  const tabs = ['Gallary', 'Tokens', 'Activity'];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const { theme } = useTheme();

  return (
    <div className='w-full  bg-transparent dark:bg-gray-900 relative p-4 max-w-[500px] mx-auto'>
      <div className='relative h-48 w-full rounded-2xl overflow-hidden'>
        <Image layout='fill'
          objectFit='cover'
          src={blockchain4.src} />
      </div>

      <div className='w-full flex flex-col items-center justify-center relative bg-white dark:bg-gray-900 -mt-10 rounded-2xl '>
        <img
          alt=''
          className='h-28 w-28 rounded-full  border-white dark:border-gray-900
            border-[6px] object-cover cursor-pointer hover:scale-110 transition duration-150
            ease-out absolute -top-16'
          src={nft3.src}
        />

        <p className='mt-12 text-[28px] font-poppins font-bold text-gray-700 dark:text-gray-300 hover:text-blue-400'>
          Daxender
        </p>
        <p className='text-[15px] font-poppins text-gray-400 dark:text-gray-300 hover:text-blue-400'>
          Keep on keepin&apos; on
        </p>

        <div className='w-full flex items-center justify-between my-4 px-5 '>
          <div
            className='flex items-center justify-center p-2 border space-x-1 border-gray-300 rounded-full dark:hover:bg-gray-800 hover:scale-110 transition duration-150
            ease-out'
          >
            <GlobeAltIcon className='w-5 h-5  transition duration-150 ease-out cursor-pointer active:scale-125 text-yellow-600 dark:text-yellow-300' />
            <p className='text-[12px] font-poppins text-gray-700 dark:text-gray-300 '>
              john.choko.id
            </p>
          </div>

          <div
            className='flex items-center justify-center p-2 border space-x-1 border-gray-300 rounded-full dark:hover:bg-gray-800 hover:scale-110 transition duration-150
            ease-out'
          >
            <img
              alt=''
              className='h-4 w-4 rounded-full   object-contain cursor-pointer hover:scale-110 transition duration-150 ease-out'
              /* eslint-disable */
              // @ts-ignore
              src={tw.src}
              /* eslint-enable */
            />
            <p className='text-[12px] font-poppins text-gray-700 dark:text-gray-300'>
              @dax
            </p>
          </div>

          <div
            className='flex items-center justify-center p-2 border space-x-1 border-gray-300 rounded-full dark:hover:bg-gray-800 hover:scale-110 transition duration-150
            ease-out'
          >
            {theme === 'light' ? (
              <img
                alt=''
                className='h-4 w-4 rounded-full   object-contain cursor-pointer hover:scale-110 transition duration-150 ease-out'
                /* eslint-disable */
                // @ts-ignore
                src={discIcon1.src}
                /* eslint-enable */
              />
            ) : (
              <img
                alt=''
                className='h-4 w-4 rounded-full   object-contain cursor-pointer hover:scale-110 transition duration-150 ease-out'
                /* eslint-disable */
                // @ts-ignore
                src={discIcon2.src}
                /* eslint-enable */
              />
            )}

            <p className='text-[12px] font-poppins text-gray-700 dark:text-gray-300 '>
              @Daxender
            </p>
          </div>
        </div>

        <div className='grid grid-cols-3 text-gray-700 dark:text-gray-300 w-full gap-2 px-2'>
          <div className='flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 hover:opacity-80 rounded-lg py-3 w-full'>
            <p className='text-[20px] font-poppins font-bold '>#4</p>
            <p className='text-[12px] font-poppins font-semibold'>Rank</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 hover:opacity-80 rounded-lg py-3 w-full'>
            <p className='text-[20px] font-poppins font-bold '>1.4K</p>
            <p className='text-[12px] font-poppins font-semibold'>
              Reviews given
            </p>
          </div>

          <div className='flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 hover:opacity-80 rounded-lg py-3 w-full'>
            <p className='text-[20px] font-poppins font-bold '>266</p>
            <p className='text-[12px] font-poppins font-semibold'>Reviews</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 hover:opacity-80 rounded-lg py-3 w-full'>
            <p className='text-[20px] font-poppins font-bold '>152</p>
            <p className='text-[12px] font-poppins font-semibold'>Watching</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 hover:opacity-80 rounded-lg py-3 w-full'>
            <p className='text-[20px] font-poppins font-bold '>245</p>
            <p className='text-[12px] font-poppins font-semibold'>Watched By</p>
          </div>

          <div className='flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-700 hover:opacity-80 rounded-lg py-3 w-full'>
            <div className='flex items-center justify-center my-1'>
              <img
                alt=''
                className='h-6 w-6 rounded-full object-cover cursor-pointer hover:scale-110 transition duration-150 ease-out -mr-2'
                src={nft4.src}
              />

              <img
                alt=''
                className='h-6 w-6 rounded-full object-cover cursor-pointer hover:scale-110 transition duration-150 ease-out -mr-2'
                src={nft5.src}
              />
              <img
                alt=''
                className='h-6 w-6 rounded-full object-cover cursor-pointer hover:scale-110 transition duration-150 ease-out -mr-2'
                src={nft6.src}
              />

              <img
                alt=''
                className='h-6 w-6 rounded-full object-cover cursor-pointer hover:scale-110 transition duration-150 ease-out -mr-2'
                src={nft7.src}
              />
              <img
                alt=''
                className='h-6 w-6 rounded-full object-cover cursor-pointer hover:scale-110 transition duration-150 ease-out -mr-2'
                src={nft3.src}
              />
            </div>
            <p className='text-[12px] font-poppins font-semibold'>
              Communities
            </p>
          </div>
        </div>

        {/* 做个tab切换  */}
        <div className='flex w-full items-center justify-between px-2 my-2 bg-gray-100 dark:bg-gray-700 rounded-lg p-2'>
          {tabs.map((item) => (
            <div
              className={
                item === selectedTab
                  ? ' font-inter text-[16x] cursor-pointer px-3 py-1 transition duration-150 rounded-full bg-[#0170BF] font-semibold text-[#F5CBD5] active:scale-90 ease-in-out flex items-center justify-center'
                  : 'text-black dark:text-white font-inter text-[12px] font-normal cursor-pointer px-3 py-1 transition duration-150 rounded-full shadow-md  hover:bg-[#0170BF] hover:font-semibold hover:text-[#F5CBD5] hover:shadow-xl active:scale-90 ease-in-out flex items-center justify-center'
              }
              key={item}
              onClick={() => setSelectedTab(item)}
            >
              {item === 'Gallary' ? (
                <PhotographIcon className='w-5 h-5  transition duration-150 ease-out cursor-pointer active:scale-125 text-gray-300 mx-1' />
              ) : item === 'Gallary' ? (
                <CurrencyDollarIcon className='w-5 h-5  transition duration-150 ease-out cursor-pointer active:scale-125 text-gray-300  mx-1' />
              ) : (
                <ClockIcon className='w-5 h-5  transition duration-150 ease-out cursor-pointer active:scale-125 text-gray-300  mx-1' />
              )}
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Wallet2;
