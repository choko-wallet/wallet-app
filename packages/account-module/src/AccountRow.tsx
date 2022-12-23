// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { CheckIcon, DotsHorizontalIcon } from '@heroicons/react/outline';
import { DocumentDuplicateIcon } from '@heroicons/react/solid';
import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useDispatch, useSelector } from 'react-redux';

import { Network, UserAccount } from '@choko-wallet/core';

import { selectCurrentUserAccountIndex } from '../../frontend/features/redux/selectors';
import { switchUserAccount } from '../../frontend/features/slices/user';
import encodeAddr from '../../frontend/utils/aaUtils';

/**
 * a dropdown of all userAccount in header
 */

interface Props {
  accountIndex: number;
  account: UserAccount;
  network: Network;
}

export default function AccountRow({ account, accountIndex, network }: Props): JSX.Element {
  const dispatch = useDispatch();
  const [showCheck, setShowCheck] = useState<boolean>(false);

  const currentUserAccountIndex = useSelector(selectCurrentUserAccountIndex);

  const handleCopy = () => {
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  const isCurrentAccount = (): boolean => {
    return accountIndex === currentUserAccountIndex;
  };

  const changeAccountInHeader = () => {
    if (!isCurrentAccount()) {
      dispatch(switchUserAccount(accountIndex));
    }
  };

  const address = encodeAddr(network, account);

  return (

    <div className={`flex w-full items-center rounded-md px-2 py-2  text-sm ${isCurrentAccount() ? 'bg-blue-gradient' : ''} `}>
      <p
        className={`cursor-pointer font-poppins whitespace-nowrap flex text-center items-center justify-certer flex-grow  ml-2  ${isCurrentAccount() ? 'text-black' : 'text-gray-800 dark:text-white'} `}
        onClick={() => changeAccountInHeader()}>
        {address.substring(0, 7)}
        <DotsHorizontalIcon className={`h-6 w-6  mx-1 ${isCurrentAccount() ? 'text-black' : 'text-gray-800 dark:text-white'} `} />

        {address.substring(address.length - 7, address.length)}
      </p>
      <CopyToClipboard
        text={address}>
        <div onClick={handleCopy}>
          {showCheck
            ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
            : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}
        </div>
      </CopyToClipboard>
    </div>

  );
}
