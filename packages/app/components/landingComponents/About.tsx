// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import { ArrowDownIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

// import logo4 from '../../images/logo4.svg';

const About = (): JSX.Element => {
  return (
    <section className='h-screen snap-center relative bg-black'
      id='about'>

      <Image
        layout='fill'
        objectFit='cover'
        src='https://www.creativosonline.org/wp-content/uploads/2017/08/gifs-antiguos.gif'
      />
      <div className='relative flex flex-col items-center justify-center h-screen px-10 mx-auto text-center max-w-7xl md:flex-row md:text-left'>
        <p className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          About
        </p>

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
          <p className='text-2xl font-semibold md:text-4xl font-poppins text-black'>
            Choko <span className='underline decoration-[#F7AB0A]/50'>Wallet</span>
          </p>
          <p className='text-2xl font-semibold md:text-4xl font-poppins text-black'>
            A Multi-chain Crypto Wallet.

          </p>

        </motion.div>
      </div>

    </section>
  );
};

export default About;
