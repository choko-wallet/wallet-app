// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Popover, RadioGroup, Transition, Dialog } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
// import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';


import near from '../../images/btc.png';

/* eslint-disable sort-keys */
function Home(): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  // const [tab, setTab] = useState<string>('balance');
  const [currentAccount, setCurrentAccount] = useState<string>('5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC');
  const [allAccounts, setAllAccounts] = useState<string[]>([
    '5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
    '6DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC'
  ]);

  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');

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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  console.log(networkSelection)

  function closeModal() {
    setIsOpen(false);
    setNetworkSelection('');
    setNetwork(networkSelection);
    console.log('close')
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

        setIsOpen(true);

        resolve();
      }, 3000);
    });
  };

  return (<main className='grid grid-cols-12 gap-4 min-h-screen content-between bg-gray-400'>
    <Toaster />
    <div className='col-span-12'>
      <div className='navbar bg-base-100'>

        <div className='navbar-start'>
          <a className='btn btn-ghost normal-case text-xl'
            onClick={() => router.push('/')}>Choko Wallet Logo</a>
        </div>

        <div className='navbar-center'>

        </div>

        <div className='navbar-end'>
          <Popover className='relative'>
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

    <div className='col-span-10 col-start-2 md:col-span-6 md:col-start-2 2xl:md:col-start-3 shadow-xl rounded-xl  bg-white'>
      <div className='flex flex-col items-center pb-10 m-10 mx-auto space-y-3'>
        <p className='mt-8 text-lg font-semi-bold' >Total Balance</p>
        <p className='text-3xl font-extrabold '>$793.32</p>

        <br /><br />
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

    <div className='col-span-10 col-start-2 md:col-span-4 md:col-start-8 2xl:md:col-span-3 2xl:col-start-9 shadow-xl rounded-xl bg-white grid grid-col-12 content-between'>
      <div className='col-span-12 '>
        <RadioGroup onChange={setNetworkSelection}
          value={networkSelection || network}>
          {allNetworks.map(({ info, name, rpc }) => (
            <RadioGroup.Option
              className={({ active, checked }) =>
                `${checked ? 'bg-gray-500 bg-opacity-75 text-white' : 'bg-white'}
                  m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
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

          }} >
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
    </div>

    <div className='col-span-12'>
      {/* <Footer /> */}
    </div>




    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Changed successfully
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    {`Network changed to ${networkSelection}`}
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={closeModal}
                  >
                    OK
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </main>);
}

export default Home;
