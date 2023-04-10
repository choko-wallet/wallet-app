// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// import { SocialIcon } from 'react-social-icons';
import logo from '../../images/logo.png';

const Header = (): JSX.Element => {
  return (
    <div className='sticky top-0 z-20 flex items-center justify-between p-5 mx-auto max-w-screen-2xl'>
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
        <div className='hidden md:inline-flex relative items-center justify-center  w-[42px] h-[42px] my-auto cursor-pointer'>
          <Image layout='fill'
            objectFit='contain'
            src={logo.src} />
        </div>
        <p className='text-[15px] md:text-[20px] text-white font-roboto font-semibold ml-2 cursor-pointer'>
          CHOKO
        </p>
        <div className='hidden lg:inline-flex items-center justify-center space-x-5 mx-16 '>
          <p className='hidden lg:inline-flex text-[14px] text-gray-400 font-roboto font-semibold cursor-pointer whitespace-nowrap'>
            How it works
          </p>
          <p className='hidden lg:inline-flex text-[14px] text-gray-400 font-roboto font-semibold cursor-pointer'>
            Features
          </p>
          <p className='hidden lg:inline-flex text-[14px] text-gray-400 font-roboto font-semibold cursor-pointer'>
            App
          </p>
          <p className='hidden lg:inline-flex text-[14px] text-gray-400 font-roboto font-semibold cursor-pointer'>
            Company
          </p>
        </div>
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
            <div className='hidden md:inline-flex h-10 w-[160px] rounded-md cursor-pointer hover:scale-105 transition duration-150 ease-out bg-gradient-to-r from-red-400 via-white to-purple-600 p-[2px] items-center justify-center'>
              <div className='w-full h-full bg-black rounded-md flex text-[12px] font-poppins text-[#F5CBD5] items-center justify-center'>
                <p>Buy us a Chocolate Milk</p>
              </div>
            </div>

            <div className='flex md:hidden h-6 sm:h-8 w-[70px] sm:w-[90px] rounded-md cursor-pointer hover:scale-105 transition duration-150 ease-out bg-gradient-to-r from-red-400 via-white to-purple-600 p-[2px] items-center justify-center'>
              <div className='w-full h-full bg-black rounded-md flex text-[10px] sm:text-[12px] font-poppins text-[#F5CBD5] items-center justify-center'>
                <p>Donate</p>
              </div>
            </div>

            {/* <p className='border-[1px] border-[#F5CBD5] hidden sm:inline-flex text-[12px] font-poppins text-[#F5CBD5] bg-transparent  p-2 rounded-md w-[160px] items-center justify-center whitespace-nowrap'>
              Buy us a Chocolate Milk
            </p> */}
            {/* <p className='border-[1px] border-[#F5CBD5] flex sm:hidden text-[10px] font-poppins text-[#F5CBD5] bg-transparent  p-1 rounded-md w-[90px] items-center justify-center'>
              Donate
            </p> */}
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
            <div className='hidden md:inline-flex h-10 w-[160px] rounded-md cursor-pointer hover:scale-105 transition duration-150 ease-out bg-gradient-to-r from-red-400 via-white to-purple-600 p-[2px] items-center justify-center'>
              <div className='w-full h-full bg-black rounded-md flex text-[12px] font-poppins text-[#F5CBD5] items-center justify-center'>
                <p>Get in touch</p>
              </div>
            </div>

            <div className='flex md:hidden h-6 sm:h-8 w-[70px] sm:w-[90px] rounded-md cursor-pointer hover:scale-105 transition duration-150 ease-out bg-gradient-to-r from-red-400 via-white to-purple-600 p-[2px] items-center justify-center'>
              <div className='w-full h-full bg-black rounded-md flex text-[10px] sm:text-[12px] font-poppins text-[#F5CBD5] items-center justify-center'>
                <p>Contact</p>
              </div>
            </div>

            {/* <p className='border-[1px] border-white text-[10px]  font-poppins text-white bg-[#F5CBD5]/30 p-1 sm:p-2 rounded-md md:inline-flex w-[90px] sm:w-[160px] flex items-center justify-center'>
              Get in touch
            </p> */}
          </motion.div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
