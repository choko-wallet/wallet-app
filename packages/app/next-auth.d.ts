// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import 'next-auth';

declare module 'next-auth' {
  /**
     * Returned by `useSession`, `getSession` and received as a prop on the `Provider` React Context
     */
  interface Session {
    user: {
      image: string,
      name: string,
      email: string,
      provider: string
    }
  }
}
