// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
// import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
// import { SocialIcon } from 'react-social-icons';

// import logo1 from '../../images/logo1.svg';

const Header = (): JSX.Element => {
  return (
    <div className='sticky top-0 z-20 flex items-center justify-between p-5 mx-auto max-w-screen-2xl '>
      <motion.div
        animate={{
          opacity: 1,
          scale: 1,
          x: 0

        }}
        className='flex items-center'
        initial={{
          opacity: 0,
          scale: 0.5,
          x: -500

        }}
        transition={{
          duration: 1.5
        }}
      >
        <p className='text-[20px] text-white font-roboto font-semibold '>
          CHOKO
        </p>
      </motion.div>

      <div className='flex items-center space-x-2'>
        <Link href='#contact'>
          <motion.div
            animate={{
              opacity: 1,
              scale: 1,
              x: 0

            }}
            className='flex items-center cursor-pointer'
            initial={{
              opacity: 0,
              scale: 0.5,
              x: 500

            }}
            transition={{
              duration: 1.5
            }}
          >
            {/* <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='gray'
            network='email'
          /> */}
            <p className='hidden text-sm  font-poppins text-[#F5CBD5] bg-[#2C1F28] font-bold p-2 rounded-md md:inline-flex'>
              Currently in private beta
            </p>
          </motion.div>
        </Link>

        <Link href='#contact'>
          <motion.div
            animate={{
              opacity: 1,
              scale: 1,
              x: 0

            }}
            className='flex items-center cursor-pointer'
            initial={{
              opacity: 0,
              scale: 0.5,
              x: 500

            }}
            transition={{
              duration: 1.5
            }}
          >
            {/* <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='gray'
            network='email'
          /> */}
            <p className='text-sm font-poppins text-white bg-[#2E2D29]  p-[6px] rounded-md md:inline-flex'>
              Get in touch
            </p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
