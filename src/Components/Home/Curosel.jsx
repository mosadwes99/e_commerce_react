import React from "react";
import { A11y, FreeMode, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import CuroselButton from "./CuroselButton";
export default function Curosel() {
  let swiper = useSwiper();

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
            slidesPerView: 2,
            spaceBetween: 5,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 15,
          },
          "@1.00": {
            slidesPerView: 4,
            spaceBetween: 30,
          },
          "@1.50": {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        modules={[Navigation, Pagination, A11y, FreeMode]}
        className="curoselHome"
      >
        <div className="flex justify-between items-center w-full mb-10">
          <div className="text-[#133a5e] font-semibold text-[24px]">
            Shop by category
          </div>
          <CuroselButton />
        </div>
        <div className="">
          <SwiperSlide className="">
            <div className="slideCuroselHome">mosad</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slideCuroselHome">mosad</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slideCuroselHome">mosad</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slideCuroselHome">mosad</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slideCuroselHome">mosad</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slideCuroselHome">mosad</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slideCuroselHome">mosad</div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="slideCuroselHome">mosad</div>
          </SwiperSlide>
        </div>
      </Swiper>
    </>
  );
}
