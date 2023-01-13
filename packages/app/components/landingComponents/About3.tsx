// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ArrowDownIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React from 'react';

import logo4 from '../../images/logo4.svg';

const About = (): JSX.Element => {
  return (
    <section className='h-screen snap-center relative bg-black'
      id='about'>
      <div className='relative flex flex-col items-center justify-center h-screen px-10 mx-auto text-center max-w-7xl md:flex-row md:text-left'>
        <p className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          About
        </p>

        <motion.img
          alt='Choko Wallet'
          className='w-20 h-20 mr-32 flex-shrink-0 rounded-full object-cover '


          /* eslint-disable */
          // @ts-ignore
          src='https://www.thisiscolossal.com/wp-content/uploads/2014/03/120430.gif'
        /* eslint-enable */
        />

        <motion.img
          alt='Choko Wallet'
          className='w-20 h-20 mr-32 flex-shrink-0 rounded-full object-cover '
          animate={{
            // scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 360],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}

          /* eslint-disable */
          // @ts-ignore
          src='https://www.thisiscolossal.com/wp-content/uploads/2014/03/120430.gif'
        /* eslint-enable */
        />

        <motion.img
          alt='Choko Wallet'
          className='w-20 h-20 flex-shrink-0 rounded-full object-cover '
          animate={{
            scale: [1, 2, 2, 1, 1],
            rotate: [0, 0, 180, 180, 0],
            borderRadius: ["0%", "0%", "50%", "50%", "0%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 1
          }}

          /* eslint-disable */
          // @ts-ignore
          src='https://www.thisiscolossal.com/wp-content/uploads/2014/03/120430.gif'
        /* eslint-enable */

        />


        <img
          alt='Choko Wallet'
          className='w-20 h-20 ml-36 mb-5 flex-shrink-0 rounded-full object-cover md:mb-0 md:rounded-lg md:w-64 md:h-64 md:mt-0 2xl:w-[500px] 2xl:h-[500px]'

          /* eslint-disable */
          // @ts-ignore

          src='https://steamuserimages-a.akamaihd.net/ugc/1688275952686404152/803DFB22DBD6FBADC1D3D7CB74D177781E2CB921/?imw=637&imh=358&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true'
        /* eslint-enable */

        />
      </div>


    </section>
  );
};

export default About;
