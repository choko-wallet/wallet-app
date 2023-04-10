// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
import React, { useState } from 'react';

// import { setOpen } from "@choko-wallet/app-redux";

interface Props {
  options: string[];
}

function DropDownSelect ({ options }: Props): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const [option, setOption] = useState('Ethereum');

  const getTokenImage = (network: string): string => {
    if (network.indexOf('Ethereum') !== -1) {
      return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/eth.png';
    }

    if (network.indexOf('Polygon') !== -1) {
      return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/matic.png';
    }

    if (network.indexOf('Polkadot') !== -1) {
      return 'https://cdn.jsdelivr.net/gh/atomiclabs/cryptocurrency-icons@1a63530be6e374711a8554f31b17e4cb92c25fa5/128/color/dot.png';
    }

    return '';
  };

  const itemVariants = {
    closed: { opacity: 0, transition: { duration: 0.3 }, y: 20 },
    open: {
      opacity: 1,
      transition: { damping: 24, stiffness: 300, type: 'spring' },
      y: 0
    }
  };

  return (
    <div className=' w-full  '>
      <motion.nav
        animate={isOpen ? 'open' : 'closed'}
        className=' w-full  relative '
        initial={false}
      >
        <motion.button
          className='flex items-center justify-between rounded-md w-full xl:bg-white dark:bg-black  md:bg-transparent md:px-4 md:py-2 text-sm font-medium text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 h-10 px-2'
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 1 }}
        >
          <motion.div className='flex'>
            <img
              alt='icon'
              className='w-5 h-5 mr-1 object-contain'
              src={getTokenImage(option)}
            />
            <p className=' text-gray-300'>{option}</p>
          </motion.div>

          <motion.div
            className='flex'
            style={{ originY: 0.55 }}
            transition={{ duration: 0.2 }}
            variants={{
              closed: { rotate: 0 },
              open: { rotate: 180 }
            }}
          >
            <svg height='15'
              viewBox='0 0 20 20'
              width='15'>
              <path d='M0 7 L 20 7 L 10 16'
                fill='white' />
            </svg>
          </motion.div>
        </motion.button>

        <motion.ul
          className='z-50 absolute right-0 left-0 w-full bg-red-300 rounded-md dark:bg-gradient-to-br from-gray-900 to-black shadow-lg border border-gray-700 focus:outline-none p-1'
          style={{ pointerEvents: isOpen ? 'auto' : 'none' }}
          variants={{
            closed: {
              clipPath: 'inset(10% 50% 90% 50% round 10px)',
              transition: {
                bounce: 0,
                duration: 0.3,
                type: 'spring'
              }
            },
            open: {
              clipPath: 'inset(0% 0% 0% 0% round 10px)',
              transition: {
                bounce: 0,
                delayChildren: 0.3,
                duration: 0.7,
                staggerChildren: 0.05,
                type: 'spring'
              }
            }
          }}
        >
          {options.map((option, index) => (
            <motion.li className=''
              key={index}
              variants={itemVariants}>
              <button
                className='text-gray-900 group flex w-full h-12 items-center justify-start rounded-md px-2 py-2 text-sm hover:bg-[#F5CBD5] hover:dark:bg-[#0170BF] hover:text-white'
                onClick={() => {
                  setOption(option);
                  setIsOpen(false);
                }}
              >
                <p className='font-poppins text-black dark:text-white text-start w-32 px-3 whitespace-nowrap'>
                  {option}
                </p>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </motion.nav>
    </div>
  );
}

export default DropDownSelect;
