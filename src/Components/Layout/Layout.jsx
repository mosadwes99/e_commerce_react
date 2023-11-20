import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import arrow from "../../icons/top-arrow-5-svgrepo-com.svg";
import Nav from "../User/Nav/nav.jsx";
import Footer from "../User/Footer/Footer.jsx";

export default function Layout() {
  let [scroll, setScroll] = useState(0);

  function getScroll() {
    setScroll(window.scrollY);
  }

  function getTop() {
    scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  window.addEventListener("scroll", getScroll);
  return (
    <>
      <div className="  bg-[url('/src/imgs/Assets/layoutbg.webp')] bg-no-repeat bg-fixed bg-cover relative">
        <div className="bg-white">
          <Nav scroll={scroll} />

          <Outlet></Outlet>         
        </div>

        <Footer />
        
        {scroll > 500 ? (
          <div
            onClick={getTop}
            className="h-12 w-12 rounded-full cursor-pointer z-40 bg-[#ffb921] flex justify-center items-center fixed lg:end-16 end-6 bottom-16"
          >
            <img src={arrow} alt="top" className="w-10" />
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
