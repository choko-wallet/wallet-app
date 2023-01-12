// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { SocialIcon } from 'react-social-icons';
import Image from 'next/image';
import logo1 from '../../images/logo1.svg';

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
        <p className='text-[20px] text-white  font-bold  '>
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
            <p className='hidden text-sm text-[#F5CBD5] bg-[#2C1F28] font-bold p-2 rounded-md md:inline-flex'>
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
            <p className='hidden text-sm text-gray-400 bg-[#302B2F] border border-[#5F5A5E] p-2 rounded-md md:inline-flex'>
              Get in touch
            </p>
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
