// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import Image from "next/image";
import React from "react";
// @ts-ignore
import Tilt from "react-tilt";

import bg from "../../images/bg.png";
import nft4 from "../../images/nft4.png";
import nft5 from "../../images/nft5.png";
import nft6 from "../../images/nft6.png";
import ThreeDStarBg from "./ThreeDStarBg";
// import nfts from '../../images/nfts.png';

const NFT = (): JSX.Element => {
  return (
    <section className='snap-start relative' id='nft'>
      <div className='relative h-screen w-full bg-[#050816]'>
        <ThreeDStarBg />
        {/* <Image className='' layout='fill' objectFit='cover' src={bg} /> */}
      </div>
      {/* <Image className=''
        layout='fill'
        objectFit='cover'
        src={bg} /> */}

      <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center z-20'>
        {/* <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          Contact
        </h3> */}

        <div className='flex flex-col '>
          <p className='text-[25px] sm:text-4xl md:text-5xl lg:text-[56px] font-semibold text-center mt-4 mb-20 md:mb-24  font-sso'>
            NFT
          </p>

          <div className='flex items-center justify-center md:space-x-5'>
            <Tilt className='hidden md:inline-flex w-full md:w-[220px] green-pink-gradient rounded-xl p-[1px]'>
              <div className='bg-[#151030] rounded-xl py-4 px-4 min-h-[280px] flex justify-evenly items-center flex-col'>
                <img
                  alt='web-development'
                  className='w-full h-full object-contain'
                  src={nft4.src}
                />

                <h3 className='text-white text-[20px] font-bold text-center pt-3'>
                  OPENSEA
                </h3>
              </div>
            </Tilt>

            <Tilt className='w-[260px] green-pink-gradient rounded-xl p-[1px]'>
              <div className='bg-[#151030] rounded-xl py-4 px-4 min-h-[280px] flex justify-evenly items-center flex-col'>
                <img
                  alt='web-development'
                  className='w-full h-full object-contain'
                  src={nft5.src}
                />

                <h3 className='text-white text-[20px] font-bold text-center pt-3'>
                  RARA
                </h3>
              </div>
            </Tilt>

            <Tilt className='hidden md:inline-flex w-[220px] green-pink-gradient rounded-xl p-[1px]'>
              <div className='bg-[#151030] rounded-xl py-4 px-4 min-h-[280px] flex justify-evenly items-center flex-col'>
                <img
                  alt='web-development'
                  className='w-full h-full object-contain'
                  src={nft6.src}
                />

                <h3 className='text-white text-[20px] font-bold text-center pt-3'>
                  AUDIUS
                </h3>
              </div>
            </Tilt>
          </div>

          {/* <SuperSwiper /> */}

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
