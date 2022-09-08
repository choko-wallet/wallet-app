// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Menu, Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import {
  CheckIcon, UserCircleIcon, XIcon, DocumentDuplicateIcon, ChevronRightIcon, MenuIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  UserIcon, CameraIcon,
} from '@heroicons/react/outline';
import {
  BellIcon, CheckCircleIcon,
  PaperAirplaneIcon, DownloadIcon,
  ChevronDownIcon, CogIcon, HomeIcon, MoonIcon, SunIcon, TranslateIcon
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Dropdown from '../components/Dropdown';



// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '../features/redux/selectors';
import { loadUserAccount } from '../features/slices/userSlice';
import DropdownHeader from '../components/DropdownHeader';
import SuperButton from '../components/SuperButton';
import CopyToClipboard from 'react-copy-to-clipboard';

/* eslint-disable sort-keys */
function Settings(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');

  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currencyArr, setCurrencyArr] = useState<string[]>(['USD', 'EUR']);
  const [currency, setCurrency] = useState<string>('USD');
  const [languageArr, setLanguageArr] = useState<string[]>(['ENG', '中文']);
  const [language, setLanguage] = useState<string>('ENG');
  const [isMnemonicOpen, setIsMnemonicOpen] = useState<boolean>(false);
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false);
  const [menuIcon, setMenuIcon] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>('dark');//暂时先这样配置 没有light

  const [showCheck, setShowCheck] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    console.log('first')
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  }

  useEffect(() => {
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      dispatch(loadUserAccount());
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (userAccount && Object.keys(userAccount).length > 0) {
      const allAddrs = Object.keys(userAccount);

      setCurrentAccount(allAddrs[0]);
      setAllAccounts(allAddrs);
    }
  }, [userAccount])

  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) {
    return null;
  }

  function closeMnemonic() {
    setIsMnemonicOpen(false)
    setShowMnemonic(false)
  }






  return (
    <div className={theme}>
      <div className='bg-gray-100 grid grid-cols-12 dark:bg-primary min-h-screen overflow-hidden'>
        {/* <Toaster /> */}
        <div className='col-span-12 '>

          {/* header */}
          <div className='sticky top-0 z-20 bg-white dark:bg-primary border-b border-gray-800 shadow-md'>
            <div className='flex justify-between p-2 '>
              <div className='flex items-center justify-center ' >

                {/* <div className='hidden md:inline-flex md:mr-5 relative items-center w-10 h-10 my-auto cursor-pointer'
                onClick={() => router.push('/')}>
                <Image
                  layout='fill'
                  objectFit='contain'
                  src={btcIcon.src}
                />
              </div> */}



                {/* <label htmlFor="my-drawer" className="flex md:hidden flex-grow items-center justify-center active:scale-95 transition duration-150 ease-out px-4 drawer-button py-2  mt-2 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none">
                  <p className='text-black text-lg font-semibold font-poppins '>Network</p>

                  <ChevronRightIcon className=' text-white h-5 w-5 ml-2 dark:text-black' />
                </label>

                <button
                  className='hidden md:flex items-center justify-center active:scale-95 transition duration-150 ease-out py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none '
                  onClick={() => setSidebar(!sidebar)}
                >
                  <p className='text-black text-lg font-semibold font-poppins'>Network</p>

                  <ChevronRightIcon className=' text-white h-5 w-5 ml-2 dark:text-black' />
                </button> */}

              </div>

              <div className='flex items-center text-gray-500  '>

                <div className='flex items-center space-x-8 text-gray-500 mr-6 '>
                  <HomeIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-[#03F3FF]'
                    onClick={() => router.push('/home')} />

                  <div className='hidden md:inline-flex relative transition duration-150 ease-out cursor-pointer '>
                    <BellIcon className='h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-[#03F3FF]' />
                    <div className="animate-pulse absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-400 rounded-full -right-2 -top-1">
                      3</div>
                  </div>
                  <CogIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-[#03F3FF]' />


                </div>
                {theme === 'light'
                  ? <SunIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125'
                    onClick={() => setTheme('dark')} />
                  : <MoonIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125 dark:text-[#03F3FF]'
                  // onClick={() => setTheme('light')} 
                  />
                }

                <div className='dropdown dropdown-hover hidden md:inline-flex '>
                  <label className='btn m-1 border-transparent hover:border-transparent bg-transparent hover:bg-transparent text-gray-900 !outline-none'>
                    <TranslateIcon className='h-8 cursor-pointer dark:text-[#03F3FF]' />
                    <ChevronDownIcon className='h-8 cursor-pointer dark:text-[#03F3FF]' />
                  </label>
                  <ul className=' p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52 '>
                    <li ><a>English</a></li>
                    <li ><a>中文</a></li>
                  </ul>
                </div>

                <MenuIcon onClick={() => setMenuIcon(!menuIcon)} className="transition duration-150 ease-out cursor-pointer md:hidden active:scale-125 h-8 m-2 dark:text-[#03F3FF]" />


                <DropdownHeader currentAccount={currentAccount} />



              </div>

            </div>
          </div >

          {menuIcon ?
            <div className='flex bg-primary items-center justify-center h-10 w-full md:hidden'>
              <div className='flex items-center space-x-8 text-gray-500 mr-6 '>
                <HomeIcon className='h-8 transition duration-150 ease-out cursor-pointer inline-flex active:scale-125 dark:text-[#03F3FF]'
                  onClick={() => router.push('/home')} />

                <div className='inline-flex relative transition duration-150 ease-out cursor-pointer '>
                  <BellIcon className='h-8 transition duration-150 ease-out cursor-pointer inline-flex active:scale-125 dark:text-[#03F3FF]' />
                  <div className="animate-pulse absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-400 rounded-full -right-2 -top-1">
                    3</div>
                </div>
                <CogIcon className=' h-8 transition duration-150 ease-out cursor-pointer inline-flex active:scale-125 dark:text-[#03F3FF]' />


              </div>
              {theme === 'light'
                ? <SunIcon className=' h-8 transition duration-150 ease-out cursor-pointer inline-flex active:scale-125'
                  onClick={() => setTheme('dark')} />
                : <MoonIcon className=' h-8 transition duration-150 ease-out cursor-pointer inline-flex active:scale-125 dark:text-[#03F3FF]'
                  onClick={() => setTheme('light')} />
              }

              <div className='dropdown dropdown-hover inline '>
                <label className='btn m-1 border-transparent hover:border-transparent bg-transparent hover:bg-transparent text-gray-900 !outline-none'>
                  <TranslateIcon className='h-8 cursor-pointer dark:text-[#03F3FF]' />
                  <ChevronDownIcon className='h-5 cursor-pointer dark:text-[#03F3FF]' />
                </label>
                <ul className=' p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52'>
                  <li><a>English</a></li>
                  <li><a>中文</a></li>
                </ul>
              </div>
            </div>
            : null}



          {/* settings */}
          <div className='p-3'>
            <div className='dark:border-[#00f6ff] dark:border max-w-3xl mx-auto p-5 relative flex flex-col dark:bg-gradient-to-br from-gray-900 to-black flex-grow m-5 rounded-xl '>
              <div className='p-5 '>
                <p className='text-2xl text-gray-700 dark:text-white font-poppins'> Settings </p>

              </div>

              <div className='flex justify-between m-1 '>
                <div className='my-auto'>
                  <p className='text-lg dark:text-[#03F3FF]'>Wallet ID</p>

                </div>


                <div className='h-12 my-auto'>
                  <button className='cursor-pointer flex w-full items-center rounded-md px-2 py-2 text-sm'>

                    <p className='font-poppins whitespace-nowrap flex md:hidden text-center items-center justify-certer flex-grow  ml-2 text-gradient'>
                      {/* {currentAccount} */}
                      {currentAccount.substring(0, 8)}
                      <DotsHorizontalIcon className='h-6 w-6 dark:text-[#03F3FF] mx-1' />
                      {currentAccount.substring(currentAccount.length - 8, currentAccount.length)}
                    </p>

                    <p className='font-poppins whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 text-gradient'>
                      {currentAccount}
                      {/* {currentAccount.substring(0, 8)}
                    <DotsHorizontalIcon className='h-6 w-6 dark:text-[#03F3FF] mx-1' />
                    {currentAccount.substring(currentAccount.length - 8, currentAccount.length)} */}
                    </p>

                    <CopyToClipboard text={currentAccount}
                      onCopy={() => { setCopied(true) }}>
                      <div onClick={handleCopy}>
                        {showCheck
                          ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
                          : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}

                      </div>
                    </CopyToClipboard>

                  </button>

                </div>
              </div>

              <div className='flex justify-between m-1'>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>Change Password</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Password is your unique password.</p>
                </div>

                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                  // onClick={closeModal2}

                  >
                    Password
                  </button>
                </div>
              </div>

              <div className='flex justify-between m-1'>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>View Your Mnemonic</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Do not share your private keys with anyone.</p>
                </div>


                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                  // onClick={closeModal2}

                  >
                    Mnemonic
                  </button>
                </div>
              </div>


              <div className='flex justify-between m-1'>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>Select Language</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Set your preferred language</p>
                </div>


                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                  // onClick={closeModal2}

                  >
                    Language
                  </button>
                </div>
              </div>


              <div className='flex justify-between m-1 '>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>Trading Currency</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Select your trading currency</p>
                </div>


                <div className='md:w-40 w-32 flex justify-end'>
                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                  // onClick={closeModal2}

                  >
                    Currency
                  </button>
                </div>
              </div>










              {/* gradient light */}

              <div className="absolute z-10 -left-96 top-96 w-[200px] h-[200px] rounded-full pink__gradient" />
              <div className="absolute z-10 -right-24 top-32 w-[200px] h-[200px] rounded-full blue__gradient " />



            </div >
          </div>




        </div>
      </div>
    </div >

  );
}

export default Settings;
