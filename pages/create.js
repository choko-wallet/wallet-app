import React from 'react'
import Image from 'next/image'
import Header from '../components/Header'
import Footer from '../components/Footer';
import bg from '../images/bg.jpg'
import { useRouter } from "next/router";

function Create() {
  const router = useRouter();
  return (
    <div>
      <Header />
      <main>
        <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] ">
          <Image
            src={bg}
            layout="fill"
            objectFit="contain"
          />
          <div className="absolute flex flex-col items-center justify-center w-full text-center top-1/4">
            <p className="text-2xl font-bold ">Create Account</p>
            <p className="py-6 text-sm sm:text-lg ">Generate and safely store a unique passphrase.</p>
            <button onClick={() => router.push('/showpass')} className="bg-gradient-to-r from-yellow-100 to-blue-200 px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 " >Secure Passphrase</button>
            <button onClick={() => router.push('/')} className="bg-gradient-to-r from-sky-100 to-pink-200 px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 "  >Cancel</button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Create