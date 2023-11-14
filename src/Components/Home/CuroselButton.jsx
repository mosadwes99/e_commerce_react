import React from "react";
import { useSwiper } from "swiper/react";

export default function CuroselButton() {
  let swiper = useSwiper()

  return (
    <>
      <div>
        <button className="border-[2.5px] hover:text-white hover:bg-[#133a5e] transition duration-300  me-3 border-[#133a5e] w-8 h-8 rounded-full" onClick={() => swiper.slidePrev()}><i className="fa-solid fa-angle-left"></i></button>
        <button className="border-[2.5px] hover:text-white hover:bg-[#133a5e] transition duration-300  border-[#133a5e] w-8 h-8 rounded-full" onClick={() => swiper.slideNext()}><i className="fa-solid fa-angle-right"></i></button>
      </div>
    </>
  );
}
