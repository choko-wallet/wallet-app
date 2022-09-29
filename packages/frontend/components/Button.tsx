
import React, { SVGProps } from 'react'


interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => void;
  rotate?: boolean;
}

function SuperButton({ Icon, title, onClick, rotate }: Props) {
  return (
    <div className="flex flex-col justify-center items-center w-[140px] h-[76px] bg-gray-400 dark:bg-[#384855] hover:bg-[#4797B5] dark:hover:bg-[#4797B5] rounded-2xl   cursor-pointer space-y-1">
      <Icon className={`h-6 w-6 text-white  ${rotate ? 'rotate-45 ml-1' : 'rotate-0'} `} />
      <p className="text-[20px] ">
        <span className="text-white font-semibold font-poppins">{title}</span>
      </p>

    </div>
  )
}

export default SuperButton;