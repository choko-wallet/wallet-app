import { motion } from 'framer-motion';
import icon from '../../images/logo2.png'
import icon2 from '../../images/logo2.svg'


type Props = {};

const About = (props: Props) => {
  return (
    <section id='about' className='h-screen snap-center'>
      <div className='relative flex flex-col items-center justify-center h-screen px-10 mx-auto text-center max-w-7xl md:flex-row md:text-left'>
        <p className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          About
        </p>

        <motion.img
          initial={{
            x: -200,
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
          }}
          whileInView={{
            x: 0,
            opacity: 1,
          }}
          // viewport={{
          //   once: true,
          // }}
          className='w-48 h-48 mt-10 mb-5 flex-shrink-0 rounded-full object-cover md:mb-0 md:rounded-lg md:w-64 md:h-64 md:mt-0 2xl:w-[500px] 2xl:h-[500px]'
          // src='https://avatars.githubusercontent.com/u/110252171?s=200&v=4'
          src={icon2.src}
          alt='my portrait'
        />

        <motion.div
          initial={{
            opacity: 0,
          }}
          transition={{
            duration: 1.5,
          }}
          whileInView={{
            opacity: 1,
          }}
          // viewport={{
          //   once: true,
          // }}
          className='px-0 space-y-10 md:px-10 lg:px-20'
        >
          <p className='text-2xl font-semibold md:text-4xl'>
            Choko <span className='underline decoration-[#F7AB0A]/50'>Wallet</span>
          </p>
          <p className='text-sm md:text-base'>
            Multi-chain crypto wallet made by SkyeKiwi.

          </p>
          <p className='text-sm md:text-base'>
            SkyeKiwi is a privacy layer for blockchains.SkyeKiwi is a privacy layer for blockchains.SkyeKiwi is a privacy layer for blockchains.SkyeKiwi is a privacy layer for blockchains.SkyeKiwi is a privacy layer for blockchains.SkyeKiwi is a privacy layer for blockchains.SkyeKiwi is a privacy layer for blockchains.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default About;