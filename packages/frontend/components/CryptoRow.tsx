import { Menu, Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon } from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Image from 'next/image'

import btcIcon from '../images/btc.png'

interface Props {
  name: string;
  img: string;
  price: number;

};




function CryptoRow({ name, img, price }: Props) {

  return (
    <div className=" w-full text-right p-6 ">
      <div className='flex flex-row p-3 rounded-lg hover:bg-gray-900'>
        <div className='w-[64px] h-[64px] rounded-full flex justify-center items-center bg-dimBlue'>
          <img src={img} alt="star" className="w-[70%] h-[70%] object-contain" />
        </div>
        <div className="flex flex-col flex-1 ml-3">
          <p className=" font-semibold text-white text-[18px] leading-[24px] mb-1">
            {name}
          </p>
          <p className=" font-normal text-dimWhite text-[16px] leading-[24px]">
            {price}
          </p>
        </div>

        <div className="flex flex-col flex-1 ml-3">
          <p className=" font-semibold text-white text-[18px] leading-[24px] mb-1">
            {'Avalaible balance: 1.00'}
          </p>
          <p className=" font-normal text-dimWhite text-[16px] leading-[24px]">
            USD:{price}
          </p>
        </div>
      </div>
    </div>
  )
}

export default CryptoRow

