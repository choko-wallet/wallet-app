// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';
import Typed from 'react-typed';

import bg from '../../images/bg.png';
import landingGIF from '../../images/landing1.gif';

import BackgroundCircle from './BackgroundCircle';

const Hero = (): JSX.Element => {
  const router = useRouter();
  // const vidRef = useRef();

  // useEffect(() => { vidRef.current.play(); }, []);

  return (
    <section className='snap-center relative' id='hero'>
      <div className='relative h-screen w-full'>
        <Image
          className=''
          src={bg}
          layout="fill"
          objectFit="cover"
        />
      </div>

      <div className='absolute top-0 bottom-0 left-0 right-0 z-10 lg:flex lg:items-center lg:justify-center '>

        <div className=' mt-[90px] lg:mt-[0px] z-20 flex flex-col items-center lg:items-start lg:w-[600px] lg:pt-6 pb-5 '>
          <div className='flex flex-col items-center justify-center lg:flex-row lg:items-start'>
            <p className=' text-[32px] lg:text-[40px]  h-10 text-white font-vt323'>
              Your <Typed
                backSpeed={20}
                loop
                strings={[
                  'easy to use',
                  'secure',
                  'multi-chain',
                  'portable',
                  'extensible']}
                typeSpeed={100} />....
            </p>
            <p className=' -mt-2 lg:mt-0 lg:ml-2 text-[32px] lg:text-[40px]  h-10 text-white font-vt323'>
              crypto wallet
            </p>
          </div>

          <p className='mt-5 text-[12px] md:hidden font-poppins text-[#F5CBD5] bg-[#2C1F28] font-semibold p-[6px] rounded-md '>
            Currently in private beta
          </p>

          <p className='text-[14px] px-10 lg:px-0 lg:mt-20 mt-10 pb-2 lg:mx-0 md:text-[20px] lg:text-[25px] max-w-[550px] mx-auto font-vt323  text-[#FFFFFE] text-start '>
            Trade, own and swap on your favorite blockchain with gasless transaction and account abstraction support.
          </p>

          <div
            className='-mt-6 block lg:hidden z-40 relative h-[310px] w-[346px] flex-shrink-0'
          >
            <img
              alt=''
              className='z-40 m-12 object-contain w-[228px] h-[194px]'
              src={landingGIF.src}
            />
          </div>

          <div className='flex lg:flex-col lg:mt-20 space-x-10 lg:space-x-0'>
            <button className='my-auto text-[14px] lg:text-xl text-[#0170BF] transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-[56px] w-[136px] md:w-48 mb-10 border border-[#F5CBD5] bg-transparent'
              onClick={() => router.push('/home')}>ENTER
            </button>

            <button className='my-auto text-[14px] lg:text-xl text-white transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-[56px] w-[136px] md:w-48 mb-10 bg-[#0170BF] font-poppins'
              onClick={() => router.push('/test-request')}>Request Access
            </button>
          </div>

        </div>


        <div
          className='hidden lg:inline z-40 relative flex-shrink-0'
        >
          <img
            alt=''
            className='z-40 m-12 object-contain w-[480px] h-[405px]'
            src={landingGIF.src}
          />
        </div>


      </div>







      <div className='absolute bottom-3 left-0 right-0 h-10 flex items-center justify-center z-50'>
        <a className=''
          href={'#contact'}>
          <ChevronDownIcon className='h-8 text-white cursor-pointer ' />
        </a>
      </div>

    </section>
  );
};

export default Hero;
