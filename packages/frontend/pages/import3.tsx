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
import { decompressParameters, compressParameters } from '@choko-wallet/core/util';
import { LockedPrivateKey } from '@choko-wallet/core';

/* eslint-disable sort-keys */
function Import3(): JSX.Element {
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
    if (!router.isReady) return;
    const payload = router.query.payload as string;

    // const u8aKey = decompressParameters(hexToU8a(payload));
    // loop across the u8aKey to split if multiple imports 
    // const lockedPrivateKey = LockedPrivateKey.deserialize(u8aKey);
    // Now we haev all options and need to rebuild the accounts
    //   encryptedPrivateKey: Uint8Array; // fixed size = 32 bytes + 24 bytes nonce + 16 bytes overhead
    // keyType: KeypairType; // 'sr25519' | 'ed25519' | 'secp256k1';
    // localKeyEncryptionStrategy: number; // 'password-v0' | 'webauthn';
    // hasEncryptedPrivateKeyExported: boolean;

    // version: Version;

    // rebuild all UserAccount from keys and popup the password request model to unlock
    // USE: UserAccount.unlockedUserAccount 
    //   public static unlockUserAccount (lockedPrivateKey: LockedPrivateKey, passwordHash: Uint8Array): UserAccount {

    // after building all userAccount - call redux to have everything stored in localStorage. 
    // Be aware of cases when the account is already in localStorage

    // dispatch(addUserAccount({ password: password, seeds: seeds.join(' ') }));

  }, [router.isReady, router.query]);

  useEffect(() => {

    // Simulate what's in the export session .. 
    // const key = hexToU8a( localStorage.getItem('lockedPrivateKey') );
    // TODO: select which account(s) to export 
    // const exported = selectedExportAccounts.map(... => {
    //  1. Display warning message if account has more than $50 in value 
    //  2. if less than $50, mark hasEncryptedPrivateKeyExported to TRUE. This address is no longer very secure anymore
    // 3. if more than $50 OR if the user force export by option, DO NOT set hasEncryptedPrivateKeyExported to TRUE
    // 4. return a concacted Uint8Array of all lockedPrivateKey(s)
    // })
    // const comporessedKey = compressParameters(exported);
    // alert( u8aToHex(comporessedKey) ); >> this is the payload in the URL

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

export default Import3;
