// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { NextRequest } from 'next/server';

import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware (request: NextRequest) {
  // repalce with real conditional logic
  // const search = request.nextUrl.search;

  // if (!search.includes('forceRedirect=true')) {
  //   if (request.nextUrl.pathname.startsWith('/account') && accountIsSet) {
  //     return NextResponse.redirect(new URL('/home', request.url));
  //   }
  // } else {
  //   // Do nothing
  // }
}
