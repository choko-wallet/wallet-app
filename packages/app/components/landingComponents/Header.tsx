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
        <p className='text-[15px] md:text-[20px] text-white font-roboto font-semibold '>
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
            <p className='border border-[#F5CBD5] hidden sm:inline-flex text-[12px] font-poppins text-[#F5CBD5] bg-transparent  p-2 rounded-md '>
              Buy us a Chocolate Milk
            </p>
            <p className='border border-[#F5CBD5] flex sm:hidden text-[10px] font-poppins text-[#F5CBD5] bg-transparent  p-1 rounded-md '>
              Donate
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
            <p className='border border-gray-600 text-sm font-poppins text-white bg-[#F5CBD5]/30 p-1 sm:p-2 rounded-md md:inline-flex'>
              Get in touch
            </p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
