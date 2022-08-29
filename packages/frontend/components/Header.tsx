// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import {
  BellIcon,
  ChevronDownIcon, CogIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  HomeIcon, MoonIcon, SunIcon, TranslateIcon, UserIcon
} from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import icon from '../images/btc.png';

function Header(): JSX.Element {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showpass, setShowpass] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { setTheme, theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setAccountNumber('222222222222222222222');
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className='sticky top-0 z-50 bg-transparent'>
      <div className='flex justify-between max-w-6xl p-2 lg:mx-auto'>
        <div className='flex items-center justify-center space-x-10' >
          <div className='relative items-center w-10 h-10 my-auto cursor-pointer'
            onClick={() => router.push('/')}>
            <Image
              layout='fill'
              objectFit='contain'
              src={icon}
            />
          </div>


        </div>

        {/* 下拉框需要调整对齐 可用items-start或justify-start */}
        <div className='flex items-center text-gray-500 '>

          <div className='flex items-center space-x-8 text-gray-500 mr-6 '>
            <HomeIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125'
              onClick={() => router.push('/home')} />

            <BellIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125' />
            <CogIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125' />


          </div>
          {theme === 'light'
            ? <SunIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125'
              onClick={() => setTheme('dark')} />
            : <MoonIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125'
              onClick={() => setTheme('light')} />
          }

          <div className='dropdown dropdown-hover'>
            <label className='btn m-1 border-transparent hover:border-transparent bg-transparent hover:bg-transparent text-gray-900 !outline-none'>
              <TranslateIcon className='h-5 cursor-pointer ' />
              <ChevronDownIcon className='h-5 cursor-pointer ' />
            </label>
            <ul className='p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52'>
              <li><a>English</a></li>
              <li><a>中文</a></li>
            </ul>
          </div>



        </div>

      </div>
    </div >
  );
}

export default Header;
