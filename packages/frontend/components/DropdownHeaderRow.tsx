// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Menu, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CheckIcon, DotsHorizontalIcon, UserCircleIcon, XIcon } from '@heroicons/react/outline';
import { CheckCircleIcon, ChevronDownIcon, DocumentDuplicateIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';

import { UserAccount } from '@choko-wallet/core';
import { knownNetworks } from '@choko-wallet/known-networks';

import { selectCurrentUserAccount, selectError, selectUserAccount } from '../features/redux/selectors';
import { store } from '../features/redux/store';
import { loadUserAccount, switchUserAccount } from '../features/slices/userSlice';
import btcIcon from '../images/btc.png';

interface Props {
  // item: string
  // address: string;
  accountObj: UserAccount;
}

function DropdownHeaderRow ({ accountObj }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const currentUserAccount = useSelector(selectCurrentUserAccount);

  const handleCopy = async () => {
    // console.log('first')
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };
  // console.log('accountObj', accountObj)
  // console.log('currentUserAccount', currentUserAccount)

  // Object.keys(currentUserAccount)[0] == accountObj.address

  return (

    <div className={`flex w-full items-center rounded-md px-2 py-2  text-sm ${Object.keys(currentUserAccount)[0] == accountObj.address ? 'bg-blue-gradient' : ''} `}>
      <p
        className={`cursor-pointer font-poppins whitespace-nowrap flex text-center items-center justify-certer flex-grow  ml-2  ${Object.keys(currentUserAccount)[0] == accountObj.address ? 'text-black' : 'text-gray-800 dark:text-white'} `}
        onClick={() => dispatch(switchUserAccount(accountObj.address))}>
        {accountObj.address.substring(0, 7)}
        <DotsHorizontalIcon className={`h-6 w-6  mx-1 ${Object.keys(currentUserAccount)[0] == accountObj.address ? 'text-black' : 'text-gray-800 dark:text-white'} `} />

        {accountObj.address.substring(accountObj.address.length - 7, accountObj.address.length)}
      </p>
      <CopyToClipboard onCopy={() => { setCopied(true); }}
        text={accountObj.address}>
        <div onClick={handleCopy}>
          {showCheck
            ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
            : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}
        </div>
      </CopyToClipboard>
    </div>

  );
}

export default DropdownHeaderRow;
