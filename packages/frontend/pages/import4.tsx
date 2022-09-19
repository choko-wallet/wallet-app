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

import DropdownHeader from '../components/DropdownHeader';
import SuperButton from '../components/SuperButton';
import CopyToClipboard from 'react-copy-to-clipboard';

import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { decompressParameters, compressParameters } from '@choko-wallet/core/util';
// import { xxhashAsHex } from '@polkadot/util-crypto';
import { blake2AsU8a } from '@polkadot/util-crypto';
import { LockedPrivateKey, UserAccount } from '@choko-wallet/core';
import { unlockUserAccount, loadUserAccount } from '../features/slices/userSlice';
// import { addUserAccount2 } from '../features/slices/userSlice';

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
  const [keyForExport, setKeyForExport] = useState<string>('');



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
    const payload = router.query.payload as string;
    const u8aKey = decompressParameters(hexToU8a(payload));
    const lockedPrivateKey = LockedPrivateKey.deserialize(u8aKey);//是个object 
    console.log('u8aKey')
    console.log(u8aKey)//76位arr
    console.log(hexToU8a(payload))//77位arr
    console.log(lockedPrivateKey)//object 里面有72位的encryptedPrivateKey 

    // 用privateKeyToUserAccount 写个新的redux函数addUserAccount2 需要32位的key
    // dispatch(addUserAccount2({ password: input, privateKey: hexToU8a(payload) }));//需要32位的key

    async function unlockUserAccountFunc() {
      // privateKeyToUserAccount

      const userAccountForImport = UserAccount.unlockUserAccount(lockedPrivateKey, blake2AsU8a(input));
      await userAccountForImport.init();
      console.log('addressForImport')
      console.log(userAccountForImport.address)

      const allAddressArray = Object.keys(userAccount)//得到已经登录的地址array 判断是否存在 
      console.log('allAddressArray')
      console.log(allAddressArray)
      console.log('check if already exists')
      // console.log('yyy')
      // console.log(localStorage.getItem('lockedPrivateKey'))
      // console.log(userAccount)
      if (allAddressArray.includes(userAccountForImport.address)) {
        console.log('already exists')
        return
      }

      // dispatch(addUserAccount2({ password: input, privateKey: hexToU8a(payload) }));//需要32位的key

      // const alredyImportedKeys = localStorage.getItem('lockedPrivateKey')//已登录账户的keys 追加
      // localStorage.setItem('lockedPrivateKey', alredyImportedKeys + payload.slice(2));
      // dispatch(unlockUserAccount({ address: userAccountForImport.address, password: input }))
      // 如果成功 不动lockedPrivateKey 如果密码错误解锁失败 应该删除lockedPrivateKey

      // const alredyImportedKeys2 = localStorage.getItem('lockedPrivateKey')//已登录账户的keys 再删除
      // localStorage.setItem('lockedPrivateKey', alredyImportedKeys.slice(0, localStorage.getItem('lockedPrivateKey').length - payload.slice(2).length));

      console.log('xxx')
      console.log(localStorage.getItem('lockedPrivateKey'))
      console.log(userAccount)

      // 这个位置需要判断 不报错再给true
      setSuccess(true);
    }
    unlockUserAccountFunc();

  }


  useEffect(() => {
    if (!router.isReady) return;
    dispatch(loadUserAccount());//加载已经登录的账户 给到redux 
    console.log('userAccount')
    console.log(userAccount)

    if (router.query.payload !== undefined) {
      setModalOpen(true);//有payload 弹框获取密码 
    }

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



  function GenerateAccountUrl(address: string) {
    // 还是有点小bug 确认下是用这种方法么 
    // 找到选择的账户在userAccount中是第几个 截取localStorage.getItem('lockedPrivateKey') 
    // 还是用其他方法通过address 获取该账户的localStorage.getItem('lockedPrivateKey')
    for (let i = 0; i < Object.values(userAccount).length; i++) {
      if (Object.values(userAccount)[i].address == address) {
        console.log('xxx')
        console.log(localStorage.getItem('lockedPrivateKey').slice(i * 152, i * 152 + 152))
        setKeyForExport(localStorage.getItem('lockedPrivateKey').slice(i * 152, i * 152 + 152))
        console.log(keyForExport)
        // 这种的建议弄成u8a之后处理
        // 之后可以用LockedPrivateKey.serializedLength 因为后续又可能改这个长度
        // for循环改成redux的while循环
        // 之后每一个是u8a.slice(offset, offset + ...serializedLength )
        // 外面一个while循环offset < u8a.length
      }
    }

    // const key = hexToU8a(localStorage.getItem('lockedPrivateKey'));
    const comporessedKeyForExport = compressParameters(hexToU8a(keyForExport));
    const payloadForExport = u8aToHex(comporessedKeyForExport);

    console.log(localStorage.getItem('lockedPrivateKey').length)//152位
    // console.log(payload)

    const superUrl = 'https://wallet.app/import?payload=' + payloadForExport;
    console.log(superUrl);
    setExportUrl(superUrl);
    setExportModalOpen(true);

    // 如何获取账户balance  
    // 通过什么参数获取账户的coin balance?  
    // 通过api查询的币价 进行计算 得到金额balance? 

  }



  return (
    <div className={theme}>

      {Object.values(userAccount).map(({ address }) => (
        <div key={address} className='bg-gray-600 m-5 p-3 rounded-md text-center'>
          <p className='text-sm text-white '>Account Address: {address}</p>
          <button
            className='m-2 py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
            onClick={() => GenerateAccountUrl(address)}
            type='button'
          >
            Generate Account Url
          </button>
        </div>
      ))}





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
