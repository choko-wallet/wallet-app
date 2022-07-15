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



function ConnectApp() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false)
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
          <div className="absolute flex flex-col items-center justify-center w-full text-center top-16">
            <p className="text-2xl font-bold ">Trusted App</p>
            {/* <p className="py-6 text-sm sm:text-lg ">An application is requesting limited access to your Choko Wallet account.</p> */}

            <div class="badge badge-info gap-2 h-16 w-60 justify-between px-8 mt-5">
              <div class="flex items-center justify-center" >
                <LocationMarkerIcon className="h-8 text-gray" />
                <p>Google</p>
              </div>
              <button class="btn btn-circle btn-outline">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>




          </div>
        </div>
      </main >

      <Footer />
    </div >
  )
}

export default ConnectApp