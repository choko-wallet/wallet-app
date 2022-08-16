// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Footer from '../../components/Footer';
import near from '../../images/btc.png';
// import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  PaperAirplaneIcon, ArrowDownIcon, SwitchHorizontalIcon, ChevronDownIcon
} from '@heroicons/react/outline';

// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Menu, Transition } from '@headlessui/react'
import { Fragment, } from 'react'
import toast, { Toaster } from "react-hot-toast";

function Home(): JSX.Element {

  // const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  // const [tab, setTab] = useState<string>('balance');
  const [currentAccount, setCurrentAccount] = useState<string>('5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC');
  const [allAccounts, setAllAccounts] = useState<string[]>([
    '5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
    '6DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
  ]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }



  function ArchiveInactiveIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="8"
          width="10"
          height="8"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="4"
          width="12"
          height="4"
          fill="#EDE9FE"
          stroke="#A78BFA"
          strokeWidth="2"
        />
        <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    )
  }

  function ArchiveActiveIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="5"
          y="8"
          width="10"
          height="8"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <rect
          x="4"
          y="4"
          width="12"
          height="4"
          fill="#8B5CF6"
          stroke="#C4B5FD"
          strokeWidth="2"
        />
        <path d="M8 12H12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    )
  }

  function MoveInactiveIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 4H16V10" stroke="#A78BFA" strokeWidth="2" />
        <path d="M16 4L8 12" stroke="#A78BFA" strokeWidth="2" />
        <path d="M8 6H4V16H14V12" stroke="#A78BFA" strokeWidth="2" />
      </svg>
    )
  }

  function MoveActiveIcon(props: any) {
    return (
      <svg
        {...props}
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M10 4H16V10" stroke="#C4B5FD" strokeWidth="2" />
        <path d="M16 4L8 12" stroke="#C4B5FD" strokeWidth="2" />
        <path d="M8 6H4V16H14V12" stroke="#C4B5FD" strokeWidth="2" />
      </svg>
    )
  }




  const changeNetwork = () => {
    const notification = toast.loading("Changing Network...", {
      style: {
        background: "green",
        color: "white",
        fontWeight: "bolder",
        fontFamily: "Poppins",
        fontSize: "17px",
        padding: "20px",
      }
    })



    setTimeout(() => {
      console.log('changeNetwork')
      toast.dismiss(notification);
      toast("Changed Successfully !", {
        duration: 4000,
        style: {
          background: "green",
          color: "white",
          fontWeight: "bolder",
          fontFamily: "Poppins",
          fontSize: "17px",
          padding: "20px",
        }
      })
    }, 3000);


  }

  return (
    <>
      <main className='grid grid-cols-12 gap-4 min-h-screen content-between bg-gray-400'>
        <Toaster />
        <div className='col-span-12'>
          <div className="navbar bg-base-100">
            <div className="navbar-start">
              <a className="btn btn-ghost normal-case text-xl">Choko Wallet Logo</a>
              {/* <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <DotsVerticalIcon className="h-5 w-5" />
            </label>
            <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Setting</a></li>
              <li><a>About</a></li>
            </ul>
          </div> */}
            </div>
            <div className="navbar-center">
              <div className="dropdown">
                <label tabIndex={0} className="btn btn-ghost normal-case">
                  Current Account: {currentAccount}
                </label>
                <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box">
                  {allAccounts.map((account, index) => (
                    <li key={index}>
                      <a onClick={() => setCurrentAccount(account)}>@{account}</a>
                    </li>
                  ))}
                  <div className='divider'></div>
                </ul>
              </div>
              {/* <a className="btn btn-ghost normal-case text-xl">Choko Wallet</a> */}
            </div>
            <div className="navbar-end">
              <button className="btn btn-ghost btn-circle">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </button>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
            </div>
          </div>
        </div>


        <div className='relative col-span-12'>
          <main className='flex flex-col items-center w-6/12 pb-10 m-10 mx-auto space-y-3 shadow-inner shadow-gray-500 rounded-3xl bg-white'>
            <p className='mt-8 text-lg italic font-semi-bold' >Total Balance</p>
            <p className='text-3xl font-extrabold '>$793.32</p>
            <p className='font-mono text-xs text-gray-500 '>in Choko Wallet</p>

            <div className='flex p-2 space-x-10'>
              <div>
                <div className='flex items-center justify-center w-10 h-10 bg-[#897db5] rounded-full'>
                  <PaperAirplaneIcon className='h-6 text-white rotate-45 cursor-pointer ' />
                </div>
                <p className='pt-2 text-gray-800'>Send</p>
              </div>
              <div className='flex flex-col items-center justify-center'>
                <div className='flex items-center justify-center w-10 h-10 bg-[#897db5] rounded-full'>
                  <SwitchHorizontalIcon className='h-6 text-white cursor-pointer ' />

                </div>
                <p className='pt-2 text-gray-800'>Receive</p>
              </div>
              <div>
                <div className='flex items-center justify-center w-10 h-10 bg-[#897db5] rounded-full'>
                  <ArrowDownIcon className='h-6 text-white cursor-pointer ' />
                </div>
                <p className='pt-2 text-gray-800'>Swap</p>
              </div>

            </div>

            <div className='w-10/12 rounded-lg h-72 bg-[#cfbcdb] '>
              <div className='flex justify-between text-white text-sm p-2 w-full  bg-[#c1aed6] rounded-lg'>
                <p>Your Portfolio</p>
                <p>Token Balance</p>
              </div>

              <div className=' mb-5  w-full  bg-[#cfbcdb] rounded-lg flex justify-between '>
                <div className='flex items-center' >
                  <div className='relative w-6 h-6 m-3'>
                    <Image
                      layout='fill'
                      objectFit='contain'
                      src={near}
                    />
                  </div>
                  <div className='p-1'>
                    <p className='text-lg font-bold'>NEAR</p>
                    <p className='text-xs text-white'>$10.12</p>
                  </div>
                </div>

                <div className='p-1'>
                  <div className='text-right p-3'>
                    <p className='text-lg font-bold'>78.3912 Near</p>
                    <p className='text-xs text-white'>$793.12USD</p>
                  </div>
                </div>
              </div>

            </div>

          </main >

          <div className='absolute top-0 right-20'>
            <div className="bg-transparent h-10 w-64   my-1 text-right z-50">
              <Menu as="div" className="relative inline-block text-left rounded-full">
                <div className='flex items-center justify-center'>
                  <Menu.Button className="inline-flex w-full justify-center bg-white border border-gray-700 bg-opacity-20 px-4 py-2 text-sm font-medium  hover:bg-opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 rounded-full text-gray-800 ">

                    Network
                    <ChevronDownIcon
                      className="w-5 h-5 ml-2 -mr-1 text-gray-400 hover:text-violet-100"
                      aria-hidden="true"
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={() => changeNetwork()}
                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <ArchiveActiveIcon
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                            ) : (
                              <ArchiveInactiveIcon
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                            )}
                            NEAR
                          </button>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button onClick={() => changeNetwork()}
                            className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                              } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                          >
                            {active ? (
                              <MoveActiveIcon
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                            ) : (
                              <MoveInactiveIcon
                                className="w-5 h-5 mr-2"
                                aria-hidden="true"
                              />
                            )}
                            ETH
                          </button>
                        )}
                      </Menu.Item>
                    </div>

                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div >

        <div className='col-span-12 content-end'>
          <Footer />
        </div>
      </main>

    </>);
}

export default Home;
