import React from 'react'

export default function Loading() {
  return (
    <div className='h-screen w-full fixed z-50 bg-black/60 top-0 start-0 flex justify-center items-center'>
      <div className='h-16 w-16  border-[5px]  rounded-full border-l-secondary border-pramiry/20 animate-spin-fast'></div>
    </div>
  )
}
