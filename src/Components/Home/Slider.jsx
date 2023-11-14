import React from "react";
import {
  Navigation,
  Pagination,
  A11y,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import img1_1 from "../../imgs/Slides/img1-1.webp";
import img1_2 from "../../imgs/Slides/img1-2.webp";
import img2_1 from "../../imgs/Slides/img2-1.webp";
import img2_2 from "../../imgs/Slides/img2-2.webp";
import img4_1 from "../../imgs/Slides/img4-1.webp";
import img4_2 from "../../imgs/Slides/img4-2.webp";
import { Link } from "react-router-dom";


export default function Slider() {
  let title = "Better interiors";
  let paragraph =
    "The perfect place for every contemporary furniture store and manufacturer. This is Furnival.";
  let imgs = [
    {
      slide: "after:bg-[url('/src/imgs/Slides/slide1.webp')]",
      img1: img1_1,
      img2: img1_2,
    },
    {
      slide: "after:bg-[url('/src/imgs/Slides/slide2.webp')]",
      img1: img2_1,
      img2: img2_2,
    },
    {
      slide: "after:bg-[url('/src/imgs/Slides/slide3.webp')]",
      img1: img1_1,
      img2: img1_2,
    },
    {
      slide: "after:bg-[url('/src/imgs/Slides/slide4.webp')]",
      img1: img4_1,
      img2: img4_2,
    },
  ];
  return (
    <>
      <div className="lg:h-screen h-[80vh]   overflow-hidden mb-10  bg-contain">
        <div className="flex h-full">
          <Swiper
            // install Swiper modules
            modules={[Navigation, Pagination, A11y, Autoplay]}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            slidesPerView={1}
            navigation={true}
            pagination={{ clickable: true }}
          >
            {imgs.map((img , index) => (
              <SwiperSlide key={index}>
                <div className={`${img.slide} swipermain after:brightness-50`}>
                  <div className="text-white flex flex-col items-center lg:items-start px-0 lg:px-36">
                    <div className="text-[36px] text-center lg:text-start w-full  font-bold pb-10">
                      {title}
                    </div>

                    <div className="text-center lg:text-start font-medium w-2/3  text-[20px] pb-10">
                      {paragraph}
                    </div>

                    <div className="flex justify-center lg:justify-start w-full">
                      <Link to="/about">
                        <button className=" transition duration-[800ms] hover:bg-[#133a5e] hover:text-white py-3 px-10 bg-white text-[#133a5e] text-[16px] font-bold rounded-3xl">
                          VIEW MORE
                        </button>
                      </Link>
                    </div>
                  </div>

                  <div className="w-[50%] hidden mt-12 justify-center  lg:flex">
                    <img
                      className="2xl:w-[38%] xl:w-[42%] lg:w-[46%] w-1/2 h-full mr-12  rounded-xl"
                      src={img.img1}
                      alt=""
                    />
                    <img
                      className="2xl:w-[38%] xl:w-[42%] lg:w-[46%] w-1/2 h-full  rounded-xl mt-20"
                      src={img.img2}
                      alt=""
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}
