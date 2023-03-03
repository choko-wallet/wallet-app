// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { ChevronDownIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import Typed from 'react-typed';

// import BackgroundCircle from './BackgroundCircle';
import { setOpen, useDispatch } from '@choko-wallet/app-redux';
import { fadeIn, staggerContainer } from '@choko-wallet/app-utils';

import bg from '../../images/bg.png';
import landingGIF from '../../images/landing1.gif';
import EmailPostModal from '../modal/EmailPostModal';
import LoginModal from '../modal/LoginModal';
import { signOut } from 'next-auth/react';

const Hero = (): JSX.Element => {
  const dispatch = useDispatch();
  // const vidRef = useRef();

  // useEffect(() => { vidRef.current.play(); }, []);

  return (
    <section className='snap-center relative'
      id='hero'>
      <div className='relative h-screen w-full'>
        <Image
          className=''
          layout='fill'
          objectFit='cover'
          src={bg}
        />
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
            variants={fadeIn('up', 'spring', 0.5, 1)}
          >

            <p className='text-[22px] sm:text-[26px] md:text-[36px] lg:text-[46px] xl:text-[60px]  h-10 text-white font-vt323'>
              <Typed
                backSpeed={20}
                loop
                strings={[
                  'Easy to use',
                  'Account abstraction',
                  'Gas-less',
                  'Secure',
                  'Multi-chain'
                ]}
                typeSpeed={100} />....
            </p>
            <p className=' lg:mt-3 xl:mt-5 text-[22px] sm:text-[26px]  md:text-[36px] lg:text-[46px] xl:text-[60px] h-10 md:h-16 text-white font-vt323'>
              MPC social wallet
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn('up', 'spring', 0.8, 1)}
          >
            <p className='text-[10px] sm:text-[15px] md:text-[15px] xl:text-[20px] w-full lg:px-0 lg:mt-10 mt-5 pb-2 lg:mx-0 max-w-[300px] md:max-w-[400px] lg:max-w-[450px] xl:max-w-[600px] mx-auto font-inter  text-[#FFFFFE] text-start '>
              Trade, own, social and immerse in web 3.0 on your preferred blockchain
              with secured gas-less transaction and account abstraction support.
            </p>
          </motion.div>

          <motion.div
            animate={{
              opacity: 1,
              scale: 1,
              x: 0
            }}
            className=''
            initial={{
              opacity: 0,
              scale: 0.2,
              x: 0
            }}
            transition={{
              duration: 1.5
            }}
          >
            <div
              className='block lg:hidden z-40 relative flex-shrink-0 w-[140px] h-[140px] sm:w-[180px] sm:h-[180px] md:w-[220px] md:h-[220px]'
            >
              <img
                alt=''
                className='z-40 m-1 object-contain '
                src={landingGIF.src}
              />
            </div>
          </motion.div>

          {/* <div className='flex lg:flex-col lg:mt-20 space-x-10 lg:space-x-0'> */}
          <motion.div
            className='flex w-full lg:w-fit max-w-[300px] md:max-w-[400px]'
            variants={fadeIn('up', 'spring', 1.1, 1)}
          >

            {/* {session
              ? <div className='flex items-center justify-between my-10'>
                <img alt=''
                  className='rounded-full border p-[2px] w-16 h-16 '
                  src={session?.user?.image} />

                <div className='flex-1 mx-4'>
                  <h2 className='font-bold'>{session?.user?.name}</h2>
                  <h3 className='text-sm text-gray-400'>Welcome to ChokoWallet</h3>

                </div>

                <button className='text-sm font-semibold text-blue-400'
                  onClick={() => signOut()}>Sign Out</button>
              </div>
              : <div className='flex flex-col '>
                <button className='my-auto text-[14px] lg:text-xl text-[#0170BF] transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-[56px] w-[136px] md:w-48 mb-10 border border-[#F5CBD5] bg-transparent'
                  onClick={() => signIn('google')}>Login with Google
                </button>

                <button className='my-auto text-[14px] lg:text-xl text-[#0170BF] transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-[56px] w-[136px] md:w-48 mb-10 border border-[#F5CBD5] bg-transparent'
                  onClick={() => signIn('github')}>Login with Github
                </button>
              </div>
            } */}

            <div className='space-y-2 lg:mt-16  w-full lg:w-fit ' >
              <button className='my-auto text-[10px] text-[#FDF6E3] transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-8 lg:h-[32px] w-full md:w-48 md:mb-5 bg-[#FDF6E3]/20 font-inter'
              // onClick={() => router.push('/test-request')}
              >Private beta coming soon
              </button>

              <div className='flex justify-between mx-auto w-full lg:w-[360px] space-x-2 '>
                <button className=' text-[10px] lg:text-xl text-[#0170BF] font-semibold transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-[50px] w-[136px] md:w-48 bg-white font-inter'
                  onClick={() => dispatch(setOpen('landingEmailPost'))}
                >Join beta waitlist
                </button>

                <button className=' text-[10px] lg:text-xl text-white transition duration-150 rounded-md hover:shadow-sm active:scale-90 h-10 lg:h-[50px] w-[136px] md:w-[136px] border-2 border-[#0170BF] bg-transparent font-inter'
                  onClick={() => dispatch(setOpen('landingLogin'))}
                >Enter
                </button>
              </div>
            </div>

          </motion.div>

        </motion.div>

        <motion.div
          animate={{
            opacity: 1,
            scale: 1,
            x: 0
          }}
          className='flex items-center cursor-pointer'
          initial={{
            opacity: 0,
            scale: 0.2,
            x: 0
          }}
          transition={{
            duration: 1.5
          }}
        >
          <div
            className='hidden lg:inline z-40 relative flex-shrink-0  '
          >
            <img
              alt=''
              className='z-40 m-12 object-contain w-[320px] h-[320px] xl:w-[400px] xl:h-[400px]'
              src={landingGIF.src}
            />
          </div>
        </motion.div>

      </div>

      <div className='absolute bottom-3 left-0 right-0 h-10 flex items-center justify-center z-50'>
        <a className=''
          href={'#contact'}>
          <ChevronDownIcon className='h-8 text-white cursor-pointer ' />
        </a>
      </div>

      <EmailPostModal />
      <LoginModal />


    </section>
  );
};

export default Hero;
