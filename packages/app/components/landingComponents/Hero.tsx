// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon } from "@heroicons/react/outline";
import { motion } from "framer-motion";
import Image from "next/image";
import { useSession } from "next-auth/react";
// import { useRouter } from 'next/router';
// import { signOut } from 'next-auth/react';
import React, { useEffect } from "react";
import Typed from "react-typed";

// import BackgroundCircle from './BackgroundCircle';
import { setOpen, useDispatch } from "@choko-wallet/app-redux";
import { fadeIn, staggerContainer } from "@choko-wallet/app-utils";

import bg from "../../images/bg.png";
import landingGIF from "../../images/landing1.gif";
// import EmailPostModal from "../modal/EmailPostModal";
import LoginModal from "../modal/LoginModal";
import LoginModal2 from "../modal/LoginModal2";
import LoginModal3 from "../modal/LoginModal3";
import ThreeDEarth from "./ThreeDEarth";
import ThreeDEarthZoom from "./ThreeDEarthZoom";
import ThreeDStarBg from "./ThreeDStarBg";

interface Props {
  currentStep: number;
  enterChoko: () => Promise<void>;
}
const Hero = ({ currentStep, enterChoko }: Props): JSX.Element => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  console.log("hero-session", session);
  if (!currentStep) return null; // unexpected

  return (
    <section className='snap-center relative' id='hero'>
      <div className='relative h-screen w-full bg-[#050816]'>
        <ThreeDStarBg />
        {/* <Image className='' layout='fill' objectFit='cover' src={bg} /> */}
      </div>

      <div className='absolute top-0 bottom-0 left-0 right-0 z-10 lg:flex lg:items-center lg:justify-center '>
        {/* <div className=' mt-[90px] lg:mt-[0px] z-20 flex flex-col items-center lg:items-start lg:w-[600px] xl:w-[800px] lg:pt-6 pb-5 lg:ml-20'> */}

        <motion.div
          className='flex flex-col items-center justify-evenly h-full lg:h-fit pt-[60px] pb-10 px-5 lg:items-start lg:w-[500px] xl:w-[700px] lg:pt-6 xl:ml-20  '
          initial='hidden'
          variants={staggerContainer}
          viewport={{ amount: 0.25, once: false }}
          whileInView='show'
        >
          {/* <div className='flex flex-col items-center justify-center xl:flex-row lg:items-start'> */}
          <motion.div
            className='flex flex-col items-center justify-center lg:items-start'
            variants={fadeIn("up", "spring", 0.5, 1)}
          >
            <p className='text-[22px] sm:text-[26px] md:text-[36px] lg:text-[46px] xl:text-[60px]  h-10 text-white font-poppins'>
              The{" "}
              <Typed
                backSpeed={20}
                loop
                strings={[
                  "Easy to use",
                  "Gasless",
                  "Seedless",
                  "Secure",
                  "Chain Agnostic",
                ]}
                typeSpeed={100}
              />
            </p>
            <br />
            <p className=' lg:mt-3 xl:mt-5 text-[22px] sm:text-[26px] mt-3  md:text-[36px] lg:text-[46px] xl:text-[60px] h-10 md:h-16 text-white font-poppins'>
              Web3 Portal
            </p>
          </motion.div>

          <motion.div variants={fadeIn("up", "spring", 0.8, 1)}>
            <p className='text-[15px] sm:text-[15px] md:text-[15px] xl:text-[20px] lg:px-0 lg:mt-10 pb-2 lg:mx-0 max-w-[450px] md:max-w-[550px] lg:max-w-[600px] xl:max-w-[600px] mx-auto font-inter  text-[#FFFFFE] text-start '>
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
          <div className='block  lg:hidden z-40 relative flex-shrink-0 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]'>
            {/* <img
                alt=''
                className='z-40 m-1 object-contain '
                src={landingGIF.src}
              /> */}
            <ThreeDEarth />
          </div>
          {/* </motion.div> */}

          {/* <div className='flex lg:flex-col lg:mt-20 space-x-10 lg:space-x-0'> */}
          <motion.div
            className='flex w-full lg:w-fit max-w-[300px] md:max-w-[400px]'
            variants={fadeIn("up", "spring", 1.1, 1)}
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
                  href={"https://forms.gle/BNSZygZg1UyL1AdT6"}
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

        {/* <motion.div
          animate={{
            opacity: 1,
            scale: 1,
            x: 0,
          }}
          className='flex items-center cursor-pointer'
          initial={{
            opacity: 0,
            scale: 0.2,
            x: 0,
          }}
          transition={{
            duration: 1.5,
          }}
        > */}
        <div className='hidden lg:inline z-40  lg:h-[550px] lg:w-[450px] xl:h-[660px] xl:w-[600px] '>
          {/* className='xl:flex-1 xl:h-auto md:h-[550px] h-[350px]' */}
          {/* <img
            alt=''
            className='z-40 m-12 object-contain w-[400px] h-[400px] xl:w-[400px] xl:h-[400px]'
            src={landingGIF.src}
          /> */}
          <ThreeDEarthZoom />
        </div>
        {/* </motion.div> */}
      </div>

      <div className='absolute bottom-3 left-0 right-0 h-10 flex items-center justify-center z-50'>
        <a className='' href={"#contact"}>
          <ChevronDownIcon className='h-8 text-gray-400 cursor-pointer animate-pulse ' />
          {/* <ChevronDownIcon className='h-8 text-gray-400 cursor-pointer ' /> */}
        </a>
      </div>

      {/* <div className='absolute xs:bottom-5 bottom-20 w-full justify-center items-center hidden lg:inline-flex'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-gray-400 flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              className='w-3 h-3 rounded-full bg-gray-400 mb-1 animate-pulse '
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            />
          </div>
        </a>
      </div>

      <div className='absolute xs:bottom-20 bottom-40 w-full justify-center items-center hidden lg:inline-flex'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-2 border-gray-400 flex justify-center items-start p-2'>
            <motion.div
              animate={{
                y: [0, 24, 0]
              }}
              className='w-3 h-3 rounded-full mb-1'
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'loop'
              }}
            >
              <ChevronDownIcon className='h-7 text-blue-400 cursor-pointer -ml-[8px] ' />
            </motion.div>
          </div>
        </a>
      </div> */}

      {/* <EmailPostModal /> */}
      <LoginModal />
      <LoginModal2 />
      <LoginModal3 enterChoko={enterChoko} />
    </section>
  );
};

export default Hero;
