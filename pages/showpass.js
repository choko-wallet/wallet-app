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


function ShowPass() {
  const router = useRouter();
  const [seeds, setSeeds] = useState('');
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => {
    setSeeds('token token token token token token token token token token token token');
  }, [])
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
            <p className="text-2xl font-bold ">Your Secure Passphrase</p>
            <p className="max-w-3xl py-6 text-sm font-bold">Write down the following words in order and keep them somewhere safe. Anyone with access to it will also have access to your account! You’ll be asked to verify your passphrase next.</p>

            <div className="border border-blue-400 rounded-lg ">
              <div className="grid grid-cols-4 ">
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">1. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">2. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">3. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">4. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">5. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">6. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">7. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">8. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">9. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">10. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">11. token</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">12. token</p>


              </div>
              <div className="grid grid-cols-2 py-4" >

                <CopyToClipboard text={seeds}
                  onCopy={() => setCopied(true)}>
                  <p className="flex items-center justify-center w-48 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer">
                    <DuplicateIcon className="h-5 px-3 cursor-pointer" />Copy</p>
                </CopyToClipboard>

                <p className="flex items-center justify-center w-48 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer">
                  <RefreshIcon className="h-5 px-3 cursor-pointer " />Generate New</p>
                {copied ? <span className="h-2 text-xs text-blue-500 " >Copied</span> : <div className="h-2 "></div>}
              </div>



            </div>
            <button onClick={() => router.push('/inputpass')} className="px-10 py-3 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 " >Continue</button>
            <button onClick={() => router.push('/')} className="px-10 py-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 "  >Cancel</button>
          </div>
        </div >
      </main >

      <Footer />
    </div >
  )
}

export default ShowPass