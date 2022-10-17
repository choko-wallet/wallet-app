
import React, { SVGProps } from 'react'


interface Props {
  Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element;
  title: string;
  onClick?: () => void;
}

function SuperButton({ Icon, title, onClick }: Props) {
  return (
    <div className="flex justify-center items-center w-[90px] h-[90px] rounded-full bg-blue-gradient p-[2px] cursor-pointer">
      <div className="flex justify-center items-center flex-col bg-primary w-[100%] h-[100%] rounded-full">
        <div className="flex justify-center items-start flex-row">
          <p className="text-[18px] leading-[23px]">
            <Icon className="h-6 w-6 text-[#03F3FF] " />
          </p>
        </div>

        <p className="text-[18px] leading-[23px]">
          <span className="text-gradient font-poppins">{title}</span>
        </p>
      </div>
    </div>
  )
}

export default SuperButton;