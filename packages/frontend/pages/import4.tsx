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
// import { xxhashAsHex } from '@polkadot/util-crypto';
import { blake2AsU8a } from '@polkadot/util-crypto';
import { LockedPrivateKey, UserAccount } from '@choko-wallet/core';


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


  // console.log(payload)
  // 0063b69fde26c15b5f91daa03ab7f7611ef6da9ae170991b23b3fa265f6b471ff4fbef1f5d9424cccbe555c4593a0ad1c330048862bfb73e012d42f24edfcb2f0e77d8ef503328ad8700000000

  // const lockedPrivateKey = localStorage.getItem('lockedPrivateKey')//有账户状态才能取
  // e510404d97c9450ae2078aa86d14ca17ac177a30bb32175a202ba361d3a795447ce07ae75c57d4ba2804001d1388e597fbdd528295a923e595e05516205cf50cb5867d64935f10c700000000

  // payload 和lockedPrivateKey 互转
  // 通过payload 得到lockedPrivateKey
  // const u8aKey = decompressParameters(hexToU8a(payload));
  // const lockedPrivateKey = LockedPrivateKey.deserialize(u8aKey);
  // 通过lockedPrivateKey 得到payload 
  // const key = hexToU8a(localStorage.getItem('lockedPrivateKey'));
  // const comporessedKey = compressParameters(key);
  // const payload = u8aToHex(comporessedKey);



  // console.log(u8aKey)
  // 报错啊Property 'serialize' does not exist on type 'typeof LockedPrivateKey'. Did you mean 'deserialize'?ts(2551)
  // const payload = u8aToHex(compressParameters(u8aKey));

  // lockedPrivateKey和seeds互转 

  useEffect(() => {
    if (!router.isReady) return;
    const payload = router.query.payload as string;


    const u8aKey = decompressParameters(hexToU8a(payload));
    const lockedPrivateKey = LockedPrivateKey.deserialize(u8aKey);
    console.log(lockedPrivateKey)//是个object 
    // popup 拿密码 暂时设定123
    const password = '123';
    // const passwordHash = blake2AsU8a(password);
    console.log(blake2AsU8a(password))

    async function unlockUserAccountFunc() {
      const userAccount = UserAccount.unlockUserAccount(lockedPrivateKey, blake2AsU8a(password));
      // 这个函数挂不上？ 无法调用 解密失败
      await userAccount.init();
      console.log(userAccount)

      return userAccount;
    }

    const res = unlockUserAccountFunc()

    // 通过redux生成账户的seeds怎么来 通过什么方法把lockedPrivateKey 变成seeds
    // dispatch(addUserAccount({ password: password, seeds: seeds.join(' ') }));



    // const u8aKey = decompressParameters(hexToU8a(payload));
    // // loop across the u8aKey to split if multiple imports 

    // const lockedPrivateKey = LockedPrivateKey.deserialize(u8aKey);
    // Now we haev all options and need to rebuild the accounts

    //   encryptedPrivateKey: Uint8Array; // fixed size = 32 bytes + 24 bytes nonce + 16 bytes overhead
    // keyType: KeypairType; // 'sr25519' | 'ed25519' | 'secp256k1';
    // localKeyEncryptionStrategy: number; // 'password-v0' | 'webauthn';
    // hasEncryptedPrivateKeyExported: boolean;

    // version: Version;

    // rebuild all UserAccount from keys and popup the password request model to unlock

    // /account/import  /account/create 用的redux函数和原始password和seeds生成账户 
    // 问题3 passwordHash   (blake2AsU8a(password);
    // USE: UserAccount.unlockUserAccount 
    //   public static unlockUserAccount (lockedPrivateKey: LockedPrivateKey, passwordHash: Uint8Array): UserAccount {


    // after building all userAccount - call redux to have everything stored in localStorage. 
    // Be aware of cases when the account is already in localStorage

    // dispatch(addUserAccount({ password: password, seeds: seeds.join(' ') }));

  }, [router.isReady, router.query]);

  useEffect(() => {

    setMounted(true);
  }, []);


  if (!mounted) {
    return null;
  }

  // export
  // Simulate what's in the export session .. 
  // const key = hexToU8a(localStorage.getItem('lockedPrivateKey'));
  // TODO: select which account(s) to export 
  // const exported = selectedExportAccounts.map(... => {
  //  1. Display warning message if account has more than $50 in value 
  //  2. if less than $50, mark hasEncryptedPrivateKeyExported to TRUE. This address is no longer very secure anymore
  // 3. if more than $50 OR if the user force export by option, DO NOT set hasEncryptedPrivateKeyExported to TRUE
  // 4. return a concacted Uint8Array of all lockedPrivateKey(s)
  // })
  // const comporessedKey = compressParameters(exported);
  // alert( u8aToHex(comporessedKey) ); >> this is the payload in the URL

  // 可以有多个登录账户 但是只有一个当前账户？其他账户如何拿key？
  // 只有当前账户key = hexToU8a(localStorage.getItem('lockedPrivateKey')); 
  const key = hexToU8a(localStorage.getItem('lockedPrivateKey'));//先暂时弄一个账户 逻辑跑通
  const comporessedKey = compressParameters(key);
  const payload = u8aToHex(comporessedKey);





  // const lockedPrivateKeyUnit8 = new TextEncoder().encode(localStorage.getItem('lockedPrivateKey'));
  // const seeds = 'detail farm install vintage buddy myself adapt tomato bind time toast gospel' as string;//76
  // const seedsUint8 = new TextEncoder().encode(seeds);//76的arr
  // const encrypt = SymmetricEncryption.encrypt(hexToU8a(key), seedsUint8)//需要32位的key 
  // console.log(seeds.length)

  // console.log(seedsUint8)




  return (
    <div className={theme}>









    </div >

  );
}

export default Import3;
