// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '../../features/redux/selectors';
import { loadUserAccount } from '../../features/slices/userSlice';

/* eslint-disable sort-keys */
function Home (): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');

  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  }, [dispatch, router, userAccount]);

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

  function closeModal () {
    setIsOpen(false);
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
          {/* TODO: fix the logo */}
          <a className='btn btn-ghost normal-case text-xl'
            onClick={() => router.push('/')}>
              Choko
            {/* <Image
                  className='relative w-10 m-0'
                  // layout='fill'
                  objectFit='fill'
                  src={logo}
                /> */}
          </a>
        </div>

        <div className='navbar-center'></div>

        <div className='navbar-end'>
          <Popover className='relative'>
            {({ open }) => (
              <>
                <Popover.Button
                  className={`
                    ${open ? '' : 'text-opacity-90'} btn btn-ghost bg-stone-200 normal-case`}
                >
                  <UserCircleIcon className='h-6 w-6 mr-5' />
                  <span className='hidden md:block'>{currentAccount.substring(0, 13)} ... {currentAccount.substring(currentAccount.length - 13, currentAccount.length)}</span>
                  <span className='block md:hidden'>{currentAccount.substring(0, 10)} ...</span>
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

    <div className='col-span-12 mx-3 h-[30vh] md:h-[70vh] md:col-span-6 md:col-start-3 shadow-xl rounded-xl  bg-white'>
      <div className='card p-10'>
        <h2 className='card-title text-3xl'> $793.32 </h2>
        <h3>Your avalaible token Balance on the current network. </h3>
      </div>
    </div >

    <div className='col-span-12 mx-3 mb-10 md:mb-0 md:col-span-2 md:col-start-9 shadow-xl rounded-xl bg-white grid grid-col-12 content-between'>
      <div className='col-span-12 card p-5'>
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
      <div className='col-span-3 col-start-3 mb-5 md:mb-20'>
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

    <div className='col-span-12'> </div>

    <Transition appear
      as={Fragment}
      show={isOpen}>
      <Dialog as='div'
        className='relative z-10'
        onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
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
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  </main>);
}

export default Home;
