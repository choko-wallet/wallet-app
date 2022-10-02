// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Menu, Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';
import {
  CheckIcon, UserCircleIcon, XIcon, DocumentDuplicateIcon, ChevronRightIcon, MenuIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  UserIcon, CameraIcon,
} from '@heroicons/react/outline';
import {
  BellIcon, CheckCircleIcon,
  PaperAirplaneIcon, DownloadIcon,
  ChevronDownIcon, CogIcon, HomeIcon, MoonIcon, SunIcon, TranslateIcon
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import Dropdown from '../components/Dropdown';

import { SymmetricEncryption } from '@skyekiwi/crypto';


// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount, selectError, selectCurrentUserAccount } from '../features/redux/selectors';

import DropdownHeader from '../components/DropdownHeader';
import SuperButton from '../components/SuperButton';
import CopyToClipboard from 'react-copy-to-clipboard';

import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { decompressParameters, compressParameters } from '@choko-wallet/core/util';
// import { xxhashAsHex } from '@polkadot/util-crypto';
import { blake2AsU8a } from '@polkadot/util-crypto';
import { UserAccount } from '@choko-wallet/core';
import { addUserAccount, loadUserAccount } from '../features/slices/userSlice';
// import { addUserAccount2 } from '../features/slices/userSlice';

import Modal from '../components/Modal'
import { useAppThunkDispatch } from '../features/redux/store';
import Loading from '../components/Loading';


/* eslint-disable sort-keys */
function Import4(): JSX.Element {
  const router = useRouter();
  const dispatch = useAppThunkDispatch();
  
  const addAccountError = useSelector(selectError);

  const [mounted, setMounted] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('dark');//暂时先这样配置 没有light
  const [title, setTitle] = useState<string>('Importing in progress! You will be reidrect To Home once done.');

  useEffect(() => {
    if (router.query.payload !== undefined) {
      const payload = router.query.payload as string;
    
      console.error(hexToU8a(payload))//109位arr 
      dispatch(addUserAccount({ importKey: hexToU8a(payload) }));
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (addAccountError !== "") {
      if (addAccountError === 'none') {
        
        setTimeout(() => {
          router.push('/home');
        }, 3000);
      } else {
        setTitle(`Error: ${addAccountError}`);
      }
    }
  }, [addAccountError])

  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null

  return (
    <div className={theme}>
      <Loading title={title} />
    </div >

  );
}

export default Import4;
