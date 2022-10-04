// [object Object]
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';

import Project from './Project';

type Props = {};

const Projects = (props: Props) => {
  return (
    <section className='snap-center'
      id='projects'>
      <motion.div
        className='relative flex items-center justify-center h-screen text-center '
        initial={{
          opacity: 0
        }}
        transition={{
          duration: 1.5
        }}
        viewport={{
          once: true
        }}
        whileInView={{
          opacity: 1
        }}
      >
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          Projects
        </h3>

        <div className='relative w-full mx-5 md:mx-10 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
          <Project
            alt='project six'
            demoUrl='https://insta-clone-ksmikdlvg-lizhuyao666-gmailcom.vercel.app/'
            description='Nextjs-Tailwind-Firebase'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FgCRLCJrbabemdEWeisTd%2Fimage?alt=media&token=299b4f9c-21e8-4005-b8d4-e8a36351498a'
            title='Instagram Clone'
          />
          <Project
            alt='project one'
            demoUrl='https://mbank-nextjs-tailwind-supergradient.vercel.app/'
            description='Nextjs-Tailwind-SuperGradient'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FqNbxaYe3qugZXyfegC6S%2Fimage?alt=media&token=8d3215a7-8d79-41a4-9071-17c01af153cb'
            title='Hoobank'
          />
          <Project
            alt='project two'
            demoUrl='https://web3-nft-game-react-solidity.vercel.app/'
            description='Web3-Nft-Game-React-Solidity'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FGKMQ9sYQdu9h5ViZyU0R%2Fimage?alt=media&token=13f99a50-df95-4361-afc7-10b02dd5a312'
            title='Web3 Nft Game'
          />
          <Project
            alt='project three'
            demoUrl='https://nft-react-nextjs-thirdweb.vercel.app/'
            description='nft-react-nextjs-thirdweb'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FnNSmp9hFWYAs0YcwCzRG%2Fimage?alt=media&token=82f24937-2d22-4b3d-bfd2-b001688aa156'
            title='Nft Drop'
          />
          <Project
            alt='project four'
            demoUrl='https://expo.dev/@heliummixoptimal/rn-travel-app'
            description='Travel App React Native'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FdLEiqFxgCIABOQMFxWYI%2Fimage?alt=media&token=59cdcbf7-7691-439e-a92c-8ba30d2aee14'
            title='Travel App'
          />
          <Project
            alt='project five'
            demoUrl='https://amazon-clone-react-nextjs-pearl.vercel.app/'
            description='Nextjs-Tailwind-Redux'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2F4lBmnMMx0vmUCUOwZQrr%2Fimage?alt=media&token=bd70bc21-8b19-4035-ad43-112edc03bc81'
            title='Amazon Clone'
          />

        </div>

        <div className='w-full absolute bg-white top-[25%] left-0 bg-[#F7AB0A]/10 h-[300px] -skew-y-12' />
      </motion.div>
    </section>
  );
};

export default Projects;
