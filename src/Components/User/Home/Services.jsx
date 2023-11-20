import React, { useState } from "react";
import cart from "../../../icons/shopping-cart-svgrepo-com.svg";
import call from "../../../icons/incoming-call-svgrepo-com.svg";
import gift from "../../../icons/gift-svgrepo-com.svg";
import card from "../../../icons/credit-card-svgrepo-com.svg";
import serviceImg from "../../../imgs/Assets/services.webp";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";

export default function Services() {
  let [data, setData] = useState([
    {
      icon: cart,
      title: "Fast Shipping",
      detail: "Free delivery for order over $100.00",
    },
    {
      icon: call,
      title: "Online Support",
      detail: "Feel Free to call us & get best support.",
    },
    {
      icon: gift,
      title: "gift voucher",
      detail: "Refer a friend & get a surprise gifts.",
    },
    {
      icon: card,
      title: "Secure payment",
      detail: "Safe & more secure way to pay online.",
    },
  ]);
  
  return (
    <>
      <div className="flex flex-col  relative md:w-[80%] w-[90%] mx-auto overflow-hidden ">
        <div className="text-[#133a5e] mb-6 md:mb-20 xl:mb-32  font-bold max-sm:text-2xl sm:text-2xl md:text-2xl lg:text-2xl 2xl:text-3xl text-center">
          Services
        </div>

        <div className="relative h-[28rem] rounded-3xl lg:mb-16 bg-[#133a5e]"></div>

        <div className="  mb-5 absolute lg:-top-10 top-0   w-full">
          <Swiper
            spaceBetween={50}
            freeMode={true}
            breakpoints={{
              "@0.00": {
                slidesPerView: 1,
              },
              "@1.00": {
                slidesPerView: 4,
                spaceBetween: 10,
              },
            }}
            modules={[Navigation]}
            className="curoselServices "
          >
            {data.map((item, index) => (
              <SwiperSlide key={index} className="">
                <div className=" w-[90%] h-fit m-auto bg-white shadow-2xl p-3 py-10 rounded-2xl shadow-base flex flex-col gap-3 items-center justify-evenly">
                  <img src={item.icon} alt="icon" className="w-12 " />

                  <p className="xl:text-xl text-center text-md  font-semibold text-[#133a5e]">
                    {item.title}
                  </p>

                  <p className=" text-center text-xs 2xl:text-sm  text-black/60">
                    {item.detail}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <img
          src={serviceImg}
          alt="img"
          className="absolute w-[80%]   2xl:-bottom-20 bottom-0 start-1/2 -translate-x-1/2 "
        />
      </div>
    </>
  );
}
