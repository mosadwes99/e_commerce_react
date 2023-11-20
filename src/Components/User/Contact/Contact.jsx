import React, { useEffect } from "react";
import homeIcon from "../../../icons/Home.svg";
import phoneIcon from "../../../icons/phone.svg";
import emailIcon from "../../../icons/email.svg";
import locationIcon from "../../../icons/location.svg";
import contact from "../../../imgs/Assets/contact.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

export default function Contact() {
  let info = [
    {
      icon: phoneIcon,
      title: "+201140866347",
    },
    {
      icon: emailIcon,
      title: "Furnival@gmail.com",
    },
    {
      icon: locationIcon,
      title: "Sharkia, Zagazig",
    },
  ];

  function getTop() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    getTop();
  }, []);

  function massegeNotify() {
    toast.success(`message is sent successful`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  }

  function submitForm(e) {
    e.preventDefault();
    e.target[0].value = "";
    e.target[1].value = "";
    e.target[2].value = "";
    e.target[3].value = "";
    e.target[4].value = "";
    massegeNotify();
  }
  return (
    <div className="w-full relative">
      <div className="w-full h-[28rem] bg-[url('/src/imgs/Assets/backgroundAbout.webp')] bg-fixed bg-top bg-conatain md:bg-cover 2xl:bg-contain bg-no-repeat overflow-hidden relative">
        <div className="h-full bg-black/40 flex justify-center items-center text-white ">
          <div className="flex flex-col items-center gap-8">
            <p className="text-4xl font-bold ">Contact Us</p>

            <div className="flex gap-1 text-lg">
              <Link to="/">
                <div className="flex gap-1">
                  <img src={homeIcon} alt="  " className="w-4" />

                  <span className="">Home</span>
                </div>
              </Link>

              <span>/ Contact Us</span>
            </div>
          </div>
        </div>
      </div>

      <div className="lg:w-4/5 w-[95%] mx-auto py-20 lg:p-24 lg:py-28  ">
        <div className="w-full flex lg:flex-row flex-col lg:gap-6 gap-16 items-center justify-between">
          {info.map((item, i) => (
            <div
              key={i}
              className=" h-36 w-80 rounded-3xl shadow-2xl flex flex-col justify-center relative"
            >
              <div className="absolute -top-7 start-1/2 -translate-x-1/2 h-14 w-14 bg-[#f6f6f9] flex justify-center items-center rounded-full ">
                <img src={item.icon} alt="ico" className="w-10" />
              </div>

              <p className="text-lg text-pramiry font-semibold text-center">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:w-4/5 w-[95%] mx-auto py-16 lg:p-20 flex lg:flex-row flex-col justify-between ">
        <div className="lg:w-1/3 flex justify-center items-center">
          <img src={contact} alt="" className="w-64 xl:w-96" />
        </div>

        <form
          className="lg:w-1/2 grid grid-cols-2 p-2 gap-2"
          onSubmit={(e) => submitForm(e)}
        >
          <div className="col-span-1">
            <label className="label">
              <span className="label-text text-pramiry text-lg">
                First Name
                <span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="col-span-1">
            <label className="label">
              <span className="label-text text-pramiry text-lg">
                Last Name<span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="text"
              className="input input-bordered w-full "
              required
            />
          </div>

          <div className="col-span-1">
            <label className="label">
              <span className="label-text text-pramiry text-lg">
                Email<span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="email"
              className="input input-bordered w-full "
              required
            />
          </div>

          <div className="col-span-1">
            <label className="label">
              <span className="label-text text-pramiry text-lg">
                Phone<span className="text-red-600">*</span>
              </span>
            </label>
            <input
              type="number"
              className="input input-bordered w-full "
              required
            />
          </div>

          <div className="col-span-2">
            <label className="label">
              <span className="label-text text-pramiry text-lg">
                Message<span className="text-red-600">*</span>
              </span>
            </label>
            <textarea
              className="textarea textarea-bordered w-full min-h-[10rem]"
              required
            ></textarea>
          </div>

          <div className="col-span-2 flex justify-center p-6">
            <button className="bg-pramiry rounded-lg text-white text-xl py-2 w-full lg:w-1/2">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
