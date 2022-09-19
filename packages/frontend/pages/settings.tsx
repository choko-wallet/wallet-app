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
import { blake2AsU8a } from '@polkadot/util-crypto';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';

// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount, selectCurrentUserAccount } from '../features/redux/selectors';
import { loadUserAccount } from '../features/slices/userSlice';
import DropdownHeader from '../components/DropdownHeader';
import SuperButton from '../components/SuperButton';
import CopyToClipboard from 'react-copy-to-clipboard';
import Header from '../components/Header';

/* eslint-disable sort-keys */
function Settings(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();
  const currentUserAccount = useSelector(selectCurrentUserAccount);
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

  // const key = localStorage.getItem('lockedPrivateKey')


  console.log('Object.values(userAccount')

  console.log(Object.keys(userAccount)[0])
  // const addr = Object.values(userAccount)[0].address

  // console.log(userAccount[addr])//多个账户 就要带地址 一个账户不用带 需要判断
  // const lockedUserAccount1 = userAccount[addr].lockUserAccount(blake2AsU8a('123'));
  // const serializedLockedUserAccount1 = lockedUserAccount1.serialize();
  // const lockedPrivateKey1 = u8aToHex(serializedLockedUserAccount1);
  // console.log(lockedPrivateKey1)

  return (
    <div className={theme}>
      <Header />

      <div className='bg-gray-100 grid grid-cols-12 dark:bg-primary min-h-screen overflow-hidden'>
        {/* <Toaster /> */}
        <div className='col-span-12 '>



          {/* settings */}
          <div className='p-3'>
            <div className='dark:border-[#00f6ff] dark:border max-w-3xl mx-auto p-5 relative flex flex-col dark:bg-gradient-to-br from-gray-900 to-black flex-grow m-5 rounded-xl '>
              <div className='p-5 '>
                <p className='text-2xl text-gray-700 dark:text-white font-poppins'> Settings </p>

              </div>


              <div className='flex flex-col'>
                <div className='flex justify-between m-1'>
                  <div className='my-auto'>
                    <p className='text-lg dark:text-[#03F3FF]'>Wallet ID</p>

                  </div>

                  <div className='h-12 my-auto'>
                    <div className='cursor-pointer flex w-full items-center rounded-md px-2 py-2 text-sm'>

                      <p className='font-poppins whitespace-nowrap flex md:hidden text-center items-center justify-certer flex-grow  ml-2 text-gradient'>
                        {/* {currentAccount} */}
                        {Object.keys(currentUserAccount)[0].substring(0, 6)}
                        <DotsHorizontalIcon className='h-6 w-6 dark:text-[#03F3FF] mx-1' />
                        {Object.keys(currentUserAccount)[0].substring(Object.keys(currentUserAccount)[0].length - 6, Object.keys(currentUserAccount)[0].length)}
                      </p>

                      <p className='font-poppins whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 text-gradient'>
                        {Object.keys(currentUserAccount)[0]}

                      </p>

                      <CopyToClipboard text={Object.keys(currentUserAccount)[0]}
                        onCopy={() => { setCopied(true) }}>
                        <div onClick={handleCopy}>
                          {showCheck
                            ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
                            : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}

                        </div>
                      </CopyToClipboard>

                    </div>



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
              </div>

              <div className='flex justify-between m-1'>
                <div className='flex-col'>
                  <p className='text-md md:text-lg dark:text-[#03F3FF]'>Export Account Url</p>
                  <p className='text-sm font-normal text-gray-400 font-poppins'>Export Account Url For Import.</p>
                </div>


                <div className='md:w-40 w-32 flex justify-end'>

                  <button
                    className='my-auto w-32 md:w-40  font-poppins py-2 px-4 md:py-3 md:px-6 font-medium text-sm md:text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                    // onClick={() => GenerateAccountUrl(address)}
                    type='button'
                  >
                    Account Url
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
