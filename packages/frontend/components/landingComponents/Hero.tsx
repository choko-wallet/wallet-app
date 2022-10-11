// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Typed from 'react-typed';

import logo1 from '../../images/logo1.svg';
import BackgroundCircle from './BackgroundCircle';

// type Props = {};

const Hero = (): JSX.Element => {
  const router = useRouter();

  return (
    <section className='snap-center'
      id='hero'>
      <div className='flex flex-col items-center justify-center h-screen space-y-8 overflow-hidden text-center '>
        <BackgroundCircle />
        <Image
          alt='choko wallet'
          // src='https://avatars.githubusercontent.com/u/110252171?s=200&v=4'
          className='relative object-cover mx-auto rounded-full'
          height={180}
          src={logo1}
          width={180}
        />
        <div className='z-20'>
          <h2 className='text-2xl uppercase text-gray-200 pb-2 tracking-[10px] '>
            CHOKO WALLET
          </h2>
          <h1 className='px-10 text-2xl font-semibold md:text-3xl'>
          </h1>
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
          <button className='btn btn-secondary w-36 md:w-44 mb-10'
            onClick={() => router.push('/home')}>Enter
          </button><br />

          <button className='btn btn-accent w-36 md:w-44 mb-10'
            onClick={() => router.push('/alpha')}>Alpha Test
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
