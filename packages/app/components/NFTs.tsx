// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { PlusSmIcon } from '@heroicons/react/outline';
import React from 'react';

import More from '../images/More.png';
import NFTCollection from './NFTCollection';
import NFTCreator from './NFTCreator';

function NFTs (): JSX.Element {
  return (
    <div className='mb-6 lg:mb-12 w-full  mx-auto p-2 max-w-7xl flex flex-col'>
      {/* <div className="flex flex-col bg-yellow-300 w-full"> */}
      <div className='grid grid-cols-1 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4   '>
        <div className='col-span-full flex justify-between items-end px-2'>
          <p className=' font-inter text-[16px] md:text-[20px] font-semibold text-black dark:text-white m-3'>
            Top Creators
          </p>
          <div className='flex  h-10 w-16 md:h-12 md:w-20 cursor-pointer'>
            <img
              alt='nft_image'
              className='object-contain w-full h-full rounded-lg'
              src={More.src}
            />
          </div>
        </div>
        <NFTCreator />
        <NFTCreator />
        <NFTCreator />
        <NFTCreator />
      </div>

      <div className='grid grid-cols-2 mx-auto sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8   '>
        <div className='col-span-full flex justify-between items-end px-2'>
          <p className=' font-inter text-[16px] md:text-[20px] font-semibold text-black dark:text-white m-3 cursor-pointer'>
            Trending Collections
          </p>
          <div className='flex  h-10 w-16 md:h-12 md:w-20 cursor-pointer'>
            <img
              alt='nft_image'
              className='object-contain w-full h-full rounded-lg'
              src={More.src}
            />
          </div>
        </div>
        <NFTCollection />
        <NFTCollection />
        <NFTCollection />
        <NFTCollection />
        <NFTCollection />
        <NFTCollection />
        <NFTCollection />
        <NFTCollection />
      </div>

      <div className=' w-[264px] sm:w-[530px] md:w-[570px] lg:w-[852px] xl:w-[1138px] mx-auto'>
        <div className=' flex flex-col px-2'>
          <p className=' font-inter text-[16px] md:text-[20px] font-semibold text-black dark:text-white m-3'>
            My NFT Collections
          </p>

          <div className='cursor-pointer m-4 rounded-lg my-3 w-[80px] h-[50px] border-2 border-[#4798B3] border-dashed '>
            <div className='mx-auto flex relative items-center w-[70px] h-[50px] my-auto  cursor-pointer justify-center'>
              <div className='h-[32px] w-[32px] rounded-full  my-auto flex relative items-center justify-center'>
                <PlusSmIcon className='text-black dark:text-white z-40 h-5 w-5 ' />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=' w-[264px] sm:w-[530px] md:w-[570px] lg:w-[852px] xl:w-[1138px] mx-auto'>
        <div className=' flex flex-col px-2'>
          <p className=' font-inter text-[16px] md:text-[20px] font-semibold text-black dark:text-white m-3'>
            My Bookmarks
          </p>
        </div>
      </div>
    </div>
  );
}

export default NFTs;
