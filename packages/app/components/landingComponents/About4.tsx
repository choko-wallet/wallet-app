// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { fadeIn, planetVariants, staggerContainer, textContainer, textVariant2 } from '@choko-wallet/app-utils/motion';
import { ArrowDownIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React from 'react';
import Image from 'next/image';

import logo from '../../images/logo2.png';
import { ImageOptimizerCache } from 'next/dist/server/image-optimizer';
import BackgroundCircle2 from './BackgroundCircle2';

const About = (): JSX.Element => {
  return (
    <section className='h-screen snap-center relative bg-[#013368]'
      id='about'>
      <div className='h-screen mx-auto w-[1000px] flex items-center  justify-center'>


        <motion.img
          alt='Choko Wallet'
          className='w-48 h-48 flex-shrink-0 rounded-full object-cover absolute top-24 left-[-50px]'

          animate={{
            x: [0, 1500, 2000, 6000],
            // opacity: [0.5, 1, 1, 1, 0],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"]
          }}
          transition={{
            duration: 4.4,
            // repeat: Infinity,
            // repeatDelay: 1
          }}

          /* eslint-disable */
          // @ts-ignore

          src='https://i0.wp.com/www.printmag.com/wp-content/uploads/2021/02/4cbe8d_f1ed2800a49649848102c68fc5a66e53mv2.gif?fit=476%2C280&ssl=1'
        /* eslint-enable */
        />


        <motion.img
          alt='Choko Wallet'
          className='w-40 h-40 flex-shrink-0 rounded-full object-cover absolute z-10'
          initial={{// 防止闪现 
            opacity: 0,
          }}
          animate={{
            scale: [0, 1, 2, 2, 1, 1],
            rotate: [0, 0, 90, 180, 180, 0],
            // scale: [1, 2, 2, 1, 1],
            // rotate: [0, 0, 180, 180, 0],
            opacity: [0, 1, 1, 1, 1, 1],
            // borderRadius: ["0%", "0%", "50%", "50%", "0%"]
          }}
          transition={{
            duration: 2,
            delay: 4.4,
          }}
          /* eslint-disable */
          // @ts-ignore
          src={logo.src}
        /* eslint-enable */
        />


        <motion.div
          className='absolute pb-[600px] w-full mx-auto'
          initial='hidden'
          variants={staggerContainer}
          viewport={{ amount: 0.25, once: true }}
          whileInView='show'
        >
          <motion.div
            className='flex justify-center items-center flex-col '
            variants={fadeIn('down', 'tween', 5.9, 1)}
          >
            <motion.p
              className='font-normal text-[34px] text-white'
              variants={textContainer}
            >
              {Array.from('Choko Wallet').map((letter, index) => (
                <motion.span key={index}
                  variants={textVariant2}>
                  {letter === ' ' ? '\u00A0' : letter}
                </motion.span>
              ))}
            </motion.p>

          </motion.div>
        </motion.div>

        <BackgroundCircle2 />


        {/* 三个圆 */}
        <motion.div
          initial={{
            y: 0,
            x: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 3.0,
          }}
          whileInView={{
            x: 350,
            y: -350,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <motion.div
            initial={{
              y: -300,
              x: -400,
              opacity: 0.8,
            }}
            transition={{
              duration: 1.0,
              type: 'spring',
              delay: 0.4,
            }}
            whileInView={{
              y: 300,
              x: -400,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className='w-[100px] h-[100px] bg-purple-500 rounded-full absolute'

          />
        </motion.div>


        <motion.div
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 3.0,
          }}
          whileInView={{
            x: 0,
            y: -350,
            opacity: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          <motion.div
            initial={{
              y: -300,
              x: -50,
              opacity: 0.8,
            }}
            transition={{
              duration: 1.0,
              type: 'spring',
              delay: 0.7,
            }}
            whileInView={{
              y: 300,
              x: -50,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className='w-[100px] h-[100px] bg-red-500 rounded-full absolute'

          />


          {/* </motion.div> */}
        </motion.div>


        <motion.div
          initial={{
            x: 0,
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 1.5,
            delay: 3.0,
          }}
          whileInView={{
            x: -350,
            y: -350,
            opacity: 0.5,
          }}
          viewport={{
            once: true,
          }}
        >
          <motion.div
            initial={{
              x: 300,
              y: -300,
              opacity: 0.8,
            }}
            transition={{
              duration: 1.0,
              type: 'spring',
              delay: 1.0,
            }}
            whileInView={{
              y: 300,
              x: 300,
              opacity: 1,
            }}
            viewport={{
              once: true,
            }}
            className='w-[100px] h-[100px] bg-yellow-500 rounded-full absolute'

          />


          {/* </motion.div> */}
        </motion.div>

        {/* 两个button */}
        <motion.div
          className='2xl:max-w-[1280px] w-full mx-auto flex flex-col gap-2 mb-10  px-6 sm:p-8 absolute'
          initial='hidden'
          variants={staggerContainer}
          viewport={{ amount: 0.25, once: false }}
          whileInView='show'

        >

          <motion.div
            className='flex md:flex-row flex-col gap-4 pt-[600px]'
            variants={fadeIn('up', 'spring', 6.2, 1)}
          >
            <div className='w-full flex justify-center items-center'>
              <button
                className='flex items-center justify-center shadow-md m-5 hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-black rounded-[32px] '
              >
                ENTER
              </button>

            </div>
          </motion.div>

          <motion.div
            className='flex md:flex-row flex-col gap-4'
            variants={fadeIn('up', 'spring', 6.6, 1)}
          >
            <div className='w-full flex justify-center items-center'>
              <button
                className='flex items-center justify-center shadow-md m-5 hover:shadow-xl active:scale-90 transition duration-150 w-[160px] text-white cursor-pointer py-4 px-6 my-4 bg-black rounded-[32px] '
              >
                TEST
              </button>

            </div>
          </motion.div>

        </motion.div>


      </div>



    </section >
  );
};

export default About;
