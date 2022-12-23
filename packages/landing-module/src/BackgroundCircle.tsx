// Copyright 2021-2022 @choko-wallet/landing-module authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
import React from 'react';

const BackgroundCircle = (): JSX.Element => {
  return (
    <motion.div
      animate={{
        opacity: [0.2, 0.4, 0.8, 1.0],
        scale: [1, 1.3, 3, 1]
      }}
      className='relative flex items-center justify-center'
      initial={{
        opacity: 0,
        scale: 0

      }}
      transition={{
        duration: 2.5
      }}
    >
      <div className='absolute border border-[#333333] rounded-full h-[200px] w-[200px] mt-52 animate-ping' />
      <div className='absolute border border-[#333333] rounded-full h-[300px] w-[300px] mt-52' />
      <div className='absolute border border-[#333333] rounded-full h-[500px] w-[500px] mt-52' />
      <div className='absolute border border-[#F7AB0A] rounded-full h-[650px] w-[650px] mt-52 opacity-20 animate-pulse' />
      <div className='absolute border border-[#333333] rounded-full h-[800px] w-[800px] mt-52' />
    </motion.div>
  );
};

export default BackgroundCircle;
