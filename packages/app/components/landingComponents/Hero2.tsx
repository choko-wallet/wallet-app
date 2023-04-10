// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon,
  ChevronRightIcon,
  CreditCardIcon,
  IdentificationIcon,
  PlayIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/router';
// import { signOut } from 'next-auth/react';
import React from 'react';
import Typed from 'react-typed';

// import BackgroundCircle from './BackgroundCircle';
import { setOpen, useDispatch } from '@choko-wallet/app-redux';
import { fadeIn, staggerContainer } from '@choko-wallet/app-utils';

import LoginModal from '../modal/LoginModal';
import LoginModal2 from '../modal/LoginModal2';
import LoginModal3 from '../modal/LoginModal3';
/* eslint-disable */
// @ts-ignore
import ThreeDEarth from "./ThreeDEarth";
// @ts-ignore
import ThreeDStarBg from "./ThreeDStarBg";

/* eslint-enable */

interface Props {
  currentStep: number;
  enterChoko: () => Promise<void>;
}

const Hero = ({ currentStep, enterChoko }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  console.log('hero-session', session);
  if (!currentStep) return null; // unexpected

  return (
    <section className='snap-center relative'
      id='hero'>
      <div className='relative h-screen w-full bg-[#050816]'>
        <ThreeDStarBg />
        {/* <Image className='' layout='fill' objectFit='cover' src={bg} /> */}
      </div>

      <div className='absolute top-0 bottom-16 left-0 right-0 z-10 lg:flex lg:items-center lg:justify-center '>
        <motion.div
          className='flex flex-col items-center justify-evenly h-full lg:h-fit pt-[60px] pb-10 px-5 lg:items-start lg:w-[500px] xl:w-[700px] lg:pt-6 xl:ml-20   '
          initial='hidden'
          variants={staggerContainer}
          viewport={{ amount: 0.25, once: false }}
          whileInView='show'
        >
          {/* <div className='flex flex-col items-center justify-center xl:flex-row lg:items-start'> */}
          <motion.div
            className='flex flex-col items-center justify-center lg:items-start'
            variants={fadeIn('up', 'spring', 0.5, 1)}
          >
            <p className='text-[22px] sm:text-[26px] md:text-[36px] lg:text-[46px] xl:text-[60px]  text-white font-poppins font-bold whitespace-nowrap'>
              The{' '}
              <Typed
                backSpeed={20}
                className='text-gradient font-extrabold whitespace-nowrap'
                loop
                strings={[
                  'Easy to use',
                  'Gasless',
                  'Seedless',
                  'Secure',
                  'Chain Agnostic'
                ]}
                typeSpeed={100}
              />
            </p>
            <br />
            <p className=' lg:mt-3 xl:mt-5 text-[22px] sm:text-[26px]  md:text-[36px] lg:text-[46px] xl:text-[60px] h-10 md:h-16  font-poppins font-bold text-lime-300'>
              Web3 Portal
            </p>
          </motion.div>

          <motion.div variants={fadeIn('up', 'spring', 0.8, 1)}>
            <p className='text-[15px] sm:text-[15px] md:text-[15px] xl:text-[20px] lg:px-0 lg:mt-10 lg:mx-0 max-w-[450px] md:max-w-[550px] lg:max-w-[600px] xl:max-w-[600px] mx-auto font-inter  text-[#FFFFFE] text-start '>
              Instituion Grade Security + Consumer Grade UX
            </p>
          </motion.div>

          {/* <motion.div
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
            }}
            className=''
            initial={{
              opacity: 0,
              scale: 0.2,
              x: 0,
            }}
            transition={{
              duration: 1.5,
            }}
          > */}
          <div className='flex lg:hidden z-40 relative flex-shrink-0 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]'>
            <ThreeDEarth zoom={false} />
          </div>
          {/* </motion.div> */}

          {/* <div className='flex lg:flex-col lg:mt-20 space-x-10 lg:space-x-0'> */}
          <motion.div
            className='flex w-full lg:w-fit max-w-[300px] md:max-w-[400px]'
            variants={fadeIn('up', 'spring', 1.1, 1)}
          >
            <div className='space-y-2 lg:mt-16  w-full lg:w-fit '>
              <button
                className='my-auto text-[10px] text-[#FDF6E3] transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-8 lg:h-[32px] w-full md:w-48 md:mb-5 bg-[#FDF6E3]/20 font-inter'
                // onClick={() => router.push('/test-request')}
              >
                Private beta coming soon
              </button>

              <div className='flex justify-between mx-auto w-full lg:w-[390px] space-x-2 '>
                <a
                  className='flex-1 '
                  href={'https://forms.gle/BNSZygZg1UyL1AdT6'}
                  rel='noreferrer'
                  target='_blank'
                >
                  <button className=' text-[12px] sm:text-[15px] lg:text-xl text-white transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-[50px] w-full bg-[#0170BF] font-semibold font-inter'>
                    Join Waitlist
                  </button>
                </a>

                <button
                  className=' text-[12px] sm:text-[15px] lg:text-xl text-white transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-[50px] flex-1  border-[1px] border-white font-semibold bg-transparent font-inter'
                  onClick={() =>
                    dispatch(setOpen(`landingLogin${currentStep}`))
                  }
                >
                  Enter
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className='hidden lg:inline-flex z-40  lg:h-[550px] lg:w-[450px] xl:h-[660px] xl:w-[600px] '>
          <ThreeDEarth zoom={true} />
        </div>
      </div>

      <div className='hidden lg:inline-flex absolute bottom-24 left-0 right-0 items-center justify-center z-50 '>
        <div className='flex items-center justify-center space-x-5'>
          <IdentificationIcon className='h-10 text-yellow-400 cursor-pointer animate-pulse ' />
          <p className='font-poppins'>Sign Up</p>

          <div className=' px-10'>
            <ChevronRightIcon className='h-10 text-gray-400 cursor-pointer ' />
          </div>

          <CreditCardIcon className='h-10 text-blue-400 cursor-pointer animate-pulse ' />
          <p className='font-poppins'>Transfer and trade</p>

          <div className=' px-10'>
            <ChevronRightIcon className='h-10 text-gray-400 cursor-pointer ' />
          </div>

          <PlayIcon className='h-10 text-red-400 cursor-pointer animate-pulse ' />
          <p className='font-poppins'>Play to earn</p>
        </div>
      </div>

      <div className='absolute bottom-[60px] left-0 right-0 h-10 flex items-center justify-center z-50'>
        <a className=''
          href={'#contact'}>
          <ChevronDownIcon className='h-8 text-gray-400 cursor-pointer animate-pulse ' />
          {/* <ChevronDownIcon className='h-8 text-gray-400 cursor-pointer ' /> */}
        </a>
      </div>

      <LoginModal />
      <LoginModal2 />
      <LoginModal3 enterChoko={enterChoko} />
    </section>
  );
};

export default Hero;
