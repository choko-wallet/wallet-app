import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer';
import bg from '../images/bg.jpg'
import { useRouter } from "next/router";
import { useTheme } from 'next-themes'

const Home: NextPage = () => {
  const router = useRouter();
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true)
  }, []);

  if (!mounted) {
    return null
  }


  console.log(theme)

  return (
    <div>
      <Head><title>Choko Wallet</title></Head>
      <Header />
      <main>
        {/* {theme === 'ligt' ?  : null} */}
        <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] ">
          {theme === 'light' ?
            <Image
              src={bg}
              layout="fill"
              objectFit="contain"
            /> : null}

          <div className="absolute flex flex-col items-center justify-center w-full text-center top-1/4">
            <p className="text-2xl font-bold ">Choko Wallet</p>
            <p className="py-6 text-sm sm:text-lg ">Securely store your tokens and assets with Choko Wallet.</p>
            <button onClick={() => router.push('/create')} className="px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 " >Create account</button>
            <button onClick={() => router.push('/importaccount')} className="px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 " >Import account</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Home
