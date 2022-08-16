// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RadioGroup, Tab } from '@headlessui/react'
// import { useRouter } from 'next/router';
import {
  PaperAirplaneIcon, ArrowDownIcon, SwitchHorizontalIcon, ChevronDownIcon, CheckIcon
} from '@heroicons/react/outline';

// import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Fragment, } from 'react'
import toast, { Toaster } from "react-hot-toast";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}


function Home(): JSX.Element {

  const allNetworks = [{
    name: 'Polkadot',
    info: 'polkadot',
    rpc: 'wss://polkadot.parity.io/ws',
  }, {
    name: 'Kusama',
    info: 'kusama',
    rpc: 'wss://kusama.parity.io/ws',
  }, {
    name: 'SkyeKiwi',
    info: 'skyekiwi',
    rpc: 'wss://rpc.skye.kiwi',
  }]


  // const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  // const [tab, setTab] = useState<string>('balance');
  const [currentAccount, setCurrentAccount] = useState<string>('5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC');
  const [allAccounts, setAllAccounts] = useState<string[]>([
    '5DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
    '6DFhSMLmnw3Fgc6trbp8AuErcZoJS64gDFHUemqh2FRYdtoC',
  ]);
  const [selectedNetwork, setSelectedNetwork] = useState<string>('polkadot');
  const [network, setNetwork] = useState<string>('polkadot');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
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
      <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400'>
        <div className='col-span-6 col-start-4'>
          <Tab.Group>
            <Tab.List className="grid grid-cols-12 flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-600',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-gray-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Balance
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-600',
                      'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                      selected
                        ? 'bg-white shadow'
                        : 'text-gray-100 hover:bg-white/[0.12] hover:text-white'
                    )
                  }
                >
                  Setting
                </Tab>
            </Tab.List>
            <Tab.Panels className="mt-2">
              <Tab.Panel
                className={classNames(
                  'rounded-xl shadow-xl bg-white p-3 grid grid-cols-12',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                )}
              >
                <div className='col-span-9 p-10'>
                  <h1>Balance: $ {123}</h1>
                  
                </div>
                <div className='col-span-3 col-start-10'>
                  <RadioGroup value={network} onChange={setNetwork}>
                      {allNetworks.map(({ name, info, rpc }) => (
                        <RadioGroup.Option
                          value={info}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? 'ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300'
                                : ''
                            }
                            ${
                              checked ? 'bg-sky-900 bg-opacity-75 text-white' : 'bg-white'
                            }
                              m-5 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                          }
                        >
                          {({ active, checked }) => (
                            <div className="flex w-full items-center justify-between">
                              <div className="flex items-center">
                                <div className="text-sm">
                                  <RadioGroup.Label
                                    as="p"
                                    className={`font-medium  ${
                                      checked ? 'text-white' : 'text-gray-900'
                                    }`}
                                  >
                                    {name}
                                  </RadioGroup.Label>
                                  <RadioGroup.Description
                                    as="span"
                                    className={`inline ${
                                      checked ? 'text-sky-100' : 'text-gray-500'
                                    }`}
                                  >
                                    {rpc}
                                  </RadioGroup.Description>
                                </div>
                              </div>
                              {checked && (
                                <div className="shrink-0 text-white">
                                  <CheckIcon className="h-6 w-6" />
                                </div>
                              )}
                            </div>
                          )}
                        </RadioGroup.Option>
                      ))}
                  </RadioGroup>

                </div>
                
              </Tab.Panel>

              <Tab.Panel
                  className={classNames(
                    'rounded-xl shadow-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                  )}
                >
                  Setting
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </main>

    </>);
}

export default Home;
