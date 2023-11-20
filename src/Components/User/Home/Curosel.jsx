import React, { useEffect, useState } from "react";
import { A11y, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CuroselButton from "./CuroselButton.jsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getHref } from "../../../Redux/hrefSlice.js";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../Firebase/FireStore.js";

export default function Curosel() {
  let [cateData, setCateData] = useState([]);
  let dispatch = useDispatch();

  async function getCateData() {
    let data = [];
    let querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setCateData(data);
  }

  useEffect(() => {
    getCateData();
  }, []);

  return (
    <>
      <Swiper
        spaceBetween={50}
        freeMode={true}
        breakpoints={{
          "@0.00": {
            slidesPerView: 1,
            spaceBetween: 5,
          },
          "@0.35": {
            slidesPerView: 1.5,
            spaceBetween: 5,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          "@1.00": {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          "@1.50": {
            slidesPerView: 6,
            spaceBetween: 10,
          },
        }}
        modules={[Navigation, Pagination, A11y, FreeMode]}
        className="curoselHome"
      >
        <div className="flex justify-between items-center w-[90%] md:w-full mb-10">
          <div className="text-[#133a5e] font-bold text-[1.5rem]">
            Shop by category
          </div>

          <CuroselButton />
        </div>

        {cateData.map((item, index) => (
          <SwiperSlide key={index} className="">
            <Link
              to="/shop"
              state={{ category: item.name }}
              onClick={() => dispatch(getHref("/shop"))}
            >
              <div className={`slideCuroselHome rounded-xl overflow-hidden `}>
                <img src={item.imgUrl} className="w-full h-full -z-10 object-cover" alt="" />

                <div className="w-full h-full rounded-xl z-10 absolute flex flex-col justify-center items-center   top-0 bg-[#748c9f]/80 opacity-0 hover:opacity-100 transition-opacity duration-500 ">
                  <img
                    src={item.iconUrl}
                    className="w-16 h-16 invert  "
                    alt=""
                  />

                  <p className="text-xl text-white  text-center">{item.name}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
