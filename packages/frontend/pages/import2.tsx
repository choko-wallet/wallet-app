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

import { AsymmetricEncryption, SymmetricEncryption } from '@skyekiwi/crypto';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '../features/redux/selectors';
import { loadUserAccount } from '../features/slices/userSlice';
import DropdownHeader from '../components/DropdownHeader';
import SuperButton from '../components/SuperButton';
import CopyToClipboard from 'react-copy-to-clipboard';

/* eslint-disable sort-keys */
function Settings(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const userAccount = useSelector(selectUserAccount);

  const [currentAccount, setCurrentAccount] = useState<string>('');
  const [allAccounts, setAllAccounts] = useState<string[]>(['']);

  const [networkSelection, setNetworkSelection] = useState<string>('');
  const [network, setNetwork] = useState<string>('polkadot');

  const [mounted, setMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [currencyArr, setCurrencyArr] = useState<string[]>(['USD', 'EUR']);
  const [currency, setCurrency] = useState<string>('USD');
  const [languageArr, setLanguageArr] = useState<string[]>(['ENG', '中文']);
  const [language, setLanguage] = useState<string>('ENG');
  const [isMnemonicOpen, setIsMnemonicOpen] = useState<boolean>(false);
  const [showMnemonic, setShowMnemonic] = useState<boolean>(false);
  const [menuIcon, setMenuIcon] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>('dark');//暂时先这样配置 没有light

  const [showCheck, setShowCheck] = useState<boolean>(false);

  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    console.log('first')
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  }

  useEffect(() => {
    if (!localStorage.getItem('serialziedUserAccount')) {
      void router.push('/account');
    } else {
      dispatch(loadUserAccount());
    }
  }, [dispatch, router]);

  useEffect(() => {
    if (userAccount && Object.keys(userAccount).length > 0) {
      const allAddrs = Object.keys(userAccount);

      setCurrentAccount(allAddrs[0]);
      setAllAccounts(allAddrs);
    }
  }, [userAccount])

  useEffect(() => {
    setMounted(true);
  }, []);



  if (!mounted) {
    return null;
  }

  const key = localStorage.getItem('lockedPrivateKey')
  // console.log(key)//152位
  // console.log(hexToU8a(key))//76位 
  // 
  // d797e98ba7a870a47cb1b45282f210364724aeea05dbbe2ce29b0cc9c501ab00e342ad73b6150065de7265e869aebd24ff74f06135ce932591723a28e9112025b4c57215537c07bb00000000

  const lockedPrivateKeyUnit8 = new TextEncoder().encode(localStorage.getItem('lockedPrivateKey'));
  const seeds = 'detail farm install vintage buddy myself adapt tomato bind time toast gospel' as string;//76
  const seedsUint8 = new TextEncoder().encode(seeds);//76的arr
  // const encrypt = SymmetricEncryption.encrypt(hexToU8a(key), seedsUint8)//需要32位的key 
  // console.log(seeds.length)

  // console.log(seedsUint8)




  return (
    <div className={theme}>









    </div >

  );
}

export default Settings;
