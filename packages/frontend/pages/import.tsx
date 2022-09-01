import React, { useEffect, useState } from 'react'
import { useRouter } from "next/router";
// import CryptoJS from 'crypto-js'
const CryptoJS = require('crypto-js');
import { Dialog, Popover, RadioGroup, Transition } from '@headlessui/react';

import Modal from '../components/Modal'

// ?payload=U2FsdGVkX1%2BUX%2BY4Y71E%2Bv4X1vBfSJ4gH6himxHVhG7YGC8X0fRTrM5Qg698135%2BgJ5zy6edtlsnO7LOsyNev11B7%2BcZ%2Fzdw01u31H1EJQy1lYIXVT0u2b6AjLfD96ZP



function Import() {
  const router = useRouter();
  const payload = router.query.payload as string;
  const privateKey = 'chokowallet' as string;
  const seeds = 'detail farm install vintage buddy myself adapt tomato bind time toast gospel' as string;
  const [password, setPassword] = useState<string>('123');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');


  function closeModal() {
    if (input === password) {
      setModalOpen(false);
      console.log('password is correct, initialize account');
      setInput('')
    }
  }
  // wallet.app/import?payload=xxx 
  function GenerateNewUrl() {
    const ciphertext = CryptoJS.AES.encrypt(seeds, privateKey).toString();
    const superUrl = 'https://wallet.app/import?payload=' + encodeURIComponent(ciphertext);
    console.log(superUrl); // 加密后的密文
  }


  const apiFun1 = async (payload: string) => {
    console.log("1")
    if (!payload) return;
    console.log("2")
    const bytes = CryptoJS.AES.decrypt(decodeURIComponent(payload), privateKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    console.log("3")
    if (originalText === '') return;//解密失败 return
    console.log("4")
    console.log(originalText); // 解密后的12seeds
    setModalOpen(true);

  }



  useEffect(() => {
    apiFun1(payload);
  }, [payload])


  return (
    <div>
      <Modal closeModal={closeModal} isOpen={modalOpen} >

        <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-gradient-to-br from-gray-900 to-black p-6 text-left align-middle shadow-xl transition-all'>
          <Dialog.Title
            as='h3'
            className='text-lg font-medium leading-6 text-gradient '
          >
            Please input your password
          </Dialog.Title>
          <div className='mt-2'>
            <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder="password" className=" input input-bordered input-info w-full " />
          </div>

          <div className='mt-4'>
            <button
              className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
              onClick={closeModal}
              type='button'
            >
              OK
            </button>
          </div>
        </Dialog.Panel>

      </Modal>


      <button
        className='py-3 px-6 font-medium text-[18px] text-primary bg-blue-gradient rounded-[10px] outline-none'
        onClick={GenerateNewUrl}
        type='button'
      >
        Generate new url
      </button>
    </div>
  )
}

export default Import