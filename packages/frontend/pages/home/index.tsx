// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import Footer from '../../components/Footer';
import near from '../../images/btc.png';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  UserCircleIcon, CheckIcon, XIcon,
} from '@heroicons/react/outline';

// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Popover, RadioGroup, Transition } from '@headlessui/react'
import { Fragment, } from 'react'
import toast, { Toaster } from "react-hot-toast";
import { CheckCircleIcon } from '@heroicons/react/solid';

function Home(): JSX.Element {

  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  // const [tab, setTab] = useState<string>('balance');
  const [currentAccount, setCurrentAccount] = useState<string>('5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC');
  const [allAccounts, setAllAccounts] = useState<string[]>([
    '5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
    '6DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
  ]);
  
  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');


  const allNetworks = [{
    name: 'Polkadot',
    info: 'polkadot',
    rpc: 'wss://polkadot.parity.io/ws',
    color: 'red-500',
  }, {
    name: 'Kusama',
    info: 'kusama',
    rpc: 'wss://kusama.parity.io/ws',
    color: 'gray-500',
  }, {
    name: 'SkyeKiwi',
    info: 'skyekiwi',
    rpc: 'wss://rpc.skye.kiwi',
    color: 'blue-500',
  }]

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const changeNetwork = async () => {
    const notification = toast.loading("Changing Network...", {
      style: {
        background: "green",
        color: "white",
        // fontWeight: "bolder",
        fontFamily: "Poppins",
        fontSize: "17px",
        padding: "20px",
      }
    })

    return new Promise<void>((resolve, rej) => {
      setTimeout(() => {
        console.log('changeNetwork')
        toast.dismiss(notification);
        toast("Changed Successfully !", {
          duration: 4000,
          style: {
            background: "green",
            color: "white",
            // fontWeight: "bolder",
            fontFamily: "Poppins",
            fontSize: "17px",
            padding: "20px",
          }
        })

        resolve()
      }, 3000);
    })
  }

  return (<main className='grid grid-cols-12 gap-4 min-h-screen content-between bg-gray-400'>
    <Toaster />
    <div className='col-span-12'>
      <div className="navbar bg-base-100">

        <div className="navbar-start">
          <a className="btn btn-ghost normal-case text-xl">Choko Wallet Logo</a>
        </div>

        <div className="navbar-center">              
          
        </div>

        <div className="navbar-end">
        <Popover className="relative">
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                    ${open ? '' : 'text-opacity-90'} btn btn-ghost bg-stone-200 normal-case`}
                >
                  <UserCircleIcon className='h-6 w-6 mr-5' /> ... {currentAccount.substring(25, currentAccount.length)}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 w-full max-w-sm transform sm:px-0 lg:max-w-3xl">
                    <div className="overflow-hidden rounded-lg shadow-lg">
                      <div className="relative grid grid-cols-2 gap-4 bg-white py-5">
                        {allAccounts.map((name, index) => (
                          <div
                            key={index}
                            className="px-5 items-center col-span-2 rounded-lg py-2 transition duration-150 ease-in-out hover:bg-gray-50"
                          >
                            <p className="text-sm font-medium text-gray-900 normal-case"> {name.substring(0, 13)} ... {name.substring(name.length - 13, name.length)}</p>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-100 p-4">
                        <a
                          onClick={ () => router.push('/account') }
                          className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100"
                        >
                          <span className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                              Add New Account
                            </span>
                          </span>
                          <span className="block text-sm text-gray-500">
                            Create or Import new Account
                          </span>
                        </a>
                      </div>

                      <div className="bg-gray-200 p-4">
                        <a
                          href="##"
                          className="flow-root rounded-md px-2 py-2 transition duration-150 ease-in-out hover:bg-gray-100"
                        >
                          <span className="flex items-center">
                            <span className="text-sm font-medium text-gray-900">
                              Remove Account
                            </span>
                          </span>
                          <span className="block text-sm text-gray-500">
                            Remove Current Account
                          </span>
                        </a>
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

    <div className='col-span-6 shadow-xl rounded-xl col-start-3 bg-white'>
      <div className='flex flex-col items-center pb-10 m-10 mx-auto space-y-3'>
        <p className='mt-8 text-lg font-semi-bold' >Total Balance</p>
        <p className='text-3xl font-extrabold '>$793.32</p>
        
        <br/><br/>
        {/* <div className='flex p-2 space-x-10'>
          <div>
            <div className='flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full'>
              <PaperAirplaneIcon className='h-6 text-white cursor-pointer ' />
            </div>
            <p className='pt-2 text-gray-800'>Send</p>
          </div>
          <div className='flex flex-col items-center justify-center'>
            <div className='flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full'>
              <ArrowDownIcon className='h-6 text-white cursor-pointer ' />
            </div>
            <p className='pt-2 text-gray-800'>Receive</p>
          </div>
          <div>
            <div className='flex items-center justify-center w-10 h-10 bg-gray-500 rounded-full'>
              <SwitchHorizontalIcon className='h-6 text-white cursor-pointer ' />
            </div>
            <p className='pt-2 text-gray-800'>Swap</p>
          </div>
        </div> */}

        <div className='w-10/12 rounded-lg h-72 bg-gray-300 '>
          <div className='flex justify-between text-white text-sm p-2 w-full  bg-gray-400 rounded-lg'>
            <p>Your Portfolio</p>
            <p>Token Balance</p>
          </div>

          <div className=' mb-5  w-full  bg-gray-300 rounded-lg flex justify-between '>
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
                <p className='text-xs'>$10.12</p>
              </div>
            </div>

            <div className='p-1'>
              <div className='text-right p-3'>
                <p className='text-lg font-bold'>78.3912 Near</p>
                <p className='text-xs'>$793.12USD</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div >

    <div className='col-span-2 shadow-xl rounded-xl bg-white grid grid-col-12 content-between'>
      <div className='col-span-12 '>
        <RadioGroup value={networkSelection ? networkSelection : network} onChange={setNetworkSelection}>
            {allNetworks.map(({ name, info, rpc, color }) => (
              <RadioGroup.Option
                value={info}
                className={({ active, checked }) =>
                  `${ checked ? `bg-gray-500 bg-opacity-75 text-white` : 'bg-white' }
                  m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center">
                      <div className="text-sm">
                        <RadioGroup.Label
                          as="p"
                          className={`font-medium  ${checked ? 'text-white' : 'text-gray-900'}`}
                        >
                          {name}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className={`inline ${checked ? 'text-stone-100' : 'text-gray-500'}`}
                        >
                          {rpc}
                        </RadioGroup.Description>
                      </div>
                    </div>
                    {checked && (
                      <div className="shrink-0 text-white">
                        <CheckCircleIcon className="h-6 w-6" />
                      </div>
                    )}
                  </div>
                )}
              </RadioGroup.Option>
            ))}
        </RadioGroup>
      </div>
      <div className='col-span-3 col-start-4 mb-5'>
        <button className='btn btn-error btn-circle btn-md'
          onClick={() => setNetworkSelection('')} >
          <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <div className='col-span-3 col-start-8'>
        <button className={`btn btn-accent btn-circle btn-md ${networkSelection ? '' : 'btn-disabled'}`}
          onClick={async () => {
            await changeNetwork();
            alert(`Network changed to ${networkSelection}`);
            setNetworkSelection('')
            setNetwork(networkSelection);
          }} >
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
    </div>

    <div className='col-span-12'>
      <Footer />
    </div>
  </main>);
}

export default Home;