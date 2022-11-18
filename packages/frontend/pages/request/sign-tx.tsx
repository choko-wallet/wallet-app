// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog } from '@headlessui/react';
import { CheckIcon, XIcon } from '@heroicons/react/outline';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { hexToU8a, u8aToHex } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
// redux
import { useDispatch, useSelector } from 'react-redux';

import { compressParameters, decompressParameters } from '@choko-wallet/core/util';
import Modal from '@choko-wallet/frontend/components/Modal';
import { selectCurrentUserAccount } from '@choko-wallet/frontend/features/redux/selectors';
import { setClose, setOpen } from '@choko-wallet/frontend/features/slices/status';
import { decryptCurrentUserAccount, loadUserAccount, lockCurrentUserAccount, switchUserAccount } from '@choko-wallet/frontend/features/slices/user';
import { SignTxDescriptor, SignTxRequest } from '@choko-wallet/request-handler';
import { ethers } from 'ethers';
import Keyring from '@polkadot/keyring';

// http://localhost:3000/request/sign-tx?requestType=signTx&payload=01789c6360606029492d2e61a00c883b67e467e72b8427e6e4a4962838e61464242a8490626c4b5d75fdc2841bf10c0c29b72e16caacc8eaa94bd0eaf9b843a9747e5f76be814769fa8f39da417b4b7772c274a84d61616160e03ba67dc6887bfff6dfe5ffbc7beedf28bc7643d08fd5e907735d5cee6ce922ef34160a3d360a063500005a9e2de5&callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Falpha
import Loading from '../../components/Loading';
import { AccountOption, UserAccount } from '@choko-wallet/core';
import { ethSendTx } from '@choko-wallet/frontend/utils/ethSendTx';
import { toastFail, toastSuccess } from '@choko-wallet/frontend/utils/toast';

function SignTxHandler(): JSX.Element {
  const router = useRouter();
  const dispatch = useDispatch();

  const currentUserAccount = useSelector(selectCurrentUserAccount);
  // const [openPasswordModal, setOpenPasswordModal] = useState(false);
  const [password, setPassword] = useState('');
  const [mounted, setMounted] = useState<boolean>(false);
  const [sendLoading, setSendLoading] = useState<boolean>(false);

  const [displayType, setDisplayType] = useState<string>('decoded');

  const [decodingTx, setDecodingTx] = useState<boolean>(true);
  const [decodedTx, setDecodedTx] = useState<string>('');

  const [request, setRequest] = useState<SignTxRequest>(null);
  const [callback, setCallback] = useState<string>('');

  useEffect(() => {
    if (!router.isReady) return;
    const payload = router.query.payload as string;
    const u8aRequest = decompressParameters(hexToU8a(payload));
    const callbackUrl = router.query.callbackUrl as string;
    const request = SignTxRequest.deserialize(u8aRequest);

    dispatch(loadUserAccount());
    dispatch(switchUserAccount(request.userOrigin.address));

    void (async () => {
      if (request.dappOrigin.activeNetwork.networkType === 'polkadot') {
        const provider = new WsProvider(request.dappOrigin.activeNetwork.defaultProvider);
        const api = await ApiPromise.create({ provider: provider });
        const tx = api.tx(request.payload.encoded).toHuman();

        /* eslint-disable */
        // @ts-ignore
        setDecodedTx(`METHOD = ${tx.method.section}.${tx.method.method} =  ARGUMENTS: ${JSON.stringify(tx.method.args)}`);
        /* eslint-enable */

        setDecodingTx(false);
      } else {

        const requestPayloadHex = u8aToHex(request.payload.encoded);
        const serializedTx = `0x${requestPayloadHex}`
        const tx = ethers.utils.parseTransaction(serializedTx)

        console.log('tx', tx)
        // console.log('tx', ethers.BigNumber.from(tx.value._hex).toNumber())
        // console.log('tx', ethers.utils.formatEther(ethers.BigNumber.from(tx.value._hex)))


        // 需要interface.decodeFunctionData 把erc20 token的data拿出来 node中暂时没有这个函数
        // const value = ethers.utils.formatEther(ethers.BigNumber.from(tx.value._hex))

        // setDecodedTx(`Send ${value} eth to ${tx.to} `);

        setDecodingTx(false);
      }
    })();

    setCallback(callbackUrl);
    setRequest(request);
  }, [dispatch, router.isReady, router.query]);

  useEffect(() => {
    if (request) setMounted(true);
  }, [request]);

  function unlock() {
    if (request) {
      try {
        dispatch(decryptCurrentUserAccount(password));

        setSendLoading(true);
        const notification = toast.loading("Send Transaction...", {
          style: {
            background: "white",
            color: "green",
            fontWeight: "bolder",
            fontFamily: "Poppins",
            fontSize: "17px",
            padding: "20px",
          }
        })


        if (currentUserAccount && !currentUserAccount.isLocked) {
          setPassword('');
          dispatch(setClose('signTxPasswordModal'));

          void (async () => {

            try {
              const response = await ethSendTx(request);
              console.log('response', u8aToHex(response.payload.txHash))//mumbai搜不到交易
              const s = response.serialize();

              toast.dismiss(notification);
              toastSuccess("Successfully Send, redirecting..");
              setSendLoading(false);
              dispatch(lockCurrentUserAccount());
              window.location.href = callback + `?response=${u8aToHex(compressParameters(s))}&responseType=signTx`;

            } catch (err) {
              setSendLoading(false);
              console.log('err', err);
              toast.dismiss(notification);
              toastFail('Someting Wrong');
            }
          })();
        }
      } catch (e) {
        setSendLoading(false);
        toastFail('Wrong Password!');
      }
    }
  }

  if (!mounted) {
    return null;
  }

  if (decodingTx) return <Loading title='Decoding Transaction ...' />;

  return (
    <main className='grid grid-cols-12 gap-4 min-h-screen content-center bg-gray-400 p-5'>
      <Toaster />
      <div className='grid content-center col-span-12 md:col-span-1 md:col-start-4 shadow-xl justify-center rounded-lg bg-pink-600'>
        <h1 className='md:hidden col-span-12 card-title text-white select-none p-10 '>
          {request.dappOrigin.activeNetwork.text}
        </h1>
        <h1 className='hidden md:block col-span-12 card-title text-white select-none p-10 vertical-text'>
          {request.dappOrigin.activeNetwork.text}
        </h1>
      </div>
      <div className='grid grid-cols-12 col-span-12 md:col-span-5 gap-y-5'>
        <div className='col-span-12 shadow-xl rounded-lg card p-10 bg-white'>
          <h2 className='card-title'>
            Request to Sign a Transaction
          </h2>
          <h3>Send a transaction on the selected blockchain network.</h3>

          <div className='grid grid-cols-12 gap-5 md:m-10 select-none'>
            <br />
            <div className='col-span-12'>
              DApp Origin:
            </div>
            <div className='col-span-12'>
              <code className='underline'>{request.dappOrigin.displayName}</code>
            </div>
            <div className='col-span-12'>
              Your Orign:
            </div>
            <div className='col-span-12'>
              <code className='underline'
                style={{ overflowWrap: 'break-word' }}>{request.userOrigin.address}</code>
            </div>

            <div className='col-span-12'>
              <div className='divider'></div>
            </div>
            <div className='col-span-12'>
              Transaction To Sign:
            </div>

            <div className='col-span-12'>
              <div className='tabs'>
                <a className={`tab tab-bordered ${displayType === 'hex' ? 'tab-active' : ''}`}
                  onClick={() => setDisplayType('hex')}>Hex</a>
                <a className={`tab tab-bordered ${displayType === 'ascii' ? 'tab-active' : ''}`}
                  onClick={() => setDisplayType('decoded')}>Decoded</a>
              </div>
            </div>

            <div className='col-span-12'>
              {
                displayType === 'hex'
                  ? (
                    <div className='textarea h-[20vh] font-mono border-gray-400'
                      style={{ overflowWrap: 'break-word' }}>{'0x' + u8aToHex(request.payload.encoded)}</div>
                  )
                  : (
                    <div className='textarea h-[20vh] font-mono border-gray-400'
                      style={{ overflowWrap: 'break-word' }}>{decodedTx}</div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
      <div className='col-span-12 my-2'></div>

      {sendLoading ?
        null
        :
        <div className='grid grid-cols-12 col-span-12' >
          <div className='col-span-4 col-start-4 md:col-span-2 md:col-start-6'>
            <button className='btn btn-success btn-circle btn-lg'
              onClick={() => dispatch(setOpen('signTxPasswordModal'))}>
              <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
          <div className='col-span-4 md:col-span-2'>
            <button className='btn btn-error btn-circle btn-lg'
              onClick={() => router.push('/')} >
              <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
            </button>
          </div>
        </div>
      }
      {/* <div className='col-span-4 col-start-4 md:col-span-2 md:col-start-6'>
        <button className='btn btn-success btn-circle btn-lg'
          onClick={() => dispatch(setOpen('signTxPasswordModal'))}>
          <CheckIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div>
      <div className='col-span-4 md:col-span-2'>
        <button className='btn btn-error btn-circle btn-lg'
          onClick={() => router.push('/')} >
          <XIcon className='h-8 duration-300 hover:scale-125 transtion east-out' />
        </button>
      </div> */}

      <Modal
        modalName='signTxPasswordModal'
      // closeModal={closeModal}
      //   isOpen={openPasswordModal}
      >
        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all border border-[#00f6ff] '>
          <Dialog.Title
            as='h3'
            className='font-poppins text-lg font-medium leading-6 text-black w-72'
          >
            Unlock Wallet with Password
          </Dialog.Title>
          <div className='mt-2'>
            <p className='text-sm text-gray-500'>
              <input className='input input-bordered w-full max-w-xs'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Account Password'

                type='password'
                value={password}
              />
            </p>
          </div>

          <div className='mt-4 flex justify-between'>
            <button
              className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2'
              onClick={unlock}
              type='button'
            >
              Unlock
            </button>

          </div>
        </Dialog.Panel>
      </Modal>
    </main>
  );
}

export default SignTxHandler;
