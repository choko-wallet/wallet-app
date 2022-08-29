// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0
import { GetServerSideProps } from 'next';
import { Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import {
  CheckCircleIcon, PaperAirplaneIcon, ChevronDownIcon, DocumentDuplicateIcon,
  DownloadIcon
} from '@heroicons/react/solid';
import {
  BellIcon, CogIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  HomeIcon, MoonIcon, SunIcon, TranslateIcon, UserIcon
} from '@heroicons/react/outline';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

import Image from 'next/image'
import React, { Fragment, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import btcIcon from '../../images/btc.png'
import btcQr from '../../images/btcqr.png'
import Modal from '../../components/Modal'


// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '../../features/redux/selectors';
import { loadUserAccount } from '../../features/slices/userSlice';
import { bip39ToEntropy } from '@polkadot/wasm-crypto';


interface Props {
  coinPriceData: object,
}

/* eslint-disable sort-keys */
function Home({ coinPriceData }: Props): JSX.Element {

  const { setTheme, theme } = useTheme();

  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');

  const [mounted, setMounted] = useState<boolean>(false);
  const [isNetworkChangeOpen, setIsNetworkChangeOpen] = useState<boolean>(false);
  const [isSendOpen, setIsSendOpen] = useState<boolean>(false);
  const [isReceiveOpen, setIsReceiveOpen] = useState<boolean>(false);



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
    const notification = toast.loading('Changing Network...', {
      style: {
        background: 'green',
        color: 'white',
        // fontWeight: "bolder",
        // fontFamily: "Poppins",
        fontSize: '17px',
        padding: '20px'
      }
    });

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log('changeNetwork');
        toast.dismiss(notification);

        setIsNetworkChangeOpen(true);

        resolve();
      }, 3000);
    });
  };

  function closeModal2() {
    setIsSendOpen(false)
  }

  function closeModal3() {
    setIsReceiveOpen(false)

  }

  console.log(coinPriceData)

  return (
    <div className='bg-gray-100'>
      {/* header */}
      <div className='sticky top-0 z-20 bg-white shadow-md'>
        <div className='flex justify-between max-w-7xl p-2 lg:mx-auto'>
          <div className='flex items-center justify-center space-x-10' >
            <div className='relative items-center w-10 h-10 my-auto cursor-pointer'
              onClick={() => router.push('/')}>
              <Image
                layout='fill'
                objectFit='contain'
                src={btcIcon.src}
              />
            </div>


          </div>

          <div className='flex items-center text-gray-500 '>

            <div className='flex items-center space-x-8 text-gray-500 mr-6 '>
              <HomeIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125'
                onClick={() => router.push('/home')} />

              <div className='relative transition duration-150 ease-out cursor-pointer md:inline-flex '>
                <BellIcon className='h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125' />
                <div className="animate-pulse absolute flex items-center justify-center w-5 h-5 text-xs text-white bg-red-400 rounded-full -right-2 -top-1">
                  3</div>
              </div>
              <CogIcon className='h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125' />


            </div>
            {theme === 'light'
              ? <SunIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125'
                onClick={() => setTheme('dark')} />
              : <MoonIcon className='hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125'
                onClick={() => setTheme('light')} />
            }

            <div className='dropdown dropdown-hover hidden md:inline '>
              <label className='btn m-1 border-transparent hover:border-transparent bg-transparent hover:bg-transparent text-gray-900 !outline-none'>
                <TranslateIcon className='h-5 cursor-pointer ' />
                <ChevronDownIcon className='h-5 cursor-pointer ' />
              </label>
              <ul className='p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52'>
                <li><a>English</a></li>
                <li><a>中文</a></li>
              </ul>
            </div>

            <div >
              <Popover className='relative w-48 md:w-64 '>
                {({ open }) => (
                  <>
                    <Popover.Button
                      className={`
                    ${open ? '' : 'text-opacity-90'} btn btn-ghost bg-stone-200 normal-case flex justify-between w-48 md:w-64`}
                    >
                      <UserCircleIcon className='h-6 w-6 ' />
                      <p className='hidden md:inline-flex'>{currentAccount.substring(0, 7)} ... {currentAccount.substring(currentAccount.length - 7, currentAccount.length)}</p>

                      <p className='inline-flex md:hidden'>{currentAccount.substring(0, 6)} ...</p>
                      <ChevronDownIcon className=' text-gray-500 h-6 w-6 ' />

                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter='transition ease-out duration-200'
                      enterFrom='opacity-0 translate-y-1'
                      enterTo='opacity-100 translate-y-0'
                      leave='transition ease-in duration-150'
                      leaveFrom='opacity-100 translate-y-0'
                      leaveTo='opacity-0 translate-y-1'
                    >
                      <Popover.Panel className='absolute z-10 w-full max-w-sm transform sm:px-0 lg:max-w-3xl'>
                        <div className='overflow-hidden rounded-lg shadow-lg'>
                          <div className='relative grid grid-cols-2 gap-4 bg-white py-5'>
                            {allAccounts.map((name, index) => (
                              <div
                                className='px-5 items-center col-span-2 rounded-lg py-2 transition duration-150 ease-in-out hover:bg-gray-50'
                                key={index}
                              >
                                <p className='text-sm font-medium text-gray-900 normal-case'> {name.substring(0, 13)} ... {name.substring(name.length - 13, name.length)}</p>
                              </div>
                            ))}
                          </div>
                          <div className='bg-gray-50 p-4'>
                            <div
                              className='flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100'
                              onClick={() => router.push('/account')}
                            >
                              <span className='flex items-center'>
                                <span className='text-sm font-medium text-gray-900'>
                                  Add New Account
                                </span>
                              </span>
                              <span className='block text-sm text-gray-500'>
                                Create or Import new Account
                              </span>
                            </div>
                          </div>

                          <div className='bg-gray-200 p-4'>
                            <div
                              className='flow-root rounded-md px-2 py-2 transition duration-200 ease-in-out hover:bg-gray-100'
                            >
                              <span className='flex items-center'>
                                <span className='text-sm font-medium text-gray-900'>
                                  Remove Account
                                </span>
                              </span>
                              <span className='block text-sm text-gray-500'>
                                Remove Current Account
                              </span>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </div>

          </div>

        </div>
      </div >


      <main className='grid grid-cols-12 min-h-screen bg-gray-100 max-w-7xl mx-auto'>
        <Toaster />




        {/* under header  */}
        <div className='col-span-12 '>


          <div className='flex-col md:h-full  flex md:flex-row'>

            {/* balance */}
            <div className='flex flex-grow m-5 h-[300px] shadow-xl rounded-xl bg-white'>
              <div className='card p-5 md:p-10'>
                <h2 className='card-title text-3xl'> $793.32 </h2>
                <h3>Your avalaible token Balance on the current network. </h3>
              </div>

              <div className="flex items-center justify-evenly">
                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsSendOpen(true)}
                    className="rounded-md bg-black bg-opacity-60 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 flex items-center justify-center"
                  >
                    <PaperAirplaneIcon className='rotate-45 text-white h-5 w-5' />Send
                  </button>
                </div>

                <div className="flex items-center justify-center">
                  <button
                    type="button"
                    onClick={() => setIsReceiveOpen(true)}
                    className="rounded-md bg-black bg-opacity-60 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 flex items-center justify-center"
                  >
                    <DownloadIcon className=' text-white h-5 w-5' />Receive
                  </button>
                </div>


              </div>
            </div >

            {/* network */}
            <div className=" flex flex-col items-center px-5 md:px-0 md:h-full " >
              <div className='shadow-xl rounded-xl bg-white w-full md:h-full md:bg-blue-100 '>
                <p className='text-lg font-semibold text-gray-600 mt-5 ml-10 mx-auto'>Network</p>
                <div className='col-span-12 card p-5 '>
                  <RadioGroup onChange={setNetworkSelection}
                    value={networkSelection || network}>
                    {allNetworks.map(({ info, name, rpc }) => (
                      <RadioGroup.Option
                        className={({ active, checked }) =>
                          `${checked ? 'bg-gray-500 bg-opacity-75 text-white' : 'bg-white'}
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
                                  className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                                >
                                  {name}
                                </RadioGroup.Label>
                                <RadioGroup.Description
                                  as='span'
                                  className={`inline ${checked ? 'text-stone-100' : 'text-gray-500'}`}
                                >
                                  {rpc}
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
                  <button className='btn btn-error btn-circle btn-md'
                    onClick={() => setNetworkSelection('')} >
                    <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
                  </button>

                  <button className={`btn btn-accent btn-circle btn-md ${networkSelection ? '' : 'btn-disabled'}`}
                    onClick={async () => {
                      await changeNetwork();
                    }} >
                    <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
                  </button>
                </div>

              </div>
            </div>
          </div>


          {/* network change modal */}
          <Modal closeModal={closeModal} isOpen={isNetworkChangeOpen}>
            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 text-gray-900'
              >
                Changed successfully
              </Dialog.Title>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  {`Network changed to ${networkSelection}`}
                </p>
              </div>

              <div className='mt-4'>
                <button
                  className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                  onClick={closeModal}
                  type='button'
                >
                  OK
                </button>
              </div>
            </Dialog.Panel>
          </Modal>

          {/* send modal */}
          <Modal closeModal={closeModal2} isOpen={isSendOpen}>
            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 flex items-center'
              >
                <PaperAirplaneIcon className='rotate-45 text-gray-700 h-5 w-5' />
                <p className=' text-gray-700 '>Send Crypto</p>
              </Dialog.Title>
              <div className='mt-2 '>
                <p className=' text-gray-700'>Currency</p>
                <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center  border border-gray-300 rounded-lg '>

                  <div className="relative h-5 w-5">
                    <Image
                      src={btcIcon}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p className='flex flex-grow'> BTC</p>
                  <ChevronDownIcon className=' text-gray-500 h-5 w-5' />

                </div>

                <p className=' '>From</p>
                <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center  border border-gray-300 rounded-lg '>
                  <p className='flex flex-grow'>5G16tBnZEmtnL6A5nxZJpJtUw</p>
                  <DocumentDuplicateIcon className=' text-gray-500 h-5 w-5' />
                </div>

                <p className=' text-gray-700 mt-3 mb-1'>To</p>
                <input type="text" placeholder="Destination Address" className=" input input-bordered input-info w-full " />


                <div className='flex items-end'>
                  <div className='relative'>
                    <p className=' text-gray-700 mt-3 mb-1'>Amount</p>
                    <input type="text" placeholder="0" className=" input input-bordered input-info w-full " />
                    <p className='absolute bottom-3 right-3'>BTC</p>
                  </div>
                  <p className='mx-1 pb-3'>=</p>
                  <div className='relative'>
                    <p className=' text-gray-700'></p>
                    <input type="text" placeholder="0" className=" input input-bordered input-info w-full " />
                    <p className='absolute bottom-3 right-3'>USD</p>
                  </div>

                </div>

                <p className=' text-gray-700 py-1 pt-3'>Network Fee</p>
                <p className=' text-gray-700 text-sm'>0.00000123BTC(US$1.6)</p>
                <p className=' text-gray-700 text-sm'>Estimated confirmation time 20 min</p>


              </div>

              <div className='mt-4'>
                <button
                  className='w-36 text-lg inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2  font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                  onClick={closeModal2}
                  type='button'
                >
                  Send
                </button>
              </div>
            </Dialog.Panel>
          </Modal>

          {/* receive modal */}
          <Modal closeModal={closeModal3} isOpen={isReceiveOpen}>
            <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
              <Dialog.Title
                as='h3'
                className='text-lg font-medium leading-6 flex items-center'
              >
                <DownloadIcon className=' text-gray-700 h-5 w-5' />
                <p className=' text-gray-700 flex flex-grow'>Receive Crypto</p>

                <button
                  className='w-16 text-lg inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2  font-medium text-gray-600 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
                  onClick={closeModal3}
                  type='button'
                >
                  <XIcon className='h-5 w-5 duration-300 hover:scale-120 transtion east-out' />
                </button>

              </Dialog.Title>
              <div className='mt-2 '>
                <p className=' text-gray-700'>Currency</p>
                <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center  border border-gray-300 rounded-lg '>

                  <div className="relative h-5 w-5">
                    <Image
                      src={btcIcon}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p className='flex flex-grow'> BTC</p>
                  <ChevronDownIcon className=' text-gray-500 h-5 w-5' />

                </div>

                <p className=' '>Network</p>
                <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center  border border-gray-300 rounded-lg '>
                  <div className="relative h-5 w-5">
                    <Image
                      src={btcIcon}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                  <p className='flex flex-grow'> BTC</p>
                  <ChevronDownIcon className=' text-gray-500 h-5 w-5' />
                </div>


                <p className=' text-gray-700 mt-3 mb-1'>Address</p>
                <div className=' p-2 my-1 text-gray-700 flex space-x-2 items-center  border border-gray-300 rounded-lg '>
                  <p className='flex flex-grow'>5G16tBnZEmtnL6A5nxZJpJtUw</p>
                  <DocumentDuplicateIcon className=' text-gray-500 h-5 w-5' />
                </div>

                <div className="relative h-36 w-36 mx-auto m-3">
                  <Image
                    src={btcQr}
                    layout="fill"
                    objectFit="contain"
                  />
                </div>

                <div className='flex space-x-5'>
                  <div>
                    <p className=' text-gray-700 pt-3'>Expected arrival</p>
                    <p className=' text-gray-700 text-sm'>6 network confirmations</p>
                  </div>
                  <div>
                    <p className=' text-gray-700 pt-3'>Minimum deposit</p>
                    <p className=' text-gray-700 text-sm'>0.0000001BTC</p>
                  </div>
                </div>
                <p className=' text-gray-700 text-sm pt-3'>Send only BTC to this deposit address.</p>
                <p className=' text-gray-700 text-sm'>Ensure the network is {" "}
                  <span className='text-red-400'>Bitcoin</span>.</p>


              </div>


            </Dialog.Panel>
          </Modal>

        </div>

      </main >
    </div>
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


