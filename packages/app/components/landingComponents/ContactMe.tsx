// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

import discIcon2 from '../../images/discord2.svg';
/* eslint-disable */
// @ts-ignore
import ThreeDStarBg from "./ThreeDStarBg";
/* eslint-enable */
// import ThreeDCubeCanvas from './ThreeDCubeCanvas';

const ContactMe = (): JSX.Element => {
  return (
    <section className='snap-start relative'
      id='contact'>
      <div className='relative h-screen w-full bg-[#050816]'>
        <ThreeDStarBg />
        {/* <Image className='' layout='fill' objectFit='cover' src={bg} /> */}
      </div>
      {/* <Image className=''
        layout='fill'
        objectFit='cover'
        src={bg} /> */}

      <div className='absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center h-screen text-center z-20'>
        <div className='flex flex-col space-y-20 '>
          <p className='text-6xl sm:text-7xl md:text-[100px] lg:text-[120px] font-semibold text-center  mb-10  font-stick'>
            {/* <div className='flex flex-col space-y-10 '>
          <p className='text-5xl sm:text-7xl md:text-[100px] lg:text-[120px] font-semibold text-center mb-5 font-stick'> */}
            Who’s Choko?
          </p>

          {/* <div className='h-36 w-full sm:h-48 md:h-64 lg:h-96 '>
            <ThreeDCubeCanvas />
          </div> */}

          <div className='flex items-center justify-center pt-10 md:pt-20 '>
            {/* <div className='flex items-center justify-center pt-5 '> */}
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              style={{ height: 36, width: 36 }}
              target='_blank'
              url='https://github.com/choko-wallet'
            />
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              style={{ height: 36, width: 36 }}
              target='_blank'
              url='https://t.me/choko_wallet'
            />
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              style={{ height: 36, width: 36 }}
              target='_blank'
              url='https://twitter.com/choko_wallet'
            />
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              style={{ height: 36, width: 36 }}
              target='_blank'
              url='https://medium.com/@choko_wallet'
            />

            <a
              className='cursor-pointer inline-flex relative h-5 w-5 m-2'
              href={'https://discord.gg/zkp8UEQctM'}
              rel='noreferrer'
              target='_blank'
            >
              <Image
                layout='fill'
                objectFit='contain'
                /* eslint-disable */
                // @ts-ignore
                src={discIcon2}
                /* eslint-enable */
              />
            </a>
          </div>
        </div>
      </div>

      <div className='absolute bottom-[60px] left-0 right-0 h-10 flex items-center justify-center z-50'>
        <p className='font-poppins'>© 2023 Choko Wallet</p>
      </div>
    </section>
  );
};

export default ContactMe;
