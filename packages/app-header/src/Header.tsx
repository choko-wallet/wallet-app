// Copyright 2021-2022 @choko-wallet/app-header authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  BellIcon, CogIcon, MoonIcon, SunIcon,
  // MenuIcon,
} from '@heroicons/react/outline';
import {
  MenuAlt4Icon
} from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { removeAllAccounts, toggle, useDispatch } from '@choko-wallet/app-redux';

import icon1 from '../img/icon1.png';
import logo from '../img/logo.png';
import logo2 from '../img/logo2.png';
import logout from '../img/logout.png';
import logout2 from '../img/logout2.png';
import AccountInHeader from './AccountInHeader';

function Header(): JSX.Element {
  const dispatch = useDispatch();

  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [menuIcon, setMenuIcon] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (theme !== 'dark' && theme !== 'light') {
    setTheme('light');
  }

  if (!mounted) {// 其他组件可以不需要setMounted 和 没有mouted retur nnull
    return null;
  }

  const removeAccounts = () => {
    dispatch(removeAllAccounts());
    void router.push('/');
  };

  return (
    <div className='sticky top-0 z-20 backdrop-blur-lg border-none md:border-b border-[#C5CEDE]'>

      <div className='flex justify-between p-3 '>
        <div className='flex items-center justify-center ' >
          <div className='flex md:m-1 relative items-center w-[42px] h-[42px] my-auto cursor-pointer'
            onClick={() => router.push('/')}>
            {theme === 'dark'
              ? <Image
                layout='fill'
                objectFit='contain'
                src={logo.src}
              />
              : <Image
                layout='fill'
                objectFit='contain'
                src={logo2.src}
              />
            }
          </div>
        </div>

        <div className='flex items-center text-gray-500 '>
          <div className='flex items-center space-x-8 text-gray-500 mr-6 '>
            <div className='hidden md:inline-flex relative items-center w-7 h-7 my-auto cursor-pointer transition duration-150 ease-out active:scale-125'
              onClick={() => router.push('/home')}
            >
              <Image
                layout='fill'
                objectFit='contain'
                src={icon1.src}
              />
            </div>

            <div className='hidden md:inline-flex relative items-center w-7 h-7 my-auto cursor-pointer'
              onClick={() => dispatch(toggle('settingsExportUrl'))}
            >

              <CogIcon className='h-7 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500 text-gray-800' />
            </div>

            <div className='hidden md:inline-flex relative transition duration-150 ease-out cursor-pointer '>
              <BellIcon className='h-7 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500 text-gray-800' />
              <div className='absolute flex items-center justify-center w-2 h-2 bg-[#4797B5] dark:bg-white rounded-full right-1 top-0'>
              </div>
            </div>

            {theme === 'light'
              ? <SunIcon className='hidden h-7 transition text-gray-800 duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 '
                onClick={() => setTheme('dark')} />
              : <MoonIcon className='hidden h-7  transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500'
                onClick={() => setTheme('light')} />
            }

          </div>

          <MenuAlt4Icon className='transition duration-150 ease-out cursor-pointer md:hidden active:scale-125 h-[22px] m-2 text-black dark:text-gray-500'
            onClick={() => setMenuIcon(!menuIcon)} />

          <AccountInHeader />

          <div className='mx-5 hidden md:inline-flex relative items-center w-7 h-7 my-auto cursor-pointer'
            onClick={removeAccounts}
          >
            {theme === 'light'
              ? <Image
                layout='fill'
                objectFit='contain'
                src={logout2.src}
              />
              : <Image
                layout='fill'
                objectFit='contain'
                src={logout.src}
              />
            }

          </div>

        </div>
      </div>

      {/* {
        menuIcon
          ? */}
      <AnimatePresence>
        {
          menuIcon
            ?
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.3 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.5, transition: { duration: 0.2 } }}
              className='flex dark:bg-[#22262f] items-center justify-center h-10 mt-2 w-full md:hidden'>
              <div className='flex items-center space-x-8 text-gray-500 mr-6 '>
                <div className='flex relative items-center w-7 h-7 my-auto cursor-pointer'
                  onClick={() => router.push('/home')}
                >
                  <Image
                    layout='fill'
                    objectFit='contain'
                    src={icon1.src}
                  />
                </div>

                <div className='flex relative items-center w-7 h-7 my-auto cursor-pointer'
                  onClick={() => router.push('/settings')}
                >
                  <CogIcon className='h-7 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500 text-gray-800' />
                </div>

                <div className='flex relative transition duration-150 ease-out cursor-pointer '>
                  <BellIcon className='h-7 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500 text-gray-800' />
                  <div className='absolute flex items-center justify-center w-2 h-2 bg-[#4797B5] dark:bg-white rounded-full right-1 top-0'>
                  </div>
                </div>

                {theme === 'light'
                  ? <SunIcon className='h-7 transition duration-150 ease-out cursor-pointer flex active:scale-125 text-gray-800'
                    onClick={() => setTheme('dark')} />
                  : <MoonIcon className='h-7 transition duration-150 ease-out cursor-pointer flex active:scale-125 dark:text-gray-500'
                    onClick={() => setTheme('light')} />
                }

              </div>

            </motion.div>
            : null
        }

      </AnimatePresence>


    </div >

  );
}

export default Header;
