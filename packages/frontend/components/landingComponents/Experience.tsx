import { motion } from 'framer-motion';

import ExperienceCard from './ExperienceCard';

const WorkDescriptions = [

  'Develop UI using React.js, Next.js and TailwindCSS from Figma.',
  'Manage data and state with Redux.',
  'Interact with blockchain by using js api.',
  'Build reusable components for future use.',
  'Translating designs into high quality, clean and efficient code.',
];

const UniversityDescriptions = [
  'Bachelor of Logistic Engineering'
];


type Props = {};

const Experience = (props: Props) => {
  return (
    <section id='experience' className='snap-center'>
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
        //   once: false,
        // }}
        className='relative h-screen flex justify-center items-center text-left overflow-hidden max-w-[1600px] px-10 mx-auto '
      >
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          Experience
        </h3>

        <div className='w-full  flex items-center space-x-5 overflow-x-scroll pt-16 p-6 md:p-10 snap-x snap-mandatory scrollbar-thin scrollbar-track-gray-400/20 scrollbar-thumb-[#F7AB0A]/80'>
          <ExperienceCard
            src='/static/jet-cleaning-logo.jpeg'
            alt='jet cleaning logo'
            title='React developer'
            company='React developer'
            dates='Jan 2020 - Sep 2022'
            descriptionType='Responsibilities'
            descriptions={WorkDescriptions}
          />

          <ExperienceCard
            src='/static/unitec-logo.jpeg'
            alt='unitec logo'
            title='Dalian University of Technology'
            company='Dalian University of Technology'
            dates='2008 - 2012'
            descriptionType='Achievements'
            descriptions={UniversityDescriptions}
          />


        </div>
      </motion.div>
    </section>
  );
};

export default Experience;
