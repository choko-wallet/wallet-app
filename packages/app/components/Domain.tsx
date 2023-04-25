import {
  ChevronRightIcon,
  LocationMarkerIcon,
  XIcon,
} from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

function Domain() {
  const [searchInput, setSearchInput] = useState("");
  const [wait, setWait] = useState(false);

  const handleSearch = () => {
    //     if (!wait) return;
    setTimeout(() => {
      setWait(false);
    }, 2000);
  };

  useEffect(() => {
    setWait(true);
    handleSearch();
  }, [searchInput]);

  console.log("wait", wait);

  return (
    <div className='mx-auto bg-transparent  p-4 max-w-[500px]  rounded-lg flex flex-col items-center justify-center  text-center z-30'>
      {/* <div className='flex flex-col items-center justify-center space-y-3 '> */}
      <p className='text-[40px] font-poppins text-gray-400 dark:text-blue-400 font-semibold'>
        Your web3 username
      </p>
      <p className='text-[14px] lg:text-[18px] font-poppins text-gray-700 dark:text-gray-300 '>
        Your identity across web3, one name for all your crypto addresses, and
        your decentralised website.
      </p>

      <div className='w-full mt-8 relative  '>
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className='w-full items-center p-3 rounded-lg  pl-6 focus:border focus:border-blue-400  text-gray-300 placeholder-gray-400 bg-gray-900 outline-none font-poppins text-[20px]'
          type='text'
          placeholder={"Search for a name"}
        />

        {searchInput && (
          <div className='absolute top-4 right-5'>
            <XIcon
              onClick={(e) => setSearchInput("")}
              className=' text-black h-5 w-5 cursor-pointer dark:text-white'
            />
          </div>
        )}

        {searchInput && (
          <div className='absolute -bottom-[108px] left-0 right-0 flex flex-col mx-auto rounded-lg overflow-hidden '>
            <div className='group w-full h-12 flex items-center justify-between p-4 bg-gray-900 hover:bg-gray-800 cursor-pointer'>
              <div className='flex items-center justify-center '>
                <LocationMarkerIcon className='w-5 h-5 text-black dark:text-gray-300 mx-1 ' />
                <p className='text-[14px] lg:text-[18px] font-poppins text-gray-700 dark:text-gray-300 '>
                  {searchInput}.choko
                </p>
              </div>

              {wait ? (
                <div className='flex items-center justify-center '>
                  <ClipLoader color='#F5CBD5' size={25} />
                </div>
              ) : (
                <div className='flex items-center justify-center '>
                  <p className='text-red-500 bg-gray-700 p-1 px-2 rounded-full text-[12px] lg:text-[14px] font-poppins   '>
                    Registered
                  </p>
                  <ChevronRightIcon className='w-5 h-5 text-black dark:text-gray-300 mx-1 hidden group-hover:inline-flex ' />
                </div>
              )}
            </div>

            <div className='group w-full h-12 flex items-center justify-between p-4 bg-gray-900 hover:bg-gray-800 cursor-pointer'>
              <div className='flex items-center justify-center '>
                <LocationMarkerIcon className='w-5 h-5 text-black dark:text-gray-300 mx-1 ' />
                <p className='text-[14px] lg:text-[18px] font-poppins text-gray-700 dark:text-gray-300 '>
                  {searchInput}.eth
                </p>
              </div>

              {wait ? (
                <div className='flex items-center justify-center '>
                  <ClipLoader color='#F5CBD5' size={25} />
                </div>
              ) : (
                <div className='flex items-center justify-center '>
                  <p className='text-green-500 bg-gray-700 p-1 px-2 rounded-full text-[12px] lg:text-[14px] font-poppins   '>
                    Avaliable
                  </p>
                  <ChevronRightIcon className='w-5 h-5 text-black dark:text-gray-300 mx-1 hidden group-hover:inline-flex ' />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* </div> */}
    </div>
  );
}

export default Domain;
