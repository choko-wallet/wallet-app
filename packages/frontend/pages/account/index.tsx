// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

function AccountRouter (): JSX.Element {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  // const { theme } = useTheme();

  useEffect(() => {
    router.push('/account/create');

    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (<></>);
}

export default AccountRouter;
