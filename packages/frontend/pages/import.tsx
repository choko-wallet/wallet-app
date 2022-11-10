// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { hexToU8a } from '@skyekiwi/util';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Loading from '../components/Loading';
import { useAppThunkDispatch } from '../features/redux/store';
import { startLoading } from '../features/slices/status';
import { addUserAccount } from '../features/slices/user';

/* eslint-disable sort-keys */
function Import (): JSX.Element {
  const router = useRouter();
  const dispatch = useAppThunkDispatch();

  const [mounted, setMounted] = useState<boolean>(false);
  const [theme] = useState<string>('dark');

  useEffect(() => {
    if (router.query.payload !== undefined) {
      const payload = router.query.payload as string;

      dispatch(startLoading('Importing in progress! You will be reidrect To Home once done.'));
      dispatch(addUserAccount({ importKey: hexToU8a(payload) })).then(() => {
        setTimeout(() => {
          void router.push('/home');
        }, 2000);
      }).catch((e) => {
        console.error(e);
        dispatch(startLoading('Error ... Check console for details.'));
      });
    }
  }, [router, dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className={theme}>
      <Loading />
    </div >

  );
}

export default Import;
