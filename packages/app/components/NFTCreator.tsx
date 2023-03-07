import React from "react";

function NFTCreator() {
  return (
    <div className="bg-[#747474]/50 rounded-lg flex items-center justify-between w-[240px] md:w-[260px] m-3">
      <div className="flex">
        <div className="bg-blue-300 h-[36px] w-[36px] rounded-lg m-4"></div>

        <div className="flex flex-col items-start justify-center  ">
          <p className="text-[13px] text-white font-poppins font-medium">
            Doodles
          </p>
          <p className="text-[10px] text-white font-poppins -mt-1">10k Items</p>
        </div>
      </div>

      <button className="font-inter text-[12px] cursor-pointer px-4 py-[2px] transition duration-150 rounded-md bg-[#0170BF] font-semibold text-[#F5CBD5] active:scale-90 ease-in-out mx-5">
        Follow
      </button>
    </div>
  );
}

export default NFTCreator;
