import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer';
import bg from '../images/bg.jpg'
import {
  RefreshIcon, DuplicateIcon
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTheme } from 'next-themes'


function ImportAccount() {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const [mounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div>
      <Header />
      <main>
        <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] ">
          {theme === 'light' ?
            <Image
              src={bg}
              layout="fill"
              objectFit="contain"
            /> : null}
          <div className="absolute flex flex-col items-center justify-center w-full text-center top-5">
            <p className="text-2xl font-bold ">Recover using Passphrase</p>
            <p className="max-w-3xl py-6 text-sm font-bold">Enter the backup passphrase associated with the account.</p>
            <p className="text-lg font-bold ">Passphrase (12 words)</p>

            {/* <div className="flex items-center py-2 rounded-full md:border-2 md:shadow-sm">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-grow pl-5 text-sm text-gray-600 placeholder-gray-400 bg-transparent outline-none "
                type="text"
              />
            </div> */}

            <div className="h-16 p-3 mt-1 w-30 md:w-48 lg:w-64 md:shadow-sm">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-10 pl-2 rounded-md border-3 border-gray bg-gray-50 sm:text-sm "
                type="text"
              />

            </div>
            {/* 
            className={`button mt-2 ${!session && "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"}`}>
            {!session ? "Sign in to Checkout" : "Proceed to Checkout"} */}


            <button disabled={!input} onClick={() => router.push('/home')}
              className={`px-10 py-3 my-3 font-bold rounded-full w-60 bg-gray-300 ${input && "text-purple-800 transition duration-150 !bg-white shadow-md hover:shadow-xl active:scale-90"}`}
            >
              Verify & Complete
            </button>
            <button onClick={() => router.push('/')} className="px-10 py-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 bg-gradient-to-r from-yellow-200 to-blue-200 "  >Cancel</button>
          </div>
        </div >
      </main >

      <Footer />

    </div>
  )
}

export default ImportAccount