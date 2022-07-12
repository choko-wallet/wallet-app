import React from 'react'
import {
  SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon,
  PaperAirplaneIcon, MenuIcon, TranslateIcon, ChevronDownIcon
} from "@heroicons/react/outline";
import { HomeIcon } from "@heroicons/react/solid";
// import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
// import { modalState } from "../atoms/modalAtom";
import Image from 'next/image'
import icon from '../images/icon.png'

function Header() {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-md">
      <div className="flex justify-between max-w-6xl p-2 lg:mx-auto">

        <div onClick={() => router.push('/')} className="relative items-center w-10 h-10 my-auto cursor-pointer">
          <Image
            src={icon}
            layout="fill"
            objectFit="contain"
          />
        </div>
        {/* border border-black 看框 */}
        <div className="flex items-center text-gray-500 ">
          <TranslateIcon className="h-5 cursor-pointer " />
          <ChevronDownIcon className="h-5 cursor-pointer " />

        </div>

        {/* <div>
          登录后显示
        </div> */}


      </div>
    </div>
  )
}

export default Header