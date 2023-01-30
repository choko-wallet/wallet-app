// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowDownIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React from 'react';

import logo4 from '../../images/logo4.svg';

const About = (): JSX.Element => {
  return (
    <section className='h-screen snap-center relative bg-[#013368]'
      id='about'>
      <div className='relative flex flex-col items-center justify-center h-screen px-10 mx-auto text-center max-w-7xl md:flex-row md:text-left'>
        <p className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          About
        </p>

        <motion.img
          alt='Choko Wallet'
          className='w-48 h-48 mt-10 mb-5 flex-shrink-0 rounded-full object-cover md:mb-0 md:rounded-lg md:w-64 md:h-64 md:mt-0 2xl:w-[500px] 2xl:h-[500px]'
          initial={{
            opacity: 0,
            x: -200

          }}
          /* eslint-disable */
          // @ts-ignore

          src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1'
          /* eslint-enable */

          transition={{
            duration: 1.5
          }}
          whileInView={{
            opacity: 1,
            x: 0

          }}
        />

        <motion.div
          className='px-0 space-y-10 md:px-10 lg:px-20'
          initial={{
            opacity: 0
          }}
          transition={{
            duration: 1.5
          }}
          whileInView={{
            opacity: 1
          }}
        >
          <p className='text-2xl font-semibold md:text-4xl font-poppins'>
            Choko <span className='underline decoration-[#F7AB0A]/50'>Wallet</span>
          </p>
          <p className='text-sm md:text-base font-poppins'>
            A Multi-chain Crypto Wallet.

          </p>

        </motion.div>
      </div>


    </section>
  );
};

export default About;