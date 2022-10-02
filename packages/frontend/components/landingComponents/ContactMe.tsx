// import { MdEmail, MdLocationOn, MdPhone } from 'react-icons/md';

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type Props = {};

const ContactMe = (props: Props) => {

  return (
    <section id='contact' className='snap-start'>
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

            <p className='text-2xl'>contact@choko.app</p>
          </div>
          <div className='flex items-center justify-center space-x-4'>
            {/* <MdPhone className='w-7 h-7 text-[#F7AB0A] animate-pulse' /> */}
            {/* <p className='text-2xl'>+66-0966712286</p> */}
          </div>



        </div>
      </div>
    </section>
  );
};

export default ContactMe;
