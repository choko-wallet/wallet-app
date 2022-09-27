
import React, { SVGProps } from 'react'


interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => void;
  rotate?: boolean;
}

function SuperButton({ Icon, title, onClick, rotate }: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-[140px] h-[76px] bg-[#4797B5] opacity-30 hover:opacity-100 rounded-2xl   cursor-pointer space-y-1">
      <Icon className={`h-6 w-6 text-white  ${rotate ? 'rotate-45 ml-1' : 'rotate-0'} `} />
      <p className="text-[20px] ">
        <span className="text-white font-semibold font-poppins">{title}</span>
      </p>

    </div>
  )
}

export default SuperButton;