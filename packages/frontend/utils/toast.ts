// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import toast from 'react-hot-toast';

export const toastSuccess = (title: string): void => {
  toast(title, {
    duration: 4000,
    icon: '👏',
    style: {
      background: 'green',
      color: 'white',
      fontFamily: 'Poppins',
      fontSize: '17px',
      fontWeight: 'bolder',
      padding: '20px'
    }
  });
};

export const toastFail = (title: string): void => {
  toast(title, {
    duration: 4000,
    style: {
      background: 'red',
      color: 'white',
      fontFamily: 'Poppins',
      fontSize: '17px',
      fontWeight: 'bolder',
      padding: '20px'
    }
  });
};
