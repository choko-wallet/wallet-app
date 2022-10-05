// import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';
import Image from 'next/image';
import React from 'react';
import { SocialIcon } from 'react-social-icons';

import discIcon2 from '../../images/discord2.svg';

// type Inputs = {
//   name: string;
//   email: string;
//   subject: string;
//   message: string;
// };

type Props = {};

const ContactMe = (props: Props) => {
  return (
    <section className='snap-start'
      id='contact'>
      <div className='relative flex items-center justify-center h-screen text-center'>
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          Contact
        </h3>

        <div className='flex flex-col space-y-10'>

          <h4 className='text-4xl font-semibold text-center md:text-5xl'>
            Let&apos;s{' '}
            <span className='underline decoration-[#F7AB0A]/50'>Talk!</span>
          </h4>
          <div className='flex items-center justify-center space-x-4'>
            {/* <MdEmail className='w-7 h-7 text-[#F7AB0A] animate-pulse' /> */}
            <SocialIcon
              bgColor='transparent'
              className='cursor-pointer'
              fgColor='white'
              network='email'
            />
            <p className='text-2xl'>contact@choko.app</p>
          </div>
          <div className='flex items-center justify-center space-x-4'>
            {/* <MdPhone className='w-7 h-7 text-[#F7AB0A] animate-pulse' /> */}
            {/* <p className='text-2xl'>+66-0966712286</p> */}
          </div>
          <div className='flex items-center justify-center'>
            <SocialIcon
              bgColor='transparent'
              fgColor='white'
              target='_blank'
              url='https://github.com/choko-wallet'
            />
            <SocialIcon
              bgColor='transparent'
              fgColor='white'
              target='_blank'
              url='https://telegram'
            />
            <SocialIcon
              bgColor='transparent'
              fgColor='white'
              target='_blank'
              url='https://twitter'
            />

            <div className='inline-flex relative h-7 w-7 m-3'>
              <Image
                layout='fill'
                objectFit='contain'
                src={discIcon2}
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactMe;
