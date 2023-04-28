// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import BackgroundCircle from './BackgroundCircle';
import { setOpen, useDispatch } from "@choko-wallet/app-redux";
import { fadeIn, staggerContainer } from "@choko-wallet/app-utils";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  CreditCardIcon,
  IdentificationIcon,
  PlayIcon,
} from "@heroicons/react/outline";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";
// import { useRouter } from 'next/router';
// import { signOut } from 'next-auth/react';
import React from "react";
import Typed from "react-typed";

import LoginModal from "../modal/LoginModal";
import LoginModal2 from "../modal/LoginModal2";
import LoginModal3 from "../modal/LoginModal3";
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

  console.log("hero-session", session);
  if (!currentStep) return null; // unexpected

  return (
    <section className='snap-center relative' id='hero'>
      <div className='relative h-screen w-full bg-[#050816]'>
        <ThreeDStarBg />
        {/* <Image className='' layout='fill' objectFit='cover' src={bg} /> */}
      </div>

      <div className=' absolute top-0 bottom-16 left-0 right-0 z-10 lg:flex lg:items-center lg:justify-between lg:px-10 max-w-[1500px] mx-auto '>
        <motion.div
          className='flex flex-col items-center justify-evenly h-full lg:h-fit pt-[60px] pb-10 px-10 lg:items-start lg:w-[500px] xl:w-[700px] lg:pt-6 xl:ml-20 '
          initial='hidden'
          variants={staggerContainer}
          viewport={{ amount: 0.25, once: false }}
          whileInView='show'
        >
          {/* <div className='flex flex-col items-center justify-center xl:flex-row lg:items-start'> */}
          <motion.div
            className='flex flex-col items-start justify-center lg:items-start w-full max-w-[400px] pt-12 '
            variants={fadeIn("up", "spring", 0.5, 1)}
          >
            <p className='text-[35px]  md:text-[36px] lg:text-[50px] xl:text-[60px]  text-white font-vt323 font-bold whitespace-nowrap'>
              {/* The{" "} */}
              <Typed
                backSpeed={20}
                className='text-white font-semibold whitespace-nowrap'
                loop
                strings={[
                  "Easy to use",
                  "Account Abstraction",
                  "Gasless",
                  "Secure",
                  "Multi Chain",
                ]}
                typeSpeed={100}
              />{" "}
              ...
            </p>
            <br />
            <p className='-mt-10 lg:-mt-12 text-[35px]  md:text-[36px] lg:text-[50px] xl:text-[60px]  font-semibold text-white whitespace-nowrap font-vt323'>
              MPC social wallet
            </p>
          </motion.div>

          <motion.div
            className='space-y-2 lg:space-y-5 '
            variants={fadeIn("up", "spring", 0.8, 1)}
          >
            <p className='text-[10px] lg:text-[15px] xl:text-[20px] lg:px-0 lg:mt-10 lg:mx-0 max-w-[450px] md:max-w-[550px] lg:max-w-[600px] xl:max-w-[600px] mx-auto font-inter  text-white text-start '>
              Institutional-Grade Security. Consumer-Grade Interaction.
            </p>

            <p className=' text-[10px] lg:text-[15px] xl:text-[20px] lg:px-0 lg:mt-10 lg:mx-0 max-w-[450px] md:max-w-[550px] lg:max-w-[600px] xl:max-w-[600px] mx-auto font-inter  text-[#8B8C91] text-start '>
              Trade, curate and interact across blockchains with seamless
              experience in CHOKO.
            </p>
          </motion.div>

          <div className='flex lg:hidden z-40 relative flex-shrink-0 w-[220px] h-[220px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]  -m-6'>
            <ThreeDEarth zoom={false} />
          </div>

          <motion.div
            className='flex w-full lg:w-fit max-w-[300px] md:max-w-[400px]  lg:mt-12'
            variants={fadeIn("up", "spring", 1.1, 1)}
          >
            <div className='space-y-2 lg:mt-16 w-full lg:w-fit '>
              <div className='flex justify-between   mx-auto w-full lg:w-[390px]  '>
                <div className='flex-1  flex items-center justify-center'>
                  <a
                    className=''
                    href={"https://forms.gle/BNSZygZg1UyL1AdT6"}
                    rel='noreferrer'
                    target='_blank'
                  >
                    <button className=' text-[10px] lg:text-[15px]  text-[#0170BF] transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-8 lg:h-[50px] w-32 lg:w-48 bg-white font-semibold font-inter  mx-auto  ease-in-out hover:opacity-90 hover:scale-105 whitespace-nowrap '>
                      Join Beta Waitlist
                    </button>
                  </a>
                </div>

                <div className='flex-1 flex items-center justify-center'>
                  <button
                    className=' text-[12px] lg:text-[15px]  text-white transition duration-150 rounded-md hover:shadow-sm active:scale-90 w-20 lg:w-32 h-8 lg:h-[50px]  border-[1px] border-[#0170BF] font-semibold bg-transparent font-poppins  ease-in-out hover:opacity-90 hover:scale-105  '
                    onClick={() =>
                      dispatch(setOpen(`landingLogin${currentStep}`))
                    }
                  >
                    ENTER
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <div className='hidden lg:inline-flex z-40  lg:h-[550px] lg:w-[450px] xl:h-[660px] xl:w-[600px] '>
          <ThreeDEarth zoom={true} />
        </div>
      </div>

      <div className='absolute bottom-[60px] left-0 right-0 h-10 flex items-center justify-center z-50'>
        <a className='' href={"#contact"}>
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
