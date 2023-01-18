// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import Typed from 'react-typed';

import bg from '../../images/bg.png';

import BackgroundCircle from './BackgroundCircle';

const Hero = (): JSX.Element => {
  const router = useRouter();
  const vidRef = useRef();

  useEffect(() => { vidRef.current.play(); }, []);

  return (
    <section className='snap-center relative'
      id='hero'>
      <Image
        className=' z-10'
        src={bg}
        layout="fill"
        objectFit="cover"
      />
      <div className='flex items-center justify-center h-screen space-y-8 overflow-hidden text-center '>



        <div className='z-20 flex flex-col items-center xl:items-start lg:w-[550px] lg:pt-6 pb-5 '>

          <p className='py-3 xl:py-6 text-[36px] lg:text-[40px]  h-32  text-white font-vt323'>
            Your <Typed
              backSpeed={20}
              loop
              strings={[
                'easy to use',
                'secure',
                'multi-chain',
                'portable',
                'extensible']}
              typeSpeed={100} />crypto wallet
          </p>

          <p className='text-sm md:hidden text-[#F5CBD5] bg-[#2C1F28] font-bold p-2 rounded-md '>
            Currently in private beta
          </p>

          <p className='text-[18px] md:text-[20px] max-w-[400px] mx-auto font-vt323  text-[#FFFFFE] pb-2 text-start my-5 xl:my-10  xl:mx-0'>
            Trade, own and swap on your favorite blockchain with gasless transaction and account abstraction support.
          </p>

          <div
            className='block xl:hidden z-40 relative h-[328px] w-[328px] flex-shrink-0'

          >
            <div
              className='absolute top-16 left-0 bottom-16 w-20  bg-gradient-to-l from-[#0C0D12] to-transparent '
            />
            <div
              className='absolute top-16 right-0 bottom-16 w-20 bg-gradient-to-r from-[#0C0D12] to-transparent '
            />
            <div
              className='absolute top-0 left-16 right-16 h-20  bg-gradient-to-t from-[#0C0D12] to-transparent '
            />
            <div
              className='absolute bottom-0 left-16 right-16 h-20   bg-gradient-to-b from-[#0C0D12] to-transparent '
            />
            <div
              className='absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-bl from-[#141011] to-transparent'
            />
            <video
              className='h-[200px] w-[200px] z-40 m-16'
              autoPlay={true}
              loop
              ref={vidRef}
              muted
              src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FpXCnTPC9Ldt415MRlPNF%2Fimage?alt=media&token=e2381e66-eee4-4e22-b4bd-1ed563fa434e'
            />
          </div>

          <div className='flex xl:flex-col mt-5 xl:mt-20 space-x-10 xl:space-x-0'>
            <button className='my-auto text-[10px] lg:text-xl text-[#0170BF] transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-16 w-32 lg:w-40 md:w-48 mb-10 border-4 border-[#F5CBD5] bg-transparent'
              onClick={() => router.push('/home')}>ENTER
            </button>

            <button className='my-auto text-[10px] lg:text-xl text-white transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-16 w-32 lg:w-40 md:w-48 mb-10 bg-[#0170BF]'
              onClick={() => router.push('/test-request')}>Request Access
            </button>
          </div>

        </div>

        {/* video */}
        <div
          className='hidden xl:inline z-40 relative h-[578px] w-[578px] flex-shrink-0'

        >
          <div
            className='absolute top-16 left-0 bottom-16 w-20  bg-gradient-to-l from-[#0C0D12] to-transparent '
          />
          <div
            className='absolute top-16 right-0 bottom-16 w-20 bg-gradient-to-r from-[#0C0D12] to-transparent '
          />
          <div
            className='absolute top-0 left-16 right-16 h-20  bg-gradient-to-t from-[#0C0D12] to-transparent '
          />
          <div
            className='absolute bottom-0 left-16 right-16 h-20   bg-gradient-to-b from-[#0C0D12] to-transparent '
          />
          <div
            className='absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-bl from-[#141011] to-transparent'
          />
          <video
            className='h-[450px] w-[450px] z-40 m-16'
            autoPlay={true}
            loop
            ref={vidRef}
            muted
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FpXCnTPC9Ldt415MRlPNF%2Fimage?alt=media&token=e2381e66-eee4-4e22-b4bd-1ed563fa434e'
          />
        </div>


      </div>







      <div className='absolute bottom-4 left-0 right-0 h-10 flex items-center justify-center z-50'>
        <a className=''
          href={'#contact'}>
          <ChevronDownIcon className='h-8 text-white cursor-pointer ' />
        </a>
      </div>
    </section>
  );
};

export default Hero;
