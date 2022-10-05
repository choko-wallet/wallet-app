// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { Dialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

interface Props {
  closeModal: () => void;
  isOpen: boolean;
  children: JSX.Element
}

function Modal ({ children, closeModal, isOpen }: Props): JSX.Element {
  return (

    <Transition appear
      as={Fragment}
      show={isOpen}>
      <Dialog as='div'
        className='relative z-50'
        onClose={closeModal}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0  backdrop-blur-md' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4 text-center '>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >

              {children}

            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>

  );
}

export default Modal;
