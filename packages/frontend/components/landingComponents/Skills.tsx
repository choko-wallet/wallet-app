// Copyright 2021-2022 @choko-wallet/frontend authors & contributors
// SPDX-License-Identifier: Apache-2.0

import { motion } from 'framer-motion';
import React from 'react';

import Skill from './Skill';

type Props = {};

const Skills = (props: Props) => {
  return (
    <section className='snap-center'
      id='skills'>
      <div className='relative flex flex-col items-center justify-center h-screen space-y-2 text-center md:space-y-6'>
        <h3 className='absolute top-20 uppercase tracking-[20px] text-gray-500 text-2xl'>
          Connected network
        </h3>
        <motion.div

          className='grid grid-cols-3 gap-2 mt-16 md:gap-6 md:grid-cols-6'
          initial={{
            x: 200,
            opacity: 0
          }}
          transition={{
            duration: 1.5
          }}
          viewport={{
            once: false
          }}

          whileInView={{
            x: 0,
            opacity: 1
          }}>
          <Skill iconUrl='vscode-icons:file-type-light-js'
            text='JavaScript' />
          <Skill iconUrl='logos:typescript-icon-round'
            text='TypeScript' />
          <Skill iconUrl='logos:react'
            text='React.js' />
          <Skill iconUrl='tabler:brand-react-native'
            text='React Native' />
          <Skill iconUrl='logos:redux'
            text='Redux.js' />
          <Skill iconUrl='cib:next-js'
            text='Next.js' />
        </motion.div >

        <motion.div
          className='grid grid-cols-3 gap-2 mt-16 md:gap-6 md:grid-cols-6'
          initial={{
            x: -200,
            opacity: 0
          }}
          transition={{
            duration: 1.5
          }}
          viewport={{
            once: false
          }}

          whileInView={{
            x: 0,
            opacity: 1
          }}>
          <Skill iconUrl='vscode-icons:file-type-tailwind'
            text='TailwindCss' />
          <Skill iconUrl='logos:firebase'
            text='firebase' />
          <Skill iconUrl='logos:graphql'
            text='Graphql' />
          <Skill iconUrl='fa-brands:node'
            text='node.js' />
          <Skill iconUrl='cib:git'
            text='Git' />
          <Skill iconUrl='logos:solidity'
            text='Solidity' />

        </motion.div >

      </div>
    </section>
  );
};

export default Skills;
