// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Image from 'next/image';
import React from 'react';

import bg from '../../images/bg.png';
import nfts from '../../images/nfts.png';
import SuperSwiper from './SuperSwiper';

const NFT = (): JSX.Element => {
  return (
    <section className='snap-start relative'
      id='nft'>
      <Image
        className=''
        layout='fill'
        objectFit='cover'
        src={bg}
      />

      <div className='relative flex items-center justify-center h-screen text-center z-20'>
        {/* <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          Contact
        </h3> */}

        <div className='flex flex-col '>

          <p className='text-[25px] sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-center mt-4 md:mb-10  font-sso'>
            NFT
          </p>

          <SuperSwiper />

          {/* <div className='flex items-center justify-between mt-3 md:-mt-10 space-x-2 p-3 md:w-[600px] mx-auto'>

            <div className='flex items-center justify-center  '>
              <img alt=''
                className='rounded-full border p-[2px] w-6 h-6 md:w-12 md:h-12 bg-blue-200 mx-1'
                src={nfts.src} />
              <p className=' text-white font-roboto text-[12px] md:text-[20px] w-12'>Opensea</p>
            </div>

            <div className='flex items-center justify-center  '>
              <img alt=''
                className='rounded-full border p-[2px] w-6 h-6 md:w-12 md:h-12 bg-blue-200 mx-1'
                src={nfts.src} />
              <p className=' text-white font-roboto text-[12px] md:text-[20px] w-12'>Audius</p>
            </div>

            <div className='flex items-center justify-center '>
              <img alt=''
                className='rounded-full border p-[2px] w-6 h-6 md:w-12 md:h-12 bg-blue-200 mx-1'
                src={nfts.src} />
              <p className=' text-white font-roboto text-[12px] md:text-[20px] w-12'>RARA</p>
            </div>

          </div> */}

        </div>

      </div>

    </section>
  );
};

export default NFT;
