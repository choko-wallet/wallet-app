import React from 'react'
import {
  BadgeCheckIcon,
  CollectionIcon,
  HomeIcon,
  LightningBoltIcon,
  SearchIcon,
  PaperAirplaneIcon, MenuIcon, TranslateIcon, ChevronDownIcon, UserIcon, HeartIcon, CreditCardIcon, CurrencyDollarIcon
} from "@heroicons/react/outline";
// import { HomeIcon } from "@heroicons/react/solid";
// import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// import { useRecoilState } from "recoil";
// import { modalState } from "../atoms/modalAtom";
import Image from 'next/image'
import icon from '../images/icon.png'
import { useTheme } from 'next-themes'


function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  console.log(theme)


  return (
    <div className="sticky top-0 z-50 bg-white border-b shadow-md">
      <div className="flex justify-between max-w-6xl p-2 lg:mx-auto">
        <div className="flex items-center justify-center space-x-10" >
          <div onClick={() => router.push('/')} className="relative items-center w-10 h-10 my-auto cursor-pointer">
            <Image
              src={icon}
              layout="fill"
              objectFit="contain"
            />
          </div>

          <div className="flex items-center space-x-8 text-gray-500 ">
            <HomeIcon onClick={() => router.push('/home')} className="hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125" />
            <CreditCardIcon className="hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125" />
            <CurrencyDollarIcon className="hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125" />

          </div>
        </div>
        <div className="flex items-center text-gray-500 ">
          <label class="swap swap-rotate">
            <input type="checkbox" />
            <svg onClick={() => setTheme('dark')} class="swap-on fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
            <svg onClick={() => setTheme('light')} class="swap-off fill-current w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>

          </label>

          <div class="dropdown dropdown-hover">
            <label tabindex="0" class="btn m-1 border-transparent hover:border-transparent bg-transparent hover:bg-transparent text-gray-900 !outline-none">
              <TranslateIcon className="h-5 cursor-pointer " />
              <ChevronDownIcon className="h-5 cursor-pointer " />
            </label>
            <ul tabIndex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>English</a></li>
              <li><a>中文</a></li>
            </ul>
          </div>

          <div class="dropdown dropdown-hover">
            <label tabindex="0" class="btn m-1 border-transparent hover:border-transparent bg-gray-200 hover:bg-gray-200  text-gray-900 !outline-none">
              <UserIcon className="h-5 mr-2 cursor-pointer " />
              111111......1111
              <ChevronDownIcon className="h-5 ml-2 cursor-pointer" /></label>
            <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>Settings</a></li>
              <li onClick={() => router.push('/connectapp')}><a>Connect App</a></li>
              <li onClick={() => router.push('/')} ><a>Log Out</a></li>
            </ul>
          </div>

        </div>

        {/* <div>
          登录后显示
        </div> */}


      </div>
    </div >
  )
}

export default Header