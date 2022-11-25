// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { SVGProps } from 'react';

interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  rotate?: boolean;
}

function Button({ Icon, rotate, title }: Props): JSX.Element {
  return (
    <div className='flex flex-col justify-center items-center w-[120px] h-[60px] lg:w-[130px] lg:h-[66px] bg-[#F5F5F5] dark:bg-[#384855] hover:bg-[#0170BF] dark:hover:bg-[#4797B5] rounded-2xl   cursor-pointer space-y-1 group'>
      <Icon className={`h-6 w-6 text-[#B6B7BC] group-hover:text-[#F5CBD5]  ${rotate ? 'rotate-45 ml-1' : 'rotate-0'} `} />
      <p className='text-[15px] '>
        <span className='text-[#B6B7BC] font-semibold font-poppins  group-hover:text-[#F5CBD5]'>{title}</span>
      </p>

    </div>
  );
}

export default Button;
