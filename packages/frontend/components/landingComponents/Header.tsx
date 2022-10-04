// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
import Link from 'next/link';
import { SocialIcon } from 'react-social-icons';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className='sticky top-0 z-20 flex items-center justify-between p-5 mx-auto max-w-7xl '>
      <motion.div
        animate={{
          x: 0,
          opacity: 1,
          scale: 1
        }}
        className='flex items-center'
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5
        }}
        transition={{
          duration: 1.5
        }}
      >
        <SocialIcon
          bgColor='transparent'
          fgColor='gray'
          target='_blank'
          url='https://github.com/choko-wallet'
        />
      </motion.div>

      <Link href='#contact'>
        <motion.div
          animate={{
            x: 0,
            opacity: 1,
            scale: 1
          }}
          className='flex items-center cursor-pointer'
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5
          }}
          transition={{
            duration: 1.5
          }}
        >
          <SocialIcon
            bgColor='transparent'
            className='cursor-pointer'
            fgColor='gray'
            network='email'
          />
          <p className='hidden text-sm text-gray-400 uppercase md:inline-flex'>
            Get in touch
          </p>
        </motion.div>
      </Link>
    </div>
  );
};

export default Header;
