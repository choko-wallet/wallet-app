import type { NextPage } from 'next';
import Head from 'next/head';

import Header from '../components/landingComponents/Header';
import Hero from '../components/landingComponents/Hero';
import About from '../components/landingComponents/About';
import Experience from '../components/landingComponents/Experience';
import Skills from '../components/landingComponents/Skills';
import Projects from '../components/landingComponents/Projects';
import ContactMe from '../components/landingComponents/ContactMe';


const Home: NextPage = () => {
  // console.log('local1', localStorage.getItem('serialziedUserAccount'))

  return (
    <div className='bg-[#242424] text-white h-screen snap-y snap-mandatory overflow-x-hidden overflow-y-scroll z-0 '>
      <Head>
        <title>CHOKO WALLET</title>
      </Head>

      <Header />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Projects />
      <ContactMe />

    </div>
  );
};

export default Home;
