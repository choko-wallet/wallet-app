// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { BellIcon,
  ChevronDownIcon, CogIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  HomeIcon, MoonIcon, SunIcon, TranslateIcon, UserIcon } from '@heroicons/react/outline';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useEffect, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import icon from '../images/icon.png';

function Header (): JSX.Element {
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

          <div className='flex items-center space-x-8 text-gray-500 '>
            <HomeIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125'
              onClick={() => router.push('/home')} />
            <CreditCardIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125' />
            <CurrencyDollarIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125' />

            <BellIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125' />
            <CogIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125' />
            {/* <div>{origin}{items.length}{total}</div> */}

          </div>
        </div>

        {/* 下拉框需要调整对齐 可用items-start或justify-start */}
        <div className='flex items-center text-gray-500 '>

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

          <div className='dropdown dropdown-hover dropdown-end'>
            <label className='btn m-1 border-transparent hover:border-transparent bg-gray-200 hover:bg-gray-200  text-gray-900 !outline-none'>
              <UserIcon className='h-5 mr-2 cursor-pointer ' />
              2222......2222
              <ChevronDownIcon className='h-5 ml-2 cursor-pointer' />
            </label>
            <ul className='p-2 shadow dropdown-content menu bg-base-100 rounded-box w-80 '>

              <div className='bg-blue-200 card w-70 text-neutral-content '>
                <div className='items-center text-center card-body'>
                  <div className='flex items-center justify-center h-10 text-gray-600'>
                    222222
                    {!showpass
                      ? <>
                        <DotsHorizontalIcon className='h-8 text-gray-600' />
                        <DotsHorizontalIcon className='h-8 text-gray-600' />
                        <DotsHorizontalIcon className='h-8 text-gray-600' />
                      </>
                      : <span>222222222</span>}
                    2222</div>
                  <div className='justify-end card-actions'>
                    <div className='grid grid-cols-2 py-4' >

                      <CopyToClipboard onCopy={() => setCopied(true)}
                        text={accountNumber}>
                        <div className='flex items-center justify-center w-24 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer'>
                          <DuplicateIcon className='h-5 px-3 cursor-pointer' /></div>
                      </CopyToClipboard>

                      <div className='flex items-center justify-center w-24 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer'
                        onClick={() => setShowpass(!showpass)}>
                        {showpass ? <EyeIcon className='h-5 px-3 cursor-pointer ' /> : <EyeOffIcon className='h-5 px-3 cursor-pointer ' />}
                      </div>

                      {copied ? <span className='h-2 text-xs text-blue-500 ' >Copied</span> : <div className='h-2 '></div>}

                    </div>
                  </div>
                </div>
              </div>

              <li className=''
                onClick={() => router.push('/create')}><a>Create Account</a></li>
              <li className=''
                onClick={() => router.push('/importaccount')}><a>Import Account</a></li>
              <li onClick={() => router.push('/connectapp')}><a>Connect App</a></li>
              <li onClick={() => router.push('/trustedapp')}><a>Trusted App</a></li>
              <li onClick={() => router.push('/setpassword')}><a>Set Password</a></li>
              <li onClick={() => router.push('/changepassword')}><a>Change Password</a></li>
              <li onClick={() => router.push('/showpassphrase')}><a>Show Passphrase</a></li>

              <label className='btn modal-button'
                htmlFor='my-modal'>Remove Account</label>

              <input className='modal-toggle '
                id='my-modal'
                type='checkbox' />
              <div className='modal'>
                <div className='modal-box'>
                  <h3 className='text-lg font-bold'>Remove Account</h3>
                  <p className='py-4'>Remove Account</p>
                  <div className='modal-action'>
                    <label className='btn'
                      htmlFor='my-modal'
                      onClick={() => router.push('/')}>Remove</label>
                    <label className='btn'
                      htmlFor='my-modal'>Cancel</label>
                  </div>
                </div>
              </div>

            </ul>
          </div>

        </div>

        {/* <div>
          登录后显示
        </div> */}

      </div>
    </div >
  );
}

export default Header;
