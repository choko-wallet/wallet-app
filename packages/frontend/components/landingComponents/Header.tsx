import Link from 'next/link';

import { SocialIcon } from 'react-social-icons';
import { motion } from 'framer-motion';

type Props = {};

const Header = (props: Props) => {
  return (
    <div className='sticky top-0 z-20 flex items-center justify-between p-5 mx-auto max-w-7xl '>
      <motion.div
        initial={{
          x: -500,
          opacity: 0,
          scale: 0.5,
        }}
        animate={{
          x: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 1.5,
        }}
        className='flex items-center'
      >
        <SocialIcon
          url='https://github.com/choko-wallet'
          fgColor='gray'
          bgColor='transparent'
          target='_blank'
        />
      </motion.div>

      <Link href='#contact'>
        <motion.div
          initial={{
            x: 500,
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            x: 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 1.5,
          }}
          className='flex items-center cursor-pointer'
        >
          <SocialIcon
            className='cursor-pointer'
            network='email'
            fgColor='gray'
            bgColor='transparent'
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
