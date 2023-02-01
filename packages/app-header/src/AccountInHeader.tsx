// Copyright 2021-2022 @choko-wallet/app-header authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DotsHorizontalIcon, UserCircleIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router'; // TODO: get rid of this
import React, { Fragment, useEffect, useState } from 'react';

import { Menu, Transition } from '@choko-wallet/app-common';
import { removeAllAccounts, selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks, selectUserAccount, useDispatch, useSelector } from '@choko-wallet/app-redux';
import { encodeAddr } from '@choko-wallet/app-utils';

import AccountRow from './AccountRow';
import { motion, Variants } from "framer-motion";


/**
 * Render currentUserAccount address on Header & a drop down of all UserAccount
 */
export default function AccountInHeader(): JSX.Element {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);

  const [ready, setReady] = useState(false);

  const userAccount = useSelector(selectUserAccount);
  const currentUserAccount = useSelector(selectCurrentUserAccount);

  const router = useRouter();

  const knownNetworks = useSelector(selectKnownNetworks);
  const currentNetwork = useSelector(selectCurrentNetwork);

  const itemVariants = {
    open: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    },
    closed: { opacity: 0, y: 20, transition: { duration: 0.3 } }
  };


  const removeAccounts = () => {
    dispatch(removeAllAccounts());
    void router.push('/');
  };

  useEffect(() => {
    if (knownNetworks && currentNetwork) {
      setReady(true);
    }
  }, [knownNetworks, currentNetwork]);

  const currentAddress = encodeAddr(knownNetworks[currentNetwork], currentUserAccount);

  if (!ready) return null;

  return (
    <div className=' md:w-64 text-right lg:ml-12'>
      {/* <Menu as='div'
        className='relative h-12 text-left w-full border-none md:border border-gray-300  dark:border-[#00f6ff] rounded-lg '>

        <Menu.Button className='flex items-center justify-center rounded-md w-full bg-transparent md:bg-white dark:bg-transparent md:px-4 md:py-2 h-full text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'>

          <div className='relative h-[24px] w-[24px] ml-2'>
            <UserCircleIcon className='h-[24px] w-[24px] dark:text-white text-black active:scale-125 transition duration-150 ease-out cursor-pointer ' />
          </div>

          <p className='font-poppins text-gray-800 dark:text-white whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 '>
            {currentAddress.substring(0, 7)}
            <DotsHorizontalIcon className='text-gray-800 dark:text-white h-6 w-6 mx-1' />
            {currentAddress.substring(currentAddress.length - 7, currentAddress.length)}
          </p>
          <ChevronDownIcon className='hidden md:inline dark:text-white ml-2 -mr-1 h-6 w-6 text-gray-800 ' />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='z-50 absolute right-0 mt-1 w-64 md:w-full origin-top-right divide-y divide-gray-100 rounded-md bg-gray-100 dark:bg-gradient-to-br from-gray-900 to-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none '>
            <div className='px-1 py-1 '>
              {userAccount.map((account, index) => (<AccountRow account={account}
                accountIndex={index}
                key={index}
                network={knownNetworks[currentNetwork]} />))}
              <Menu.Item >
                {({ active }) => (
                  <button
                    className={`${active
                      ? 'font-poppins bg-[#F5CBD5] dark:bg-[#0170BF] text-white'
                      : 'font-poppins text-gray-900'
                      } group flex w-full items-center h-12 justify-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => router.push('/account')}
                  >

                    <p className='text-black dark:text-white '>Add New Account</p>

                  </button>
                )}
              </Menu.Item>

              <Menu.Item >
                {({ active }) => (
                  <button
                    className={`${active ? 'bg-[#F5CBD5] dark:bg-[#0170BF] text-white' : 'text-gray-900'
                      } group flex w-full h-12 items-center justify-center rounded-md px-2 py-2 text-sm`}
                    onClick={removeAccounts}
                  >
                    <p className='font-poppins text-black dark:text-white text-center'>Remove All Accounts</p>
                  </button>
                )}
              </Menu.Item>
            </div>

          </Menu.Items>
        </Transition>

      </Menu> */}


      <motion.nav
        initial={false}
        animate={isOpen ? "open" : "closed"}
      // className='bg-red-300 '
      >
        <motion.button
          whileTap={{ scale: 1 }}
          onClick={() => setIsOpen(!isOpen)}
          className='flex items-center justify-center rounded-md w-full bg-transparent md:bg-white dark:bg-transparent md:px-4 md:py-2 h-full text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
        >
          <motion.div className='relative h-[24px] w-[24px] ml-2'>
            <UserCircleIcon className='h-[24px] w-[24px] dark:text-white text-black active:scale-125 transition duration-150 ease-out cursor-pointer ' />
          </motion.div>

          <p className='font-poppins text-gray-800 dark:text-white whitespace-nowrap hidden md:inline-flex text-center items-center justify-certer flex-grow  ml-2 '>
            {currentAddress.substring(0, 7)}
            <DotsHorizontalIcon className='text-gray-800 dark:text-white h-6 w-6 mx-1' />
            {currentAddress.substring(currentAddress.length - 7, currentAddress.length)}
          </p>

          <motion.div
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 }
            }}
            transition={{ duration: 0.2 }}
            style={{ originY: 0.55 }}
            className='hidden md:inline-flex'
          >
            <svg width="15" height="15" viewBox="0 0 20 20">
              <path d="M0 7 L 20 7 L 10 16" />
            </svg>
          </motion.div>
        </motion.button>

        <motion.ul
          className='z-50 absolute right-3 md:right-20 mt-1 w-64 rounded-md bg-gray-100 dark:bg-gradient-to-br from-gray-900 to-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1'
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
              }
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50% round 10px)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
              }
            }
          }}
          style={{ pointerEvents: isOpen ? "auto" : "none" }}
        >
          {userAccount.map((account, index) => (
            <motion.li className='' variants={itemVariants} key={index}>
              <AccountRow account={account}
                accountIndex={index}
                network={knownNetworks[currentNetwork]} />
            </motion.li>))
          }

          <motion.li className='z-50' variants={itemVariants}>
            <button
              className='text-gray-900 group flex w-full h-12 items-center justify-center rounded-md px-2 py-2 text-sm hover:bg-[#F5CBD5] hover:dark:bg-[#0170BF] hover:text-white'
              onClick={() => router.push('/account')}
            >

              <p className='text-black dark:text-white '>Add New Account</p>

            </button>
          </motion.li>

          <motion.li className='z-50' variants={itemVariants}>
            <button
              // className={`${true ? 'bg-[#F5CBD5] dark:bg-[#0170BF] text-white' : 'text-gray-900'
              //   } group flex w-full h-12 items-center justify-center rounded-md px-2 py-2 text-sm`}
              className='text-gray-900 group flex w-full h-12 items-center justify-center rounded-md px-2 py-2 text-sm hover:bg-[#F5CBD5] hover:dark:bg-[#0170BF] hover:text-white'

              onClick={removeAccounts}
            >
              <p className='font-poppins text-black dark:text-white text-center'>Remove All Accounts</p>
            </button>
          </motion.li>

        </motion.ul>
      </motion.nav>



    </div >
  );
}
