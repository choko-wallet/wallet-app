
// [object Object]
// SPDX-License-Identifier: Apache-2.0

// [object Object]
// SPDX-License-Identifier: Apache-2.0

// [object Object]
// SPDX-License-Identifier: Apache-2.0

// [object Object]
// SPDX-License-Identifier: Apache-2.0

// [object Object]
// SPDX-License-Identifier: Apache-2.0

// [object Object]
// SPDX-License-Identifier: Apache-2.0

// [object Object]
// SPDX-License-Identifier: Apache-2.0

// [object Object]
// SPDX-License-Identifier: Apache-2.0

// [object Object]
// SPDX-License-Identifier: Apache-2.0

//[object Object]
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import QRCode from 'react-qr-code';
import { CheckIcon, UserCircleIcon, XIcon, DocumentDuplicateIcon, ChevronRightIcon, MenuIcon,
  CreditCardIcon, CurrencyDollarIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon,
  UserIcon, CameraIcon } from '@heroicons/react/outline';
import { BellIcon, CheckCircleIcon,
  PaperAirplaneIcon, DownloadIcon,
  ChevronDownIcon, CogIcon, HomeIcon, MoonIcon, SunIcon, TranslateIcon } from '@heroicons/react/solid';

interface Props {

  exportUrl: string;

}

function ExportUrlWithQRcode ({ exportUrl }: Props) {
  const [showCheck, setShowCheck] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    console.log('first');
    setShowCheck(true);
    setTimeout(() => {
      setShowCheck(false);
    }, 1000);
  };

  return (
    <div>
      <div className='w-full stringWrap mt-3 text-gray-300'>{exportUrl}</div>
      <div className='w-full flex items-center justify-center m-1'>
        <CopyToClipboard onCopy={() => { setCopied(true); }}
          text={exportUrl}>
          <div onClick={handleCopy}>
            {showCheck
              ? <CheckIcon className=' text-green-300 animate-ping ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />
              : <DocumentDuplicateIcon className=' text-gray-500 dark:text-[#03F3FF] ml-2 p-1 h-7 w-7 bg-primary cursor-pointer rounded-full' />}

          </div>
        </CopyToClipboard>
      </div>
      <div className='relative h-64 w-64 mx-auto m-3 '>
        <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={exportUrl} />
      </div>
    </div>
  );
}

export default ExportUrlWithQRcode;
