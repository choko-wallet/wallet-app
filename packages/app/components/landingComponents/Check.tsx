// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { motion, useMotionValue, useTransform } from 'framer-motion';
import * as React from 'react';
import { useState } from 'react';

const tickVariants = {
  pressed: (isChecked: boolean) => ({ pathLength: isChecked ? 0.85 : 0.2 }),
  checked: { pathLength: 1 },
  unchecked: { pathLength: 0 }
};

const boxVariants = {
  hover: { scale: 1.05, strokeWidth: 4 },
  pressed: { scale: 0.95, strokeWidth: 6 },
  checked: { stroke: '#FF008C' },
  unchecked: { stroke: '#ddd', strokeWidth: 5 }
};

export const Check = () => {
  const [isChecked, setIsChecked] = useState(false);
  const pathLength = useMotionValue(0);
  const opacity = useTransform(pathLength, [0.05, 0.15], [0, 1]);

  return (
    <motion.svg
      animate={isChecked ? "checked" : "unchecked"}
      className=' w-full h-full '
      initial={false}
      whileTap='pressed'
      // width='60'
      // height='60'
      onClick={() => setIsChecked(!isChecked)}
      whileHover='hover'
    >
      <motion.path
        //   d='M 72 136 C 72 100.654 100.654 72 136 72 L 304 72 C 339.346 72 368 100.654 368 136 L 368 304 C 368 339.346 339.346 368 304 368 L 136 368 C 100.654 368 72 339.346 72 304 Z'
        //   d='M 36 68 C 36 50 50 36 68 36 L 152 36 C 170 36 184 50 184 68 L 184 152 C 184 170 170 184 152 184 L 68 184 C 50 184 36 170 36 152 Z'
        d='M 9 17 C 9 12 12 9 17 9 L 38 9 C 42 9 46 12 46 17 L 46 38 C 46 42 42 46 38 46 L 17 46 C 12 46 9 42 9 38 Z'
        fill='transparent'
        stroke='#FF008C'
        strokeWidth='4'
        variants={boxVariants}
      />
      <motion.path
        //   d='M 0 128.666 L 128.658 128.373 L 341.808 0'
        //   d='M 0 64 L 64 128 L 170 0'
        custom={isChecked}
        d='M -40 -58 L -26 -44 L -2 -76'
        fill='transparent'
        stroke='hsl(0, 0%, 100%)'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='5'
        style={{ pathLength, opacity }}
        transform='translate(54.917 88.332) rotate(-4 42.904 16.687)'
        variants={tickVariants}
      />
      <motion.path
        //   d='M 0 16 L 16 32 L 42 0'
        //   d='M -38 -62 L -24 -46 L -3 -72'
        //   d='M -38 -62 L -24 -46 L 0 -72'
        custom={isChecked}
        d='M -38 -54 L -24 -40 L 0 -72'
        fill='transparent'
        stroke='#17E717'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='8'
        style={{ pathLength, opacity }}
        transform='translate(54.917 68.947) rotate(-4 170.904 64.687)'
        variants={tickVariants}
      />
    </motion.svg>
  );
};
