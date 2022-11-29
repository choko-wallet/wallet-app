// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  BellIcon, CogIcon,
  MenuIcon,
  MoonIcon, SunIcon
} from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { removeAllAccounts } from '../features/slices/user';
import icon1 from '../images/icon1.png';
import logo from '../images/logo.png';
import logo2 from '../images/logo2.png';
import logout from '../images/logout.png';
import logout2 from '../images/logout2.png';
import AccountInHeader from './account/AccountInHeader';

function Header(): JSX.Element {
  const dispatch = useDispatch();

  const router = useRouter();
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);
  const [menuIcon, setMenuIcon] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const removeAccounts = () => {
    dispatch(removeAllAccounts());
    void router.push('/');
  };

  return (
    <div className='sticky top-0 z-20 backdrop-blur-lg border-b border-[#C5CEDE]'>

      <div className='flex justify-between p-2 '>
        <div className='flex items-center justify-center ' >
          <div className='flex md:m-1 relative items-center w-[45px] h-[45px] my-auto cursor-pointer'
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

        <div className='flex items-center text-gray-500  '>
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
              onClick={() => router.push('/settings')}
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

          <MenuIcon className='transition duration-150 ease-out cursor-pointer md:hidden active:scale-125 h-8 m-2 dark:text-gray-500'
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
      {
        menuIcon
          ? <div className='flex dark:bg-[#22262f] items-center justify-center h-10 mt-2 w-full md:hidden'>
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

          </div>
          : null
      }
    </div >

  );
}

export default Header;
