// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// import { SocialIcon } from 'react-social-icons';
// import logo from "../../images/logo.png";
import logo from "../../images/logoLanding.png";

const Header = (): JSX.Element => {
  return (
    <div className='sticky top-0 z-50 flex items-start justify-between p-5 mx-auto max-w-screen-2xl'>
      <motion.div
        animate={{
          opacity: 1,
          scale: 1,
          x: 0,
        }}
        className='flex'
        initial={{
          opacity: 0,
          scale: 0.5,
          x: -500,
        }}
        transition={{
          duration: 1.5,
        }}
      >
        <div className='relative items-center justify-center w-[90px] h-[32px] sm:w-[110px] sm:h-[42px] cursor-pointer pt-8'>
          <Image
            layout='fill'
            objectFit='contain'
            className=''
            src={logo.src}
          />
        </div>

        <button className='hidden lg:inline-flex items-center justify-center ml-10 mr-3  px-3 p-2 rounded-lg -mt-1 transition duration-150 ease-in-out hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95'>
          <p className=' text-[14px] text-white font-poppins font-semibold cursor-pointer whitespace-nowrap'>
            Learn
          </p>
        </button>
        <button className='hidden lg:inline-flex items-center justify-center  mr-3  px-3 p-2 rounded-lg -mt-1 transition duration-150 ease-in-out hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95'>
          <a
            className='relative  mx-[6px]'
            href={"https://medium.com/@choko_wallet"}
            rel='noreferrer'
            target='_blank'
          >
            <p className='text-[14px]  text-white font-poppins font-semibold cursor-pointer whitespace-nowrap'>
              Blog
            </p>
          </a>
        </button>
        <button className='hidden lg:inline-flex items-center justify-center  mr-3  px-3 p-2 rounded-lg -mt-1 transition duration-150 ease-in-out hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95'>
          <p className='text-[14px]  text-white font-poppins font-semibold cursor-pointer whitespace-nowrap'>
            App
          </p>
        </button>

        <button className='hidden lg:inline-flex bg-[#FDF6E3]/10  rounded-md text-[12px] font-poppins text-white items-center justify-center p-2 transition duration-150 ease-in-out hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95'>
          <p>Private Beta Brewing</p>
        </button>
      </motion.div>

      <div className='flex flex-col items-center space-x-2 '>
        <motion.div
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          className='flex flex-col lg:flex-row items-end cursor-pointer'
          initial={{
            opacity: 0,
            scale: 0.5,
            x: 500,
          }}
          transition={{
            duration: 1.5,
          }}
        >
          {/* <div className='hidden md:inline-flex h-10 w-[160px] rounded-md cursor-pointer hover:scale-105 transition duration-150 ease-out bg-gradient-to-r from-[#def9fa] via-[#7de7eb] to-[#33bbcf] p-[1px] items-center justify-center'> */}
          <button className='flex w-full h-full bg-transparent border p-2 border-[#F5CBD5] rounded-md text-[10px] lg:text-[12px] font-poppins text-[#F5CBD5] items-center justify-center transition duration-150 ease-in-out hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95 whitespace-nowrap'>
            <p>Buy us a Chocolate Milk</p>
          </button>

          <button className='flex lg:hidden bg-[#FDF6E3]/10 mt-2 rounded-md text-[10px] font-poppins text-white items-center justify-center p-2 transition duration-150 ease-in-out hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95'>
            <p>Private Beta Brewing</p>
          </button>

          <Link href='#contact'>
            {/* <div className='hidden md:inline-flex h-10 w-[160px] rounded-md cursor-pointer hover:scale-105 transition duration-150 ease-out bg-gradient-to-r from-[#def9fa] via-[#7de7eb] to-[#33bbcf] p-[1px] items-center justify-center'> */}
            <button className='hidden lg:inline-flex w-full h-full bg-[#FDF6E3]/10 rounded-md text-[12px] font-poppins text-[#B6B7BC] items-center justify-center p-2 transition duration-150 ease-in-out hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95 mx-2'>
              <p>Get in touch</p>
            </button>
            {/* </div> */}

            {/* <div className='flex md:hidden h-6 sm:h-8 w-[70px] sm:w-[90px] rounded-md cursor-pointer hover:scale-105 transition duration-150 ease-out bg-gradient-to-r from-[#def9fa] via-[#7de7eb] to-[#33bbcf] p-[1px] items-center justify-center'> */}
            {/* <button className='flex md:hidden w-full h-full bg-black rounded-md text-[10px] sm:text-[12px] font-poppins text-[#B6B7BC] items-center justify-center p-2 transition duration-150 ease-in-out hover:opacity-90 hover:scale-105 cursor-pointer active:scale-95'>
              <p>Contact</p>
            </button> */}
            {/* </div> */}

            {/* <p className='border-[1px] border-white text-[10px]  font-poppins text-white bg-[#F5CBD5]/30 p-1 sm:p-2 rounded-md md:inline-flex w-[90px] sm:w-[160px] flex items-center justify-center'>
              Get in touch
            </p> */}
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
