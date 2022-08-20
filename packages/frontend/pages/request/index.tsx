// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function RequestRouter (): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    if (router.query && router.query.requestType) {
      const requestType = router.query.requestType as string;

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
        default:
          alert('unkown request');
          break;
      }
    }
  }, [router]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (<></>);
}

export default RequestRouter;
