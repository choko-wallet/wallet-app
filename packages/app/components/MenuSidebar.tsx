
import { SearchIcon, XIcon } from '@heroicons/react/outline';
import { motion } from 'framer-motion';
import React, { Fragment, useEffect, useState } from 'react';

function MenuSidebar() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <motion.div
        transition={{ layout: { duration: 1.5, type: 'spring' } }}
        layout
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='absolute top-20 left-0 bottom-0 bg-blue-300 z-50 cursor-pointer'>

        <motion.div
          className='flex items-center justify-center'
        >
          <motion.div
            layout='position'
          >
            <SearchIcon className='w-10 h-10 mx-2' />
            <SearchIcon className='w-10 h-10 mx-2' />
            <SearchIcon className='w-10 h-10 mx-2' />

          </motion.div>

          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <p className='w-60 h-10'>search</p>
              <p className='w-60 h-10'>search</p>
              <p className='w-60 h-10'>search</p>
            </motion.div>
          )}

        </motion.div>

      </ motion.div>

      <motion.div
        transition={{ layout: { duration: 0.6, type: 'spring' } }}
        layout
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='absolute top-20 left-96 bottom-0 bg-blue-300 z-50 cursor-pointer'>

        <motion.div
          className='flex items-center justify-center'
        >
          <motion.div
            layout='position'
          >
            <SearchIcon className='w-10 h-10 mx-2' />
            <SearchIcon className='w-10 h-10 mx-2' />
            <SearchIcon className='w-10 h-10 mx-2' />

          </motion.div>

          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <p className='w-60 h-10'>search</p>
              <p className='w-60 h-10'>search</p>
              <p className='w-60 h-10'>search</p>
            </motion.div>
          )}

        </motion.div>

      </ motion.div>

      <motion.div
        transition={{ layout: { duration: 1.0, type: 'tween' } }}
        layout
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='absolute top-20 left-[760px] bottom-0 bg-blue-300 z-50 cursor-pointer'>

        <motion.div
          className='flex items-center justify-center'
        >
          <motion.div
            layout='position'
          >
            <SearchIcon className='w-10 h-10 mx-2' />
            <SearchIcon className='w-10 h-10 mx-2' />
            <SearchIcon className='w-10 h-10 mx-2' />

          </motion.div>

          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <p className='w-60 h-10'>search</p>
              <p className='w-60 h-10'>search</p>
              <p className='w-60 h-10'>search</p>
            </motion.div>
          )}

        </motion.div>

      </ motion.div>

      <motion.div
        transition={{ layout: { duration: 0.6, type: 'tween' } }}
        layout
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className='absolute top-20 left-[1200px] bottom-0 bg-blue-300 z-50 cursor-pointer'>

        <motion.div
          className='flex items-center justify-center'
        >
          <motion.div
            layout='position'
          >
            <SearchIcon className='w-10 h-10 mx-2' />
            <SearchIcon className='w-10 h-10 mx-2' />
            <SearchIcon className='w-10 h-10 mx-2' />

          </motion.div>

          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <p className='w-60 h-10'>search</p>
              <p className='w-60 h-10'>search</p>
              <p className='w-60 h-10'>search</p>
            </motion.div>
          )}

        </motion.div>

      </ motion.div>
    </>
  )
}

export default MenuSidebar