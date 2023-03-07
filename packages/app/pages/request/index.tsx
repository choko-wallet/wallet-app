// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { loadUserAccount, selectUserAccount, useDispatch, useSelector } from '@choko-wallet/app-redux';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

/**
 * Router for requests.
 * If there is no UserAccount found. Store the requestParams to localStorage and delete when done.
 */
function RequestRouter (): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const dispatch = useDispatch();

  const accouns = useSelector(selectUserAccount);

  useEffect(() => {
    if (!router.isReady) return;
    const requestType = router.query.requestType as string;

    const localAccount = localStorage.getItem('serialziedUserAccount');
    const mpcKey = localStorage.getItem('mpcKey')

    if (
      (!localAccount || localAccount.length === 0) && (!mpcKey || mpcKey.length === 0)
    ) {
      console.log(`requestType=${router.query.requestType as string}&payload=${router.query.payload as string}&callbackUrl=${encodeURIComponent(router.query.callbackUrl as string)}`);
      localStorage.setItem('requestParams', `requestType=${router.query.requestType as string}&payload=${router.query.payload as string}&callbackUrl=${encodeURIComponent(router.query.callbackUrl as string)}`);
      void router.push('/');
    } else {
      switch (requestType) {
        case 'connectDapp':
          void router.push({
            pathname: '/request/connect-dapp',
            query: router.query
          });
          break;
        case 'signMessage':
          void router.push({
            pathname: '/request/sign-message',
            query: router.query
          });
          break;
        case 'signTx':
          void router.push({
            pathname: '/request/sign-tx',
            query: router.query
          });
          break;
        case 'decryptMessage':
          void router.push({
            pathname: '/request/decrypt-message',
            query: router.query
          });
          break;
        default:
          alert('unkown request');
          break;
      }
    }
  }, [accouns, router, router.isReady, router.query]);

  useEffect(() => {
    dispatch(loadUserAccount);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (<></>);
}

export default RequestRouter;
