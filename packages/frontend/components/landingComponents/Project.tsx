// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
import React from 'react';

type Props = {
  demoUrl: string;
  src: string;
  alt: string;
  title: string;
  description: string;
};

const Project = ({ alt, demoUrl, description, src, title }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center flex-shrink-0 w-full h-full pt-24 space-y-5 snap-center'>
      <a href={demoUrl}
        rel='noreferrer'
        target='_blank'>
        <motion.img
          alt={alt}
          className='w-64 h-56 rounded-lg border-2 border-[#F7AB0A] object-cover cursor-pointer md:w-[700px] md:h-[400px]'
          initial={{
            y: -300,
            opacity: 0
          }}
          // viewport={{
          //   once: true,
          // }}
          src={src}
          transition={{
            duration: 1
          }}
          whileInView={{
            y: 0,
            opacity: 1
          }}
        />
      </a>

      <div className='pb-10 space-y-5'>
        <h4 className='text-xl font-semibold text-center md:text-2xl'>
          {title}
        </h4>
        <p className='text-xl text-center text-gray-300 '>
          {description}
        </p>
      </div>
    </div>
  );
};

export default Project;
