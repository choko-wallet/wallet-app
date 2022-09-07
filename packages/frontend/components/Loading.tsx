import React from 'react'
import PacmanLoader from "react-spinners/PacmanLoader";

interface Props {
  title: string;
}

function Loading({ title }: Props) {
  return (
    <div className='bg-primary h-screen flex flex-col items-center justify-center'>
      <div className='flex items-center space-x-2 mb-10'>
        <p className="text-2xl">
          <span className="text-gradient font-poppins">{title}</span>
        </p>
      </div>
      <PacmanLoader color='#ffffff' size={30} />
    </div>
  )
}

export default Loading