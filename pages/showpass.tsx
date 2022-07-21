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
import {
  mnemonicGenerate,
  mnemonicValidate,
} from '@polkadot/util-crypto'

interface Props {
  m12Seeds: string
}


function ShowPass({ m12Seeds }: Props) {
  const router = useRouter();
  const [seeds, setSeeds] = useState<Array<string>>(m12Seeds.split(" "));
  const [seedsStringForCopy, setSeedsStringForCopy] = useState<string>(m12Seeds);
  const [copied, setCopied] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const { theme, setTheme } = useTheme();

  console.log("m12Seeds")
  console.log(m12Seeds)
  // const m12SeedsArray = m12Seeds.split(" ");
  // console.log(m12SeedsArray)
  console.log(seeds)

  // setSeeds()


  const refresh12Seeds = () => {
    const n12Seeds = mnemonicGenerate();
    console.log(`Generated mnemonic: ${n12Seeds}`);

    const isValidMnemonic = mnemonicValidate(n12Seeds);
    if (isValidMnemonic) {
      setSeeds(n12Seeds.split(" "))
      setSeedsStringForCopy(n12Seeds)
    }
  }


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
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">1. {seeds[0]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">2. {seeds[1]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">3. {seeds[2]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">4. {seeds[3]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">5. {seeds[4]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">6. {seeds[5]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">7. {seeds[6]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">8. {seeds[7]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">9. {seeds[8]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">10. {seeds[9]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">11. {seeds[10]}</p>
                <p className="w-24 p-1 m-1 text-sm text-purple-800 bg-blue-200 rounded-md">12. {seeds[11]}</p>


              </div>
              <div className="grid grid-cols-2 py-4" >

                <CopyToClipboard text={seedsStringForCopy}
                  onCopy={() => setCopied(true)}>
                  <p className="flex items-center justify-center w-48 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer">
                    <DuplicateIcon className="h-5 px-3 cursor-pointer" />Copy</p>
                </CopyToClipboard>

                <p onClick={refresh12Seeds} className="flex items-center justify-center w-48 p-1 m-1 text-sm font-semibold text-blue-800 bg-gray-200 rounded-md cursor-pointer group">
                  <RefreshIcon className="h-5 px-3 duration-300 cursor-pointer group-active:rotate-180 transtion east-out" />Generate New</p>
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

export default ShowPass;


export async function getServerSideProps() {

  const m12Seeds = mnemonicGenerate();
  console.log(`Generated mnemonic: ${m12Seeds}`);

  const isValidMnemonic = mnemonicValidate(m12Seeds);
  if (isValidMnemonic) {
    return {
      props: {
        m12Seeds,
      },
    };
  }
};


