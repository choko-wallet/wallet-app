// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { RadioGroup } from '@headlessui/react';
import { CheckIcon, PlusSmIcon, XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectCurrentNetwork, selectKnownNetworks } from '../features/redux/selectors';
import { removeNetworkAndSave, setCurrentNetwork } from '../features/slices/network';
import { setOpen } from '../features/slices/status';

function NetworkSelection (): JSX.Element {
  const dispatch = useDispatch();

  const currentNetwork = useSelector(selectCurrentNetwork);
  const knownNetworks = useSelector(selectKnownNetworks);

  const [networkSelection, setNetworkSelection] = useState(currentNetwork);

  return (
    <div className=' w-full h-full min-h-[700px]  dark:bg-[#22262f]'>
      <div className='scrollbar-thin max-h-[500px] overflow-y-scroll  mt-10 pr-2'>
        <RadioGroup onChange={setNetworkSelection}
          value={networkSelection}>
          {Object.entries(knownNetworks).map(([hash, { color, defaultProvider, isDevelopment, text }]) => {
            if (color === undefined) { // if color undefined, give randomColor
              const randomColors = ['#2497E7', '#fc6b03', '#befc03', '#5efc03', '#03fc56', '#03cafc', '#5a03fc'];

              color = randomColors[Math.floor(Math.random() * 7)];
            }

            return <RadioGroup.Option className=''
              key={hash}
              value={hash} >
              {({ checked }) => {
                return <div className='relative w-[230px] md:w-[260px]'>
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
                      <div className='flex rounded-lg px-5 py-4 mb-3  items-center justify-between  cursor-pointer  focus:outline-none w-full h-[75px] '>
                        <div className='text-sm'>
                          <RadioGroup.Label
                            as='p'
                            className={`text-lg font-semibold font-poppins  ${checked ? 'text-white dark:text-white' : 'text-[#B6B7BC]'}`}
                          >
                            {text.substring(0, text.length - 8)}
                          </RadioGroup.Label>
                        </div>
                      </div>
                    </motion.div>
                    : <div className='flex rounded-lg px-5 py-4 mb-3  items-center justify-between bg-white dark:bg-[#2E323C] cursor-pointer  focus:outline-none w-full h-[75px] '>
                      <div className='text-sm'>
                        <RadioGroup.Label
                          as='p'
                          className={`text-lg font-semibold font-poppins  ${checked ? 'text-white dark:text-white' : 'text-[#B6B7BC]'}`}
                        >
                          {text.substring(0, text.length - 8)}
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
                      <div className='absolute top-7 right-4  rounded-full items-center w-[15px] h-[15px] cursor-pointer flex justify-center bg-white'>
                        <CheckIcon className=' text-green-500 z-50 w-5 h-5' />

                      </div>
                      <div
                        className='absolute top-0 right-0  rounded-full items-center w-[15px] h-[15px] cursor-pointer flex justify-center bg-white'
                        onClick={() => dispatch(removeNetworkAndSave(hash))}>
                        <XIcon className=' text-red-500 z-50 w-5 h-5' />

                      </div>
                    </div>
                  )}

                  {isDevelopment === true
                    ? <div className='absolute top-4 right-20 items-center bg-white rounded-lg p-[2px] cursor-pointer flex justify-center '>
                      <p className='text-gray-800 text-xs font-poppins'>TestNet</p>
                    </div>
                    : null}

                </div>;
              }}
            </RadioGroup.Option>;
          })}
        </RadioGroup>

      </div>

      <div className='cursor-pointer mx-auto rounded-lg my-3 w-[180px] h-[100px] border-2 border-[#4798B3] border-dashed '
        onClick={() => dispatch(setOpen('homeAddNetwork'))}>
        <div className='mx-auto flex relative items-center w-[70px] h-[70px] my-auto  cursor-pointer justify-center'
        >

          <div className='h-[40px] w-[40px] rounded-full bg-[#C67391] my-auto flex relative items-center justify-center'>
            <PlusSmIcon className=' text-white z-50 h-6 w-6 ' />
          </div>
          <p className='absolute top-[60px] -left-6 whitespace-nowrap text-lg font-semibold font-poppins text-black dark:text-white'>Add Network</p>
        </div>

      </div>

      <div className='flex justify-center mt-3'>
        {currentNetwork === networkSelection
          ? <div className='bg-[#FDF6E3] flex flex-col w-[180px] h-[70px] items-center justify-center dark:bg-[#363E52] rounded-[10px] outline-none z-50 '>
            <p className=' font-semibold font-poppins'>current On </p>
            <p className=' font-semibold font-poppins'>{knownNetworks[networkSelection]?.text}</p>

          </div>
          : <button

            className='flex w-[180px] h-[70px] items-center justify-center active:scale-95 transition duration-150 ease-out py-3 px-6 font-medium text-primary bg-[#FDF6E3] dark:bg-[#363E52] rounded-[10px] outline-none z-50'
            onClick={() => dispatch(setCurrentNetwork(networkSelection))}
          >
            <p className='text-black dark:text-white text-md whitespace-nowrap font-semibold font-poppins'>Switch Network</p>

          </button>}

      </div>

    </div>
  );
}

export default NetworkSelection;
