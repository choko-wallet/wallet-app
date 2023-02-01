// Copyright 2021-2022 @choko-wallet/network-sidebar-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CheckIcon, PlusSmIcon, XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { RadioGroup } from '@choko-wallet/app-common';
import { removeNetworkAndSave, selectCurrentNetwork, selectKnownNetworks, setCurrentNetwork, setOpen, useDispatch, useSelector } from '@choko-wallet/app-redux';

/**
 * Renders a list of all network avaliable
 */

function NetworkSelection(): JSX.Element {
  const dispatch = useDispatch();

  const currentNetwork = useSelector(selectCurrentNetwork);
  const knownNetworks = useSelector(selectKnownNetworks);

  const [networkSelection, setNetworkSelection] = useState(currentNetwork);

  return (
    <div className=' w-full h-full  dark:bg-[#22262f] flex flex-col justify-between'>
      <div className='scrollbar-thin max-h-[400px] w-[290px]  md:max-h-[450px] overflow-y-scroll  mt-10 '>
        <RadioGroup onChange={setNetworkSelection}
          value={networkSelection}>
          {Object.entries(knownNetworks).map(([hash, { color, isDevelopment, isDisabled, text }]) => {
            if (color === undefined) { // if color undefined, give randomColor
              const randomColors = ['#2497E7', '#fc6b03', '#befc03', '#5efc03', '#03fc56', '#03cafc', '#5a03fc'];

              color = randomColors[Math.floor(Math.random() * 7)];
            }

            return !isDisabled && <RadioGroup.Option className=''
              key={hash}
              value={hash} >
              {({ checked }) => {
                return <div className='relative w-full md:w-[260px]'>
                  {checked
                    ? <motion.div
                      animate={{
                        backgroundColor: `${color}`
                      }}
                      className='rounded-lg'
                      initial={{
                      }}
                      transition={{
                        duration: 0.1
                      }}
                    >
                      <div className='flex rounded-lg px-[10px] py-4 mb-3  items-center justify-between  cursor-pointer  focus:outline-none w-full '>
                        <div className='text-xs'>
                          <RadioGroup.Label
                            as='p'
                            className={`text-lg font-semibold font-poppins  ${checked ? 'text-white dark:text-white' : 'text-[#B6B7BC]'}`}
                          >
                            {/* {text.substring(0, text.length - 8)} */}
                            {text}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </motion.div>
                    : <div className='flex rounded-lg px-5 py-4 mb-3  items-center justify-between bg-white dark:bg-[#2E323C] cursor-pointer  focus:outline-none w-full  '>
                      <div className='text-xs'>
                        <RadioGroup.Label
                          as='p'
                          className={`text-lg font-semibold font-poppins  ${checked ? 'text-white dark:text-white' : 'text-[#B6B7BC]'}`}
                        >
                          {text.split(' ')[0]}
                        </RadioGroup.Label>
                      </div>
                    </div>
                  }

                  {knownNetworks[currentNetwork].text !== text
                    ? null
                    : <div className='absolute top-7 right-4 rounded-full items-center w-[15px] h-[15px] cursor-pointer flex justify-center bg-white'>
                      <CheckIcon className=' text-green-500 z-50 w-5 h-5' />
                    </div>}

                  {checked && knownNetworks[currentNetwork].text !== text && (
                    <div>
                      <div className='absolute top-6 right-4  rounded-full items-center w-[15px] h-[15px] cursor-pointer flex justify-center bg-white'>
                        <CheckIcon className=' text-green-500 z-50 w-5 h-5' />

                      </div>
                      <div
                        className='absolute -top-1 right-0 p-1 rounded-full items-center w-[26px] h-[26px] cursor-pointer flex justify-center bg-transparent'
                        onClick={() => dispatch(removeNetworkAndSave(hash))}>
                        <XIcon className=' text-gray-500 z-50 w-6 h-6' />

                      </div>
                    </div>
                  )}

                  {isDevelopment === true
                    ? <div className='absolute bottom-[16px] right-12 bg-[#E2E0E0] p-[6px] rounded-[8px] items-center flex justify-center'>
                      <p className='text-black text-xs font-light font-poppins '>TestNet</p>
                    </div>
                    : null}

                </div>
              }}
            </RadioGroup.Option>
          })}
        </RadioGroup>

      </div>

      <div className=''>
        <div className='cursor-pointer mx-auto rounded-lg my-3 w-[180px] h-[100px] border-2 border-[#4798B3] border-dashed '
          onClick={() => dispatch(setOpen('homeAddNetwork'))}>
          <div className='mx-auto flex relative items-center w-[70px] h-[70px] my-auto  cursor-pointer justify-center'
          >

            <div className='h-[32px] w-[32px] rounded-full bg-[#C67391] my-auto flex relative items-center justify-center'>
              <PlusSmIcon className=' text-white z-50 h-5 w-5 ' />
            </div>
            <p className='absolute top-[60px] -left-4 whitespace-nowrap text-base font-poppins text-black dark:text-white'>Add Network</p>
          </div>

        </div>

        <div className='flex justify-center mt-3'>
          {currentNetwork === networkSelection
            ? <div className='bg-[#FDF6E3] flex flex-col w-[180px] h-[70px] items-center justify-center dark:bg-[#363E52] rounded-[10px] outline-none z-50 text-center'>
              <p className=' font-semibold font-poppins dark:text-white'>current:  </p>
              <p className=' font-semibold font-poppins dark:text-white'>{knownNetworks[networkSelection]?.text}</p>

            </div>
            : <button

              className='flex w-[180px] h-[70px] items-center justify-center active:scale-95 transition duration-150 ease-out py-3 px-6 font-medium text-primary bg-[#FDF6E3] dark:bg-[#363E52] rounded-[10px] outline-none z-50'
              onClick={() => dispatch(setCurrentNetwork(networkSelection))}
            >
              <p className='text-black dark:text-white text-sm whitespace-nowrap font-poppins'>Switch Network</p>

            </button>}

        </div>
      </div>
    </div>
  );
}

export default NetworkSelection;
