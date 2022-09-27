import { motion } from 'framer-motion';

import Project from './Project';

type Props = {};

const Projects = (props: Props) => {
  return (
    <section id='projects' className='snap-center'>
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
        viewport={{
          once: true,
        }}
        className='relative flex items-center justify-center h-screen text-center '
      >
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          Projects
        </h3>

        <div className='relative w-full mx-5 md:mx-10 flex overflow-x-scroll overflow-y-hidden snap-x snap-mandatory z-20 scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
          <Project
            demoUrl='https://insta-clone-ksmikdlvg-lizhuyao666-gmailcom.vercel.app/'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FgCRLCJrbabemdEWeisTd%2Fimage?alt=media&token=299b4f9c-21e8-4005-b8d4-e8a36351498a'
            alt='project six'
            title='Instagram Clone'
            description='Nextjs-Tailwind-Firebase'
          />
          <Project
            demoUrl='https://mbank-nextjs-tailwind-supergradient.vercel.app/'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FqNbxaYe3qugZXyfegC6S%2Fimage?alt=media&token=8d3215a7-8d79-41a4-9071-17c01af153cb'
            alt='project one'
            title='Hoobank'
            description='Nextjs-Tailwind-SuperGradient'
          />
          <Project
            demoUrl='https://web3-nft-game-react-solidity.vercel.app/'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FGKMQ9sYQdu9h5ViZyU0R%2Fimage?alt=media&token=13f99a50-df95-4361-afc7-10b02dd5a312'
            alt='project two'
            title='Web3 Nft Game'
            description='Web3-Nft-Game-React-Solidity'
          />
          <Project
            demoUrl='https://nft-react-nextjs-thirdweb.vercel.app/'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FnNSmp9hFWYAs0YcwCzRG%2Fimage?alt=media&token=82f24937-2d22-4b3d-bfd2-b001688aa156'
            alt='project three'
            title='Nft Drop'
            description='nft-react-nextjs-thirdweb'
          />
          <Project
            demoUrl='https://expo.dev/@heliummixoptimal/rn-travel-app'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2FdLEiqFxgCIABOQMFxWYI%2Fimage?alt=media&token=59cdcbf7-7691-439e-a92c-8ba30d2aee14'
            alt='project four'
            title='Travel App'
            description='Travel App React Native'
          />
          <Project
            demoUrl='https://amazon-clone-react-nextjs-pearl.vercel.app/'
            src='https://firebasestorage.googleapis.com/v0/b/insta-b6569.appspot.com/o/posts%2F4lBmnMMx0vmUCUOwZQrr%2Fimage?alt=media&token=bd70bc21-8b19-4035-ad43-112edc03bc81'
            alt='project five'
            title='Amazon Clone'
            description='Nextjs-Tailwind-Redux'
          />

        </div>

        <div className='w-full absolute bg-white top-[25%] left-0 bg-[#F7AB0A]/10 h-[300px] -skew-y-12' />
      </motion.div>
    </section>
  );
};

export default Projects;
