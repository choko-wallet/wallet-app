// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function RequestRouter (): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (!router.isReady) return;
    const requestType = router.query.requestType as string;

    if (!localStorage.getItem('serialziedUserAccount')) {
      localStorage.setItem('requestParams', `requestType=${router.query.requestType as string}&payload=${router.query.payload as string}&callbackUrl=${encodeURIComponent(router.query.callbackUrl as string)}`);
      void router.push('/account');
    }

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
  }, [router, router.isReady, router.query]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (<></>);
}

export default RequestRouter;
