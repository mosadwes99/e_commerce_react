import React, { useEffect } from "react";
import homeIcon from "../../../icons/Home.svg";
import lightImg from "../../../imgs/Assets/lightImg.png";
import imgOne from "../../../imgs/Assets/aboutImgone.jpg";
import imgTwo from "../../../imgs/Assets/aboutImgtwo.jpg";
import mineImg from "../../../imgs/Assets/mineImg.jpg";
export default function About() {
  function getTop() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    getTop();
  }, []);
  return (
    <div className="w-full relative">
      <div className="w-full h-[28rem] bg-[url('/src/imgs/Assets/backgroundAbout.webp')] bg-fixed bg-top bg-conatain md:bg-cover 2xl:bg-contain bg-no-repeat overflow-hidden relative">
        <div className="h-full bg-black/40 flex justify-center items-center text-white ">
          <div className="flex flex-col items-center gap-8">
            <p className="text-4xl font-bold ">About Us</p>

            <div className="flex gap-1 text-lg">
              <div className="flex gap-1">
                <img src={homeIcon} alt="  " className="w-4" />

                <span className="">Home</span>
              </div>

              <span>/ About Us</span>
            </div>
          </div>
        </div>
      </div>

      <div className="w-[95%] lg:w-4/5 py-10 lg:p-10 mx-auto flex lg:flex-row flex-col">
        <div className="flex flex-col gap-6 lg:w-1/2 p-10 lg:p-20">
          <p className="text-2xl font-semibold lg:text-start text-center text-pramiry ">
            We pick our team
          </p>

          <p className="text-lg text-black/60 lg:text-start text-center px-1">
            Our team is passionate about furniture, and we collaborate
            effectively to achieve your goals and deliver high-quality work.
            We're trying to go above and beyond to meet your expectations and
            deliver exceptional results to make your dream home true.
          </p>
        </div>

        <div className=" flex justify-center lg:w-1/2">
          <img src={lightImg} alt="" className="w-52 lg:w-64 xl:w-96" />
        </div>
      </div>

      <div className="lg:w-4/5 w-[95%] lg:p-10 lg:pb-20 mx-auto flex flex-col gap-10 pb-20">
        <p className="w-full text-center text-2xl font-bold p-3 text-pramiry">
          More About Us
        </p>

        <div className="flex lg:flex-row flex-col rounded-lg shadow-lg ">
          <img src={imgOne} alt="" className="rounded-lg object-cover h-80" />

          <div className="p-8 flex flex-col justify-center">
            <p className="text-2xl mb-4  lg:text-start text-center text-pramiry ">
              This is how it's began
            </p>

            <p className=" text-black/60 lg:text-start text-center px-1">
              From the initial stages of brainstorming and ideation to the final
              implementation, our team works hand in hand, pooling our
              collective talents and perspectives. We foster an environment that
              encourages open communication, creative thinking, and mutual
              respect.
            </p>
          </div>
        </div>

        <div className="flex lg:flex-row flex-col-reverse rounded-lg shadow-lg ">
          <div className="p-8 flex flex-col justify-center">
            <p className="text-2xl mb-4  lg:text-start text-center text-pramiry">
              Attention to details
            </p>

            <p className=" text-black/60 lg:text-start text-center px-1">
              We are dedicated to provide our customers with the highest quality
              furniture that meets their lifestyle. Our team's commitment to
              meticulous craftsmanship, attention to detail, and a deep
              understanding of materials ensures that every piece we create
              reflects our passion for excellence.
            </p>
          </div>

          <img src={imgTwo} alt="" className="rounded-lg cover h-80" />
        </div>
      </div>

      <div className="lg:w-4/5 w-[95%] lg:p-10 mx-auto flex lg:py-20 flex-col gap-10 py-16">
        <div className="text-center">
          <p className="text-3xl font-semibold text-pramiry mb-2">Our Team</p>

          <p className="text-black/50 text-lg">
            I feel proud of the effort i made and the experience I gained
          </p>
        </div>

        <div className=" flex flex-col items-center w-full   ">
          <div className="xl:w-1/4 lg:w-1/3 md:w-1/2 sm:w-full  rounded-xl shadow-2xl flex flex-col gap-8 p-10 text-center border group">
            <img
              src={mineImg}
              alt=""
              className=" rounded-lg shadow-xl border  group-hover:scale-110 transition duration-300"
            />

            <div>
              <p className="text-xl font-semibold text-pramiry group-hover:text-secondary transition duration-300 ">
                Mosad Wesam
              </p>

              <p className="text-black/50">Frontend Developer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
