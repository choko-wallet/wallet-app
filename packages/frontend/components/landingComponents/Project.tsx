import { motion } from 'framer-motion';

type Props = {
  demoUrl: string;
  src: string;
  alt: string;
  title: string;
  description: string;
};

const Project = ({ demoUrl, src, alt, title, description }: Props) => {
  return (
    <div className='flex flex-col items-center justify-center flex-shrink-0 w-full h-full pt-24 space-y-5 snap-center'>
      <a href={demoUrl} target='_blank' rel='noreferrer'>
        <motion.img
          initial={{
            y: -300,
            opacity: 0,
          }}
          transition={{
            duration: 1,
          }}
          whileInView={{
            y: 0,
            opacity: 1,
          }}
          // viewport={{
          //   once: true,
          // }}
          src={src}
          alt={alt}
          className='w-64 h-56 rounded-lg border-2 border-[#F7AB0A] object-cover cursor-pointer md:w-[700px] md:h-[400px]'
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
