// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Typed from 'react-typed';

import logo1 from '../../images/logo1.svg';
import BackgroundCircle from './BackgroundCircle';

const Hero = (): JSX.Element => {
  const router = useRouter();

  return (
    <section className='snap-center relative'
      id='hero'>
      <div className='flex flex-col items-center justify-center h-screen space-y-8 overflow-hidden text-center '>
        <BackgroundCircle />
        <Image
          alt='choko wallet'
          className='relative object-cover mx-auto rounded-full'
          height={180}
          /* eslint-disable */
          // @ts-ignore
          src={logo1}
          /* eslint-enable */
          width={180}
        />
        <div className='z-20 flex flex-col items-center justify-center lg:pt-6 pb-5 md:pb-10 lg:pb-28'>
          <p className='text-2xl md:text-3xl font-bold uppercase text-gray-200 pb-2 tracking-[2px] font-rubik'>
            CHOKO WALLET
          </p>
          <p className='py-6 text-[35px] lg:text-[50px] text-white font-vt323'>
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

          <div className='flex flex-col lg:mt-6'>
            <button className='py-3 mt-3 text-xl text-[#0170BF] transition duration-150
                rounded-md hover:shadow-sm active:scale-90 w-40 md:w-48 mb-10 bg-[#F5CBD5]'
            onClick={() => router.push('/home')}>ENTER
            </button>

            <button className='py-3 text-xl text-white transition duration-150
                rounded-md hover:shadow-sm active:scale-90 w-40 md:w-48 mb-10 bg-[#0170BF]'
            onClick={() => router.push('/test-request')}>BETA TEST
            </button>
          </div>

          {/* <a href={'#about'} className=''>
            <ArrowDownIcon className='h-8 text-[#888888] cursor-pointer ' />
          </a> */}

        </div>
      </div>

      <div className='absolute bottom-8 left-0 right-0 h-10 flex items-center justify-center '>
        <a className=''
          href={'#about'}>
          <ChevronDownIcon className='h-8 text-white cursor-pointer ' />
        </a>
      </div>
    </section>
  );
};

export default Hero;
