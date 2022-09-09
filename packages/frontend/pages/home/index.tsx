// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon, PlusCircleIcon } from '@heroicons/react/outline';
import {
  HomeIcon, BellIcon, CogIcon, MoonIcon, SunIcon, TranslateIcon,
  PaperAirplaneIcon, ChevronDownIcon, DocumentDuplicateIcon,
  DownloadIcon, CheckCircleIcon
} from '@heroicons/react/solid';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { knownNetworks } from '@choko-wallet/known-networks';
import { selectUserAccount } from '../../features/redux/selectors';
import { loadUserAccount } from '../../features/slices/userSlice';

import type { NextPage } from 'next';
import { GetServerSideProps } from 'next';

import QRCode from "react-qr-code";
import { QrReader } from 'react-qr-reader';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import {
  ChevronRightIcon, MenuIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  UserIcon, CameraIcon,
} from '@heroicons/react/outline';
import { useTheme } from 'next-themes';

import Image from 'next/image'
import Modal from '../../components/Modal'
import Dropdown2 from '../../components/Dropdown2'
import DropdownHeader2 from '../../components/DropdownHeader2'

import DropdownForNetwork from '../../components/DropdownForNetwork'
import SuperButton from '../../components/SuperButton'
import Button from '../../components/Button'

import CryptoRow from '../../components/CryptoRow'
import Loading from '../../components/Loading'
import logo from '../../images/logo.png'
import icon1 from '../../images/icon1.png'
import setting from '../../images/setting.png'
import check from '../../images/check.png'
import addNetworkButton from '../../images/addNetworkButton.png'






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
  const { theme, setTheme } = useTheme();

  const router = useRouter();
  const dispatch = useDispatch();
  const userAccount = useSelector(selectUserAccount);
  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);
  const [networkSelection, setNetworkSelection] = useState<string>('847e7b7fa160d85f');//初始化设置默认网络skyekiwi
  const [network, setNetwork] = useState<string>('847e7b7fa160d85f');
  const [mounted, setMounted] = useState<boolean>(false);
  // const [isOpen, setIsOpen] = useState<boolean>(false);//网络切换原始modal弹框
  const [balance, setBalance] = useState<number>(0);
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
    const getBalance = async () => {
      const provider = new WsProvider(knownNetworks[network].defaultProvider);
      const api = await ApiPromise.create({
        provider: provider
      });

      const data = await api.query.system.account(currentAccount);
      // console.error(data['data'].toHuman()['free']);

      const tokenDecimals = {
        '847e7b7fa160d85f': 12,
        '0018a49f151bcb20': 12,
        e658ad422326d7f7: 10
      };

      /* eslint-disable */
      // @ts-ignore
      setBalance(Number(data.data.toHuman().free.replaceAll(',', '')) / (10 ** tokenDecimals[network]));
      /* eslint-enable */

      // const chainInfo = await api.registry.getChainProperties()
      // return ( data.createdAtHash.free )
    };

    void getBalance();
    // }, []);
  }, [network, currentAccount]);


  useEffect(() => {
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      dispatch(loadUserAccount());
    }

    if (userAccount && Object.keys(userAccount).length > 0) {
      const allAddrs = Object.keys(userAccount);

      setCurrentAccount(allAddrs[0]);
      setAllAccounts(allAddrs);
    }
    // }, [dispatch, router, userAccount]);//userAccount will always fire useEffect and refresh
  }, [dispatch, router]);


  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) {
    return null;
  }

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


  function closeModal() {
    setIsNetworkChangeOpen(false);

  }



  const changeNetwork = async () => {

    setIsLoadingOpen(true);
    setNetwork(networkSelection);

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

  // console.log(coinPriceData)
  // console.log(theme)

  if (isLoadingOpen) return <Loading title='Changing Network' />


  // console.log(knownNetworks[networkSelection].text)
  console.log(network)

  console.log(networkSelection)




  return (
    <div className={theme}>
      <div className='bg-gray-100 dark:bg-[#22262f] min-h-screen overflow-hidden'>
        {/* <Toaster /> */}

        {/* header */}
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


              <DropdownHeader2 currentAccount={currentAccount} />



            </div>

          </div>
        </div >

        {/* menu各种icon */}
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


        {/* drawer */}
        <div className="drawer md:hidden bg-black overflow-hidden">
          <input id="my-drawer" type="checkbox" className="drawer-toggle overflow-hidden" />
          <div className="drawer-content bg-white dark:bg-primary overflow-hidden">



            {/* drawer button */}
            <label htmlFor="my-drawer" className="drawer-button m-5 md:hidden w-[158px] h-[40px] flex items-center justify-center active:scale-95 transition duration-150 ease-out py-1   bg-[#4797B5] rounded-[8px] outline-none ">
              <p className='ml-1  text-white text-md font-semibold font-poppins'>NETWORK</p>
              <ChevronRightIcon className=' text-white h-6 w-6 ml-6  ' />
            </label>


            {/* balance */}
            <div className='relative flex m-5 flex-col dark:bg-[#292d36] flex-grow rounded-[30px] '>
              <div className='w-[300px] h-[80px] bg-[#353B4D] rounded-lg m-5 md:m-10 md:ml-16 p-3 px-5'>
                <p className='text-2xl text-gray-700 dark:text-white font-poppins font-semibold'> $793.32 USD </p>
                <p className='text-md text-white cursor-pointer font-poppins'>Your Balance. </p>
              </div>

              <div className="flex items-center justify-evenly ">
                <div className="flex items-center justify-center " onClick={() => setIsSendOpen(true)} >
                  <Button Icon={PaperAirplaneIcon} title='Send' />
                </div>
                <div className="flex items-center justify-center " onClick={() => setIsReceiveOpen(true)}>
                  <Button Icon={DownloadIcon} title='Receive' />
                </div>
              </div>

              <div className='flex flex-col scrollbar-thin max-h-[500px] overflow-y-scroll m-1 md:m-5'>
                {cryptoArr.map((item) => (
                  <CryptoRow key={item.img} name={item.name} img={item.img} price={item.price} />
                ))}
                {cryptoArr.map((item) => (
                  <CryptoRow key={item.img} name={item.name} img={item.img} price={item.price} />
                ))}

              </div>



            </div >


          </div>

          <div className="drawer-side dark:bg-primary   ">
            <label htmlFor="my-drawer" className="drawer-overlay"></label>
            <ul className="menu overflow-y-auto w-80  text-base-content dark: bg-[#22262f] dark:border-r dark:border-[#435474] ">


              <div className='flex items-center justify-between ml-10 z-50 mx-5 mt-3 dark:bg-[#22262f] '>
                <p className='text-lg  font-semibold  text-white font-poppins'>Change Network</p>
                <label htmlFor="my-drawer" className="drawer-button ">

                  <XIcon className=' text-white h-8 w-8 cursor-pointer dark:text-white' />

                </label>
              </div>

              <div className="flex md:flex-col items-center md:h-full " >
                <div className='shadow-xl rounded-xl  w-full h-full min-h-[700px]  dark:bg-[#22262f] px-5'>

                  <div className='scrollbar-thin max-h-[400px] overflow-y-scroll  mt-5 '>


                    <RadioGroup onChange={setNetworkSelection}
                      value={networkSelection || network}>
                      {Object.entries(knownNetworks).map(([hash, network], index) => {
                        const { defaultProvider, text } = network;

                        return <RadioGroup.Option
                          className={({ active, checked }) =>
                            `${checked ? 'bg-[#B186D2] ' : 'bg-[#2E323C] '} mb-3 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-[260px] h-[75px]`
                          }
                          key={hash}
                          value={hash}
                        >
                          {({ active, checked }) => (
                            <div className='flex w-full items-center justify-between'>
                              <div className='flex items-center'>
                                <div className='text-sm'>
                                  <RadioGroup.Label
                                    as='p'
                                    // className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                                    className={`text-lg font-semibold font-poppins  ${checked ? 'text-white' : 'text-[#B6B7BC]'}`}

                                  >
                                    {text.substring(0, text.length - 8)}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as='span'
                                    className={`inline text-sm ${checked ? 'text-white font-poppins' : 'text-[#B6B7BC] font-poppins'}`}

                                  // className={`inline ${checked ? 'text-stone-100' : 'text-gray-500'}`}
                                  >
                                    <p className='w-44 truncate'>{':' + ' ' + defaultProvider.slice(6)}</p>

                                    {/* {defaultProvider} */}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked && (
                                <div className=''>
                                  <div className='relative items-center w-[52px] h-[52px] my-auto cursor-pointer '>
                                    <Image
                                      layout='fill'
                                      objectFit='contain'
                                      src={check.src}
                                    />
                                    <ChevronDownIcon className='absolute top-[13px] left-[12px] z-50 h-7 w-7 text-[#B186D2]' />
                                  </div>


                                </div>
                              )}
                            </div>
                          )}
                        </RadioGroup.Option>;
                      })}
                    </RadioGroup>
                    <RadioGroup onChange={setNetworkSelection}
                      value={networkSelection || network}>
                      {Object.entries(knownNetworks).map(([hash, network], index) => {
                        const { defaultProvider, text } = network;

                        return <RadioGroup.Option
                          className={({ active, checked }) =>
                            `${checked ? 'bg-[#B186D2] ' : 'bg-[#2E323C] '} mb-3 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-[260px] h-[75px]`
                          }
                          key={hash}
                          value={hash}
                        >
                          {({ active, checked }) => (
                            <div className='flex w-full items-center justify-between'>
                              <div className='flex items-center'>
                                <div className='text-sm'>
                                  <RadioGroup.Label
                                    as='p'
                                    // className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                                    className={`text-lg font-semibold font-poppins  ${checked ? 'text-white' : 'text-[#B6B7BC]'}`}

                                  >
                                    {text.substring(0, text.length - 8)}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as='span'
                                    className={`inline text-sm ${checked ? 'text-white font-poppins' : 'text-[#B6B7BC] font-poppins'}`}

                                  // className={`inline ${checked ? 'text-stone-100' : 'text-gray-500'}`}
                                  >
                                    <p className='w-44 truncate'>{':' + ' ' + defaultProvider.slice(6)}</p>

                                    {/* {defaultProvider} */}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked && (
                                <div className=''>
                                  <div className='relative items-center w-[52px] h-[52px] my-auto cursor-pointer '>
                                    <Image
                                      layout='fill'
                                      objectFit='contain'
                                      src={check.src}
                                    />
                                    <ChevronDownIcon className='absolute top-[13px] left-[12px] z-50 h-7 w-7 text-[#B186D2]' />
                                  </div>


                                </div>
                              )}
                            </div>
                          )}
                        </RadioGroup.Option>;
                      })}
                    </RadioGroup>
                    <RadioGroup onChange={setNetworkSelection}
                      value={networkSelection || network}>
                      {Object.entries(knownNetworks).map(([hash, network], index) => {
                        const { defaultProvider, text } = network;

                        return <RadioGroup.Option
                          className={({ active, checked }) =>
                            `${checked ? 'bg-[#B186D2] ' : 'bg-[#2E323C] '} mb-3 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-[260px] h-[75px]`
                          }
                          key={hash}
                          value={hash}
                        >
                          {({ active, checked }) => (
                            <div className='flex w-full items-center justify-between'>
                              <div className='flex items-center'>
                                <div className='text-sm'>
                                  <RadioGroup.Label
                                    as='p'
                                    // className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                                    className={`text-lg font-semibold font-poppins  ${checked ? 'text-white' : 'text-[#B6B7BC]'}`}

                                  >
                                    {text.substring(0, text.length - 8)}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as='span'
                                    className={`inline text-sm ${checked ? 'text-white font-poppins' : 'text-[#B6B7BC] font-poppins'}`}

                                  // className={`inline ${checked ? 'text-stone-100' : 'text-gray-500'}`}
                                  >
                                    <p className='w-44 truncate'>{':' + ' ' + defaultProvider.slice(6)}</p>

                                    {/* {defaultProvider} */}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked && (
                                <div className=''>
                                  <div className='relative items-center w-[52px] h-[52px] my-auto cursor-pointer '>
                                    <Image
                                      layout='fill'
                                      objectFit='contain'
                                      src={check.src}
                                    />
                                    <ChevronDownIcon className='absolute top-[13px] left-[12px] z-50 h-7 w-7 text-[#B186D2]' />
                                  </div>


                                </div>
                              )}
                            </div>
                          )}
                        </RadioGroup.Option>;
                      })}
                    </RadioGroup>







                  </div>

                  <div className='cursor-pointer mx-auto rounded-lg my-3 w-[200px] h-[100px] border-2 border-[#4798B3] border-dashed ' onClick={() => setAddNetworkModalOpen(true)}>
                    <div className='mx-auto flex relative items-center w-[70px] h-[70px] my-auto  cursor-pointer'
                    // onClick={() => router.push('/')}
                    >
                      <Image
                        layout='fill'
                        objectFit='contain'
                        src={addNetworkButton.src}
                      />

                      <p className='absolute top-[60px] -left-6 whitespace-nowrap text-lg font-semibold font-poppins text-white'>Add Network</p>
                    </div>

                  </div>


                  <div className='flex justify-center mt-6'>
                    {network == networkSelection
                      ?
                      <p className='flex items-center justify-center   outline-none z-50 text-md text-md font-semibold font-poppins'>Already On {knownNetworks[networkSelection].text}</p>
                      :
                      <button
                        // disabled={network == networkSelection}
                        className='flex w-[260px] h-[65px] items-center justify-center active:scale-95 transition duration-150 ease-out py-3 px-6 font-medium text-primary bg-[#363E52] rounded-[10px] outline-none z-50'
                        onClick={async () => {
                          await changeNetwork();
                        }}
                      >
                        <p className='text-white text-lg font-semibold font-poppins'>Switch Network</p>

                      </button>}


                  </div>

                </div>
              </div>





            </ul>
          </div>
        </div>

        < main className='hidden md:grid md:grid-cols-12 bg-gray-100 dark:bg-[#22262f] max-w-7xl mx-auto' >

          {/* under header  */}
          <div className='col-span-12 ' >


            <div className='flex-col md:h-full  flex md:flex-row  m-10'>

              <div>
                <button
                  className='hidden w-[158px] h-[40px] md:flex items-center justify-center active:scale-95 transition duration-150 ease-out py-1   bg-[#4797B5] rounded-[8px] outline-none '
                // onClick={() => setSidebar(!sidebar)}
                >
                  <p className='ml-1  text-white text-md font-semibold font-poppins'>NETWORK</p>

                  <ChevronRightIcon className=' text-white h-6 w-6 ml-6  ' />
                </button>

                {/* network sidebar */}
                {sidebar ?
                  <div className=" hidden md:inline-flex md:flex-col bg-[#22262f] items-center md:h-full mr-10" >
                    <div className=' w-full h-full min-h-[700px]  dark:bg-[#22262f]'>

                      <div className='scrollbar-thin max-h-[500px] overflow-y-scroll  mt-10 pr-2'>


                        <RadioGroup onChange={setNetworkSelection}
                          value={networkSelection || network}>
                          {Object.entries(knownNetworks).map(([hash, network], index) => {
                            const { defaultProvider, text } = network;

                            return <RadioGroup.Option
                              className={({ active, checked }) =>
                                `${checked ? 'bg-[#B186D2] ' : 'bg-[#2E323C] '} mb-3 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-[260px] h-[75px]`
                              }
                              key={hash}
                              value={hash}
                            >
                              {({ active, checked }) => (
                                <div className='flex w-full items-center justify-between'>
                                  <div className='flex items-center'>
                                    <div className='text-sm'>
                                      <RadioGroup.Label
                                        as='p'
                                        // className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                                        className={`text-lg font-semibold font-poppins  ${checked ? 'text-white' : 'text-[#B6B7BC]'}`}

                                      >
                                        {text.substring(0, text.length - 8)}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as='span'
                                        className={`inline text-sm ${checked ? 'text-white font-poppins' : 'text-[#B6B7BC] font-poppins'}`}

                                      // className={`inline ${checked ? 'text-stone-100' : 'text-gray-500'}`}
                                      >
                                        <p className='w-44 truncate'>{':' + ' ' + defaultProvider.slice(6)}</p>

                                        {/* {defaultProvider} */}
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className=''>
                                      <div className='relative items-center w-[52px] h-[52px] my-auto cursor-pointer '>
                                        <Image
                                          layout='fill'
                                          objectFit='contain'
                                          src={check.src}
                                        />
                                        <ChevronDownIcon className='absolute top-[13px] left-[12px] z-50 h-7 w-7 text-[#B186D2]' />
                                      </div>


                                    </div>
                                  )}
                                </div>
                              )}
                            </RadioGroup.Option>;
                          })}
                        </RadioGroup>
                        <RadioGroup onChange={setNetworkSelection}
                          value={networkSelection || network}>
                          {Object.entries(knownNetworks).map(([hash, network], index) => {
                            const { defaultProvider, text } = network;

                            return <RadioGroup.Option
                              className={({ active, checked }) =>
                                `${checked ? 'bg-[#B186D2] ' : 'bg-[#2E323C] '} mb-3 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-[260px] h-[75px]`
                              }
                              key={hash}
                              value={hash}
                            >
                              {({ active, checked }) => (
                                <div className='flex w-full items-center justify-between'>
                                  <div className='flex items-center'>
                                    <div className='text-sm'>
                                      <RadioGroup.Label
                                        as='p'
                                        // className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                                        className={`text-lg font-semibold font-poppins  ${checked ? 'text-white' : 'text-[#B6B7BC]'}`}

                                      >
                                        {text.substring(0, text.length - 8)}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as='span'
                                        className={`inline text-sm ${checked ? 'text-white font-poppins' : 'text-[#B6B7BC] font-poppins'}`}

                                      // className={`inline ${checked ? 'text-stone-100' : 'text-gray-500'}`}
                                      >
                                        <p className='w-44 truncate'>{':' + ' ' + defaultProvider.slice(6)}</p>

                                        {/* {defaultProvider} */}
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className=''>
                                      <div className='relative items-center w-[52px] h-[52px] my-auto cursor-pointer '>
                                        <Image
                                          layout='fill'
                                          objectFit='contain'
                                          src={check.src}
                                        />
                                        <ChevronDownIcon className='absolute top-[13px] left-[12px] z-50 h-7 w-7 text-[#B186D2]' />
                                      </div>


                                    </div>
                                  )}
                                </div>
                              )}
                            </RadioGroup.Option>;
                          })}
                        </RadioGroup>
                        <RadioGroup onChange={setNetworkSelection}
                          value={networkSelection || network}>
                          {Object.entries(knownNetworks).map(([hash, network], index) => {
                            const { defaultProvider, text } = network;

                            return <RadioGroup.Option
                              className={({ active, checked }) =>
                                `${checked ? 'bg-[#B186D2] ' : 'bg-[#2E323C] '} mb-3 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none w-[260px] h-[75px]`
                              }
                              key={hash}
                              value={hash}
                            >
                              {({ active, checked }) => (
                                <div className='flex w-full items-center justify-between'>
                                  <div className='flex items-center'>
                                    <div className='text-sm'>
                                      <RadioGroup.Label
                                        as='p'
                                        // className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                                        className={`text-lg font-semibold font-poppins  ${checked ? 'text-white' : 'text-[#B6B7BC]'}`}

                                      >
                                        {text.substring(0, text.length - 8)}
                                      </RadioGroup.Label>
                                      <RadioGroup.Description
                                        as='span'
                                        className={`inline text-sm ${checked ? 'text-white font-poppins' : 'text-[#B6B7BC] font-poppins'}`}

                                      // className={`inline ${checked ? 'text-stone-100' : 'text-gray-500'}`}
                                      >
                                        <p className='w-44 truncate'>{':' + ' ' + defaultProvider.slice(6)}</p>

                                        {/* {defaultProvider} */}
                                      </RadioGroup.Description>
                                    </div>
                                  </div>
                                  {checked && (
                                    <div className=''>
                                      <div className='relative items-center w-[52px] h-[52px] my-auto cursor-pointer '>
                                        <Image
                                          layout='fill'
                                          objectFit='contain'
                                          src={check.src}
                                        />
                                        <ChevronDownIcon className='absolute top-[13px] left-[12px] z-50 h-7 w-7 text-[#B186D2]' />
                                      </div>


                                    </div>
                                  )}
                                </div>
                              )}
                            </RadioGroup.Option>;
                          })}
                        </RadioGroup>





                      </div>

                      <div className='cursor-pointer mx-auto rounded-lg my-3 w-[200px] h-[100px] border-2 border-[#4798B3] border-dashed ' onClick={() => setAddNetworkModalOpen(true)}>
                        <div className='mx-auto flex relative items-center w-[70px] h-[70px] my-auto  cursor-pointer'
                        // onClick={() => router.push('/')}
                        >
                          <Image
                            layout='fill'
                            objectFit='contain'
                            src={addNetworkButton.src}
                          />
                          <p className='absolute top-[60px] -left-6 whitespace-nowrap text-lg font-semibold font-poppins text-white'>Add Network</p>
                        </div>

                      </div>


                      <div className='flex justify-center mt-6'>
                        {network == networkSelection
                          ?
                          <p className='flex items-center justify-center   outline-none z-50 text-md text-md font-semibold font-poppins'>Already On {knownNetworks[networkSelection].text}</p>
                          :
                          <button
                            // disabled={network == networkSelection}
                            className='flex w-[260px] h-[65px] items-center justify-center active:scale-95 transition duration-150 ease-out py-3 px-6 font-medium text-primary bg-[#363E52] rounded-[10px] outline-none z-50'
                            onClick={async () => {
                              await changeNetwork();
                            }}
                          >
                            <p className='text-white text-lg font-semibold font-poppins'>Switch Network</p>

                          </button>}


                      </div>

                    </div>
                  </div>
                  : null}
              </div>

              {/* balance */}
              <div className='relative hidden md:flex md:flex-col dark:bg-[#292d36] flex-grow rounded-[30px] '>
                <div className='w-[300px] h-[80px] bg-[#353B4D] rounded-lg m-10 ml-16 p-3 px-5'>
                  <p className='text-2xl text-gray-700 dark:text-white font-poppins font-semibold'> $793.32 USD </p>
                  <p className='text-md text-white cursor-pointer font-poppins'>Your Balance. </p>
                </div>

                <div className="flex items-center justify-evenly ">
                  <div className="flex items-center justify-center " onClick={() => setIsSendOpen(true)} >
                    <Button Icon={PaperAirplaneIcon} title='Send' />
                  </div>
                  <div className="flex items-center justify-center " onClick={() => setIsReceiveOpen(true)}>
                    <Button Icon={DownloadIcon} title='Receive' />
                  </div>
                </div>

                <div className='flex flex-col scrollbar-thin max-h-[500px] overflow-y-scroll m-5'>
                  {cryptoArr.map((item) => (
                    <CryptoRow key={item.img} name={item.name} img={item.img} price={item.price} />
                  ))}
                  {cryptoArr.map((item) => (
                    <CryptoRow key={item.img} name={item.name} img={item.img} price={item.price} />
                  ))}
                </div>


                {/* gradient light */}

                {/* <div className="absolute z-10 -left-96 top-96 w-[200px] h-[200px] rounded-full pink__gradient" />
                <div className="absolute z-10 -right-24 top-32 w-[200px] h-[200px] rounded-full blue__gradient " /> */}



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
                      {`Network changed to ${knownNetworks[networkSelection].text}`}
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
                      className='py-3 px-6 font-medium text-[18px] text-primary bg-[#c67391] rounded-[10px] outline-none '
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

