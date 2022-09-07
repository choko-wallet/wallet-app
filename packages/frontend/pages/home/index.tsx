// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { GetServerSideProps } from 'next';
import { Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon, PlusCircleIcon } from '@heroicons/react/outline';
import {
  HomeIcon, BellIcon, CogIcon, MoonIcon, SunIcon, TranslateIcon,
  CheckCircleIcon, PaperAirplaneIcon, ChevronDownIcon, DocumentDuplicateIcon,
  DownloadIcon
} from '@heroicons/react/solid';
import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  ChevronRightIcon, MenuIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  UserIcon, CameraIcon,
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';


import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import btcIcon from '../../images/btc.png'
import btcQr from '../../images/btcqr.png'
import Modal from '../../components/Modal'
import Dropdown2 from '../../components/Dropdown2'
import DropdownHeader from '../../components/DropdownHeader'

import DropdownForNetwork from '../../components/DropdownForNetwork'
import SuperButton from '../../components/SuperButton'
import CryptoRow from '../../components/CryptoRow'
import Loading from '../../components/Loading'




// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '../../features/redux/selectors';
import { loadUserAccount } from '../../features/slices/userSlice';
import { bip39ToEntropy } from '@polkadot/wasm-crypto';


interface Props {
  coinPriceData: CoinPrice,
};

interface Crypto {
  name: string;
  img: string;
  price: number;
  shortName: string;
  networkFee: string;
  estimatedTime: string;
  arrival: string;
  MinDeposit: string;
};

interface CoinPrice {
  [key: string]: PriceUsd
};

interface PriceUsd {
  usd: number;
}

/* eslint-disable sort-keys */
function Home({ coinPriceData }: Props): JSX.Element {

  const { theme, setTheme } = useTheme()

  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');

  const [mounted, setMounted] = useState<boolean>(false);
  const [isNetworkChangeOpen, setIsNetworkChangeOpen] = useState<boolean>(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);

  const [isSendOpen, setIsSendOpen] = useState<boolean>(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState<boolean>(false);

  const [languageArr, setLanguageArr] = useState<string[]>(['ENG', '中文']);
  const [language, setLanguage] = useState<string>('ENG');

  const [cryptoArr, setCryptoArr] = useState<Crypto[]>(
    [
      { name: 'Bitcoin', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png', price: coinPriceData.bitcoin.usd, shortName: 'BTC', networkFee: '0.00000123BTC', estimatedTime: '20min', arrival: '6 network confirmations', MinDeposit: '0.0000001BTC' },
      { name: 'Ethereum', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png', price: coinPriceData.ethereum.usd, shortName: 'ETH', networkFee: '0.00000123ETH', estimatedTime: '5min', arrival: '6 network confirmations', MinDeposit: '0.0000001ETH' },
      { name: 'Dogecoin', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/doge.png', price: coinPriceData.dogecoin.usd, shortName: 'DOGE', networkFee: '1.00DOGE', estimatedTime: '1min', arrival: '6 network confirmations', MinDeposit: '0.0000001DOGE' },
    ]
  );

  const [cryptoToSend, setCryptoToSend] = useState<Crypto>({ name: 'Bitcoin', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png', price: coinPriceData.bitcoin.usd, shortName: 'BTC', networkFee: '0.00000123BTC', estimatedTime: '20min', arrival: '6 network confirmations', MinDeposit: '0.0000001BTC' },);

  const [cryptoToReceive, setCryptoToReceive] = useState<Crypto>({ name: 'Bitcoin', img: 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/btc.png', price: coinPriceData.bitcoin.usd, shortName: 'BTC', networkFee: '0.00000123BTC', estimatedTime: '20min', arrival: '6 network confirmations', MinDeposit: '0.0000001BTC' },);

  const [networkToReceive, setNetworkToReceive] = useState<string>("");

  const [networkArr, setNetworkArr] = useState<string[]>(
    ['Ethereum (ERC20)', 'BNB Smart Chain (BEP20)', 'Tron (TRC20)']
  );

  const [copied, setCopied] = useState<boolean>(false);

  const [amount, setAmount] = useState<number>(0);
  const [amountToCurrency, setAmountToCurrency] = useState<number>(0);

  const [openScan, setOpenScan] = useState<boolean>(false);

  const [addressToSend, setAddressToSend] = useState<string>('');
  const [showCheck, setShowCheck] = useState<boolean>(false);

  const [sidebar, setSidebar] = useState<boolean>(true);//默认打开sidebar
  const [addNetworkModalOpen, setAddNetworkModalOpen] = useState<boolean>(false);
  const [networkInput, setNetworkInput] = useState<string>('');

  const [menuIcon, setMenuIcon] = useState<boolean>(false);



  useEffect(() => {
    if (!localStorage.getItem('serialziedUserAccount')) {
      console.log('1')
      void router.push('/account');
    } else {
      console.log('2')//always run here
      dispatch(loadUserAccount());
    }

    if (userAccount && Object.keys(userAccount).length > 0) {
      console.log('3')//always run here

      const allAddrs = Object.keys(userAccount);

      setCurrentAccount(allAddrs[0]);
      setAllAccounts(allAddrs);
    }
    // }, [dispatch, router, userAccount]);//userAccount will always fire useEffect and refresh
  }, [dispatch, router]);


  useEffect(() => {
    setMounted(true);
  }, []);

  const allNetworks = [{
    name: 'Polkadot',
    info: 'polkadot',
    rpc: 'wss://polkadot.parity.io/ws',
    color: 'red-500'
  }, {
    name: 'Kusama',
    info: 'kusama',
    rpc: 'wss://kusama.parity.io/ws',
    color: 'gray-500'
  }, {
    name: 'SkyeKiwi',
    info: 'skyekiwi',
    rpc: 'wss://rpc.skye.kiwi',
    color: 'blue-500'
  }];

  if (!mounted) {
    return null;
  }

  function closeModal() {
    setIsNetworkChangeOpen(false);
    setNetworkSelection('');
    setNetwork(networkSelection);
    console.log('close');
  }

  const changeNetwork = async () => {
    setIsLoadingOpen(true);
    // const notification = toast.loading('Changing Network...', {
    //   style: {
    //     background: 'green',
    //     color: 'white',
    //     // fontWeight: "bolder",
    //     // fontFamily: "Poppins",
    //     fontSize: '17px',
    //     padding: '20px'
    //   }
    // });

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('changeNetwork');
        // toast.dismiss(notification);
        setIsLoadingOpen(false);

        setIsNetworkChangeOpen(true);

        resolve();
      }, 3000);
    });
  };

  function closeModal2() {
    setIsSendOpen(false)
    setCopied(false)
  }

  function closeModal3() {
    setIsReceiveOpen(false)

  }

  function closeAddNetworkModal() {
    setAddNetworkModalOpen(false);
    setNetworkInput('')
  }

  const handleCopy = async () => {
    console.log('first')
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);

  }

  console.log(coinPriceData)
  console.log(theme)

  if (isLoadingOpen) return <Loading title='Changing Network' />


  return (
    <div className={theme}>
      <div className='bg-gray-100 dark:bg-primary min-h-screen overflow-hidden'>
        {/* <Toaster /> */}

        {/* header */}
        <div className='sticky top-0 z-20 bg-white dark:bg-primary border-b border-gray-700 shadow-md'>
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



              <label htmlFor="my-drawer" className="flex md:hidden flex-grow items-center justify-center active:scale-95 transition duration-150 ease-out px-2 drawer-button py-2 mt-2 font-medium  text-primary bg-blue-gradient rounded-[6px] outline-none">
                <p className='text-black text-sm font-semibold font-poppins '>Network</p>

                <ChevronRightIcon className=' text-white h-4 w-4 ml-1 dark:text-black' />
              </label>

              <button
                className='hidden md:flex items-center justify-center active:scale-95 transition duration-150 ease-out py-2 px-2  text-primary bg-blue-gradient rounded-[10px] outline-none '
                onClick={() => setSidebar(!sidebar)}
              >
                <p className='text-black text-lg font-semibold font-poppins'>Network</p>

                <ChevronRightIcon className=' text-white h-5 w-5 ml-2 dark:text-black' />
              </button>

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
                  onClick={() => setTheme('light')} />
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

        {/* menu各种icon */}
        {menuIcon ?
          <div className='flex bg-primary items-center justify-center h-10 mt-2 w-full md:hidden'>
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


        {/* drawer */}
        <div className="drawer md:hidden bg-black overflow-hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle overflow-hidden" />
          <div className="drawer-content bg-white dark:bg-primary overflow-hidden">




            {/* balance */}

            <div className='relative flex md:hidden flex-col dark:bg-gradient-to-br from-gray-900 to-black flex-grow m-5 shadow-xl rounded-xl dark:border-[#00f6ff] dark:border'>
              <div className='card p-5 md:p-10'>
                <p className='text-3xl text-gray-700 dark:text-white font-poppins'> $793.32 </p>
                <p className='text-md text-white cursor-pointer hover:text-[#00f6ff] font-poppins'>Your avalaible token Balance on the current network. </p>
              </div>

              <div className="flex items-center justify-evenly ">
                <div className="flex items-center justify-center " onClick={() => setIsSendOpen(true)} >
                  <SuperButton Icon={PaperAirplaneIcon} title='Send' />
                </div>
                <div className="flex items-center justify-center " onClick={() => setIsReceiveOpen(true)}>
                  <SuperButton Icon={DownloadIcon} title='Receive' />
                </div>
              </div>

              <div className='flex flex-col'>
                {cryptoArr.map((item) => (
                  <CryptoRow key={item.img} name={item.name} img={item.img} price={item.price} />
                ))}
              </div>





            </div >

          </div>

          <div className="drawer-side dark:bg-primary   ">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu overflow-y-auto w-80 bg-blue-100 text-base-content dark:bg-primary dark:border-r dark:border-[#00f6ff] ">



              <div className='flex items-center justify-between ml-10 z-50 mx-5 mt-3 dark:bg-primary '>
                <p className='text-lg  font-semibold  text-gradient font-poppins'>Change Network</p>
                <label htmlFor="my-drawer" className="drawer-button ">

                  <XIcon className=' text-white h-8 w-8 cursor-pointer dark:text-white' />

                </label>
              </div>

              <div className='m-5 scrollbar-thin max-h-[600px] overflow-y-scroll overflow-x-hidden'>
                <div className='bg-white h-16 w-[230px] ml-5 rounded-lg dark:bg-[#c67391] flex items-center justify-center ' onClick={() => setAddNetworkModalOpen(true)}>
                  <p className='text-black flex items-center justify-center text-lg font-semibold font-poppins'>Add Network
                    <PlusCircleIcon className='h-8 w-8 ml-3 text-black ' /></p>
                </div>
                <RadioGroup onChange={setNetworkSelection}
                  value={networkSelection || network}>
                  {allNetworks.map(({ info, name, rpc }) => (
                    <RadioGroup.Option
                      className={({ active, checked }) =>
                        `${checked ? 'bg-blue-gradient ' : 'bg-gray-600 '}
                  m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none md:w-64`
                      }
                      key={name}
                      value={info}
                    >
                      {({ active, checked }) => (
                        <div className='flex w-full items-center justify-between'>
                          <div className='flex items-center'>
                            <div className='text-sm'>
                              <RadioGroup.Label
                                as='p'
                                className={`text-lg font-semibold font-poppins  ${checked ? 'text-black' : 'text-white'}`}
                              >
                                {name}
                              </RadioGroup.Label>
                              <RadioGroup.Description
                                as='span'
                                className={`inline text-xs  ${checked ? 'text-black font-poppins' : 'text-white font-poppins'}`}
                              >

                                <p className='w-40 truncate'>{rpc}</p>
                              </RadioGroup.Description>
                            </div>
                          </div>
                          {checked && (
                            <div className='shrink-0 text-white'>
                              <CheckCircleIcon className='h-6 w-6' />
                            </div>
                          )}
                        </div>
                      )}
                    </RadioGroup.Option>
                  ))}
                </RadioGroup>


              </div>

              <button
                className='flex w-[230px] ml-10 items-center justify-center active:scale-95 transition duration-150 ease-out py-3 px-6 font-medium text-primary bg-blue-gradient rounded-[10px] outline-none '
                onClick={async () => {
                  await changeNetwork();
                }}
              >
                <p className='text-black text-lg font-semibold font-poppins'>Change Network</p>

              </button>


            </ul>
          </div>
        </div>

        < main className='hidden md:grid md:grid-cols-12 bg-gray-100 dark:bg-primary max-w-7xl mx-auto' >

          {/* under header  */}
          <div className='col-span-12 ' >


            <div className='flex-col md:h-full  flex md:flex-row'>

              {/* network sidebar */}
              {sidebar ?
                <div className=" hidden md:inline-flex md:flex-col items-center px-5 md:px-0 md:h-full " >
                  <div className='shadow-xl rounded-xl  w-full h-full min-h-[700px] bg-white dark:bg-primary'>
                    <p className='text-lg font-semibold  mt-5 ml-10 mx-auto text-gradient font-poppins'>Network</p>

                    <div className='m-5 scrollbar-thin max-h-[600px] overflow-y-scroll'>
                      <div className='bg-white h-20 w-64 ml-5 my-1 rounded-lg flex items-center justify-center cursor-pointer dark:bg-[#c67391] ' onClick={() => setAddNetworkModalOpen(true)}>
                        <p className='flex items-center text-gradient justify-center text-xl font-semibold font-poppins'>Add Network
                          <PlusCircleIcon className='h-8 w-8 ml-3 ' /></p>
                      </div>

                      <div className='bg-white h-20 w-64 ml-5 my-1 rounded-lg flex items-center justify-center cursor-pointer dark:bg-[#c67391] ' onClick={() => setAddNetworkModalOpen(true)}>
                        <p className=' flex items-center text-black justify-center text-xl font-semibold font-poppins'>Add Network
                          <PlusCircleIcon className='h-8 w-8 ml-3 ' /></p>
                      </div>

                      <div className='bg-blue-gradient dark:border-4 my-1 dark:border-[#c67391] h-20 w-64 ml-5 rounded-lg flex items-center justify-center cursor-pointer dark:bg-blue-gradient' onClick={() => setAddNetworkModalOpen(true)}>
                        <p className=' flex items-center text-black justify-center text-xl font-semibold font-poppins'>Add Network
                          <PlusCircleIcon className='h-8 w-8 ml-3 ' /></p>
                      </div>

                      <RadioGroup onChange={setNetworkSelection}
                        value={networkSelection || network} className='z-50'>
                        {allNetworks.map(({ info, name, rpc }) => (
                          <RadioGroup.Option
                            className={({ active, checked }) =>
                              `${checked ? 'bg-blue-gradient ' : 'bg-gray-600 '}
                  m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none md:w-64`
                            }
                            key={name}
                            value={info}
                          >
                            {({ active, checked }) => (
                              <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center'>
                                  <div className='text-sm'>
                                    <RadioGroup.Label
                                      as='p'
                                      className={`text-lg font-semibold font-poppins  ${checked ? 'text-black' : 'text-white'}`}
                                    >
                                      {name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as='span'
                                      className={`inline text-xs ${checked ? 'text-black font-poppins' : 'text-white font-poppins'}`}
                                    >
                                      <p className='w-44 truncate'>{rpc}</p>

                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked && (
                                  <div className='shrink-0 text-white'>
                                    <CheckCircleIcon className='h-6 w-6' />
                                  </div>
                                )}
                              </div>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                      <RadioGroup onChange={setNetworkSelection}
                        value={networkSelection || network} className='z-50'>
                        {allNetworks.map(({ info, name, rpc }) => (
                          <RadioGroup.Option
                            className={({ active, checked }) =>
                              `${checked ? 'bg-blue-gradient ' : 'bg-gray-600 '}
                  m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none md:w-64`
                            }
                            key={name}
                            value={info}
                          >
                            {({ active, checked }) => (
                              <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center'>
                                  <div className='text-sm'>
                                    <RadioGroup.Label
                                      as='p'
                                      className={`text-lg font-semibold font-poppins  ${checked ? 'text-black' : 'text-white'}`}
                                    >
                                      {name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as='span'
                                      className={`inline text-xs ${checked ? 'text-black font-poppins' : 'text-white font-poppins'}`}
                                    >
                                      <p className='w-44 truncate'>{rpc}</p>

                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked && (
                                  <div className='shrink-0 text-white'>
                                    <CheckCircleIcon className='h-6 w-6' />
                                  </div>
                                )}
                              </div>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                      <RadioGroup onChange={setNetworkSelection}
                        value={networkSelection || network} className='z-50'>
                        {allNetworks.map(({ info, name, rpc }) => (
                          <RadioGroup.Option
                            className={({ active, checked }) =>
                              `${checked ? 'bg-blue-gradient ' : 'bg-gray-600 '}
                  m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none md:w-64`
                            }
                            key={name}
                            value={info}
                          >
                            {({ active, checked }) => (
                              <div className='flex w-full items-center justify-between'>
                                <div className='flex items-center'>
                                  <div className='text-sm'>
                                    <RadioGroup.Label
                                      as='p'
                                      className={`text-lg font-semibold font-poppins  ${checked ? 'text-black' : 'text-white'}`}
                                    >
                                      {name}
                                    </RadioGroup.Label>
                                    <RadioGroup.Description
                                      as='span'
                                      className={`inline text-xs ${checked ? 'text-black font-poppins' : 'text-white font-poppins'}`}
                                    >
                                      <p className='w-44 truncate'>{rpc}</p>

                                    </RadioGroup.Description>
                                  </div>
                                </div>
                                {checked && (
                                  <div className='shrink-0 text-white'>
                                    <CheckCircleIcon className='h-6 w-6' />
                                  </div>
                                )}
                              </div>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>





                    </div>

                    <div className='flex flex-frow justify-evenly mb-5'>
                      {/* <button className='btn btn-error btn-circle btn-md'
                        onClick={() => setNetworkSelection('')} >
                        <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />a
                      </button> */}

                      <button
                        className='hidden md:flex items-center justify-center active:scale-95 transition duration-150 ease-out py-3 px-6 font-medium text-primary bg-blue-gradient rounded-[10px] outline-none z-50'
                        onClick={async () => {
                          await changeNetwork();
                        }}
                      >
                        <p className='text-black text-lg font-semibold font-poppins'>Change Network</p>

                      </button>

                      {/* <button className={`btn btn-accent btn-circle btn-md ${networkSelection ? '' : 'btn-disabled'}`}
                        onClick={async () => {
                          await changeNetwork();
                        }} >
                        <CheckIcon className=' h-8 duration-300 hover:scale-125 transtion east-out' />
                      </button> */}

                    </div>

                  </div>
                </div>
                : null}


              {/* balance */}
              <div className='relative hidden md:flex md:flex-col dark:bg-gradient-to-br from-gray-900 to-black flex-grow m-5 shadow-xl rounded-xl dark:border-[#00f6ff] dark:border'>
                <div className='card p-5 md:p-10'>
                  <p className='text-3xl text-gray-700 dark:text-white font-poppins'> $793.32 </p>
                  <p className='text-md text-white cursor-pointer hover:text-[#00f6ff] font-poppins'>Your avalaible token Balance on the current network. </p>
                </div>

                <div className="flex items-center justify-evenly ">
                  <div className="flex items-center justify-center " onClick={() => setIsSendOpen(true)} >
                    <SuperButton Icon={PaperAirplaneIcon} title='Send' />
                  </div>
                  <div className="flex items-center justify-center " onClick={() => setIsReceiveOpen(true)}>
                    <SuperButton Icon={DownloadIcon} title='Receive' />
                  </div>
                </div>

                <div className='flex flex-col'>
                  {cryptoArr.map((item) => (
                    <CryptoRow key={item.img} name={item.name} img={item.img} price={item.price} />
                  ))}
                </div>


                {/* gradient light */}

                <div className="absolute z-10 -left-96 top-96 w-[200px] h-[200px] rounded-full pink__gradient" />
                <div className="absolute z-10 -right-24 top-32 w-[200px] h-[200px] rounded-full blue__gradient " />



              </div >


            </div>


            {/* network change modal */}
            <Modal closeModal={closeModal} isOpen={isNetworkChangeOpen} >
              <div className={theme}>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-[#00f6ff]'>
                  <Dialog.Title
                    as='h3'
                    className='font-poppins text-lg font-medium leading-6 text-gradient w-72'
                  >
                    Changed successfully
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm font-poppins text-gray-500 dark:text-white'>
                      {`Network changed to ${networkSelection}`}
                    </p>
                  </div>

                  <div className='mt-4'>
                    <button
                      className='font-poppins py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                      onClick={closeModal}
                      type='button'
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </div>
            </Modal>

            {/* send modal */}
            <Modal closeModal={closeModal2} isOpen={isSendOpen}>
              <div className={theme}>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-[#00f6ff]'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg  font-medium leading-6 flex items-center mb-6 '
                  >
                    <div className='flex items-center  flex-grow'>
                      <PaperAirplaneIcon className='rotate-45 text-gray-700 h-8 w-8 dark:text-[#03F3FF]' />
                      {theme === 'dark'
                        ?
                        <p className=' text-gradient font-poppins'>Send Crypto</p>
                        :
                        <p className=' text-gray-700 font-poppins'>Send Crypto</p>
                      }
                    </div>
                    <div onClick={closeModal2}>
                      <XIcon className=' text-white h-8 w-8 cursor-pointer dark:text-white' />
                    </div>
                  </Dialog.Title>
                  <div className='mt-2 '>


                    <Dropdown2 arr={cryptoArr} defaultValue={cryptoToSend} onClick={setCryptoToSend} />

                    <p className=' text-gray-700 dark:text-white '>From</p>
                    <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center dark:border-blue-300 border border-gray-300 rounded-lg '>
                      <p className='flex flex-grow dark:text-white font-poppins'>5G16tBnZEmtnL6A5nxZJpJtUw</p>
                      {/* {copied ? <span className="text-xs text-blue-500 " >Copied</span> : <div className="h-2 "></div>} */}
                      <CopyToClipboard text={'5G16tBnZEmtnL6A5nxZJpJtUw'}
                        onCopy={() => { setCopied(true) }}>
                        <div onClick={handleCopy}>
                          {showCheck
                            ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
                            : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}

                        </div>
                      </CopyToClipboard>
                    </div>

                    <div className='relative'>

                      <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>To</p>

                      <input value={addressToSend} onChange={(e) => setAddressToSend(e.target.value)} type="text" placeholder="Destination Address" className="font-poppins input input-bordered input-info w-full " />
                      <CameraIcon
                        onClick={() => setOpenScan(!openScan)}
                        className='absolute top-9 right-2 text-gray-600 ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full dark:text-[#03F3FF]' />

                    </div>

                    {openScan &&
                      <div>
                        <QrReader
                          constraints={{ facingMode: 'user' }}
                          className='absolute top-0 right-5 left-5 bottom-0 z-40'
                          onResult={(result, error) => {
                            if (!!result) {
                              // setAddressToSend(result?.text);//这个位置官方写法还报错 不行就换插件
                              setOpenScan(false);
                            }

                            if (!!error) {
                              console.info(error);
                            }
                          }}
                        />
                        <div className='absolute top-16 right-10 z-50 rounded-full p-2 bg-red-100'>
                          <XIcon onClick={() => setOpenScan(false)} className='h-5 w-5' />
                        </div>

                        {/* <div className='absolute top-24 right-24 z-50 left-24 bottom-64 border-2 border-yellow-200'>
                    </div> */}

                      </div>}

                    <div className='flex items-end'>
                      <div className='relative'>
                        <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Amount</p>

                        <input

                          value={amountToCurrency ? amount : 0}
                          onChange={(e) => {
                            setAmount(parseFloat(e.target.value));
                            setAmountToCurrency(
                              parseFloat((parseFloat(e.target.value) * cryptoToSend.price).toFixed(2)));
                          }}
                          type="number" placeholder="1.0" step="0.00000001" min="0" max="10000000"
                          className="font-poppins pr-12 input input-bordered input-info w-full " />
                        <p className=' absolute bottom-4 right-2 text-sm font-poppins'>{cryptoToSend.shortName}</p>
                      </div>

                      <p className='mx-1 pb-3'>=</p>
                      <div className='relative'>
                        <p className=' text-gray-700'></p>
                        <input
                          value={amount ? amountToCurrency : 0}
                          onChange={(e) => {
                            setAmountToCurrency(parseFloat(e.target.value));
                            setAmount(
                              parseFloat((parseFloat(e.target.value) / cryptoToSend.price).toFixed(8)));
                          }}
                          type="number" placeholder="100.00" step="0.01" min="0" max="10000000"
                          className="font-poppins pr-12  input input-bordered input-info w-full " />
                        <p className='absolute bottom-4 right-2 text-sm font-poppins'>USD</p>
                      </div>

                    </div>
                    <p className='font-poppins text-gray-700 dark:text-white text-sm'>{cryptoToSend.name} price: {cryptoToSend.price}</p>


                    <p className=' text-gray-700 dark:text-white py-1 pt-3 font-poppins'>Network Fee</p>
                    <p className=' text-gray-700 dark:text-white text-sm font-poppins'>{cryptoToSend.networkFee}</p>
                    <p className=' text-gray-700 dark:text-white text-sm font-poppins'>Estimated confirmation time {cryptoToSend.estimatedTime}</p>


                  </div>

                  <div className='mt-4'>
                    {/* <button
                      className='w-36 text-lg inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2  font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                      onClick={closeModal2}
                      type='button'
                    >
                      Send
                    </button> */}

                    <button
                      className='font-poppins py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                      onClick={closeModal2}

                      type='button'
                    >
                      Send
                    </button>

                  </div>
                </Dialog.Panel>
              </div>
            </Modal>

            {/* receive modal */}
            <Modal closeModal={closeModal3} isOpen={isReceiveOpen}>
              <div className={theme}>

                <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-[#00f6ff]'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 flex items-center mb-6'
                  >

                    <DownloadIcon className=' text-gray-700 h-8 w-8 dark:text-[#03F3FF] ' />
                    {theme === 'dark' ? <p className=' text-gradient flex flex-grow font-poppins'>Receive Crypto</p> : <p className=' text-gray-700 flex flex-grow font-poppins'>Receive Crypto</p>}


                    <div onClick={closeModal3}>
                      <XIcon className=' text-white h-8 w-8 cursor-pointer dark:text-white' />
                    </div>

                  </Dialog.Title>
                  <div className='mt-2 '>
                    <Dropdown2 arr={cryptoArr} defaultValue={cryptoToReceive} onClick={setCryptoToReceive} />

                    <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Network</p>

                    <DropdownForNetwork arr={networkArr} defaultValue={networkToReceive} onClick={setNetworkToReceive} />


                    <p className=' text-gray-700 dark:text-white mt-3 mb-1 font-poppins'>Address</p>

                    <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center  border border-gray-300 rounded-lg dark:border-blue-300'>
                      <p className='flex flex-grow text-gray-700 dark:text-white mb-1 font-poppins'>5G16tBnZEmtnL6A5nxZJpJtUw</p>

                      {/* {copied ? <span className="text-xs text-blue-500 " >Copied</span> : <div className="h-2 "></div>} */}
                      <CopyToClipboard text={'5G16tBnZEmtnL6A5nxZJpJtUw'}
                        onCopy={() => { setCopied(true) }}>
                        <div onClick={handleCopy}>
                          {showCheck
                            ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
                            : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}

                        </div>
                      </CopyToClipboard>
                    </div>

                    <div className="relative h-64 w-64 mx-auto m-3 ">
                      <QRCode
                        size={256}
                        style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                        value={'5G16tBnZEmtnL6A5nxZJpJtUw'} />
                    </div>

                    <div className='flex space-x-5'>
                      <div>
                        <p className='dark:text-white text-gray-700 pt-3 font-poppins'>Expected arrival</p>
                        <p className='dark:text-white text-gray-700 text-sm font-poppins'>{cryptoToReceive.arrival}</p>
                      </div>
                      <div>
                        <p className='dark:text-white text-gray-700 pt-3 font-poppins'>Minimum deposit</p>
                        <p className='dark:text-white text-gray-700 text-sm font-poppins'>{cryptoToReceive.MinDeposit}</p>
                      </div>
                    </div>
                    <p className='dark:text-white text-gray-700 text-sm pt-3 font-poppins'>Send only {cryptoToReceive.name} to this deposit address.</p>
                    <p className='dark:text-white text-gray-700 text-sm font-poppins'>Ensure the network is {" "}
                      <span className='text-red-400'>{networkToReceive}</span>.</p>


                  </div>


                </Dialog.Panel>
              </div>
            </Modal>

            {/* add network modal */}
            {/* <Modal closeModal={closeAddNetworkModal} isOpen={addNetworkModalOpen} >
              <div className={theme}>
                <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-[#00f6ff]'><Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gradient '
                >
                  Add Network
                </Dialog.Title>
                  <div className='mt-2'>
                    <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network Name</p>
                    <input value={networkInput} onChange={(e) => setNetworkInput(e.target.value)} type="text" placeholder="Polkadot" className=" input input-bordered input-info w-full " />

                    <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network Info</p>
                    <input value={networkInput} onChange={(e) => setNetworkInput(e.target.value)} type="text" placeholder="polkadot" className=" input input-bordered input-info w-full " />

                    <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network RPC</p>
                    <input value={networkInput} onChange={(e) => setNetworkInput(e.target.value)} type="text" placeholder="wss://polkadot.parity.io/ws" className=" input input-bordered input-info w-full " />



                  </div>

                  <div className='mt-4'>
                    <button
                      className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
                      onClick={closeAddNetworkModal}
                      type='button'
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </div >

            </Modal> */}

            {/* add network modal pink */}

            <Modal closeModal={closeAddNetworkModal} isOpen={addNetworkModalOpen} >
              <div className={theme}>
                <Dialog.Panel className='md:w-[600px] w-96 max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-800 to-black p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-[#c67391]'><Dialog.Title
                  as='h3'
                  className='text-lg font-medium leading-6 text-gradient '
                >
                  Add Network
                </Dialog.Title>
                  <div className='mt-2'>
                    <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network Name</p>
                    <input value={networkInput} onChange={(e) => setNetworkInput(e.target.value)} type="text" placeholder="Polkadot" className=" input dark:border dark:border-[#c67391] w-full  " />

                    <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network Info</p>
                    <input value={networkInput} onChange={(e) => setNetworkInput(e.target.value)} type="text" placeholder="polkadot" className=" input dark:border dark:border-[#c67391] w-full " />

                    <p className=' text-gray-700 dark:text-white mt-3 mb-1'>Network RPC</p>
                    <input value={networkInput} onChange={(e) => setNetworkInput(e.target.value)} type="text" placeholder="wss://polkadot.parity.io/ws" className=" input dark:border dark:border-[#c67391] w-full " />



                  </div>

                  <div className='mt-4'>
                    <button
                      className='py-3 px-6 font-medium text-[18px] text-primary bg-[#c67391] rounded-[10px] outline-none'
                      onClick={closeAddNetworkModal}
                      type='button'
                    >
                      OK
                    </button>
                  </div>
                </Dialog.Panel>
              </div >

            </Modal>
          </div >

        </main >
      </div >
    </div >
  );
}

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const coins = ['bitcoin', 'ethereum', 'dogecoin'].join('%2C');
  const toCurrency = 'usd';
  const coinPriceData = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${coins}&vs_currencies=${toCurrency}`).
    then((res) => res.json());

  return {
    props: {
      coinPriceData,
    }
  }
}


