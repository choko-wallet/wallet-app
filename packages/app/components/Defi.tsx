// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

// import { ArrowDownIcon,
//   ArrowUpIcon,
//   ChevronDownIcon,
//   CogIcon } from '@heroicons/react/outline';
// import { motion } from 'framer-motion';
import React from 'react';

import Chart from './Chart';
import PriceTable from './PriceTable';
import Swap from './Swap';
import TotalValue from './TotalValue';

function Defi (): JSX.Element {
  // const [showDust, setShowDust] = useState<boolean>(true);
  // const [valueInput, setValueInput] = useState<number | null>(null);
  // const [valueInput2, setValueInput2] = useState<number | null>(null);

  // const options = [
  //   { value: 'Ethereum', label: 'Ethereum' },
  //   { value: 'Polygon', label: 'Polygon' },
  //   { value: 'Polkadot', label: 'Polkadot' }
  // ];

  return (
    <div className=' mb-6 lg:mb-12 w-full bg-transparent dark:bg-[#0A0A0B] mx-auto p-2 sm:p-3 md:p-6'>
      <div className='w-full max-w-6xl min-h-[750px] bg-transparent dark:bg-[#1A1A1A] mx-auto rounded-[8px] font-poppins py-5 px-3 my-3 md:my-0 md:px-5 lg:px-16 lg:py-8 relative'>
        <div className='md:flex space-y-4 md:space-y-0 md:space-x-4'>
          <Swap />

          <PriceTable />
        </div>

        <div className='md:flex md:space-x-5 w-full '>
          <TotalValue />
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default Defi;
