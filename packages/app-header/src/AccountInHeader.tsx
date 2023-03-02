// Copyright 2021-2022 @choko-wallet/app-header authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { DotsHorizontalIcon, UserCircleIcon } from '@heroicons/react/outline';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { motion, Variants } from 'framer-motion';
import { useRouter } from 'next/router'; // TODO: get rid of this
import React, { Fragment, useEffect, useState } from 'react';

import { Menu, Transition } from '@choko-wallet/app-common';
import { removeAllAccounts, selectCurrentNetwork, selectCurrentUserAccount, selectKnownNetworks, selectUserAccount, useDispatch, useSelector } from '@choko-wallet/app-redux';
import { encodeAddr } from '@choko-wallet/app-utils';

import AccountRow from './AccountRow';

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
      transition: { type: 'spring', stiffness: 300, damping: 24 }
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
    <div className=' xl:w-64 text-right '>

      <motion.nav
        initial={false}
        animate={isOpen ? 'open' : 'closed'}
      // className='bg-red-300 '
      >
        <motion.button
          className='flex items-center justify-center rounded-md w-full bg-transparent md:bg-white dark:bg-transparent md:px-4 md:py-2 h-full text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75'
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 1 }}
        >
          <motion.div className='relative h-[24px] w-[24px] md:h-[28px] md:w-[28px] ml-2'>
            <UserCircleIcon className='h-[24px] w-[24px] md:h-[28px] md:w-[28px] dark:text-white text-black active:scale-125 transition duration-150 ease-out cursor-pointer ' />
          </motion.div>

          <p className='font-poppins text-gray-800 dark:text-white whitespace-nowrap hidden xl:inline-flex text-center items-center justify-certer flex-grow  ml-2 '>
            {currentAddress.substring(0, 7)}
            <DotsHorizontalIcon className='text-gray-800 dark:text-white h-6 w-6 mx-1' />
            {currentAddress.substring(currentAddress.length - 7, currentAddress.length)}
          </p>

          <motion.div
            className='hidden xl:inline-flex '
            style={{ originY: 0.55 }}
            transition={{ duration: 0.2 }}
            variants={{
              open: { rotate: 180 },
              closed: { rotate: 0 }
            }}
          >
            <svg height='15'
              viewBox='0 0 20 20'
              width='15'>
              <path d='M0 7 L 20 7 L 10 16' />
            </svg>
          </motion.div>
        </motion.button>

        <motion.ul
          className='z-50 absolute right-3 md:right-3 mt-1 md:mt-3 w-64 rounded-md bg-gray-100 dark:bg-gradient-to-br from-gray-900 to-black shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none p-1'
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          variants={{
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
              }
            },
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                type: 'spring',
                bounce: 0,
                duration: 0.3
              }
            }
          }}
        >
          {userAccount.map((account, index) => (
            <motion.li className=''
              key={index}
              variants={itemVariants}>
              <AccountRow account={account}
                accountIndex={index}
                network={knownNetworks[currentNetwork]} />
            </motion.li>))
          }

          <motion.li className='z-50'
            variants={itemVariants}>
            <button
              className='text-gray-900 group flex w-full h-12 items-center justify-center rounded-md px-2 py-2 text-sm hover:bg-[#F5CBD5] hover:dark:bg-[#0170BF] hover:text-white'
              onClick={() => router.push('/account')}
            >

              <p className='text-black dark:text-white '>Add New Account</p>

            </button>
          </motion.li>

          <motion.li className='z-50'
            variants={itemVariants}>
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
