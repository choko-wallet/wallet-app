// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

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
        <SocialIcon
          bgColor='transparent'
          fgColor='gray'
          target='_blank'
          url='https://github.com/choko-wallet'
        />
      </motion.div>

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
          <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='gray'
            network='email'
          />
          <p className='hidden text-sm text-gray-400 uppercase md:inline-flex'>
            Get in touch
          </p>
        </motion.div>
      </Link>
    </div>
  );
};

export default Header;
