// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowDownIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React from 'react';

import logo4 from '../../images/logo4.svg';

const About = (): JSX.Element => {
  return (
    <section className='h-screen snap-center relative'
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

          src={logo4.src}
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
          {/* <p className='text-sm md:text-base'>
            SkyeKiwi is a privacy layer for blockchains.
            A Substrate-based privacy-first blockchain for concealed smart contract execution with interoperability and novel economic models of data ownership.
          </p> */}
        </motion.div>
      </div>

      <div className='absolute bottom-8 left-0 right-0 h-10 flex items-center justify-center '>
        <a className=''
          href={'#contact'}>
          <ArrowDownIcon className='h-8 text-[#888888] cursor-pointer ' />
        </a>
      </div>
    </section>
  );
};

export default About;
