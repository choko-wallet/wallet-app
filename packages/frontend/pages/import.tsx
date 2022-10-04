// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Menu, Popover, RadioGroup, Transition } from '@headlessui/react';
import { CameraIcon,
  CheckIcon, ChevronRightIcon, CreditCardIcon, CurrencyDollarIcon, DocumentDuplicateIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  MenuIcon,
  UserCircleIcon, UserIcon, XIcon } from '@heroicons/react/outline';
import { BellIcon, CheckCircleIcon,
  ChevronDownIcon, CogIcon, DownloadIcon,
  HomeIcon, MoonIcon, PaperAirplaneIcon, SunIcon, TranslateIcon } from '@heroicons/react/solid';
// import { xxhashAsHex } from '@polkadot/util-crypto';
import { blake2AsU8a } from '@polkadot/util-crypto';
import { SymmetricEncryption } from '@skyekiwi/crypto';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { UserAccount } from '@choko-wallet/core';
import { compressParameters, decompressParameters } from '@choko-wallet/core/util';

import Dropdown from '../components/Dropdown';
import DropdownHeader from '../components/DropdownHeader';
import Loading from '../components/Loading';
// import { addUserAccount2 } from '../features/slices/userSlice';
import Modal from '../components/Modal';
import SuperButton from '../components/SuperButton';
import { selectCurrentUserAccount, selectError, selectUserAccount } from '../features/redux/selectors';
import { useAppThunkDispatch } from '../features/redux/store';
import { addUserAccount, loadUserAccount } from '../features/slices/userSlice';

/* eslint-disable sort-keys */
function Import4 (): JSX.Element {
  const router = useRouter();
  const dispatch = useAppThunkDispatch();

  const addAccountError = useSelector(selectError);

  const [mounted, setMounted] = useState<boolean>(false);
  const [theme, setTheme] = useState<string>('dark');// 暂时先这样配置 没有light
  const [title, setTitle] = useState<string>('Importing in progress! You will be reidrect To Home once done.');

  useEffect(() => {
    if (router.query.payload !== undefined) {
      const payload = router.query.payload as string;

      console.error(hexToU8a(payload));// 109位arr
      dispatch(addUserAccount({ importKey: hexToU8a(payload) }));
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    if (addAccountError !== '') {
      if (addAccountError === 'none') {
        setTimeout(() => {
          router.push('/home');
        }, 3000);
      } else {
        setTitle(`Error: ${addAccountError}`);
      }
    }
  }, [addAccountError]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={theme}>
      <Loading title={title} />
    </div >

  );
}

export default Import4;
