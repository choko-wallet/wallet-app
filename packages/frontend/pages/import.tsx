// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
// redux
import { useSelector } from 'react-redux';

import Loading from '../components/Loading';
import { selectError } from '../features/redux/selectors';
import { useAppThunkDispatch } from '../features/redux/store';
import { addUserAccount } from '../features/slices/userSlice';

/* eslint-disable sort-keys */
function Import (): JSX.Element {
  const router = useRouter();
  const dispatch = useAppThunkDispatch();

  const addAccountError = useSelector(selectError);

  const [mounted, setMounted] = useState<boolean>(false);
  const [theme] = useState<string>('dark');
  const [title, setTitle] = useState<string>('Importing in progress! You will be reidrect To Home once done.');

  useEffect(() => {
    if (router.query.payload !== undefined) {
      const payload = router.query.payload as string;

      void dispatch(addUserAccount({ importKey: hexToU8a(payload) }));
    }
  }, [router.isReady, router.query, dispatch]);

  useEffect(() => {
    if (addAccountError !== '') {
      if (addAccountError === 'none') {
        setTimeout(() => {
          void router.push('/home');
        }, 3000);
      } else {
        setTitle(`Error: ${addAccountError}`);
      }
    }
  }, [addAccountError, router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={theme}>
      <Loading title={title} />
    </div >

  );
}

export default Import;
