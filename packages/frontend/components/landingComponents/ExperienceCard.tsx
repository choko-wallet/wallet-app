import Image from 'next/image';
import { motion } from 'framer-motion';
import Skill from './Skill';

type Props = {
  src: string;
  alt: string;
  title: string;
  company: string;
  dates: string;
  descriptionType: string;
  descriptions: string[];
};

const ExperienceCard = ({
  src,
  alt,
  title,
  company,
  dates,
  descriptionType,
  descriptions,
}: Props) => {
  return (
    <div className='flex flex-col items-center mt-10 h-[400px] rounded-lg space-y-7 flex-shrink-0 w-[300px]  snap-center bg-[#292929] opacity-40 hover:opacity-100 cursor-pointer transition-opacity duration-200 p-10 overflow-hidden md:w-[700px] '>

      <div className='px-0 md:px-10'>
        <h4 className='text-2xl font-light md:text-4xl'>{title}</h4>
        <h4 className='font-light text-md md:text-xl'>{dates}</h4>


        {descriptionType === 'Responsibilities' ? (
          <p className='mb-2'>Responsibilities:</p>
        ) : (
          <p className='mb-2'>Achievements:</p>
        )}
        <ul className='ml-5 text-sm list-disc md:text-lg'>
          {descriptions.map((description, index) => (
            <li key={index}>{description}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExperienceCard;
