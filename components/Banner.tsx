import Image from "next/image";
import bg from '../images/bg.jpg'

function Banner() {
  return (
    <div className="relative h-[400px] sm:h-[450px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px] ">
      <Image
        src={bg}
        layout="fill"
        objectFit="contain"
      />
      <div className="absolute flex flex-col items-center justify-center w-full text-center top-1/4">
        <p className="text-2xl font-bold ">Choko Wallet</p>
        <p className="py-6 text-sm sm:text-lg ">Securely store your tokens and assets with Choko Wallet.</p>
        <button className="px-10 py-4 my-3 mt-10 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 " >Create account</button>
        <button className="px-10 py-4 my-3 font-bold text-purple-800 transition duration-150 bg-white rounded-full shadow-md w-60 hover:shadow-xl active:scale-90 " >Import account</button>
      </div>
    </div>
  )
}

export default Banner
