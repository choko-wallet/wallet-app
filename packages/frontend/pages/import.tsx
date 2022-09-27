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

import { selectUserAccount, selectError } from '../features/redux/selectors';

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

  const userAccount = useSelector(selectUserAccount);
  const reduxError = useSelector(selectError);

  const [mounted, setMounted] = useState<boolean>(false);

  const [theme, setTheme] = useState<string>('dark');//暂时先这样配置 没有light

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);
  const [isLoadingOpen, setIsLoadingOpen] = useState<boolean>(false);


  function closeModal() {
    setSuccess(false);
    setModalOpen(false);
    setInput('')
  }


  const unlockAccount = () => {
    const payload = router.query.payload as string;
    // const u8aKey = decompressParameters(hexToU8a(payload));
    // const lockedPrivateKey = LockedPrivateKey.deserialize(u8aKey);//是个object 
    // console.log('u8aKey')
    // console.log('u8aKey', u8aKey)//76位arr
    console.log(hexToU8a(payload))//109位arr 
    dispatch(addUserAccount({ password: input, importKey: hexToU8a(payload) }));

    console.log('local', localStorage.getItem('serialziedUserAccount'))


    // dispatch(addUserAccountFromUrl({ privateKey: new Uint8Array([29, 82, 8, 156, 159, 77, 234, 239, 124, 162, 225, 156, 16, 137, 11, 97, 26, 64, 47, 224, 132, 211, 182, 124, 60, 122, 236, 16, 180, 190, 72, 123]), password: input }))
    //   .unwrap()
    //   .then((result) => {
    //     setSuccess(true);
    //     closeModal();
    //     setIsLoadingOpen(true);

    //     setTimeout(() => {
    //       setIsLoadingOpen(false);
    //       router.push('/home')
    //     }, 3000);

    //   }).catch((rejectedValueOrSerializedError) => {
    //     console.log('redux-rejectedValueOrSerializedError', rejectedValueOrSerializedError)
    //     setSuccess(false);
    //   })

    // dispatch(addUserAccountFromUrl({ privateKey: privateKey, password: input }));


  }



  useEffect(() => {
    if (router.query.payload !== undefined) {
      setModalOpen(true);//有payload 弹框获取密码 
    }
  }, [router.isReady, router.query]);


  useEffect(() => {
    setMounted(true);
  }, []);


  if (!mounted) return null

  // if (isLoadingOpen) return <Loading title='Successfully Imported Account, Redirecting To Home' />

  return (
    <div className={theme}>

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

          {reduxError
            ?
            <Dialog.Title
              as='h3'
              className='text-lg font-medium leading-6 text-gradient '
            >
              {reduxError}

            </Dialog.Title>
            : null}

          <div className='mt-4 flex justify-between'>
            <button
              className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
              onClick={unlockAccount}
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



    </div >

  );
}

export default Import4;
