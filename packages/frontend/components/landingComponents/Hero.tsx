// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Typed from 'react-typed';

import logo1 from '../../images/logo1.svg';
import BackgroundCircle from './BackgroundCircle';

const Hero = (): JSX.Element => {
  const router = useRouter();

  return (
    <section className='snap-center'
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
        <div className='z-20 flex flex-col items-center justify-center'>
          <p className='text-2xl uppercase text-gray-200 pb-2 tracking-[10px] '>
            CHOKO WALLET
          </p>
          <p className='py-6 text-2xl text-white font-mono'>
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

          <div className='flex flex-col '>
            <button className='btn btn-secondary w-36 md:w-44 mb-10'
              onClick={() => router.push('/home')}>Enter
            </button>

            <button className='btn btn-accent w-36 md:w-44 mb-10'
              onClick={() => router.push('/alpha')}>Alpha Test
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
