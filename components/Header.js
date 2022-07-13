import React from 'react'
import {
  SearchIcon, PlusCircleIcon, UserGroupIcon, HeartIcon,
  PaperAirplaneIcon, MenuIcon, TranslateIcon, ChevronDownIcon, UserIcon
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
          {/* <TranslateIcon className="h-5 cursor-pointer " />
          <ChevronDownIcon className="h-5 cursor-pointer " /> */}

          <div class="dropdown">
            <label tabindex="0" class="btn m-1"><TranslateIcon className="h-5 cursor-pointer " />
              <ChevronDownIcon className="h-5 cursor-pointer " /></label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>English</a></li>
              <li><a>中文</a></li>
            </ul>
          </div>

          <div class="dropdown">
            <label tabindex="0" class="btn m-1"><UserIcon className="h-5 cursor-pointer " />
              111111......1111
              <ChevronDownIcon className="h-5 cursor-pointer " /></label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Settings</a></li>
              <li onClick={() => router.push('/')} ><a>Log Out</a></li>
            </ul>
          </div>

        </div>

        {/* <div>
          登录后显示
        </div> */}


      </div>
    </div>
  )
}

export default Header