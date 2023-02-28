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

function MenuSidebar(): JSX.Element {
  const router = useRouter();
  // const controlsForOpen = useAnimation();
  // const controlsforicon1 = useAnimation();
  // const controlsforicon2 = useAnimation();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [icon1Hover, setIcon1Hover] = useState(false);
  const [icon2Hover, setIcon2Hover] = useState(false);
  const [icon3Hover, setIcon3Hover] = useState(false);
  const [icon4Hover, setIcon4Hover] = useState(false);
  const [icon5Hover, setIcon5Hover] = useState(false);
  const [icon6Hover, setIcon6Hover] = useState(false);

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

        transition={{ layout: { duration: 0.6, type: 'spring' } }}>

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
              animate={{ opacity: 1, x: 0 }}
              className='w-[170px]'
              initial={{ opacity: 0, x: 60 }}
              transition={{ duration: 0.4 }}
            >

              <p className='w-full h-full text-white font-roboto text-[20px]'>CHOKO</p>
            </motion.div>
          )}

        </motion.div>

        {/* 四个圆圈icon */}
        <motion.div
          className='flex items-center justify-center group relative mb-6 cursor-pointer'
          onMouseOut={() => setIcon1Hover(false)}
          onMouseOver={() => setIcon1Hover(true)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >

            <motion.div
              // className='w-[32px] h-[32px] mx-auto relative group-hover:hidden'
              // layout='position'
              className={`w-[32px] h-[32px] mx-auto relative ${sidebarOpen ? 'hidden' : 'flex'}`}
            >
              <Image
                layout='fill'
                objectFit='contain'
                onClick={() => router.push('/home')}
                src={icon1.src}
              />
            </motion.div>
            <motion.div
              // className='w-[32px] h-[32px] mx-auto relative hidden group-hover:flex'
              className={`w-[32px] h-[32px] mx-auto relative ${sidebarOpen ? 'flex' : 'hidden'}`}
            // layout='position'
            >
              <Image
                layout='fill'
                objectFit='contain'
                onClick={() => router.push('/home')}
                src={icon2.src}
              />
            </motion.div>

            {/* <motion.div
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
            </motion.div> */}

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className='w-[170px]'
              initial={{ opacity: 0, x: 60 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {/* <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Dashboard</p> */}
              <p className={`w-full h-full font-roboto text-[17px] ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`}>Dashboard</p>
            </motion.div>
          )}

          {icon1Hover && (
            <motion.div
              animate={{ width: 100 }}
              className='h-[2px] bg-yellow-300 absolute bottom-0 rounded-full'
              initial={{ width: 0 }}
              transition={{ duration: 0.3 }}
            >
            </motion.div>
          )}

        </motion.div>

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer'
          onMouseOut={() => setIcon2Hover(false)}
          onMouseOver={() => setIcon2Hover(true)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              {/* <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' /> */}
              <CreditCardIcon className={`h-7 w-7  ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`} />

            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className='w-[170px]'
              initial={{ opacity: 0, x: 60 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {/* <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p> */}
              <p className={`pl-3 w-full h-full font-roboto text-[17px] ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`}>Wallet</p>

            </motion.div>
          )}

          {icon2Hover && (
            <motion.div
              animate={{ width: 100 }}
              className='h-[2px] bg-yellow-300 absolute bottom-0 rounded-full'
              initial={{ width: 0 }}
              transition={{ duration: 0.3 }}
            >
            </motion.div>
          )}
        </motion.div>

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer'
          onMouseOut={() => setIcon3Hover(false)}
          onMouseOver={() => setIcon3Hover(true)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              {/* <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' /> */}
              <CreditCardIcon className={`h-7 w-7  ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`} />

            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className='w-[170px]'
              initial={{ opacity: 0, x: 60 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              {/* <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p> */}
              <p className={`pl-3 w-full h-full font-roboto text-[17px] ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`}>Wallet</p>

            </motion.div>
          )}

          {icon3Hover && (
            <motion.div
              animate={{ width: 100 }}
              className='h-[2px] bg-yellow-300 absolute bottom-0 rounded-full'
              initial={{ width: 0 }}
              transition={{ duration: 0.3 }}
            >
            </motion.div>
          )}

        </motion.div>

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer'
          onMouseOut={() => setIcon4Hover(false)}
          onMouseOver={() => setIcon4Hover(true)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              {/* <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' /> */}
              <CreditCardIcon className={`h-7 w-7  ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`} />

            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className='w-[170px]'
              initial={{ opacity: 0, x: 60 }}
              transition={{ delay: 0.4, duration: 0.4 }}
            >
              {/* <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p> */}
              <p className={`pl-3 w-full h-full font-roboto text-[17px] ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`}>Wallet</p>

            </motion.div>
          )}

          {icon4Hover && (
            <motion.div
              animate={{ width: 100 }}
              className='h-[2px] bg-yellow-300 absolute bottom-0 rounded-full'
              initial={{ width: 0 }}
              transition={{ duration: 0.3 }}
            >
            </motion.div>
          )}

        </motion.div>

        <motion.div
          className='flex items-center justify-center group mb-6 cursor-pointer'
          onMouseOut={() => setIcon5Hover(false)}
          onMouseOver={() => setIcon5Hover(true)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              {/* <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' /> */}
              <CreditCardIcon className={`h-7 w-7  ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`} />

            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className='w-[170px]'
              initial={{ opacity: 0, x: 60 }}
              transition={{ delay: 0.5, duration: 0.4 }}
            >
              {/* <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p> */}
              <p className={`pl-3 w-full h-full font-roboto text-[17px] ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`}>Wallet</p>
            </motion.div>
          )}

          {icon5Hover && (
            <motion.div
              animate={{ width: 100 }}
              className='h-[2px] bg-yellow-300 absolute bottom-0 rounded-full'
              initial={{ width: 0 }}
              transition={{ duration: 0.3 }}
            >
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
          onMouseOut={() => setIcon6Hover(false)}
          onMouseOver={() => setIcon6Hover(true)}
          whileHover={{ scale: 1.1 }}
        >
          <motion.div
            className='w-[90px]'
            layout='position'
          >
            <div className='w-[32px] h-[32px] mx-auto relative '>
              {/* <CreditCardIcon className='h-7 w-7 text-[#747474] group-hover:text-white' /> */}
              <CreditCardIcon className={`h-7 w-7  ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`} />

            </div>

          </motion.div>

          {sidebarOpen && (
            <motion.div
              animate={{ opacity: 1, x: 0 }}
              className='w-[170px]'
              initial={{ opacity: 0, x: 60 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {/* <p className='w-full h-full text-[#747474] group-hover:text-white font-roboto text-[17px]'>Wallet</p> */}
              <p className={`pl-3 w-full h-full font-roboto text-[17px] ${sidebarOpen ? 'text-white' : 'text-[#747474]'}`}>Wallet</p>

            </motion.div>
          )}

          {icon6Hover && (
            <motion.div
              animate={{ width: 100 }}
              className='h-[2px] bg-yellow-300 absolute bottom-0 rounded-full'
              initial={{ width: 0 }}
              transition={{ duration: 0.3 }}
            >
            </motion.div>
          )}

        </motion.div>

      </ motion.div>

    </>
  );
}

export default MenuSidebar;
