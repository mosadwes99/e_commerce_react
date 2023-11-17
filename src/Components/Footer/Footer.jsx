import React, { useEffect, useState } from "react";
import { db } from "../../Firebase/FireStore";
import { collection, getDocs } from "firebase/firestore";

export default function Footer() {
  let [socialIcon, setSocialIcon] = useState([
    "fa-brands fa-facebook-f",
    "fa-brands fa-twitter",
    "fa-brands fa-instagram",
    "fa-brands fa-whatsapp",
    "fa-brands fa-pinterest-p",
  ]);
  let [cateData, setCateData] = useState([]);

  async function getCateData() {
    let data = [];
    let querySnapshot = await getDocs(collection(db, "category"));
    querySnapshot.forEach((doc) => {
      data = [...data, doc.data()];
    });
    setCateData(data);
  }
  useEffect(() => {
    if (cateData.length === 0) {
      getCateData();
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-[#42617e]/70 opacity lg:p-20 p-5  text-white">
        <div className="lg:w-3/4 flex lg:flex-row justify-between flex-col gap-6 m-auto">
          <div className="flex flex-col gap-3">
            <p className="text-4xl font-bold">Furnival</p>

            <p className="w-80">
              The Perfect Place For Every Contemporary Furniture Store And
              Manufacturer. This Is Furnival.
            </p>

            <div className="flex gap-1">
              {socialIcon.map((item, index) => (
                <div
                  key={index}
                  className="rounded-md  bg-gray-500  bg-opacity-50  text-white py-2 hover:bg-[#ffb921]  transition duration-700 cursor-pointer group w-10 text-center"
                >
                  <i className={item}></i>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold mb-2">Quick Links</p>
            <p className="h-[1px] w-20 mb-3 bg-white "></p>
            <p className="text-white/60 hover:translate-x-2 font-semibold text-lg cursor-pointer transition-all duration-300 hover:text-[#ffb921]">
              About Us
            </p>
            <p className="text-white/60 hover:translate-x-2 font-semibold text-lg cursor-pointer transition-all duration-300 hover:text-[#ffb921]">
              Blogs & Articles
            </p>
            <p className="text-white/60 hover:translate-x-2 font-semibold text-lg cursor-pointer transition-all duration-300 hover:text-[#ffb921]">
              Contact Us
            </p>
          </div>

          <div className="">
            <p className="text-xl font-semibold mb-2">Categories</p>
            <p className="h-[1px] w-20 mb-3 bg-white "></p>
            <div className="flex flex-col">
              {cateData.length
                ? cateData.map((item, index) => (
                    <p
                      key={index}
                      className="text-white/60 hover:translate-x-2 font-semibold text-lg cursor-pointer transition-all duration-300 hover:text-[#ffb921]"
                    >
                      {item.name}
                    </p>
                  ))
                : ""}
            </div>
          </div>

          <div>
            <p className="text-xl font-semibold mb-2">Contact</p>
            <p className="h-[1px] w-20 mb-3 bg-white "></p>
            <div className="mb-1">
              <i className="fa-solid fa-envelope text-gray-300 p-1"></i>
              <span className="text-white/60">Mosadwes99@gmail.com</span>
            </div>
            <div>
              <i className="fa-solid fa-phone text-gray-300 p-1"></i>
              <span className="text-white/60">+201140866347</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#42617e] flex flex-col lg:flex-row  justify-between items-center gap-2 text-center p-4 lg:px-20 lg:p-8">
        <div className="flex gap-8">
          <p className="text-white/60 hover:translate-x-2 font-semibold lg:text-xl cursor-pointer transition-all duration-300 hover:text-[#ffb921]">
            Terms of Use
          </p>
          <p className="text-white/60 hover:translate-x-2 font-semibold lg:text-xl cursor-pointer transition-all duration-300 hover:text-[#ffb921]">
            Privacy Policy
          </p>
        </div>

        <div>
          <p className="text-white/60 text-lg   ">
            2023 © Furnival. All Rights are Reserved
          </p>
        </div>
      </div>
    </div>
  );
}
