// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function RequestRouter (): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  // const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
    const requestType = router.query.requestType as string;
    if (requestType === 'signMessage') {
      router.push('/request/sign-message');
    } else if (requestType === 'signTransaction') {
      router.push('/request/tx');
    } else {
      console.log("unkown request");
      router.push('/');
    }
  }, []);

  if (!mounted) {
    return null;
  }

  return (<></>);
}

export default RequestRouter;
