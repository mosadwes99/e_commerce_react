import React, { useEffect, useState } from "react";
import rightArrow from "../../icons/right-arrow-svgrepo-com.svg";

export default function (props) {
  let { productData } = props;
  let [filteredData, setfilterdData] = useState([]);

  useEffect(() => {
    let products = productData;
    products = products.filter((item) => item.new === true);
    setfilterdData(products);
    console.log(products);
  }, [productData]);

  return (
    <div className="py-10 md:w-[80%] w-[90%] m-auto">
      <div className="py-10 text-[#133a5e] font-bold text-[1.5rem]">
        Modern Home Ideas
      </div>

      <div className="grid grid-cols-3 grid-rows-2 gap-4  min-h-[30rem]">
        {filteredData.length ? (
          <>
            <div className="md:col-span-1 col-span-3 row-span-1 relative  rounded-xl">
              <img
                src={filteredData[2].imgUrl}
                className="rounded-xl h-full"
                alt=""
              />
              <div className="doubleCircle h-10 w-10 rounded-full flex justify-center items-center absolute top-20 start-16 hover:scale-90 transition duration-300 bg-black/50">
                <div className="h-5 w-5 rounded-full bg-white hover:scale-90 transition duration-300"></div>
                <div className="doubleCircleChild  opacity-0 hidden xl:flex flex-col justify-between  transition-opacity delay-300 duration-300 absolute top-10 start-10 w-56 h-28 shadow-lg bg-white hover:scale-100 p-2 ">
                  <div className=" flex justify-between ">
                    <p className="text-red-400">New</p>
                    <img src={rightArrow} className="w-7" alt="arrow" />
                  </div>
                  <span className="w-full text-sm truncate">
                    {filteredData[2].name}
                  </span>

                  <span className="w-full text-sm truncate ">
                    {filteredData[2].desc}
                  </span>

                  <span className="w-full text-black/50 text-sm">
                    {filteredData[2].price}$
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-1 col-span-3 row-span-1 relative  rounded-xl">
              <img
                src={filteredData[4].imgUrl}
                className="rounded-xl h-full"
                alt=""
              />
              <div className="doubleCircle h-10 w-10 rounded-full flex justify-center items-center absolute top-44 start-20 hover:scale-90 transition duration-300 bg-black/50">
                <div className="h-5 w-5 rounded-full bg-white hover:scale-90 transition duration-300"></div>
                <div className="doubleCircleChild opacity-0 hidden xl:flex flex-col justify-between transition-opacity delay-300 duration-300 absolute top-10 start-10 w-56 h-28 shadow-lg bg-white hover:scale-100 p-2">
                  <div className=" flex justify-between ">
                    <p className="text-red-400">New</p>
                    <img src={rightArrow} className="w-7" alt="arrow" />
                  </div>
                  <span className="w-full text-sm truncate">
                    {filteredData[4].name}
                  </span>

                  <span className="w-full text-sm truncate ">
                    {filteredData[4].desc}
                  </span>

                  <span className="w-full text-black/50 text-sm">
                    {filteredData[4].price}$
                  </span>
                </div>
              </div>
            </div>

            <div className="md:row-span-2 row-span-1 md:col-span-1 col-span-3  relative  rounded-xl">
              <img
                src={filteredData[3].imgUrl}
                className="rounded-xl h-full"
                alt=""
              />
              <div className="doubleCircle h-10 w-10 rounded-full flex justify-center items-center absolute lg:top-64 lg:start-48 start-28 top-32 hover:scale-90 transition duration-300 bg-black/50">
                <div className="h-5 w-5 rounded-full bg-white hover:scale-90 transition duration-300"></div>
                <div className="doubleCircleChild opacity-0 hidden xl:flex flex-col justify-between transition-opacity delay-300 duration-300 absolute top-10 start-10 w-56 h-28 shadow-lg bg-white hover:scale-100 p-2">
                  <div className=" flex justify-between ">
                    <p className="text-red-400">New</p>
                    <img src={rightArrow} className="w-7" alt="arrow" />
                  </div>
                  <span className="w-full text-sm truncate">
                    {filteredData[3].name}
                  </span>

                  <span className="w-full text-sm truncate ">
                    {filteredData[3].desc}
                  </span>

                  <span className="w-full text-black/50 text-sm">
                    {filteredData[3].price}$
                  </span>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 md:row-span-2 col-span-3 row-span-1 relative   rounded-xl">
              <img
                src={filteredData[1].imgUrl}
                className="rounded-xl w-full h-full"
                alt=""
              />
              <div className="doubleCircle h-10 w-10 rounded-full flex justify-center items-center absolute lg:top-[38rem] lg:start-[38rem] top-32  start-28 hover:scale-90 transition duration-300 bg-black/50">
                <div className="h-5 w-5 rounded-full bg-white hover:scale-90 transition duration-300"></div>
                <div className="doubleCircleChild opacity-0 hidden xl:flex flex-col justify-between transition-opacity delay-300 duration-300 absolute top-10 start-10 w-56 h-28 shadow-lg bg-white hover:scale-100 p-2">
                  <div className=" flex justify-between ">
                    <p className="text-red-400">New</p>
                    <img src={rightArrow} className="w-7" alt="arrow" />
                  </div>
                  <span className="w-full text-sm truncate">
                    {filteredData[1].name}
                  </span>

                  <span className="w-full text-sm truncate ">
                    {filteredData[1].desc}
                  </span>

                  <span className="w-full text-black/50 text-sm">
                    {filteredData[1].price}$
                  </span>
                </div>
              </div>
            </div>

            <div className=" md:col-span-1 col-span-3 row-span-1 relative  rounded-xl">
              <img
                src={filteredData[0].imgUrl}
                className="rounded-xl h-full"
                alt=","
              />
              <div className="doubleCircle h-10 w-10 rounded-full flex justify-center items-center absolute top-20 start-16 hover:scale-90 transition duration-300 bg-black/50">
                <div className="h-5 w-5 rounded-full bg-white hover:scale-90 transition duration-300"></div>
                <div className="doubleCircleChild opacity-0 hidden xl:flex flex-col justify-between transition-opacity delay-300 duration-300 absolute top-10 start-10 w-56 h-28 shadow-lg bg-white hover:scale-100 p-2">
                  <div className=" flex justify-between ">
                    <p className="text-red-400">New</p>
                    <img src={rightArrow} className="w-7" alt="arrow" />
                  </div>
                  <span className="w-full text-sm truncate">
                    {filteredData[0].name}
                  </span>

                  <span className="w-full text-sm truncate ">
                    {filteredData[0].desc}
                  </span>

                  <span className="w-full text-black/50 text-sm">
                    {filteredData[0].price}$
                  </span>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-300 animate-pulse duration-50 md:col-span-1 col-span-3 row-span-1   rounded-xl">
              {""}
            </div>

            <div className="bg-gray-300 animate-pulse duration-50 md:col-span-1 col-span-3 row-span-1  rounded-xl">
              {""}
            </div>

            <div className="bg-gray-300 animate-pulse duration-50 md:row-span-2 row-span-1 md:col-span-1 col-span-3   rounded-xl">
              {""}
            </div>

            <div className="bg-gray-300 animate-pulse duration-50 md:col-span-2 md:row-span-2 col-span-3 row-span-1    rounded-xl">
              {""}
            </div>

            <div className="bg-gray-300 animate-pulse duration-50  md:col-span-1 col-span-3 row-span-1  rounded-xl">
              {""}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
