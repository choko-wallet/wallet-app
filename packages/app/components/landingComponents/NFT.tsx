// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

/* tslint:disable */
/* eslint-disable */

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import Image from 'next/image';
import React from 'react';
import { EffectCoverflow, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import bg from '../../images/bg.png';
import nfts from '../../images/nfts.png';

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

        <div className='flex flex-col space-y-10'>

          <p className='text-4xl md:text-5xl lg:text-[56px] font-semibold text-center  mb-10  font-sso'>
            NFT
          </p>

          <Swiper
            centeredSlides={true}
            className='mySwiper w-[800px] h-[600px]'
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true
            }}
            effect={'coverflow'}
            grabCursor={true}
            modules={[EffectCoverflow, Pagination]}
            pagination={true}
            slidesPerView={'auto'}
          >

            <SwiperSlide>
              <img src='https://swiperjs.com/demos/images/nature-2.jpg' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='https://swiperjs.com/demos/images/nature-3.jpg' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='https://swiperjs.com/demos/images/nature-4.jpg' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='https://swiperjs.com/demos/images/nature-5.jpg' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='https://swiperjs.com/demos/images/nature-6.jpg' />
            </SwiperSlide>
            <SwiperSlide>
              <img src='https://swiperjs.com/demos/images/nature-7.jpg' />
            </SwiperSlide>

          </Swiper>

          <div className='flex items-center justify-center'>
            <div className='flex items-center justify-between mx-10 mt-14 '>
              <img alt=''
                className='rounded-full border p-[2px] w-16 h-16 bg-blue-200 mx-1 mx-1'
                src={nfts.src} />
              <p className=' text-white font-roboto text-[26px]'>Opensea</p>
            </div>
            <div className='flex items-center justify-between mx-10 mt-14'>
              <img alt=''
                className='rounded-full border p-[2px] w-16 h-16  bg-blue-200 mx-1'
                src={nfts.src} />
              <p className=' text-white font-roboto text-[26px]'>Opensea</p>
            </div>
            <div className='flex items-center justify-between mx-10 mt-14'>
              <img alt=''
                className='rounded-full border p-[2px] w-16 h-16 bg-blue-200 mx-1'
                src={nfts.src} />
              <p className=' text-white font-roboto text-[26px]'>Opensea</p>
            </div>
            <div className='flex items-center justify-between mx-10 mt-14'>
              <img alt=''
                className='rounded-full border p-[2px] w-16 h-16 bg-blue-200 mx-1'
                src={nfts.src} />
              <p className=' text-white font-roboto text-[26px]'>Opensea</p>
            </div>
            <div className='flex items-center justify-between mx-10 mt-14'>
              <img alt=''
                className='rounded-full border p-[2px] w-16 h-16 bg-blue-200 mx-1'
                src={nfts.src} />
              <p className=' text-white font-roboto text-[26px]'>Opensea</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default NFT;
