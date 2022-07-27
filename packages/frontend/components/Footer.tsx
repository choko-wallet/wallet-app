// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

function Footer (): JSX.Element {
  return (
    <div className='grid grid-cols-1 px-10 py-10 bg-gray-100 md:grid-cols-3 md:px-16'>
      <div className='p-2 space-y-4 text-xs text-gray-800 border-t'>
        <h5 className='font-bold'>ABOUT</h5>
        <p>How Choko Works</p>
        <p>News</p>

      </div>
      <div className='p-2 space-y-4 text-xs text-gray-800 border-t'>
        <h5 className='font-bold'>COMMUNITY</h5>
        <p>Discord</p>
        <p>Twitter</p>

      </div>
      <div className='p-2 space-y-4 text-xs text-gray-800 border-t'>
        <h5 className='font-bold'>HOST</h5>
        <p>© 2022 Choko Wallet. All Rights Reserved.</p>
        <p>Terms of Service</p>

      </div>

    </div>
  );
}

export default Footer;
