import React, { useState, useEffect } from 'react'
import {
  HomeIcon, CogIcon,
  LightningBoltIcon, BellIcon,
  SearchIcon, DotsHorizontalIcon, DuplicateIcon, EyeIcon, EyeOffIcon, SunIcon, MoonIcon,
  PaperAirplaneIcon, MenuIcon, TranslateIcon, ChevronDownIcon, UserIcon, HeartIcon,
  CreditCardIcon, CurrencyDollarIcon
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import Image from 'next/image'
import icon from '../images/icon.png'
import { useTheme } from 'next-themes'
import { CopyToClipboard } from 'react-copy-to-clipboard';


function Header() {


  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);
  const [showpass, setShowpass] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

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

            <BellIcon className="hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125" />
            <CogIcon className="hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125" />
            {/* <div>{origin}{items.length}{total}</div> */}

          </div>
        </div>


        {/* 下拉框需要调整对齐 可用items-start或justify-start */}
        <div className="flex items-center text-gray-500 ">

          {theme === 'light' ?
            <SunIcon onClick={() => setTheme('dark')} className="hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125" />
            : <MoonIcon onClick={() => setTheme('light')} className="hidden h-8 transition duration-150 ease-out cursor-pointer md:inline-flex active:scale-125" />
          }

          <div className="dropdown dropdown-hover">
            <label className="btn m-1 border-transparent hover:border-transparent bg-transparent hover:bg-transparent text-gray-900 !outline-none">
              <TranslateIcon className="h-5 cursor-pointer " />
              <ChevronDownIcon className="h-5 cursor-pointer " />
            </label>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
              <li><a>English</a></li>
              <li><a>中文</a></li>
            </ul>
          </div>

          <div className="dropdown dropdown-hover dropdown-end">
            <label className="btn m-1 border-transparent hover:border-transparent bg-gray-200 hover:bg-gray-200  text-gray-900 !outline-none">
              <UserIcon className="h-5 mr-2 cursor-pointer " />
              2222......2222
              <ChevronDownIcon className="h-5 ml-2 cursor-pointer" />
            </label>
            <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-80 ">

              <div className="card w-70 bg-blue-200 text-neutral-content ">
                <div className="card-body items-center text-center">
                  <div className="flex items-center justify-center h-10 text-gray-600">
                    222222
                    {!showpass ?
                      <>
                        <DotsHorizontalIcon className="h-8 text-gray-600" />
                        <DotsHorizontalIcon className="h-8 text-gray-600" />
                        <DotsHorizontalIcon className="h-8 text-gray-600" />
                      </>
                      :
                      <span>222222222</span>}
                    2222</div>
                  <div className="card-actions justify-end">
                    <div className="grid grid-cols-2 py-4" >

                      <CopyToClipboard text={accountNumber}
                        onCopy={() => setCopied(true)}>
                        <div className="flex items-center justify-center w-24 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer">
                          <DuplicateIcon className="h-5 px-3 cursor-pointer" /></div>
                      </CopyToClipboard>

                      <div onClick={() => setShowpass(!showpass)} className="flex items-center justify-center w-24 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer">
                        {showpass ? <EyeIcon className="h-5 px-3 cursor-pointer " /> : <EyeOffIcon className="h-5 px-3 cursor-pointer " />}
                      </div>

                      {copied ? <span className="h-2 text-xs text-blue-500 " >Copied</span> : <div className="h-2 "></div>}


                    </div>
                  </div>
                </div>
              </div>

              <li onClick={() => router.push('/create')} className=""><a>Create Account</a></li>
              <li onClick={() => router.push('/importaccount')} className=""><a>Import Account</a></li>
              <li onClick={() => router.push('/connectapp')}><a>Connect App</a></li>
              <li onClick={() => router.push('/trustedapp')}><a>Trusted App</a></li>
              <li onClick={() => router.push('/setpassword')}><a>Set Password</a></li>
              <li onClick={() => router.push('/changepassword')}><a>Change Password</a></li>
              <li onClick={() => router.push('/showpassphrase')}><a>Show Passphrase</a></li>

              <label htmlFor="my-modal" className="btn modal-button">Remove Account</label>

              <input type="checkbox" id="my-modal" className="modal-toggle " />
              <div className="modal">
                <div className="modal-box">
                  <h3 className="font-bold text-lg">Remove Account</h3>
                  <p className="py-4">Remove Account</p>
                  <div className="modal-action">
                    <label onClick={() => router.push('/')} htmlFor="my-modal" className="btn">Remove</label>
                    <label htmlFor="my-modal" className="btn">Cancel</label>
                  </div>
                </div>
              </div>

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