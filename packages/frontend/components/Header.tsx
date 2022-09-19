// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  BellIcon,
  ChevronDownIcon, CogIcon, MenuIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  HomeIcon, MoonIcon, SunIcon, TranslateIcon, UserIcon
} from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DropdownHeader2 from './DropdownHeader2'

import logo from '../images/logo.png'
import icon1 from '../images/icon1.png'
import setting from '../images/setting.png'
import { UserAccount } from '@choko-wallet/core';

// interface Props {
//   currentUserAccount: { [key: string]: UserAccount }
//   userAccount: { [key: string]: UserAccount };
// }


// function Header({ currentUserAccount, userAccount }: Props): JSX.Element {
function Header(): JSX.Element {

  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();
  const [menuIcon, setMenuIcon] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (

    <div className='sticky top-0 z-20 bg-white dark:bg-[#22262f] border-b border-[#435474]'>
      <div className='flex justify-between p-2 '>
        <div className='flex items-center justify-center ' >
          <div className='flex md:m-1 relative items-center w-[50px] h-[50px] md:w-[60px] md:h-[60px] my-auto cursor-pointer'
            onClick={() => router.push('/')}>
            <Image
              layout='fill'
              objectFit='contain'
              src={logo.src}
            />
          </div>
        </div>

        <div className='flex items-center text-gray-500  '>
          <div className='flex items-center space-x-8 text-gray-500 mr-6 '>
            <div className='hidden md:inline-flex relative items-center w-7 h-7 my-auto cursor-pointer'
            // onClick={() => router.push('/')}
            >
              <Image
                layout='fill'
                objectFit='contain'
                src={icon1.src}
              />
            </div>

            <div className='hidden md:inline-flex relative items-center w-7 h-7 my-auto cursor-pointer'
            // onClick={() => router.push('/')}
            >
              <Image
                layout='fill'
                objectFit='contain'
                src={setting.src}
              />
            </div>

            {/* <CogIcon className='hidden h-6 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500' /> */}
            <div className='hidden md:inline-flex relative transition duration-150 ease-out cursor-pointer '>
              <BellIcon className='h-7 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500' />
              <div className="absolute flex items-center justify-center w-2 h-2 text-xs text-white bg-white rounded-full right-1 top-0">
              </div>
            </div>

            {theme === 'light'
              ? <SunIcon className='hidden h-7 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 text-gray-500'
                onClick={() => setTheme('dark')} />
              : <MoonIcon className='hidden h-7 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500'
                onClick={() => setTheme('light')} />
            }

          </div>


          <MenuIcon onClick={() => setMenuIcon(!menuIcon)} className="transition duration-150 ease-out cursor-pointer md:hidden active:scale-125 h-8 m-2 dark:text-gray-500" />

          <DropdownHeader2 />

        </div>
      </div>
      {menuIcon ?
        <div className='flex bg-[#22262f] items-center justify-center h-10 mt-2 w-full md:hidden'>
          <div className='flex items-center space-x-8 text-gray-500 mr-6 '>
            <div className='flex relative items-center w-7 h-7 my-auto cursor-pointer'
            // onClick={() => router.push('/')}
            >
              <Image
                layout='fill'
                objectFit='contain'
                src={icon1.src}
              />
            </div>

            <div className='flex relative items-center w-7 h-7 my-auto cursor-pointer'
            // onClick={() => router.push('/')}
            >
              <Image
                layout='fill'
                objectFit='contain'
                src={setting.src}
              />
            </div>

            <div className='flex relative transition duration-150 ease-out cursor-pointer '>
              <BellIcon className='h-7 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-gray-500' />
              <div className="absolute flex items-center justify-center w-2 h-2 text-xs text-white bg-white rounded-full right-1 top-0">
              </div>
            </div>

            {theme === 'light'
              ? <SunIcon className='h-7 transition duration-150 ease-out cursor-pointer flex active:scale-125 text-gray-500'
                onClick={() => setTheme('dark')} />
              : <MoonIcon className='h-7 transition duration-150 ease-out cursor-pointer flex active:scale-125 dark:text-gray-500'
                onClick={() => setTheme('light')} />
            }

          </div>



        </div>
        : null}
    </div >



  );
}

export default Header;
