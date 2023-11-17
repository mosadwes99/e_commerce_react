import React from 'react'
import homeIcon from "../../icons/Home.svg";


export default function Blog() {
  return (
    <div className="w-full relative">
        <div className="w-full h-[28rem] bg-[url('/src/imgs/Assets/')] bg-fixed bg-center xl:bg-top cover bg-conte xl:bg-contain bg-no-repeat overflow-hidden relative">
          <div className="h-full bg-black/40 flex justify-center items-center text-white ">
            <div className="flex flex-col items-center gap-8">
              <p className="text-4xl font-bold ">Blog</p>

              <div className="flex gap-1 text-lg">
                <div className="flex gap-1">
                  <img src={homeIcon} alt="  " className="w-4" />

                  <span className="">Home</span>
                </div>

                <span>/ Blog</span>
              </div>
            </div>
          </div>
        </div>

        </div>
  )
}
