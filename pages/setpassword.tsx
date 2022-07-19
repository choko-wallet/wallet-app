import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer';
import bg from '../images/bg.jpg'
import { useRouter } from "next/router";
import {
  RefreshIcon, LocationMarkerIcon, ChevronDoubleDownIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon
} from "@heroicons/react/outline";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTheme } from 'next-themes'



function SetPassword() {
  const router = useRouter();
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
        <div className="relative h-[600px] sm:h-[700px] lg:h-[800px] ">
          {theme === 'light' ?
            <Image
              src={bg}
              layout="fill"
              objectFit="contain"
            /> : null}
          <div className="absolute flex flex-col items-center justify-center w-full text-center top-16 space-y-4">
            <p className="text-2xl font-bold ">Set Password</p>

            <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />
            <p className="text-sm  ">Input Your Password Again</p>

            <input type="text" placeholder="Type here" className="input input-bordered input-info w-full max-w-xs" />


            <button onClick={() => router.push('/home')} className="px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-yellow-100 to-blue-200 w-60 hover:shadow-xl active:scale-90 " >Set password</button>
            <button onClick={() => router.push('/home')} className="px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md bg-gradient-to-r from-sky-100 to-pink-200 w-60 hover:shadow-xl active:scale-90 "  >Cancel</button>



          </div>
        </div>
      </main >

      <Footer />
    </div >
  )
}

export default SetPassword