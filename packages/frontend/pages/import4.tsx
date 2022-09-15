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

// redux
import { useDispatch, useSelector } from 'react-redux';

import { selectUserAccount } from '../features/redux/selectors';
import { loadUserAccount } from '../features/slices/userSlice';
import DropdownHeader from '../components/DropdownHeader';
import SuperButton from '../components/SuperButton';
import CopyToClipboard from 'react-copy-to-clipboard';

import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { decompressParameters, compressParameters } from '@choko-wallet/core/util';
// import { xxhashAsHex } from '@polkadot/util-crypto';
import { blake2AsU8a } from '@polkadot/util-crypto';
import { LockedPrivateKey, UserAccount } from '@choko-wallet/core';
import { unlockUserAccount } from '../features/slices/userSlice';
import Modal from '../components/Modal'



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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [exportUrl, setExportUrl] = useState<string>('');


  function closeModal() {
    setSuccess(false);
    setModalOpen(false);
    setInput('')
  }

  function closeExportModal() {
    setExportModalOpen(false);
    setExportUrl('');

  }


  function UnlockAccount() {
    console.log(input);
    const payload = router.query.payload as string;
    const u8aKey = decompressParameters(hexToU8a(payload));
    const lockedPrivateKey = LockedPrivateKey.deserialize(u8aKey);
    // console.log(lockedPrivateKey)//是个object 

    async function unlockUserAccountFunc() {
      const userAccount = UserAccount.unlockUserAccount(lockedPrivateKey, blake2AsU8a(input));
      await userAccount.init();
      console.log('userAccount1')
      console.log(userAccount.address)

      dispatch(unlockUserAccount({ address: userAccount.address, password: input }));
      setSuccess(true);
    }
    unlockUserAccountFunc();

  }


  useEffect(() => {
    if (!router.isReady) return;

    setModalOpen(true);//获取密码 

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


  function GenerateAccountUrl() {
    const key = hexToU8a(localStorage.getItem('lockedPrivateKey'));//先弄一个账户 逻辑跑通
    const comporessedKey = compressParameters(key);
    const payload = u8aToHex(comporessedKey);

    // console.log('key')
    // console.log(payload)

    const superUrl = 'https://wallet.app/import?payload=' + payload;
    console.log(superUrl);
    setExportUrl(superUrl);
    setExportModalOpen(true);

  }



  return (
    <div className={theme}>


      <button
        className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
        onClick={GenerateAccountUrl}
        type='button'
      >
        Generate Account Url
      </button>

      {/* 引入弹框输入密码 */}
      <Modal closeModal={closeModal} isOpen={modalOpen} >

        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-black dark:bg-gradient-to-br from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all'>
          <Dialog.Title
            as='h3'
            className='text-lg font-medium leading-6 text-gradient '
          >
            Please input your password
          </Dialog.Title>
          <div className='mt-2'>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="password" className=" input input-bordered input-info w-full " />
          </div>
          {success
            ?
            <Dialog.Title
              as='h3'
              className='text-lg font-medium leading-6 text-gradient '
            >
              Unlock Account Success
            </Dialog.Title>
            : null}

          <div className='mt-4 flex justify-between'>
            <button
              className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
              onClick={UnlockAccount}
              type='button'
            >
              UnlockAccount
            </button>
            <button
              className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
              onClick={closeModal}
              type='button'
            >
              Close
            </button>
          </div>
        </Dialog.Panel>

      </Modal>

      {/* 导出弹框显示url */}
      <Modal closeModal={closeExportModal} isOpen={exportModalOpen} >

        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-black dark:bg-gradient-to-br from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all'>
          <Dialog.Title
            as='h3'
            className='text-lg font-medium leading-6 text-gradient '
          >
            Account Url
          </Dialog.Title>

          <div className='w-72 h-64 stringWrap mt-3'>{exportUrl}</div>
          <div className='mt-4 flex justify-between'>

            <button
              className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
              onClick={closeExportModal}
              type='button'
            >
              Close
            </button>
          </div>
        </Dialog.Panel>

      </Modal>

    </div >

  );
}

export default Import3;
