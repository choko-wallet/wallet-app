// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CreditCardIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

import icon1 from '../images/icon1.png';
import icon2 from '../images/icon2.png';
import logo from '../images/logo.png';

function MenuSidebar (): JSX.Element {
  const router = useRouter();
  // const controlsForOpen = useAnimation();
  // const controlsforicon1 = useAnimation();
  // const controlsforicon2 = useAnimation();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>

      <motion.div
        className='absolute top-0 left-0 bottom-0 bg-[#1A1A1A] z-50 '
        layout
        // onClick={() => setSidebarOpen(!sidebarOpen)}
        // onMouseOver={() => controlsForOpen.start({ opacity: 100 })}
        // onMouseOut={() => !sidebarOpen && controlsForOpen.start({ opacity: 0 })}

        onMouseOut={() => setSidebarOpen(false)}
        onMouseOver={() => setSidebarOpen(true)}

        transition={{ layout: { duration: 0.6, type: 'tween' } }}>

        {/* logo */}
        <motion.div
          className='flex items-center justify-center group mt-[40px] mb-[70px]'
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[38px] h-[38px] mx-auto relative '>
              <Image
                layout='fill'
                objectFit='contain'
                onClick={() => router.push('/')}
                src={logo.src}
              />
            </div>
          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className='w-[170px]'
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >

              <p className='w-full h-full text-white font-roboto text-[20px]'>CHOKO</p>
            </motion.div>
          )}

        </motion.div>

        {/* 四个圆圈icon */}
        <motion.div
          className='flex items-center justify-center group relative mb-6 cursor-pointer'
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <motion.div
              className='w-[32px] h-[32px] mx-auto relative group-hover:hidden'
              layout='position'>
              <Image
                layout='fill'
                objectFit='contain'
                onClick={() => router.push('/home')}
                src={icon1.src}
              />
            </motion.div>
            <motion.div
              className='w-[32px] h-[32px] mx-auto relative hidden group-hover:flex'
              layout='position'>
              <Image
                layout='fill'
                objectFit='contain'
                onClick={() => router.push('/home')}
                src={icon2.src}
              />
            </motion.div>
          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className='w-[170px]'
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Dashboard</p>

            </motion.div>
          )}

        </motion.div>

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer'
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' />
            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className='w-[170px]'
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p>

            </motion.div>
          )}

        </motion.div>

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer'
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' />
            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className='w-[170px]'
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p>

            </motion.div>
          )}

        </motion.div>

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer'
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' />
            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className='w-[170px]'
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p>

            </motion.div>
          )}

        </motion.div>

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer'
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' />
            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className='w-[170px]'
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p>

            </motion.div>
          )}

        </motion.div>

        {/* 箭头拉伸 */}
        {/* <motion.div
          className=" h-10 w-10 ml-5 mt-10"
          animate={controlsForOpen}
          layout='position'
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <motion.div
            className=""
            animate={{ rotate: sidebarOpen ? 0 : 180 }}
          >
            <ChevronLeftIcon className='h-8 w-8 text-[#747474] hover:text-white  cursor-pointer' />
          </motion.div>
        </motion.div> */}

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer absolute bottom-5'
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' />
            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1 }}
              className='w-[170px]'
              initial={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p>

            </motion.div>
          )}

        </motion.div>

      </ motion.div>

    </>
  );
}

export default MenuSidebar;
