import { faToiletPaperSlash } from '@fortawesome/free-solid-svg-icons';
import React, { SVGProps } from 'react'


interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => void;
}

function SuperButton({ Icon, title, onClick }: Props) {
  return (
    <div className="flex justify-center items-center w-[140px] h-[76px] bg-[#22262F] rounded-full border-4 border-[#4797B5] p-[2px] cursor-pointer">

      <p className="text-[18px] leading-[23px]">
        <span className="text-white font-poppins">{title}</span>
      </p>

    </div>
  )
}

export default SuperButton;